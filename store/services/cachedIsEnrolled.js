import AsyncStorage from '@react-native-community/async-storage';

import store from 'store';

const KEY = '@IRMA/cachedIsEnrolled';

const storeCachedIsEnrolled = async() => {

  try {
    const value = await AsyncStorage.getItem(KEY);
    if (value) {
      const cachedIsEnrolled = JSON.parse(value);
      store.dispatch({
        type: 'Navigation.SetCachedIsEnrolled',
        cachedIsEnrolled,
      });

      return;
    }

  } catch (e) {
    // pass
  }

  store.dispatch({
    type: 'Navigation.SetCachedIsEnrolled',
    cachedIsEnrolled: false,
  });
};

const enrollmentStoreListener = () => {
  // TODO: Listen to store to cache that we're enrolled
};

export default () => {
  storeCachedIsEnrolled();
  const unsubscribe = store.subscribe(enrollmentStoreListener);

  return () => {
    unsubscribe();
  };
};