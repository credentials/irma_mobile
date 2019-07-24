import _ from 'lodash';
import attributeInfo, { groupIntoCredentials } from './attributeInfo';

const fullCandidateAttribute = (disclosedAttribute, irmaConfiguration) => {
    const {
        SchemeManager,
        Issuer,
        CredentialType,
        AttributeType,
    } = attributeInfo(disclosedAttribute.id, irmaConfiguration);

    return {
        SchemeManager,
        Issuer,
        CredentialType,
        AttributeType,

        AttributeTypeFullID: disclosedAttribute.id,
        // CredentialHash is skipped, because it is not needed
        Missing: false,
        Null: !disclosedAttribute.value,
        Value: disclosedAttribute.value,
    };
};

// `disclosedCredentials` is of type [][]*irma.DisclosedAttribute.
export default (disclosedCredentials = [], irmaConfiguration) =>
    disclosedCredentials.map(disclosedCredential =>
        disclosedCredential.map(disclosedAttribute =>
            fullCandidateAttribute(disclosedAttribute, irmaConfiguration)
        )
    );
