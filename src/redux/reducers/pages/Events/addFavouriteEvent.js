const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  favouriteEventList: [],
};

const addFavouriteEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAVOURITE_EVENT":
      return {
        ...state,
        favouriteEventList: [
          ...state.favouriteEventList,
          action.payload,
        ],
      };
    default:
      return state;
  }
};

export default addFavouriteEventReducer;
