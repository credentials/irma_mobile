import { YellowBox, Linking, AppState } from 'react-native';
import moment from 'moment';

import { initStore } from 'store';
import parseIrmaUrl from 'lib/parseIrmaUrl';
import {
  Navigation,
  registerScreens,
  setCredentialDashboardRoot,
  setDefaultOptions,
  setEnrollmentRoot,
  showAppUnlockModal,
  startSessionAndNavigate,
} from 'lib/navigation';

// Ignore specific deprecation warnings or harmless issues
if (__DEV__) {
  YellowBox.ignoreWarnings([
    // TODO: Migrate to (libraries with) new lifecycle methods, and remove this ignore
    'Warning: isMounted(...) is deprecated',
    // TODO: Remove when react-native#17679 released
    'Module RCTImageLoader requires main queue setup',
    'Module RNMail requires main queue setup',
    // TODO: Remove when react-native#18201 is fixed
    'Class RCTCxxModule was not exported',

    // Ignore require cycles
    'Require cycle',
  ]);
}

// Initialize store
const store = initStore();

// Function that handles initial incoming url, and saves it in store
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

// Function that reponds to any non-initial incoming url
const handleUrl = (event) => {
  const sessionPointer = parseIrmaUrl(event.url);
  if (!sessionPointer)
    return;

  startSessionAndNavigate({sessionPointer, exitAfter: true, setRoot: true});
};

// Function that sets the initial screen as soon as the irmagobridge
// enrollment reducer has been loaded. Also set the unlockModal if necessary.
let hasSetInitialScreen = false;
const initialScreenStoreListener = () => {
  if (hasSetInitialScreen)
    return;

  const {
    appUnlock: {
      isAuthenticated,
    },
    enrollment: {
      enrolledSchemeManagerIds,
      loaded: enrollmentLoaded,
      unenrolledSchemeManagerIds,
    },
    navigation: {
      initialSessionPointerLoaded,
      initialSessionPointer,
    },
  } = store.getState();

  // Do nothing until enrollment and initial URL session pointer status has loaded
  if (!enrollmentLoaded || !initialSessionPointerLoaded)
    return;

  // We'll be sure to set the initial screen now, so flag that
  hasSetInitialScreen = true;

  // If we should enroll, ignore any other circumstance and redirect to Enrollment
  if (unenrolledSchemeManagerIds.length > 0) {
    setEnrollmentRoot();
  } else {
    // If there was an initial session pointer, load up a stack with the session started
    // Otherwise show the dashboard
    if (initialSessionPointer)
      startSessionAndNavigate({sessionPointer: initialSessionPointer, exitAfter: true, setRoot: true});
    else
      setCredentialDashboardRoot();

    // Show AppUnlock if not authenticated
    if (enrolledSchemeManagerIds.length > 0 && !isAuthenticated)
      showAppUnlockModal();
  }
};

// Function that listens for change in foreground/background appState,
// records that state and locks the app after a timeout
const appStateChangeListener = (appState) => {
  const {
    enrollment: {
      enrolledSchemeManagerIds,
    },
    appUnlock: {
      appState: previousAppState,
      lastForegroundedTime,
    },
  } = store.getState();

  // Check if we are changing from backgrounded to active
  // If we were active more than 5 minutes ago, show AppUnlock again (if enrolled)
  if (previousAppState !== 'active' && appState === 'active' &&
    moment(lastForegroundedTime).isBefore(moment().subtract(5, 'minutes'))
  ) {
    store.dispatch({
      type: 'AppUnlock.Lock',
    });

    if (enrolledSchemeManagerIds.length > 0)
      showAppUnlockModal();
  }

  // Record the current state
  store.dispatch({
    type: 'AppUnlock.AppStateChanged',
    appState,
  });
};

Navigation.events().registerAppLaunchedListener( () => {
  setDefaultOptions();
  registerScreens();

  handleInitialUrl();
  AppState.addEventListener('change', appStateChangeListener);
  store.subscribe(initialScreenStoreListener);
  Linking.addEventListener('url', handleUrl);
});