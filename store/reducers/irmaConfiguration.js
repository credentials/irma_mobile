const initialState = {
  credentialTypes: {},
  issuers: {},
  schemeManagers: {},

  sentryDSN: '',

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
        sentryDSN: action.sentryDSN,
      };
    }

    default:
      return state;
  }
}
