import _ from 'lodash';

const fullAttributes = (attributes, attributeTypes) => {
  return _.zip(attributes, attributeTypes)
    .map( ([attribute, attributeType]) => ({
      Value: attribute,
      Type: attributeType,
    }))
    // In case of absent optional attributes, irmago returns not null but an empty map
    // that is placed in .Values by the map above. We filter these out.
    .filter( attribute => !_.isEmpty(attribute.Value) );
};

const fullCredential = (credential, { schemeManagers, credentialTypes, issuers }) => {
  const Type = credentialTypes[credential.CredentialTypeID];
  const { SchemeManagerID, IssuerID } = Type;

  const SchemeManager = schemeManagers[SchemeManagerID];
  const Issuer = issuers[`${SchemeManagerID}.${IssuerID}`];
  const Attributes = fullAttributes(credential.Attributes, Type.Attributes);

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
