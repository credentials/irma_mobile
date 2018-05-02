import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorCard from 'components/ErrorCard';

// TODO: This component is a small wrapper that passes some session information to ErrorCard,
// but should become obsolete when DisclosureSession / IssuanceSession / SigningSession,
// have their enormous duplication sorted out.
export default class Error extends Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
  }

  render() {
    const {
      session: { status, error, didRespondPermission, irmaAction, qr }
    } = this.props;

    if(status !== 'failure')
      return null;

    const extraReportInfo = {
      didRespondPermission,
      irmaAction,
      qr,
    };

    return (
      <ErrorCard
          error={error}
          extraReportInfo={extraReportInfo} />
    );
  }
}
