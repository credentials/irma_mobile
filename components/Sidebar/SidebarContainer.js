import React, { Component } from 'react';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    navigation: PropTypes.object.isRequired,
  }

  removeStorage = () => {
    const { dispatch } = this.props;
    dispatch({type: 'IrmaBridge.RemoveStorage'});
  }

  navigate = (name) => {
    const { navigation } = this.props;
    navigation.navigate(name);
  }

  navigateToMoreAttributes = () => {
    const { navigation } = this.props;

    Linking.openURL(t('.moreAttributesURL')).catch();
    navigation.closeDrawer();
  }

  closeSidebar = () => {
    const { navigation } = this.props;
    navigation.closeDrawer();
  }

  render() {
    const { isEnrolled, canEnroll } = this.props;

    return (
      <Sidebar
        canEnroll={canEnroll}
        closeSidebar={this.closeSidebar}
        removeStorage={this.removeStorage}
        isEnrolled={isEnrolled}
        navigate={this.navigate}
        navigateToMoreAttributes={this.navigateToMoreAttributes}
      />
    );
  }
}
