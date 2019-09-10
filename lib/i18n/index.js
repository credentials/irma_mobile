import I18n from 'i18n-js';
import RNLanguages from 'react-native-languages';

import en from './en';
import nl from './nl';

I18n.fallbacks = true;
I18n.translations = {en, nl};

export const t = I18n.t;

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

const getLanguage = () => {
  const lang = RNLanguages.language.slice(0, 2);

  // A language must be made available in both the app and in the scheme manager
  // Only English and Dutch are supported at the moment
  if (lang !== 'en' && lang !== 'nl')
    return 'en';

  return lang;
};

// iOS will kill the app on system language change, but Android will not
// We currently only support changing language by restarting the app
I18n.locale = getLanguage();
export const lang = getLanguage();

export default I18n;
