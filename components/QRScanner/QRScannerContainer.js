import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NativeModules, PermissionsAndroid, Vibration, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Sentry } from 'react-native-sentry';
import { CameraKitCamera } from 'react-native-camera-kit';

import {
  Toast,
} from 'native-base';

import { startSession } from 'lib/navigation';

import QRScanner, { t } from './QRScanner';

import Session from '../Session';

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
    if (Platform.OS === 'ios')
      this.requestCameraPermissionIos();
    else
      this.requestCameraPermissionAndroid();
  }

  async requestCameraPermissionIos() {
    if (await CameraKitCamera.requestDeviceCameraAuthorization())
      this.setState({hasCameraPermission: true});
  }

  async requestCameraPermissionAndroid() {
    // Don't use requestDeviceCameraAuthorization, which is a mess in react-native-camera-kit for Android
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

    sessionId = startSession({sessionPointer});
    this.setState({hasStartedSession: true, sessionId});
  }

  render() {
    const { hasCameraPermission, hasStartedSession, sessionId } = this.state;

    if (hasStartedSession) {
      // Do an in place replacement with SessionContainer.
      //  this avoids problems with back handling.
      return (
        <Session {...this.props}
          sessionId = { sessionId }
        />
      );
    }

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
