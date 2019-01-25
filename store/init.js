import { NativeModules, NativeEventEmitter } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import irmaBridgeMiddleware from './middlewares/irmaBridge';
import rootReducer from './reducers/root';

import moment from 'moment';

// Create a global counter per app instantiation for Session identifiers
// Include a random starting point so we can discern errors in subsequent sessions
let counter = Math.floor(Math.random() * 1000000000);
global.getAutoIncrementId = () => {
  return counter++;
};

export default () => {
  // Create Redux store
  const middleware = [thunk, irmaBridgeMiddleware];
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  const store = createStoreWithMiddleware(rootReducer);

  // Prepare to receive events and start bridge. Never bother to unsubscribe,
  // as we want to keep listening for as long as the app is alive
  const irmaBridge = new NativeEventEmitter(NativeModules.IrmaBridge);

  irmaBridge.addListener('irmago', actionJson => {
    const action = JSON.parse(actionJson);

    if(__DEV__)
      console.log('Received action from bridge:', action); // eslint-disable-line no-console

    store.dispatch(action);
  });

  irmaBridge.addListener('log', logLine => {
    if(__DEV__)
      console.log('Go debug logger: ', logLine); // eslint-disable-line no-console
  });

  NativeModules.IrmaBridge.start();

  //Prepare time events
  setInterval(() => {
    store.dispatch({
      type: 'CurrentTime.Update',
      currentTime: moment(),
    });
  }, 60*1000);

  return store;
};
