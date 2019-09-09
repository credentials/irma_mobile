import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EnrollmentTeaser from './EnrollmentTeaser';

const mapStateToProps = (/*state*/) => {
  return {

  };
};

@connect(mapStateToProps)
export default class EnrollmentTeaserContainer extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  static navigationOptions = {
    header: null,
  }

  navigateToEnrollment = () => {
    const { dispatch, navigation } = this.props;

    dispatch({
      type: 'Enrollment.Start',
    });

    navigation.navigate('Enrollment');
  }

  navigateToCredentialDashboard = () => {
    console.warn('Not implemented');
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
