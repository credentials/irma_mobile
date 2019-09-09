import appState from './appState';
import irmaBridge from './irmaBridge';
import linking from './linking';
import minimumVersion from './minimumVersion';
import cachedIsEnrolled from './cachedIsEnrolled';
import sentry from './sentry';
import time from './time';

const services = [
  sentry,
  cachedIsEnrolled,
  irmaBridge,

  time,
  appState,
  linking,
  minimumVersion,
];

export default () => {
  const unsubscriptions = services.map( service =>
    service()
  );

  return () => {
    unsubscriptions.forEach( unsubscription =>
      unsubscription()
    );
  };
};

