import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Enrollment from './Enrollment';
import Teaser from './children/Teaser';

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
    displayTeaser: true,
    email: null,
    forceValidation: false,
    pin: null,
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

  dismissEnrollment() {
    const { dispatch, navigation, schemeManager } = this.props;

    dispatch({
      type: 'Enrollment.Dismiss',
      schemeManagerId: schemeManager.ID,
    });

    navigation.navigate('CredentialDashboard');
  }

  dismissTeaser() {
    this.setState({displayTeaser: false});
  }

  backToTeaser() {
    this.setState({displayTeaser: true});
  }

  render() {
    const { enrollmentStatus, enrollmentError } = this.props;
    const { currentStep, displayTeaser, email, pin, forceValidation } = this.state;

    if(displayTeaser) {
      return (
        <Teaser
          dismissEnrollment={::this.dismissEnrollment}
          dismissTeaser={::this.dismissTeaser}
        />
      );
    }

    return (
      <Enrollment
        backToTeaser={::this.backToTeaser}
        changeEmail={::this.changeEmail}
        changePin={::this.changePin}
        email={email}
        forceValidation={forceValidation}
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
