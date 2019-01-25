import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {

  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.any,
  }

  static defaultProps = {
    children: null,
    style: null,
  }

  render() {
    const { children, style, ...props } = this.props;

    return (
      <Button
        style={[{flex: 1}, style]}
        {...props}
      >
        { children }
      </Button>
    );
  }
}
