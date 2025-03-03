const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  eventData: [],
};

const getEventByFilter1Reducer = (state = initialState, action) => {
  console.log("action..:", action);
  switch (action.type) {
    case "GET_EVENT_BY_FILTER1":
      return {
        ...state,
        eventData: action.eventData,
      };

    default:
      return { ...state };
  }
};
export default getEventByFilter1Reducer;
