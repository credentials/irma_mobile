import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { resetNavigation } from 'lib/navigation';

import PreferencesButton from './children/PreferencesButton';
import AppUnlock, { t } from './AppUnlock';

const mapStateToProps = (state) => {
  const {
    appUnlock: {
      status,
      hadFailure,
    },
  } = state;

  return {
    status,
    hadFailure,
  };
};

@connect(mapStateToProps)
export default class AppUnlockContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    hadFailure: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = ({navigation}) => ({
    title: t('.title'),
    headerRight: (
      <PreferencesButton
        navigateToPreferences={() => navigation.navigate('PreferencesDashboard')}
      />
    ),
  });

  componentDidUpdate(prevProps) {
    const { status, navigation } = this.props;
    if (prevProps.status === 'unlocking' && status === 'unlocked')
      resetNavigation(navigation.dispatch, 'CredentialDashboard');
  }

  pinSubmit = pin => {
    const { dispatch } = this.props;

    if (pin.length < 5)
      return;

    dispatch({
      type: 'IrmaBridge.Authenticate',
      pin: pin,
    });
  }

  render() {
    const { status, hadFailure } = this.props;

    return (
      <AppUnlock
        hadFailure={hadFailure}
        pinSubmit={this.pinSubmit}
        status={status}
       />
    );
  }
}
