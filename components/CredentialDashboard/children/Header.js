import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { namespacedTranslation } from 'lib/i18n';
import irmaLogoInverted from 'assets/irmaLogoInverted.png';

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

    const headerStyle = {
      backgroundColor: '#00b1e6',
    };

    const colorStyle = {
      color: 'white',
    };

    return (
      <NBHeader style={headerStyle}>
        <Left>
          <Button
            onPress={() => navigation.navigate('DrawerOpen')}
            transparent
          >
            <Icon name="menu" style={colorStyle} />
          </Button>
        </Left>
        <Body>
          <Title style={colorStyle}>
            { t('.yourAttributes') }
          </Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate('About')}>
            <Thumbnail small source={irmaLogoInverted} />
          </Button>
        </Right>
      </NBHeader>
    );
  }
}
