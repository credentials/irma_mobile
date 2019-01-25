import attributeTypes from 'store/mappers/attributeTypes';
import fullCredentialTypes from 'store/mappers/fullCredentialTypes';
import fullIssuers from 'store/mappers/fullIssuers';

const initialState = {
  credentialTypes: {},
  issuers: {},
  schemeManagers: {},

  sentryDSN: '',

  loaded: false,
};

export default function irmaConfiguration(state = initialState, action) {
  switch (action.type) {
    case 'IrmaClient.Configuration': {
      const irmaConfig = action.irmaConfiguration;
      const configurationPath = irmaConfig.Path;

      return {
        ...state,
        loaded: true,
        credentialTypes: fullCredentialTypes(irmaConfig.CredentialTypes, configurationPath),
        issuers: fullIssuers(irmaConfig.Issuers, configurationPath),
        schemeManagers: irmaConfig.SchemeManagers,
        configurationPath,
        sentryDSN: action.sentryDSN,

        // Make attribute information more easily available
        attributeTypes: attributeTypes(irmaConfig.CredentialTypes),
      };
    }

    default:
      return state;
  }
}
