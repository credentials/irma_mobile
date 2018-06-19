import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChangePin from './ChangePin';

const mapStateToProps = (state) => {
  const {
    changePin: {
      error,
      status,
      remainingAttempts,
      timeout,
    }
  } = state;

  return {
    error,
    status,
    remainingAttempts,
    timeout,
  };
};

@connect(mapStateToProps)
export default class ChangePinContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    error: PropTypes.object,
    navigation: PropTypes.object.isRequired,
    remainingAttempts: PropTypes.number.isRequired,
    timeout: PropTypes.number,
  }

  static navigationOptions = ChangePin.navigationOptions;

  state = {
    oldPin: null,
    newPin: null,
    validationForced: false
  }
  
  changeOldPin(oldPin) {
    this.setState({oldPin});
  }
  
  changeNewPin(newPin) {
    this.setState({newPin});
  }
  
  changePin() {
    const { oldPin, newPin } = this.state;
    const { dispatch } = this.props;
    
    if (!oldPin || !newPin) {
      this.setState({validationForced: true});
      return;
    }
    
    dispatch({
      type: 'IrmaBridge.ChangePin',
      oldPin,
      newPin,
    });
  }
  
  navigateBack() {
    const { navigation } = this.props
    navigation.goBack();
  }

  render() {
    const { newPin, validationForced } = this.state;
    const { status, error, remainingAttempts, timeout } = this.props;
  
    return (
      <ChangePin 
        changeOldPin = { ::this.changeOldPin }
        changeNewPin = { ::this.changeNewPin }
        newPin = { newPin }
        status = { status }
        error = { error }
        validationForced = { validationForced }
        changePin = { ::this.changePin }
        remainingAttempts = { remainingAttempts }
        timeout = { timeout }
        navigateBack = { ::this.navigateBack }
      />
    );
  }
}
