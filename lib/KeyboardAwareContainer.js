import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';

import keyboardAware from 'lib/keyboardAware';
import nbVariables from 'lib/native-base-theme/variables/platform';

import {
  Container,
  View,
} from 'native-base';

// On Android the buttons in the footer move up automatically when the keyboard is shown;
// on iOS this component does this manually.
@keyboardAware()
export default class KeyboardAwareContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    keyboardHeight: PropTypes.number.isRequired,
  }

  renderIos() {
    const { keyboardHeight } = this.props;

    const style = {
      height: Dimensions.get('window').height - keyboardHeight,
      backgroundColor: nbVariables.containerBgColor,
    };

    return (
      <View style={style}>
        { this.props.children }
      </View>
    );
  }

  renderAndroid() {
    return (
      <Container>
        { this.props.children }
      </Container>
    );
  }

  render() {
    if (nbVariables.platform === 'ios')
      return this.renderIos();

    return this.renderAndroid();
  }
}
