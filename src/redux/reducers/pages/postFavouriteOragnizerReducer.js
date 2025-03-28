const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  favouriteOragnizerList: [],
};

const addFavouriteOragnizerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAVOURITE_ORGANIZER":
      return {
        ...state,
        favouriteOragnizerList: [
          ...state.favouriteOragnizerList,
          action.payload,
        ],
      };
    default:
      return state;
  }
};

export default addFavouriteOragnizerReducer;

