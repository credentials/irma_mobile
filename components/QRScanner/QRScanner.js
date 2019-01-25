import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { CameraKitCameraScreen } from 'react-native-camera-kit';

import { namespacedTranslation } from 'lib/i18n';
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


  render() {
    // TODO:
    // - We must pop out the QR scanner screen when a session has been started, to return to QR scanner
    //   A Github issue suggests that this is to be done with a modal
    // - Do we need to support features like flash, front camera?
    // - Can we blur the rest of the camera view a bit so we can overlay instruction text?
    // - While starting a session (connection + HTTP calls), we could display a success indicator
    //   (that should immediately go away when the session is ready to be displayed)

    const { readQRCode } = this.props;

    return (
      <Container>
        <CameraKitCameraScreen
          actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
          // onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
          showFrame={true}
          scanBarcode={true}
          laserColor="blue"
          surfaceColor="black"
          frameColor="yellow"
          onReadCode={readQRCode}
          hideControls={true}
          offsetForScannerFrame={10}
          heightForScannerFrame={300}
          colorForScannerFrame="blue"
        />
        { this.renderTestButtonsFooter() }
      </Container>
    );

    // return (
    //   <QRCodeScanner
    //     title={t('.scan')}
    //     ref={(node) => this.scanner = node}
    //     bottomContent={this.renderBottomContent()}
    //     onRead={::this.read}
    //     reactivate={true}
    //     reactivateTimeout={2000}
    //     checkAndroid6Permissions={true}
    //   />
    // );
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
