import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

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

    // Navigate to session screen while removing ourselves from the screen stack,
    // so that nagivation.goBack() will return directly to the CredentialDashboard.
    navigation.dispatch(
      NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'CredentialDashboard' }),
          NavigationActions.navigate({ routeName: 'Session', params: {sessionId} }),
        ],
      }),
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
