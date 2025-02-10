const initialState = {
    data: [],
    loading:false,
    error: null
  }

  const eventReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_EVENT":
        return { ...state, data: action.payload, loading: false };
  
      case "CREATE_ORGANIZER_FAIL":
        return { ...state, error: action.payload, loading: false };
  
      default:
        return state;
    }
  };
  
  export default eventReducer;