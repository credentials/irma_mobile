import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { namespacedTranslation } from 'lib/i18n';
import PaddedContent from 'lib/PaddedContent';
import Container from 'components/Container';

import DisclosuresChoices from './children/DisclosuresChoices';
import Error from './children/Error';
import Footer from './children/Footer';
import MissingDisclosures from './children/MissingDisclosures';
import PinEntry from './children/PinEntry';
import StatusCard from './children/StatusCard';

import {
  Text,
  View,
} from 'native-base';

const t = namespacedTranslation('Session.SigningSession');

export default class SigningSession extends Component {

  static propTypes = {
    irmaConfiguration: PropTypes.object.isRequired,
    makeDisclosureChoice: PropTypes.func.isRequired,
    message: PropTypes.string,
    navigateBack: PropTypes.func.isRequired,
    navigateToEnrollment: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    pinChange: PropTypes.func.isRequired,
    // sendMail: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired,
    setTopbarTitle: PropTypes.func.isRequired,
    validationForced: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { setTopbarTitle } = this.props;
    setTopbarTitle(t('.headerTitle'));
  }

  renderStatusCard() {
    const {
      navigateToEnrollment,
      session,
      session: {
        message,
        serverName,
        status,
        request,
      }
    } = this.props;

    let heading;
    switch(status) {
      case 'success':
      case 'cancelled':
      case 'requestPermission':
        heading = <Text>{ t(`.${status}Heading`) }</Text>;
    }

    const messageText = (
      <Text style={{fontWeight: 'bold', paddingLeft: 10}}>
        {'\n'}{ message }
      </Text>
    );

    let explanation;
    switch(status) {
      case 'unsatisfiableRequest':
        explanation = (
          <Text>
            { t('.unsatisfiableRequestExplanation') }
          </Text>
        );

        break;

      case 'requestPermission': {
        explanation = (
          <View>
            <Text>
              { t('.requestPermission.beforeExplanation') }
            </Text>
            { messageText }
            <Text>{'\n'}{ t('.requestPermission.afterExplanation') }</Text>
          </View>
        );

        break;
      }

      case 'success': {
        explanation = (
          <View>
            <Text>{ t(`.${status}.beforeExplanation`) }</Text>
            { messageText }
            <Text>{'\n'}{ t(`.${status}.afterExplanation`) }</Text>
          </View>
        );
      }
    }

    return (
      <StatusCard
        explanation={explanation}
        heading={heading}
        navigateToEnrollment={navigateToEnrollment}
        session={session} />
    );
  }

  renderDisclosures() {
    const { makeDisclosureChoice, session, session: { status } } = this.props;
    // if(status !== 'requestPermission')
    if(!_.includes(['requestPermission', 'success'], status))
      return null;

    return (
      <DisclosuresChoices
        hideUnchosen={status === 'success'}
        makeDisclosureChoice={makeDisclosureChoice}
        session={session}
      />
    );
  }

  render() {
    const {
      validationForced,
      navigateBack,
      // sendMail,
      nextStep,
      pinChange,
      session,
    } = this.props;

    return (
      <Container>
        <PaddedContent testID="SigningSession" enableAutomaticScroll={session.status !== 'requestPin'}>
          { this.renderStatusCard() }
          <Error session={session} />
          <PinEntry
            session={session}
            validationForced={validationForced}
            pinChange={pinChange}
          />
          <MissingDisclosures session={session} />
          { this.renderDisclosures() }
        </PaddedContent>
        <Footer
          navigateBack={navigateBack}
          nextStep={nextStep}
          session={session}
        />
      </Container>
    );
  }
}
