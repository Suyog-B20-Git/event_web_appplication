const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    featuredEventData: [],
  };
  
  const featuredEventReducer = (state = initialState, action) => {
    console.log("action..:", action);
    switch (action.type) {
      case "GET_FEATURED_EVENT":
        return {
          ...state,
          featuredEventData: action.eventData,
        };
  
      default:
        return { ...state };
    }
  };
  export default featuredEventReducer;
  