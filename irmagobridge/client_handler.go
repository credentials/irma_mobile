package irmagobridge

import "github.com/privacybydesign/irmago"

type ClientHandler struct {
}

func (ch *ClientHandler) UpdateConfiguration(new *irma.IrmaIdentifierSet) {
	logDebug("Handling UpdateConfiguration")
	getConfiguration()
}

func (ch *ClientHandler) UpdateAttributes() {
	logDebug("Handling UpdateAttributes")
	getCredentials()
}

func (ch *ClientHandler) EnrollmentError(managerIdentifier irma.SchemeManagerIdentifier, err error) {
	logDebug("Handling EnrollmentError")

	action := &OutgoingAction{
		"type":            "ClientHandler.EnrollmentError",
		"schemeManagerId": managerIdentifier,
		"error":           err.Error(),
	}

	sendAction(action)
}

func (ch *ClientHandler) EnrollmentSuccess(managerIdentifier irma.SchemeManagerIdentifier) {
	logDebug("Handling EnrollmentSuccess")

	action := &OutgoingAction{
		"type":            "ClientHandler.EnrollmentSuccess",
		"schemeManagerId": managerIdentifier,
	}

	getEnrollmentStatus()
	sendAction(action)
}
