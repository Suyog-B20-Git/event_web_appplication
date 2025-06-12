const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  upcomingEventData: [],
};

const upcomingEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_UPCOMING_EVENT":
      return {
        ...state,
        upcomingEventData: action.eventData,
      };

    default:
      return { ...state };
  }
};
export default upcomingEventReducer;
