import _ from 'lodash';
import attributeInfo from './attributeInfo';

const fullAttribute = (fullAttributeTypeId, Value, irmaConfiguration) => {
  const {
    SchemeManager,
    Issuer,
    CredentialType,
    AttributeType,
  } = attributeInfo(fullAttributeTypeId, irmaConfiguration);

  return {
    SchemeManager,
    Issuer,
    CredentialType,
    AttributeType,

    Value: Value ? {en: Value, nl: Value} : undefined,
  };
};

// First argument `missingDisclosures` is of type map[int]map[int]irma.AttributeCon
export default (missingDisclosures = [], irmaConfiguration) => {
    return _.transform(missingDisclosures, (result, disjunctionCandidateSets, conjunctionIndex) => {
      result[conjunctionIndex] = _.transform(disjunctionCandidateSets, (r, disjunctionCandidateSet, disjunctionIndex) => {
        r[disjunctionIndex] = disjunctionCandidateSet.map( attributeRequest =>
          fullAttribute(attributeRequest.Type, attributeRequest.Value, irmaConfiguration)
        );
      }, {});
    }, {});
  };
