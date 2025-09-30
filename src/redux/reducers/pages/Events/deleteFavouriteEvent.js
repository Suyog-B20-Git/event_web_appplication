const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  deletedFavouriteEventList: [],
};

const deleteFavouriteEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_FAVOURITE_EVENT":
      return {
        ...state,
        deletedFavouriteEventList: action.payload,
        // deletedFavouriteEventList: [...state.deletedFavouriteEventList, action.payload],
      };
    default:
      return state;
  }
};

export default deleteFavouriteEventReducer;
