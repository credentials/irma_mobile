import { DrawerNavigator, StackNavigator } from 'react-navigation';

import About from 'components/About';
import CredentialDashboard from 'components/CredentialDashboard';
import Enrollment from 'components/Enrollment';
import EnrollmentTeaser from 'components/EnrollmentTeaser';
import PreferencesDashboard from 'components/PreferencesDashboard';
import QRScanner from 'components/QRScanner';
import Session from 'components/Session';
import Sidebar from './children/Sidebar';

const CredentialDashboardNavigator = StackNavigator({
  About: About,
  CredentialDashboard: CredentialDashboard,
  Enrollment: Enrollment,
  EnrollmentTeaser: EnrollmentTeaser,
  PreferencesDashboard: PreferencesDashboard,
  QRScanner: QRScanner,
  Session: Session,
}, {
  initialRouteName: 'CredentialDashboard',
});

const PreferencesDashboardNavigator = StackNavigator({
  PreferencesDashboard: PreferencesDashboard,
}, {
  initialRouteName: 'PreferencesDashboard',
  headerMode: 'none',
});

const RootNavigator = DrawerNavigator(
  {
    CredentialDashboardNavigator: CredentialDashboardNavigator,
    Enrollment: Enrollment,
    EnrollmentTeaser: EnrollmentTeaser,
    PreferencesDashboardNavigator: PreferencesDashboardNavigator,
  }, {
    initialRouteName: 'CredentialDashboardNavigator',
    contentComponent: Sidebar,
  }
);

export default RootNavigator;
