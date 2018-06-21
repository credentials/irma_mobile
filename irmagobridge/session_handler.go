package irmagobridge

import (
	"github.com/privacybydesign/irmago"
	"github.com/privacybydesign/irmago/irmaclient"
)

type SessionHandler struct {
	sessionID         int
	dismisser         irmaclient.SessionDismisser
	permissionHandler irmaclient.PermissionHandler
	pinHandler        irmaclient.PinHandler
}

func (sh *SessionHandler) StatusUpdate(irmaAction irma.Action, status irma.Status) {
	logDebug("Handling StatusUpdate")
	action := &OutgoingAction{
		"type":       "IrmaSession.StatusUpdate",
		"sessionId":  sh.sessionID,
		"irmaAction": irmaAction,
		"status":     status,
	}

	sendAction(action)
}

func (sh *SessionHandler) Success(irmaAction irma.Action, result string) {
	logDebug("Handling Success")
	action := &OutgoingAction{
		"type":       "IrmaSession.Success",
		"sessionId":  sh.sessionID,
		"irmaAction": irmaAction,
		"result":     result,
	}

	sendAction(action)
}

func (sh *SessionHandler) Failure(irmaAction irma.Action, err *irma.SessionError) {
	logDebug("Handling Failure")

	action := &OutgoingAction{
		"type":       "IrmaSession.Failure",
		"sessionId":  sh.sessionID,
		"irmaAction": irmaAction,
		"error": &OutgoingAction{
			"type":         err.ErrorType,
			"wrappedError": err.WrappedError(),
			"info":         err.Info,
			"stack":        err.Stack(),
			"remoteStatus": err.RemoteStatus,
			"remoteError":  err.RemoteError,
		},
	}

	sendAction(action)
}

func (sh *SessionHandler) Cancelled(irmaAction irma.Action) {
	logDebug("Handling Cancelled")
	action := &OutgoingAction{
		"type":      "IrmaSession.Cancelled",
		"sessionId": sh.sessionID,
	}

	sendAction(action)
}

func (sh *SessionHandler) UnsatisfiableRequest(irmaAction irma.Action, serverName string, missingDisclosures irma.AttributeDisjunctionList) {
	logDebug("Handling UnsatisfiableRequest")
	action := &OutgoingAction{
		"type":               "IrmaSession.UnsatisfiableRequest",
		"sessionId":          sh.sessionID,
		"serverName":         serverName,
		"missingDisclosures": missingDisclosures,
	}

	sendAction(action)
}

func (sh *SessionHandler) RequestIssuancePermission(request irma.IssuanceRequest, serverName string, ph irmaclient.PermissionHandler) {
	logDebug("Handling RequestIssuancePermission")
	action := &OutgoingAction{
		"type":                  "IrmaSession.RequestIssuancePermission",
		"sessionId":             sh.sessionID,
		"serverName":            serverName,
		"issuedCredentials":     request.CredentialInfoList,
		"removalCredentials":    request.RemovalCredentialInfoList,
		"disclosures":           request.ToDisclose(),
		"disclosuresCandidates": request.Candidates,
	}

	sh.permissionHandler = ph
	sendAction(action)
}

func (sh *SessionHandler) RequestVerificationPermission(request irma.DisclosureRequest, serverName string, ph irmaclient.PermissionHandler) {
	logDebug("Handling RequestVerificationPermission")
	action := &OutgoingAction{
		"type":                  "IrmaSession.RequestVerificationPermission",
		"sessionId":             sh.sessionID,
		"serverName":            serverName,
		"disclosures":           request.ToDisclose(),
		"disclosuresCandidates": request.Candidates,
	}

	sh.permissionHandler = ph
	sendAction(action)
}

func (sh *SessionHandler) RequestSignaturePermission(request irma.SignatureRequest, serverName string, ph irmaclient.PermissionHandler) {
	logDebug("Handling RequestSignaturePermission")
	action := &OutgoingAction{
		"type":                  "IrmaSession.RequestSignaturePermission",
		"sessionId":             sh.sessionID,
		"serverName":            serverName,
		"disclosures":           request.ToDisclose(),
		"disclosuresCandidates": request.Candidates,
		"message":               request.Message,
	}

	sh.permissionHandler = ph
	sendAction(action)
}

func (sh *SessionHandler) RequestPin(remainingAttempts int, ph irmaclient.PinHandler) {
	logDebug("Handling RequestPin")
	action := &OutgoingAction{
		"type":              "IrmaSession.RequestPin",
		"sessionId":         sh.sessionID,
		"remainingAttempts": remainingAttempts,
	}

	sh.pinHandler = ph
	sendAction(action)
}

func (sh *SessionHandler) RequestSchemeManagerPermission(manager *irma.SchemeManager, callback func(proceed bool)) {
	logDebug("Handling RequestSchemeManagerPermission")
	callback(false)
}

func (sh *SessionHandler) KeyshareEnrollmentMissing(manager irma.SchemeManagerIdentifier) {
	logDebug("Handling KeyshareEnrollmentMissing")
	action := &OutgoingAction{
		"type":            "IrmaSession.KeyshareEnrollmentMissing",
		"sessionId":       sh.sessionID,
		"schemeManagerId": manager,
	}

	sendAction(action)
}

func (sh *SessionHandler) KeyshareEnrollmentDeleted(manager irma.SchemeManagerIdentifier) {
	logDebug("Handling KeyshareEnrollmentDeleted")
	action := &OutgoingAction{
		"type":            "IrmaSession.KeyshareEnrollmentDeleted",
		"sessionId":       sh.sessionID,
		"schemeManagerId": manager,
	}

	sendAction(action)
}

func (sh *SessionHandler) KeyshareBlocked(manager irma.SchemeManagerIdentifier, duration int) {
	logDebug("Handling KeyshareBlocked")
	action := &OutgoingAction{
		"type":            "IrmaSession.KeyshareBlocked",
		"sessionId":       sh.sessionID,
		"schemeManagerId": manager,
		"duration":        duration,
	}

	sendAction(action)
}

func (sh *SessionHandler) KeyshareEnrollmentIncomplete(manager irma.SchemeManagerIdentifier) {
	logDebug("Handling KeyshareEnrollmentIncomplete")
	action := &OutgoingAction{
		"type":            "IrmaSession.KeyshareEnrollmentIncomplete",
		"sessionId":       sh.sessionID,
		"schemeManagerId": manager,
	}

	sendAction(action)
}
