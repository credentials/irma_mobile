import { NativeModules, AsyncStorage } from 'react-native';
const { IrmaBridge } = NativeModules;

AsyncStorage.setItem('pin', '12345');
let remainingAttempts = 4;

// Dispatch the action to IrmaBridge _after_ the action has been dispatched through all reducers
export default (store) => next => action => {
  const result = next(action);

  console.log('Action:', action);

  if (
      typeof action === 'object' &&
      typeof action.type === 'string' &&
      action.type.substring(0, 11) === 'IrmaBridge.'
  ) {
    if (__DEV__) {
      // console.log('Sending action to bridge:', action); // eslint-disable-line no-console
    }

    if (action.type.substring(11) === 'Authenticate') {
      console.log('Setting timeout');
      setTimeout(async() => {
        console.log('Before getItem');
        let storedPin;
        try {
          storedPin = await AsyncStorage.getItem('pin');
        } catch(e) {
          console.log('Failed getItem', e);
          return result;
        }
        console.log('After getItem');
        if (action.pin === storedPin) {
          store.dispatch({type: 'IrmaClient.AuthenticateSuccess'});
        } else {
          remainingAttempts -= 1;
          store.dispatch({type: 'IrmaClient.AuthenticateFailure', remainingAttempts});
        }
      }, 1000);
      return result;
    }

    IrmaBridge.dispatch(
      JSON.stringify({
        ...action,
        type: action.type.substring(11),
      })
    );
  }

  return result;
};
