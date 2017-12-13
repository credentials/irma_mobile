// TODO import from sessions reducer?
const initialDisclosureChoices = (disclosureCandidates) =>
  disclosureCandidates.map(dc => dc[0]);

const initialState = {};
export default function credentials(state = initialState, action) {
  switch(action.type) {

    case 'IrmaBridge.NewManualSession': {
      return {
        ...state,
        status: 'started',
        request: action.request,
      };
    }

    case 'ManualSessionHandler.StatusUpdate': {
      return {
        ...state,
        irmaAction: action.irmaAction,
        status: action.status,
      };
    }
    
    case 'ManualSessionHandler.RequestSignaturePermission': {
      return {
        ...state,
        status: 'requestPermission',
        requesterName: action.requesterName,
        toDisclose: action.toDisclose || [], // TODO: Fix defensive
        disclosureCandidates: action.disclosureCandidates,
        message: action.message,
        messageType: action.messageType,
        disclosureChoices: initialDisclosureChoices(action.disclosureCandidates),
      };
    }

    case 'ManualSessionHandler.Success': {
      return {
        ...state,
        status: 'success',
        result: action.result,
      };
    }

    case 'ManualSessionHandler.Failure': {
      return {
        ...state,
        status: 'failure',
        irmaAction: action.irmaAction,
        errorType: action.errorType,
        errorMessage: action.errorMessage,
        errorInfo: action.errorInfo,
        errorStatus: action.errorStatus,
        apiError: action.apiError,
      };
    }

    case 'ManualSessionHandler.Cancelled': {
      return {
        ...state,
        status: 'cancelled',
      };
    }

    case 'ManualSessionHandler.UnsatisfiableRequest': {
      return {
        ...state,
          status: 'unsatisfiableRequest',
          missingAttributes: action.missingAttributes,
      };
    }

    case 'ManualSessionHandler.RequestPin': {
      return {
        ...state,
        status: 'requestPin',
        remainingAttempts: action.remainingAttempts,
      };
    }

    case 'ManualSessionHandler.MissingKeyshareEnrollment': {
      return {
        ...state,
        status: 'missingKeyshareEnrollment',
        missingSchemeManagerId: action.schemeManagerId,
      };
    }

    case 'ManualSession.MakeDisclosureChoice': {
      return {
        ...state,
        disclosureChoices: Object.assign(
          [], state.manual.disclosureChoices, {
            [action.disclosureIndex]: action.choice
          }
        )
      };
    }

    default: {
      return state;
    }
  }
}
