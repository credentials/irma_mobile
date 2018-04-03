import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Content } from 'native-base';
import variables from 'lib/native-base-theme/variables/platform';

export default class PaddedContent extends Component {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const {  children, ...contentProps } = this.props;

    const paddingBottom = 20;

    return (
      <Content
        {...contentProps}
        disableKBDismissScroll={true}
        contentContainerStyle={{padding: variables.contentPadding, paddingBottom}}
      >
        { children }
      </Content>
    );
  }
}
