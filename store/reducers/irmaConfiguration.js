const initialState = {
  credentialTypes: {},
  issuers: {},
  schemeManagers: {},
  unenrolledSchemeManagers: [],

  loaded: false,
};

export default function irmaConfiguration(state = initialState, action) {
  switch(action.type) {
    case 'CredentialManager.Configuration': {
      const config = action.configuration;

      return {
        ...state,
        loaded: true,
        credentialTypes: config.CredentialTypes,
        issuers: config.Issuers,
        schemeManagers: config.SchemeManagers,
      };
    }

    default:
      return state;
  }
}
