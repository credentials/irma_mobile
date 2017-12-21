const isValidSessionAction = (state, action) => {
  if (action.sessionId == 0 && action.type !== 'IrmaBridge.NewSession') {
    return true;
  }

  switch(action.type) {
    case 'IrmaBridge.NewSession': {
      if(typeof action.sessionId !== 'number' || action.sessionId < 1) {
        console.error('Invalid session ID', action.sessionId, 'for new session'); // eslint-disable-line no-console
        return false;
      }

      if(state.hasOwnProperty(action.sessionId)) {
        console.error('Session ID', action.sessionId, 'for new session has already been used'); // eslint-disable-line no-console
        return false;
      }

      return true;
    }

    case 'SessionHandler.StatusUpdate':
    case 'SessionHandler.Success':
    case 'SessionHandler.Failure':
    case 'SessionHandler.Cancelled':
    case 'SessionHandler.UnsatisfiableRequest':
    case 'SessionHandler.RequestIssuancePermission':
    case 'SessionHandler.RequestVerificationPermission':
    case 'SessionHandler.RequestSignaturePermission':
    case 'SessionHandler.RequestPin':
    case 'SessionHandler.MissingKeyshareEnrollment':
    case 'IrmaBridge.RespondPermission':
    case 'Session.MakeDisclosureChoice':{
      if(!state.hasOwnProperty(action.sessionId)) {
        console.error('Session ID', action.sessionId, 'for action', action.type, 'cannot be found'); // eslint-disable-line no-console
        return false;
      }

      return true;
    }

    default: {
      return false;
    }
  }
};

const initialDisclosureChoices = (disclosureCandidates) =>
  disclosureCandidates.map(dc => dc[0]);

const initialState = {};
export default function credentials(state = initialState, action) {

  if(!isValidSessionAction(state, action))
    return state;

  // sessionId is '0' if started a manual session from a signature request
  const { sessionId } = action;

  switch(action.type) {
    case 'IrmaBridge.NewSession': {
      return {
        ...state,
        [sessionId]: {
          id: sessionId,
          qr: action.qr,
        }
      };
    }

    case 'IrmaBridge.NewManualSession': {
      return {
        ...state,
        [sessionId]: {
          status: 'started',
          id: sessionId, // should be 0
          request: action.request,
        }
      };
    }

    case 'SessionHandler.StatusUpdate': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          irmaAction: action.irmaAction,
          status: action.status,
        }
      };
    }

    case 'SessionHandler.Success': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'success',
          result: action.result,
        }
      };
    }

    case 'SessionHandler.Failure': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'failure',
          irmaAction: action.irmaAction,
          errorType: action.errorType,
          errorMessage: action.errorMessage,
          errorInfo: action.errorInfo,
          errorStatus: action.errorStatus,
          apiError: action.apiError,
        }
      };
    }

    case 'SessionHandler.Cancelled': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'cancelled',
        }
      };
    }

    case 'SessionHandler.UnsatisfiableRequest': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'unsatisfiableRequest',
          missingAttributes: action.missingAttributes,
        }
      };
    }

    case 'SessionHandler.RequestIssuancePermission': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'requestPermission',
          issuerName: action.issuerName,
          issuedCredentials: action.issuedCredentials,
          toDisclose: action.toDisclose || [], // TODO: Fix defensive
          disclosureCandidates: action.disclosureCandidates,

          disclosureChoices: initialDisclosureChoices(action.disclosureCandidates),
        }
      };
    }

    case 'SessionHandler.RequestVerificationPermission': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'requestPermission',
          verifierName: action.verifierName,
          toDisclose: action.toDisclose || [], // TODO: Fix defensive
          disclosureCandidates: action.disclosureCandidates,

          disclosureChoices: initialDisclosureChoices(action.disclosureCandidates),
        }
      };
    }

    case 'SessionHandler.RequestSignaturePermission': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'requestPermission',
          requesterName: action.requesterName,
          toDisclose: action.toDisclose || [], // TODO: Fix defensive
          disclosureCandidates: action.disclosureCandidates,
          message: action.message,
          messageType: action.messageType,

          disclosureChoices: initialDisclosureChoices(action.disclosureCandidates),
        }
      };
    }

    case 'SessionHandler.RequestPin': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'requestPin',
          remainingAttempts: action.remainingAttempts,
        }
      };
    }

    case 'SessionHandler.MissingKeyshareEnrollment': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'missingKeyshareEnrollment',
          missingSchemeManagerId: action.schemeManagerId,
        }
      };
    }

    case 'IrmaBridge.RespondPermission': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
        }
      };
    }

    case 'Session.MakeDisclosureChoice': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          disclosureChoices: Object.assign(
            [], state[sessionId].disclosureChoices, {
              [action.disclosureIndex]: action.choice
            }
          )
        }
      };
    }

    default:
      return state;
  }
}
