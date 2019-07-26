import _ from 'lodash';

const initialState = {
  loadedLogs: null,
};

export default function logs(state = initialState, action) {
  switch(action.type) {
    case 'IrmaClient.Logs': {
      return {
        ...state,
        loadedLogs: action.loadedLogs,
      };
    }

    default:
      return state;
  }
}
