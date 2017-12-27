import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Body,
  CardItem,
  Icon,
  Left,
  Right,
  Text,
  Thumbnail,
} from 'native-base';

import Card from 'lib/UnwrappedCard';

import irmaLogo from 'assets/irmaLogo.png';
const lang = 'en'; // TODO: Move to I18n

export default class CredentialCard extends Component {

  static propTypes = {
    credential: PropTypes.object.isRequired,
    collapsedInitially: PropTypes.bool,
    collapsable: PropTypes.bool,
  }

  static defaultProps = {
    collapsedInitially: true,
    collapsable: false,
  }

  state = {
    collapsed: !!this.props.collapsedInitially
  }

  renderAttribute(attribute) {
    return (
      <CardItem key={attribute.Type.ID}>
        <Text>{ attribute.Type.Name[lang] }</Text>
        <Right style={{flex: 1}}>
          <Text note>{ attribute[lang] }</Text>
        </Right>
      </CardItem>
    );
  }

  renderThumbnail() {
    const { credential } = this.props;

    const source = credential.Logo !== '' ?
      {uri: credential.Logo} : irmaLogo;

    return (
      <Thumbnail square source={source} resizeMode="contain" />
    );
  }

  render() {
    const { credential, collapsable } = this.props;
    const { collapsed } = this.state;

    return (
      <Card>
        <TouchableWithoutFeedback onPress={() => this.setState({collapsed: !collapsed})}>
          <CardItem>
            <Left>
              { this.renderThumbnail() }
              <Body>
                <Text>{ credential.Type.Name[lang] }</Text>
                <Text note>{ credential.Issuer.Name[lang] }</Text>
                <Text note>Expires on { moment.unix(credential.Expires).format('D MMM YYYY') }</Text>
              </Body>
              { !collapsable ? null :
                  <Icon name={collapsed ? 'arrow-forward' : 'arrow-down'} />
              }
            </Left>
          </CardItem>
        </TouchableWithoutFeedback>
        { collapsable && collapsed ? null :
            credential.Attributes.map(::this.renderAttribute)
        }
      </Card>
    );
  }
}
