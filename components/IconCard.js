import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Body,
  Card,
  CardItem,
  Icon,
  Left
} from 'native-base';

export default class IconCard extends Component {

  static propTypes = {
    iconName: PropTypes.string,
    iconProps: PropTypes.object,
    children: PropTypes.node,
  }

  render() {
    const { iconProps = {}, iconName, children } = this.props;
    if(typeof iconName === 'string')
      iconProps.name = iconName;

    return (
      <Card>
        <CardItem header>
          <Left>
            <Icon style={{fontSize: 28}} {...iconProps} />
            <Body>
              { children }
            </Body>
          </Left>
        </CardItem>
      </Card>
    );
  }
}
