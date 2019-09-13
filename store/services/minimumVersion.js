import { Platform, NativeModules } from 'react-native';
const { IrmaVersion } = NativeModules;

import store from 'store';

// Check version requirements
let lastUpdatedAt = null;
const minimumVersionStoreListener = () => {
  const {
    irmaConfiguration: {
      loaded,
      schemeManagers,
      updatedAt,
    },
  } = store.getState();

  // Did we evaluate this before?
  if (!loaded || lastUpdatedAt === updatedAt)
    return;

  lastUpdatedAt = updatedAt;

  // Calculate if we need to force upgrade, depending on the platform
  let minBuild = 0;
  for (const scheme in schemeManagers) {
    if (Platform.OS === 'android')
      minBuild = Math.max(minBuild, schemeManagers[scheme].MinimumAppVersion.Android);
    if (Platform.OS === 'ios')
      minBuild = Math.max(minBuild, schemeManagers[scheme].MinimumAppVersion.IOS);
  }

  let myVersion = parseInt(IrmaVersion.build, 10);
  if (Platform.OS === 'android') {
    while (myVersion > 1024*1024)
      myVersion -= 1024*1024;
  }

  if (minBuild > myVersion) {
    store.dispatch({
      type: 'IrmaConfiguration.ShowingUpdate',
    });
  }
};

export default () => {
  const unsubscribe = store.subscribe(minimumVersionStoreListener);

  return () => {
    unsubscribe();
  };
};