import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NativeModules, PermissionsAndroid, Vibration, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Sentry } from 'react-native-sentry';
import { CameraKitCamera } from 'react-native-camera-kit';
import _ from 'lodash';

import {
  Toast,
} from 'native-base';

import { newSession } from 'store/reducers/sessions';

import QRScanner, { headerTitle, invalidQR } from './QRScanner';

@connect()
export default class QRScannerContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    headerTitle,
  }

  state = {
    hasCameraPermission: false,
    sessionStarted: false,
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
        const sessionMsg = newSession({request: sessionPointer});
        this.props.dispatch(sessionMsg);
        this.props.navigation.replace('Session', {sessionId: sessionMsg.sessionId});
      });
    });
  }

  readQRCode = (event) => {
    const { sessionStarted } = this.state;
    if (sessionStarted)
      return;

    let sessionPointer;
    try {
      sessionPointer = JSON.parse(event.nativeEvent.codeStringValue);
    } catch (err) {
      // pass
    }

    if (!_.isPlainObject(sessionPointer) || typeof sessionPointer.irmaqr !== 'string') {
      Toast.show({
        text: invalidQR,
        position: 'bottom',
        duration: 2000,
      });

      return;
    }

    // Show a green scanning reticle for a second while the session is started in the background
    const sessionMsg = newSession({request: sessionPointer});
    this.setState({
      sessionStarted: true,
    });
    this.props.dispatch(sessionMsg);

    Vibration.vibrate();

    setTimeout(() => this.props.navigation.replace('Session', {sessionId: sessionMsg.sessionId}), 1000);
  }

  render() {
    const { hasCameraPermission, sessionStarted } = this.state;

    return (
      <QRScanner
        hasCameraPermission={hasCameraPermission}
        hasStartedSession={sessionStarted}
        newTestSession={this.newTestSession}
        readQRCode={this.readQRCode}
      />
    );
  }
}
