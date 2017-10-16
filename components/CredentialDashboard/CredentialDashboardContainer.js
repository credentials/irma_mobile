import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    this.props.navigation.navigate('QRScanner');
  }

  navigateToDetail(credential) {
    this.props.navigation.navigate('CredentialDetail', {credential});
  }

  render() {
    const { credentials } = this.props;

    return (
      <CredentialDashboard
        credentials={credentials}
        navigateToQRScanner={::this.navigateToQRScanner}
        navigateToDetail={::this.navigateToDetail}
      />
    );
  }
}
