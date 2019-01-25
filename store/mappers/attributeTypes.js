import _ from 'lodash';

// Extracts attribute types from the array of attributes inside credentials and creates
// a lookup which uses the fullAttributeTypeID as key
export default credentialTypes => _.fromPairs(_.flatten(
    _.map(credentialTypes, (credentialType, fullCredentialTypeID) =>
      credentialType.Attributes.map( (attributeType, i) => { 
        // TODO: Remove this override index when attribute/attributeType zipping has been removed
        // and irmago provides the attribute index and properly named displayIndex
        attributeType.Index = i;

        return [`${fullCredentialTypeID}.${attributeType.ID}`, attributeType];
      })
    )
));