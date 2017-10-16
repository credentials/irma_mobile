package irmagobridge

import "github.com/credentials/irmago"

type ClientHandler struct {
}

func (ch *ClientHandler) UpdateConfigurationStore(new *irmago.IrmaIdentifierSet) {
	logDebug("Handling UpdateConfigurationStore")
	getConfiguration()
}

func (ch *ClientHandler) UpdateAttributes() {
	logDebug("Handling UpdateAttributes")
	getCredentials()
}

func (ch *ClientHandler) EnrollmentError(managerIdentifier irmago.SchemeManagerIdentifier, err error) {
	logDebug("Handling EnrollmentError")

	action := &OutgoingAction{
		"type":            "ClientHandler.EnrollmentError",
		"schemeManagerId": managerIdentifier,
		"error":           err.Error(),
	}

	sendAction(action)
}

func (ch *ClientHandler) EnrollmentSuccess(managerIdentifier irmago.SchemeManagerIdentifier) {
	logDebug("Handling EnrollmentSuccess")

	action := &OutgoingAction{
		"type":            "ClientHandler.EnrollmentSuccess",
		"schemeManagerId": managerIdentifier,
	}

	getEnrollmentStatus()
	sendAction(action)
}
