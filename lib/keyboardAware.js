import React, { Component } from 'react';
import { Keyboard, Platform } from 'react-native';

// A decorater that adds a keyboardHeight prop
export default () => Child => {
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
