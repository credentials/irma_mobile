import variable from './../variables/platform';

export default (variables = variable) => {
  const platformStyle = variables.platformStyle;
  const platform = variables.platform;
  const darkCommon = {
    'NativeBase.Text': {
      color: variables.brandDark
    },
    'NativeBase.Icon': {
      color: variables.brandDark
    },
    'NativeBase.IconNB': {
      color: variables.brandDark
    },
    'NativeBase.Image': {
      tintColor: variables.brandDark
    }
  };
  const lightCommon = {
    'NativeBase.Text': {
      color: variables.brandLight
    },
    'NativeBase.Icon': {
      color: variables.brandLight
    },
    'NativeBase.IconNB': {
      color: variables.brandLight
    },
    'NativeBase.Image': {
      tintColor: variables.brandLight
    }
  };
  const primaryCommon = {
    'NativeBase.Text': {
      color: variables.btnPrimaryBg
    },
    'NativeBase.Icon': {
      color: variables.btnPrimaryBg
    },
    'NativeBase.IconNB': {
      color: variables.btnPrimaryBg
    },
    'NativeBase.Image': {
      tintColor: variables.brandLight
    }
  };
  const successCommon = {
    'NativeBase.Text': {
      color: variables.btnSuccessBg
    },
    'NativeBase.Icon': {
      color: variables.btnSuccessBg
    },
    'NativeBase.IconNB': {
      color: variables.btnSuccessBg
    },
    'NativeBase.Image': {
      tintColor: variables.btnSuccessBg
    }
  };
  const infoCommon = {
    'NativeBase.Text': {
      color: variables.btnInfoBg
    },
    'NativeBase.Icon': {
      color: variables.btnInfoBg
    },
    'NativeBase.IconNB': {
      color: variables.btnInfoBg
    },
    'NativeBase.Image': {
      tintColor: variables.btnInfoBg
    }
  };
  const warningCommon = {
    'NativeBase.Text': {
      color: variables.btnWarningBg
    },
    'NativeBase.Icon': {
      color: variables.btnWarningBg
    },
    'NativeBase.IconNB': {
      color: variables.btnWarningBg
    },
    'NativeBase.Image': {
      tintColor: variables.btnWarningBg
    }
  };
  const dangerCommon = {
    'NativeBase.Text': {
      color: variables.btnDangerBg
    },
    'NativeBase.Icon': {
      color: variables.btnDangerBg
    },
    'NativeBase.IconNB': {
      color: variables.btnDangerBg
    },
    'NativeBase.Image': {
      tintColor: variables.btnDangerBg
    }
  };
  const buttonTheme = {
    '.disabled': {
      '.transparent': {
        backgroundColor: '',
        'NativeBase.Text': {
          color: variables.btnDisabledBg
        },
        'NativeBase.Icon': {
          color: variables.btnDisabledBg
        },
        'NativeBase.IconNB': {
          color: variables.btnDisabledBg
        },
        'NativeBase.Image': {
          tintColor: variables.btnDisabledBg
        }
      },
      'NativeBase.Icon': {
        color: variables.brandLight
      },
      'NativeBase.IconNB': {
        color: variables.brandLight
      },
      'NativeBase.Image': {
        tintColor: variables.brandLight
      },
      backgroundColor: variables.btnDisabledBg
    },
    '.bordered': {
      '.dark': {
        ...darkCommon,
        backgroundColor: 'transparent',
        borderColor: variables.brandDark,
        borderWidth: variables.borderWidth * 2
      },
      '.light': {
        ...lightCommon,
        backgroundColor: 'transparent',
        borderColor: variables.brandLight,
        borderWidth: variables.borderWidth * 2
      },
      '.primary': {
        ...primaryCommon,
        backgroundColor: 'transparent',
        borderColor: variables.btnPrimaryBg,
        borderWidth: variables.borderWidth * 2
      },
      '.success': {
        ...successCommon,
        backgroundColor: 'transparent',
        borderColor: variables.btnSuccessBg,
        borderWidth: variables.borderWidth * 2
      },
      '.info': {
        ...infoCommon,
        backgroundColor: 'transparent',
        borderColor: variables.btnInfoBg,
        borderWidth: variables.borderWidth * 2
      },
      '.warning': {
        ...warningCommon,
        backgroundColor: 'transparent',
        borderColor: variables.btnWarningBg,
        borderWidth: variables.borderWidth * 2
      },
      '.danger': {
        ...dangerCommon,
        backgroundColor: 'transparent',
        borderColor: variables.btnDangerBg,
        borderWidth: variables.borderWidth * 2
      },
      '.disabled': {
        backgroundColor: '',
        borderColor: variables.btnDisabledBg,
        borderWidth: variables.borderWidth * 2,
        'NativeBase.Text': {
          color: variables.btnDisabledBg
        }
      },
      ...primaryCommon,
      borderWidth: variables.borderWidth * 2,
      elevation: null,
      shadowColor: null,
      shadowOffset: null,
      shadowOpacity: null,
      shadowRadius: null,
      backgroundColor: 'transparent'
    },

    '.dark': {
      '.bordered': {
        ...darkCommon
      },
      backgroundColor: variables.brandDark
    },
    '.light': {
      '.transparent': {
        ...lightCommon,
        backgroundColor: ''
      },
      '.bordered': {
        ...lightCommon
      },
      // THEME CHANGE: Use white text on 'light' button
      'NativeBase.Text': {
        color: 'white'
      },
      'NativeBase.Icon': {
        color: 'white'
      },
      'NativeBase.IconNB': {
        color: 'white'
      },
      'NativeBase.Image': {
        tintColor: 'white'
      },
      backgroundColor: variables.brandLight
    },

    '.primary': {
      '.bordered': {
        ...primaryCommon
      },
      backgroundColor: variables.btnPrimaryBg
    },

    '.success': {
      '.bordered': {
        ...successCommon
      },
      backgroundColor: variables.btnSuccessBg
    },

    '.info': {
      '.bordered': {
        ...infoCommon
      },
      backgroundColor: variables.btnInfoBg
    },

    '.warning': {
      '.bordered': {
        ...warningCommon
      },
      backgroundColor: variables.btnWarningBg
    },

    '.danger': {
      '.bordered': {
        ...dangerCommon
      },
      backgroundColor: variables.btnDangerBg
    },

    '.block': {
      justifyContent: 'center',
      alignSelf: 'stretch'
    },

    '.full': {
      justifyContent: 'center',
      alignSelf: 'stretch',
      borderRadius: 0
    },

    '.rounded': {
      // paddingHorizontal: variables.buttonPadding + 20,
      borderRadius: variables.borderRadiusLarge
    },

    '.transparent': {
      backgroundColor: 'transparent',
      elevation: 0,
      shadowColor: null,
      shadowOffset: null,
      shadowRadius: null,
      shadowOpacity: null,
      ...primaryCommon,
      '.dark': {
        ...darkCommon,
        backgroundColor: ''
      },
      '.danger': {
        ...dangerCommon,
        backgroundColor: ''
      },
      '.warning': {
        ...warningCommon,
        backgroundColor: ''
      },
      '.info': {
        ...infoCommon,
        backgroundColor: ''
      },
      '.primary': {
        ...primaryCommon,
        backgroundColor: ''
      },
      '.success': {
        ...successCommon,
        backgroundColor: ''
      },
      '.light': {
        ...lightCommon,
        backgroundColor: ''
      },
      '.disabled': {
        backgroundColor: 'transparent',
        borderColor: variables.btnDisabledBg,
        borderWidth: variables.borderWidth * 2,
        'NativeBase.Text': {
          color: variables.btnDisabledBg
        },
        'NativeBase.Icon': {
          color: variables.btnDisabledBg
        },
        'NativeBase.IconNB': {
          color: variables.btnDisabledBg
        },
        'NativeBase.Image': {
          tintColor: variables.btnDisabledBg
        }
      }
    },

    '.small': {
      height: 30,
      'NativeBase.Text': {
        fontSize: 14
      },
      'NativeBase.Icon': {
        fontSize: 20,
        paddingTop: 0
      },
      'NativeBase.IconNB': {
        fontSize: 20,
        paddingTop: 0
      },
      'NativeBase.Image': {
        paddingTop: 0
      }
    },

    '.large': {
      height: 60,
      'NativeBase.Text': {
        fontSize: 22,
      }
    },

    '.capitalize': {},

    '.vertical': {
      flexDirection: 'column',
      height: null
    },

    'NativeBase.Text': {
      fontFamily: variables.btnFontFamily,
      marginLeft: 0,
      marginRight: 0,
      color: variables.inverseTextColor,
      fontSize: variables.btnTextSize,
      paddingHorizontal: variables.buttonIconPadding,
      backgroundColor: 'transparent'
    },

    'NativeBase.Icon': {
      color: variables.inverseTextColor,
      fontSize: 24,
      marginHorizontal: variables.buttonIconPadding,
      paddingTop: platform === 'ios' ? 2 : undefined
    },
    'NativeBase.IconNB': {
      color: variables.inverseTextColor,
      fontSize: 24,
      marginHorizontal: variables.buttonIconPadding,
      paddingTop: platform === 'ios' ? 2 : undefined
    },
    'NativeBase.Image': {
      color: variables.inverseTextColor,
      marginHorizontal: variables.buttonIconPadding,
      paddingTop: platform === 'ios' ? 2 : undefined,
      backgroundColor: 'purple',
      width: 1000,
    },

    '.iconLeft': {
      'NativeBase.Text': {
        marginLeft: 0
      },
      'NativeBase.Icon': {
        marginRight: 0,
        marginLeft: variables.buttonIconPadding
      },
      'NativeBase.IconNB': {
        marginRight: 0,
        marginLeft: variables.buttonIconPadding
      },
      'NativeBase.Image': {
        marginRight: 0,
        marginLeft: variables.buttonIconPadding
      }
    },
    '.iconRight': {
      'NativeBase.Text': {
        marginRight: 0
      },
      'NativeBase.Icon': {
        marginLeft: 0,
        marginRight: variables.buttonIconPadding
      },
      'NativeBase.IconNB': {
        marginLeft: 0,
        marginRight: variables.buttonIconPadding
      },
      'NativeBase.Image': {
        marginLeft: 0,
        marginRight: variables.buttonIconPadding
      }
    },
    '.picker': {
      'NativeBase.Text': {
        '.note': {
          fontSize: 16,
          lineHeight: null
        }
      }
    },

    paddingVertical: variables.buttonPadding,
    backgroundColor: variables.btnPrimaryBg,
    borderRadius: variables.borderRadiusBase,
    borderColor: variables.btnPrimaryBg,
    borderWidth: null,
    height: 45,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    elevation: 2,
    shadowColor: platformStyle === 'material' ? variables.brandDark : undefined,
    shadowOffset:
      platformStyle === 'material' ? { width: 0, height: 2 } : undefined,
    shadowOpacity: platformStyle === 'material' ? 0.2 : undefined,
    shadowRadius: platformStyle === 'material' ? 1.2 : undefined,
    alignItems: 'center',
    justifyContent: 'space-between'
  };
  return buttonTheme;
};
