const initialState = {
  credentials: [],
  loaded: false,
};

export default function credentials(state = initialState, action) {
  switch(action.type) {
    case 'IrmaClient.Credentials': {
      return {
        ...state,
        loaded: true,
        credentials: action.credentials,
      };
    }

    default:
      return state;
  }
}
