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
  }

  state = {
    hidden: false
  }

  componentWillReceiveProps(nextProps) {
    const { session } = this.props;
    const { session: nextSession } = nextProps;

    // Reset the hidden state when rendering the footer for a new status,
    // or for another amount of PIN attempts.
    if(session.status !== nextSession.status ||
       session.remainingAttempts !== nextSession.remainingAttempts)
      this.setState({hidden: false});
  }

  press(proceed) {
    const { nextStep } = this.props;
    const success = nextStep(proceed);

    if(success)
      this.setState({hidden: true});
  }

  renderYesNo() {
    const {
      session: {
        irmaAction,
        status,
        disclosures,
      }
    } = this.props;
    const { hidden } = this.state;

    if(!_.includes(['requestPermission', 'requestDisclosurePermission', 'requestPin'], status))
      return null;

    let yesLabel = t('.accept');
    let noLabel = t('.decline');

    if(status === 'requestPermission' && irmaAction === 'issuing' && disclosures.length > 0)
      yesLabel = t('.next');

    if(status === 'requestPin') {
      // TODO: We probably shouldn't be dismissing the keyboard on every render,
      // and the responsibilty of hiding lies closer to the PinEntry component
      if (hidden) {
        Keyboard.dismiss();
        return null;
      }

      yesLabel = t('.submit');
      noLabel = t('.cancel');
    }

    return [
      <Button key="no" danger iconLeft onPress={() => this.press(false)}>
        <Icon name="close-circle" />
        <Text>{ noLabel }</Text>
      </Button>,
      <Button key="yes" success iconLeft onPress={() => this.press(true)} style={{marginLeft: 20}}>
        <Icon name="checkmark-circle" />
        <Text>{ yesLabel }</Text>
      </Button>
    ];
  }

  renderDismiss() {
    const { session: { status }, navigateBack } = this.props;
    const { hidden } = this.state;

    if(!_.includes(['success', 'failure', 'cancelled', 'unsatisfiableRequest', 'keyshareEnrollmentMissing', 'keyshareBlocked', 'keyshareEnrollmentIncomplete'], status))
      return null;

    if(hidden)
      return null;

    return (
      <Button onPress={navigateBack} >
        <Text>{ t('.dismiss') }</Text>
      </Button>
    );
  }

  render() {
    return (
      <NBFooter style={{height: 60, paddingTop: 7}}>
        { this.renderYesNo() }
        { this.renderDismiss() }
      </NBFooter>
    );
  }
}
