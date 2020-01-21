package irmagobridge

import (
	"errors"
	"github.com/privacybydesign/irmago"
	"github.com/privacybydesign/irmago/irmaclient"
)

type SessionHandler struct {
	sessionID         int
	dismisser         irmaclient.SessionDismisser
	permissionHandler irmaclient.PermissionHandler
	pinHandler        irmaclient.PinHandler
}

// SessionHandler implements irmaclient.Handler
var _ irmaclient.Handler = (*SessionHandler)(nil)

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

func (sh *SessionHandler) ClientReturnURLSet(clientReturnURL string) {
	logDebug("Handling ClientReturnURLSet")
	action := &OutgoingAction{
		"type":            "IrmaSession.ClientReturnURLSet",
		"sessionId":       sh.sessionID,
		"clientReturnUrl": clientReturnURL,
	}

	sendAction(action)
}

func (sh *SessionHandler) Success(result string) {
	logDebug("Handling Success")
	action := &OutgoingAction{
		"type":      "IrmaSession.Success",
		"sessionId": sh.sessionID,
		"result":    result,
	}

	sendAction(action)
}

func (sh *SessionHandler) Failure(err *irma.SessionError) {
	logDebug("Handling Failure")

	action := &OutgoingAction{
		"type":      "IrmaSession.Failure",
		"sessionId": sh.sessionID,
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

func (sh *SessionHandler) Cancelled() {
	logDebug("Handling Cancelled")
	action := &OutgoingAction{
		"type":      "IrmaSession.Cancelled",
		"sessionId": sh.sessionID,
	}

	sendAction(action)
}

func (sh *SessionHandler) UnsatisfiableRequest(request irma.SessionRequest,
	serverName irma.TranslatedString, missing irmaclient.MissingAttributes) {
	logDebug("Handling UnsatisfiableRequest")
	action := &OutgoingAction{
		"type":               "IrmaSession.UnsatisfiableRequest",
		"sessionId":          sh.sessionID,
		"serverName":         serverName,
		"missingDisclosures": missing,
		"disclosuresLabels":  request.Disclosure().Labels,
	}

	sendAction(action)
}

func CheckContainsCredentialIdentifiers(request *irma.DisclosureRequest) *irma.SessionError {
	for _, discon := range request.Disclose {
		for _, con := range discon {
			for _, attrReq := range con {
				if attrReq.Type.IsCredential() {
					return &irma.SessionError{
						ErrorType: irma.ErrorInvalidRequest,
						Err:       errors.New("Request should only contain AttributeIdentifiers"),
					}
				}
			}
		}
	}
	return nil
}

func (sh *SessionHandler) RequestIssuancePermission(request *irma.IssuanceRequest, candidates [][][]*irma.AttributeIdentifier, serverName irma.TranslatedString, ph irmaclient.PermissionHandler) {
	logDebug("Handling RequestIssuancePermission")
	disclose := request.Disclose
	if disclose == nil {
		disclose = irma.AttributeConDisCon{}
	}
	err := CheckContainsCredentialIdentifiers(request.Disclosure())
	if err != nil {
		sh.Failure(err)
	} else {
		action := &OutgoingAction{
			"type":                  "IrmaSession.RequestIssuancePermission",
			"sessionId":             sh.sessionID,
			"serverName":            serverName,
			"issuedCredentials":     request.CredentialInfoList,
			"disclosures":           disclose,
			"disclosuresLabels":     request.Labels,
			"disclosuresCandidates": candidates,
		}

		sh.permissionHandler = ph
		sendAction(action)
	}
}

func (sh *SessionHandler) RequestVerificationPermission(request *irma.DisclosureRequest, candidates [][][]*irma.AttributeIdentifier, serverName irma.TranslatedString, ph irmaclient.PermissionHandler) {
	logDebug("Handling RequestVerificationPermission")
	err := CheckContainsCredentialIdentifiers(request)
	if err != nil {
		sh.Failure(err)
	} else {
		action := &OutgoingAction{
			"type":                  "IrmaSession.RequestVerificationPermission",
			"sessionId":             sh.sessionID,
			"serverName":            serverName,
			"disclosures":           request.Disclose,
			"disclosuresLabels":     request.Labels,
			"disclosuresCandidates": candidates,
		}

		sh.permissionHandler = ph
		sendAction(action)
	}
}

func (sh *SessionHandler) RequestSignaturePermission(request *irma.SignatureRequest, candidates [][][]*irma.AttributeIdentifier, serverName irma.TranslatedString, ph irmaclient.PermissionHandler) {
	logDebug("Handling RequestSignaturePermission")
	err := CheckContainsCredentialIdentifiers(request.Disclosure())
	if err != nil {
		sh.Failure(err)
	} else {
		action := &OutgoingAction{
			"type":                  "IrmaSession.RequestSignaturePermission",
			"sessionId":             sh.sessionID,
			"serverName":            serverName,
			"disclosures":           request.Disclose,
			"disclosuresLabels":     request.Labels,
			"disclosuresCandidates": candidates,
			"message":               request.Message,
		}

		sh.permissionHandler = ph
		sendAction(action)
	}
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
