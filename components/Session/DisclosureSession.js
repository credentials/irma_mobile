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
import SessionStyles from './children/Styles';

import {
  Text,
  View,
} from 'native-base';

const t = namespacedTranslation('Session.DisclosureSession');

export default class DisclosureSession extends Component {

  static propTypes = {
    disclosures: PropTypes.array,
    disclosuresCandidates: PropTypes.array,
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

  renderHeader() {
    const {
      session: {
        status,
        serverName,
      },
    } = this.props;

    switch (status) {
      case 'success':
      case 'cancelled':
        return <Text style={SessionStyles.header}>{ t(`.${status}Explanation`) }</Text>;
      case 'requestPermission':
        return (
          <View>
            <Text style={SessionStyles.header}>
              <Text style={{...SessionStyles.header, fontWeight: 'bold'}}>{ serverName[lang] }</Text>&nbsp;
              { t('.requestPermissionExplanation') }
            </Text>
          </View>
        );
      default:
        return this.renderStatusCard();
    }
  }

  renderStatusCard() {
    const {
      navigateToEnrollment,
      session,
      session: {
        status,
        serverName,
      },
    } = this.props;

    let explanation;
    switch (status) {
      case 'unsatisfiableRequest':
        explanation = (
          <Text>
            { t('.unsatisfiableRequestExplanation.before') }
            &nbsp;<Text style={{fontWeight: 'bold'}}>{ serverName[lang] }</Text>&nbsp;
            { t('.unsatisfiableRequestExplanation.after') }
          </Text>
        );

        break;
    }

    return (
      <StatusCard
        explanation={explanation}
        navigateToEnrollment={navigateToEnrollment}
        session={session} />
    );
  }

  renderDisclosures() {
    const {
      makeDisclosureChoice,
      session,
      session: { status },
    } = this.props;

    if (!_.includes(['requestPermission', 'success'], status))
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
          testID="DisclosureSession"
          enableAutomaticScroll={session.status !== 'requestPin'}
          onScroll={positionChanged}
          onLayout={e => onLayout(true, e)}
        >
          <View onLayout={e => onLayout(false, e)}>
            { this.renderHeader() }
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
