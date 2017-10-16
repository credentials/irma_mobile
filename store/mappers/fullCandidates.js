import _ from 'lodash';

const fullCandidateAttribute = (candidateAttribute, irmaConfiguration, credentials) => {
  const { schemeManagers, issuers, credentialTypes } = irmaConfiguration;

  const [schemeManagerId, issuerId, credentialTypeId, attributeId] = candidateAttribute.Type.split('.');
  const fullCredentialTypeId = [schemeManagerId, issuerId, credentialTypeId].join('.');

  const SchemeManager = schemeManagers[schemeManagerId];
  const Issuer = issuers[`${schemeManagerId}.${issuerId}`];
  const CredentialType = credentialTypes[fullCredentialTypeId];
  const Credential = _.find(credentials, c => c.CredentialTypeID == fullCredentialTypeId);

  const attributeIndex = _.findIndex(CredentialType.Attributes, a => a.ID == attributeId);

  return {
    ...candidateAttribute,
    ...CredentialType.Attributes[attributeIndex],
    Value: Credential.Attributes[attributeIndex],

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
