import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Card,
} from 'native-base';

export default class UnwrappedCard extends Component {

  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  }

  static defaultProps = {
    children: null,
    style: {},
  }

  render() {
    const { children, style = {} } = this.props;

    return (
      <Card
        {...this.props}
        style={[style, {flexWrap: 'nowrap'}]}
      >
        { children }
      </Card>
    );
  }
}
