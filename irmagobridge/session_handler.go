package irmagobridge

import (
	"github.com/credentials/irmago"
)

type SessionHandler struct {
	sessionID         int
	dismisser         irmago.SessionDismisser
	permissionHandler irmago.PermissionHandler
	pinHandler        irmago.PinHandler
}

func (sh *SessionHandler) StatusUpdate(irmaAction irmago.Action, status irmago.Status) {
	logDebug("Handling StatusUpdate")
	action := &OutgoingAction{
		"type":       "SessionHandler.StatusUpdate",
		"sessionId":  sh.sessionID,
		"irmaAction": irmaAction,
		"status":     status,
	}

	sendAction(action)
}

func (sh *SessionHandler) Success(irmaAction irmago.Action) {
	logDebug("Handling Success")
	action := &OutgoingAction{
		"type":       "SessionHandler.Success",
		"sessionId":  sh.sessionID,
		"irmaAction": irmaAction,
	}

	sendAction(action)
}

func (sh *SessionHandler) Failure(irmaAction irmago.Action, err *irmago.SessionError) {
	logDebug("Handling Failure")
	action := &OutgoingAction{
		"type":         "SessionHandler.Failure",
		"sessionId":    sh.sessionID,
		"irmaAction":   irmaAction,
		"errorType":    err.ErrorType,
		"errorMessage": err.Err.Error(),
		"errorInfo":    err.Info,
		"errorStatus":  err.Status,
		"apiError":     err.ApiError,
	}

	sendAction(action)
}

func (sh *SessionHandler) Cancelled(irmaAction irmago.Action) {
	logDebug("Handling Cancelled")
	action := &OutgoingAction{
		"type":      "SessionHandler.Cancelled",
		"sessionId": sh.sessionID,
	}

	sendAction(action)
}

func (sh *SessionHandler) UnsatisfiableRequest(irmaAction irmago.Action, missingAttributes irmago.AttributeDisjunctionList) {
	logDebug("Handling UnsatisfiableRequest")
	action := &OutgoingAction{
		"type":              "SessionHandler.UnsatisfiableRequest",
		"sessionId":         sh.sessionID,
		"missingAttributes": missingAttributes,
	}

	sendAction(action)
}

func (sh *SessionHandler) RequestIssuancePermission(request irmago.IssuanceRequest, issuerName string, ph irmago.PermissionHandler) {
	logDebug("Handling RequestIssuancePermission")
	action := &OutgoingAction{
		"type":                 "SessionHandler.RequestIssuancePermission",
		"sessionId":            sh.sessionID,
		"issuerName":           issuerName,
		"issuedCredentials":    request.CredentialInfoList,
		"toDisclose":           request.ToDisclose(),
		"disclosureCandidates": request.Candidates,
	}

	sh.permissionHandler = ph
	sendAction(action)
}

func (sh *SessionHandler) RequestVerificationPermission(request irmago.DisclosureRequest, verifierName string, ph irmago.PermissionHandler) {
	logDebug("Handling RequestVerificationPermission")
	action := &OutgoingAction{
		"type":                 "SessionHandler.RequestVerificationPermission",
		"sessionId":            sh.sessionID,
		"verifierName":         verifierName,
		"toDisclose":           request.ToDisclose(),
		"disclosureCandidates": request.Candidates,
	}

	sh.permissionHandler = ph
	sendAction(action)
}

func (sh *SessionHandler) RequestSignaturePermission(request irmago.SignatureRequest, requesterName string, ph irmago.PermissionHandler) {
	logDebug("Handling RequestSignaturePermission")
	action := &OutgoingAction{
		"type":                 "SessionHandler.RequestSignaturePermission",
		"sessionId":            sh.sessionID,
		"requesterName":        requesterName,
		"toDisclose":           request.ToDisclose(),
		"disclosureCandidates": request.Candidates,
		"message":              request.Message,
		"messageType":          request.MessageType,
	}

	sh.permissionHandler = ph
	sendAction(action)
}

func (sh *SessionHandler) RequestPin(remainingAttempts int, ph irmago.PinHandler) {
	logDebug("Handling RequestPin")
	action := &OutgoingAction{
		"type":              "SessionHandler.RequestPin",
		"sessionId":         sh.sessionID,
		"remainingAttempts": remainingAttempts,
	}

	sh.pinHandler = ph
	sendAction(action)
}

func (sh *SessionHandler) RequestSchemeManagerPermission(manager *irmago.SchemeManager, callback func(proceed bool)) {
	logDebug("Handling RequestSchemeManagerPermission")
	callback(false)
}

func (sh *SessionHandler) MissingKeyshareEnrollment(manager irmago.SchemeManagerIdentifier) {
	logDebug("Handling MissingKeyshareEnrollment")
	action := &OutgoingAction{
		"type":            "SessionHandler.MissingKeyshareEnrollment",
		"sessionId":       sh.sessionID,
		"schemeManagerId": manager,
	}

	sendAction(action)
}
