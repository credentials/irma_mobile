const initialState = {
  loaded: false,
  hasKeyshare: null,

  status: null,
  error: null,
};

export default function changePin(state = initialState, action) {
  switch(action.type) {
    case 'IrmaClient.HasKeyshare':
      return {
        ...state,
        loaded: true,
        hasKeyshare: action.hasKeyshare,
      };
    case 'ChangePin.Start':
      return {
        ...state,
        status: 'started',
      }
    case 'IrmaBridge.ChangePin':
      return {
        ...state,
        status: 'changing',
      }
    case 'IrmaClient.ChangePinSuccess':
      return {
        ...state,
        status: 'success',
      }
    case 'IrmaClient.ChangePinIncorrect':
      return {
        ...state,
        status: 'pinError',
      }
    case 'IrmaClient.ChangePinFailure':
      return {
        ...state,
        status: 'error',
        error: action.error,
      }
    default:
      return state
  }
}
