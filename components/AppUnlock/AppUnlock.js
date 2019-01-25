import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet } from 'react-native';

import {
  Container,
  Text,
  View,
  Spinner,
} from 'native-base';

import irmaLogo from 'assets/irmaLogo.png';
import PinEntry from './children/PinEntry';

import { namespacedTranslation } from 'lib/i18n';
import PaddedContent from 'lib/PaddedContent';

export const t = namespacedTranslation('AppUnlock');

export default class LogDashboard extends Component {

  static propTypes = {
    pinSubmit: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    hadFailure: PropTypes.bool.isRequired,
  }

  renderSpinner() {
    const { status } = this.props;
    if (status !== 'unlocking')
      return null;

    return (
      <Spinner
        style={styles.spinnerStyle}
        color="#00B1E6"
      />
    );
  }

  renderError() {
    const { hadFailure } = this.props;
    if (!hadFailure)
      return null;

    return (
      <Text style={{paddingHorizontal: 10, textAlign: 'center', color: 'red'}}>
        { t('Session.PinEntry.incorrectMessage', {attempts: t('Session.PinEntry.attempts', {count: 3})}) }
      </Text>
    );
  }

  render() {
    const { pinSubmit } = this.props;

    return (
      <Container>
        <PaddedContent keyboardShouldPersistTaps="always">
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image source={irmaLogo} style={styles.imageStyle} />
          </View>
          <PinEntry
            minLength={5}
            maxLength={7}
            onPinSubmit={pinSubmit}
          />
          { this.renderSpinner() }
          { this.renderError() }
        </PaddedContent>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    marginTop: 15,
    marginBottom: 30,
    height: 120,
    position: 'relative',
    resizeMode: 'contain',
  },
  spinnerStyle: {
    marginVertical: 0,
    marginTop: 0,
  },
});
