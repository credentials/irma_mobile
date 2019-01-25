import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LogDashboard, { t } from './LogDashboard';

import fullCredentials from 'store/mappers/fullCredentials';
import fullDisclosedCredentials from '../../store/mappers/fullDisclosedCredentials';

const mapStateToProps = (state) => {
  const {
    irmaConfiguration,
    logs: {
      logs
    },

  } = state;

  return {
    logs: logs.map( log => ({
      ...log,
      issuedCredentials: fullCredentials(log.issuedCredentials, irmaConfiguration),
      disclosedCredentials: fullDisclosedCredentials(log.disclosedCredentials, irmaConfiguration),
    }))
  };
};

@connect(mapStateToProps)
export default class LogDashboardContainer extends Component {

  static propTypes = {
    logs: PropTypes.array
  }

  render() {
    const { logs } = this.props;

    return (
      <LogDashboard
        logs={logs}
       />
    );
  }
}
