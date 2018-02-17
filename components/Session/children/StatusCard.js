import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { namespacedTranslation } from 'lib/i18n';
import Card from 'lib/UnwrappedCard';

import StatusIcon from './StatusIcon';

import {
  Body,
  CardItem,
  Left,
  Text,
  Icon,
  Button,
} from 'native-base';

const t = namespacedTranslation('Session.StatusCard');

export default class StatusCard extends Component {

  static propTypes = {
    explanation: PropTypes.node,
    heading: PropTypes.node,
    session: PropTypes.object.isRequired,
    navigateToEnrollment: PropTypes.func.isRequired,
  }

  renderHeading() {
    const { session: { status } } = this.props;
    let { heading } = this.props;

    if(!heading)
      heading = <Text>{ t(`.heading.${status}`) }</Text>;

    return (
      <CardItem header>
        <Left>
          <StatusIcon status={status} />
          <Body>
            { heading }
          </Body>
        </Left>
      </CardItem>
    );
  }

  renderExplanation() {
    const { navigateToEnrollment, session: { status, duration } } = this.props;
    let { explanation } = this.props;

    if(!explanation) {
      switch(status) {
        case 'keyshareEnrollmentMissing': {
          explanation = [
            <Text key="text">{ t('.explanation.keyshareEnrollmentMissing') }</Text>,
            <Body key="button" style={{paddingTop: 30, paddingBottom: 20}}>
              <Button light iconLeft onPress={navigateToEnrollment} style={{borderRadius: 0, paddingHorizontal: 10}}>
                <Icon name="key" style={{color: 'white'}} />
                <Text style={{color: 'white'}}>{ t('.explanation.registerMyIrma') }</Text>
              </Button>
            </Body>
          ];

          break;
        }

        case 'keyshareBlocked': {
          explanation = <Text>{ t('.explanation.keyshareBlocked', {duration}) }</Text>;
          break;
        }

        default: {
          const explanationText = t(`.explanation.${status}`, {defaultValue: ''});
          if(!explanationText)
            return null;

          explanation = <Text>{ explanationText }</Text>;
        }
      }
    }

    return (
      <CardItem header>
        <Body>
          { explanation }
        </Body>
      </CardItem>
    );
  }

  render() {
    return (
      <Card>
        { this.renderHeading() }
        { this.renderExplanation() }
      </Card>
    );
  }
}
