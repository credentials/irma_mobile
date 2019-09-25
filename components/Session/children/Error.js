import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorCard from 'components/ErrorCard';

export default class Error extends Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
  }

  render() {
    const {
      session: { status, error, didRespondPermission, irmaAction, request },
    } = this.props;

    if (status !== 'failure')
      return null;

    const extraReportInfo = {
      didRespondPermission,
      irmaAction,
      request,
    };

    return (
      <ErrorCard
        error={error}
        extraReportInfo={extraReportInfo} />
    );
  }
}
