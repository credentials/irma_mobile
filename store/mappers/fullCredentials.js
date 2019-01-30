import _ from 'lodash';
import moment from 'moment';

const fullAttributes = (attributes, attributeTypes) => {
  // In case of absent optional attributes, irmago returns not null but an empty map.
  // We filter these out, then sort first on DisplayIndex, then on regular Index.
  return _.chain(attributes)
    .map( (attribute, id) => ({
      Value: attribute,
      AttributeType: attributeTypes[id],
    }))
    .filter( attribute => !_.isEmpty(attribute.Value) )
    .sortBy(['Type.DisplayIndex', 'Type.Index'])
    .value();
};

const fullCredential = (credential, { schemeManagers, credentialTypes, issuers, attributeTypes }, currentTime) => {
  // Scheme information
  const SchemeManagerID = credential.SchemeManagerID;
  const IssuerID = credential.IssuerID;
  const CredentialType = credentialTypes[`${SchemeManagerID}.${IssuerID}.${credential.ID}`];

  const SchemeManager = schemeManagers[SchemeManagerID];
  const Issuer = issuers[`${SchemeManagerID}.${IssuerID}`];
  const Attributes = fullAttributes(credential.Attributes, attributeTypes);

  // Calculated values
  const hasExpired = moment.unix(credential.Expires).isBefore(currentTime);

  return {
    ...credential,
    hasExpired,

    SchemeManager,
    Issuer,
    CredentialType,
    Attributes,
  };
};

// The first argument `credentials` is of type []irma.CredentialInfo
// Information of the scheme manager, issuer, credential and attribute type is merged in
export default (credentials = [], irmaConfiguration, currentTime) =>
  credentials.map(credential =>
    fullCredential(credential, irmaConfiguration, currentTime)
  );
