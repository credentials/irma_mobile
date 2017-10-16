import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { namespacedTranslation } from 'lib/i18n';
import PaddedContent from 'lib/PaddedContent';

import DisclosureChoices from './children/DisclosureChoices';
import Error from './children/Error';
import Header from './children/Header';
import Footer from './children/Footer';
import PinEntry from './children/PinEntry';
import StatusCard from './children/StatusCard';

import {
  Container,
  Text,
  View,
} from 'native-base';

const t = namespacedTranslation('Session.DisclosureSession');

export default class DisclosureSession extends Component {

  static propTypes = {
    disclosureCandidates: PropTypes.array,
    forceValidation: PropTypes.bool.isRequired,
    irmaConfiguration: PropTypes.object.isRequired,
    makeDisclosureChoice: PropTypes.func.isRequired,
    navigateBack: PropTypes.func.isRequired,
    navigateToEnrollment: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    pinChange: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired,
    toDisclose: PropTypes.array,
  }

  renderStatusCard() {
    const {
      navigateToEnrollment,
      session,
      session: {
        disclosureCandidates,
        status,
        toDisclose,
        verifierName,
      }
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
      case 'requestPermission': {
        const attributeAmount = t('common.attributes', { count: toDisclose.length });
        const maxCandidates = _.max(disclosureCandidates, cs => cs.length);

        explanation = (
          <View>
            <Text>
              <Text style={{fontWeight: 'bold'}}>{ verifierName }</Text>&nbsp;
              { t('.requestPermissionExplanation', {attributeAmount}) }
            </Text>
            { maxCandidates === 1 ? null :
                <Text>{'\n'}{ t('.disclosureChoice') }</Text>
            }
          </View>
        );

        break;
      }

      case 'requestDisclosurePermission':
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
    const {
      makeDisclosureChoice,
      session,
      session: { status }
    } = this.props;

    if(!_.includes(['requestPermission', 'success'], status))
      return null;

    return (
      <DisclosureChoices
        hideUnchosen={status === 'success'}
        makeDisclosureChoice={makeDisclosureChoice}
        session={session}
      />
    );
  }

  render() {
    const {
      forceValidation,
      navigateBack,
      nextStep,
      pinChange,
      session,
    } = this.props;

    return (
      <Container>
        <Header title={t('.headerTitle')} navigateBack={navigateBack} />
        <PaddedContent>
          { this.renderStatusCard() }
          <Error session={session} />
          <PinEntry
            session={session}
            forceValidation={forceValidation}
            pinChange={pinChange}
          />
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
