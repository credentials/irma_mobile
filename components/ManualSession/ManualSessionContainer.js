import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dimensions, Keyboard, Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import Mailer from 'react-native-mail';

//import DisclosureSession from './DisclosureSession'; // TODO: implement disclosure as well
import SigningSession from '../Session/SigningSession';

import fullCredentials from 'store/mappers/fullCredentials';
import fullCandidates from 'store/mappers/fullCandidates';

import {
  Container,
  Text,
  View
} from 'native-base';

import PaddedContent from 'lib/PaddedContent';

const mapStateToProps = (state) => {
  const {
    credentials: {
      credentials,
    },
    irmaConfiguration,
    manualSession,
  } = state;

  const session = {
    ...manualSession,
    issuedCredentials: fullCredentials(manualSession.issuedCredentials, irmaConfiguration),
    disclosureCandidates: fullCandidates(manualSession.disclosureCandidates, irmaConfiguration, credentials)
  };

  return {
    irmaConfiguration,
    session
  };
};

@connect(mapStateToProps)
export default class ManualSessionContainer extends Component {

  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    irmaConfiguration: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
  }

  state = {
    forceValidation: false,
    pin: null,
    visibleHeight: Dimensions.get('window').height,

    // Meant for disclosure in issuance and signing
    showDisclosureStep: false
  }

  componentWillMount () {
    // On Android the buttons in the footer move up automatically when the keyboard is shown.
    if (Platform.OS === 'ios') {
      const windowHeight = Dimensions.get('window').height;

      Keyboard.addListener('keyboardWillShow', e =>
        this.setState({visibleHeight: windowHeight - e.endCoordinates.height})
      );

      Keyboard.addListener('keyboardWillHide', () =>
        this.setState({visibleHeight: windowHeight})
      );
    }
  }

  navigateBack() {
    const { navigation } = this.props;
    navigation.goBack();
  }

  saveResult(result) {
    const dir = RNFetchBlob.fs.dirs['SDCardDir'] + '/irma_signature';
    return RNFetchBlob.fs.writeFile(dir, result, 'utf8')
      .then(() => dir);
  }

  sendMail() {
    const { session: { result }} = this.props;
    this.saveResult(result)
      .then(path => {
        Mailer.mail({ // TODO: Get this info from somewhere?
          subject: 'IRMA signature response',
          body: 'Attached you\'ll find the IRMA signature for your IRMA signature request.',
          isHTML: false,
          attachment: {
            path: path,
            type: 'text/plain',
          },
        }, () => {
          // if (error == 'not_available') {
          //   TODO: show info that no mail apps are installed
          // }
        });
      });
  }

  // TODO!
  navigateToEnrollment() { }

  makeDisclosureChoice(disclosureIndex, Type, Hash) {
    const { dispatch }  = this.props;

    dispatch({
      type: 'ManualSession.MakeDisclosureChoice',
      disclosureIndex,
      choice: {Type, Hash},
    });
  }

  pinChange(pin) {
    this.setState({pin});
  }

  // TODO: This nextStep function has been overloaded with too many responsibilies
  // It should be refactored along with the different session screens.
  // It returns false only when proceeding on an invalid pin
  nextStep(proceed) {
    const { pin } = this.state;
    const {
      dispatch,
      session: { status, disclosureChoices },
    } = this.props;

    // In case we're on pin entry, give a pin response
    if(status === 'requestPin') {
      if(proceed && !pin) {
        this.setState({forceValidation: true});
        return false;
      }

      dispatch({
        type: 'IrmaBridge.ManualRespondPin',
        proceed,
        pin,
      });

      return true;
    }

    // In most other cases, continue to give a permission response
    dispatch({
      type: 'IrmaBridge.ManualRespondPermission',
      proceed,
      disclosureChoices,
    });

    return true;
  }

  render() {
    const { irmaConfiguration, session } = this.props;
    const { forceValidation, showDisclosureStep, visibleHeight } = this.state;

    // Introduce a pseudo-status for when we're disclosing in issuance or signing
    let status = this.props.session.status;
    if(status === 'requestPermission' && showDisclosureStep) {
      status = 'requestDisclosurePermission';
    }

    const sessionProps = {
      forceValidation,
      irmaConfiguration,
      makeDisclosureChoice: ::this.makeDisclosureChoice,
      navigateBack: ::this.navigateBack,
      navigateToEnrollment: ::this.navigateToEnrollment,
      nextStep: ::this.nextStep,
      pinChange: ::this.pinChange,
      sendMail: ::this.sendMail,

      session: {
        ...session,
        status
      },
    };

    let content;
    switch(session.irmaAction) {
      //case 'disclosing':
      //  content = <DisclosureSession {...sessionProps} />;
      //  break;
      case 'signing':
        content = <SigningSession {...sessionProps} />;
        break;

      // Display an empty container while awaiting irmago response
      case undefined:
        return <Container />;

      default:
        return (
          <Container>
            <PaddedContent>
              <Text>Unrecognized IRMA action { session.irmaAction }.</Text>
            </PaddedContent>
          </Container>
        );
    }

    return (
      <View style={{height: visibleHeight}}>
        { content }
      </View>
    );
  }
}
