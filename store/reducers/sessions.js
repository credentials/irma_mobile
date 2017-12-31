const isValidSessionAction = (state, action) => {
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

    case 'IrmaSession.StatusUpdate':
    case 'IrmaSession.Success':
    case 'IrmaSession.Failure':
    case 'IrmaSession.Cancelled':
    case 'IrmaSession.UnsatisfiableRequest':
    case 'IrmaSession.RequestIssuancePermission':
    case 'IrmaSession.RequestVerificationPermission':
    case 'IrmaSession.RequestSignaturePermission':
    case 'IrmaSession.RequestPin':
    case 'IrmaSession.MissingKeyshareEnrollment':
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

  const { sessionId } = action;

  switch(action.type) {
    case 'IrmaBridge.NewSession': {
      return {
        ...state,
        [sessionId]: {
          id: sessionId,
          qr: action.qr,
          didRespondPermission: false,
        }
      };
    }

    case 'IrmaSession.StatusUpdate': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          irmaAction: action.irmaAction,
          status: action.status,
        }
      };
    }

    case 'IrmaSession.Success': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'success',
        }
      };
    }

    case 'IrmaSession.Failure': {
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
          errorStack: action.errorStack,
          apiError: action.apiError,
        }
      };
    }

    case 'IrmaSession.Cancelled': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'cancelled',
        }
      };
    }

    case 'IrmaSession.UnsatisfiableRequest': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'unsatisfiableRequest',
          missingAttributes: action.missingAttributes,
        }
      };
    }

    case 'IrmaSession.RequestIssuancePermission': {
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

    case 'IrmaSession.RequestVerificationPermission': {
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

    case 'IrmaSession.RequestSignaturePermission': {
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

    case 'IrmaSession.RequestPin': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'requestPin',
          remainingAttempts: action.remainingAttempts,
        }
      };
    }

    case 'IrmaSession.MissingKeyshareEnrollment': {
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
          didRespondPermission: true,
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
