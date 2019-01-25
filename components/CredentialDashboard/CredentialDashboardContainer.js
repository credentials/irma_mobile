import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { setEnrollmentRoot, QR_SCANNER_SCREEN } from 'lib/navigation';

import CredentialDashboard, { t } from './CredentialDashboard';
import fullCredentials from 'store/mappers/fullCredentials';

import menuIconImage from 'streamline/icons/regular/PNG/01-InterfaceEssential/03-Menu/24w/navigation-menu.png';
import lockIconImage from 'streamline/icons/regular/PNG/01-InterfaceEssential/11-Lock-Unlock/24w/lock-1.png';
import { setAppUnlockModal } from '../../lib/navigation';
import nbVariables from 'lib/native-base-theme/variables/platform';

const mapStateToProps = (state) => {
  const {
    credentials: {
      loaded: credentialsLoaded,
      credentials,
    },
    enrollment: {
      loaded: enrollmentLoaded,
      unenrolledSchemeManagerIds,
    },
    irmaConfiguration,
    irmaConfiguration: {
      loaded: irmaConfigurationLoaded,
    },
    preferences: {
      loaded: preferencesLoaded,
    },
  } = state;

  const enrolled = unenrolledSchemeManagerIds.length === 0;
  const loaded = irmaConfigurationLoaded && preferencesLoaded && enrollmentLoaded && credentialsLoaded;

  return {
    credentials: fullCredentials(credentials, irmaConfiguration),
    enrolled,
    loaded,
  };
};

@connect(mapStateToProps)
export default class CredentialDashboardContainer extends React.Component {

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    credentials: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    enrolled: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
  }

  static options() {
    return {
      topBar: {
        leftButtons: {
          id: 'menuButton',
          icon: menuIconImage,
        },
        rightButtons: {
          id: 'lockButton',
          icon: lockIconImage,
        },
        title: {
          text: t('.title'),
        },
      },
    };
  }

  state = {
    isEditable: false,
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    const { componentId } = this.props;

    if (buttonId === 'menuButton') {
      Navigation.mergeOptions(componentId, {
        sideMenu: {
          left: {
            visible: true,
          },
        },
      });
    }

    if (buttonId === 'lockButton') {
      setAppUnlockModal();
    }
  }

  navigateToQRScanner = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: QR_SCANNER_SCREEN,
      },
    });

    // Navigation.showModal({
    //   stack: {
    //     children: [{
    //       component: {
    //         name: QR_SCANNER_SCREEN,
    //         options: {
    //           topBar: {
    //             title: {
    //               text: 'Scan QR',
    //             },
    //           },
    //         },
    //       },
    //     }],
    //   },
    // });
  }

  navigateToEnrollment = () => {
    setEnrollmentRoot();
  }

  deleteCredential = (credential) => {
    this.props.dispatch({
      type: 'IrmaBridge.DeleteCredential',
      Hash: credential.Hash,
    });
  }

  makeEditable = () => {
    this.setState({isEditable: true});
  }

  render() {
    const { credentials, enrolled, loaded } = this.props;
    const { isEditable } = this.state;

    if (!loaded)
      return null;

    return (
      <CredentialDashboard
        credentials={credentials}
        deleteCredential={this.deleteCredential}
        enrolled={enrolled}
        isEditable={isEditable}
        makeEditable={this.makeEditable}
        navigateToEnrollment={this.navigateToEnrollment}
        navigateToQRScanner={this.navigateToQRScanner}
      />
    );
  }
}
