const initialState = {
  loaded: false,
  hasKeyshare: null,

  status: null,
  error: null,
  remainingAttempts: -1,
};

export default function changePin(state = initialState, action) {
  switch(action.type) {
    case 'IrmaClient.EnrollmentStatus':
      return {
        ...state,
        loaded: true,
        hasKeyshare: action.hasKeyshare,
      };
    case 'ChangePin.Start':
      return {
        ...state,
        status: 'started',
        remainingAttempts: -1,
      };
    case 'IrmaBridge.ChangePin':
      return {
        ...state,
        status: 'changing',
      };
    case 'IrmaClient.ChangePinSuccess':
      return {
        ...state,
        status: 'success',
      };
    case 'IrmaClient.ChangePinIncorrect':
      return {
        ...state,
        status: 'pinError',
        remainingAttempts: action.remainingAttempts,
      };
    case 'IrmaClient.ChangePinBlocked':
      return {
        ...state,
        status: 'keyshareBlocked',
        timeout: action.timeout,
      };
    case 'IrmaClient.ChangePinFailure':
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    default:
      return state;
  }
}
