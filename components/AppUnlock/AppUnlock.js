import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import ImageSequence from 'lib/ImageSequence';
import nbVariables from 'lib/native-base-theme/variables/platform';

import {
  Text,
  View,
  Spinner,
} from 'native-base';

import irmaLogoImage from 'assets/irmaLogo.png';
import Container from 'components/Container';
import PinEntry from './children/PinEntry';
import imageSequence from './imageSequence';

import { namespacedTranslation } from 'lib/i18n';

export const t = namespacedTranslation('AppUnlock');

export default class AppUnlock extends Component {

  static propTypes = {
    authenticate: PropTypes.func.isRequired,
    dismissModal: PropTypes.func.isRequired,
    hadFailure: PropTypes.bool.isRequired,
    remainingAttempts: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }

  state = {
    animatedOpacity: new Animated.Value(1),
    animatedBackgroundColor: new Animated.Value(0),
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props;
    if (prevProps.status !== 'authenticated' && status === 'authenticated')
      this.startEntryAnimation();
  }

  startEntryAnimation = () => {
    const { dismissModal } = this.props;
    const { animatedOpacity, animatedBackgroundColor } = this.state;

    setTimeout(() => {
      dismissModal();
    }, 2400);

    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 400,
        delay: 1200,
      }),
      Animated.timing(animatedBackgroundColor, {
        toValue: 1,
        duration: 400,
        delay: 2000,
      }),
    ]).start();
  }

  renderSpinner() {
    const { status } = this.props;
    if (status !== 'authenticating')
      return null;

    return (
      <View>
        <Spinner
          style={styles.spinnerStyle}
          color="#00B1E6"
        />
      </View>
    );
  }

  renderError() {
    const { hadFailure, remainingAttempts } = this.props;
    if (!hadFailure)
      return null;

    return (
      <Text style={styles.errorText}>
        { t('Session.PinEntry.incorrectMessage', {attempts: t('Session.PinEntry.attempts', {count: remainingAttempts})}) }
      </Text>
    );
  }

  renderImageSequence() {
    const { status } = this.props;

    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const imageAspectRatio = 667 / 375;
    const correspondingHeight = screenWidth * imageAspectRatio;
    const imageHeight = correspondingHeight > screenHeight ? screenHeight : correspondingHeight;

    return (
      <TouchableWithoutFeedback>
        <ImageSequence
          images={imageSequence}
          framesPerSecond={24}
          started={status === 'authenticated'}
          loop={false}
          style={{width: screenWidth, height: imageHeight}}
        />
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { authenticate, remainingAttempts, status } = this.props;
    const { animatedOpacity, animatedBackgroundColor } = this.state;

    const backgroundColor = animatedBackgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(248, 248, 248, 1)', 'rgba(248, 248, 248, 0)'],
    });

    return (
      <Animated.View style={{flex: 1, backgroundColor}}>
        <View style={styles.vaultUnderlayView}>
          { this.renderImageSequence() }
        </View>
        <Container>
          <Animated.View style={{flex: 1, flexDirection: 'column', opacity: animatedOpacity}}>
            <View style={{alignItems: 'center'}}>
              <TouchableWithoutFeedback onPress={this.startEntryAnimation}>
                <Image source={irmaLogoImage} style={styles.imageStyle} />
              </TouchableWithoutFeedback>
            </View>
            <PinEntry
              dismissKeyboard={status === 'authenticated'}
              key={remainingAttempts}
              maxLength={7}
              minLength={5}
              onPinSubmit={authenticate}
              style={styles.pinEntryStyle}
            />
            { this.renderSpinner() }
            { this.renderError() }
          </Animated.View>
        </Container>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  vaultUnderlayView: {
    position: 'absolute',
    top: nbVariables.platform === 'ios' ? -120 : -140,
  },

  imageStyle: {
    marginTop: 20,
    height: 80,
    position: 'relative',
    resizeMode: 'contain',
  },
  spinnerStyle: {
    marginTop: nbVariables.platform === 'ios' ? -5 : 0,
  },
  pinEntryStyle: {
    marginTop: nbVariables.platform === 'ios' ? 175 : 155,
  },
  errorText: {
    marginTop: nbVariables.platform === 'ios' ? 20 : 0,
    paddingHorizontal: 10,
    textAlign: 'center',
    color: 'red',
  },
});