import moment from 'moment';

import store from 'store';

// Tick the store every minute
export default () => {
  const intervalId = setInterval(() => {
    store.dispatch({
      type: 'CurrentTime.Update',
      currentTime: moment(),
    });
  }, 60 * 1000);

  return () => {
    clearInterval(intervalId);
  };
};