import RNFetchBlob from 'react-native-fetch-blob';
import Mailer from 'react-native-mail';
  
// TODO: check on iOS!
function saveResult(result) {
    const dir = RNFetchBlob.fs.dirs['SDCardDir'] + '/irma_signature';
    return RNFetchBlob.fs.writeFile(dir, result, 'utf8')
      .then(() => dir);
  }

export function sendMail(result) {
  saveResult(result)
    .then(path => {
      Mailer.mail({ // TODO: Get this info from somewhere?
        subject: 'IRMA signature response',
        body: 'Attached you\'ll find the IRMA signature for your IRMA signature request.',
        isHTML: false,
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
