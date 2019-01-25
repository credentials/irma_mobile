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
    onMoreInfoPress: PropTypes.func,
  }

  static defaultProps = {
    onMoreInfoPress: null,
    onLongPress: null,
    lockedOpen: false,
  }

  render() {
    const { credential, lockedOpen, onMoreInfoPress, onLongPress } = this.props;

    return (
      <SelfCollapsableCard
        header={<CredentialHeader credential={credential} />}
        lockedOpen={lockedOpen}
        onLongPress={onLongPress}
      >
        <CredentialAttributes credential={credential} />
        { !onMoreInfoPress ? null : (
          <CardItem style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button transparent small onPress={onMoreInfoPress}>
              <Icon name="information-circle" />
              <Text>More information</Text>
            </Button>
          </CardItem>
          )}
      </SelfCollapsableCard>
    );
  }
}
