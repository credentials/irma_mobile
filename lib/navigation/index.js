import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Root as NBRoot, StyleProvider } from 'native-base';
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';

import { store, getAutoIncrementId } from 'store';
import getTheme from 'lib/native-base-theme/components';
import nbVariables from 'lib/native-base-theme/variables/platform';

import defaultOptions from './defaultOptions';

// Provider wrapper function
const registerComponentWithProviders = (componentName, componentProvider) => {
  const ScreenComponent = componentProvider();
  const ProviderComponent = (props) => (
    <ReduxProvider store={store}>
      <StyleProvider style={getTheme()}>
        <NBRoot>
          <ScreenComponent {...props} />
        </NBRoot>
      </StyleProvider>
    </ReduxProvider>
  );

  Navigation.registerComponent(componentName, () =>
    ProviderComponent, componentProvider
  );
};

// Screen constants and registration
export const ABOUT_SCREEN = 'irma.ABOUT_SCREEN';
export const APP_UNLOCK_SCREEN = 'irma.APP_UNLOCK_SCREEN';
export const CHANGE_PIN_SCREEN = 'irma.CHANGE_PIN_SCREEN';
export const CREDENTIAL_DASHBOARD_SCREEN = 'irma.CREDENTIAL_DASHBOARD_SCREEN';
// export const CREDENTIAL_TYPE_DASHBOARD_SCREEN = 'irma.CREDENTIAL_TYPE_DASHBOARD_SCREEN';
export const ENROLLMENT_SCREEN = 'irma.ENROLLMENT_SCREEN';
export const ENROLLMENT_TEASER_SCREEN = 'irma.ENROLLMENT_TEASER_SCREEN';
// export const LOG_DASHBOARD_SCREEN = 'irma.LOG_DASHBOARD_SCREEN';
export const PREFERENCES_DASHBOARD_SCREEN = 'irma.PREFERENCES_DASHBOARD_SCREEN';
export const QR_SCANNER_SCREEN = 'irma.QR_SCANNER_SCREEN';
export const SESSION_SCREEN = 'irma.SESSION_SCREEN';
export const SIDEBAR_SCREEN = 'irma.SIDEBAR_SCREEN';

export const registerScreens = () => {
  registerComponentWithProviders(ABOUT_SCREEN, () => require('components/About').default);
  registerComponentWithProviders(APP_UNLOCK_SCREEN, () => require('components/AppUnlock').default);
  registerComponentWithProviders(CHANGE_PIN_SCREEN, () => require('components/ChangePin').default);
  registerComponentWithProviders(CREDENTIAL_DASHBOARD_SCREEN, () => require('components/CredentialDashboard').default);
  // registerComponentWithProviders(CREDENTIAL_TYPE_DASHBOARD_SCREEN, () => require('components/CredentialTypeDashboard').default);
  registerComponentWithProviders(ENROLLMENT_SCREEN, () => require('components/Enrollment').default);
  registerComponentWithProviders(ENROLLMENT_TEASER_SCREEN, () => require('components/EnrollmentTeaser').default);
  // registerComponentWithProviders(LOG_DASHBOARD_SCREEN, () => require('components/LogDashboard').default);
  registerComponentWithProviders(PREFERENCES_DASHBOARD_SCREEN, () => require('components/PreferencesDashboard').default);
  registerComponentWithProviders(QR_SCANNER_SCREEN, () => require('components/QRScanner').default);
  registerComponentWithProviders(SESSION_SCREEN, () => require('components/Session').default);
  registerComponentWithProviders(SIDEBAR_SCREEN, () => require('components/Sidebar').default);
};

// // Roots
// CredentialDashboard
export const CREDENTIAL_DASHBOARD_ROOT_ID = 'irma.CREDENTIAL_DASHBOARD_ROOT_ID';
export const setCredentialDashboardRoot = () => {
  Navigation.setRoot(credentialDashboardRoot);
};

export const credentialDashboardRoot = {
  root: {
    sideMenu: {
      left: {
        component: {
          name: SIDEBAR_SCREEN,
        },
      },
      center: {
        stack: {
          children: [{
            component: {
              id: CREDENTIAL_DASHBOARD_ROOT_ID,
              name: CREDENTIAL_DASHBOARD_SCREEN,
            },
          }],
        },
      },
    },
  },
};

export const setCredentialDashboardSidebarVisibility = (visible) => {
  Navigation.mergeOptions(CREDENTIAL_DASHBOARD_ROOT_ID, {
    sideMenu: {
      left: {
        visible,
      },
    },
  });
};

export const showCredentialDashboardSidebar = () => setCredentialDashboardSidebarVisibility(true);
export const hideCredentialDashboardSidebar = () => setCredentialDashboardSidebarVisibility(false);

export const setCredentialDashboardSidebarEnabled = (enabled) => {
  Navigation.mergeOptions(CREDENTIAL_DASHBOARD_ROOT_ID, {
    sideMenu: {
      left: {
        enabled,
      },
    },
  });
};

export const enabledCredentialDashboardSidebar = () => setCredentialDashboardSidebarEnabled(true);
export const disableCredentialDashboardSidebar = () => setCredentialDashboardSidebarEnabled(false);

// Enrollment
export const ENROLLMENT_ROOT_ID = 'irma.ENROLLMENT_ROOT_ID';
export const setEnrollmentRoot = () => Navigation.setRoot(enrollmentRoot);
export const enrollmentRoot = {
  root: {
    stack: {
      children: [{
        component: {
          id: ENROLLMENT_ROOT_ID,
          name: ENROLLMENT_TEASER_SCREEN,
        },
      }],
    },
  },
};

// Session
export const startSessionAndNavigate = ({sessionPointer, exitAfter = false, setRoot = false, componentId = CREDENTIAL_DASHBOARD_ROOT_ID}) => {
  const sessionId = getAutoIncrementId();
  store.dispatch({
    type: 'IrmaBridge.NewSession',
    sessionId,
    qr: sessionPointer,
    exitAfter,
  });

  // When setRoot is true, we set a new CredentialDashboard root with the session on top
  // Otherwise just push into the CredentialDashboard root
  if (setRoot) {
    const root = _.cloneDeep(credentialDashboardRoot);
    root.root.sideMenu.center.stack.children.push({
      component: {
        name: SESSION_SCREEN,
        passProps: {
          sessionId,
        },
      },
    });

    Navigation.setRoot(root);
  } else {
    Navigation.push(componentId, {
      component: {
        name: SESSION_SCREEN,
        passProps: {
          sessionId,
        },
      },
    });
  }
};

// // Modals
export const showAppUnlockModal = ({showModalAnimation = true} = {}) => {
  Navigation.showModal({
    stack: {
      children: [{
        component: {
          name: APP_UNLOCK_SCREEN,
        },
      }],
      options: {
        animations: {
          showModal: {
            enabled: showModalAnimation,
            alpha: {
              from: 0,
              to: 1,
              duration: 800,
              interpolation: 'accelerate',
            },
          },
          dismissModal: {
            enabled: true,
            alpha: {
              from: 1,
              to: 0,
              duration: 800,
              interpolation: 'accelerate',
            },
          },
        },
        layout: {
          backgroundColor: 'transparent',
        },

        modalPresentationStyle: nbVariables.platform === 'ios' ? 'overFullScreen' : 'overCurrentContext',
      },
    },
  });
};

// Default options
export const setDefaultOptions = () => {
  Navigation.setDefaultOptions(defaultOptions);
};

// Export Navigation and defaultOptions for convenience
export { Navigation };