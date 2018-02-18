import _ from 'lodash';

const initialState = {
  unenrolledSchemeManagerIds: [],
  loaded: false,
};

export default function enrollment(state = initialState, action) {
  switch(action.type) {
    case 'IrmaClient.UnenrolledSchemeManagers': {
      return {
        ...state,
        loaded: true,
        unenrolledSchemeManagerIds: action.managers,
      };
    }

    case 'Enrollment.Start': {
      return {
        ...state,
        status: 'started',
      };
    }

    case 'IrmaClient.EnrollmentSuccess': {
      return {
        ...state,
        status: 'success',
      };
    }

    case 'IrmaClient.EnrollmentError': {
      return {
        ...state,
        status: 'failure',
        error: action.error,
      };
    }

    case 'Enrollment.Dismiss': {
      return _.omit(state, 'status', 'error');
    }

    default:
      return state;
  }
}
