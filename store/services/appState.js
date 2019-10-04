import { AppState } from 'react-native';
import moment from 'moment';

import store from 'store';

// When the app becomes active dispatch Lock and UpdateSchemes if appropriate
const onAppBecomesActive = () => {
  const {
    appUnlock: {
      lastForegroundedTime,
    },
    irmaConfiguration: {
      updatedAt,
    },
  } = store.getState();

  // If we were active more than 5 minutes ago, show AppUnlock again (if enrolled)
  if (moment(lastForegroundedTime).isBefore(moment().subtract(5, 'minutes'))) {
    store.dispatch({
      type: 'AppUnlock.Lock',
    });
  }

  // Update configuration when becoming active, but at most once every 6 hours
  if (moment(updatedAt).isBefore(moment().subtract(6, 'hours'))) {
    store.dispatch({
      type: 'IrmaBridge.UpdateSchemes',
    });
  }
};

export const forceLockCheck = () => {
  const {
    appUnlock: {
      lastForegroundedTime,
    },
  } = store.getState();

  if (moment(lastForegroundedTime).isBefore(moment().subtract(5, 'minutes'))) {
    store.dispatch({
      type: 'AppUnlock.Lock',
    });
    return true;
  }

  return false;
}

// Function that listens for change in foreground/background appState,
// records that state and calls event handler when app changes to foreground
const appStateChangeListener = (appState) => {
  const {
    appUnlock: {
      appState: previousAppState,
    },
  } = store.getState();

  if (previousAppState !== 'active' && appState === 'active')
    onAppBecomesActive();

  // Record the current state
  store.dispatch({
    type: 'AppUnlock.AppStateChanged',
    appState,
  });
};

export default () => {
  AppState.addEventListener('change', appStateChangeListener);

  return () => {
    AppState.removeEventListener('change', appStateChangeListener);
  };
};

