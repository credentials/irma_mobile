import { DrawerNavigator, StackNavigator } from 'react-navigation';

import About from 'components/About';
import CredentialDashboard from 'components/CredentialDashboard';
import Enrollment from 'components/NewEnrollment';
import EnrollmentTeaser from 'components/EnrollmentTeaser';
import PreferencesDashboard from 'components/PreferencesDashboard';
import QRScanner from 'components/QRScanner';
import Session from 'components/Session';
import Sidebar from './children/Sidebar';

const EnrollmentNavigator = StackNavigator({
  Enrollment: { screen: Enrollment },
  EnrollmentTeaser: { screen: EnrollmentTeaser },
}, {
  initialRouteName: 'EnrollmentTeaser',
});

const CredentialDashboardNavigator = StackNavigator({
  About: { screen: About },
  CredentialDashboard: { screen: CredentialDashboard },
  // Enrollment: { screen: EnrollmentNavigator },
  Enrollment: { screen: Enrollment },
  EnrollmentTeaser: { screen: EnrollmentTeaser },
  PreferencesDashboard: {screen: PreferencesDashboard },
  QRScanner: { screen: QRScanner },
  Session: { screen: Session },
}, {
  initialRouteName: 'CredentialDashboard'
});

const RootNavigator = DrawerNavigator(
  {
    CredentialDashboardNavigator: { screen: CredentialDashboardNavigator },
  },
  {
    initialRouteName: 'CredentialDashboardNavigator',
    contentComponent: Sidebar
  }
);

export default RootNavigator;
