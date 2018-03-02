import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Platform } from 'react-native';

import variables from 'lib/native-base-theme/variables/platform';
import contentStyle from 'lib/native-base-theme/components/Content';

import { keyboardAware } from 'lib/KeyboardAwareContainer';

@keyboardAware()
export default class PaddedContent extends Component {

  static propTypes = {
    children: PropTypes.node,
    keyboardHeight: PropTypes.number.isRequired,
  }

  render() {
    const { keyboardHeight } = this.props;

    // On iOS add extra padding so the entire content area can be viewed with the keyboard active
    const paddingBottom = 20 + (Platform.OS === 'ios' ? keyboardHeight : 0);

    return (
      // We use Scrollview instead of Content from NativeBase to avoid the
      // KeyboardAwareScrollView, which on iOS breaks the keyboard handling
      // of KeyboardAwareContainer.
      // TODO: Check if this is unnecessary in new version of NB
      <ScrollView
        style={{...contentStyle, padding: variables.contentPadding}}
        contentContainerStyle={{paddingBottom}}
      >
        { this.props.children }
      </ScrollView>
    );
  }
}
