const initialState = {
  searchQuery: '',
};

export default function credentialTypeDashboard(state = initialState, action) {
  switch (action.type) {
    case 'CredentialTypeDashboard.Search': {
      return {
        ...state,
        searchQuery: action.searchQuery,
      };
    }

    default:
      return state;
  }
}
