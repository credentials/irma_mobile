const initialState = {
  status: 'idle',
  remainingAttempts: -1,
};

export default function changePin(state = initialState, action) {
  switch (action.type) {
    case 'ChangePin.Reset':
      return initialState;

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
        status: 'pinIncorrect',
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
