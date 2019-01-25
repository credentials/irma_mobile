import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import QRCodeScanner from 'react-native-qrcode-scanner';

import { namespacedTranslation } from 'lib/i18n';

import {
  Button,
  Text,
  View,
  Toast
} from 'native-base';

export const t = namespacedTranslation('QRScanner');

export default class QRScanner extends Component {
  static propTypes = {
    newSession: PropTypes.func.isRequired,
    newTestSession: PropTypes.func.isRequired,
  }

  read(scanEvent) {
    const { newSession } = this.props;

    let qr;
    try {
      qr = JSON.parse(scanEvent.data);
    } catch (err) {
      // pass
    }

    if(typeof qr !== 'object' || typeof qr.irmaqr !== 'string') {
      Toast.show({
        text: t('.invalidQR'),
        position: 'bottom',
        duration: 2000,
      });

      return;
    }

    newSession(qr);
  }

  renderBottomContent() {
    const { newTestSession } = this.props;

    if (!__DEV__)
      return null;

    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}} testID="QRScanner">
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
    );
  }

  render() {
    return this.renderBottomContent();

    // TODO: Temporarily disabled for upgrade
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
