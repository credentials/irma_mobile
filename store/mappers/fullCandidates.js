import _ from 'lodash';

const fullCandidateAttribute = (candidateAttribute, irmaConfiguration, credentials) => {
  const { schemeManagers, issuers, credentialTypes } = irmaConfiguration;

  // Split the candidate attribute type into parts, and get info out of irmaConfiguration
  const [schemeManagerId, issuerId, credentialId, attributeId] = candidateAttribute.Type.split('.');

  const SchemeManager = schemeManagers[schemeManagerId];
  const Issuer = issuers[`${schemeManagerId}.${issuerId}`];
  const CredentialType = credentialTypes[`${schemeManagerId}.${issuerId}.${credentialId}`];

  // Find the credential in which the candidate attribute is contained,
  // plus the attribute type and value at the correct index
  const Credential = _.find(credentials, c => c.Hash == candidateAttribute.CredentialHash);

  const attributeIndex = _.findIndex(CredentialType.Attributes, a => a.ID == attributeId);
  const attributeType = CredentialType.Attributes[attributeIndex];
  const Value = Credential.Attributes[attributeIndex];

  return {
    ...candidateAttribute,
    ...attributeType,
    Value,

    SchemeManager,
    Issuer,
    CredentialType,
  };
};

export default (candidates = [], irmaConfiguration, credentials) =>
  candidates.map( candidateAttributes =>
    candidateAttributes.map( candidateAttribute =>
      fullCandidateAttribute(candidateAttribute, irmaConfiguration, credentials)
    )
  );
