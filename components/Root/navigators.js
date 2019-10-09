import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

import nbVariables from 'lib/native-base-theme/variables/platform';

import About from 'components/About';
import AppUnlock from 'components/AppUnlock';
import ChangePin from 'components/ChangePin';
import CredentialDashboard from 'components/CredentialDashboard';
import Enrollment from 'components/Enrollment';
import EnrollmentTeaser from 'components/EnrollmentTeaser';
import ForcedUpdate from 'components/ForcedUpdate';
import PreferencesDashboard from 'components/PreferencesDashboard';
import LogDashboard from 'components/LogDashboard';
import QRScanner from 'components/QRScanner';
import Session from 'components/Session';
import Sidebar from 'components/Sidebar';
import Loading from 'components/Loading';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: nbVariables.colors.logoBlue,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const MainStack = createStackNavigator({
  About,
  CredentialDashboard,
  ChangePin,
  PreferencesDashboard,
  LogDashboard,
  QRScanner,
  Session,
  Enrollment: Enrollment,
  EnrollmentTeaser: EnrollmentTeaser,
}, {
  initialRouteName: 'CredentialDashboard',
  defaultNavigationOptions,
    navigationOptions: ({ navigation }) => ({
    // Disable drawer on nested screens
    drawerLockMode: navigation.state.index > 0 ? 'locked-closed' : 'unlocked',
  }),
});

const MainStackWithDrawer = createDrawerNavigator({
  MainStack,
}, {
  initialRouteName: 'MainStack',
  contentComponent: Sidebar,
});

const AppUnlockStack = createStackNavigator({
  AppUnlock,
}, {
  initialRouteName: 'AppUnlock',
  defaultNavigationOptions,
});

const ForcedUpdateStack = createStackNavigator({
  ForcedUpdate,
}, {
  initialRouteName: 'ForcedUpdate',
  defaultNavigationOptions,
});

const LoadingStack = createStackNavigator({
  Loading,
}, {
  initialRouteName: 'Loading',
  headerMode: 'none',
});

const RootSwitcher = createSwitchNavigator({
  MainStackWithDrawer,
  AppUnlockStack,
  ForcedUpdateStack,
  LoadingStack,
}, {
  initialRouteName: 'LoadingStack',
  backBehaviour: 'none',
  resetOnBlur: false,
});

export const RootNavigator = RootSwitcher;
