import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Linking } from 'react-native';

import RootNavigator from './RootNavigator';

const getCurrentRoute = (state) => (
  state.index !== undefined ?
    getCurrentRoute(state.routes[state.index]) : state.routeName
);

export default class RootNavigatorContainer extends Component {
  static propTypes = {
    ensureEnrollment: PropTypes.func.isRequired,
    handleUrl: PropTypes.func.isRequired,
  }

  state = {
    currentRoute: null,
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.boundHandleOpenURL);
  }

  boundHandleOpenURL = null
  handleOpenURL(event) {
    this.openURL(event.url);
  }

  componentDidMount() {
    const { ensureEnrollment, handleUrl } = this.props;

    // Set the initial current route
    const currentRoute = getCurrentRoute(this.navigator.state.nav);
    this.setState({currentRoute});

    // On mount, which is on application start, see if we there are any unenrolled
    // scheme managers for which we need to start a keyshare enrollment
    ensureEnrollment(this.navigator);

    // Also on mount, handle any initial IRMA URL with which the app was starter
    Linking.getInitialURL().then( irmaUrl => {
      if (irmaUrl)
        handleUrl(irmaUrl, this.navigator);
    }).catch();

    // Setup a handler for any IRMA URLs which are opened later
    Linking.addEventListener('url', event =>
      handleUrl(event.url, this.navigator)
    );
  }

  navigationStateChange(prevState, newState) {
    // Whenever navigation changes, save the current route
    const currentRoute = getCurrentRoute(newState);
    this.setState({currentRoute});
  }

  render() {
    const { currentRoute } = this.state;
    const drawerLockMode = currentRoute === 'CredentialDashboard' ?
      'unlocked' : 'locked-closed';

    return (
      <RootNavigator
        ref={nav => { this.navigator = nav; }}
        onNavigationStateChange={::this.navigationStateChange}
        screenProps={{drawerLockMode}}
      />
    );
  }
}
