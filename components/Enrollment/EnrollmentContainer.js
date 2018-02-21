import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Enrollment from './Enrollment';

const mapStateToProps = (state, props) => {
  const {
    navigation,
  } = props;

  const { schemeManagerId } = navigation.state.params;

  const {
    irmaConfiguration: {
      schemeManagers,
    },
    enrollment: {
      [schemeManagerId]: {
        status,
        error,
      }
    }
  } = state;

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
    schemeManager: PropTypes.object.isRequired,
  }

  state = {
    currentStep: 0,
    email: null,
    validationForced: false,
    pin: null,
  }

  prevStep() {
    const { currentStep } = this.state;

    switch(currentStep) {
      case 1:
      case 2:
      case 3:
        this.setState({currentStep: currentStep - 1, validationForced: false});
    }
  }

  nextStep() {
    const { currentStep, email, pin } = this.state;

    switch(currentStep) {
      case 0:
        this.setState({currentStep: 1});
      break;

      case 1:
        if(email)
          this.setState({currentStep: 2, validationForced: false});
        else
          this.setState({validationForced: true});
        break;

      case 2:
        if(pin) {
          this.enroll(email, pin);
          this.setState({currentStep: 3});
        } else
          this.setState({validationForced: true});
        break;

      case 3:
        this.dismiss();
        break;

      default:
        return;
    }
  }

  changeEmail(email) {
    this.setState({email});
  }

  changePin(pin) {
    this.setState({pin});
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

  dismiss() {
    const { dispatch, navigation, schemeManager } = this.props;

    dispatch({
      type: 'Enrollment.Dismiss',
      schemeManagerId: schemeManager.ID,
    });

    navigation.navigate('CredentialDashboard');
  }

  render() {
    const { enrollmentStatus, enrollmentError } = this.props;
    const { currentStep, email, pin, validationForced } = this.state;

    return (
      <Enrollment
        changeEmail={::this.changeEmail}
        changePin={::this.changePin}
        currentStep={currentStep}
        dismiss={::this.dismiss}
        email={email}
        validationForced={validationForced}
        nextStep={::this.nextStep}
        pin={pin}
        prevStep={::this.prevStep}
        enrollmentError={enrollmentError}
        enrollmentStatus={enrollmentStatus}
      />
    );
  }
}
