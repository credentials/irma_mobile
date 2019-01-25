import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { CREDENTIAL_DASHBOARD_ROOT_ID, setEnrollmentRoot } from 'lib/navigation';
import Sidebar from './Sidebar';

const mapStateToProps = (state) => {
  const {
    enrollment: {
      enrolledSchemeManagerIds,
      loaded: testLoaded,
      unenrolledSchemeManagerIds,
    },
  } = state;

  const canEnroll = unenrolledSchemeManagerIds.length > 0;
  const isEnrolled = enrolledSchemeManagerIds.length > 0;

  return {
    canEnroll,
    isEnrolled,
    testLoaded,
  };
};

@connect(mapStateToProps)
export default class SidebarContainer extends Component {

  static propTypes = {
    canEnroll: PropTypes.bool.isRequired,
    componentId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    isEnrolled: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    // Make sure the sidebar is only available from the CredentialDashboard
    Navigation.events().registerComponentDidAppearListener(({ componentId }) => {
      if (componentId === CREDENTIAL_DASHBOARD_ROOT_ID)
        this.setSideMenuEnabled(true);
    });

    Navigation.events().registerComponentDidDisappearListener(({ componentId }) => {
      if (componentId === CREDENTIAL_DASHBOARD_ROOT_ID)
        this.setSideMenuEnabled(false);
    });
  }

  setSideMenuEnabled(enabled) {
    const { componentId } = this.props;

    Navigation.mergeOptions(componentId, {
      sideMenu: {
        left: {
          enabled,
        },
      },
    });
  }

  closeSidebar = () => {
    const { componentId } = this.props;

    Navigation.mergeOptions(componentId, {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    });
  }

  deleteAllCredentials = () => {
    const { dispatch } = this.props;
    dispatch({type: 'IrmaBridge.DeleteAllCredentials'});
  }

  navigate = (name) => {
    this.closeSidebar();
    Navigation.push(CREDENTIAL_DASHBOARD_ROOT_ID, {
      component: {
        name,
      },
    });
  }

  navigateToEnrollment = () => {
    setEnrollmentRoot();
  }

  render() {
    const { isEnrolled, canEnroll } = this.props;

    return (
      <Sidebar
        canEnroll={canEnroll}
        closeSidebar={this.closeSidebar}
        deleteAllCredentials={this.deleteAllCredentials}
        isEnrolled={isEnrolled}
        navigate={this.navigate}
        navigateToEnrollment={this.navigateToEnrollment}
      />
    );
  }
}