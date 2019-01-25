import React, { Component } from 'react';
import { Image as RNImage } from 'react-native';
import PropTypes from 'prop-types';
import { connectStyle } from 'native-base-shoutem-theme';
import mapPropsToStyleNames from 'native-base/src/utils/mapPropsToStyleNames';

@connectStyle('NativeBase.Image', {}, mapPropsToStyleNames)
export default class Image extends Component {

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
      <RNImage
        style={style}
        {...props}
      >
        { children }
      </RNImage>
    );
  }
}