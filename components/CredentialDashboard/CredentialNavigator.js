import { StackNavigator } from 'react-navigation';

import CredentialDashboardContainer from './CredentialDashboardContainer';
import About from 'components/About';
import QRScanner from 'components/QRScanner';
import Session from 'components/Session';

export default StackNavigator({
  CredentialDashboard: { screen: CredentialDashboardContainer },
  QRScanner: { screen: QRScanner },
  Session: { screen: Session },
  About: { screen: About },
}, {
  initialRouteName: 'CredentialDashboard'
});
