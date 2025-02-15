const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    locations: [],
  };
  
  const locationsReducer = (state = initialState, action) => {
    console.log("action..:", action);
    switch (action.type) {
      case "GET_LOCATION":
        return {
          ...state,
          locations: action.locations,
        };
  
      default:
        return { ...state };
    }
  };
  export default locationsReducer;
  