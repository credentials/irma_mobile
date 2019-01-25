import _ from 'lodash';

const fullCredentialType = (credentialType, configurationPath) => {
  const { SchemeManagerID, IssuerID, ID } = credentialType;

  return {
    ...credentialType,
    fullID: `${SchemeManagerID}.${IssuerID}.${ID}`,
    logoUri: `file://${configurationPath}/${SchemeManagerID}/${IssuerID}/Issues/${ID}/logo.png`,
  };
};

export default (credentialTypes, configurationPath) =>
  _.mapValues(credentialTypes, credentialType => fullCredentialType(credentialType, configurationPath));