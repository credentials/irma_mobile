import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Alert } from 'react-native';
import { connect } from 'react-redux';

import {
  CardItem,
  Right,
  Text,
} from 'native-base';

import CredentialLogo from 'components/CredentialLogo';

import SelfCollapsableCard from 'lib/SelfCollapsableCard';
import { namespacedTranslation, getLanguage } from 'lib/i18n';

const lang = getLanguage();
const t = namespacedTranslation('CredentialCard');

const mapStateToProps = (state) => {
  const {
    currentTime: {
      currentTime,
    }
  } = state;

  return {
    currentTime,
  };
};

@connect(mapStateToProps)
export default class CredentialCard extends Component {

  static propTypes = {
    credential: PropTypes.object.isRequired,
    lockedOpen: PropTypes.bool,
    deleteCredential: PropTypes.func,
    currentTime: PropTypes.object.isRequired,
  }

  longPress = () => {
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

  renderAttribute = (attribute) => {
    const { credential, currentTime } = this.props;

    const hasExpired = moment.unix(credential.Expires).isBefore(currentTime);
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
    const { credential, lockedOpen, currentTime } = this.props;

    const headerImage = <CredentialLogo credentialType={credential.Type} />;
    
    const hasExpired = moment.unix(credential.Expires).isBefore(currentTime);
    const expiredNameStyle = hasExpired ? {color: '#a7a7a7'} : {};
    const expiredDateStyle = hasExpired ? {color: '#d72020'} : {};

    const headerText = [
      <Text key="name" style={expiredNameStyle}>{ credential.Type.Name[lang] }</Text>,
      <Text key="expiry" note style={expiredDateStyle}>{ hasExpired ? t('.expired') : t('.expires') } { moment.unix(credential.Expires).format('D MMM YYYY') }</Text>
    ];

    const content = credential.Attributes.map(this.renderAttribute);

    return (
      <SelfCollapsableCard
        content={content}
        headerImage={headerImage}
        headerText={headerText}
        lockedOpen={lockedOpen}
        onLongPress={this.longPress}
      />
    );
  }
}
