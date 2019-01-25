export const STATUS_UNAUTHENTICATED = 'unauthenticated';
export const STATUS_AUTHENTICATING = 'authenticating';
export const STATUS_AUTHENTICATED = 'authenticated';

const initialState = {
  error: null,
  hadFailure: false,
  remainingAttempts: 0,
  blockedDuration: 0,
  status: __DEV__ && true ? STATUS_AUTHENTICATED : STATUS_UNAUTHENTICATED,
};

export default function appUnlock(state = initialState, action) {
  switch (action.type) {
    case 'AppUnlock.Reset': {
      return {
        ...state,
        error: null,
      };
    }

    case 'AppUnlock.Lock': {
      return {
        ...state,
        status: STATUS_UNAUTHENTICATED,
      };
    }

    case 'IrmaBridge.Authenticate': {
      return {
        ...state,
        status: STATUS_AUTHENTICATING,
        hadFailure: false,
      };
    }

    case 'IrmaClient.AuthenticateSuccess': {
      return {
        ...state,
        status: STATUS_AUTHENTICATED,
      };
    }

    case 'IrmaClient.AuthenticateFailure': {
      return {
        ...state,
        status: STATUS_UNAUTHENTICATED,
        hadFailure: true,
        remainingAttempts: action.remainingAttempts,
        blockedDuration: action.blockedDuration,
      };
    }

    case 'IrmaClient.AuthenticateError': {
      return {
        ...state,
        status: 'unauthenticated',
        error: action.error,
      };
    }

    default:
      return state;
  }
}