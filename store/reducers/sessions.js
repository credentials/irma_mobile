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

    case 'IrmaSession.StatusUpdate':
    case 'IrmaSession.Success':
    case 'IrmaSession.Failure':
    case 'IrmaSession.Cancelled':
    case 'IrmaSession.UnsatisfiableRequest':
    case 'IrmaSession.RequestIssuancePermission':
    case 'IrmaSession.RequestVerificationPermission':
    case 'IrmaSession.RequestSignaturePermission':
    case 'IrmaSession.RequestPin':
    case 'IrmaSession.KeyshareEnrollmentMissing':
    case 'IrmaSession.KeyshareEnrollmentDeleted':
    case 'IrmaSession.KeyshareBlocked':
    case 'IrmaSession.KeyshareEnrollmentIncomplete':
    case 'IrmaBridge.RespondPermission':
    case 'Session.MakeDisclosureChoice': {
      if (!state.hasOwnProperty(action.sessionId)) {
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

const initialDisclosureChoices = (disclosuresCandidates) =>
  disclosuresCandidates.map(dc => dc[0]);

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
          request: action.request,
          exitAfter: action.exitAfter,
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
          result: action.result,
        }
      };
    }

    case 'IrmaSession.Failure': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'failure',
          error: action.error,
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
          serverName: action.serverName,
          missingDisclosures: action.missingDisclosures,
          disclosuresLabels: action.disclosuresLabels,
        },
      };
    }

    case 'IrmaSession.RequestIssuancePermission': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'requestPermission',
          serverName: action.serverName,
          issuedCredentials: action.issuedCredentials,
          disclosures: action.disclosures,
          disclosuresLabels: action.disclosuresLabels,
          disclosuresCandidates: action.disclosuresCandidates,

          disclosureChoices: initialDisclosureChoices(action.disclosuresCandidates),
          disclosureIndices: new Array(action.disclosures ? action.disclosures.length: 0).fill(0),
        },
      };
    }

    case 'IrmaSession.RequestVerificationPermission': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'requestPermission',
          serverName: action.serverName,
          disclosures: action.disclosures,
          disclosuresLabels: action.disclosuresLabels,
          disclosuresCandidates: action.disclosuresCandidates,

          disclosureChoices: initialDisclosureChoices(action.disclosuresCandidates),
          disclosureIndices: new Array(action.disclosures.length).fill(0),
        },
      };
    }

    case 'IrmaSession.RequestSignaturePermission': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'requestPermission',
          serverName: action.serverName,
          disclosures: action.disclosures,
          disclosuresLabels: action.disclosuresLabels,
          disclosuresCandidates: action.disclosuresCandidates,
          message: action.message,
          messageType: action.messageType,

          disclosureChoices: initialDisclosureChoices(action.disclosuresCandidates),
          disclosureIndices: new Array(action.disclosures.length).fill(0),
        },
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

    case 'IrmaSession.KeyshareEnrollmentMissing': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'keyshareEnrollmentMissing',
          missingSchemeManagerId: action.schemeManagerId,
        }
      };
    }

    case 'IrmaSession.KeyshareEnrollmentDeleted': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'keyshareEnrollmentDeleted',
          schemeManagerId: action.schemeManagerId,
        }
      };
    }

    case 'IrmaSession.KeyshareBlocked': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'keyshareBlocked',
          missingSchemeManagerId: action.schemeManagerId,
          duration: action.duration,
        }
      };
    }

    case 'IrmaSession.KeyshareEnrollmentIncomplete': {
      return {
        ...state,
        [sessionId]: {
          ...state[sessionId],
          status: 'keyshareEnrollmentIncomplete',
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
          disclosureIndices: Object.assign(
            [], state[sessionId].disclosureIndices, {
              [action.disclosureIndex]: action.choice,
            },
          ),
          disclosureChoices: Object.assign(
            [], state[sessionId].disclosureChoices, {
              [action.disclosureIndex]: state[sessionId].disclosuresCandidates[action.disclosureIndex][action.choice],
            },
          ),
        },
      };
    }

    default:
      return state;
  }
}
