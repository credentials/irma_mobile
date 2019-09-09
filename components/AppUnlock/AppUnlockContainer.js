import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BackHandler, Keyboard } from 'react-native';

import AppUnlock, { headerTitle, HeaderLeftButton } from './AppUnlock';

const mapStateToProps = (state) => {
  const {
    appUnlock: {
      blockedDuration,
      error,
      hadFailure,
      remainingAttempts,
      status,
    },
  } = state;

  return {
    blockedDuration,
    error,
    hadFailure,
    remainingAttempts,
    status,
  };
};

@connect(mapStateToProps)
export default class AppUnlockContainer extends Component {

  static propTypes = {
    blockedDuration: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.object,
    hadFailure: PropTypes.bool.isRequired,
    remainingAttempts: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  static navigationOptions = {
    headerTitle,
    headerLeft: <HeaderLeftButton />,
  }

  // Disable backpress on this screen
  componentDidAppear() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentDidDisappear() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => true

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({type: 'AppUnlock.Reset'});
  }

  dismissAppUnlock = () => {
    Keyboard.dismiss();
    console.warn('not implemented');
  }

  authenticate = pin => {
    const { dispatch } = this.props;

    if (pin.length < 5)
      return;

    dispatch({
      type: 'IrmaBridge.Authenticate',
      pin: pin,
    });
  }

  render() {
    const { status, error, hadFailure, remainingAttempts, blockedDuration } = this.props;

    return (
      <AppUnlock
        authenticate={this.authenticate}
        blockedDuration={blockedDuration}
        dismissAppUnlock={this.dismissAppUnlock}
        error={error}
        hadFailure={hadFailure}
        remainingAttempts={remainingAttempts}
        status={status}
       />
    );
  }
}
