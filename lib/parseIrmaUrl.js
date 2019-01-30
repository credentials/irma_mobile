// Decodes irma:// scheme url, and returns sessionPointer if valid, null otherwise
function parseSchemeURL(url) {
  const decodedUrl = decodeURIComponent(url.replace(/^.*?:\/\//g, ''));

  if (!(/^qr\/json\//.test(decodedUrl)))
    return null;

  const sessionPointerJson = decodedUrl.replace(/^qr\/json\//, '');

  let sessionPointer;
  try {
    sessionPointer = JSON.parse(sessionPointerJson);
  } catch (err) {
    return null;
  }

  if (typeof sessionPointer !== 'object' || typeof sessionPointer.irmaqr !== 'string')
    return null;

  return sessionPointer;
}

function parseDeepURL(url) {
  const fragmentStart = url.indexOf('#');

  if (fragmentStart === -1)
    return null;

  let fragment = '';
  try {
    fragment = decodeURIComponent(url.slice(fragmentStart+1));
  } catch (e) {
    return null;
  }

  let sessionPointer;
  try {
    sessionPointer = JSON.parse(fragment);
  } catch (err) {
    return null;
  }

  if (typeof sessionPointer !== 'object' || typeof sessionPointer.irmaqr !== 'string')
    return null;

  return sessionPointer;
}

export default (url) => {
  if (typeof url !== 'string')
    return null;

  // deep link
  if (url.startsWith('https://'))
    return parseDeepURL(url);

  // default fallback
  return parseSchemeURL(url);
};
