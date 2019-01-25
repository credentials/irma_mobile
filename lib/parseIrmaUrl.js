// Decodes irma:// scheme url, and returns sessionPointer if valid, null otherwise
export default (url) => {
  if (typeof url !== 'string')
    return null;

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
};