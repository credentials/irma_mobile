import moment from 'moment';

const initialState = {
  reftime: moment()
};

export default function currentTime(state = initialState, action) {
  switch(action.type) {
    case 'CurrentTime.Update':
      return {
        ...state,
        reftime: action.reftime,
      };
    default:
      return state;
  }
}
