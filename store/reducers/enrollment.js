import _ from 'lodash';

const initialState = {
  loaded: false,
  enrolledSchemeManagerIds: [],
  unenrolledSchemeManagerIds: [],

  status: null,
  error: null,
};

export default function enrollment(state = initialState, action) {
  switch (action.type) {
    case 'IrmaClient.EnrollmentStatus': {
      return {
        ...state,
        loaded: true,
        enrolledSchemeManagerIds: action.enrolledSchemeManagerIds,
        unenrolledSchemeManagerIds: action.unenrolledSchemeManagerIds,
      };
    }

    case 'Enrollment.Start': {
      return {
        ...state,
        status: 'started',
      };
    }

    case 'IrmaBridge.Enroll': {
      return {
        ...state,
        status: 'enrolling',
      };
    }

    case 'IrmaClient.EnrollmentSuccess': {
      return {
        ...state,
        status: 'success',
      };
    }

    case 'IrmaClient.EnrollmentFailure': {
      return {
        ...state,
        status: 'failure',
        error: action.error,
      };
    }

    case 'Enrollment.Dismiss': {
      return _.pick(state, 'unenrolledSchemeManagerIds');
    }

    default:
      return state;
  }
}
