import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Icon
} from 'native-base';

export default class StatusIcon extends Component {

  static propTypes = {
    status: PropTypes.string.isRequired,
  }

  iconProps() {
    const { status } = this.props;

    switch(status) {
      case 'communicating':
      case 'connected':
        return {name: 'chatboxes'};

      case 'success':
        return {name: 'checkmark-circle'};

      case 'failure':
      case 'unsatisfiableRequest':
      case 'keyshareEnrollmentMissing':
      case 'keyshareEnrollmentDeleted':
      case 'keyshareBlocked':
      case 'keyshareEnrollmentIncomplete':
        return {name: 'alert'};

      case 'cancelled':
        return {name: 'close-circle'};

      case 'requestPermission':
      case 'requestRemovalPermission':
      case 'requestDisclosurePermission':
        return {name: 'help-circle'};

      case 'requestPin':
        return {name: 'unlock'};

      default:
        return null;
    }
  }

  render() {
    const style = {
      fontSize: 28
    };

    const iconProps = this.iconProps();
    if(!iconProps)
      return null;

    return (
      <Icon {...iconProps} style={style} />
    );
  }
}
