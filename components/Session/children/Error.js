import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { namespacedTranslation } from 'lib/i18n';
import Card from 'lib/UnwrappedCard';

import {
  Body,
  CardItem,
  Text,
} from 'native-base';

const t = namespacedTranslation('Session.Error');

export default class Error extends Component {

  static propTypes = {
    session: PropTypes.object.isRequired,
  }

  renderMessage() {
    const { session: { errorType, errorInfo } } = this.props;

    return t(`.${errorType}`, {
      defaultValue: t('.unknown'),
      errorInfo
    });
  }

  render() {
    const { session: { status } } = this.props;
    if(status !== 'failure')
      return null;

    return (
      <Card>
        <CardItem>
          <Body>
            <Text>{ this.renderMessage() }</Text>
            <Text>{ '\n' }{ t('.persists') }</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
