import React, { Component } from 'react';
import { Image as RNImage } from 'react-native';
import PropTypes from 'prop-types';
import nbVariables from 'lib/native-base-theme/variables/platform';
// import { connectStyle } from 'native-base-shoutem-theme';
// import mapPropsToStyleNames from 'native-base/src/utils/mapPropsToStyleNames';

// @connectStyle('NativeBase.Image', {}, mapPropsToStyleNames)
export default class ButtonImage extends Component {

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

    const buttonImageStyle = {
      height: 24,
      width: 24,
      marginLeft: nbVariables.buttonIconPadding,
    };

    return (
      <RNImage
        style={[buttonImageStyle, style]}
        {...props}
      >
        { children }
      </RNImage>
    );
  }
}
