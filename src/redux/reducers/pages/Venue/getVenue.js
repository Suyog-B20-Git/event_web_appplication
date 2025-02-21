const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    venueData: [],
  };
  
  const getVenueReducer = (state = initialState, action) => {
    console.log("action..:", action);
    switch (action.type) {
     
      case "GET_VENUE":
        return {
          ...state,
          venueData:
            action.pageNo === 1
              ? action.venueData
              : [...state.venueData, ...action.venueData],
        };
  
      default:
        return { ...state };
    }
  };
  export default getVenueReducer;