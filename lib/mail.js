import RNFetchBlob from 'react-native-fetch-blob';
import { RNMail } from 'NativeModules';

// TODO: check on iOS!
function saveResult(result) {
    // TODO: unique name for saving?
    const dir = RNFetchBlob.fs.dirs['SDCardDir'] + '/irma_signature';
    return RNFetchBlob.fs.writeFile(dir, result, 'utf8')
      .then(() => dir);
  }

// TODO: check if this works on iOS
export function sendMail(result, request) {
  saveResult(result)
    .then(path => {
      RNMail.mail({
        subject: 'IRMA signature response',
        body: 'Attached you\'ll find the IRMA signature for your IRMA signature request.',
        isHTML: false,
        recipients: [request.from],
        attachment: {
          path: path,
          type: 'text/plain',
        },
      }, () => {
        // if (error == 'not_available') {
        //   TODO: show info that no mail apps are installed
        // }
      });
    });
}

// Checks whether there is a mailclient configured on the phone
// TODO: check iOS!
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
