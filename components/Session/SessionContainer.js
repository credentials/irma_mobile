import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Platform, BackHandler, Linking } from 'react-native';

import fullCredentials from 'store/mappers/fullCredentials';
import fullDisclosuresCandidates from 'store/mappers/fullDisclosuresCandidates';
import fullMissingDisclosures from 'store/mappers/fullMissingDisclosures';

import IssuanceSession from './IssuanceSession';
import DisclosureSession from './DisclosureSession';
import SigningSession from './SigningSession';

import Error from './children/Error';
import Footer from './children/Footer';

import {
  Container,
  Text,
} from 'native-base';

import PaddedContent from 'lib/PaddedContent';

const paddingToBottom = 20;

const mapStateToProps = (state, props) => {
  const { sessionId } = props;

  const {
    appUnlock: {
      isAuthenticated,
    },
    enrollment: {
      enrolledSchemeManagerIds,
    },
    credentials: {
      credentials,
    },
    irmaConfiguration,
    sessions: {
      [sessionId]: bareSession,
    },
  } = state;

  const session = {
    ...bareSession,
    issuedCredentials: fullCredentials(bareSession.issuedCredentials, irmaConfiguration),
    disclosuresCandidates: fullDisclosuresCandidates(bareSession.disclosuresCandidates, irmaConfiguration, credentials),
    missingDisclosures: fullMissingDisclosures(bareSession.missingDisclosures, irmaConfiguration),
  };

  const shouldAuthenticate = !isAuthenticated && enrolledSchemeManagerIds.length > 0;

  return {
    irmaConfiguration,
    session,
    shouldAuthenticate,
  };
};

@connect(mapStateToProps)
export default class SessionContainer extends Component {

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    irmaConfiguration: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    shouldAuthenticate: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  state = {
    validationForced: false,
    pin: null,

    // Meant for disclosure in issuance and signing
    showDisclosureStep: false,

    // Whether or not the bottom of the main scrollview has been reached:
    // the user has scrolled all the way down.
    // Initially null. Set by onLayout after rendering, and positionChanged when scrolling
    bottomReached: null,
  }

  wrapperHeight = 0
  contentHeight = 0

  componentWillUnmount() {
    this.dismiss();
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam('title', ''),
  })

  setTopbarTitle(title) {
    const { navigation } = this.props;
    navigation.setParams({title});
  }

  navigateBack = () => {
    const { session: { exitAfter, request } } = this.props;

    console.warn('not implemented');

    if (exitAfter && request.returnURL)
      Linking.openURL(request.returnURL);
    else if (exitAfter && Platform.OS === 'android')
      BackHandler.exitApp();
  }

  navigateToEnrollment = () => {
    console.warn('not implemented');
  }

  makeDisclosureChoice = (disclosureIndex, choice) => {
    const { dispatch, session } = this.props;

    dispatch({
      type: 'Session.MakeDisclosureChoice',
      sessionId: session.id,
      disclosureIndex,
      choice,
    });
  }

  pinChange = (pin) => {
    this.setState({ pin });
  }

  dismiss = () => {
    const { dispatch, session } = this.props;

    dispatch({
      type: 'IrmaBridge.DismissSession',
      sessionId: session.id,
    });
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) =>
    layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

  positionChanged = ({ nativeEvent }) => {
    if (!this.state.bottomReached && this.isCloseToBottom(nativeEvent))
      this.setState({ bottomReached: true });
  }

  onLayout = (wrapper, { nativeEvent }) => {
    if (nativeEvent.layout.height < 100)
      return;
    if (wrapper)
      this.wrapperHeight = nativeEvent.layout.height;
    else
      this.contentHeight = nativeEvent.layout.height;
    if (this.wrapperHeight !== 0 && this.contentHeight !== 0)
      this.setState({ bottomReached: this.wrapperHeight - this.contentHeight > -25 });
  }

  // This nextStep function has been overloaded with too many responsibilies
  // It should be refactored along with the different session screens.
  // It returns false only when proceeding on an invalid pin
  nextStep = (proceed) => {
    const { pin, showDisclosureStep } = this.state;
    const {
      dispatch,
      session: { id: sessionId, irmaAction, status, disclosures, disclosureChoices },
    } = this.props;

    // In case we proceed on issuance and there are attributes
    // to disclose, continue to the disclosure step
    if (proceed && irmaAction === 'issuing' &&
      !showDisclosureStep && disclosures.length > 0) {

      this.setState({ showDisclosureStep: true });
      return true;
    }

    // In case we're on pin entry, give a pin response
    if (status === 'requestPin') {
      if (proceed && !pin) {
        this.setState({ validationForced: true });
        return false;
      }

      dispatch({
        type: 'IrmaBridge.RespondPin',
        sessionId,
        proceed,
        pin,
      });

      return true;
    }

    // In most other cases, continue to give a permission response
    dispatch({
      type: 'IrmaBridge.RespondPermission',
      sessionId,
      proceed,
      disclosureChoices,
    });

    return true;
  }

  render() {
    const { irmaConfiguration, session, shouldAuthenticate } = this.props;
    const { validationForced, showDisclosureStep, bottomReached } = this.state;

    if (shouldAuthenticate)
      return null;

    // Introduce a pseudo-status for when we're disclosing in issuance or signing
    let status = this.props.session.status;
    if (status === 'requestPermission' && showDisclosureStep)
      status = 'requestDisclosurePermission';

    const sessionProps = {
      irmaConfiguration,
      makeDisclosureChoice: this.makeDisclosureChoice,
      navigateBack: this.navigateBack,
      navigateToEnrollment: this.navigateToEnrollment,
      nextStep: this.nextStep,
      pinChange: this.pinChange,
      // sendMail: this.sendMail,
      setTopbarTitle: this.setTopbarTitle,
      positionChanged: this.positionChanged,
      onLayout: this.onLayout,
      validationForced,
      bottomReached,

      session: {
        ...session,
        status,
      },
    };

    let content;
    switch (session.irmaAction) {
      case 'issuing':
        content = <IssuanceSession {...sessionProps} />;
        break;
      case 'disclosing':
        content = <DisclosureSession {...sessionProps} />;
        break;
      case 'signing':
        content = <SigningSession {...sessionProps} />;
        break;

      // Display an empty container while awaiting irmago response
      case undefined:
        if (status === 'failure') {
          // But do display errors
          return (
            <Container>
              <PaddedContent>
                <Error session={sessionProps.session} />
              </PaddedContent>
              <Footer
                navigateBack={sessionProps.navigateBack}
                nextStep={sessionProps.nextStep}
                session={sessionProps.session}
              />
            </Container>
          );
        }
        return <Container />;

      default:
        return (
          <Container>
            <PaddedContent>
              <Text>Unrecognized IRMA action {session.irmaAction}.</Text>
            </PaddedContent>
          </Container>
        );
    }

    return content;
  }
}
