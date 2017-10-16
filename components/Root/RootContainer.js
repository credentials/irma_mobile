import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import RootNavigatorContainer from './RootNavigatorContainer';

const mapStateToProps = (state) => {
  const {
    irmaConfiguration: {
      loaded: configurationLoaded
    },
    enrollment: {
      loaded: enrollmentLoaded,
      unenrolledSchemeManagerIds,
    },
    credentials: {
      loaded: credentialsLoaded,
    }
  } = state;

  const loaded = configurationLoaded && enrollmentLoaded && credentialsLoaded;

  return {
    loaded,
    unenrolledSchemeManagerIds,
  };
};

@connect(mapStateToProps)
export default class RootContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    unenrolledSchemeManagerIds: PropTypes.array.isRequired,
  }

  ensureEnrollment(navigator) {
    const { dispatch, unenrolledSchemeManagerIds } = this.props;

    if(unenrolledSchemeManagerIds.length === 0)
      return;

    // Irmago doesn't actually support multiple scheme managers with keyshare enrollment,
    // so we just pick the first unenrolled, which should be PBDF
    const schemeManagerId = unenrolledSchemeManagerIds[0];

    dispatch({
      type: 'Enrollment.Start',
      schemeManagerId
    });

    navigator.dispatch(
      NavigationActions.navigate({
        routeName: 'Enrollment',
        params: { schemeManagerId },
      })
    );
  }

  // Handle an URL of the form irma://qr/json/$json
  handleIrmaUrl(url, navigator) {
    const decodedUrl = decodeURIComponent(url.replace(/^.*?:\/\//g, ''));

    if (!(/^qr\/json\//.test(decodedUrl))) {
      // TODO: Show error
      return;
    }

    const qrJson = decodedUrl.replace(/^qr\/json\//, '');

    let qr;
    try {
      qr = JSON.parse(qrJson);
    } catch(err) {
      // TODO: Show error
      return;
    }

    if(typeof qr !== 'object' || typeof qr.irmaqr !== 'string') {
      // TODO: show error
      return;
    }

    const { dispatch } = this.props;

    const sessionId = global.getAutoIncrementId();
    dispatch({
      type: 'IrmaBridge.NewSession',
      sessionId,
      qr,
    });

    navigator.dispatch(
      NavigationActions.navigate({
        routeName: 'Session',
        params: { sessionId },
      })
    );
  }

  render() {
    const { loaded } = this.props;
    if(!loaded)
      return null;

    return (
      <RootNavigatorContainer
        ensureEnrollment={::this.ensureEnrollment}
        handleIrmaUrl={::this.handleIrmaUrl}
      />
    );
  }
}
