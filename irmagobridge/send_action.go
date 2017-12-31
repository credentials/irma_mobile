package irmagobridge

import (
	"encoding/json"

	"github.com/go-errors/errors"
)

type OutgoingAction map[string]interface{}

func sendConfiguration() {
	sendAction(&OutgoingAction{
		"type":              "IrmaClient.Configuration",
		"irmaConfiguration": client.Configuration,
	})
}

func sendPreferences() {
	sendAction(&OutgoingAction{
		"type":        "IrmaClient.Preferences",
		"preferences": client.Preferences,
	})
}

func sendCredentials() {
	sendAction(&OutgoingAction{
		"type":        "IrmaClient.Credentials",
		"credentials": client.CredentialInfoList(),
	})
}

func sendEnrollmentStatus() {
	sendAction(&OutgoingAction{
		"type":     "IrmaClient.UnenrolledSchemeManagers",
		"managers": client.UnenrolledSchemeManagers,
	})
}

func sendAction(action *OutgoingAction) {
	jsonBytes, err := json.Marshal(action)
	if err != nil {
		logError(errors.Errorf("Cannot marshal action: %s", err))
		return
	}

	bridge.SendEvent("irmago", string(jsonBytes))
}
