export default {
  common: {
    credentials: {
      one: '{{count}} credential',
      other: '{{count}} credentials',
    },
    attributes: {
      one: '{{count}} attribute',
      other: '{{count}} attributes',
    },
    theseAttributes: {
      one: 'this attribute',
      other: 'these attributes',
    }
  },
  About: {
    title: 'About IRMA',
    header: 'Authentication made easy, privacy-friendly, and secure',
    about: 'The IRMA app manages your personal IRMA attributes: you can receive new attributes, selectively disclose them to others, and attach them to signed statements. IRMA is made and maintained by the Privacy by Design Foundation, and freely available and open-source.',
    problems: 'If you encounter any problems while using the app, please let us know.',
    source: 'Source code',
    more: 'More information',
  },
  CredentialDashboard: {
    noAttributes: {
      header: 'You don\'t have any attributes',
      text: 'If you just registered with MyIRMA, you can obtain your first attributes by clicking on the link sent to you by e-mail.'
    },
    unenrolled: {
      header: 'Please register with MyIRMA',
      text: 'You are not registered at MyIRMA yet. You will not be able to receive or disclose attributes until you do.',
      button: 'Register with MyIRMA',
    },
    scanQRCode: 'Scan QR Code',
    Header: {
      yourAttributes: 'Your attributes',
    }
  },
  RepeatedValueForm: {
    noMatch: 'The two entered values do not match',
  },
  Enrollment: {
    title: 'MyIRMA registration',
    shortTitle: 'Registration',
    subtitle: 'Step {{step}}',
    next: 'Next',
    finish: 'Finish',
    back: 'Back',
    notnow: 'Not now',
    stepZero: {
      text: 'Welcome to IRMA!\n\nThe IRMA app manages your personal IRMA attributes: you can receive new attributes, selectively disclose them to others, and attach them to signed statements.\n\nBefore you can use the IRMA app, you need to register with MyIRMA. In case your device is lost or stolen, you can block further usage of your IRMA attributes on the MyIRMA website.\n\nThe registration process consists of 4 steps:\n1.  Enter your email address\n2. Choose your IRMA pin\n3. Click on the link sent to your email address\n4. Scan the QR and obtain your first attributes!\n\nYou can postpone the registration if you wish, but until you register you will not be able to receive or use any attributes.',
      note: 'Note',
      warning: 'this version of the app is new and has been entirely rewritten, and may still have some problems. If you encounter any, please let us know.'
    },
    stepOne: {
      label: 'E-mail address',
      repeatLabel: 'Repeat e-mail address',
      invalid: 'Please enter a valid e-mail address',
      text: 'Please enter your email addres below.\n\nYou will be able to log in on the MyIRMA website with this email address, and you will receive it as your first attribute in the final registration step.'
    },
    stepTwo: {
      label: 'PIN',
      repeatLabel: 'Repeat PIN',
      invalid: 'Please enter a valid PIN of at least 5 digits',
      pleaseEnterPin: 'Please enter a PIN of at least 5 digits.',
      important: 'Important',
      rememberPin: 'It is important that you remember your PIN. You will need to enter it every time you use the IRMA app.\n\nIf you forget it, all your attributes will become unusable, and you will have to redo this registration.',
    },
    stepThree: {
      success: 'Your registration with MyIRMA is almost complete! A confirmation link has been sent to the e-mail address you entered in the first step:\n\n{{email}}\n\nClick on the link in the e-mail to continue registration and receive your first attributes.',
      failure: 'An error occurred during registration.\n\nDo you have a working internet connection?',
    }
  },
  Session: {
    StatusCard: {
      heading: {
        communicating: 'Communicating with server',
        connected: 'Communicating with server',
        failure: 'An error occurred',
        cancelled: 'Cancelled', // Not normally used
        unsatisfiableRequest: 'You don\'t have these attributes',
        success: 'Success!', // Not normally used
        requestPermission: 'You need to give permission', // Not normally used
        requestDisclosurePermission: 'Disclose these attributes?',
        requestPin: 'Please enter your MyIRMA PIN',
        keyshareEnrollmentMissing: 'Missing MyIRMA registration',
        keyshareEnrollmentIncomplete: 'MyIRMA registration incomplete',
        keyshareBlocked: 'Your attributes are blocked',
      },
      explanation: {
        requestPin: 'To use your attributes, you need to enter the PIN you chose during registration with MyIRMA.',
        registerMyIrma: 'Register with MyIRMA',
        keyshareEnrollmentMissing: 'Before you can be issued and disclose IRMA attributes, you need to be registered with MyIRMA.',
        keyshareEnrollmentIncomplete: 'You cannot yet receive or disclose attributes, because you have not yet clicked on the verification link sent to your email. Please click on the link first, then try again.',
        keyshareBlocked: 'The session was aborted, and you are temporarily blocked from using your attributes because your PIN code was entered incorrectly three times.\n\nYou can try again in {{duration}} seconds.',
      },
    },
    IssuanceSession: {
      headerTitle: 'Receive attributes',
      requestPermissionHeading: 'Receive these attributes?',
      requestPermissionExplanation: 'wants to issue attributes to you. If you accept, you will receive {{attributeAmount}} in {{credentialAmount}}.\n\nPlease review the attributes below.',
      requestDisclosurePermission: 'Before issuing the attributes in the previous screen, {{issuerName}} wants you to disclose the attributes listed below. You may have to select one out of several options.',
      cancelledHeading: 'Issuance cancelled',
      successHeading: 'Successfully received attributes',
      successExplanation: 'You received the following attributes:',
      unsatisfiableRequestExplanation: {
        before: 'Receiving attributes has been cancelled, because',
        after: 'is asking you to disclose some attributes first, but you do not have them. Below you can see the missing attributes.',
      },
    },
    DisclosureSession: {
      headerTitle: 'Disclose attributes',
      requestPermissionHeading: 'Disclose these attributes?',
      requestPermissionExplanation: 'asks you to disclose the attributes that are listed below. You may have to select one out of several options.',
      cancelledHeading: 'Disclosure cancelled',
      successHeading: 'Successfully disclosed attributes',
      successExplanation: 'You disclosed the following attributes:',
      unsatisfiableRequestExplanation: {
        before: 'Disclosing attributes has been cancelled, because you do not have the attributes',
        after: 'is asking for. Below you can see the missing attributes.'
      },
    },
    SigningSession: {
      headerTitle: 'Sign with attributes',
      requestPermissionHeading: 'Sign message with attributes?',
      requestPermission: {
        beforeExplanation: 'would like you to sign the following message with attributes:',
        afterExplanation: 'with the following attributes:',
      },
      cancelledHeading: 'Signing cancelled',
      successHeading: 'Successfully signed message',
      success: {
        beforeExplanation: 'You signed the following message:',
        afterExplanation: 'with the following attributes:',
      },
      unsatisfiableRequestExplanation: {
        before: 'Signing has been cancelled, because you do not have the attributes',
        after: 'is asking you to sign the message with. Below you can see the missing attributes.',
      },
    },
    Error: {
      codes: {
        transport: 'Something went wrong while connecting to or communicating with the IRMA server.\n\nDo you have a working internet connection?',
        keyshareBlocked: 'MyIRMA has blocked the usage of your attributes because your PIN code was entered incorrectly three times.\n\nYou can try again in {{errorInfo}} seconds.',
        keyshareRegistrationIncomplete: 'You are not fully registered at MyIRMA yet. Have you clicked on the verification link sent to your email address?',
        protocolVersionNotSupported: 'Can\'t communicate with the IRMA server because it uses an unsupported version of the IRMA protocol.',
        configurationDownload : 'Something went wrong while downloading the credential information.\n\nDo you have a working internet connection?',
        unknownSchemeManager: 'The request can\'t be understood because it uses an unknown scheme manager "{{errorInfo}}".',
        crypto: 'Something went wrong within the IRMA cryptography.',
        rejected: 'The IRMA server has aborted the session.',
        api: 'The session was aborted by the IRMA server because it encountered a fatal error.',
        serverResponse: 'Something went wrong while communicating with the IRMA server.',
        unknownCredentialType: 'The IRMA server used an unknown credential type.',
        keyshare: 'Something went wrong in the MyIRMA protocol.',
        panic: 'A crash occurred within the IRMA software.',
      },
      ifPersistsReport: 'If this persists, please contact IRMA using the buttons below.',
      ifPersistsEnableReporting: 'If this persists, please consider enabling crash reporting in the preferences menu.',
      unknown: 'An unknown error occurred.',
      hideinfo: 'Hide report',
      showinfo: 'Show report',
      explanation: 'If you choose to report this error to IRMA, the following information will be sent:',
      report: 'Report to IRMA',
      reported: 'Reported to IRMA',
      reportedThanks: 'The error has been reported. Thank you!',
    },
    PinEntry: {
      label: 'IRMA PIN',
      incorrectMessage: 'The submitted PIN was incorrect. You have {{attempts}} left before your account will be temporarily blocked.',
      attempts: {
        one: '{{count}} attempt',
        other: '{{count}} attempts',
      },
    },
    Footer: {
      accept: 'Accept',
      decline: 'Refuse',
      next: 'Next',
      submit: 'Submit',
      cancel: 'Cancel',
      dismiss: 'Dismiss',
    }
  },
  Sidebar: {
    about: 'About IRMA',
    preferences: 'Preferences',
    log: 'Show log',
    moreAttributes: 'Get more attributes',
    attributes: 'Your attributes',
    register: 'Register with MyIRMA',
    deleteAll: {
      menu: 'Delete all attributes',
      title: 'Delete all attributes?',
      message: 'Are you sure you want to delete all attributes? This will also unregister you from MyIRMA.\n\nNote: if you would like to re-register using the same email address, you will need to delete your MyIRMA account at the MyIRMA website.',
      ok: 'Delete',
      cancel: 'Cancel',
    }
  },
  QRScanner: {
    title: 'Scan IRMA QR',
    invalidQR: 'This is not a valid IRMA QR.',
  },
  Preferences: {
    title: 'IRMA preferences',
    crashes: {
      title: 'Report Crashes to IRMA',
      explanation: 'When the app encounters a serious problem or when it crashes, send a report to the IRMA developers. Crash reports never contain your attributes; only information about your device and about the encountered problem. See our ',
      privacypolicy: 'privacy policy',
      moreinfo: 'for more info. Restart the app for this to take effect.',
    },
    schememanagers: {
      title: 'IRMA Scheme Managers',
    }
  },
  CredentialCard: {
    deleteCredential: {
      title: 'Delete "{{credentialName}}" credential?',
      message: 'Are you sure you want to delete the "{{credentialName}}" credential and all contained attributes? This cannot be undone.',
      ok: 'Delete',
      cancel: 'Cancel',
    },
  }
};
