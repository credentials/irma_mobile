import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { resetNavigation } from 'lib/navigation';

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

  const enrolled = unenrolledSchemeManagerIds.length == 0;

  return {
    credentials: fullCredentials(credentials, irmaConfiguration),
    enrolled,
  };
};

@connect(mapStateToProps)
export default class CredentialDashboardContainer extends React.Component {

  static propTypes = {
    credentials: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    enrolled: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    header: props => <Header {...props } />
  }

  navigateToQRScanner() {
    resetNavigation(this.props.navigation.dispatch, 'CredentialDashboard', 'QRScanner');
  }

  navigateToEnrollment() {
    resetNavigation(this.props.navigation.dispatch, 'EnrollmentTeaser');
  }

  deleteCredential(credential) {
    this.props.dispatch({
      type: 'IrmaBridge.DeleteCredential',
      Hash: credential.Hash
    });
  }

  render() {
    const { credentials, enrolled } = this.props;

    return (
      <CredentialDashboard
        credentials={credentials}
        deleteCredential={::this.deleteCredential}
        enrolled={enrolled}
        navigateToEnrollment={::this.navigateToEnrollment}
        navigateToQRScanner={::this.navigateToQRScanner}
      />
    );
  }
}
