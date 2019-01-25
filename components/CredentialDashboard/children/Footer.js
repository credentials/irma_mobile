import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { t } from '../CredentialDashboard';

import {
  Button,
  Footer as NBFooter,
  Icon,
  Text,
} from 'native-base';

export default class Footer extends Component {

  static propsTypes = {
    enrolled: PropTypes.func.isRequried,
    navigateToQRScanner: PropTypes.func.isRequried,
    navigateToCredentialTypeDashboard: PropTypes.func.isRequired,
    navigateToVaultDashboard: PropTypes.func.isRequired,
  }

  // 'Old' button
  renderQRScannerButton() {
    const { enrolled, navigateToQRScanner } = this.props;

    return (
      <NBFooter style={{height: 60, paddingTop: 7}}>
        <Button testID="scanQRButton" primary={enrolled} light={!enrolled} onPress={navigateToQRScanner}>
          <Icon ios="ios-qr-scanner" android="md-qr-scanner" />
          <Text style={{paddingLeft: 10}}>{ t('.scanQRCode') }</Text>
        </Button>
      </NBFooter>
    );
  }

  renderButtonTriplet() {
    const { navigateToQRScanner, navigateToCredentialTypeDashboard, navigateToVaultDashboard } = this.props;

    return (
      <NBFooter style={{height: 60, paddingTop: 7}}>
        <Button
          transparent
          large
          onPress={navigateToVaultDashboard}
        >
          <Icon
            name="ios-speedometer"
            style={{fontSize: 32, marginTop: -10, color: '#888888'}}
          />
        </Button>
        <Button
          transparent
          large
          onPress={navigateToQRScanner}
          style={{marginHorizontal: 20}}
        >
          <Icon
            name="ios-camera"
            style={{fontSize: 50, marginTop: -20, color: '#888888'}}
          />
        </Button>
        <Button
          transparent
          large
          onPress={navigateToCredentialTypeDashboard}
        >
          <Icon
            name="ios-add-circle-outline"
            style={{fontSize: 32, marginTop: -10, color: '#888888'}}
          />
        </Button>
      </NBFooter>
    );
  }

  render() {
    // return this.renderQRScannerButton();
    return this.renderButtonTriplet();
  }
}