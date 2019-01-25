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
    },
  },
  RootContainer: {
    sessionErrorTitle: 'Error starting IRMA session:',
    dismiss: 'OK',
    errorReadFile: 'Could not read file.',
    errorNoMailClient: 'There is no mail app configured. Please configure a mail app and try again.',
    errorInvalidSignatureRequest: 'This is not a valid IRMA signature request.',
  },
  About: {
    title: 'About IRMA',
    header: 'Authentication and digital signing made easy, privacy-friendly, and secure',
    about1: 'The IRMA app manages your personal IRMA attributes: you can receive new attributes, selectively disclose them to others, and attach them to signed statements. IRMA is made and maintained by the Privacy by Design Foundation, and freely available and open-source.',
    about2: 'Your attributes will be stored exclusively in the IRMA app on your phone. However, in order to operate the IRMA platform, the Privacy by Design Foundation processes a limited amount of personal data, as explained in its privacy policy (https://privacybydesign.foundation/privacy-policy-en). By starting the registration process of the IRMA app you agree to this processing.',
    about3: 'Signatures, also in digital form, may have (legal) effects, and bind (commit) you to the content of the message that you sign. Whatever you sign with your IRMA app is your own personal responsibility. By using the IRMA app you agree that the Privacy by Design foundation is no party in whatever agreement you enter into via an IRMA signature. In particular, the Privacy by Design foundation is not responsible or liable.',
    problems: 'If you encounter any problems while using the app, please let us know.',
    moreInformation: 'More information:\nhttps://privacybydesign.foundation/en\nSource code:\nhttps://github.com/privacybydesign',
    attributions: 'The background images of the three introduction screens are created by Lexamer, Photoroyalty and Blossomstar respectively.',
  },
  CredentialDashboard: {
    done: 'Done',
    title: 'Your attributes',
    noAttributes: {
      header: 'You don\'t have any attributes',
      text: ''
    },
    unenrolled: {
      header: 'Please open an IRMA account',
      text: 'You have not opened an IRMA account yet.\nYou need to do so to use attributes.',
      button: 'Open IRMA account',
    },
    scanQRCode: 'Scan QR Code',
    deleteCredential: {
      title: 'Delete "{{credentialName}}"?',
      message: 'Are you sure you want to delete the "{{credentialName}}" attributes? This cannot be undone.',
      ok: 'Delete',
      cancel: 'Cancel',
    },
  },
  RepeatedValueForm: {
    noMatch: 'The two entered values do not match',
  },
  FormInput: {
    pinInvalidMessage: 'Please enter a PIN of at least 5 digits',
    emailInvalidMessage: 'Please enter a valid email address',
  },
  ChangePin: {
    title: 'Change PIN',
    intro: 'Please enter your current PIN, and enter a new PIN of at least 5 digits. You will need to enter your PIN every time you use IRMA. If you forget it, your attributes become unusable and you will have to open a new account.',
    oldPinLabel: 'Current PIN',
    newPinLabel: 'New PIN',
    newPinRepeatLabel: 'Repeat new PIN',
    doChange: 'Change',
    dismiss: 'OK',
    success: 'Your PIN has been changed.',
    changing: 'Changing PIN...',
    failure: 'An error occurred',
    pinIncorrect: 'The current PIN was incorrect. You have {{attempts}} left before your account will be temporarily blocked.',
    pinBlocked: 'The PIN change was aborted, and you are temporarily blocked from using your attributes because your PIN code was entered incorrectly three times.\n\nYou can try again in {{duration}} seconds.',
    attempts: {
      one: '{{count}} attempt',
      other: '{{count}} attempts',
    },
  },
  Enrollment: {
    title: 'Open IRMA account',
    shortTitle: 'Open account',
    intro: 'Welcome to IRMA! Please open your IRMA account by completing the two steps below.',
    enrolling: 'Opening IRMA account...',
    success: 'You have now succesfully opened your IRMA account. You can proceed to load personal attributes.',
    failure: 'An error occurred',
    finish: 'Finish',
    retry: 'Retry',
    step1: {
      header: 'Step 1: Choose an IRMA PIN',
      text: 'Enter a PIN of at least 5 digits. You will need to enter your PIN every time you use IRMA. If you forget it, your attributes become unusable and you will have to open a new account.',
      label: 'PIN',
      repeatLabel: 'Repeat PIN',
    },
    step2: {
      header: 'Step 2: Add your email address',
      text: 'Associate an email address with your account. This is optional, but highly recommended. It allows you to login to your MyIRMA environment in case your phone is lost or stolen, so you can delete your account.',
      label: 'Email address',
      repeatLabel: 'Repeat email address',
    },
  },
  EnrollmentTeaser: {
    openAccount: 'Open account',
    notNow: 'Not now',
    slide1: {
      statement: 'IRMA is like a personalized passport stored only on your phone. It puts you in control and keeps your personal data private and secure.',
      quote: '"I Reveal My Attributes"',
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
        manualStarted: 'Starting signature request...',
        requestPermission: 'You need to give permission', // Not normally used
        requestDisclosurePermission: 'Disclose these attributes?',
        requestPin: 'Please enter your IRMA PIN',
        keyshareEnrollmentMissing: 'Missing IRMA account',
        keyshareEnrollmentDeleted: 'IRMA account is deleted',
        keyshareBlocked: 'Your attributes are blocked',
      },
      explanation: {
        requestPin: 'To use your attributes, you need to enter your IRMA PIN.',
        registerMyIrma: 'Open IRMA account',
        keyshareEnrollmentMissing: 'Before you can be issued and disclose IRMA attributes, you have to open an IRMA account.',
        keyshareEnrollmentDeleted: 'The session was aborted, because your IRMA account has been deleted and your attributes have been permanently blocked.',
        keyshareBlocked: 'The session was aborted, and you are temporarily blocked from using your attributes because your PIN code was entered incorrectly three times.\n\nYou can try again in {{duration}} seconds.',
      },
    },
    IssuanceSession: {
      headerTitle: 'Receive attributes',
      requestPermissionHeading: 'Receive these attributes?',
      requestPermissionExplanation: ' wants to issue attributes to you. If you accept, you will receive {{attributeAmount}}.\n\nPlease review the attributes below.',
      requestDisclosurePermission: 'Before issuing the attributes in the previous screen, {{serverName}} wants you to disclose the attributes listed below. You may have to select one out of several options.',
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
        beforeExplanation: 'You are asked to sign the following message:',
        afterExplanation: 'with the following attributes:',
      },
      cancelledHeading: 'Signing cancelled',
      successHeading: 'Successfully signed message',
      success: {
        beforeExplanation: 'You signed the following message:',
        afterExplanation: 'with the following attributes:',
      },
      unsatisfiableRequestExplanation: 'Signing has been cancelled, because you do not have the attributes you are being asked to sign the message with. Below you can see the missing attributes.',
    },
    PinEntry: {
      label: 'IRMA PIN',
      incorrectMessage: 'The submitted PIN was incorrect. You have {{attempts}} left before your account will be temporarily blocked.',
      attempts: {
        one: '{{count}} attempt',
        other: '{{count}} attempts',
      },
      blocked: 'Your account is blocked for {{duration}}.',
      duration: {
        one: '{{count}} second',
        other: '{{count}} seconds',
      },
      error: {
        transport: 'Something went wrong while checking your PIN. Do you have a working internet connection?',
        unknown: 'Something went wrong. Please try again later.',
      },
    },
    Footer: {
      accept: 'Accept',
      decline: 'Refuse',
      next: 'Next',
      submit: 'Submit',
      cancel: 'Cancel',
      dismiss: 'OK',
      send: 'Send',
    }
  },
  Sidebar: {
    about: 'About IRMA',
    preferences: 'Preferences',
    log: 'Show log',
    moreAttributes: 'Get more attributes',
    moreAttributesURL: 'https://privacybydesign.foundation/issuance/',
    attributes: 'Your attributes',
    register: 'Open IRMA account',
    changePin: 'Change pin',
    deleteAll: {
      menu: 'Delete IRMA account',
      title: 'Delete IRMA account?',
      message: 'Are you sure you want to permanently delete your IRMA account and all of your attributes?',
      ok: 'Delete',
      cancel: 'Cancel',
    }
  },
  QRScanner: {
    title: 'Scan QR',
    invalidQR: 'This is not a valid IRMA QR.',
    scan: 'Scan',
  },
  Preferences: {
    title: 'IRMA preferences',
    errors: {
      title: 'Report errors to IRMA',
      explanation: 'Send a error report to the IRMA developers when the app encounters a serious problem or when it crashes. Error reports never contain your attributes; only information about your device and about the encountered problem. See our ',
      privacypolicy: 'privacy policy',
      moreinfo: 'for more info. Restart the app for this to take effect.',
    },
    schememanagers: {
      title: 'IRMA Scheme Managers',
    }
  },
  CredentialCard: {
    issuedBy: 'Issued by',
    expires: 'IRMA attributes usable until',
    expired: 'IRMA attributes have expired on',
    moreInfo: 'More info',
    lessInfo: 'Less info',
    refresh: 'Refresh',
  },
  CollapsableForm: {
    skip: 'Skip',
    next: 'Next',
  },
  Mail: {
    subject: 'IRMA signature response',
    body: 'See the attachment for an IRMA signature.',
  },
  ErrorCard: {
    types: {
      transport: 'Something went wrong while connecting to or communicating with the IRMA server.\n\nDo you have a working internet connection?',
      keyshareBlocked: 'IRMA has blocked the usage of your attributes because your PIN code was entered incorrectly three times.\n\nYou can try again in {{errorInfo}} seconds.',
      protocolVersionNotSupported: 'Can\'t communicate with the IRMA server because it uses an unsupported version of the IRMA protocol.',
      configurationDownload : 'Something went wrong while downloading the credential information.\n\nDo you have a working internet connection?',
      unknownSchemeManager: 'The request can\'t be understood because it uses an unknown scheme manager "{{errorInfo}}".',
      crypto: 'Something went wrong within the IRMA cryptography.', // <-- TODO: See Usability review page 27
      rejected: 'The IRMA server has aborted the session.',
      api: 'The session was aborted by the IRMA server because it encountered a fatal error.',
      serverResponse: 'Something went wrong while communicating with the IRMA server.',
      unknownCredentialType: 'The IRMA server used an unknown credential type.',
      keyshare: 'Something went wrong in the MyIRMA protocol.', // <-- TODO: See Usability review page 27
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
  AppUnlock: {
    title: 'Enter your IRMA PIN',
  },
};
