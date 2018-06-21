import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  View
} from 'native-base';

import CredentialCard from 'components/CredentialCard';

export default class RemovalCredentials extends Component {

  static propTypes = {
    session: PropTypes.object.isRequired,
  }

  render() {
    const {
      session: { status, removalCredentials }
    } = this.props;
    
    if (status !== 'requestRemovalPermission')
      return null;

    return (
      <View>
        { removalCredentials.map( (credential, i) =>
            <CredentialCard key={`index-${i}`} credential={credential} />
        )}
      </View>
    );
  }
}
