package irmagobridge

import (
	"github.com/go-errors/errors"
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

	var stack string
	if terr, ok := err.Err.(*errors.Error); ok {
		stack = string(terr.Stack())
	}

	action := &OutgoingAction{
		"type":         "IrmaSession.Failure",
		"sessionId":    sh.sessionID,
		"irmaAction":   irmaAction,
		"errorType":    err.ErrorType,
		"errorMessage": err.Error(),
		"errorInfo":    err.Info,
		"errorStatus":  err.Status,
		"errorStack":   stack,
		"apiError":     err.ApiError,
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

func (sh *SessionHandler) UnsatisfiableRequest(irmaAction irma.Action, missingAttributes irma.AttributeDisjunctionList) {
	logDebug("Handling UnsatisfiableRequest")
	action := &OutgoingAction{
		"type":              "IrmaSession.UnsatisfiableRequest",
		"sessionId":         sh.sessionID,
		"missingAttributes": missingAttributes,
	}

	sendAction(action)
}

func (sh *SessionHandler) RequestIssuancePermission(request irma.IssuanceRequest, issuerName string, ph irmaclient.PermissionHandler) {
	logDebug("Handling RequestIssuancePermission")
	action := &OutgoingAction{
		"type":                 "IrmaSession.RequestIssuancePermission",
		"sessionId":            sh.sessionID,
		"issuerName":           issuerName,
		"issuedCredentials":    request.CredentialInfoList,
		"toDisclose":           request.ToDisclose(),
		"disclosureCandidates": request.Candidates,
	}

	sh.permissionHandler = ph
	sendAction(action)
}

func (sh *SessionHandler) RequestVerificationPermission(request irma.DisclosureRequest, verifierName string, ph irmaclient.PermissionHandler) {
	logDebug("Handling RequestVerificationPermission")
	action := &OutgoingAction{
		"type":                 "IrmaSession.RequestVerificationPermission",
		"sessionId":            sh.sessionID,
		"verifierName":         verifierName,
		"toDisclose":           request.ToDisclose(),
		"disclosureCandidates": request.Candidates,
	}

	sh.permissionHandler = ph
	sendAction(action)
}

func (sh *SessionHandler) RequestSignaturePermission(request irma.SignatureRequest, requesterName string, ph irmaclient.PermissionHandler) {
	logDebug("Handling RequestSignaturePermission")
	action := &OutgoingAction{
		"type":                 "IrmaSession.RequestSignaturePermission",
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

func (sh *SessionHandler) MissingKeyshareEnrollment(manager irma.SchemeManagerIdentifier) {
	logDebug("Handling MissingKeyshareEnrollment")
	action := &OutgoingAction{
		"type":            "IrmaSession.MissingKeyshareEnrollment",
		"sessionId":       sh.sessionID,
		"schemeManagerId": manager,
	}

	sendAction(action)
}
