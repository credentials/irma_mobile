import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { resetNavigation } from 'lib/navigation';

import EnrollmentTeaser from './EnrollmentTeaser';

@connect()
export default class EnrollmentTeaserContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    header: null,
  }

  navigateToEnrollment() {
    const { dispatch, navigation } = this.props;

    dispatch({
      type: 'Enrollment.Start'
    });

    navigation.navigate('Enrollment');
  }

  navigateToCredentialDashboard() {
    const { navigation } = this.props;
    resetNavigation(navigation.dispatch, 'CredentialDashboard');
  }

  render() {
    return (
      <EnrollmentTeaser
        navigateToCredentialDashboard={::this.navigateToCredentialDashboard}
        navigateToEnrollment={::this.navigateToEnrollment}
      />
    );
  }
}
