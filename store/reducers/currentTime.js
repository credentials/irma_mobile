import moment from 'moment';

const initialState = {
  currentTime: moment()
};

export default function currentTime(state = initialState, action) {
  switch (action.type) {
    case 'CurrentTime.Update':
      return {
        ...state,
        currentTime: action.currentTime,
      };
    default:
      return state;
  }
}
