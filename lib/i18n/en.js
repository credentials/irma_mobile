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
    notice: 'Notice',
    warning: 'this version of the app is new and has been entirely rewritten, and may still have some problems. If you encounter any, please let us know.',
    source: 'Source code',
    more: 'More information',
  },
  CredentialDashboard: {
    noAttributes: 'You don\'t have any attributes',
    justRegistered: 'If you just registered with MyIRMA, you can obtain your first attributes by clicking on the link sent to you by e-mail, and scanning the QR code.',

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
        missingKeyshareEnrollment: 'Missing MyIRMA registration',
      },
      explanation: {
        requestPin: 'To use your attributes, you need to enter the PIN you chose during registration with MyIRMA.',
        missingKeyshareEnrollment: 'Before you can be issued and disclose IRMA attributes, you need to be registered with MyIRMA.',
        registerMyIrma: 'Register with MyIRMA',
      },
    },
    IssuanceSession: {
      headerTitle: 'Issuance session',
      requestPermissionHeading: 'Receive these attributes?',
      requestPermissionExplanation: 'wants to issue attributes to you. If you accept, you will receive {{attributeAmount}} in {{credentialAmount}}.\n\nPlease review the attributes below.',
      requestDisclosurePermission: 'Before issuing the attributes in the previous screen, {{issuerName}} wants you to disclose {{attributeAmount}}.',
      cancelledHeading: 'Issuance cancelled',
      successHeading: 'Successfully received attributes',
      successExplanation: 'You received the following attributes:',
      // Before issuing $issuer requires you to disclose some attributes, but you do not have all of them. For each of the categories below, the verifier accepts one of the following attributes. The icons indicate if you do or do not have this attribute.
    },
    DisclosureSession: {
      headerTitle: 'Disclosure session',
      requestPermissionHeading: 'Disclose these attributes?',
      requestPermissionExplanation: 'wants you to disclose {{attributeAmount}}. If the attributes are not personally identifiable, this disclosure cannot be linked to any other disclosures you do.',
      disclosureChoice: 'Where you own multiple attribute of the same kind, you may choose which to disclose.',
      cancelledHeading: 'Disclosure cancelled',
      successHeading: 'Successfully disclosed attributes',
      successExplanation: 'You disclosed the following attributes:',
      // $Verifier asked you to disclose some attributes, but you do not have all of them. For each of the categories below, the verifier accepts one of the following attributes. The icons indicate if you do or do not have this attribute.
    },
    SigningSession: {
      headerTitle: 'Signing session',
      requestPermissionHeading: 'Sign message with attributes?',
      requestPermission: {
        beforeExplanation: 'would like you to sign the following message with {{attributeAmount}}:',
        afterExplanation: 'When you own multiple attribute of the same kind, you may choose which to use.',
      },
      cancelledHeading: 'Signing cancelled',
      successHeading: 'Successfully signed message',
      success: {
        beforeExplanation: 'You signed the following message:',
        afterExplanation: 'with the following attributes:',
      },
      // $signaturerequestor asked you to sign message
      //     $message
      // with a set of attributes, but you do not have all of them. For each of the categories below, the signature requestor accepts one of the following attributes. The icons indicate if you do or do not have this attribute.
    },
    Error: {
      persists: 'If this persists, please contact IRMA.',
      transport: 'Something went wrong while connecting to or communicating with the IRMA server.\n\nDo you have a working internet connection?',
      blocked: 'MyIRMA has blocked the usage of your attributes because your PIN code was entered incorrectly three times.\n\nYou can try again in {{errorInfo}} seconds.',
      protocolVersionNotSupported: 'Can\'t communicate with the IRMA server because it uses an unsupported version of the IRMA protocol.',
      configurationStoreDownload : 'Something went wrong while downloading the credential information.\n\nDo you have a working internet connection?',
      unknownSchemeManager: 'The request can\'t be understood because it uses an unknown scheme manager "{{errorInfo}}".',
      crypto: 'Something went wrong within the IRMA cryptography.',
      rejected: 'The IRMA server has aborted the session.',
      api: 'The session was aborted by the IRMA server because it encountered a fatal error.',
      serverResponse: 'Something went wrong while communicating with the IRMA server.',
      unknownCredentialType: 'The IRMA server used an unknown credential type.',
      panic: 'A crash occurred within the IRMA software.',
      unknown: 'An unknown error occurred.'
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
  }
};
