import { NativeModules, NativeEventEmitter } from 'react-native';

import store from 'store';

// Listen to action from irmagobridge
const irmaBridgeListener = (actionJson) => {
  const action = JSON.parse(actionJson);

  if (__DEV__)
    console.log('Received action from bridge:', action); // eslint-disable-line no-console

  store.dispatch(action);
};

// Relay log messages sent from irmagobridge
const irmaBridgeLogListener = (logLine) => {
  if (__DEV__)
    console.log('Go debug logger: ', logLine); // eslint-disable-line no-console
};

export default () => {
  // Prepare to receive events and start bridge.
  const irmaBridge = new NativeEventEmitter(NativeModules.IrmaBridge);

  const irmagoSubscription = irmaBridge.addListener('irmago', irmaBridgeListener);
  const logSubscription = irmaBridge.addListener('log', irmaBridgeLogListener);

  NativeModules.IrmaBridge.start();

  return () => {
    irmagoSubscription.remove();
    logSubscription.remove();
  };
};
