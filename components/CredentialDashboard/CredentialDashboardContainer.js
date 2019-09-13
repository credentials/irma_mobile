import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import store from 'store';

import CredentialDashboard, { headerTitle, MenuButton, LockButton } from './CredentialDashboard';
import fullCredentials from 'store/mappers/fullCredentials';

const mapStateToProps = (state) => {
  const {
    appUnlock: {
      isAuthenticated,
    },
    credentials: {
      loaded: credentialsLoaded,
      credentials,
    },
    enrollment: {
      loaded: enrollmentLoaded,
      enrolledSchemeManagerIds,
      unenrolledSchemeManagerIds,
    },
    irmaConfiguration,
    irmaConfiguration: {
      loaded: irmaConfigurationLoaded,
    },
    preferences: {
      loaded: preferencesLoaded,
    },
  } = state;

  const shouldEnroll = enrollmentLoaded && unenrolledSchemeManagerIds.length > 0;
  const shouldAuthenticate = !isAuthenticated && enrolledSchemeManagerIds.length > 0;
  const isLoaded = irmaConfigurationLoaded && preferencesLoaded && enrollmentLoaded && credentialsLoaded;

  return {
    credentials: fullCredentials(credentials, irmaConfiguration),
    shouldAuthenticate,
    isLoaded,
    shouldEnroll,
  };
};

@connect(mapStateToProps)
export default class CredentialDashboardContainer extends React.Component {

  static propTypes = {
    credentials: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    shouldAuthenticate: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    shouldEnroll: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = ({navigation}) => ({
    headerTitle,
    headerLeft: <MenuButton onPress={navigation.openDrawer} />,
    headerRight: (
      <LockButton
        onPress={() => {
          store.dispatch({
            type: 'AppUnlock.Lock',
          });
        }}
      />
    ),
  })

  state = {
    isEditable: false,
  }

  constructor(props) {
    super(props);
  }

  navigateToQRScanner = () => {
    const { navigation } = this.props;
    navigation.navigate('QRScanner');
  }

  navigateToEnrollment = () => {
    this.props.navigation.navigate('EnrollmentTeaser');
  }

  deleteCredential = (credential) => {
    this.props.dispatch({
      type: 'IrmaBridge.DeleteCredential',
      Hash: credential.Hash,
    });
  }

  makeEditable = () => {
    this.setState({isEditable: true});
  }

  makeUneditable = () => {
    this.setState({isEditable: false});
  }

  render() {
    const { credentials, shouldEnroll, isLoaded, shouldAuthenticate } = this.props;
    const { isEditable } = this.state;

    if (!isLoaded || shouldAuthenticate)
      return null;

    return (
      <CredentialDashboard
        credentials={credentials}
        deleteCredential={this.deleteCredential}
        shouldEnroll={shouldEnroll}
        isEditable={isEditable}
        makeEditable={this.makeEditable}
        makeUneditable={this.makeUneditable}
        navigateToEnrollment={this.navigateToEnrollment}
        navigateToQRScanner={this.navigateToQRScanner}
      />
    );
  }
}
