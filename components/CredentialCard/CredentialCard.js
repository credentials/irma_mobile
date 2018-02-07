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
  View,
} from 'native-base';

import Card from 'lib/UnwrappedCard';
import CredentialLogo from 'components/CredentialLogo';

const lang = 'en'; // TODO: Move to I18n

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

  render() {
    const { credential, collapsable, deleteCredential } = this.props;
    const { collapsed } = this.state;

    return (
      <Card>
        <TouchableWithoutFeedback
          onPress={() => this.setState({collapsed: !collapsed})}
          onLongPress={() => {
            if (deleteCredential !== undefined)
            deleteCredential(credential);
          }}
        >
          <View>
            <CardItem>
              <Left>
                <CredentialLogo />
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
