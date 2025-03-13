const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  favouriteVenueData: [],
};

const getFavouriteVenueReducer = (state = initialState, action) => {
  // console.log("fav org list ..:",action.payload)
  switch (action.type) {
    case "GET_FAVOURITE_VENUE":
      return {
        ...state,
        favouriteVenueData: action.payload,
      };

    default:
      return { ...state };
  }
};
export default getFavouriteVenueReducer;
