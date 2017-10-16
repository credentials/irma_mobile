import _ from 'lodash';

const fullAttributes = (attributes, attributeTypes) => {
  return _.zip(attributes, attributeTypes).map( ([attribute, attributeType]) => {
    return {
      ...attribute,
      Type: attributeType,
    };
  });
};

const fullCredential = (credential, { schemeManagers, credentialTypes, issuers }) => {
  const Type = credentialTypes[credential.CredentialTypeID];
  const { SchemeManagerID, IssuerID } = Type;

  const SchemeManager = schemeManagers[SchemeManagerID];
  const Issuer = issuers[`${SchemeManagerID}.${IssuerID}`];
  const Attributes = fullAttributes(credential.Attributes, Type.Attributes);

  return {
    ...credential,
    Attributes,
    Type,
    Issuer,
    SchemeManager,
  };
};

export default (credentials = [], irmaConfiguration) =>
  credentials.map(credential => fullCredential(credential, irmaConfiguration));
