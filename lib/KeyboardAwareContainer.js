import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Keyboard, Platform } from 'react-native';

import {
  Container,
  View,
} from 'native-base';

// A decorater that adds a keyboardHeight prop
export const keyboardAware = () => Child => {
  class KeyboardAwareComponent extends Component {

    state = {
      keyboardHeight: 0,
    }

    onKeyboardWillShow = null;
    onKeyboardWillHide = null;

    componentWillMount () {
      if (Platform.OS === 'ios') {
        // We can't define these functions on the class, because we need to bind 'this',
        // but also need to use removeListener on that bound function.
        this.onKeyboardWillShow = e => this.setState({keyboardHeight: e.endCoordinates.height});
        this.onKeyboardWillHide = () => this.setState({keyboardHeight: 0});

        Keyboard.addListener('keyboardWillShow', this.onKeyboardWillShow);
        Keyboard.addListener('keyboardWillHide', this.onKeyboardWillHide);
      }
    }

    componentWillUnmount () {
      Keyboard.removeListener('keyboardWillShow', this.onKeyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', this.onKeyboardWillHide);
    }

    render() {
      return <Child {...this.props} keyboardHeight={this.state.keyboardHeight} />;
    }
  }

  return KeyboardAwareComponent;
};

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
