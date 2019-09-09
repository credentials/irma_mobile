import { Linking } from 'react-native';

import store from 'store';
import parseIrmaUrl from 'lib/parseIrmaUrl';

// Store any initial incoming URL
const handleInitialUrl = () => {
  Linking.getInitialURL().then( irmaUrl => {
    store.dispatch({
      type: 'Navigation.SetInitialSessionPointer',
      initialSessionPointer: parseIrmaUrl(irmaUrl),
    });
  }).catch( () => {
    store.dispatch({
      type: 'Navigation.SetInitialSessionPointer',
      initialSessionPointer: null,
    });
  });
};

// Store any non-intial incoming URL
const handleUrl = (event) => {
  store.dispatch({
    type: 'Navigation.SetSessionPointer',
    sessionPointer: parseIrmaUrl(event.url),
  });
};

export default () => {
  handleInitialUrl();
  Linking.addEventListener('url', handleUrl);

  return () => {
    Linking.removeEventListener('url', handleUrl);
  };
};