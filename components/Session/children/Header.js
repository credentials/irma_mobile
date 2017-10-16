import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Body,
  Button,
  Header as NBHeader,
  Icon,
  Left,
  Right,
  Title,
} from 'native-base';

export default class Header extends Component {
  static propTypes = {
    navigateBack: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }

  render() {
    const { navigateBack, title } = this.props;

    return (
      <NBHeader>
        <Left>
          <Button
            onPress={() => navigateBack()}
            transparent
          >
            <Icon name="arrow-back"  />
          </Button>
        </Left>
        <Body style={{flex: 3}}>
          <Title>{ title }</Title>
        </Body>
        <Right />
      </NBHeader>
    );
  }
}
