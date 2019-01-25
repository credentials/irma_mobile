import _ from 'lodash';

const fullDisclosedCredential = (disclosedCredential, irmaConfiguration) => {
  const { attributeTypes, credentialTypes, issuers, schemeManagers } = irmaConfiguration;

  const CredentialType = credentialTypes[disclosedCredential.FullCredentialTypeID];
  const { SchemeManagerID, IssuerID } = CredentialType;

  const SchemeManager = schemeManagers[SchemeManagerID];
  const Issuer = issuers[`${SchemeManagerID}.${IssuerID}`];

  return {
    SchemeManager,
    Issuer,
    CredentialType,
    Attributes: _.map(disclosedCredential.attributes, (value, fullAttributeTypeId) => ({ // TODO: Order might be wrong
      SchemeManager,
      Issuer,
      CredentialType,
      AttributeType: attributeTypes[fullAttributeTypeId],
      Value: value,
    })),
  };
};

// `disclosedCredential` is of type []*DisclosedCredential
// A disclosedCredential ...
export default (disclosedCredentials, irmaConfiguration) =>
  disclosedCredentials.map(disclosedCredential =>
    fullDisclosedCredential(disclosedCredential, irmaConfiguration)
  );