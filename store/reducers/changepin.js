const initialState = {
  loaded: false,
  hasKeyshare: null,

  status: null,
  error: null,
};

export default function changepin(state = initialState, action) {
  switch(action.type) {
    case 'IrmaClient.HasKeyshare':
      return {
        ...state,
        loaded: true,
        hasKeyshare: action.hasKeyshare,
      };
    case 'Changepin.Start':
      return {
        ...state,
        status: 'started',
      }
    case 'IrmaBridge.Changepin':
      return {
        ...state,
        status: 'changing',
      }
    case 'IrmaClient.ChangepinSuccess':
      return {
        ...state,
        status: 'success',
      }
    case 'IrmaClient.ChangepinIncorrect':
      return {
        ...state,
        status: 'pinerror',
      }
    case 'IrmaClient.ChangepinFailure':
      return {
        ...state,
        status: 'error',
        error: action.error,
      }
    default:
      return state
  }
}
