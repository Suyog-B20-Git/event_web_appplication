const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
};

const createEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_EVENT":
      return { ...state,event: action.payload };
    default:
      return state;
  }
};

export default createEventReducer;
