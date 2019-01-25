import I18n from 'i18n-js';

import en from './en';
import nl from './nl';

I18n.fallbacks = true;
I18n.translations = {en, nl};

export const t = I18n.t;

export const commonT = (scope, options) => {
  return I18n.t(['common', scope].join('.'), options);
};

export const namespacedTranslation = (namespace) => {
  return (scope, options = {}) => {
    if(scope[0] !== '.')
      return I18n.t(scope, options);

    scope = scope.substring(1);
    options = {
      ...options,
      defaults: (options.defaults || []).map(d =>
        d.scope ? {scope: [namespace, d.scope].join('.')} : d
      )
    };

    return I18n.t([namespace, scope].join('.'), options);
  };
};

export const getLocale = () => {
  return I18n.currentLocale();
};

export const getLanguage = () => { // TODO: Remove all occurrences of getLanguage with language, then unexport this
  const lang = I18n.currentLocale().slice(0, 2);

  // A language must be made available in both the app and in the scheme manager
  // Only English and Dutch are supported at the moment
  if (lang !== 'en' && lang !== 'nl')
    return 'en';

  return lang;
};

// iOS will kill the app on system language change, but Android will not
// We currently only support changing language by restarting the app
export const lang = getLanguage();

export default I18n;
