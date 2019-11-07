import { Linking } from 'react-native';

import store from 'store';

import parseIrmaUrl from 'lib/parseIrmaUrl';

// Store any initial incoming URL
const handleInitialUrl = () => {
  Linking.getInitialURL().then( irmaUrl => {
    const initialSessionPointer = parseIrmaUrl(irmaUrl);
    if (initialSessionPointer === null)
      return;

    store.dispatch({
      type: 'Navigation.SetInitialSessionPointer',
      initialSessionPointer,
    });
  });
};

// Store any non-intial incoming URL
const handleUrl = (event) => {
  const sessionPointer = parseIrmaUrl(event.url);
  if (sessionPointer === null)
    return;

  store.dispatch({
    type: 'Navigation.SetSessionPointer',
    sessionPointer,
  });
};

export default () => {
  handleInitialUrl();
  Linking.addEventListener('url', handleUrl);

  return () => {
    Linking.removeEventListener('url', handleUrl);
  };
};
