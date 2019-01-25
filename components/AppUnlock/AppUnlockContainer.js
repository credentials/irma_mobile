import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Navigation } from 'lib/navigation';

import AppUnlock from './AppUnlock';

const mapStateToProps = (state) => {
  const {
    appUnlock: {
      status,
      hadFailure,
      remainingAttempts,
    },
  } = state;

  return {
    status,
    hadFailure,
    remainingAttempts,
  };
};

@connect(mapStateToProps)
export default class AppUnlockContainer extends Component {

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    hadFailure: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    remainingAttempts: PropTypes.number.isRequired,
    blockedDuration: PropTypes.number.isRequired,
    error: PropTypes.object,
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({type: 'AppUnlock.Reset'});
  }

  dismissModal = () => {
    const { componentId } = this.props;
    Navigation.dismissModal(componentId);
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
    const { status, hadFailure, remainingAttempts, blockedDuration } = this.props;

    return (
      <AppUnlock
        authenticate={this.authenticate}
        dismissModal={this.dismissModal}
        hadFailure={hadFailure}
        remainingAttempts={remainingAttempts}
        blockedDuration={blockedDuration}
        status={status}
       />
    );
  }
}
