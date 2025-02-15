const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    states: [],
  };
  
  const statesReducer = (state = initialState, action) => {
    console.log("action..:", action);
    switch (action.type) {
      case "GET_STATE":
        return {
          ...state,
          states: action.states,
        };
  
      default:
        return { ...state };
    }
  };
  export default statesReducer;
  