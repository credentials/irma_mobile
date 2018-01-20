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

func (ch *ClientHandler) EnrollmentError(managerIdentifier irma.SchemeManagerIdentifier, err error) {
	logDebug("Handling EnrollmentError")

	action := &OutgoingAction{
		"type":            "IrmaClient.EnrollmentError",
		"schemeManagerId": managerIdentifier,
		"error":           err.Error(),
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
