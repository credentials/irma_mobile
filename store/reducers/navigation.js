const initialState = {
  initialSessionPointerLoaded: false,
  initialSessionPointer: null,
};

export default function navigation(state = initialState, action) {
  switch (action.type) {
    case 'Navigation.SetInitialSessionPointer': {
      return {
        ...state,
        initialSessionPointerLoaded: true,
        initialSessionPointer: action.initialSessionPointer,
      };
    }

    default:
      return state;
  }
}