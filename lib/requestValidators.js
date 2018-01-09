// Validate content field
function validateContent(content) {
  return content.length > 0 &&
    content.every(el => (
      typeof(el.label) === 'string' &&
      (Array.isArray(el.attributes) || typeof(el.attributes) === 'object' ) // attributes is either an array with attributes to disclose OR a map with fixed values
    ));
}

// Do some basic checks if signature request is valid
export function validateSigrequest(sigrequest) {
  return (
    typeof(sigrequest) === 'object' &&
    typeof(sigrequest.message) === 'string' &&
    typeof(sigrequest.name) === 'string' &&
    typeof(sigrequest.from) === 'string' &&
    sigrequest.messageType === 'STRING' &&
    sigrequest.nonce === 0 &&
    Array.isArray(sigrequest.content) &&
    validateContent(sigrequest.content)
  );
}
