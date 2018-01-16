import React, { Component } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Root as NBRoot, StyleProvider } from 'native-base';

import init from 'store/init';
import getTheme from 'lib/native-base-theme/components';

import RootContainer from './RootContainer';

const {
  store
} = init();

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
