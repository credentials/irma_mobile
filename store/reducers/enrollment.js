import _ from 'lodash';

const initialState = {
  unenrolledSchemeManagerIds: [],
  loaded: false,
};

export default function enrollment(state = initialState, action) {
  const schemeManagerId = action.schemeManagerId;

  switch(action.type) {
    case 'CredentialManager.UnenrolledSchemeManagers': {
      return {
        ...state,
        loaded: true,
        unenrolledSchemeManagerIds: action.managers,
      };
    }

    case 'Enrollment.Start': {
      return {
        ...state,
        [schemeManagerId]: {
          schemeManagerId: schemeManagerId,
          status: 'started',
        }
      };
    }

    case 'ClientHandler.EnrollmentSuccess': {
      return {
        ...state,
        [schemeManagerId]: {
          ...state[schemeManagerId],
          status: 'success',
        }
      };
    }

    case 'ClientHandler.EnrollmentError': {
      return {
        ...state,
        [schemeManagerId]: {
          ...state[schemeManagerId],
          status: 'failure',
          error: action.error,
        }
      };
    }

    case 'Enrollment.Dismiss': {
      return _.omit(state, schemeManagerId);
    }

    default:
      return state;
  }
}
