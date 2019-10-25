import { Linking } from 'react-native';
import { NavigationActions } from 'react-navigation';

import store from 'store';
import { newSession } from 'store/reducers/sessions';
import { forceLockCheck } from 'store/services/appState';
import parseIrmaUrl from 'lib/parseIrmaUrl';

let doNavigate = () => {};

let appLoaded = false;

// Store any initial incoming URL
const handleInitialUrl = () => {
  Linking.getInitialURL().then( irmaUrl => {
    if (appLoaded) return;
    const request = parseIrmaUrl(irmaUrl);
    if (request === null) return;
    const sessionMsg = newSession({request, exitAfter: true});
    store.dispatch(sessionMsg);
    appLoaded = true;
    doNavigate(NavigationActions.navigate({routeName: 'Session', params: {sessionId: sessionMsg.sessionId}}));
  });
};

// Store any non-intial incoming URL
const handleUrl = (event) => {
  const justLocked = forceLockCheck();
  const request = parseIrmaUrl(event.url);
  if (request === null) return;
  const sessionMsg = newSession({request, exitAfter: true});
  store.dispatch(sessionMsg);
  doNavigate(NavigationActions.navigate({routeName: 'Session', params: {sessionId: sessionMsg.sessionId}}), {forceOnStack: justLocked});
};

export default (safeNavigate) => {
  doNavigate = safeNavigate;
  handleInitialUrl();
  Linking.addEventListener('url', handleUrl);

  return () => {
    Linking.removeEventListener('url', handleUrl);
  };
};
