import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { Root as NBRoot, StyleProvider } from 'native-base';
import { createAppContainer, NavigationActions } from 'react-navigation';

import store from 'store';
import services from 'store/services';
import { newSession } from 'store/reducers/sessions';
import { forceLockCheck } from 'store/services/appState';
import getTheme from 'lib/native-base-theme/components';
import nbVariables from 'lib/native-base-theme/variables/platform';

import { RootNavigator } from './navigators';

const AppContainer = createAppContainer(RootNavigator);

export default class Root extends Component {
  navigationRef = null
  unsubscribeServices = null
  localStoreUnsubscribe = null

  componentDidMount() {
    let state = store.getState();
    this.localStoreUnsubscribe = store.subscribe(() => {
      const prevState = state;
      const nextState = store.getState();
      state = nextState;

      this.navigationStoreDidUpdate(prevState, nextState);
    });
    this.unsubscribeServices = services();
  }

  componentWillUnmount() {
    this.unsubscribeServices();
    this.localStoreUnsubscribe();
  }

  withheldNavigationEvents = []
  navigationStoreDidUpdate = (prevState, state) => {
    const {
      appUnlock: {
        isAuthenticated,
      },
      enrollment: {
        loaded,
        enrolledSchemeManagerIds,
        unenrolledSchemeManagerIds,
      },
      navigation: {
        showForcedUpdate,
        initialSessionPointer,
        sessionPointer,
      },
    } = state;

    // Determine navigation stack
    let targetRoute = null;
    if (showForcedUpdate)
      targetRoute = 'ForcedUpdateStack';
    else if (!loaded)
      targetRoute = 'LoadingStack';
    else if (enrolledSchemeManagerIds.length > 0 && !isAuthenticated)
      targetRoute = 'AppUnlockStack';
    else
      targetRoute = 'MainStackWithDrawer';

    if (targetRoute !== this.navigationRef.state.nav.routes[this.navigationRef.state.nav.index].key) {
      this.navigationRef.dispatch(NavigationActions.navigate({routeName: targetRoute}));
      if (targetRoute === 'MainStackWithDrawer') {
        for (let i=0; i<this.withheldNavigationEvents.length; i++)
          this.navigationRef.dispatch(this.withheldNavigationEvents[i]);
        this.withheldNavigationEvents = [];
        if (unenrolledSchemeManagerIds.length > 0)
          this.navigationRef.dispatch(NavigationActions.navigate({routeName: 'EnrollmentTeaser'}));
      }
    }

    // Handle navigation when initialSessionPointer is set
    if (prevState.navigation.initialSessionPointer !== initialSessionPointer) {
      const sessionAction = newSession({request: initialSessionPointer, exitAfter: true});
      store.dispatch(sessionAction);

      const navigationAction = NavigationActions.navigate({routeName: 'Session', params: {sessionId: sessionAction.sessionId}});
      this.safeNavigate(navigationAction);
    }

    // Handle when a new sessionPointer is set
    if (prevState.navigation.sessionPointer !== sessionPointer) {
      const sessionAction = newSession({request: sessionPointer, exitAfter: true});
      store.dispatch(sessionAction);

      const navigationAction = NavigationActions.navigate({routeName: 'Session', params: {sessionId: sessionAction.sessionId}});
      this.safeNavigate(navigationAction, {forceOnStack: forceLockCheck()});
    }
  }

  safeNavigate = (navigationAction, {forceOnStack = false} = {}) => {
    if (!forceOnStack && this.navigationRef.state.nav.routes[this.navigationRef.state.nav.index].key === 'MainStackWithDrawer') {
      this.navigationRef.dispatch(navigationAction);
    } else {
      if (this.withheldNavigationEvents.length < 5)
        this.withheldNavigationEvents.push(navigationAction);
    }
  }

  render() {
    return (
      <ReduxProvider store={store}>
        <StyleProvider style={getTheme()}>
          <NBRoot>
            <StatusBar backgroundColor={nbVariables.colors.logoBlue} barStyle={'light-content'} />
            <AppContainer ref={(ref) => {
                this.navigationRef = ref;
              }} />
          </NBRoot>
        </StyleProvider>
      </ReduxProvider>
    );
  }
}
