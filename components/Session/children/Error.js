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

  renderErrorText() {
    const { session: {errorType, errorInfo} } = this.props;

    switch(errorType) {
      case 'transport':
      case 'protocolVersionNotSupported':
        return t('.' + errorType);
      case 'unknownSchemeManager':
        return t('.unknownSchemeManager', {manager: errorInfo});
      case 'keyshareBlocked':
        return t('.blocked', {seconds: errorInfo});
      default:
        return t('.unknown');
    }
  }

  render() {
    const { session: { status } } = this.props;
    if(status !== 'failure')
      return null;

    return (
      <Card>
        <CardItem>
          <Body>
            <Text>{ this.renderErrorText() }</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
