package irmagobridge

import (
	"encoding/json"
	"fmt"
	"github.com/go-errors/errors"
	"github.com/privacybydesign/irmago"
	"github.com/privacybydesign/irmago/irmaclient"
)

type ActionHandler struct {
	sessionLookup map[int]*SessionHandler
}

// Enrollment to a keyshare server
type EnrollAction struct {
	Email    *string
	Pin      string
	Language string
}

func (ah *ActionHandler) Enroll(action *EnrollAction) (err error) {
	unenrolled := client.UnenrolledSchemeManagers()

	if len(unenrolled) == 0 {
		return errors.Errorf("No unenrolled scheme manager available to enroll with")
	}

	// Irmago doesn't actually support multiple scheme managers with keyshare enrollment,
	// so we just pick the first unenrolled, which should be PBDF production
	client.KeyshareEnroll(unenrolled[0], action.Email, action.Pin, action.Language)
	return nil
}

type AuthenticateAction struct {
	Pin string
}

func (ah *ActionHandler) Authenticate(action *AuthenticateAction) (err error) {
	enrolled := client.EnrolledSchemeManagers()
	if len(enrolled) == 0 {
		sendAuthenticateError(&irma.SessionError{
			Err:       errors.Errorf("Can't verify PIN, not enrolled"),
			ErrorType: irma.ErrorUnknownSchemeManager,
			Info:      "Can't verify PIN, not enrolled",
		})
		return
	}

	go func() {
		success, tries, blocked, err := client.KeyshareVerifyPin(action.Pin, enrolled[0])
		if err != nil {
			logDebug(err.Error())
			sendAuthenticateError(err.(*irma.SessionError))
		} else if success {
			logDebug("ok")
			sendAuthenticateSuccess()
		} else {
			logDebug(fmt.Sprint("fail: ", tries, " ", blocked))
			sendAuthenticateFailure(tries, blocked)
		}
	}()

	return nil
}

// Changing keyshare pin
type ChangePinAction struct {
	OldPin string
	NewPin string
}

func (ah *ActionHandler) ChangePin(action *ChangePinAction) (err error) {
	enrolled := client.EnrolledSchemeManagers()

	if len(enrolled) == 0 {
		return errors.Errorf("No enrolled scheme managers to change pin for")
	}

	// Irmago doesn't actually support multiple scheme managers with keyshare enrollment,
	// so we just pick the first enrolled, which should be PBDF production
	client.KeyshareChangePin(enrolled[0], action.OldPin, action.NewPin)
	return nil
}

// Initiating a new session
type NewSessionAction struct {
	SessionID int
	Request   json.RawMessage
}

func (ah *ActionHandler) NewSession(action *NewSessionAction) (err error) {
	if action.SessionID < 1 {
		return errors.Errorf("Action id should be provided and larger than zero")
	}

	sessionHandler := &SessionHandler{sessionID: action.SessionID}
	ah.sessionLookup[sessionHandler.sessionID] = sessionHandler

	sessionHandler.dismisser = client.NewSession(string(action.Request), sessionHandler)
	return nil
}

// Responding to a permission prompt when disclosing, issuing or signing
type RespondPermissionAction struct {
	SessionID         int
	Proceed           bool
	DisclosureChoices [][]*irma.AttributeIdentifier
}

func (ah *ActionHandler) RespondPermission(action *RespondPermissionAction) (err error) {
	sh, err := ah.findSessionHandler(action.SessionID)
	if err != nil {
		return err
	}
	if sh.permissionHandler == nil {
		return errors.Errorf("Unset permissionHandler in RespondPermission")
	}

	disclosureChoice := &irma.DisclosureChoice{Attributes: action.DisclosureChoices}
	sh.permissionHandler(action.Proceed, disclosureChoice)

	return nil
}

// Responding to a request for a pin code
type RespondPinAction struct {
	SessionID int
	Proceed   bool
	Pin       string
}

