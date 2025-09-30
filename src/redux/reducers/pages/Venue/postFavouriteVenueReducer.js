const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    favouriteVenueList: [],
  };
  
  const addFavouriteVenueReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_FAVOURITE_PERFORMER":
        return {
          ...state,
          favouriteVenueList: [
            ...state.favouriteVenueList,
            action.payload,
          ],
        };
      default:
        return state;
    }
  };
  
  export default addFavouriteVenueReducer;
  