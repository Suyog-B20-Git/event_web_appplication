const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    favouriteServiceList: [],
  };
  
  const addFavouriteServiceReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_FAVOURITE_SERVICE":
        return {
          ...state,
          favouriteServiceList: [
            ...state.favouriteServiceList,
            action.payload,
          ],
        };
      default:
        return state;
    }
  };
  
  export default addFavouriteServiceReducer ;
  