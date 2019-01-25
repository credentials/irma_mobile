import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { CameraKitCamera } from 'react-native-camera-kit';

import {
  Toast,
} from 'native-base';

import { Navigation, SESSION_SCREEN, CREDENTIAL_DASHBOARD_ROOT_ID } from 'lib/navigation';

import QRScanner, { t } from './QRScanner';

@connect()
export default class QRScannerContainer extends Component {

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  static options = {
    topBar: {
      title: {
        text: t('.title'),
      },
    },
  }

  componentDidMount() {
    // CameraKitCamera.requestDeviceCameraAuthorization();
  }

  newSession(qr) {
    const { dispatch } = this.props;

    const sessionId = global.getAutoIncrementId();
    dispatch({
      type: 'IrmaBridge.NewSession',
      sessionId,
      qr,
      exitAfter: false,
    });

    Navigation.push(CREDENTIAL_DASHBOARD_ROOT_ID, {
      component: {
        name: SESSION_SCREEN,
        passProps: {
          sessionId,
        },
      },
    });
  }

  newTestSession = (type) => {
    const URLParse = require('url-parse');

    const { hostname } = new URLParse(NativeModules.SourceCode.scriptURL);
    window.fetch(`http://${hostname}:7000?type=${type}`).then( (res) => {
      res.json().then( (qr) => {
        this.newSession(qr);
      });
    });
  }

  readQRCode = (event) => {
    // TODO: readQRCode is called many times (at least on Android)
    // So we need to make it pass only once in the lifetime (?) of the QRScanner component

    let qr;
    try {
      qr = JSON.parse(event.nativeEvent.codeStringValue);
    } catch (err) {
      // pass
    }

    if (typeof qr !== 'object' || typeof qr.irmaqr !== 'string') {
      Toast.show({
        text: t('.invalidQR'),
        position: 'bottom',
        duration: 2000,
      });

      return;
    }

    this.newSession(qr);
  }

  render() {
    return (
      <QRScanner
        newTestSession={this.newTestSession}
        readQRCode={this.readQRCode}
      />
    );
  }
}
