import _ from 'lodash';
import moment from 'moment';

const fullAttributes = (attributes, attributeTypes) => {
  // In case of absent optional attributes, irmago returns not null but an empty map
  // that is placed in .Values by the map above. We filter these out.
  // Sort first on DisplayIndex, then on regular Index.
  return _.chain(attributes)
    .zip(attributeTypes)
    .map( ([attribute, attributeType]) => ({
      Value: attribute,
      AttributeType: attributeType,
    }))
    .filter( attribute => !_.isEmpty(attribute.Value) )
    .sortBy(['Type.DisplayIndex', 'Type.Index'])
    .value();
};

const fullCredential = (credential, { schemeManagers, credentialTypes, issuers }, currentTime) => {
  // Scheme information
  const CredentialType = credentialTypes[credential.CredentialTypeID];
  const { SchemeManagerID, IssuerID } = CredentialType;

  const SchemeManager = schemeManagers[SchemeManagerID];
  const Issuer = issuers[`${SchemeManagerID}.${IssuerID}`];
  const Attributes = fullAttributes(credential.Attributes, CredentialType.Attributes);

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
