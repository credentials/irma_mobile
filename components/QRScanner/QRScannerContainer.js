import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { resetNavigation } from 'lib/navigation';
import QRScanner, { t } from './QRScanner';

@connect()
export default class QRScannerContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    title: t('.title'),
  };

  newSession(qr) {
    const { dispatch, navigation } = this.props;

    const sessionId = global.getAutoIncrementId();
    dispatch({
      type: 'IrmaBridge.NewSession',
      sessionId,
      qr
    });

    // Place the Session screen directly under the CredentialDashboard, so goBack works properly
    resetNavigation(
      navigation.dispatch,
      'CredentialDashboard',
      {routeName: 'Session', params: {sessionId}},
    );
  }

  render() {
    return (
      <QRScanner
        newSession={::this.newSession}
      />
    );
  }
}
