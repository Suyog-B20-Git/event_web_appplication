const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  filterEventData: [],
  totalPages: 0,
};

const getEventByFilterReducer = (state = initialState, action) => {
  console.log("action..:", action);
  switch (action.type) {
    case "GET_EVENT_BY_FILTER":
      return {
        ...state,
        filterEventData: action.filterEventData,
        totalPages: action.totalPages,
      };

    default:
      return { ...state };
  }
};
export default getEventByFilterReducer;
