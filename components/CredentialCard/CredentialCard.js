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
import { namespacedTranslation } from 'lib/i18n';

import irmaLogo from 'assets/irmaLogo.png';
const lang = 'en'; // TODO: Move to I18n

const t = namespacedTranslation('CredentialCard');

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
    const textStyle = attribute.IsIssuerName ? {fontStyle: 'italic'} : null;
    return (
      <CardItem key={attribute.Type.ID}>
        <Text style={textStyle}>{ attribute.Type.Name[lang] }</Text>
        <Right style={{flex: 1}}>
          <Text note style={textStyle}>{ attribute[lang] }</Text>
        </Right>
      </CardItem>
    );
  }

  renderThumbnail() {
    const { credential } = this.props;

    const source = credential.Logo !== '' ?
      {uri: 'file://' + credential.Logo} : irmaLogo;

    return (
      <Thumbnail square small source={source} resizeMode="contain" />
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
                <Text note>Expires on { moment.unix(credential.Expires).format('D MMM YYYY') }</Text>
              </Body>
              { !collapsable ? null :
                  <Icon name={collapsed ? 'ios-arrow-forward' : 'ios-arrow-down'} />
              }
            </Left>
          </CardItem>
        </TouchableWithoutFeedback>
        { collapsable && collapsed ? null :
            credential.Attributes.map(::this.renderAttribute)
        }
        { collapsable && collapsed ? null :
            this.renderAttribute({
              IsIssuerName: true,
              Type: {
                ID: '_issuedBy',
                Name: {
                  [lang]: t('.issuedBy'),
                },
              },
              ...credential.Issuer.Name
            })
        }
      </Card>
    );
  }
}
