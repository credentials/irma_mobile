import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NativeModules, PermissionsAndroid, Vibration, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Sentry } from 'react-native-sentry';
import { CameraKitCamera } from 'react-native-camera-kit';

import {
  Toast,
} from 'native-base';

import { startSession, startSessionAndNavigate } from 'lib/navigation';

import Session from 'components/Session';
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
    displaySession: false,
    hasCameraPermission: false,
    sessionId: null,
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
        // startSessionAndNavigate({sessionPointer}); <-- TODO: Put this back instead of what is below

        startSession({sessionPointer});
        this.setState({displaySession: true});
      });
    });
  }

  readQRCode = (event) => {
    const { sessionId } = this.state;
    if (sessionId)
      return;

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

    // Show a green scanning reticle for a second while the session is started in the background
    this.setState({
      sessionId: startSession({sessionPointer}),
    });

    Vibration.vibrate();

    setTimeout(() => this.setState({displaySession: true}), 1000);
  }

  render() {
    const { hasCameraPermission, sessionId, displaySession } = this.state;

    // Do an in place replacement with SessionContainer, which avoids problems with back handling
    if (sessionId && displaySession) {
      return (
        <Session
          {...this.props}
          sessionId={sessionId}
        />
      );
    }

    return (
      <QRScanner
        hasCameraPermission={hasCameraPermission}
        hasStartedSession={Boolean(sessionId)}
        newTestSession={this.newTestSession}
        readQRCode={this.readQRCode}
      />
    );
  }
}
