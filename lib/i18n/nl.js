export default {
  common: {
    credentials: {
      one: '{{count}} credential',
      other: '{{count}} credentials',
    },
    attributes: {
      one: '{{count}} attribuut',
      other: '{{count}} attributen',
    },
    theseAttributes: {
      one: 'dit attribuut',
      other: 'deze attributen',
    }
  },
  About: {
    title: 'Over IRMA',
    header: 'Simpele, privacy-vriendelijke en veilige authenticatie',
    about: 'De IRMA app beheert uw persoonlijke IRMA attributen: u kunt nieuwe attributen ontvangen, ze selectief vrijgeven aan anderen, en ze verbinden aan digitale handtekeningen. IRMA wordt gemaakt en onderhouden door de Stichting Privacy by Design, en is gratis en open-source. ',
    problems: 'Mocht u problemen tegen komen bij het gebruiken van de app zouden wij daar graag van horen.',
    source: 'Broncode',
    more: 'Meer informatie',
  },
  CredentialDashboard: {
    noAttributes: {
      header: 'U heeft nog geen attributen',
      text: 'Als u net geregistreerd heeft bij MijnIRMA kunt u uw eerste attributen ontvangen door op de link te klikken die naar u per e-mail verstuurd is.'
    },
    unenrolled: {
      header: 'Open uw IRMA account',
      text: 'U heeft nog geen IRMA account geopend. U kunt pas attributen ontvangen of vrijgeven nadat u dit gedaan heeft.',
      button: 'Open IRMA account',
    },
    scanQRCode: 'Scan QR Code',
    Header: {
      yourAttributes: 'Uw attributen',
    }
  },
  RepeatedValueForm: {
    noMatch: 'De ingevoerde waardes komen niet overeen.',
  },
  Enrollment: {
    title: 'Open IRMA account',
    shortTitle: 'Open account',
    intro: 'Welkom bij IRMA! Open uw IRMA account door de twee onderstaande stappen uit te voeren.',
    success: 'U heeft nu uw IRMA account geopend. U kunt nu uw persoonlijke attributen laden.',
    finish: 'Klaar',
    step1: {
      header: 'Stap 1: kies een IRMA PIN',
      text: 'Kies een PIN van teminste 5 cijfers. Wanneer u IRMA gebruikt moet u deze PIN telkens invoeren. Als u hem vergeet worden uw attributen onbruikbaar en zult u opnieuw een account moeten openen.',
      label: 'PIN',
      repeatLabel: 'Herhaal PIN',
      invalidMessage: 'Voer een PIN in van tenminste 5 cijfers',
    },
    step2: {
      header: 'Stap 2: Voeg uw e-mailadres toe',
      // text: 'We raden u sterk aan om tenminste één e-mailadres te associeren met uw account. Hiermee kunt u inloggen in uw MijnIRMA omgeving mocht uw telefoon kwijtraken of gestolen worden, zodat u uw IRMA account kan sluiten.',
      text: 'Associeer een e-mailadres met uw account. Hiermee kunt u inloggen in uw MijnIRMA omgeving mocht uw telefoon kwijtraken of gestolen worden, zodat u uw IRMA account kan sluiten.',
      label: 'E-mailadres',
      repeatLabel: 'Herhaal e-mailadres',
      invalidMessage: 'Voer een geldig e-mailadres in',
    },

    // title: 'MijnIRMA registratie',
    // shortTitle: 'Registratie',
    // subtitle: 'Stap {{step}}',
    // next: 'Volgende',
    // finish: 'Klaar',
    // back: 'Terug',
    // notnow: 'Niet nu',
    // stepZero: {
    //   text: 'Welkom bij IRMA!\n\nDe IRMA app beheert uw persoonlijke IRMA attributen: u kunt nieuwe attributen ontvangen, ze selectief aan anderen vrijgeven, en ze gebruiken bij het maken van digitale handtekening,\n\nVoordat u de IRMA app kunt gebruiken moet u zich registreren bij MijnIRMA. Als u uw telefoon dan later kwijt raakt kunt u verder gebruik van uw attributen blokkeren op de MijnIRMA website.\n\nHet registratieproces bestaat uit 4 onderdelen:\n1. Voer uw e-mailadres in\n2. Kies uw IRMA PIN\n3. Klik op de link die naar u wordt ge-emaild.\n4. Scan de QR en ontvang uw eerste attributen!\n\nU kunt de registratie eventueel uitstellen, maar u kan geen attributen ontvangen of vrijgeven totdat u bent geregistreerd.',
    //   note: 'Opmerking',
    //   warning: 'deze versie van de app is nieuw en geheel opnieuw ontwikkeld, en heeft mogelijk nog problemen. Mocht u een probleem tegenkomen horen wij dat graag van u.'
    // },
    // stepOne: {
    //   label: 'E-mailadres',
    //   repeatLabel: 'Herhaal e-mailadres',
    //   invalid: 'Voer een geldig e-mailadres in',
    //   text: 'Voer hieronder uw e-mailadres in.\n\nU kunt dit e-mailadres gebruiken om in te loggen op de MijnIRMA website, en u ontvangt dit e-mailadres als uw eerste attribuut in de laatste stap van de registratie.'
    // },
    // stepTwo: {
    //   label: 'PIN',
    //   repeatLabel: 'Herhaal PIN',
    //   invalid: 'Voer een geldige PIN in van minstens 5 cijfers.',
    //   pleaseEnterPin: 'Voer een PIN in van minstens 5 cijfers.',
    //   important: 'Belangrijk',
    //   rememberPin: 'Het is belangrijk dat u uw PIN onthoudt: u hebt deze iedere keer nodig als u uw IRMA app gebruikt.\n\nAls u uw PIN vergeet kunt u uw attributen niet meer gebruiken, en zal u deze regstratie nogmaals moeten doen.',
    // },
    // stepThree: {
    //   success: 'Uw MijnIRMA registratie is bijna af! Klik tenslotte op de link die naar het e-mailadres\n\n{{email}}\n\n is gestuurd om de registratie af te ronden en uw eerste attributen te ontvangen.',
    //   failure: 'Er is iets mis gegaan bij de registratie. Heeft u een werkende internetverbinding?',
    // }
  },
  EnrollmentTeaser: {
    openAccount: 'Open account',
    notNow: 'Later',
    slide1: {
      statement: 'IRMA is jouw gepersonaliseerde paspoort opgeslagen in je telefoon. Het geeft jou de controle en houdt je persoonlijke data veilig.',
      quote: '"I Reveal My Attributes"'
    },
    slide2: {
      statement: 'Met IRMA onthul je enkel relevante attributen - en verder niets.',
      quote: '"Ik ben ouder dan 18"',
    },
    slide3: {
      statement: 'Met IRMA krijg je toegang zonder wachtwoorden.',
      quote: '"Ik ben het, log me in!"',
    }
  },
  Session: {
    StatusCard: {
      heading: {
        communicating: 'Communiceren met server',
        connected: 'Communiceren met server',
        failure: 'Fout opgetreden',
        cancelled: 'Geannuleerd', // Not normally used
        unsatisfiableRequest: 'Ontbrekende attributen',
        success: 'Gelukt!', // Not normally used
        requestPermission: 'U moet toestemming geven', // Not normally used
        requestDisclosurePermission: 'Deze attributen vrijgeven?',
        requestPin: 'Voer uw IRMA PIN in',
        keyshareEnrollmentMissing: 'Niet geregistreerd bij MijnIRMA',
        keyshareEnrollmentIncomplete: 'IRMA registratie incompleet',
        keyshareBlocked: 'Uw attributen zijn geblokkeerd',
      },
      explanation: {
        requestPin: 'Om uw attributen te gebruiken moet u de PIN invoeren die u tijdens de registratie bij IRMA heeft gekozen.',
        registerMyIrma: 'Registreer bij MijnIRMA',
        keyshareEnrollmentMissing: 'Voordat u attributen kunt ontvangen en vrijgaven moet u zich registeren bij IRMA.',
        keyshareEnrollmentIncomplete: 'U kunt nog geen attributen ontvangen of vrijgeven, omdat u nog niet heeft geklikt op de verificatie-link die naar uw e-mailadres is gestuurd. Klik op deze link en probeer het dan nog eens.',
        keyshareBlocked: 'De sessie is afgebroken en uw attributen zijn tijdelijk geblokkeerd, omdat uw PIN drie keer verkeerd is ingevoerd.\n\nProbeer het nog eens na {{duration}} seconden.',
      },
    },
    IssuanceSession: {
      headerTitle: 'Ontvang attributen',
      requestPermissionHeading: 'Deze attributen ontvangen?',
      requestPermissionExplanation: 'wil attributen aan u uitgeven. Als u akkoord gaat ontvangt u {{attributeAmount}} in {{credentialAmount}}.\n\nDe attributen die u zult ontvangen staan hieronder.',
      requestDisclosurePermission: 'Voordat u de attributen uit het vorige scherm ontvangt vraagt {{issuerName}} of u onderstaande attributen wilt vrijgeven. U moet mogelijk kiezen uit meerdere opties.',
      cancelledHeading: 'Attributen ontvangen geannuleerd',
      successHeading: 'Attributen ontvangen',
      successExplanation: 'U heeft de volgende attributen ontvangen:',
      unsatisfiableRequestExplanation: {
        before: 'Het ontvangen van de attributen is afgebroken, omdat',
        after: 'u vraagt om eerst attributen vrij te geven die u niet heeft. Hieronder ziet u de ontbrekende attributen.',
      },
    },
    DisclosureSession: {
      headerTitle: 'Attributen vrijgeven',
      requestPermissionHeading: 'Deze attributen vrijgeven?',
      requestPermissionExplanation: 'vraagt u onderstaande attributen vrij te geven. U moet mogelijk kiezen uit meerdere opties.',
      cancelledHeading: 'Attributen vrijgeven geannulleerd',
      successHeading: 'Attributen vrijgegeven',
      successExplanation: 'U heeft de volgende attributen vrijgegeven:',
      unsatisfiableRequestExplanation: {
        before: 'Het vrijgeven van de attributen is afgebroken, omdat u niet de attributen heeft waar',
        after: 'om vraagt. Hieronder ziet u de ontbrekende attributen.'
      },
    },
    SigningSession: {
      headerTitle: 'Onderteken met attributen',
      requestPermissionHeading: 'Bericht ondertekenen met attributen?',
      requestPermission: {
        beforeExplanation: 'vraagt u het volgende bericht te ondertekenen:',
        afterExplanation: 'met de volgende attributen:',
      },
      cancelledHeading: 'Tekenen geannuleerd',
      successHeading: 'Bericht ondertekend',
      success: {
        beforeExplanation: 'U heeft het volgende bericht ondertekend:',
        afterExplanation: 'met de volgende attributen:',
      },
      unsatisfiableRequestExplanation: {
        before: 'Tekenen is afgebroken, omdat ',
        after: 'u vraagt dat te doen met attributen die u niet heeft. Hieronder ziet u de ontbrekende attributen.',
      },
    },
    Error: {
      codes: {
        transport: 'Er is iets mis gegaan tijdens de communicatie met de IRMA server.\n\nHeeft u een werkende internetverbinding?',
        keyshareBlocked: 'MijnIRMA heeft het gebruik van uw attributen tijdelijk geblokkeerd omdat uw PIN code drie keer achter elkaar verkeerd is ingevoerd.\n\nU kunt het opnieuw proberen na {{errorInfo}} seconden.',
        protocolVersionNotSupported: 'Kan niet communiceren met de IRMA server omdat deze niet de juiste versie van het IRMA protocol ondersteunt.',
        configurationDownload : 'Er is iets mis gegaan bij het downloaden van de credential-informatie.\n\nHeeft u een werkende internetverbinding?',
        unknownSchemeManager: 'De sessie kan niet worden uitgevoerd omdat de scheme manager "{{errorInfo}}" onbekend is.',
        crypto: 'Er is iets mis gegaan in de IRMA cryptografie.',
        rejected: 'De IRMA server heeft de sessie afgebroken.',
        api: 'De IRMA server heeft de sessie afgebroken.',
        serverResponse: 'Er is iets mis gegaan tijdens de communicatie met de IRMA server.',
        unknownCredentialType: 'De IRMA server gebruikt een onbekend credentialtype.',
        keyshare: 'Er is iets mis gegaan in het MijnIRMA protocol.',
        panic: 'Er is iets mis gegaan in de IRMA software.',
      },
      ifPersistsReport: 'Als dit probleem zich blijft voordoen, meld u dat alstublieft met de knoppen hieronder.',
      ifPersistsEnableReporting: 'Als dit probleem zich voor blijft doen, overweeg dan alstublieft foutrapporten naar IRMA aan te zetten in de voorkeuren van de app.',
      unknown: 'Er heeft zich een onbekend probleem voorgedaan.',
      hideinfo: 'Fout verbergen',
      showinfo: 'Fout tonen',
      explanation: 'Als u dit rapporteert naar IRMA wordt de volgende informatie verzonden:',
      report: 'Stuur naar IRMA',
      reported: 'Verstuurd',
      reportedThanks: 'De fout is gerapporteerd. Bedankt!',
    },
    PinEntry: {
      label: 'IRMA PIN',
      incorrectMessage: 'De ingevoerde PIN was incorrect. U heeft nog {{attempts}} voordat uw account tijdelijk geblokkeerd wordt.',
      attempts: {
        one: '{{count}} poging',
        other: '{{count}} pogingen',
      },
    },
    Footer: { // TODO
      accept: 'Accepteren',
      decline: 'Weigeren',
      next: 'Volgende',
      submit: 'OK',
      cancel: 'Annuleren',
      dismiss: 'OK',
    }
  },
  Sidebar: {
    about: 'Over IRMA',
    preferences: 'Voorkeuren',
    log: 'Toon log',
    moreAttributes: 'Ontvang meer attributen',
    attributes: 'Uw attributen',
    register: 'Registreer bij MijnIRMA',
    deleteAll: {
      menu: 'Alle attributen verwijderen',
      title: 'Alle attributen verwijderen?',
      message: 'Weet u zeker dat u al uw attributen wilt verwijderen?',
      ok: 'Verwijderen',
      cancel: 'Annuleren',
    }
  },
  QRScanner: {
    title: 'Scan IRMA QR',
    invalidQR: 'Dit is niet een geldige IRMA QR.',
  },
  Preferences: {
    title: 'IRMA voorkeuren',
    crashes: {
      title: 'Stuur foutrapport naar IRMA',
      explanation: 'Wanneer de app een ernstig probleem tegenkomt, of wanneer hij crasht, wordt een foutrapport naar de IRMA ontwikkelaars gestuurd. Foutrapporten bevatten nooit uw attributen, maar enkel informatie over uw telefoon en wat er fout is gegaan. Zie onze ',
      privacypolicy: 'privacy policy',
      moreinfo: 'voor meer informatie. Herstart de app om dit effect te laten hebben.',
    },
    schememanagers: {
      title: 'IRMA Scheme Managers',
    }
  },
  CredentialCard: {
    deleteCredential: {
      title: 'Credential "{{credentialName}}" verwijderen?',
      message: 'Weet u zeker dat u het credential "{{credentialName}}" en alle attributen daarvan wilt verwijderen? Dit kan niet worden teruggedraaid.',
      ok: 'Verwijderen',
      cancel: 'Annuleren',
    },
  },
  CollapsableForm: {
    skip: 'Overslaan',
    next: 'Volgende',
  }
};
