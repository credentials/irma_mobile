import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Root as NBRoot } from 'native-base';

import init from 'store/init';
import RootContainer from './RootContainer';

const {
  store
} = init();

export default class RootProvider extends Component {
  render() {
    return (
      <Provider store={store}>
        <NBRoot>
          <RootContainer />
        </NBRoot>
      </Provider>
    );
  }
}
