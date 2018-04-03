import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Platform } from 'react-native';

import keyboardAware from './keyboardAware';

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

  render() {
    const { keyboardHeight } = this.props;
    const height = Dimensions.get('window').height - keyboardHeight;

    return ( Platform.OS === 'ios'
      ? <View style={{height}}>
          { this.props.children }
        </View>
      : <Container>
          { this.props.children }
        </Container>
    );
  }
}
