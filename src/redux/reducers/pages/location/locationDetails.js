const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  locationDetails: [],
};

const locationDetailsReducer = (state = initialState, action) => {
  console.log("action..:", action);
  switch (action.type) {
    case "GET_LOCATION_DETAILS":
      return {
        ...state,
        locationDetails: action.locationDetails,
      };

    default:
      return { ...state };
  }
};
export default locationDetailsReducer;
