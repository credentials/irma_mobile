import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  View
} from 'native-base';

import CredentialCard from 'components/CredentialCard';

export default class IssuedCredentials extends Component {

  static propTypes = {
    session: PropTypes.object.isRequired,
  }

  render() {
    const {
      session: { status, issuedCredentials }
    } = this.props;

    if(!_.includes(['requestPermission', 'success'], status))
      return null;

    return (
      <View>
        { issuedCredentials.map( (credential, i) =>
            <CredentialCard 
              key={`index-${i}`} 
              credential={credential}
              lockedOpen={true}
            />
        )}
      </View>
    );
  }
}
