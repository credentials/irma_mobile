import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';

import { namespacedTranslation } from 'lib/i18n';
import irmaLogo from 'assets/irmaLogo.png';

import {
  Body,
  Button,
  Header as NBHeader,
  Icon,
  Left,
  Right,
  Thumbnail,
  Title,
} from 'native-base';

const t = namespacedTranslation('CredentialDashboard.Header');

export default class Header extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  render() {
    const { navigation } = this.props;

    const iosHeaderStyle = {flex: 3};

    return (
      <NBHeader>
        <Left>
          <Button
            onPress={() => navigation.navigate('DrawerOpen')}
            transparent
          >
            <Icon name="menu" />
          </Button>
        </Left>
        <Body style={Platform.OS === 'ios' ? iosHeaderStyle : null}>
          <Title>
            { t('.yourAttributes') }
          </Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate('About')}>
            <Thumbnail small source={irmaLogo} />
          </Button>
        </Right>
      </NBHeader>
    );
  }
}
