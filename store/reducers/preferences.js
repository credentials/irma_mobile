const initialState = {
  preferences: {},
  loaded: false,
};

export default function preferences(state = initialState, action) {
  switch(action.type) {
    case 'IrmaClient.Preferences': {
      const prefs = action.preferences;

      return {
        ...state,
        sentryDSN: prefs.SentryDSN,
        enableCrashReporting: prefs.EnableCrashReporting,
        loaded: true,
      };
    }

    default:
      return state;
  }
}
