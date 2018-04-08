import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Enrollment, { t } from './Enrollment';
import { resetNavigation } from 'lib/navigation';

const mapStateToProps = (state) => {
  const {
    enrollment: {
      error,
      status,
    }
  } = state;

  return {
    error,
    status,
  };
};

@connect(mapStateToProps)
export default class EnrollmentContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.object,
    navigation: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
  }

  static navigationOptions = Enrollment.navigationOptions;

  state = {
    email: null,
    validationForced: false,
    pin: null,
  }

  componentDidUpdate(prevProps) {
    const { status, navigation } = this.props;

    // When successful, reset the EnrollmentTeaser off the routes, so we can't go back
    // TODO: This creates an unwanted animation, but react-navigation doesn't seem to support
    // not displaying it. Only workaround seems to be react-navigation#1490
    // Consider first upgrading react-navigation before attempting this.
    if(prevProps.status !== status && status === 'success') {
      resetNavigation(navigation.dispatch, 'Enrollment');
    }
  }

  changeEmail(email) {
    this.setState({email});
  }

  changePin(pin) {
    this.setState({pin});
  }

  enroll({ pin, email }) {
    const { dispatch } = this.props;

    dispatch({
      type: 'IrmaBridge.Enroll',
      email,
      pin,
    });
  }

  navigateBack() {
    const { dispatch, navigation } = this.props;

    dispatch({
      type: 'Enrollment.Dismiss'
    });

    navigation.goBack();
  }

  navigateToDashboard() {
    const { navigation } = this.props;
    navigation.navigate('CredentialDashboard');
  }

  render() {
    const { error, status } = this.props;
    const { email, pin, validationForced } = this.state;

    return (
      <Enrollment
        changeEmail={::this.changeEmail}
        changePin={::this.changePin}
        email={email}
        enroll={::this.enroll}
        error={error}
        navigateBack={::this.navigateBack}
        navigateToDashboard={::this.navigateToDashboard}
        pin={pin}
        status={status}
        validationForced={validationForced}
      />
    );
  }
}
