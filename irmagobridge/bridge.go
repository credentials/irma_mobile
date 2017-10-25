package irmagobridge

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/credentials/irmago/irmaclient"
	"github.com/getsentry/raven-go"
	"github.com/go-errors/errors"
)

type IrmaBridge interface {
	SendEvent(channel string, message string)
	DebugLog(message string)
}

type OutgoingAction map[string]interface{}

var bridge IrmaBridge
var client *irmaclient.Client
var appDataVersion = "v2"

var actionHandler = &ActionHandler{
	sessionLookup: map[int]*SessionHandler{},
}

var clientHandler = &ClientHandler{}

func Start(givenBridge IrmaBridge, appDataPath string, assetsPath string) {
	// TODO: We'll leave this API token in the source for now,
	// as it's possible to decompile it out of the app anyway
	// In the future it would be good to split this out into a build configuration
	raven.SetDSN("https://04fd1cdaec154d55ae70458a3618cefa:f5f4fafac9e848e8b2a4f0752d4d0ee0@sentry.io/226950")

	raven.CapturePanic(func() {
		recoveredStart(givenBridge, appDataPath, assetsPath)
	}, nil)
}

func recoveredStart(givenBridge IrmaBridge, appDataPath string, assetsPath string) {
	bridge = givenBridge

	// Check for user data directory, and create version-specific directory
	exists, err := pathExists(appDataPath)
	if err != nil || !exists {
		logError(errors.Errorf("Cannot access app data directory: %s", err))
		return
	}

	appVersionDataPath := filepath.Join(appDataPath, appDataVersion)
	exists, err = pathExists(appVersionDataPath)
	if err != nil {
		logError(errors.Errorf("Cannot check for app data path existence: %s", err))
		return
	}

	if !exists {
		os.Mkdir(appVersionDataPath, 0770)
	}

	configurationPath := filepath.Join(assetsPath, "irma_configuration")
	// androidPath := filepath.Join(appDataPath, "android")
	androidPath := ""

	client, err = irmaclient.New(appVersionDataPath, configurationPath, androidPath, clientHandler)
	if err != nil {
		logError(errors.Errorf("Cannot initialize client: %s", err))
		return
	}

	getConfiguration()
	getEnrollmentStatus()
	getCredentials()
}

func sendAction(action *OutgoingAction) {
	jsonBytes, err := json.Marshal(action)
	if err != nil {
		logError(errors.Errorf("Cannot marshal action: %s", err))
		return
	}

	bridge.SendEvent("irmago", string(jsonBytes))
}

func getConfiguration() {
	sendAction(&OutgoingAction{
		"type":          "CredentialManager.Configuration",
		"configuration": client.Configuration,
	})
}

func getCredentials() {
	sendAction(&OutgoingAction{
		"type":        "CredentialManager.Credentials",
		"credentials": client.CredentialInfoList(),
	})
}

func getEnrollmentStatus() {
	sendAction(&OutgoingAction{
		"type":     "CredentialManager.UnenrolledSchemeManagers",
		"managers": client.UnenrolledSchemeManagers,
	})
}

func logError(err error) {
	message := fmt.Sprintf("%s\n%s", err.Error(), err.(*errors.Error).ErrorStack())

	raven.CaptureError(err, nil)
	bridge.DebugLog(message)
}

func logDebug(message string) {
	bridge.DebugLog(message)
}

// PathExists checks if the specified path exists.
func pathExists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return true, err
}
