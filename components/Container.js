import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

import nbVariables from 'lib/native-base-theme/variables/platform';

export default class Container extends Component {

  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.any,
    transparent: PropTypes.bool,
  }

  static defaultProps = {
    children: null,
    style: null,
    transparent: false,
  }

  render() {
    const { children, style, transparent, ...props } = this.props;

    const backgroundStyle = transparent ? null : styles.containerBackground;

    return (
      <SafeAreaView
        style={[styles.container, backgroundStyle, style]}
        {...props}
      >
        { children }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBackground: {
    backgroundColor: nbVariables.containerBgColor,
  },
});
