import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import nbVariables from 'lib/native-base-theme/variables/platform';

import About from 'components/About';
import AppUnlock from 'components/AppUnlock';
import ChangePin from 'components/ChangePin';
import CredentialDashboard from 'components/CredentialDashboard';
import Enrollment from 'components/Enrollment';
import EnrollmentTeaser from 'components/EnrollmentTeaser';
import ForcedUpdate from 'components/ForcedUpdate';
import PreferencesDashboard from 'components/PreferencesDashboard';
import QRScanner from 'components/QRScanner';
import Session from 'components/Session';
import Sidebar from 'components/Sidebar';

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
  QRScanner,
  Session,
}, {
  initialRouteName: 'CredentialDashboard',
  defaultNavigationOptions,
});

MainStack.navigationOptions = ({ navigation }) => ({
  // Disable drawer on nested screens
  drawerLockMode: navigation.state.index > 0 ? 'locked-closed' : 'unlocked',
});

const MainStackWithDrawer = createDrawerNavigator({
  CredentialDashboard: MainStack,
}, {
  initialRouteName: 'CredentialDashboard',
  contentComponent: Sidebar,
});

const EnrollmentStack = createStackNavigator({
  Enrollment: Enrollment,
  EnrollmentTeaser: EnrollmentTeaser,
}, {
  initialRouteName: 'EnrollmentTeaser',
  defaultNavigationOptions,
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

export const MainNavigator = MainStackWithDrawer;
export const EnrollmentNavigator = EnrollmentStack;
export const AppUnlockNavigator = AppUnlockStack;
export const ForcedUpdateNavigator = ForcedUpdateStack;