import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import _ from 'lodash';

import { namespacedTranslation } from 'lib/i18n';

import {
  View,
} from 'native-base';

export const t = namespacedTranslation('AppUnlock.PinEntry');

export default class PinEntry extends Component {

  static propTypes = {
    hasAutofocus: PropTypes.bool,
    maxLength: PropTypes.number.isRequired,
    minLength: PropTypes.number.isRequired,
    onPinChange: PropTypes.func,
    onPinSubmit: PropTypes.func.isRequired,
    pin: PropTypes.string,
  }

  static defaultProps = {
    hasAutofocus: true,
    onPinChange: undefined,
    pin: undefined,
  }

  state = {
    pin: '',
  }

  inputRef = null

  changeText = inputText => {
    const { onPinChange } = this.props;

    if (onPinChange)
      onPinChange(inputText);

    this.setState({pin: inputText});
  }

  submit = () => {
    const { onPinSubmit } = this.props;
     onPinSubmit(this.getPin());
  }

  digitInputsPress = () => {
    this.inputRef.focus();
  }

  // When passed pin as a prop, act as a controlled component
  // Otherwise use local state to capture the pin value
  getPin() {
    const { pin: pinProp } = this.props;
    const { pin: pinState } = this.state;

    if (pinProp !== undefined)
      return pinProp;

    return pinState;
  }

  renderDigitInput = (index) => {
    const { minLength } = this.props;
    const { pin } = this.state;

    const style = [
      styles.digitStyle,
      index < pin.length ? styles.filledDigitStyle : null,
      index === pin.length ? styles.activeDigitStyle : null,
      index >= minLength ? styles.optionalDigitStyle : null,
    ];

    return (
      <View
        key={index}
        style={style}
      />
    );
  }

  render() {
    const { hasAutofocus, minLength, maxLength } = this.props;
    const { pin } = this.state;

    return (
      <View>
        <TouchableWithoutFeedback onPress={this.digitInputsPress}>
          <View style={styles.inputsRowStyle}>
            { _.times(maxLength).map(this.renderDigitInput) }
          </View>
        </TouchableWithoutFeedback>
        <TextInput
          ref={ref => (this.inputRef = ref)}
          autoFocus={hasAutofocus}
          blurOnSubmit={false}
          keyboardType="number-pad"
          maxLength={maxLength}
          onChangeText={this.changeText}
          onSubmitEditing={this.submit}
          returnKeyType={pin.length >= minLength ? 'done' : null}
          secureTextEntry={true}
          style={styles.inputStyle}
          value={pin}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputsRowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  inputStyle: {
    backgroundColor: 'white',
    opacity: 0,
  },
  digitStyle: {
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 5,
    borderWidth: 2,
    marginHorizontal: 4,
    padding: 0,
    width: 35,
    height: 35,
  },
  filledDigitStyle: {
    backgroundColor: '#00B1E6',
    borderColor: 'white',
  },
  activeDigitStyle: {
    borderColor: '#00B1E6',
  },
  optionalDigitStyle: {
    borderStyle: 'dashed', // TODO: Seems to be broken on Android: facebook/react-native#17251
  },
});