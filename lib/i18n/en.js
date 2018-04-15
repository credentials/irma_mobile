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
      text: 'If you just opened an IRMA account, you can obtain your first attributes by clicking on the link sent to you by e-mail.'
    },
    unenrolled: {
      header: 'Please open an IRMA account',
      text: 'You have not opened an IRMA account yet.\nYou need to do so to use attributes.',
      button: 'Open IRMA account',
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
    title: 'Open IRMA account',
    intro: 'Welcome to IRMA! Please open your IRMA account by completing the two steps below.',
    enrolling: 'Opening IRMA account...',
    success: 'You have now succesfully opened your IRMA account. You can proceed to load personal attributes.',
    failure: 'An error occurred',
    finish: 'Finish',
    step1: {
      header: 'Step 1: Choose an IRMA PIN',
      text: 'Enter a PIN of at least 5 digits. You will need to enter your PIN every time you use IRMA. If you forget it, your attributes become unusable and you will have to open a new account.',
      label: 'PIN',
      repeatLabel: 'Repeat PIN',
      invalidMessage: 'Please enter a PIN of at least 5 digits',
    },
    step2: {
      header: 'Step 2: Add your email address',
      text: 'We strongly recommend to associate at least one email address with your account. It allows you to login to your MyIRMA environment in case your phone is lost or stolen, so you can close your account.',
      label: 'E-mail address',
      repeatLabel: 'Repeat e-mail address',
      invalidMessage: 'Please enter a valid e-mail address',
    },

    // title: 'IRMA registration',
    // shortTitle: 'Registration',
    // subtitle: 'Step {{step}}',
    // next: 'Next',
    // finish: 'Finish',
    // back: 'Back',
    // notnow: 'Not now',
    // stepZero: {
    //   text: 'Welcome to IRMA!\n\nThe IRMA app manages your personal IRMA attributes: you can receive new attributes, selectively disclose them to others, and attach them to signed statements.\n\nBefore you can use the IRMA app, you need to register with IRMA. In case your device is lost or stolen, you can block further usage of your IRMA attributes on the IRMA website.\n\nThe registration process consists of 4 steps:\n1.  Enter your email address\n2. Choose your IRMA pin\n3. Click on the link sent to your email address\n4. Scan the QR and obtain your first attributes!\n\nYou can postpone the registration if you wish, but until you register you will not be able to receive or use any attributes.',
    //   note: 'Note',
    //   warning: 'this version of the app is new and has been entirely rewritten, and may still have some problems. If you encounter any, please let us know.'
    // },
    // stepOne: {
    //   label: 'E-mail address',
    //   repeatLabel: 'Repeat e-mail address',
    //   invalid: 'Please enter a valid e-mail address',
    //   text: 'Please enter your email addres below.\n\nYou will be able to log in on the IRMA website with this email address, and you will receive it as your first attribute in the final registration step.'
    // },
    // stepTwo: {
    //   label: 'PIN',
    //   repeatLabel: 'Repeat PIN',
    //   invalid: 'Please enter a PIN of at least 5 digits',
    //   pleaseEnterPin: 'Please enter a PIN of at least 5 digits.',
    //   important: 'Important',
    //   rememberPin: 'It is important that you remember your PIN. You will need to enter it every time you use the IRMA app.\n\nIf you forget it, all your attributes will become unusable, and you will have to redo this registration.',
    // },
    // stepThree: {
    //   success: 'Your registration with IRMA is almost complete! A confirmation link has been sent to the e-mail address you entered in the first step:\n\n{{email}}\n\nClick on the link in the e-mail to continue registration and receive your first attributes.',
    //   failure: 'An error occurred during registration.\n\nDo you have a working internet connection?',
    // }
  },
  EnrollmentTeaser: {
    openAccount: 'Open account',
    notNow: 'Not now',
    slide1: {
      statement: 'IRMA is like a personalized passport stored only on your phone. It puts you in control and keeps your personal data private and secure.',
      quote: '"I Reveal My Attributes"'
    },
    slide2: {
      statement: 'IRMA allows you to reveal relevant attributes – and nothing more.',
      quote: '"I\'m older than 18"',
    },
    slide3: {
      statement: 'IRMA allows you to gain access without passwords.',
      quote: '"It\'s me, log me in!"',
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
        requestPin: 'Please enter your IRMA PIN',
        keyshareEnrollmentMissing: 'Missing IRMA registration',
        keyshareEnrollmentIncomplete: 'IRMA registration incomplete',
        keyshareBlocked: 'Your attributes are blocked',
      },
      explanation: {
        requestPin: 'To use your attributes, you need to enter the PIN you chose during registration with IRMA.',
        registerMyIrma: 'Register with IRMA',
        keyshareEnrollmentMissing: 'Before you can be issued and disclose IRMA attributes, you need to be registered with IRMA.',
        keyshareEnrollmentIncomplete: 'You cannot yet receive or disclose attributes, because you have not yet clicked on the verification link sent to your email. Please click on the link first, then try again.',
        keyshareBlocked: 'The session was aborted, and you are temporarily blocked from using your attributes because your PIN code was entered incorrectly three times.\n\nYou can try again in {{duration}} seconds.',
      },
    },
    IssuanceSession: {
      headerTitle: 'Receive attributes',
      requestPermissionHeading: 'Receive these attributes?',
      requestPermissionExplanation: ' wants to issue attributes to you. If you accept, you will receive {{attributeAmount}} in {{credentialAmount}}.\n\nPlease review the attributes below.',
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
    register: 'Open IRMA account',
    deleteAll: {
      menu: 'Delete IRMA account',
      title: 'Delete IRMA account?',
      message: 'Are you sure you want to delete your IRMA account and all of your attributes?',
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
    errors: {
      title: 'Report errors to IRMA',
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
  },
  CollapsableForm: {
    skip: 'Skip',
    next: 'Next',
  },
  ErrorCard: {
    types: {
      transport: 'Something went wrong while connecting to or communicating with the IRMA server.\n\nDo you have a working internet connection?',
      keyshareBlocked: 'IRMA has blocked the usage of your attributes because your PIN code was entered incorrectly three times.\n\nYou can try again in {{errorInfo}} seconds.',
      keyshareRegistrationIncomplete: 'You are not fully registered at IRMA yet. Have you clicked on the verification link sent to your email address?',
      protocolVersionNotSupported: 'Can\'t communicate with the IRMA server because it uses an unsupported version of the IRMA protocol.',
      configurationDownload : 'Something went wrong while downloading the credential information.\n\nDo you have a working internet connection?',
      unknownSchemeManager: 'The request can\'t be understood because it uses an unknown scheme manager "{{errorInfo}}".',
      crypto: 'Something went wrong within the IRMA cryptography.', // <-- TODO: See Usability review page 27
      rejected: 'The IRMA server has aborted the session.',
      api: 'The session was aborted by the IRMA server because it encountered a fatal error.',
      serverResponse: 'Something went wrong while communicating with the IRMA server.',
      unknownCredentialType: 'The IRMA server used an unknown credential type.',
      keyshare: 'Something went wrong in the IRMA protocol.', // <-- TODO: See Usability review page 27
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
};
