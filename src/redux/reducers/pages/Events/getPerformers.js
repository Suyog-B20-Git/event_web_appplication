const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  performers: [],
};

const performersReducer = (state = initialState, action) => {
  console.log("action..:", action);
  switch (action.type) {
    case "GET_PERFORMER":
      return {
        ...state,
        performers: action.performers,
      };

    default:
      return { ...state };
  }
};
export default performersReducer;
