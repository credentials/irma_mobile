import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LogDashboard, { t } from './LogDashboard';

import fullCredentials from 'store/mappers/fullCredentials';
import fullDisclosureCandidatesFromLogs from '../../store/mappers/fullDisclosuresCandidatesFromLogs';
import fullRemovedCredentials from '../../store/mappers/fullRemovedCredentials';

const MAX_LOAD_LOGS = 20;

const mapStateToProps = (state) => {
  const {
    irmaConfiguration,
    logs: {
      loadedLogs,
    },

  } = state;

  if (loadedLogs === null) {
    return {
      loadedLogs: null,
    };
  }

  return {
    loadedLogs: loadedLogs.map(log => ({
      ...log,
      issuedCredentials: fullCredentials(log.issuedCredentials, irmaConfiguration),
      disclosuresCandidates: fullDisclosureCandidatesFromLogs(log.disclosedCredentials, irmaConfiguration),
      removedCredentials: fullRemovedCredentials(log.removedCredentials, irmaConfiguration),
    })),
  };
};

@connect(mapStateToProps)
export default class LogDashboardContainer extends Component {

  static propTypes = {
    loadedLogs: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    loadedLogs: null,
  };

  static navigationOptions = {
    title: t('.title'),
  };

  state = {
    logs: [],
    loadingFinished: false,
  };

  render() {
    const { logs, loadingFinished } = this.state;

    return (
      <LogDashboard
        logs={logs}
        loadingFinished={loadingFinished}
        loadNewLogs={this.loadNewLogs.bind(this)}
      />
    );
  }

  loadNewLogs() {
    const { dispatch } = this.props;
    const { logs, loadingFinished } = this.state;

    if (!loadingFinished) {
      dispatch({
        type: 'IrmaBridge.LoadLogs',
        before: logs[logs.length - 1].id,
        max: MAX_LOAD_LOGS,
      });
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'IrmaBridge.LoadLogs',
      max: MAX_LOAD_LOGS,
    });
  }

  componentDidUpdate() {
    const { loadedLogs } = this.props;
    const { logs, loadingFinished } = this.state;

    if (loadedLogs !== null && !loadingFinished) {
      if (loadedLogs.length === 0) {
        this.setState({
          loadingFinished: true,
        });
        return;
      }

      const lastLoaded = loadedLogs[loadedLogs.length - 1].id;
      if (logs.length === 0 || lastLoaded !== logs[logs.length - 1].id) {
        this.setState({
          logs: logs.concat(loadedLogs),
          loadingFinished: loadedLogs.length < MAX_LOAD_LOGS,
        });
      }
    }
  }
}
