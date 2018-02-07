import _ from 'lodash';

// Takes a long attributeTypeId, and returns all associated information,
// including the index at which the attribute is located within the credential
export default (longAttributeTypeId, irmaConfiguration) => {
  const { schemeManagers, issuers, credentialTypes } = irmaConfiguration;
  const [schemeManagerId, issuerId, credentialTypeId, attributeTypeId] = longAttributeTypeId.split('.');

  const SchemeManager = schemeManagers[schemeManagerId];
  const Issuer = issuers[`${schemeManagerId}.${issuerId}`];
  const CredentialType = credentialTypes[`${schemeManagerId}.${issuerId}.${credentialTypeId}`];

  const attributeIndex = _.findIndex(CredentialType.Attributes, attr => attr.ID == attributeTypeId);
  const AttributeType = CredentialType.Attributes[attributeIndex];

  return {
    SchemeManager,
    Issuer,
    CredentialType,
    AttributeType,

    attributeIndex,
  };
};
