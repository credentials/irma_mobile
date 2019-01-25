import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Button,
  CardItem,
  Icon,
  Text,
} from 'native-base';

import { CredentialAttributes, CredentialHeader } from './helpers';

import SelfCollapsableCard from 'lib/SelfCollapsableCard';

// TODO: probably deprecate me into CredentialDashboard
export default class CredentialCard extends Component {

  static propTypes = {
    credential: PropTypes.object.isRequired,
    lockedOpen: PropTypes.bool,
    onLongPress: PropTypes.func,
  }

  static defaultProps = {
    onLongPress: null,
    lockedOpen: false,
  }

  render() {
    const { credential, lockedOpen, onLongPress } = this.props;

    return (
      <SelfCollapsableCard
        header={<CredentialHeader credential={credential} />}
        lockedOpen={lockedOpen}
        onLongPress={onLongPress}
      >
        <CredentialAttributes credential={credential} />
      </SelfCollapsableCard>
    );
  }
}
