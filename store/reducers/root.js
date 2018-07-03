import { combineReducers } from 'redux';

import credentials from './credentials';
import irmaConfiguration from './irmaConfiguration';
import preferences from './preferences';
import enrollment from './enrollment';
import sessions from './sessions';
import currentTime from './currentTime';
import changePin from './changePin';

export default combineReducers({
  credentials,
  irmaConfiguration,
  preferences,
  enrollment,
  sessions,
  currentTime,
  changePin,
});
