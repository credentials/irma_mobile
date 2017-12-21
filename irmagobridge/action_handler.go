package irmagobridge

import (
	"github.com/go-errors/errors"
	"github.com/privacybydesign/irmago"
)

type ActionHandler struct {
	sessionLookup        map[int]*SessionHandler
	manualSessionHandler *SessionHandler
}

type EnrollAction struct {
	SchemeManagerId irma.SchemeManagerIdentifier
	Email           string
	Pin             string
}

func (ah *ActionHandler) Enroll(action *EnrollAction) (err error) {
	client.KeyshareEnroll(action.SchemeManagerId, action.Email, action.Pin)
	return nil
}

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

type NewManualSessionAction struct {
	Request string
}

func (ah *ActionHandler) NewManualSession(action *NewManualSessionAction) (err error) {
	ah.manualSessionHandler = &SessionHandler{
		sessionID: 0,
	}

	client.NewManualSession(action.Request, ah.manualSessionHandler)
	return nil
}

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

func (ah *ActionHandler) RemoveAll() (err error) {
	if err := client.RemoveAllCredentials(); err != nil {
		return err
	}
	if err := client.KeyshareRemoveAll(); err != nil {
		return err
	}

	getCredentials()
	getEnrollmentStatus()
	return nil
}

type DismissSessionAction struct {
	SessionID int
}

func (ah *ActionHandler) DismissSession(action *DismissSessionAction) error {
	if action.SessionID == 0 {
		// Manual sessions don't need to be dismissed
		return nil
	}
	sh, err := ah.findSessionHandler(action.SessionID)
	if err != nil {
		return err
	}
	if sh.dismisser != nil {
		sh.dismisser.Dismiss()
	}
	return nil
}

func (ah *ActionHandler) findSessionHandler(sessionID int) (*SessionHandler, error) {
	if sessionID == 0 {
		return ah.manualSessionHandler, nil
	}
	sh := ah.sessionLookup[sessionID]
	if sh == nil {
		return nil, errors.Errorf("Invalid session ID in RespondPermission: %d", sessionID)
	}

	return sh, nil
}
