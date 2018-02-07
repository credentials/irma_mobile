import _ from 'lodash';
import attributeInfo from './attributeInfo';

const fullCandidateAttribute = (disclosureCandidate, irmaConfiguration, credentials) => {
  const {
    SchemeManager,
    Issuer,
    CredentialType,
    AttributeType,
    attributeIndex
  } = attributeInfo(disclosureCandidate.Type, irmaConfiguration);

  // Find the credential in which the candidate attribute is contained,
  // plus the attribute type and value at the correct index
  const Credential = _.find(credentials, credential =>
    credential.Hash == disclosureCandidate.CredentialHash
  );

  const Value = Credential.Attributes[attributeIndex];

  return {
    SchemeManager,
    Issuer,
    CredentialType,

    Type: disclosureCandidate.Type,
    CredentialHash: disclosureCandidate.CredentialHash,
    ...AttributeType,

    Value,
  };
};

// The first argument `disclosuresCandidates` is of type [][]irma.AttributeIdentifier.
// A disclosureCandidate contains a Type and a CredentialHash
export default (disclosuresCandidates = [], irmaConfiguration, credentials) =>
  disclosuresCandidates.map(disclosureCandidates =>
    disclosureCandidates.map(disclosureCandidate =>
      fullCandidateAttribute(disclosureCandidate, irmaConfiguration, credentials)
    )
  );
