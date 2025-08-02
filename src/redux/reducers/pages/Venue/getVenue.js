const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  venueData: [],
  totalPages: 0,
};

const getVenueReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_VENUE":
      return {
        ...state,
        venueData: action.venueData,
        totalPages: action.totalPages,
      };
    default:
      return { ...state };
  }
};
export default getVenueReducer;
