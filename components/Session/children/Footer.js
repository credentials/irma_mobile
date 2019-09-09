import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { namespacedTranslation } from 'lib/i18n';

import { Keyboard } from 'react-native';

import {
  Footer as NBFooter,
  Button,
  Text,
  Icon,
} from 'native-base';

const t = namespacedTranslation('Session.Footer');

export default class Footer extends Component {

  static propTypes = {
    session: PropTypes.object.isRequired,
    nextStep: PropTypes.func.isRequired,
    navigateBack: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    // sendMail: PropTypes.func,
  }

  static defaultProps = {
    disabled: false,
  }

  state = {
    hidden: false,
  }

  componentWillReceiveProps(nextProps) {
    const { session } = this.props;
    const { session: nextSession } = nextProps;

    // Reset the hidden state when rendering the footer for a new status,
    // or for another amount of PIN attempts.
    if (session.status !== nextSession.status ||
       session.remainingAttempts !== nextSession.remainingAttempts)
      this.setState({hidden: false});
  }

  press(proceed) {
    const { nextStep } = this.props;
    const success = nextStep(proceed);

    if (success)
      this.setState({hidden: true});
  }

  renderYesNo() {
    const {
      session: {
        irmaAction,
        status,
        disclosures,
      },
      disabled,
    } = this.props;
    const { hidden } = this.state;

    if (hidden || !_.includes(['requestPermission', 'requestDisclosurePermission', 'requestPin'], status))
      return null;

    // We don't know yet whether the buttons should be enabled; do nothing
    if (disabled === null)
      return null;

    let yesLabel = t('.accept');
    let noLabel = t('.decline');

    if (status === 'requestPermission' && irmaAction === 'issuing' && disclosures && disclosures.length > 0)
      yesLabel = t('.next');

    if (status === 'requestPin') {
      // We probably shouldn't be dismissing the keyboard on every render,
      // and the responsibilty of hiding lies closer to the PinEntry component
      if (hidden) {
        Keyboard.dismiss();
        return null;
      }

      yesLabel = t('.submit');
      noLabel = t('.cancel');
    }

    return [
      <Button
        key="no"
        danger
        iconLeft
        disabled={disabled}
        onPress={() => this.press(false)}
        testID="noButton"
      >
        <Icon name="close-circle" />
        <Text>{ noLabel }</Text>
      </Button>,
      <Button
        key="yes"
        success
        iconLeft
        disabled={disabled}
        onPress={() => this.press(true)}
        style={{marginLeft: 20}}
        testID="yesButton"
      >
        <Icon name="checkmark-circle" />
        <Text>{ yesLabel }</Text>
      </Button>,
    ];
  }

  renderDismiss() {
    const { session: { status, result, id }, navigateBack } = this.props;
    const { hidden } = this.state;

    if (hidden || !_.includes(['success', 'failure', 'cancelled', 'unsatisfiableRequest', 'keyshareEnrollmentMissing', 'keyshareEnrollmentDeleted', 'keyshareBlocked', 'keyshareEnrollmentIncomplete'], status))
      return null;

    // Don't render anything for manual session result
    if (id === 0 && status === 'success' && result !== undefined)
      return null;


    return (
      <Button style={{minWidth: 75, justifyContent: 'center'}} onPress={navigateBack} testID="dismissButton">
        <Text>{ t('.dismiss') }</Text>
      </Button>
    );
  }

  // renderSendEmail() {
  //   const { session: { status, result, id }, navigateBack, sendMail } = this.props;

  //   if (!sendMail) // sendMail func prop doesn't exist in Issuance / Disclosure sessions
  //     return null;

  //   if (id === 0 && status === 'success' && result !== undefined) {
  //     return [
  //       <Button iconLeft key="dismiss" danger onPress={navigateBack}>
  //         <Icon name="close-circle" />
  //         <Text>{ t('.dismiss') }</Text>
  //       </Button>,
  //       <Button iconLeft key="sendMail" success onPress={() => {sendMail(); navigateBack();}} style={{marginLeft: 20}}>
  //         <Icon name="send" />
  //         <Text>{ t('.send') }</Text>
  //       </Button>
  //     ];
  //   }
  //   return null;
  // }

  render() {
    return (
      <NBFooter style={{height: 60, paddingTop: 7}}>
        { this.renderYesNo() }
        { this.renderDismiss() }
        {/* { this.renderSendEmail() } */}
      </NBFooter>
    );
  }
}
