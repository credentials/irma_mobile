import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CredentialDashboard, { t } from './CredentialDashboard';
import fullCredentials from 'store/mappers/fullCredentials';
import { STATUS_AUTHENTICATED } from 'store/reducers/appUnlock';
import nbVariables from 'lib/native-base-theme/variables/platform';
import { Navigation, showAppUnlockModal, setEnrollmentRoot, showCredentialDashboardSidebar, QR_SCANNER_SCREEN } from 'lib/navigation';

import menuIconImage from 'streamline/icons/regular/PNG/01-InterfaceEssential/03-Menu/24w/navigation-menu.png';
import lockIconImage from 'streamline/icons/regular/PNG/01-InterfaceEssential/11-Lock-Unlock/24w/lock-1.png';

const mapStateToProps = (state) => {
  const {
    appUnlock: {
      status: unlockStatus,
    },
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

  const isEnrolled = unenrolledSchemeManagerIds.length === 0;
  const isLoaded = irmaConfigurationLoaded && preferencesLoaded && enrollmentLoaded && credentialsLoaded;
  const isAuthenticated = unlockStatus === STATUS_AUTHENTICATED;

  return {
    credentials: fullCredentials(credentials, irmaConfiguration),
    isEnrolled,
    isLoaded,
    isAuthenticated,
  };
};

@connect(mapStateToProps)
export default class CredentialDashboardContainer extends React.Component {

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    credentials: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isEnrolled: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
  }

  static lockButton = {
    id: 'lockButton',
    icon: lockIconImage,
  }

  static doneButton = {
    id: 'doneButton',
    text: t('.done'),
    color: nbVariables.platform === 'ios' ? nbVariables.colors.iosBlue : nbVariables.topBarContentColor,
  }

  static options() {
    return {
      topBar: {
        leftButtons: {
          id: 'menuButton',
          icon: menuIconImage,
        },
        rightButtons: CredentialDashboardContainer.lockButton,
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
    const { dispatch, isEnrolled } = this.props;

    switch (buttonId) {
      // Show sidebar
      case 'menuButton': {
        showCredentialDashboardSidebar();
        break;
      }

      // Go to unlock screen, with failsafe for when not enrolled
      case 'lockButton': {
        if (!isEnrolled) {
          setEnrollmentRoot();
          return;
        }

        dispatch({
          type: 'AppUnlock.Lock',
        });

        showAppUnlockModal();
        break;
      }

      // Done button handling for CredentialCard longtap
      case 'doneButton': {
        this.makeUneditable();
        break;
      }
    }
  }

  componentDidMount() {
    const { componentId, isEnrolled } = this.props;
    if (!isEnrolled) {
      Navigation.mergeOptions(componentId, {
        topBar: {
          rightButtons: [],
        },
      });
    }
  }

  navigateToQRScanner = () => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: QR_SCANNER_SCREEN,
      },
    });
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
    const { componentId } = this.props;
    this.setState({isEditable: true});

    Navigation.mergeOptions(componentId, {
      topBar: {
        rightButtons: CredentialDashboardContainer.doneButton,
      },
    });
  }

  makeUneditable = () => {
    const { componentId } = this.props;
    this.setState({isEditable: false});

    Navigation.mergeOptions(componentId, {
      topBar: {
        rightButtons: CredentialDashboardContainer.lockButton,
      },
    });
  }

  render() {
    const { credentials, isEnrolled, isLoaded, isAuthenticated } = this.props;
    const { isEditable } = this.state;

    if (!isLoaded || !isAuthenticated)
      return null;

    return (
      <CredentialDashboard
        credentials={credentials}
        deleteCredential={this.deleteCredential}
        isEnrolled={isEnrolled}
        isEditable={isEditable}
        makeEditable={this.makeEditable}
        navigateToEnrollment={this.navigateToEnrollment}
        navigateToQRScanner={this.navigateToQRScanner}
      />
    );
  }
}
