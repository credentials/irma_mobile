import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NativeModules, PermissionsAndroid, Vibration } from 'react-native';
import { connect } from 'react-redux';
import { Sentry } from 'react-native-sentry';

import {
  Toast,
} from 'native-base';

import { startSessionAndNavigate } from 'lib/navigation';

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
    hasStartedSession: false,
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

  newTestSession = (type) => {
    const URLParse = require('url-parse');

    const { hostname } = new URLParse(NativeModules.SourceCode.scriptURL);
    window.fetch(`http://${hostname}:7000?type=${type}`).then( (res) => {
      res.json().then( (sessionPointer) => {
        startSessionAndNavigate({sessionPointer});
      });
    });
  }

  readQRCode = (event) => {
    const { hasStartedSession } = this.state;
    if (hasStartedSession)
      return;

    Vibration.vibrate();

    let sessionPointer;
    try {
      sessionPointer = JSON.parse(event.nativeEvent.codeStringValue);
    } catch (err) {
      // pass
    }

    if (typeof sessionPointer !== 'object' || typeof sessionPointer.irmaqr !== 'string') {
      Toast.show({
        text: t('.invalidQR'),
        position: 'bottom',
        duration: 2000,
      });

      return;
    }

    this.setState({hasStartedSession: true});
    startSessionAndNavigate({sessionPointer});
  }

  render() {
    const { hasCameraPermission, hasStartedSession } = this.state;

    return (
      <QRScanner
        hasCameraPermission={hasCameraPermission}
        hasStartedSession={hasStartedSession}
        newTestSession={this.newTestSession}
        readQRCode={this.readQRCode}
      />
    );
  }
}
