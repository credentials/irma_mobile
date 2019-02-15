import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback, Keyboard, PixelRatio } from 'react-native';
import ImageSequence from 'lib/ImageSequence';
import nbVariables from 'lib/native-base-theme/variables/platform';

import {
  Text,
  View,
  Spinner,
} from 'native-base';

import Container from 'components/Container';
import PinEntry from './children/PinEntry';
import vaultFrames from './children/vaultFrames';
import { STATUS_AUTHENTICATED, STATUS_AUTHENTICATING } from 'store/reducers/appUnlock';

import { namespacedTranslation } from 'lib/i18n';

export const t = namespacedTranslation('AppUnlock');
const isAnimationEnabled = vaultFrames.length > 1;

export default class AppUnlock extends Component {

  static propTypes = {
    authenticate: PropTypes.func.isRequired,
    blockedDuration: PropTypes.number.isRequired,
    dismissModal: PropTypes.func.isRequired,
    error: PropTypes.object,
    hadFailure: PropTypes.bool.isRequired,
    remainingAttempts: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }

  static defaultProps = {
    error: null,
  };

  state = {
    animatedOpacity: new Animated.Value(1),
    animatedBackgroundColor: new Animated.Value(0),
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props;
    if (prevProps.status !== STATUS_AUTHENTICATED && status === STATUS_AUTHENTICATED)
      this.startEntryAnimation();
  }

  startEntryAnimation = () => {
    const { dismissModal } = this.props;
    const { animatedOpacity, animatedBackgroundColor } = this.state;
    const durationSubtraction = isAnimationEnabled ? 0 : 1200;

    Keyboard.dismiss();

    setTimeout(() => {
      dismissModal();
    }, 2200 - durationSubtraction);

    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 400,
        delay: 1200 - durationSubtraction,
      }),
      Animated.timing(animatedBackgroundColor, {
        toValue: 1,
        duration: 400,
        delay: 2000 - durationSubtraction,
      }),
    ]).start();
  }

  renderSpinner() {
    const { status } = this.props;
    if (status !== STATUS_AUTHENTICATING)
      return null;

    return (
      <>
        <View>
          <Spinner
            style={styles.spinnerStyle}
            color="#00B1E6"
          />
        </View>
        <Text style={styles.statusText}>
          {t('.checkingPin')}
        </Text>
      </>
    );
  }

  renderFailure() {
    const { hadFailure, remainingAttempts, blockedDuration } = this.props;
    if (!hadFailure)
      return null;

    return (
      <Text style={styles.errorText}>
        { blockedDuration === 0 ?
            t('Session.PinEntry.incorrectMessage', {attempts: t('Session.PinEntry.attempts', {count: remainingAttempts})}) :
            t('Session.PinEntry.blocked', {duration: t('Session.PinEntry.duration', {count: blockedDuration})})
        }
      </Text>
    );
  }

  renderError() {
    const { error } = this.props;
    if (!error)
      return null;

    return (
      <Text style={styles.errorText}>
        { error.ErrorType && error.ErrorType === 'transport' ?
            t('Session.PinEntry.error.transport') :
            t('Session.PinEntry.error.unknown')
        }
      </Text>
    );
  }

  renderImageSequence() {
    const { status } = this.props;
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

    return (
      <TouchableWithoutFeedback>
        <ImageSequence
          images={vaultFrames}
          framesPerSecond={24}
          started={status === STATUS_AUTHENTICATED}
          loop={false}
          style={{width: screenWidth, height: screenWidth/500*888}}
        />
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { authenticate, remainingAttempts } = this.props;
    const { animatedOpacity, animatedBackgroundColor } = this.state;

    const backgroundColorStyle = {
      backgroundColor: animatedBackgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(248, 248, 248, 1)', 'rgba(248, 248, 248, 0)'],
      }),
    };

    const opacityStyle = {opacity: animatedOpacity};

    return (
      <Animated.View style={[{flex: 1}, backgroundColorStyle, !isAnimationEnabled ? opacityStyle : null]}>
        <View style={styles.vaultUnderlayView}>
          { this.renderImageSequence() }
        </View>
        <Container transparent>
          <Animated.View style={[{flex: 1, flexDirection: 'column'}, isAnimationEnabled ? opacityStyle : null]}>
            <PinEntry
              clearKey={remainingAttempts}
              minLength={5}
              onPinSubmit={authenticate}
              recommendedLength={7}
              style={{marginTop: Dimensions.get('window').width / 500 * 250 - 20}}
            />
            { this.renderSpinner() }
            { this.renderFailure() }
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
    top: -20,
  },
  spinnerStyle: {
    marginTop: -5,
  },
  statusText: {
    marginTop: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 16*Dimensions.get('window').width / 450,
  },
  errorText: {
    marginTop: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
    color: nbVariables.colors.iosRed,
    fontSize: 16 * Dimensions.get('window').width / 450,
  },
});
