const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    filterEventData: [],
  };
  
  const getEventByFilterReducer = (state = initialState, action) => {
    console.log("action..:", action);
    switch (action.type) {
      case "GET_EVENT_BY_FILTER":
        return {
          ...state,
          filterEventData : action.filterEventData,
        };
  
      default:
        return { ...state };
    }
  };
  export default getEventByFilterReducer;
  