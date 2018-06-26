import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  Text,
  CardItem,
  View,
} from 'native-base';

import { namespacedTranslation } from 'lib/i18n';

import FormInput from './FormInput';

const t = namespacedTranslation('RepeatedValueForm');

export default class RepeatedValueForm extends Component {

  static propTypes = {
    firstLabel: PropTypes.string.isRequired,
    initialValue: PropTypes.string,
    inputType: PropTypes.string,
    onChange: PropTypes.func,
    repeatLabel: PropTypes.string.isRequired,
    trimValues: PropTypes.bool,
    validationForced: PropTypes.bool,
  }

  state = {
    firstValue: this.props.initialValue || '',
    repeatValue: this.props.initialValue || '',
  }

  componentDidUpdate(prevProps, prevState) {
    const { onChange } = this.props;
    const { firstValue, repeatValue } = this.state;

    if(prevState.firstValue !== firstValue || prevState.repeatValue !== repeatValue) {
      if(firstValue && firstValue === repeatValue)
        onChange(firstValue);
      else
        onChange(null);
    }
  }

  renderForm() {
    const {
      firstLabel,
      initialValue,
      inputType,
      repeatLabel,
      trimValues,
      validationForced,
    } = this.props;

    const { firstValue } = this.state;

    const formInputProps = {
      initialValue,
      inputType,
      trimValues,
      validationForced,
    };

    return (
      <Form style={{paddingRight: 20}}>
        <FormInput
          {...formInputProps}
          testID="firstInput"
          label={firstLabel}
          onChange={firstValue => this.setState({firstValue})}
          showInvalidMessage = { true }
        />
        <FormInput
          {...formInputProps}
          testID="repeatInput"
          label={repeatLabel}
          onChange={repeatValue => this.setState({repeatValue})}
          shouldMatchValue={firstValue}
        />
      </Form>
    );
  }

  renderError() {
    const { validationForced } = this.props;
    const { firstValue, repeatValue } = this.state;

    // Only render error text message when explicitly forcing validation
    if(!validationForced)
      return null;

    // Only show a subject-relevant error message if we are passed one
    // Never show the two error messages alongside each other
    let error;
    if(repeatValue !== firstValue)
      error = t('.noMatch');

    if(!error)
      return null;

    return (
      <CardItem>
        <Text testID="errorText" style={{color: '#ed2f2f'}}>
          { error }
        </Text>
      </CardItem>
    );
  }

  render() {
    return (
      <View>
        { this.renderError() }
        { this.renderForm() }
      </View>
    );
  }
}
