import { DrawerNavigator } from 'react-navigation';

import CredentialDashboard from 'components/CredentialDashboard';
import Enrollment from 'components/Enrollment';

import Sidebar from './children/Sidebar';

const RootNavigator = DrawerNavigator(
  {
    CredentialDashboard: { screen: CredentialDashboard },
    Enrollment: { screen: Enrollment }
  },
  {
    initialRouteName: 'CredentialDashboard',
    contentComponent: Sidebar
  }
);

export default RootNavigator;
