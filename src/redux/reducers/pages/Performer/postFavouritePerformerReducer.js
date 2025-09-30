const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  favouritePerformerList: [],
};

const addFavouritePerformerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAVOURITE_PERFORMER":
      return {
        ...state,
        favouritePerformerList: [
          ...state.favouritePerformerList,
          action.payload,
        ],
      };
    default:
      return state;
  }
};

export default addFavouritePerformerReducer ;
