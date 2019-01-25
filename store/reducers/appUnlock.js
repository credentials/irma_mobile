const initialState = {
  status: 'locked',
  hadFailure: false,
};

export default function appUnlock(state = initialState, action) {
  switch (action.type) {
    case 'IrmaBridge.Authenticate': {
      return {
        ...state,
        status: 'unlocking',
        hadFailure: false,
      };
    }

    case 'IrmaClient.AuthenticateSuccess': {
      return {
        ...state,
        status: 'unlocked',
      };
    }

    case 'IrmaClient.AuthenticateFailure': {
      return {
        ...state,
        status: 'locked',
        hadFailure: true,
      };
    }

    default:
      return state;
  }
}