import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Platform } from 'react-native';

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
  }

  read(scanEvent) {
    const { newSession } = this.props;

    let qr;
    try {
      qr = JSON.parse(scanEvent.data);
    } catch(err) {
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

  samplePress(type) {
    const { newSession } = this.props;
    const host = Platform.OS === 'ios' ? '127.0.0.1' : '10.0.2.2';

    window.fetch(`http://${host}:7000?type=${type}`).then( (res) => {
      res.json().then( (qr) => {
        newSession(qr);
      });
    });
  }

  renderBottomContent() {
    if(!__DEV__)
      return null;

    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}} testID="QRScanner">
        <Button primary onPress={() => this.samplePress('issuance')} testID="testIssuance">
          <Text>Issuance</Text>
        </Button>
        <Button primary onPress={() => this.samplePress('disclosure')} testID="testDisclosure">
          <Text>Disclosure</Text>
        </Button>
        <Button primary onPress={() => this.samplePress('signing')} testID="testSigning">
          <Text>Signing</Text>
        </Button>
      </View>
    );
  }

  render() {
    return (
      <QRCodeScanner
        title="Scan"
        ref={(node) => this.scanner = node}
        bottomContent={this.renderBottomContent()}
        onRead={::this.read}
        reactivate={true}
        reactivateTimeout={2000}
        checkAndroid6Permissions={true}
      />
    );
  }
}
