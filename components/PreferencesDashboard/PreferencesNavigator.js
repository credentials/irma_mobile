import { StackNavigator } from 'react-navigation';

import PreferencesDashboard from './PreferencesDashboard';

export default StackNavigator({
  PreferencesDashboard: { screen: PreferencesDashboard },
}, {
  initialRouteName: 'PreferencesDashboard',
  headerMode: 'none',
});
