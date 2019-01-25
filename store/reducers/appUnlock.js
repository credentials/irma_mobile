const initialState = {
  status: 'unauthenticated',
  hadFailure: false,
  remainingAttempts: 4,
};

export default function appUnlock(state = initialState, action) {
  switch (action.type) {
    case 'AppUnlock.Reset': {
      return initialState;
    }

    case 'IrmaBridge.Authenticate': {
      return {
        ...state,
        status: 'authenticating',
        hadFailure: false,
      };
    }

    case 'IrmaClient.AuthenticateSuccess': {
      return {
        ...state,
        status: 'authenticated',
      };
    }

    case 'IrmaClient.AuthenticateFailure': {
      return {
        ...state,
        status: 'unauthenticated',
        hadFailure: true,
        remainingAttempts: action.remainingAttempts,
      };
    }

    default:
      return state;
  }
}