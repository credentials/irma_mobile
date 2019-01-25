import _ from 'lodash';
import attributeInfo from './attributeInfo';

const fullCandidateAttribute = (disclosureCandidate, irmaConfiguration, credentials) => {
  const {
    SchemeManager,
    Issuer,
    CredentialType,
    AttributeType,
    attributeIndex // TODO: Remove me when irmago offers index
  } = attributeInfo(disclosureCandidate.Type, irmaConfiguration);

  // Find the credential in which the candidate attribute is contained,
  // plus the attribute type and value at the correct index
  const Credential = _.find(credentials, credential =>
    credential.Hash === disclosureCandidate.CredentialHash
  );

  const Value = Credential.Attributes[attributeIndex]; // TODO: Change me when irmago offers index

  return {
    SchemeManager,
    Issuer,
    CredentialType,
    AttributeType,

    AttributeTypeFullID: disclosureCandidate.Type,
    CredentialHash: disclosureCandidate.CredentialHash,
    Value,
  };
};

// `disclosuresCandidates` is of type [][]irma.AttributeIdentifier.
// A disclosureCandidate contains a Type (fullAttributeTypeID) and a CredentialHash
export default (disclosuresCandidates = [], irmaConfiguration, credentials) =>
  disclosuresCandidates.map(disclosureCandidates =>
    disclosureCandidates.map(disclosureCandidate =>
      fullCandidateAttribute(disclosureCandidate, irmaConfiguration, credentials)
    )
  );
