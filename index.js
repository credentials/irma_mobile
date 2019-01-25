import { YellowBox } from 'react-native';
import { Navigation, initNavigation, setCredentialDashboardRoot, setAppUnlockRoot } from 'lib/navigation';

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

Navigation.events().registerAppLaunchedListener( () => {
  initNavigation();
});