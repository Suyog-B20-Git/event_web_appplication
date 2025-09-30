
const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    favouritePerformerData: []
  };
  
  const getFavoritePerformerReducer = (state = initialState,action) => {
    switch (action.type) {
      case 'GET_FAVOURITE_PERFORMER':
        return {
          ...state,
          favouritePerformerData: action.payload
        };
  
      default:
        return {...state}
    }
  };
  export default getFavoritePerformerReducer
  