package irmagobridge

import (
	"github.com/go-errors/errors"
	"github.com/privacybydesign/irmago"
)

type ActionHandler struct {
	sessionLookup map[int]*SessionHandler
}

// Enrollment to a keyshare server
type EnrollAction struct {
	Email string
	Pin   string
}

func (ah *ActionHandler) Enroll(action *EnrollAction) (err error) {
	if len(client.UnenrolledSchemeManagers) == 0 {
		return errors.Errorf("No unenrolled scheme manager available to enroll with")
	}

	// Irmago doesn't actually support multiple scheme managers with keyshare enrollment,
	// so we just pick the first unenrolled, which should be PBDF production
	client.KeyshareEnroll(client.UnenrolledSchemeManagers[0], action.Email, action.Pin)
	return nil
}

// Initiating a new session
type NewSessionAction struct {
	SessionID int
	Qr        *irma.Qr
}

func (ah *ActionHandler) NewSession(action *NewSessionAction) (err error) {
	if action.SessionID < 1 {
		return errors.Errorf("Action id should be provided and larger than zero")
	}

	sessionHandler := &SessionHandler{sessionID: action.SessionID}
	ah.sessionLookup[sessionHandler.sessionID] = sessionHandler

	sessionHandler.dismisser = client.NewSession(action.Qr, sessionHandler)
	return nil
}

// Respond to a permission prompt when disclosing, issuing or signing
type RespondPermissionAction struct {
	SessionID         int
	Proceed           bool
	DisclosureChoices []*irma.AttributeIdentifier
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

// Request to remove all attributes and keyshare enrollment
func (ah *ActionHandler) RemoveAll() (err error) {
	if err := client.RemoveAllCredentials(); err != nil {
		return err
	}
	if err := client.KeyshareRemoveAll(); err != nil {
		return err
	}

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
