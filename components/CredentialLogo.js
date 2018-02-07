import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import {
  Thumbnail,
} from 'native-base';

import irmaLogo from 'assets/irmaLogo.png';

export default class CredentialLogo extends Component {

  static propTypes = {
    // : PropTypes.string,
  }

  render() {
    // TODO: FIXME

    // const {  } = this.props;
    // const source =  !== '' ?
    //   {uri: 'file://' + } : irmaLogo;

    const source = irmaLogo;

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
