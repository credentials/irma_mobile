import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { namespacedTranslation, lang } from 'lib/i18n';
import PaddedContent from 'lib/PaddedContent';
import Container from 'components/Container';

import DisclosuresChoices from './children/DisclosuresChoices';
import Error from './children/Error';
import Footer from './children/Footer';
import MissingDisclosures from './children/MissingDisclosures';
import PinEntry from './children/PinEntry';
import StatusCard from './children/StatusCard';
import MoreIndicator from './children/MoreIndicator';

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
    positionChanged: PropTypes.func.isRequired,
    onLayout: PropTypes.func.isRequired,
    bottomReached: PropTypes.bool,
  }

  static defaultProps = {
    bottomReached: null,
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
              <Text style={{fontWeight: 'bold'}}>{ serverName[lang] }</Text>&nbsp;
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
      positionChanged,
      onLayout,
      bottomReached,
      session: { status },
    } = this.props;

    const showMore = _.includes(['requestPermission', 'unsatisfiableRequest'], status)
      && ( bottomReached === null ? false : !bottomReached );

    return (
      <Container>
        <PaddedContent
          testID="SigningSession"
          enableAutomaticScroll={session.status !== 'requestPin'}
          onScroll={positionChanged}
          onLayout={e => onLayout(true, e)}
         >
          <View onLayout={e => onLayout(false, e)}>
            { this.renderStatusCard() }
            <Error session={session} />
            <PinEntry
              session={session}
              validationForced={validationForced}
              pinChange={pinChange}
            />
            <MissingDisclosures session={session} />
            { this.renderDisclosures() }
          </View>
        </PaddedContent>
        <MoreIndicator show={showMore} />
        <Footer
          disabled={!bottomReached}
          navigateBack={navigateBack}
          nextStep={nextStep}
          session={session}
        />
      </Container>
    );
  }
}
