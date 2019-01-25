import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Navigation, setCredentialDashboardRoot, ENROLLMENT_SCREEN } from 'lib/navigation';

import EnrollmentTeaser from './EnrollmentTeaser';

const mapStateToProps = (state) => {
  const {
    enrollment: {
      enrolledSchemeManagerIds,
      loaded: enrollmentLoaded,
    },
  } = state;

  const isEnrolled = enrollmentLoaded && enrolledSchemeManagerIds.length > 0;

  return {
    isEnrolled,
  };
};

@connect(mapStateToProps)
export default class EnrollmentTeaserContainer extends Component {

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    isEnrolled: PropTypes.bool.isRequired,
  }

  static options = {
    topBar: {
      visible: false,
      drawBehind: true,
    },
  }

  componentDidMount() {
    Navigation.events().bindComponent(this);
  }

  componentDidAppear({ componentId: appearedComponentId }) {
    // The user may swipe back (iOS) or tap the hardware back button after finishing Enrollment
    // react-native-navigation doesn't support pulling out this component from under the stack
    // For now: on appearance of EnrollmentTeaser, we check if we're already enrolled, then setRoot
    // TODO: Refactor when react-native-navigation natively supports this
    const { componentId, isEnrolled } = this.props;
    if (appearedComponentId === componentId && isEnrolled)
      this.navigateToCredentialDashboard();
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
