import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLanguage } from 'lib/i18n';

import {
  Body,
  Card,
  CardItem,
  Left,
  Text,
  View,
} from 'native-base';

import { CardItemThumb } from 'components/CredentialCard/helpers';

const lang = getLanguage();

export default class MissingDisclosures extends Component {

  static propTypes = {
    session: PropTypes.object.isRequired,
  }

  renderAttribute = (attribute, index) => {
    const requiredValue = attribute.Value ?
      `: "${attribute.Value}"` : null;

    return (
      <CardItem key={index}>
        <Left>
          <CardItemThumb source={{uri: attribute.CredentialType.logoUri}} />
          <Body>
            <Text>{ attribute.AttributeType.Name[lang] }{ requiredValue }</Text>
            <Text note>{ attribute.CredentialType.Name[lang] }</Text>
          </Body>
        </Left>
      </CardItem>
    );
  }

  renderMissingDisclosure = ({label, attributes}, index) => {
    return (
      <Card key={index}>
        <CardItem header>
          <Text style={{fontWeight: 'bold'}}>{ label }</Text>
        </CardItem>
        { attributes.map(this.renderAttribute) }
      </Card>
    );
  }

  render() {
    const { session } = this.props;

    if (session.status !== 'unsatisfiableRequest')
      return null;

    return (
      <View>
        { session.missingDisclosures.map(this.renderMissingDisclosure) }
      </View>
    );
  }
}
