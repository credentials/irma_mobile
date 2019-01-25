export const STATUS_UNAUTHENTICATED = 'unauthenticated';
export const STATUS_AUTHENTICATING = 'authenticating';
export const STATUS_AUTHENTICATED = 'authenticated';

const initialState = {
  status: __DEV__ ? STATUS_AUTHENTICATED : STATUS_UNAUTHENTICATED,
  hadFailure: false,
  remainingAttempts: 4,
};

export default function appUnlock(state = initialState, action) {
  switch (action.type) {
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
        hadFailure: true,
        error: action.error,
      };
    }

    case 'AppUnlock.Lock': {
      return {
        ...state,
        status: STATUS_UNAUTHENTICATED,
      };
    }

    default:
      return state;
  }
}