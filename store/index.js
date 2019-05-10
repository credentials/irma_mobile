import { NativeModules, NativeEventEmitter, AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import moment from 'moment';
import { Sentry } from 'react-native-sentry';

import irmaBridgeMiddleware from './middlewares/irmaBridge';
import rootReducer from './reducers/root';

export let store;

// Create a global counter per app instantiation for Session identifiers
// Include a random starting point so we can discern errors in subsequent sessions
// TODO: Refactor this into an action creator of the session store
let counter = Math.floor(Math.random() * 1000000000);
export const getAutoIncrementId = () => {
  return counter++;
};

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

// Globally listen to the store to setup Sentry
let isSentryInitialized = false;
const sentryStoreListener = () => {
  const {
    irmaConfiguration: {
      sentryDSN,
    },
    preferences: {
      enableCrashReporting,
    },
  } = store.getState();

  // Unfortunately we cannot set the DSN for the Sentry client
  // after it has been configured. See react-native-sentry#320
  if (!isSentryInitialized && enableCrashReporting && sentryDSN !== '') {
    Sentry.config(sentryDSN).install();
    isSentryInitialized = true;
  }
};

export const initStore = () => {
  // Create Redux store
  const middleware = [thunk, irmaBridgeMiddleware];
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

  store = createStoreWithMiddleware(rootReducer);
  store.subscribe(sentryStoreListener);

  // Deal with problem inherited from 5.4.*
  AsyncStorage.removeItem('pin');

  // Prepare to receive events and start bridge. Never bother to unsubscribe,
  // as we want to keep listening for as long as the app is alive
  const irmaBridge = new NativeEventEmitter(NativeModules.IrmaBridge);

  irmaBridge.addListener('irmago', irmaBridgeListener);
  irmaBridge.addListener('log', irmaBridgeLogListener);

  NativeModules.IrmaBridge.start();

  // Prepare time events
  setInterval(() => {
    store.dispatch({
      type: 'CurrentTime.Update',
      currentTime: moment(),
    });
  }, 60*1000);

  return store;
};
