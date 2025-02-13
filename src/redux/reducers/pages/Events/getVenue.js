const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  venues: [],
};

const venuesReducer = (state = initialState, action) => {
  console.log("action..:", action);
  switch (action.type) {
    case "GET_VENUE":
      return {
        ...state,
        venues: action.venues,
      };

    default:
      return { ...state };
  }
};
export default venuesReducer;
