import { Sentry } from 'react-native-sentry';

import store from 'store';

// Globally listen to the store to setup Sentry
let isSentryInitialized = false;
const sentryStoreListener = () => {
  const {
    irmaConfiguration: {
      loaded: irmaConfigurationLoaded,
      sentryDSN,
    },
    preferences: {
      loaded: preferencesLoaded,
      enableCrashReporting,
    },
  } = store.getState();

  if (isSentryInitialized || !irmaConfigurationLoaded || !preferencesLoaded)
    return;

  // Unfortunately we cannot set the DSN for the Sentry client
  // after it has been configured. See react-native-sentry#320
  if (enableCrashReporting && sentryDSN !== '') {
    Sentry.config(sentryDSN).install();
    isSentryInitialized = true;
  }
};

export default () => {
  const unsubscribe = store.subscribe(sentryStoreListener);

  return () => {
    unsubscribe();
  };
};