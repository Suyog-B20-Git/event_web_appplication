const initialState = {
    loading: false,
    error: null,
  };
  
  const removeFavouriteOrganizerReducer = (state = initialState, action) => {
    switch (action.type) {
      case "REMOVE_FAVOURITE":
        return { ...state, loading: true };
      case "REMOVE_FAVOURITE_SUCCESS":
        return { ...state, loading: false };
      case "REMOVE_FAVOURITE_FAILURE":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default removeFavouriteOrganizerReducer;
  