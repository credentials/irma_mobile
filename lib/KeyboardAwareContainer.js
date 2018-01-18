import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Keyboard, Platform } from 'react-native';
import { Container, View } from 'native-base';

// On Android the buttons in the footer move up automatically when the keyboard is shown;
// on iOS this component does this manually.
export default class KeyboardAwareContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    visibleHeight: Dimensions.get('window').height,
  }

  onKeyboardWillShow = null;
  onKeyboardWillHide = null;

  componentWillMount () {
    if (Platform.OS === 'ios') {
      const windowHeight = Dimensions.get('window').height;

      // We can't define these functions on the class, because we need to bind 'this',
      // but also need to use removeListener on that bound function. 
      this.onKeyboardWillShow = e => this.setState({visibleHeight: windowHeight - e.endCoordinates.height});
      this.onKeyboardWillHide = () => this.setState({visibleHeight: windowHeight});

      Keyboard.addListener('keyboardWillShow', this.onKeyboardWillShow);
      Keyboard.addListener('keyboardWillHide', this.onKeyboardWillHide);
    }
  }

  componentWillUnmount () {
    Keyboard.removeListener('keyboardWillShow', this.onKeyboardWillShow);
    Keyboard.removeListener('keyboardWillHide', this.onKeyboardWillHide);
  }

  render() {
    const { visibleHeight } = this.state;

    return ( Platform.OS === 'ios'
      ? <View style={{height: visibleHeight}}>
          { this.props.children }
        </View>
      : <Container>
          { this.props.children }
        </Container>
    );
  }
}