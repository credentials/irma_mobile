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
    enrollment: {
      unenrolledSchemeManagerIds,
    }
  } = state;

  return {
    credentials: fullCredentials(credentials, irmaConfiguration),
    unenrolledSchemeManagerIds,
  };
};

@connect(mapStateToProps)
export default class CredentialDashboardContainer extends React.Component {

  static propTypes = {
    credentials: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    unenrolledSchemeManagerIds: PropTypes.array.isRequired,
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

  navigateToEnrollment() {
    const schemeManagerId = this.props.unenrolledSchemeManagerIds[0];

    this.props.dispatch({
      type: 'Enrollment.Start',
      schemeManagerId,
    });

    this.props.navigation.navigate(
      'Enrollment',
      {schemeManagerId}
    );
  }

  deleteCredential(credential) {
    this.props.dispatch({
      type: 'IrmaBridge.DeleteCredential',
      Hash: credential.Hash
    });
  }

  render() {
    const { credentials, unenrolledSchemeManagerIds  } = this.props;
    const enrolled = unenrolledSchemeManagerIds.length == 0;

    return (
      <CredentialDashboard
        credentials={credentials}
        deleteCredential={::this.deleteCredential}
        enrolled={enrolled}
        navigateToDetail={::this.navigateToDetail}
        navigateToEnrollment={::this.navigateToEnrollment}
        navigateToQRScanner={::this.navigateToQRScanner}
      />
    );
  }
}
