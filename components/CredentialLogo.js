import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Thumbnail,
} from 'native-base';

const mapStateToProps = (state) => {
  const {
    irmaConfiguration: {
      path: configurationPath,
    }
  } = state;

  return {
    configurationPath,
  };
};

@connect(mapStateToProps)
export default class CredentialLogo extends Component {

  static propTypes = {
    configurationPath : PropTypes.string,
    credentialType: PropTypes.object,
  }

  render() {
    const { configurationPath, credentialType } = this.props;
    const { SchemeManagerID, IssuerID, ID } = credentialType;

    const source = {
      uri: `file://${configurationPath}/${SchemeManagerID}/${IssuerID}/Issues/${ID}/logo.png`,
    };

    return (
      <Thumbnail
        resizeMode="contain"
        small
        source={source}
        square
      />
    );
  }
}
