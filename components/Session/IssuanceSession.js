import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { namespacedTranslation, lang } from 'lib/i18n';
import Container from 'components/Container';

import DisclosuresChoices from './children/DisclosuresChoices';
import Error from './children/Error';
import Footer from './children/Footer';
import IssuedCredentials from './children/IssuedCredentials';
import MissingDisclosures from './children/MissingDisclosures';
import PinEntry from './children/PinEntry';
import StatusCard from './children/StatusCard';
import MoreIndicator from './children/MoreIndicator';

import PaddedContent from 'lib/PaddedContent';
import {
  Text,
  View,
} from 'native-base';

const t = namespacedTranslation('Session.IssuanceSession');

export default class IssuanceSession extends Component {

  static propTypes = {
    irmaConfiguration: PropTypes.object.isRequired,
    makeDisclosureChoice: PropTypes.func.isRequired,
    navigateBack: PropTypes.func.isRequired,
    navigateToEnrollment: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    pinChange: PropTypes.func.isRequired,
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
        issuedCredentials,
        serverName,
        status,
      },
    } = this.props;

    let heading;
    switch(status) {
      case 'success':
      case 'cancelled':
      case 'requestPermission':
        heading = <Text>{ t(`.${status}Heading`) }</Text>;
    }

    let explanation;
    switch(status) {
      case 'unsatisfiableRequest':
        explanation = (
          <Text>
            { t('.unsatisfiableRequestExplanation.before') }
            &nbsp;<Text style={{fontWeight: 'bold'}}>{ serverName[lang] }</Text>&nbsp;
            { t('.unsatisfiableRequestExplanation.after') }
          </Text>
        );

        break;

      case 'requestPermission': {
        const credentialCount = issuedCredentials.length;
        const attributeCount = issuedCredentials.reduce(
          (acc, cr) => acc + cr.Attributes.length, 0
        );

        const credentialAmount = t('common.credentials', { count: credentialCount });
        const attributeAmount = t('common.attributes', { count: attributeCount });

        explanation = (
          <Text>
            <Text style={{fontWeight: 'bold'}}>{ serverName[lang] }</Text>
            { t('.requestPermissionExplanation', {credentialAmount, attributeAmount}) }
          </Text>
        );

        break;
      }

      case 'requestDisclosurePermission': {
        explanation = (
          <View>
            <Text>
              { t('.requestDisclosurePermission', {serverName: serverName[lang]}) }
            </Text>
          </View>
        );

        break;
      }

      case 'success': {
        explanation = <Text>{ t(`.${status}Explanation`) }</Text>;
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
    if(status !== 'requestDisclosurePermission')
      return null;

    return (
      <DisclosuresChoices
        makeDisclosureChoice={makeDisclosureChoice}
        session={session}
      />
    );
  }

  render() {
    const {
      validationForced,
      navigateBack,
      nextStep,
      pinChange,
      session,
      positionChanged,
      onLayout,
      bottomReached,
      session: { status },
    } = this.props;

    const showMore = _.includes(['requestPermission', 'requestDisclosurePermission', 'unsatisfiableRequest'], status)
      && ( bottomReached === null ? false : !bottomReached );

    return (
      <Container>
        <PaddedContent
          testID="IssuanceSession"
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
            <IssuedCredentials session={session} />
            { this.renderDisclosures() }
          </View>
        </PaddedContent>
        <MoreIndicator show={showMore} />
        <Footer
          disabled={status === 'requestDisclosurePermission' ? !bottomReached : false}
          navigateBack={navigateBack}
          nextStep={nextStep}
          session={session}
        />
      </Container>
    );
  }
}
