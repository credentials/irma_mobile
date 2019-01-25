import React from 'react';
import { Navigation as Navigation } from 'react-native-navigation';
import { Provider as ReduxProvider } from 'react-redux';
import { Root as NBRoot, StyleProvider } from 'native-base';

import initStore from 'store/init';
import getTheme from 'lib/native-base-theme/components';
import nbVariables from 'lib/native-base-theme/variables/platform';

// Initialize Redux store
const store = initStore();

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
export const CREDENTIAL_TYPE_DASHBOARD_SCREEN = 'irma.CREDENTIAL_TYPE_DASHBOARD_SCREEN';
export const ENROLLMENT_SCREEN = 'irma.ENROLLMENT_SCREEN';
export const ENROLLMENT_TEASER_SCREEN = 'irma.ENROLLMENT_TEASER_SCREEN';
export const LOG_DASHBOARD_SCREEN = 'irma.LOG_DASHBOARD_SCREEN';
export const PREFERENCES_DASHBOARD_SCREEN = 'irma.PREFERENCES_DASHBOARD_SCREEN';
export const QR_SCANNER_SCREEN = 'irma.QR_SCANNER_SCREEN';
export const SESSION_SCREEN = 'irma.SESSION_SCREEN';
export const SIDEBAR_SCREEN = 'irma.SIDEBAR_SCREEN';

const registerScreens = () => {
  registerComponentWithProviders(ABOUT_SCREEN, () => require('components/About').default);
  registerComponentWithProviders(APP_UNLOCK_SCREEN, () => require('components/AppUnlock').default);
  registerComponentWithProviders(CHANGE_PIN_SCREEN, () => require('components/ChangePin').default);
  registerComponentWithProviders(CREDENTIAL_DASHBOARD_SCREEN, () => require('components/CredentialDashboard').default);
  registerComponentWithProviders(CREDENTIAL_TYPE_DASHBOARD_SCREEN, () => require('components/CredentialTypeDashboard').default);
  registerComponentWithProviders(ENROLLMENT_SCREEN, () => require('components/Enrollment').default);
  registerComponentWithProviders(ENROLLMENT_TEASER_SCREEN, () => require('components/EnrollmentTeaser').default);
  registerComponentWithProviders(LOG_DASHBOARD_SCREEN, () => require('components/LogDashboard').default);
  registerComponentWithProviders(PREFERENCES_DASHBOARD_SCREEN, () => require('components/PreferencesDashboard').default);
  registerComponentWithProviders(QR_SCANNER_SCREEN, () => require('components/QRScanner').default);
  registerComponentWithProviders(SESSION_SCREEN, () => require('components/Session').default);
  registerComponentWithProviders(SIDEBAR_SCREEN, () => require('components/Sidebar').default);
};

// Roots
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

// Modals
export const setAppUnlockModal = () => {
  Navigation.showModal({
    component: {
      name: APP_UNLOCK_SCREEN,
      options: {
        animations: {
          showModal: {
            enabled: false,
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

// Navigation defaults
const setDefaultOptions = () => Navigation.setDefaultOptions({
  topBar: {
    leftButtonColor: nbVariables.topBarContentColor,
    rightButtonColor: nbVariables.topBarContentColor,
    background: {
      color: nbVariables.topBarBgColor,
    },
    title: {
      color: nbVariables.topBarContentColor,
    },
    subtitle: {
      color: nbVariables.topBarContentColor,
    },
  },
});

// Export Navigation for convenience
export { Navigation };

// Init function that may be called after appLaunched event
export const initNavigation = () => {
  setDefaultOptions();
  registerScreens();

  const {
    enrollment: {
      enrolledSchemeManagerIds,
    },
  } = store.getState();

  // TODO: This doesn't work because enrolledSchemeManagerIds isn't loaded yet
  if (false && enrolledSchemeManagerIds.length === 0) {
    setEnrollmentRoot();
  } else {
    setCredentialDashboardRoot();
    setAppUnlockModal();
  }
};