const initialState = {
  initialSessionPointer: null,
  sessionPointer: null,

  cachedIsEnrolledLoaded: false,
  cachedIsEnrolled: null,

  showForcedUpdate: false,
};

export default function navigation(state = initialState, action) {
  switch (action.type) {
    case 'Navigation.SetInitialSessionPointer': {
      // Handle the initialSessionPointer once in the application lifetime
      if (state.initialSessionPointer)
        return state;

      return {
        ...state,
        initialSessionPointer: action.initialSessionPointer,
      };
    }

    case 'Navigation.SetSessionPointer': {
      return {
        ...state,
        sessionPointer: action.sessionPointer,
      };
    }

    case 'Navigation.SetCachedIsEnrolled': {
      return {
        ...state,
        cachedIsEnrolledLoaded: true,
        cachedIsEnrolled: action.cachedIsEnrolled,
      };
    }

    case 'Navigation.ShowForceUpdate': {
      return {
        ...state,
        showForcedUpdate: true,
      };
    }

    default:
      return state;
  }
}