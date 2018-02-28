import _ from 'lodash';
import attributeInfo from './attributeInfo';

const fullAttribute = (longAttributeTypeId, Value, irmaConfiguration) => {
  const {
    SchemeManager,
    Issuer,
    CredentialType,
    AttributeType,
  } = attributeInfo(longAttributeTypeId, irmaConfiguration);

  return {
    SchemeManager,
    Issuer,
    CredentialType,

    Type: longAttributeTypeId,
    ...AttributeType,

    Value,
  };
};

// Normalize the attributes, which is either a list or a map, to a common structure.
// `null` is used to denote that the attribute value is not restricted.
const normalizeAttributes = (attributes) =>
  _.isPlainObject(attributes) ?
    _.map(attributes, (value, id) => ({id, value})) :
    _.map(attributes, (id) => ({id, value: null}));

// First first argument `missingDisclosures` is of type []irma.AttributeDisjunction,
// where a single irma.AttributeDisjunction is marshalled by a custom MarshalJSON function.
// It always contains a `label` and `attributes` key; the value under the `attributes` key
// is either a list of attributes types, or a map of attribute types to accepted attribute value.
export default (missingDisclosures = [], irmaConfiguration) =>
  missingDisclosures.map(missingDisclosure => ({
    label: missingDisclosure.label,
    attributes: normalizeAttributes(missingDisclosure.attributes).map( ({id, value}) =>
      fullAttribute(id, value, irmaConfiguration)
    ),
  }));
