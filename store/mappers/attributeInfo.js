import _ from 'lodash';

// Takes a full attributeTypeId, and returns all associated information,
// including the index at which the attribute is located within the credential
export default (fullAttributeTypeId, irmaConfiguration) => {
  const { schemeManagers, issuers, credentialTypes, attributeTypes } = irmaConfiguration;
  const [schemeManagerId, issuerId, credentialTypeId] = fullAttributeTypeId.split('.');

  const SchemeManager = schemeManagers[schemeManagerId];
  const Issuer = issuers[`${schemeManagerId}.${issuerId}`];
  const CredentialType = credentialTypes[`${schemeManagerId}.${issuerId}.${credentialTypeId}`];
  const AttributeType = attributeTypes[fullAttributeTypeId];

  return {
    SchemeManager,
    Issuer,
    CredentialType,
    AttributeType,
  };
};

export const groupIntoCredentials = candidateSet => Object.values(
  _.reduce(candidateSet, (grouped, candidate) => ({
    ...grouped,
    [candidate.CredentialType.fullID]: Object.assign([],
      grouped[candidate.CredentialType.fullID]).concat([candidate]),
  }), {})
);