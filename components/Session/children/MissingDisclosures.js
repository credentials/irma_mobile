import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLanguage, namespacedTranslation } from 'lib/i18n';

import CredentialLogo from 'components/CredentialLogo';

import {
  Body,
  Card,
  CardItem,
  Left,
  Text,
  View,
  Button,
} from 'native-base';

const lang = getLanguage();
const t = namespacedTranslation('Session.MissingDisclosures');

export default class MissingDisclosures extends Component {

  static propTypes = {
    session: PropTypes.object.isRequired,
    goGetCredential: PropTypes.func.isRequired,
  }

  renderAttribute(attribute) {
    const requiredValue = attribute.Value ?
      `: "${attribute.Value}"` : null;

    const { goGetCredential } = this.props;

    var getButton = null;
    if (attribute.CredentialType.IssueURL)
      getButton = <Button onPress={ () => { goGetCredential(attribute.CredentialType.IssueURL); } }><Text>{ t('.get') }</Text></Button>;

    return (
      <CardItem key={attribute.Type}>
        <Left>
          <CredentialLogo credentialType={attribute.CredentialType} />
          <Body>
            <Text>{ attribute.Name[lang] }{ requiredValue }</Text>
            <Text note>From credential: { attribute.CredentialType.Name[lang] }</Text>
          </Body>
          { getButton }
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
