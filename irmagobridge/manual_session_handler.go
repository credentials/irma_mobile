package irmagobridge

import (
	"github.com/credentials/irmago"
	"github.com/credentials/irmago/irmaclient"
	"github.com/go-errors/errors"
)

type ManualSessionHandler struct {
	// sessionID         int
	// dismisser         irmaclient.SessionDismisser
	permissionHandler irmaclient.PermissionHandler
	pinHandler        irmaclient.PinHandler
}

type NewManualSessionAction struct {
	Request string
}

func (sh *ManualSessionHandler) NewManualSession(action *NewManualSessionAction) (err error) {
	logDebug("Handling NewManualSession")
	client.NewManualSession(action.Request, sh)
	return nil
}

func (sh *ManualSessionHandler) StatusUpdate(irmaAction irma.Action, status irma.Status) {
	logDebug("Handling ManualStatusUpdate")
	action := &OutgoingAction{
		"type":       "ManualSessionHandler.StatusUpdate",
		"irmaAction": irmaAction,
		"status":     status,
	}

	sendAction(action)
}

type ManualRespondPinAction struct {
	Proceed   bool
	Pin       string
}

func (sh *ManualSessionHandler) RequestPin(remainingAttempts int, ph irmaclient.PinHandler) {
	logDebug("Handling ManualRequestPin")
	action := &OutgoingAction{
		"type":              "ManualSessionHandler.RequestPin",
		"remainingAttempts": remainingAttempts,
	}

	sh.pinHandler = ph
	sendAction(action)
}

func (sh *ManualSessionHandler) RespondPin(action *ManualRespondPinAction) (err error) {
	logDebug("Handling ManualRespondPin")
	sh.pinHandler(action.Proceed, action.Pin)
	return nil
}

type ManualRespondPermissionAction struct {
	Proceed           bool
	DisclosureChoices []*irma.AttributeIdentifier
}

func (sh *ManualSessionHandler) RequestSignaturePermission(request irma.SignatureRequest, requesterName string, ph irmaclient.PermissionHandler) {
	logDebug("Handling ManualRequestSignaturePermission")
	action := &OutgoingAction{
		"type":                 "ManualSessionHandler.RequestSignaturePermission",
		"requesterName":        requesterName,
		"toDisclose":           request.ToDisclose(),
		"disclosureCandidates": request.Candidates,
		"message":              request.Message,
		"messageType":          request.MessageType,
	}

	sh.permissionHandler = ph
	sendAction(action)
}

func (sh *ManualSessionHandler) RespondPermission(action *ManualRespondPermissionAction) (err error) {
	if sh.permissionHandler == nil {
		return errors.Errorf("Unset permissionHandler in RespondPermission")
	}

	logDebug("Proceed? : ")
	if action.Proceed {
		logDebug("action.Proceed = true")
	} else {
		logDebug("action.Proceed = false")
	}

	disclosureChoice := &irma.DisclosureChoice{Attributes: action.DisclosureChoices}
	sh.permissionHandler(action.Proceed, disclosureChoice)

	return nil
}

func (sh *ManualSessionHandler) Cancelled(irmaAction irma.Action) {
	logDebug("Handling ManualCancelled")
	action := &OutgoingAction{
		"type":      "ManualSessionHandler.Cancelled",
	}
	sendAction(action)
}
func (sh *ManualSessionHandler) Failure(irmaAction irma.Action, err *irma.SessionError) {
	logDebug("Handling ManualFailure")
	action := &OutgoingAction{
		"type":         "ManualSessionHandler.Failure",
		"irmaAction":   irmaAction,
		"errorType":    err.ErrorType,
		"errorMessage": err.Err.Error(),
		"errorInfo":    err.Info,
		"errorStatus":  err.Status,
		"apiError":     err.ApiError,
	}
	sendAction(action)
}
func (sh *ManualSessionHandler) MissingKeyshareEnrollment(manager irma.SchemeManagerIdentifier) {
	logDebug("Handling ManualMissingKeyshareEnrollment")
	action := &OutgoingAction{
		"type":            "ManualSessionHandler.MissingKeyshareEnrollment",
		"schemeManagerId": manager,
	}
	sendAction(action)
}

// TODOs ?
func (sh *ManualSessionHandler) RequestIssuancePermission(request irma.IssuanceRequest, issuerName string, ph irmaclient.PermissionHandler) { }
func (sh *ManualSessionHandler) RequestSchemeManagerPermission(manager *irma.SchemeManager, callback func(proceed bool)) { }
func (sh *ManualSessionHandler) RequestVerificationPermission(request irma.DisclosureRequest, verifierName string, ph irmaclient.PermissionHandler) { }

func (sh *ManualSessionHandler) Success(irmaAction irma.Action, result string) {
	logDebug("Handling ManualSucces")

	action := &OutgoingAction{
		"type":       "ManualSessionHandler.Success",
		"irmaAction": irmaAction,
		"result": result,
	}

	sendAction(action)
}

func (sh *ManualSessionHandler) UnsatisfiableRequest(irmaAction irma.Action, missingAttributes irma.AttributeDisjunctionList) {
	logDebug("Handling ManualUnsatisfiableRequest")
	action := &OutgoingAction{
		"type":              "ManualSessionHandler.UnsatisfiableRequest",
		"missingAttributes": missingAttributes,
	}

	sendAction(action)
}
