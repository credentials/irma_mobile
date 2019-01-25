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
        text: t('.shortTitle'),
        alignment: 'center',
      },
    },
  }

  state = {
    email: null,
    pin: null,
    disableRetry: false,
  }

  // componentDidUpdate(prevProps) {
  //   const { status } = this.props;

  //   // When successfully enrolled, reset the route so we can't go back to EnrollmentTeaser
  //   // TODO: This creates an unwanted animation, but react-navigation doesn't seem to support
  //   // not displaying it, despite years of tickets. Only workaround seems to be react-navigation#1490
  //   // Consider first upgrading react-navigation before attempting this.
  //   if (prevProps.status !== status && status === 'success') {
  //     resetNavigation(navigation.dispatch, 'Enrollment');
  //   }
  // }

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
    setCredentialDashboardRoot();
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
