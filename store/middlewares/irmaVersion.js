import { NativeModules, Platform } from 'react-native';
const { IrmaVersion } = NativeModules;
import { showAppUpdateModal } from 'lib/navigation';

// Show update modal when needed
export default store => next => action => {
  const result = next(action);

  if (
      typeof action === 'object' &&
      typeof action.type === 'string' &&
      action.type === 'IrmaClient.Configuration'
  ) {
    let minBuild = 0;
    for (const scheme in action.irmaConfiguration.SchemeManagers) {
      if (Platform.OS === 'android')
        minBuild = Math.max(minBuild, action.irmaConfiguration.SchemeManagers[scheme].MinimumAppVersion.Android);

      if (Platform.OS === 'ios')
        minBuild = Math.max(minBuild, action.irmaConfiguration.SchemeManagers[scheme].MinimumAppVersion.IOS);

    }

    let myVersion = parseInt(IrmaVersion.build, 10);
    if (Platform.OS === 'android') {
      while (myVersion > 1024*1024)
        myVersion -= 1024*1024;

    }

    if (minBuild > myVersion) {
      showAppUpdateModal();
      store.dispatch({
        type: 'IrmaConfiguration.ShowingUpdate',
      });
    }
  }

  return result;
};
