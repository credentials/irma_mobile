package irmagobridge

import (
	"encoding/json"

	raven "github.com/getsentry/raven-go"
	"github.com/go-errors/errors"
)

func ReceiveAction(actionJSONString string) {
	raven.CapturePanic(func() {
		recoveredReceiveAction(actionJSONString)
	}, nil)
}

func recoveredReceiveAction(actionJSONString string) {
	actionJSON := []byte(actionJSONString)

	actionType, err := getActionType(actionJSON)
	if err != nil {
		logError(err)
		return
	}

	logDebug("Received action with type " + actionType)

	switch actionType {
	case "Enroll":
		action := &EnrollAction{}
		if err = json.Unmarshal(actionJSON, action); err == nil {
			err = actionHandler.Enroll(action)
		}

	case "NewSession":
		action := &NewSessionAction{}
		if err = json.Unmarshal(actionJSON, action); err == nil {
			err = actionHandler.NewSession(action)
		}

	case "RespondPermission":
		action := &RespondPermissionAction{}
		if err = json.Unmarshal(actionJSON, action); err == nil {
			err = actionHandler.RespondPermission(action)
		}

	case "RespondPin":
		action := &RespondPinAction{}
		if err = json.Unmarshal(actionJSON, action); err == nil {
			err = actionHandler.RespondPin(action)
		}

	case "RemoveAllAttributes":
		err = actionHandler.RemoveAll()

	case "DismissSession":
		action := &DismissSessionAction{}
		if err = json.Unmarshal(actionJSON, action); err == nil {
			err = actionHandler.DismissSession(action)
		}

	case "SetCrashReportingPreference":
		action := &SetCrashReportingPreferenceAction{}
		if err = json.Unmarshal(actionJSON, &action); err == nil {
			err = actionHandler.SetCrashReportingPreference(action)
		}

	default:
		err = errors.Errorf("Unrecognized action type %s", actionType)
	}

	if err != nil {
		logError(errors.New(err))
	}
}

func getActionType(actionJSON []byte) (actionType string, err error) {
	action := new(struct{ Type string })
	err = json.Unmarshal(actionJSON, action)
	if err != nil {
		return "", errors.Errorf("Could not parse action type: %s", err)
	}

	return action.Type, nil
}
