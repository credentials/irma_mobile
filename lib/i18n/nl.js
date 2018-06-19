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
  RootContainer: {
    sessionErrorTitle: 'Fout bij starten IRMA-sessie:',
    dismiss: 'OK',
    errorReadFile: 'Kon het bestand niet openen.',
    errorNoMailClient: 'Er is geen mail-app geconfigureerd. Configureer een mail-app en probeer opnieuw.',
    errorInvalidSignatureRequest: 'Dit is geen geldig IRMA-handtekeningverzoek.',
  },
  About: {
    title: 'Over IRMA',
    header: 'Simpele, privacy-vriendelijke en veilige authenticatie',
    about: 'De IRMA app beheert uw persoonlijke IRMA attributen: u kunt nieuwe attributen ontvangen, ze selectief vrijgeven aan anderen, en ze verbinden aan digitale handtekeningen. IRMA wordt gemaakt en onderhouden door de Stichting Privacy by Design, en is gratis en open-source. ',
    problems: 'Mocht u problemen tegenkomen bij het gebruiken van de app zouden wij daar graag van horen.',
    source: 'Broncode',
    more: 'Meer informatie',
    attributions: 'De achtergrondafbeeldingen van de drie introductieschermen zijn gemaakt door Lexamer, Photoroyalty en Blossomstar respectievelijk.',
  },
  CredentialDashboard: {
    noAttributes: {
      header: 'U heeft nog geen attributen',
      text: ''
    },
    unenrolled: {
      header: 'Open uw IRMA account',
      text: 'U heeft nog geen IRMA account geopend. U kunt pas attributen ontvangen of vrijgeven nadat u dit gedaan heeft.',
      button: 'Open IRMA account',
    },
    scanQRCode: 'Scan QR code',
    Header: {
      yourAttributes: 'Uw attributen',
    }
  },
  RepeatedValueForm: {
    noMatch: 'De ingevoerde waardes komen niet overeen.',
  },
  ChangePin: {
    title: 'Verander IRMA PIN',
    shortTitle: 'Verander PIN',
    intro: 'Voer alstublieft uw oude PIN in, en kies een nieuwe PIN van ten minste 5 cijfers. Wanneer u IRMA gebruikt moet u deze PIN telkens invoeren. Als u hem vergeet worden uw attributen onbruikbaar en zult u opnieuw een account moeten openen.',
    oldPinLabel: 'Huidige PIN',
    newPinLabel: 'Nieuwe PIN',
    newPinRepeatLabel: 'Herhaal nieuwe PIN',
    doChange: 'Verander',
    success: 'Uw PIN is aangepast.',
    changing: 'PIN aan het veranderen...',
    failure: 'Er is iets misgegaan',
    pinError: 'De ingevoerde huidige PIN was incorrect. U heeft nog {{attempts}} voordat uw account tijdelijk geblokkeerd wordt.',
    pinBlocked: 'De PIN verandering is afgebroken en uw attributen zijn tijdelijk geblokkeerd, omdat uw PIN drie keer verkeerd is ingevoerd.\n\nProbeer het nog eens na {{duration}} seconden.',
    attempts: {
      one: '{{count}} poging',
      other: '{{count}} pogingen',
    },
  },
  Enrollment: {
    title: 'Open IRMA account',
    shortTitle: 'Open account',
    intro: 'Welkom bij IRMA! Open hieronder uw IRMA account in twee stappen.',
    enrolling: 'IRMA account aan het openen...',
    success: 'Uw IRMA account is succesvol geopend. U kunt nu uw persoonlijke attributen laden.',
    failure: 'Er is iets misgegaan',
    finish: 'Klaar',
    retry: 'Opnieuw proberen',
    step1: {
      header: 'Stap 1: kies een IRMA PIN',
      text: 'Kies een PIN van tenminste 5 cijfers. Wanneer u IRMA gebruikt moet u deze PIN telkens invoeren. Als u hem vergeet worden uw attributen onbruikbaar en zult u opnieuw een account moeten openen.',
      label: 'PIN',
      repeatLabel: 'Herhaal PIN',
      invalidMessage: 'Voer een PIN in van tenminste 5 cijfers',
    },
    step2: {
      header: 'Stap 2: Koppel uw e-mailadres',
      text: 'Koppel een e-mailadres aan uw account. Dit is niet verplicht, maar wordt wel sterk aangeraden. Hiermee kunt u inloggen op MijnIRMA om uw account te verwijderen, in het geval dat uw telefoon gestolen wordt of kwijt raakt.',
      label: 'E-mailadres',
      repeatLabel: 'Herhaal e-mailadres',
      invalidMessage: 'Voer een geldig e-mailadres in',
    },
  },
  EnrollmentTeaser: {
    openAccount: 'Open account',
    notNow: 'Niet nu',
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
        manualStarted: 'Handtekeningverzoek wordt gestart...',
        requestPermission: 'U moet toestemming geven', // Not normally used
        requestDisclosurePermission: 'Deze attributen vrijgeven?',
        requestPin: 'Voer uw IRMA PIN in',
        keyshareEnrollmentMissing: 'Geen IRMA account geopend',
        keyshareEnrollmentDeleted: 'IRMA account is verwijderd',
        keyshareBlocked: 'Uw attributen zijn geblokkeerd',
      },
      explanation: {
        requestPin: 'Voer hieronder uw IRMA PIN in om uw attributen te gebruiken.',
        registerMyIrma: 'IRMA account openen',
        keyshareEnrollmentMissing: 'Voordat u attributen kunt ontvangen en vrijgeven moet u een IRMA account openen.',
        keyshareEnrollmentDeleted: 'De sessie is afgebroken omdat uw IRMA account is verwijderd, en uw attributen permanent zijn geblokkeerd.',
        keyshareBlocked: 'De sessie is afgebroken en uw attributen zijn tijdelijk geblokkeerd, omdat uw PIN drie keer verkeerd is ingevoerd.\n\nProbeer het nog eens na {{duration}} seconden.',
      },
    },
    IssuanceSession: {
      headerTitle: 'Ontvang attributen',
      requestPermissionHeading: 'Deze attributen ontvangen?',
      requestPermissionExplanation: ' wil attributen aan u uitgeven. Als u akkoord gaat ontvangt u {{attributeAmount}} in {{credentialAmount}}.\n\nDe attributen die u zult ontvangen staan hieronder.',
      requestDisclosurePermission: 'Voordat u de attributen uit het vorige scherm ontvangt, moet u onderstaande attributen vrijgeven aan {{serverName}}. U moet mogelijk kiezen uit meerdere opties.',
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
      cancelledHeading: 'Attributen vrijgeven geannuleerd',
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
        beforeExplanation: 'U wordt verzocht om het volgende bericht te ondertekenen:',
        afterExplanation: 'met de volgende attributen:',
      },
      cancelledHeading: 'Ondertekenen geannuleerd',
      successHeading: 'Bericht ondertekend',
      success: {
        beforeExplanation: 'U heeft het volgende bericht ondertekend:',
        afterExplanation: 'met de volgende attributen:',
      },
      unsatisfiableRequestExplanation: 'Ondertekenen is afgebroken, omdat u gevraagd wordt dat te doen met attributen die u niet heeft. Hieronder ziet u de ontbrekende attributen.',
    },
    PinEntry: {
      label: 'IRMA PIN',
      incorrectMessage: 'De ingevoerde PIN was incorrect. U heeft nog {{attempts}} voordat uw account tijdelijk geblokkeerd wordt.',
      attempts: {
        one: '{{count}} poging',
        other: '{{count}} pogingen',
      },
    },
    Footer: {
      accept: 'OK',
      decline: 'Weigeren',
      next: 'Volgende',
      submit: 'OK',
      cancel: 'Annuleren',
      dismiss: 'OK',
      send: 'Versturen',
    }
  },
  Sidebar: {
    about: 'Over IRMA',
    preferences: 'Voorkeuren',
    log: 'Toon log',
    moreAttributes: 'Ontvang meer attributen',
    attributes: 'Uw attributen',
    register: 'Open IRMA account',
    changePin: 'Verander IRMA pin',
    deleteAll: {
      menu: 'IRMA account verwijderen',
      title: 'IRMA account verwijderen?',
      message: 'Weet u zeker dat u al uw IRMA account en alle attributen permanent wilt verwijderen?',
      ok: 'Verwijderen',
      cancel: 'Annuleren',
    }
  },
  QRScanner: {
    title: 'Scan IRMA QR',
    invalidQR: 'Dit is niet een geldige IRMA QR.',
    scan: 'Scan',
  },
  Preferences: {
    title: 'IRMA voorkeuren',
    errors: {
      title: 'Stuur foutrapport naar IRMA',
      explanation: 'Stuur een foutrapport naar de IRMA ontwikkelaars wanneer de app een ernstig probleem tegenkomt of crasht. Foutrapporten bevatten nooit uw attributen, maar enkel informatie over uw telefoon en wat er fout is gegaan. Zie onze ',
      privacypolicy: 'privacy policy',
      moreinfo: 'voor meer informatie. Herstart de app om deze keuze effect te laten hebben.',
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
    expires: 'Verloopt op',
  },
  CollapsableForm: {
    skip: 'Overslaan',
    next: 'Volgende',
  },
  Mail: {
    subject: 'IRMA handtekening',
    body: 'Zie de bijlage voor een IRMA handtekening.',
  },
  ErrorCard: {
    types: {
      transport: 'Er is iets misgegaan tijdens de communicatie met de IRMA server.\n\nHeeft u een werkende internetverbinding?',
      keyshareBlocked: 'MijnIRMA heeft het gebruik van uw attributen tijdelijk geblokkeerd omdat uw PIN code drie keer achter elkaar verkeerd is ingevoerd.\n\nU kunt het opnieuw proberen na {{errorInfo}} seconden.',
      protocolVersionNotSupported: 'Kan niet communiceren met de IRMA server omdat deze niet de juiste versie van het IRMA protocol ondersteunt.',
      configurationDownload : 'Er is iets misgegaan bij het downloaden van de credential-informatie.\n\nHeeft u een werkende internetverbinding?',
      unknownSchemeManager: 'De sessie kan niet worden uitgevoerd omdat de scheme manager "{{errorInfo}}" onbekend is.',
      crypto: 'Er is iets misgegaan in de IRMA cryptografie.',
      rejected: 'De IRMA server heeft de sessie afgebroken.',
      api: 'De IRMA server heeft de sessie afgebroken.',
      serverResponse: 'Er is iets misgegaan tijdens de communicatie met de IRMA server.',
      unknownCredentialType: 'De IRMA server gebruikt een onbekend credentialtype.',
      keyshare: 'Er is iets misgegaan in het MijnIRMA protocol.',
      panic: 'Er is iets misgegaan in de IRMA software.',
    },
    ifPersistsReport: 'Als dit probleem zich blijft voordoen, meldt u dat alstublieft met de knoppen hieronder.',
    ifPersistsEnableReporting: 'Als dit probleem zich voor blijft doen, overweeg dan alstublieft foutrapporten naar IRMA aan te zetten in de voorkeuren van de app.',
    unknown: 'Er heeft zich een onbekend probleem voorgedaan.',
    hideinfo: 'Verbergen',
    showinfo: 'Fout tonen',
    explanation: 'Als u dit foutrapport naar IRMA stuurt, wordt de volgende informatie verzonden:',
    report: 'Stuur naar IRMA',
    reported: 'Verstuurd',
    reportedThanks: 'De fout is gerapporteerd. Bedankt!',
  },
};
