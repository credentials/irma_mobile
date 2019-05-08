import fullCredentialTypes from 'store/mappers/fullCredentialTypes';
import fullIssuers from 'store/mappers/fullIssuers';

const initialState = {
  attributeTypes: {},
  credentialTypes: {},
  issuers: {},
  schemeManagers: {},

  sentryDSN: '',

  loaded: false,
  lastUpdateTime: '',
  showingUpdate: false,
};

export default function irmaConfiguration(state = initialState, action) {
  switch (action.type) {
    case 'IrmaClient.Configuration': {
      const irmaConfig = action.irmaConfiguration;
      const configurationPath = irmaConfig.Path;

      return {
        ...state,
        loaded: true,
        attributeTypes: irmaConfig.AttributeTypes,
        credentialTypes: fullCredentialTypes(irmaConfig.CredentialTypes, configurationPath),
        issuers: fullIssuers(irmaConfig.Issuers, configurationPath),
        schemeManagers: irmaConfig.SchemeManagers,
        configurationPath,
        sentryDSN: action.sentryDSN,
        lastUpdateTime: Date().valueOf(),
      };
    }

    case 'IrmaConfiguration.ShowingUpdate': {
      return {
        ...state,
        showingUpdate: true,
      };
    }

    default:
      return state;
  }
}
