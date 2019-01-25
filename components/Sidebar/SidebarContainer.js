import React, { Component } from 'react';
import { Linking, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Navigation, CREDENTIAL_DASHBOARD_ROOT_ID, setEnrollmentRoot, setCredentialDashboardSidebarEnabled, hideCredentialDashboardSidebar } from 'lib/navigation';
import Sidebar, { t } from './Sidebar';

const mapStateToProps = (state) => {
  const {
    enrollment: {
      enrolledSchemeManagerIds,
      unenrolledSchemeManagerIds,
    },
  } = state;

  const canEnroll = unenrolledSchemeManagerIds.length > 0;
  const isEnrolled = enrolledSchemeManagerIds.length > 0;

  return {
    canEnroll,
    isEnrolled,
  };
};

@connect(mapStateToProps)
export default class SidebarContainer extends Component {

  static propTypes = {
    canEnroll: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    isEnrolled: PropTypes.bool.isRequired,
  }

  deleteAllCredentials = () => {
    const { dispatch } = this.props;
    dispatch({type: 'IrmaBridge.DeleteAllCredentials'});
  }

  navigate = (name) => {
    hideCredentialDashboardSidebar();
    Navigation.push(CREDENTIAL_DASHBOARD_ROOT_ID, {
      component: {
        name,
      },
    });
  }

  navigateToEnrollment = () => {
    setEnrollmentRoot();
  }

  navigateToMoreAttributes = () => {
    Linking.openURL(t('.moreAttributesURL')).catch();
    hideCredentialDashboardSidebar();
  }

  render() {
    const { isEnrolled, canEnroll } = this.props;

    return (
      <Sidebar
        canEnroll={canEnroll}
        closeSidebar={hideCredentialDashboardSidebar}
        deleteAllCredentials={this.deleteAllCredentials}
        isEnrolled={isEnrolled}
        navigate={this.navigate}
        navigateToEnrollment={this.navigateToEnrollment}
        navigateToMoreAttributes={this.navigateToMoreAttributes}
      />
    );
  }
}