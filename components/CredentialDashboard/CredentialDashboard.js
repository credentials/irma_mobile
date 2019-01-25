import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';

import { namespacedTranslation, lang } from 'lib/i18n';
import PaddedContent from 'lib/PaddedContent';

import { CredentialHeader } from 'components/CredentialCard/helpers';

import Footer from './children/Footer';

import {
  Button,
  Container,
  H3,
  Icon,
  Text,
  View,
  Card,
  Left,
  Thumbnail,
  CardItem,
  Body,
  Content,
} from 'native-base';

export const t = namespacedTranslation('CredentialDashboard');

export default class CredentialDashboard extends Component {

  static propTypes = {
    credentials: PropTypes.array.isRequired,
    enrolled: PropTypes.bool.isRequired,
    navigateToCredentialDetail: PropTypes.func.isRequired,
    navigateToCredentialTypeDashboard: PropTypes.func.isRequired,
    navigateToEnrollment: PropTypes.func.isRequired,
    navigateToQRScanner: PropTypes.func.isRequired,
    navigateToVaultDashboard: PropTypes.func.isRequired,
  }

  renderCredentialsAlt() {
    const { credentials, navigateToCredentialDetail } = this.props;

    const cardStyle = {
      borderBottomWidth: 1,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      borderColor: 'rgba(135, 135, 135, 0.3)',
    };

    const cardItemStyle = {
      paddingLeft: 0,
      paddingBottom: 0,
      paddingRight: 0,
      paddingTop: 0,
    };

    return credentials.map( (credential, index) => {
      const { CredentialType } = credential;

      return (
        <TouchableWithoutFeedback
          key={credential.Hash}
          onPress={() => navigateToCredentialDetail(credential)}
        >
          <Card style={cardStyle}>
            <CardItem style={cardItemStyle}>
              <View style={{width: 80, height: 65, paddingTop: 12}}>
                <Thumbnail style={{alignSelf: 'center', width: 45, height: 45}} resizeMode="contain" square source={{uri: CredentialType.logoUri}} />
              </View>
              <Body style={{backgroundColor: index % 2 === 0 ? '#DFF4FB' : '#D2F0F8', paddingLeft: 16, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontFamily: 'RobotoCondensed-Regular', fontSize: 20}}>{ CredentialType.Name[lang] }</Text>
              </Body>
            </CardItem>
          </Card>
        </TouchableWithoutFeedback>
      );
    });
  }

  renderCredentials() {
    const { credentials, navigateToCredentialDetail } = this.props;

    return credentials.map( credential =>
      <TouchableWithoutFeedback
        key={credential.Hash}
        onPress={() => navigateToCredentialDetail(credential)}
      >
        <Card><CredentialHeader credential={credential} /></Card>
      </TouchableWithoutFeedback>
    );
  }

  renderEnrollButton() {
    const { navigateToEnrollment } = this.props;

    const buttonStyle = {alignSelf: 'center', borderRadius: 0, paddingHorizontal: 10};

    return (
      <View style={{paddingTop: 60}}>
        <Button iconLeft primary onPress={navigateToEnrollment} style={buttonStyle}>
          <Icon name="key" style={{color: 'white'}} />
          <Text style={{color: 'white'}}>{ t('.unenrolled.button') }</Text>
        </Button>
      </View>
    );
  }

  renderNoCredentialsHint() {
    const { credentials, enrolled } = this.props;
    if (credentials.length !== 0)
      return null;

    const status = enrolled ? 'noAttributes' : 'unenrolled';

    return (
      <View key="title" style={{alignItems: 'center'}}>
        <H3 style={{paddingTop: 30, color: '#888888'}}>
          { t(`.${status}.header`) }
        </H3>
        <View style={{paddingHorizontal: 20, alignItems: 'center'}}>
          <Text style={{paddingTop: 30, color: '#888888'}}>
            { t(`.${status}.text`) }
          </Text>
          { enrolled ? null : this.renderEnrollButton() }
        </View>
      </View>
    );
  }

  render() {
    const {
      enrolled,
      navigateToQRScanner,
      navigateToCredentialTypeDashboard,
      navigateToVaultDashboard,
    } = this.props;

    return (
      <Container testID="CredentialDashboard">
        <Content>
          {/* { this.renderNoCredentialsHint() } */}
          { this.renderCredentialsAlt() }
        </Content>
        <Footer
          enrolled={enrolled}
          navigateToQRScanner={navigateToQRScanner}
          navigateToCredentialTypeDashboard={navigateToCredentialTypeDashboard}
          navigateToVaultDashboard={navigateToVaultDashboard}
        />
      </Container>
    );
  }
}
