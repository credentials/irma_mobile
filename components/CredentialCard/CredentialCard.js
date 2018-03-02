import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Alert } from 'react-native';

import {
  Body,
  CardItem,
  Icon,
  Left,
  Right,
  Text,
  View,
} from 'native-base';

import Card from 'lib/UnwrappedCard';
import CredentialLogo from 'components/CredentialLogo';
import { namespacedTranslation } from 'lib/i18n';

const lang = 'en'; // TODO: Move to I18n
const t = namespacedTranslation('CredentialCard');

export default class CredentialCard extends Component {

  static propTypes = {
    credential: PropTypes.object.isRequired,
    collapsedInitially: PropTypes.bool,
    collapsable: PropTypes.bool,
    deleteCredential: PropTypes.func,
  }

  static defaultProps = {
    collapsedInitially: true,
    collapsable: false,
  }

  state = {
    collapsed: !!this.props.collapsedInitially
  }

  press() {
    const { collapsed } = this.state;
    this.setState({collapsed: !collapsed});
  }

  longPress() {
    const { deleteCredential, credential } = this.props;

    // Credentials can only be deleted from the dashboard
    if(!deleteCredential)
      return;

    // Show a cancelable alert
    const credentialName = credential.Type.Name[lang];

    Alert.alert(
      t('.deleteCredential.title', {credentialName}),
      t('.deleteCredential.message', {credentialName}),
      [
        {text: t('.deleteCredential.cancel'), style: 'cancel'},
        {text: t('.deleteCredential.ok'), onPress: () => deleteCredential(credential)},
      ],
      { cancelable: true }
    );
  }

  renderAttribute(attribute) {
    if (attribute[lang] === undefined) {
        // Do not show empty attributes.
        return null;
    }
    return (
      <CardItem key={attribute.Type.ID}>
        <Text>{ attribute.Type.Name[lang] }</Text>
        <Right style={{flex: 1}}>
          <Text note>{ attribute[lang] }</Text>
        </Right>
      </CardItem>
    );
  }

  render() {
    const { credential, collapsable } = this.props;
    const { collapsed } = this.state;

    return (
      <Card>
        <TouchableWithoutFeedback
          onPress={::this.press}
          onLongPress={::this.longPress}
        >
          <View>
            <CardItem>
              <Left>
                <CredentialLogo credentialType={credential.Type} />
                <Body>
                  <Text>{ credential.Type.Name[lang] }</Text>
                  <Text note>Expires on { moment.unix(credential.Expires).format('D MMM YYYY') }</Text>
                </Body>
                { !collapsable ? null :
                    <Icon name={collapsed ? 'ios-arrow-forward' : 'ios-arrow-down'} />
                }
              </Left>
            </CardItem>
            { collapsable && collapsed ? null :
                credential.Attributes.map(::this.renderAttribute)
            }
          </View>
        </TouchableWithoutFeedback>
      </Card>
    );
  }
}
