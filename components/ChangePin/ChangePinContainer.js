import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Navigation } from 'lib/navigation';
import ChangePin, { t } from './ChangePin';

const mapStateToProps = (state) => {
  const {
    changePin: {
      error,
      status,
      remainingAttempts,
      timeout,
    },
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
    error: PropTypes.object,
    remainingAttempts: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    timeout: PropTypes.number,
    navigation: PropTypes.object.isRequired,
  }

  static defaultProps = {
    error: null,
    timeout: null,
  }

  state = {
    oldPin: '',
    newPin: '',
    validationForced: false,
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({type: 'ChangePin.Reset'});
  }

  changeOldPin = (oldPin) => {
    this.setState({oldPin});
  }

  changeNewPin = (newPin) => {
    this.setState({newPin});
  }

  changePin = () => {
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

  navigateBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    const { validationForced } = this.state;
    const { status, error, remainingAttempts, timeout } = this.props;

    return (
      <ChangePin
        changeNewPin={this.changeNewPin}
        changeOldPin={this.changeOldPin}
        changePin={this.changePin}
        error={error}
        navigateBack={this.navigateBack}
        remainingAttempts={remainingAttempts}
        status={status}
        timeout={timeout}
        validationForced={validationForced}
      />
    );
  }
}
