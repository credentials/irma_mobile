import React, { Component, PureComponent } from 'react';
import { StatusBar } from 'react-native';
import { connect, Provider as ReduxProvider } from 'react-redux';
import { Root as NBRoot, StyleProvider } from 'native-base';
import { createAppContainer } from 'react-navigation';

import store from 'store';
import services from 'store/services';
import getTheme from 'lib/native-base-theme/components';
import nbVariables from 'lib/native-base-theme/variables/platform';

import { AppUnlockNavigator, EnrollmentNavigator, MainNavigator } from './navigators';

export default class RootProvider extends PureComponent {
  render() {
    return (
      <ReduxProvider store={store}>
        <RootContainer />
      </ReduxProvider>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    irmaConfiguration: {
      loaded: configurationLoaded,
    },
    preferences: {
      loaded: preferencesLoaded,
    },
    enrollment: {
      loaded: enrollmentLoaded,
      enrolledSchemeManagerIds,
    },
    credentials: {
      loaded: credentialsLoaded,
    },

    appUnlock: {
      isAuthenticated,
    },
    navigation: {
      cachedIsEnrolledLoaded: cachedIsEnrolledLoaded,
      cachedIsEnrolled: cachedIsEnrolled,
    },
  } = state;

  const irmaConfigurationLoaded = configurationLoaded && preferencesLoaded && enrollmentLoaded && credentialsLoaded;
  const isEnrolled = enrollmentLoaded && enrolledSchemeManagerIds.length > 0;

  return {
    irmaConfigurationLoaded,

    cachedIsEnrolledLoaded,
    cachedIsEnrolled,
    isEnrolled,

    isAuthenticated,
  };
};

@connect(mapStateToProps)
class RootContainer extends Component {

  unsubscribeServices = null
  componentDidMount() {
    this.unsubscribeServices = services();
  }

  componentWillUnmount() {
    this.unsubscribeServices();
  }

  getNavigator() {
    const { irmaConfigurationLoaded, cachedIsEnrolled, isEnrolled, isAuthenticated } = this.props;

    // TODO: Handle ForceUpdate here as well

    if (!irmaConfigurationLoaded) {
      if (cachedIsEnrolled)
        return AppUnlockNavigator;

      return EnrollmentNavigator;
    }

    if (!isEnrolled)
      return EnrollmentNavigator;

    if (!isAuthenticated)
      return AppUnlockNavigator;

    return MainNavigator;
  }

  render() {
    const { cachedIsEnrolledLoaded } = this.props;
    if (!cachedIsEnrolledLoaded)
      return null;

    const navigator = this.getNavigator();
    return <Root navigator={navigator} />;
  }
}

class Root extends PureComponent {
  render() {
    const { navigator } = this.props;
    const Navigator = createAppContainer(navigator);

    return (
      <StyleProvider style={getTheme()}>
        <NBRoot>
          <StatusBar backgroundColor={nbVariables.colors.logoBlue} />
          <Navigator />
        </NBRoot>
      </StyleProvider>
    );
  }
}
