import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Alert } from 'react-native';
import { connect } from 'react-redux';

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
import { namespacedTranslation, getLanguage } from 'lib/i18n';

const lang = getLanguage();
const t = namespacedTranslation('CredentialCard');

const mapStateToProps = (state) => {
  const {
    currentTime: {
      reftime,
    }
  } = state;

  return {
    reftime,
  };
};

@connect(mapStateToProps)
export default class CredentialCard extends Component {

  static propTypes = {
    credential: PropTypes.object.isRequired,
    collapsedInitially: PropTypes.bool,
    collapsable: PropTypes.bool,
    deleteCredential: PropTypes.func,
    reftime: PropTypes.object.isRequired,
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
    const { credential, reftime } = this.props;

    const hasExpired = moment.unix(credential.Expires).isBefore(reftime);
    const expiredNameStyle = hasExpired ? {color: '#a7a7a7'} : {};

    return (
      <CardItem key={attribute.Type.ID}>
        <Text style={expiredNameStyle}>{ attribute.Type.Name[lang] }</Text>
        <Right style={{flex: 1}}>
          <Text note>{ attribute.Value[lang] }</Text>
        </Right>
      </CardItem>
    );
  }

  render() {
    const { credential, collapsable, reftime } = this.props;
    const { collapsed } = this.state;

    const hasExpired = moment.unix(credential.Expires).isBefore(reftime);
    const expiredNameStyle = hasExpired ? {color: '#a7a7a7'} : {};
    const expiredDateStyle = hasExpired ? {color: '#d72020'} : {};

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
                  <Text style={expiredNameStyle}>{ credential.Type.Name[lang] }</Text>
                  <Text note style={expiredDateStyle}>{ hasExpired ? t('.expired') : t('.expires') } { moment.unix(credential.Expires).format('D MMM YYYY') }</Text>
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
