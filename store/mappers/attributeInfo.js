import _ from 'lodash';

// Takes a full attributeTypeId, and returns all associated information,
// including the index at which the attribute is located within the credential
export default (fullAttributeTypeId, irmaConfiguration) => {
  const { schemeManagers, issuers, credentialTypes } = irmaConfiguration;
  const [schemeManagerId, issuerId, credentialTypeId, attributeTypeId] = fullAttributeTypeId.split('.');

  const SchemeManager = schemeManagers[schemeManagerId];
  const Issuer = issuers[`${schemeManagerId}.${issuerId}`];
  const CredentialType = credentialTypes[`${schemeManagerId}.${issuerId}.${credentialTypeId}`];

  const attributeIndex = _.findIndex(CredentialType.Attributes, attr => attr.ID === attributeTypeId); // TODO: Remove me when irmago offers index
  const AttributeType = CredentialType.Attributes[attributeIndex]; // TODO: Change me when irmago offers index

  return {
    SchemeManager,
    Issuer,
    CredentialType,
    AttributeType,

    attributeIndex, // TODO: Remove me when irmago offers index
  };
};
