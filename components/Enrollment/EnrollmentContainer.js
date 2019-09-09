import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';

import Enrollment, { t } from './Enrollment';
import { setCredentialDashboardRoot } from 'lib/navigation';
import { getLanguage } from 'lib/i18n';

const mapStateToProps = (state) => {
  const {
    enrollment: {
      error,
      status,
    },
  } = state;

  return {
    error,
    status,
  };
};

@ReactTimeout
@connect(mapStateToProps)
export default class EnrollmentContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.object,
    status: PropTypes.string.isRequired,
    setTimeout: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  static options = {
    topBar: {
      title: {
        text: t('.title'),
        alignment: 'center',
      },

      // TODO: Dynamic backbutton visibility change (for enrollment success) is broken
      // in react-native-navigation on Android. We do need it for non-success.
      // backButton: {
      //   visible: false,
      // },
    },
  }

  state = {
    email: null,
    pin: null,
    disableRetry: false,
  }

  changeEmail = (email) => {
    this.setState({email});
  }

  changePin = (pin) => {
    this.setState({pin});
  }

  enroll = ({ pin, email }) => {
    const { dispatch } = this.props;
    const language = getLanguage();

    // We take the passed (pin and) email value, because the user could've skipped while having
    // validly filled the email fields. So we record the final value here for retries
    this.setState({email, pin});

    dispatch({
      type: 'IrmaBridge.Enroll',
      email,
      pin,
      language,
    });
  }

  retryEnroll = () => {
    const { dispatch } = this.props;
    const { email, pin } = this.state;
    const language = getLanguage();

    // Disallow retry for three seconds
    this.setState({disableRetry: true});
    this.props.setTimeout(
      () => this.setState({disableRetry: false}),
      3000
    );

    dispatch({
      type: 'IrmaBridge.Enroll',
      email,
      pin,
      language,
    });
  }

  navigateToDashboard = () => {
    // TODO: This should be removed if the way of transitioning is accepted
    console.warn('not implemented');
  }

  render() {
    const { error, status } = this.props;
    const { disableRetry, email, pin } = this.state;

    return (
      <Enrollment
        changeEmail={this.changeEmail}
        changePin={this.changePin}
        disableRetry={disableRetry}
        email={email}
        enroll={this.enroll}
        error={error}
        navigateToDashboard={this.navigateToDashboard}
        pin={pin}
        retryEnroll={this.retryEnroll}
        status={status}
      />
    );
  }
}
