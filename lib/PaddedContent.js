import React, { Component } from 'react';
import PropTypes from 'prop-types';

import variables from 'lib/native-base-theme/variables/platform';
import contentStyle from 'lib/native-base-theme/components/Content';

import { ScrollView } from 'react-native';

export default class PaddedContent extends Component {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      // We use Scrollview instead of Content from NativeBase to avoid the
      // KeyboardAwareScrollView, which on iOS breaks the keyboard handling
      // of KeyboardAwareContainer.
      <ScrollView style={{...contentStyle, padding: variables.contentPadding}} contentContainerStyle={{paddingBottom: 20}}>
        { this.props.children }
      </ScrollView>
    );
  }
}
