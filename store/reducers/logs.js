import _ from 'lodash';

const initialState = {
  logs: [],
  loaded: false,
};

export default function logs(state = initialState, action) {
  switch(action.type) {
    case 'IrmaClient.Logs': {
      return {
        ...state,
        loaded: true,
        logs: action.logs, //_.zip(action.logs, action.zipit).map(([a,b]) => ({...a, ...b})),
      };
    }

    default:
      return state;
  }
}
