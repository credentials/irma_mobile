import { combineReducers } from 'redux';

import credentials from './credentials';
import irmaConfiguration from './irmaConfiguration';
import enrollment from './enrollment';
import sessions from './sessions';
import manualSession from './manualSession';

export default combineReducers({
  credentials,
  irmaConfiguration,
  enrollment,
  sessions,
  manualSession,
});
