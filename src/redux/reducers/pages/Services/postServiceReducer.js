const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  service: [],
};

const postServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_SERVICE":
      return { ...state, service: action.payload };
    default:
      return state;
  }
};

export default postServiceReducer;
