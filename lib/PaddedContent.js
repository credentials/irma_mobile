import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Content,
} from 'native-base';

export default class PaddedContent extends Component {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <Content padder contentContainerStyle={{paddingBottom: 20}}>
        { this.props.children }
      </Content>
    );
  }
}
