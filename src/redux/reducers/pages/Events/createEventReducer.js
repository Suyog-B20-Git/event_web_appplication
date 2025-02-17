const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  event: [],
};

const createEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_EVENT":
      return { ...state, event: action.event };
    default:
      return state;
  }
};

export default createEventReducer;