func (ah *ActionHandler) RespondPin(action *RespondPinAction) (err error) {
	sh, err := ah.findSessionHandler(action.SessionID)
	if err != nil {
		return err
	}
	if sh.pinHandler == nil {
		return errors.Errorf("Unset pinHandler in RespondPin")
	}

	sh.pinHandler(action.Proceed, action.Pin)
	return nil
}

func (ah *ActionHandler) RemoveStorage() (err error) {
	if err := client.RemoveStorage(); err != nil {
		return err
	}

	sendPreferences()
	sendCredentials()
	sendEnrollmentStatus()
	return nil
}

type DeleteCredentialAction struct {
	Hash string
}

func (ah *ActionHandler) DeleteCredential(action *DeleteCredentialAction) error {
	if err := client.RemoveCredentialByHash(action.Hash); err != nil {
		return err
	}
	sendCredentials()
	return nil
}

// Dismiss the current session
type DismissSessionAction struct {
	SessionID int
}

func (ah *ActionHandler) DismissSession(action *DismissSessionAction) error {
	sh, err := ah.findSessionHandler(action.SessionID)
	if err != nil {
		return err
	}
	if sh.dismisser != nil {
		sh.dismisser.Dismiss()
	}
	return nil
}

// Set the crash reporting preference, and return the current preferences to irma_mobile
type SetCrashReportingPreferenceAction struct {
	EnableCrashReporting bool
}

func (ah *ActionHandler) SetCrashReportingPreference(action *SetCrashReportingPreferenceAction) error {
	client.SetCrashReportingPreference(action.EnableCrashReporting)
	sendPreferences()

	return nil
}

// findSessionHandler is a helper function to find a session in the sessionLookup
func (ah *ActionHandler) findSessionHandler(sessionID int) (*SessionHandler, error) {
	sh := ah.sessionLookup[sessionID]
	if sh == nil {
		return nil, errors.Errorf("Invalid session ID in RespondPermission: %d", sessionID)
	}

	return sh, nil
}

func (ah *ActionHandler) updateSchemes() error {
	err := client.Configuration.UpdateSchemes()
	if err != nil {
		return err
	}

	sendConfiguration()
	return nil
}

type LoadLogsAction struct {
	Before uint64
	Max    int
}

func (ah *ActionHandler) LoadLogs(action *LoadLogsAction) error {
	var logEntries []*irmaclient.LogEntry
	var err error

	// When before is not sent, it gets Go's default value 0 and 0 is never a valid id
	if action.Before == 0 {
		logEntries, err = client.LoadNewestLogs(action.Max)
	} else {
		logEntries, err = client.LoadLogsBefore(action.Before, action.Max)
	}
	if err != nil {
		return err
	}

	logsOutgoing := make([]map[string]interface{}, len(logEntries))
	for i, entry := range logEntries {
		var removed map[irma.CredentialTypeIdentifier][]irma.TranslatedString
		if entry.Type == irmaclient.ActionRemoval {
			removed = entry.Removed
		} else {
			removed = make(map[irma.CredentialTypeIdentifier][]irma.TranslatedString)
		}
		disclosedCredentials, err := entry.GetDisclosedCredentials(client.Configuration)
		if err != nil {
			return err
		}
		issuedCredentials, err := entry.GetIssuedCredentials(client.Configuration)
		if err != nil {
			return err
		}
		signedMessage, err := entry.GetSignedMessage()
		if err != nil {
			return err
		}
		logsOutgoing[i] = map[string]interface{}{
			"id":                   entry.ID,
			"type":                 entry.Type,
			"time":                 entry.Time.String(),
			"serverName":           entry.ServerName,
			"issuedCredentials":    issuedCredentials,
			"disclosedCredentials": disclosedCredentials,
			"signedMessage":        signedMessage,
			"removedCredentials":   removed,
		}
	}

	sendLogs(logsOutgoing)
	return nil
}
