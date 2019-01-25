import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Navigation, setCredentialDashboardRoot, ENROLLMENT_SCREEN } from 'lib/navigation';

import EnrollmentTeaser from './EnrollmentTeaser';

@connect()
export default class EnrollmentTeaserContainer extends Component {

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  static options = {

  }

  navigateToEnrollment = () => {
    const { dispatch, componentId } = this.props;

    dispatch({
      type: 'Enrollment.Start',
    });

    Navigation.push(componentId, {
      component: {
        name: ENROLLMENT_SCREEN,
      },
    });
  }

  navigateToCredentialDashboard = () => {
    setCredentialDashboardRoot();
  }

  render() {
    return (
      <EnrollmentTeaser
        navigateToCredentialDashboard={this.navigateToCredentialDashboard}
        navigateToEnrollment={this.navigateToEnrollment}
      />
    );
  }
}
