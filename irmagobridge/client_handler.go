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

	// Make sure the error is wrapped in a SessionError, so we only have one type to handle in irma_mobile
	err, ok := plainErr.(*irma.SessionError)
	if !ok {
		err = &irma.SessionError{ErrorType: irma.ErrorType("unknown"), Err: plainErr}
	}

	action := &OutgoingAction{
		"type":            "IrmaClient.EnrollmentFailure",
		"schemeManagerId": managerIdentifier,
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

func (ch *ClientHandler) EnrollmentSuccess(managerIdentifier irma.SchemeManagerIdentifier) {
	logDebug("Handling EnrollmentSuccess")

	action := &OutgoingAction{
		"type":            "IrmaClient.EnrollmentSuccess",
		"schemeManagerId": managerIdentifier,
	}

	sendEnrollmentStatus()
	sendAction(action)
}

func (ch *ClientHandler) ChangePinFailure(manager irma.SchemeManagerIdentifier, err error) {

}

func (ch *ClientHandler) ChangePinSuccess(manager irma.SchemeManagerIdentifier) {

}

func (ch *ClientHandler) ChangePinIncorrect(manager irma.SchemeManagerIdentifier) {

}
