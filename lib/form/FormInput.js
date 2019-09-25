import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { namespacedTranslation } from 'lib/i18n';

import {
  Input,
  Item,
  Label,
  Text,
  CardItem,
} from 'native-base';

const t = namespacedTranslation('FormInput');

export default class FormInput extends Component {

  static propTypes = {
    initialValue: PropTypes.string,
    inputProps: PropTypes.object,
    inputType: PropTypes.string,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    testID: PropTypes.string,
    trimValues: PropTypes.bool.isRequired,
    validationForced: PropTypes.bool,
    shouldMatchValue: PropTypes.string,
    autoFocus: PropTypes.bool,
    showInvalidMessage: PropTypes.bool,
  }

  static defaultProps = {
    inputProps: {},
    trimValues: true,
    validationForced: false,
    autoFocus: false,
  }

  state = {
    isBlurred: false,
    value: this.props.initialValue || '',
  }

  componentWillMount() {
    const { value } = this.state;
    this.emitChange(value);
  }

  componentDidUpdate(prevProps, prevState) {
    const { shouldMatchValue } = this.props;
    const { value } = this.state;

    // Emit a change when the value changes or when we need to revalidate
    if(prevState.value !== value || prevProps.shouldMatchValue !== shouldMatchValue)
      this.emitChange(value);
  }

  emitChange() {
    const { onChange } = this.props;
    const { value } = this.state;

    // Only pass through valid values, or null otherwise
    if(this.validate(value))
      onChange(value);
    else
      onChange(null);
  }

  inputPropsForType() {
    switch(this.props.inputType) {
      case 'email':
        return {
          autoCapitalize: 'none',
          autoCorrect: false,
          keyboardType: 'email-address',
        };

      case 'pin':
        return {
          autoCapitalize: 'none',
          autoCorrect: false,
          keyboardType: 'number-pad',
          returnKeyType: 'done',
          maxLength: 16,
          secureTextEntry: true,
        };

      default:
        return {};
    }
  }

  validateForType(value) {
    const { inputType } = this.props;

    switch(inputType) {
      case 'email':
        return /^\s*([^@\s]{1,64})@((?:[-a-z0-9]+\.)+[a-z]{2,})\s*$/i.test(value);

      case 'pin':
        return /\d{5,}/.test(value);

      default:
        return true;
    }
  }

  validate(value) {
    const { shouldMatchValue } = this.props;

    // If the value is valid for its type, check if it needs to match another value
    const validForType = this.validateForType(value);
    if(validForType && shouldMatchValue)
        return value === shouldMatchValue;

    return validForType;
  }

  invalidMessageForType() {
    const { inputType } = this.props;

    switch(inputType) {
      case 'email':
        return t('.emailInvalidMessage');

      case 'pin':
        return t('.pinInvalidMessage');

      default:
        return null;
    }
  }

  renderError() {
    const { validationForced, showInvalidMessage } = this.props;
    const { value } = this.state;

    if (!validationForced || !showInvalidMessage)
      return null;

    var message = null;
    if (!this.validateForType(value))
      message = this.invalidMessageForType();

    if (message === null)
      return null;

    return (
      <CardItem key='InputError'>
        <Text style={{color: '#ed2f2f'}}>
         { message }
        </Text>
      </CardItem>
    );
  }

  render() {
    const {
      validationForced,
      label,
      trimValues,
      testID,
      autoFocus,
    } = this.props;

    const {
      isBlurred,
      value
    } = this.state;

    const onChangeText = newValue =>
      this.setState({value: trimValues ? newValue.trim() : newValue});

    const inputProps = {
      ...this.inputPropsForType(),
      onBlur: () => this.setState({isBlurred: true}),
      onChangeText,
      onFocus: () => this.setState({isBlurred: false}),
      value,
      testID,
      autoFocus,
    };

    // Only show error underlines if validation is forced,
    // or when we are blurred and non-empty
    let error = false;
    if(validationForced || (isBlurred && value !== '')) {
      if(!this.validate(value))
        error = true;
    }

    return [
        this.renderError(),
        <Item key='InputForm' stackedLabel error={error} style={{marginBottom: 10}}>
          <Label>{ label }</Label>
          <Input {...inputProps} />
        </Item>
    ];
  }
}
