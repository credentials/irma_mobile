import moment from 'moment';

export const STATUS_UNAUTHENTICATED = 'unauthenticated';
export const STATUS_AUTHENTICATING = 'authenticating';
export const STATUS_AUTHENTICATED = 'authenticated';

// Don't show appUnlock in development, for convenience
const initialStatus = __DEV__ && true ? STATUS_AUTHENTICATED : STATUS_UNAUTHENTICATED;

// Helper to derive isAuthenticated
const statusValues = (status) => ({
  status,
  isAuthenticated: status === STATUS_AUTHENTICATED,
});

// Helper to derive isForegrounded
const appStateValues = (appState) => {
  const isForegrounded = appState === 'active';
  const values = {
    appState,
    isForegrounded,
  };

  if (isForegrounded)
    values.lastForegroundedTime = new Date().valueOf();

  return values;
};

// State to clear when unmounting AppUnlock
const resetState = {
  error: null,
  hadFailure: false,
  remainingAttempts: 0,
  blockedDuration: 0,
};

const initialState = {
  ...resetState,
  ...statusValues(initialStatus),
  ...appStateValues('active'),
};

export default function appUnlock(state = initialState, action) {
  switch (action.type) {
    case 'AppUnlock.Reset': {
      return {
        ...state,
        ...resetState,
      };
    }

    case 'AppUnlock.Lock': {
      return {
        ...state,
        ...statusValues(STATUS_UNAUTHENTICATED),
      };
    }

    case 'AppUnlock.AppStateChanged': {
      return {
        ...state,
        ...appStateValues(action.appState),
      };
    }

    case 'IrmaBridge.Authenticate': {
      return {
        ...state,
        ...statusValues(STATUS_AUTHENTICATING),
        hadFailure: false,
        error: null,
      };
    }

    case 'IrmaClient.AuthenticateSuccess': {
      return {
        ...state,
        ...statusValues(STATUS_AUTHENTICATED),
      };
    }

    case 'IrmaClient.AuthenticateFailure': {
      return {
        ...state,
        ...statusValues(STATUS_UNAUTHENTICATED),
        hadFailure: true,
        remainingAttempts: action.remainingAttempts,
        blockedDuration: action.blockedDuration,
      };
    }

    case 'IrmaClient.AuthenticateError': {
      return {
        ...state,
        ...statusValues(STATUS_UNAUTHENTICATED),
        error: action.error,
      };
    }

    // When successfully enrolled, also set that we're authenticated
    case 'IrmaClient.EnrollmentSuccess': {
      return {
        ...state,
        ...statusValues(STATUS_AUTHENTICATED),
      };
    }

    default:
      return state;
  }
}