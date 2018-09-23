import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import {
  Body,
  CardItem,
  Icon,
  Left,
  View,
} from 'native-base';

import Card from 'lib/UnwrappedCard';

export default class SelfCollapsableCard extends Component {

  static propTypes = {
    content: PropTypes.node.isRequired,
    headerImage: PropTypes.node,
    headerText: PropTypes.node.isRequired,
    lockedOpen: PropTypes.bool,
    onLongPress: PropTypes.func,
  }

  static defaultProps = {
    lockedOpen: false,
    longPress: () => {}
  }

  state = {
    collapsed: true,
  }

  press = () => {
    const { collapsed } = this.state;
    this.setState({collapsed: !collapsed});
  }

  render() {
    const { content, headerImage, headerText, lockedOpen, onLongPress } = this.props;
    const { collapsed } = this.state;

    return (
      <Card>
        <TouchableWithoutFeedback
          onPress={this.press}
          onLongPress={onLongPress}
        >
          <View>
            <CardItem>
              <Left>
                { headerImage }
                <Body>
                  { headerText}
                </Body>
                { lockedOpen ? null :
                    <Icon name={collapsed ? 'ios-arrow-forward' : 'ios-arrow-down'} />
                }
              </Left>
            </CardItem>
            { !lockedOpen && collapsed ? null
                : content
            }
          </View>
        </TouchableWithoutFeedback>
      </Card>
    );
  }
}
