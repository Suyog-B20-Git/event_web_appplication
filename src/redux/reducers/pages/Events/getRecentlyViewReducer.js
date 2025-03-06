const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  eventData: [],
};

const getRecentlyViewReducer = (state = initialState, action) => {
  console.log("action..:", action);
  switch (action.type) {
    case "GET_RECENTLY_VIEW":
      return {
        ...state,
        eventData: action.eventData,
      };

    default:
      return { ...state };
  }
};
export default getRecentlyViewReducer;
