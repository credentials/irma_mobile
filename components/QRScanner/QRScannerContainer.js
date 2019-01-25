import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NativeModules, PermissionsAndroid, Vibration } from 'react-native';
import { connect } from 'react-redux';
import { Sentry } from 'react-native-sentry';

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

  state = {
    hasCameraPermission: false,
    canStartSession: true,
  }

  componentDidMount() {
    this.requestCameraPermission();
  }

  async requestCameraPermission() {
    try {
      const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (result === PermissionsAndroid.RESULTS.GRANTED)
        this.setState({hasCameraPermission: true});
    } catch (e) {
      Sentry.captureException(e);
    }
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
    const { canStartSession } = this.state;
    if (!canStartSession)
      return;

    Vibration.vibrate();

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

    this.setState({canStartSession: false});
    this.newSession(qr);
  }

  render() {
    const { hasCameraPermission } = this.state;

    return (
      <QRScanner
        hasCameraPermission={hasCameraPermission}
        newTestSession={this.newTestSession}
        readQRCode={this.readQRCode}
      />
    );
  }
}
