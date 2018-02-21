import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Enrollment from './Enrollment';

const mapStateToProps = (state) => {
  const {
    irmaConfiguration: {
      schemeManagers,
    },
    enrollment: {
      error,
      status,
      unenrolledSchemeManagerIds,
    }
  } = state;

  // Irmago doesn't actually support multiple scheme managers with keyshare enrollment,
  // so we just pick the first unenrolled, which should be PBDF
  const schemeManagerId = unenrolledSchemeManagerIds[0];

  return {
    schemeManager: schemeManagers[schemeManagerId],
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
    schemeManager: PropTypes.object,
  }

  static navigationOptions = {
    title: 'Open IRMA account'
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

  fakeEnroll() {
    const { dispatch } = this.props;
    dispatch({type: 'Enrollment.FakeEnrollment'});
  }

  enroll() {
    const { dispatch, schemeManager } = this.props;
    const { email, pin } = this.state;

    dispatch({
      type: 'IrmaBridge.Enroll',
      schemeManagerId: schemeManager.ID,
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
        fakeEnroll={::this.fakeEnroll}
        validationForced={validationForced}
        navigateBack={::this.navigateBack}
        navigateToDashboard={::this.navigateToDashboard}
        pin={pin}
      />
    );

      //   currentStep={currentStep}
      //   dismiss={::this.dismiss}

      //   nextStep={::this.nextStep}

      //   prevStep={::this.prevStep}
      //   enrollmentError={enrollmentError}
      //   enrollmentStatus={enrollmentStatus}
      // />
  }
}
