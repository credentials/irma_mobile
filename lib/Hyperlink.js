import React from 'react';
import RNHyperlink from 'react-native-hyperlink';

const replaceUrlText = url => {
  // TODO: Test if this actually launches the email client on both OSes
  const mailtoRegex = /^mailto:/;

  if (mailtoRegex.test(url))
    return url.replace(mailtoRegex, '');

  return url;
};

const Hyperlink = props =>
  <RNHyperlink
    linkDefault={true}
    linkStyle={{ color: '#2980b9' }}
    linkText={replaceUrlText}
    {...props}
  />;

export default Hyperlink;