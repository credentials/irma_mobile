import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { CameraKitCameraScreen } from 'react-native-camera-kit';

import { namespacedTranslation } from 'lib/i18n';
import nbVariables from 'lib/native-base-theme/variables/platform';
import Container from 'components/Container';

import {
  Button,
  Footer,
  Text,
  View,
} from 'native-base';

export const t = namespacedTranslation('QRScanner');

export default class QRScanner extends Component {
  static propTypes = {
    hasCameraPermission: PropTypes.bool.isRequired,
    newTestSession: PropTypes.func.isRequired,
    readQRCode: PropTypes.func.isRequired,
  }

  renderTestButtonsFooter() {
    const { newTestSession } = this.props;

    if (!__DEV__)
      return null;

    return (
      <Footer>
        <View style={styles.testButtonsView}>
          <Button primary onPress={() => newTestSession('issuance')} testID="testIssuance">
            <Text>Issuance</Text>
          </Button>
          <Button primary onPress={() => newTestSession('disclosure')} testID="testDisclosure">
            <Text>Disclosure</Text>
          </Button>
          <Button primary onPress={() => newTestSession('signing')} testID="testSigning">
            <Text>Signing</Text>
          </Button>
        </View>
      </Footer>
    );
  }

  renderCameraScreen() {
    const { hasCameraPermission, readQRCode } = this.props;
    if (!hasCameraPermission)
      return null;

    return (
      <CameraKitCameraScreen
        showFrame={true}
        scanBarcode={true}
        laserColor="white"
        surfaceColor="black"
        frameColor={nbVariables.colors.logoBlue}
        onReadCode={readQRCode}
        hideControls={true}
        offsetForScannerFrame={10}
        heightForScannerFrame={200}
        colorForScannerFrame="blue"
      />
    );
  }


  render() {
    return (
      <Container>
        <View style={{flex: 1}}>
          { this.renderCameraScreen() }
        </View>
        { this.renderTestButtonsFooter() }
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  testButtonsView: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
