const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  venue: [],
};

const postVenueReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_VENUE":
      return { ...state, venue: action.payload };
    default:
      return state;
  }
};

export default postVenueReducer;
