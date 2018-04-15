package irmagobridge

import "github.com/privacybydesign/irmago"

type ClientHandler struct {
}

func (ch *ClientHandler) UpdateConfiguration(new *irma.IrmaIdentifierSet) {
	logDebug("Handling UpdateConfiguration")
	sendConfiguration()
}

func (ch *ClientHandler) UpdateAttributes() {
	logDebug("Handling UpdateAttributes")
	sendCredentials()
}

func (ch *ClientHandler) EnrollmentFailure(managerIdentifier irma.SchemeManagerIdentifier, plainErr error) {
	logDebug("Handling EnrollmentFailure")

	err, ok := plainErr.(*irma.SessionError)
	if !ok {
		err = &irma.SessionError{ErrorType: irma.ErrorType("unknown"), Err: plainErr}
	}

	action := &OutgoingAction{
		"type":            "IrmaClient.EnrollmentFailure",
		"schemeManagerId": managerIdentifier,
		"error": &OutgoingAction{
			"type":         err.ErrorType,
			"message":      err.Error(),
			"info":         err.Info,
			"stack":        err.Stack(),
			"remoteStatus": err.RemoteStatus,
			"remoteError":  err.RemoteError,
		},
	}

	sendAction(action)
}

func (ch *ClientHandler) EnrollmentSuccess(managerIdentifier irma.SchemeManagerIdentifier) {
	logDebug("Handling EnrollmentSuccess")

	action := &OutgoingAction{
		"type":            "IrmaClient.EnrollmentSuccess",
		"schemeManagerId": managerIdentifier,
	}

	sendEnrollmentStatus()
	sendAction(action)
}
