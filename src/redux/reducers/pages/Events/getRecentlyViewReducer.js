const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  recentEventData: [],
};

const getRecentlyViewReducer = (state = initialState, action) => {
  console.log("action..:", action);
  switch (action.type) {
    case "GET_RECENTLY_VIEW":
      return {
        ...state,
        recentEventData: action.recentEventData,
      };

    default:
      return { ...state };
  }
};
export default getRecentlyViewReducer;
