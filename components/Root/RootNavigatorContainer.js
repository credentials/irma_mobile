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

  constructor(props) {
    super(props);

    this.urlListener = ::this.urlListener;
    this.setNavigatorRef = ::this.setNavigatorRef;
  }

  componentDidMount() {
    const { ensureEnrollment, handleUrl } = this.props;

    // Set the initial current route
    const currentRoute = getCurrentRoute(this.navigator.state.nav);
    this.setState({currentRoute});

    // On mount, which is on application start, see if we there are any unenrolled
    // scheme managers for which we need to start a keyshare enrollment
    //ensureEnrollment(this.navigator);

    // Also on mount, handle any initial IRMA URL with which the app was started
    Linking.getInitialURL().then( irmaUrl => {
      if (this.navigator && irmaUrl)
        handleUrl(irmaUrl, this.navigator);
    }).catch();

    // Setup a handler for any IRMA URLs which are opened later
    // We do not unsubscribe because the Root hierachy is not expected to unmount
    Linking.addEventListener('url', this.urlListener);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.urlListener);
  }

  urlListener(event) {
    const { handleUrl } = this.props;
    handleUrl(event.url, this.navigator);
  }

  navigationStateChange(prevState, newState) {
    // Whenever navigation changes, save the current route
    const currentRoute = getCurrentRoute(newState);
    this.setState({currentRoute});
  }

  // This ref setting function in bound only once in the constructor instead of with an arrow function in render
  // due to the ref prop behaving as described here: https://github.com/facebook/react/issues/9328#issuecomment-298438237
  // We originally crashed because Linking.getInitialURL's promise resolved while this.navigator was null
  setNavigatorRef(nav) {
    this.navigator = nav;
  }

  render() {
    // Lock the drawer on screens other than the Dashboard or the Drawer itself
    const { currentRoute } = this.state;
    const drawerLockMode = currentRoute === 'CredentialDashboard' || currentRoute === 'DrawerOpen' ?
      'unlocked' : 'locked-closed';

    return (
      <RootNavigator
        ref={this.setNavigatorRef}
        onNavigationStateChange={::this.navigationStateChange}
        screenProps={{drawerLockMode}}
      />
    );
  }
}
