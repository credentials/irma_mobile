import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import LogDashboard, { t } from './LogDashboard';

import fullCredentials from 'store/mappers/fullCredentials';
import fullDisclosureCandidatesFromLogs from '../../store/mappers/fullDisclosuresCandidatesFromLogs';

const mapStateToProps = (state) => {
  const {
    irmaConfiguration,
    logs: {
      loadedLogs
    },

  } = state;

  return {
    loadedLogs: loadedLogs.map(log => ({
      ...log,
      issuedCredentials: fullCredentials(log.issuedCredentials, irmaConfiguration),
      disclosuresCandidates: fullDisclosureCandidatesFromLogs(log.disclosedCredentials, irmaConfiguration),
    }))
  };
};

@connect(mapStateToProps)
export default class LogDashboardContainer extends Component {

  static propTypes = {
    loadedLogs: PropTypes.array
  };

  static navigationOptions = {
    title: t('.title'),
  };

  state = {
    logs: [],
  };

  render() {
    const { logs } = this.state;

    return (
        <LogDashboard
            logs={logs}
        />
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'IrmaBridge.LoadLogs',
      before: moment().format('X'),
      max: 10, // TODO Enlarge to 10
    });
  }

  componentDidUpdate() {
    const {loadedLogs, dispatch} = this.props;
    const {logs} = this.state;

    if (loadedLogs.length > 0) {
      let lastLoaded = loadedLogs[0].time;
      if (logs.length === 0 || lastLoaded !== logs[0].time) {
        this.setState({
          logs: logs.concat(loadedLogs),
        });
        /*
              dispatch({
                type: 'IrmaBridge.LoadLogs',
                before: this.props.lastLog,
                max: 10, // TODO Enlarge to 10
              });*/
      }
    }
  }
}
