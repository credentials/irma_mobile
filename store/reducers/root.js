import { combineReducers } from 'redux';

import appUnlock from './appUnlock';
import changePin from './changePin';
import credentialTypeDashboard from './credentialTypeDashboard';
import credentials from './credentials';
import currentTime from './currentTime';
import enrollment from './enrollment';
import irmaConfiguration from './irmaConfiguration';
import logs from './logs';
import navigation from './navigation';
import preferences from './preferences';
import sessions from './sessions';

export default combineReducers({
  credentials,
  currentTime,
  enrollment,
  irmaConfiguration,
  logs,
  navigation,
  preferences,
  sessions,

  appUnlock,
  changePin,
  credentialTypeDashboard,
});
