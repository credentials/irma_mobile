import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { namespacedTranslation } from 'lib/i18n';
import Card from 'lib/UnwrappedCard';

import {
  Form,
  CardItem,
  Body,
  Text,
} from 'native-base';

import FormInput from 'lib/form/FormInput';

const t = namespacedTranslation('Session.PinEntry');

export default class PinEntry extends Component {

  static propTypes = {
    pinChange: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired,
    validationForced: PropTypes.bool.isRequired,
  }

  renderIncorrectMessage() {
    const { session: { remainingAttempts } } = this.props;
    if (remainingAttempts === -1)
      return null;

    const attempts = t('.attempts', {count: remainingAttempts});

    return (
      <CardItem>
        <Body>
          <Text style={{color: 'red'}}>
            { t('.incorrectMessage', {attempts}) }
          </Text>
        </Body>
      </CardItem>
    );
  }

  renderForm() {
    const {
      pinChange,
      session: {
        remainingAttempts,
      },
      validationForced,
    } = this.props;

    return (
      <Form style={{paddingRight: 20}}>
        <FormInput
          inputType="pin"
          key={`attempt-${remainingAttempts}`}
          label={t('.label')}
          onChange={pinChange}
          validationForced={validationForced}
          autoFocus={true}
          showInvalidMessage={true}
        />
      </Form>
    );
  }

  render() {
    const { session: { status } } = this.props;
    if (status !== 'requestPin')
      return null;

    return (
      <Card>
        { this.renderIncorrectMessage() }
        { this.renderForm() }
      </Card>
    );
  }
}
