import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import CredentialDashboard from './CredentialDashboard';
import fullCredentials from 'store/mappers/fullCredentials';
import Header from './children/Header';

const mapStateToProps = (state) => {
  const {
    credentials: {
      credentials,
    },
    irmaConfiguration,
  } = state;

  return {
    credentials: fullCredentials(credentials, irmaConfiguration),
  };
};

@connect(mapStateToProps)
export default class CredentialDashboardContainer extends React.Component {

  static propTypes = {
    credentials: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    header: props => <Header {...props } />
  }

  navigateToQRScanner() {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'CredentialDashboard' }),
          NavigationActions.navigate({ routeName: 'QRScanner' }),
        ],
      }),
    );
  }

  navigateToDetail(credential) {
    this.props.navigation.navigate('CredentialDetail', {credential});
  }

  deleteCredential(credential) {
    this.props.dispatch({
      type: 'IrmaBridge.DeleteCredential',
      Hash: credential.Hash
    });
  }

  render() {
    const { credentials } = this.props;

    return (
      <CredentialDashboard
        credentials={credentials}
        navigateToQRScanner={::this.navigateToQRScanner}
        navigateToDetail={::this.navigateToDetail}
        deleteCredential={::this.deleteCredential}
      />
    );
  }
}
