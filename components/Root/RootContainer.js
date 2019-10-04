import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { Root as NBRoot, StyleProvider } from 'native-base';
import { createAppContainer, NavigationActions } from 'react-navigation';

import store from 'store';
import services from 'store/services';
import getTheme from 'lib/native-base-theme/components';
import nbVariables from 'lib/native-base-theme/variables/platform';

import { RootNavigator } from './navigators';

const AppContainer = createAppContainer(RootNavigator);

export default class Root extends Component {
  navigationRef = null
  unsubscribeServices = null
  localStoreUnsubscribe = null
  componentDidMount() {
    this.localStoreUnsubscribe = store.subscribe(this.navigationStoreListener);
    this.unsubscribeServices = services(this.safeNavigate);
  }

  componentWillUnmount() {
    this.unsubscribeServices();
    this.localStoreUnsubscribe();
  }

  withheldNavigationEvents = []
  navigationStoreListener = () => {
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
      },
    } = store.getState();

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
  }

  safeNavigate = (navaction, {forceOnStack}={forceOnStack: false}) => {
    if (!forceOnStack && this.navigationRef.state.nav.routes[this.navigationRef.state.nav.index].key === 'MainStackWithDrawer') {
      this.navigationRef.dispatch(navaction);
    } else {
      if (this.withheldNavigationEvents.length < 5)
        this.withheldNavigationEvents.push(navaction);
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
