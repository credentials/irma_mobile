import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native';

export default class Container extends Component {

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
      <SafeAreaView
        style={[{flex: 1}, style]}
        {...props}
      >
        { children }
      </SafeAreaView>
    );
  }
}
