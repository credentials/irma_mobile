import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CredentialLogo from 'components/CredentialLogo';

import {
  Body,
  Card,
  CardItem,
  Left,
  Text,
  View,
} from 'native-base';

const lang = 'en';

export default class MissingDisclosures extends Component {

  static propTypes = {
    session: PropTypes.object.isRequired,
  }

  renderAttribute(attribute) {
    const requiredValue = attribute.Value ?
      `: "${attribute.Value}"` : null;

    return (
      <CardItem key={attribute.Type}>
        <Left>
          <CredentialLogo credentialType={attribute.CredentialType} />
          <Body>
            <Text>{ attribute.Name[lang] }{ requiredValue }</Text>
            <Text note>From credential: { attribute.CredentialType.Name[lang] }</Text>
          </Body>
        </Left>
      </CardItem>
    );
  }

  renderMissingDisclosure({label, attributes}, index) {
    return (
      <Card key={`disclosure-${index}`}>
        <CardItem header>
          <Text style={{fontWeight: 'bold'}}>{ label }</Text>
        </CardItem>
        { attributes.map(::this.renderAttribute) }
      </Card>
    );
  }

  render() {
    const { session } = this.props;

    if(session.status !== 'unsatisfiableRequest')
      return null;

    return (
      <View>
        { session.missingDisclosures.map(::this.renderMissingDisclosure) }
      </View>
    );
  }
}
