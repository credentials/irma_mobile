import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Input,
  Item,
  Label,
} from 'native-base';

export default class FormInput extends Component {

  static propTypes = {
    forceValidation: PropTypes.bool,
    initialValue: PropTypes.string,
    inputProps: PropTypes.object,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    trimValues: PropTypes.bool.isRequired,
    validate: PropTypes.func,
  }

  static defaultProps = {
    forceValidation: false,
    inputProps: {},
    trimValues: true,
    validate: () => true,
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
    const { value } = this.state;
    if(prevState.value !== value)
      this.emitChange(value);
  }

  emitChange() {
    const { onChange, validate } = this.props;
    const { value } = this.state;

    // Only pass through valid values, or null otherwise
    if(validate(value))
      onChange(value);
    else
      onChange(null);
  }

  render() {
    const {
      forceValidation,
      inputProps: extraInputProps,
      label,
      trimValues,
      validate,
    } = this.props;

    const {
      isBlurred,
      value
    } = this.state;

    const onChangeText = newValue =>
      this.setState({value: trimValues ? newValue.trim() : newValue});

    const inputProps = {
      ...extraInputProps,
      onBlur: () => this.setState({isBlurred: true}),
      onChangeText,
      onFocus: () => this.setState({isBlurred: false}),
      value,
    };

    // Only show error underlines if validation is forced,
    // or when we are blurred and non-empty
    let error = false;
    if(forceValidation || (isBlurred && value !== '')) {
      if(!validate(value))
        error = true;
    }

    return (
      <Item stackedLabel error={error} style={{marginBottom: 10}}>
        <Label>{ label }</Label>
        <Input {...inputProps} />
      </Item>
    );
  }
}
