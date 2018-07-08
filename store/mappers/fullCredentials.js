import _ from 'lodash';

const fullAttributes = (attributes, type) => {
  const attributeTypes = type.Attributes;

  // For each attribute, fetch the index at which to render it
  const attrIndices = attributeTypes.map(
    (attrType, i) => attrType.Index != undefined ? attrType.Index : i
  );
  // Invert to get a list that specifies per index which attribute to render
  let attrOrder = _.invert(attrIndices);
  // Quick sanity check: if attrOrder is not of the same size as attrIndices, then for at least
  // one attribute we don't know where to render it. Fallback to default ordering.
  const attrCount = _.size(attributeTypes);
  if (_.size(attrOrder) !== attrCount)
    attrOrder = Array.from(Array(attrCount).keys());

  // In case of absent optional attributes, irmago returns not null but an empty map
  // that gets placed in .Values. We filter these out.
  return _.map(attrOrder, i => ({ Value: attributes[i], Type: attributeTypes[i] }))
    .filter( attribute => !_.isEmpty(attribute.Value) );
};

const fullCredential = (credential, { schemeManagers, credentialTypes, issuers }) => {
  const Type = credentialTypes[credential.CredentialTypeID];
  const { SchemeManagerID, IssuerID } = Type;

  const SchemeManager = schemeManagers[SchemeManagerID];
  const Issuer = issuers[`${SchemeManagerID}.${IssuerID}`];
  const Attributes = fullAttributes(credential.Attributes, Type);

  return {
    ...credential,
    SchemeManager,
    Issuer,
    Type,
    Attributes,
  };
};

// The first argument `credentials` is of type []irma.CredentialInfo
// Information of the scheme manager, issuer, credential and attribute type is merged in
export default (credentials = [], irmaConfiguration) =>
  credentials.map(credential =>
    fullCredential(credential, irmaConfiguration)
  );
