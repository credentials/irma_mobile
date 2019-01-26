import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CredentialDashboard, { t } from './CredentialDashboard';
import fullCredentials from 'store/mappers/fullCredentials';
import nbVariables from 'lib/native-base-theme/variables/platform';
import { Navigation, showAppUnlockModal, setEnrollmentRoot, showCredentialDashboardSidebar, QR_SCANNER_SCREEN } from 'lib/navigation';

import menuIconImage from 'assets/icons/streamline-regular/01/03/navigation-menu.png';
import lockIconImage from 'assets/icons/streamline-regular/01/11/lock-1.png';

const mapStateToProps = (state) => {
  const {
    appUnlock: {
      isAuthenticated,
    },
    credentials: {
      loaded: credentialsLoaded,
      credentials,
    },
    enrollment: {
      loaded: enrollmentLoaded,
      enrolledSchemeManagerIds,
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

  const shouldEnroll = enrollmentLoaded && unenrolledSchemeManagerIds.length > 0;
  const shouldAuthenticate = !isAuthenticated && enrolledSchemeManagerIds.length > 0;
  const isLoaded = irmaConfigurationLoaded && preferencesLoaded && enrollmentLoaded && credentialsLoaded;

  return {
    credentials: fullCredentials(credentials, irmaConfiguration),
    shouldAuthenticate,
    isLoaded,
    shouldEnroll,
  };
};

@connect(mapStateToProps)
export default class CredentialDashboardContainer extends React.Component {

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    credentials: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    shouldAuthenticate: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    shouldEnroll: PropTypes.bool.isRequired,
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
        // Make topbar invisible by default, until we know we don't have to authenticate
        visible: false,

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
    const { dispatch, shouldEnroll } = this.props;

    switch (buttonId) {
      // Show sidebar
      case 'menuButton': {
        showCredentialDashboardSidebar();
        break;
      }

      // Go to unlock screen, with failsafe for when not enrolled
      case 'lockButton': {
        if (shouldEnroll) {
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
    const { componentId, shouldAuthenticate, shouldEnroll } = this.props;

    if (shouldEnroll) {
      Navigation.mergeOptions(componentId, {
        topBar: {
          rightButtons: [],
        },
      });
    }

    if (!shouldAuthenticate)
      this.showTopBar();
  }

  componentDidUpdate(prevProps) {
    const { shouldAuthenticate } = this.props;
    if (prevProps.shouldAuthenticate === true && shouldAuthenticate === false)
      this.showTopBar();
  }

  showTopBar() {
    const { componentId } = this.props;
    Navigation.mergeOptions(componentId, {
      topBar: {
        visible: true,
      },
    });
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
    const { credentials, shouldEnroll, isLoaded, shouldAuthenticate } = this.props;
    const { isEditable } = this.state;

    if (!isLoaded || shouldAuthenticate)
      return null;

    return (
      <CredentialDashboard
        credentials={credentials}
        deleteCredential={this.deleteCredential}
        shouldEnroll={shouldEnroll}
        isEditable={isEditable}
        makeEditable={this.makeEditable}
        navigateToEnrollment={this.navigateToEnrollment}
        navigateToQRScanner={this.navigateToQRScanner}
      />
    );
  }
}
