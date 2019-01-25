import nbVariables from 'lib/native-base-theme/variables/platform';

// Navigation defaults
export default {
  // Topbar configuration
  topBar: {
    buttonColor: nbVariables.topBarContentColor,
    leftButtonColor: nbVariables.topBarContentColor,
    rightButtonColor: nbVariables.topBarContentColor,

    noBorder: false,

    background: {
      color: nbVariables.topBarBgColor,
    },
    title: {
      color: nbVariables.topBarContentColor,
      // Always show bold titles on iOS
      fontFamily: nbVariables.platform === 'ios' ? '.HelveticaNeue' : '',
    },
    subtitle: {
      color: nbVariables.topBarContentColor,
    },
    backButton: {
      color: nbVariables.topBarContentColor,
    },
  },

  // Android animations
  animations: {
    setRoot: {
      alpha: {
        from: 0,
        to: 1,
        duration: 400,
      },
    },
    push: {
      waitForRender: true,
      content: {
        x: {
          from: 1000,
          to: 0,
          duration: 300,
          interpolation: 'accelerate',
        },
        alpha: {
          from: 0,
          to: 1,
          duration: 400,
          interpolation: 'accelerate',
        },
      },
    },
    pop: {
      content: {
        x: {
          from: 0,
          to: 1000,
          duration: 400,
          interpolation: 'decelerate',
        },
        alpha: {
          from: 1,
          to: 0,
          duration: 400,
          interpolation: 'decelerate',
        },
      },
    },
  },
};