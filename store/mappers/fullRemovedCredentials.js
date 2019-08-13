// Takes a full credentialTypeId, and returns all associated information,
const getCredentialInfo = (fullCredentialTypeId, irmaConfiguration) => {
    const { schemeManagers, issuers, credentialTypes, attributeTypes } = irmaConfiguration;
    const [schemeManagerId, issuerId, credentialTypeId] = fullCredentialTypeId.split('.');

    const SchemeManager = schemeManagers[schemeManagerId];
    const Issuer = issuers[`${schemeManagerId}.${issuerId}`];
    const CredentialType = credentialTypes[`${schemeManagerId}.${issuerId}.${credentialTypeId}`];

    const AttributeTypes = [];
    for (const attributeId in attributeTypes) {
        if (attributeId.includes(`${credentialTypeId}.`))
            AttributeTypes.push(attributeTypes[attributeId]);
    }

    return {
        SchemeManager,
        Issuer,
        CredentialType,
        AttributeTypes,
    };
};

const fullRemovedCredential = (removedCredentialId, values, irmaConfiguration) => {
    const {
        SchemeManager,
        Issuer,
        CredentialType,
        AttributeTypes,
    } = getCredentialInfo(removedCredentialId, irmaConfiguration);

    // To make sure list is ordered on index
    AttributeTypes.sort((a, b) => (a.Index > b.Index ? 1 : -1));

    return values.map( (value, i) => {
        const AttributeType = AttributeTypes[i];
        return {
            SchemeManager,
            Issuer,
            CredentialType,
            AttributeType,

            AttributeTypeFullID: `${removedCredentialId}.${AttributeType.ID}`,
            // CredentialHash is skipped, because it is not needed
            Missing: false,
            Null: !value,
            Value: value,
        };
    });
};

// Converts removedCredentials of type map[irma.CredentialTypeIdentifier][]irma.TranslatedString to a candidateSet
// in order to display it using existing code
export default (removedCredentials = {}, irmaConfiguration) =>
    Object.keys(removedCredentials).map(removedCredentialId =>
        fullRemovedCredential(removedCredentialId, removedCredentials[removedCredentialId], irmaConfiguration)
    );