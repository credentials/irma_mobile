import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { namespacedTranslation } from 'lib/i18n';
import Card from 'lib/UnwrappedCard';

import FormInput from './FormInput';

import {
  Form,
  Text,
  CardItem,
  View,
} from 'native-base';

const t = namespacedTranslation('RepeatedValueForm');

export default class RepeatedValueForm extends Component {

  static propTypes = {
    firstLabel: PropTypes.string.isRequired,
    forceValidation: PropTypes.bool,
    initialValue: PropTypes.string,
    inputProps: PropTypes.object,
    invalidMessage: PropTypes.string,
    onChange: PropTypes.func,
    repeatLabel: PropTypes.string.isRequired,
    trimValues: PropTypes.bool,
    validate: PropTypes.func,
  }

  state = {
    firstValue: this.props.initialValue || '',
    repeatValue: this.props.initialValue || '',
  }

  componentDidUpdate(prevProps, prevState) {
    const { onChange, validate } = this.props;
    const { firstValue, repeatValue } = this.state;

    if(prevState.firstValue !== firstValue || prevState.repeatValue !== repeatValue) {
      if(validate(firstValue) && firstValue === repeatValue)
        onChange(firstValue);
      else
        onChange(null);
    }
  }

  renderForm() {
    const {
      firstLabel,
      forceValidation,
      initialValue,
      inputProps,
      repeatLabel,
      trimValues,
      validate,
    } = this.props;

    const { firstValue } = this.state;

    const formInputProps = {
      forceValidation,
      initialValue,
      inputProps,
      trimValues,
    };

    return (
      <Form style={{paddingRight: 20}}>
        <FormInput
          {...formInputProps}
          label={firstLabel}
          onChange={firstValue => this.setState({firstValue})}
          validate={validate} />
        <FormInput
          {...formInputProps}
          label={repeatLabel}
          onChange={repeatValue => this.setState({repeatValue})}
          validate={repeatValue => validate(repeatValue) && repeatValue === firstValue} />
      </Form>
    );
  }

  renderError() {
    const { forceValidation, validate, invalidMessage } = this.props;
    const { firstValue, repeatValue } = this.state;

    // Only render error text message when explicitly forcing validation
    if(!forceValidation)
      return null;

    // Only show a subject-relevant error message if we are passed one
    // Never show two error messages alongside each other
    let error;
    if(invalidMessage && !validate(firstValue))
      error = invalidMessage;
    else if(repeatValue !== firstValue)
      error = t('.noMatch');

    if(!error)
      return null;

    return (
      <CardItem>
        <Text style={{color: '#ed2f2f'}}>
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
