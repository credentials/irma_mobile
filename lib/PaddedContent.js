import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';

import { Content } from 'native-base';
import variables from 'lib/native-base-theme/variables/platform';

export default class PaddedContent extends Component {

  static propTypes = {
    children: PropTypes.node,
    enableAutomaticScroll: PropTypes.bool,
  }

  render() {
    const { children, enableAutomaticScroll, ...contentProps } = this.props;
    const contentContainerStyle = {padding: variables.contentPadding, paddingBottom: 20};

    // KeyboardAwareScrollView (inside NB Content) doesn't properly respect enableAutomaticScroll,
    // so we use this as a workaround (which breaks some styling via NB).
    if(!enableAutomaticScroll) {
      return (
        <ScrollView contentContainerStyle={contentContainerStyle}>
          { children }
        </ScrollView>
      );
    }

    return (
      <Content
        {...contentProps}
        enableResetScrollToCoords={false}
        contentContainerStyle={contentContainerStyle}
      >
        { children }
      </Content>
    );
  }
}
