import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Enrollment, { t } from './Enrollment';

const mapStateToProps = (state) => {
  const {
    enrollment: {
      error,
      status,
    }
  } = state;

  return {
    enrollmentStatus: status,
    enrollmentError: error,
  };
};

@connect(mapStateToProps)
export default class EnrollmentContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    enrollmentError: PropTypes.string,
    enrollmentStatus: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    title: t('.title')
  }

  state = {
    email: null,
    validationForced: false,
    pin: null,
  }

  changeEmail(email) {
    this.setState({email});
  }

  changePin(pin) {
    this.setState({pin});
  }

  enroll(email, pin) {
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
    const { email, pin, validationForced } = this.state;

    return (
      <Enrollment
        changeEmail={::this.changeEmail}
        changePin={::this.changePin}
        email={email}
        enroll={::this.enroll}
        navigateBack={::this.navigateBack}
        navigateToDashboard={::this.navigateToDashboard}
        pin={pin}
        validationForced={validationForced}
      />
    );
  }
}
