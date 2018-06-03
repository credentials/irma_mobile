import React, { Component } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Root as NBRoot, StyleProvider } from 'native-base';
import { YellowBox } from 'react-native';

import initStore from 'store/init';
import getTheme from 'lib/native-base-theme/components';

import RootContainer from './RootContainer';

// Ignore specific deprecation warnings or harmless issues
if(__DEV__) {
  YellowBox.ignoreWarnings([
    // TODO: Migrate to (libraries with) new lifecycle methods, and remove this ignore
    'Warning: isMounted(...) is deprecated',
    // TODO: Remove when react-native#17679 released
    'Module RCTImageLoader requires main queue setup',
    'Module RNMail requires main queue setup',
    // TODO: Remove when react-native#18201 is fixed
    'Class RCTCxxModule was not exported',
  ]);
}

// Initialize store once per application instance
const store = initStore();

export default class RootProvider extends Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <StyleProvider style={getTheme()}>
          <NBRoot>
            <RootContainer />
          </NBRoot>
        </StyleProvider>
      </ReduxProvider>
    );
  }
}
