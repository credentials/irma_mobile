const initialState = {
  credentialTypes: {},
  issuers: {},
  schemeManagers: {},

  preferences: {},

  unenrolledSchemeManagers: [],

  loaded: false,
};

export default function irmaConfiguration(state = initialState, action) {
  switch(action.type) {
    case 'IrmaClient.Configuration': {
      const irmaConfig = action.irmaConfiguration;

      return {
        ...state,
        loaded: true,
        credentialTypes: irmaConfig.CredentialTypes,
        issuers: irmaConfig.Issuers,
        schemeManagers: irmaConfig.SchemeManagers,
      };
    }

    default:
      return state;
  }
}
