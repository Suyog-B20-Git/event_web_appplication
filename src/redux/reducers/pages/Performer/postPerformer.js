const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  performer: [],
};

const postPerformerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_PERFORMER":
      return { ...state, performer: action.payload };
    default:
      return state;
  }
};

export default postPerformerReducer;
