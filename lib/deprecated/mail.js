import { RNMail } from 'NativeModules';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

import { namespacedTranslation } from 'lib/i18n';
const t = namespacedTranslation('Mail');

function saveResult(result) {
    // TODO: unique name for saving?
    const dest = ( Platform.OS === 'ios' ? RNFS.TemporaryDirectoryPath : RNFS.ExternalDirectoryPath+'/' ) + 'irma_signature.irmasignature';
    return RNFS.writeFile(dest, result, 'utf8').then(() => dest);
  }

export function sendMail(result, request) {
  saveResult(result)
    .then(path => {
      RNMail.mail({
        subject: t('.subject'),
        body: t('.body'),
        isHTML: false,
        recipients: [request.from],
        attachment: {
          path: path,
          type: 'json',
        },
      }, () => {
        // if (error == 'not_available') {
        //   TODO: show info that no mail apps are installed
        // }
      });
    });
}

// Checks whether there is a mailclient configured on the phone
export function canSendMail() {
  return new Promise((resolve,reject) => {
    RNMail.canSend((error, result) => {
      if (error || !result) {
        reject();
      } else {
        resolve();
      }
    });
  });
}
