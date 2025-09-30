
const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    favouriteEventData: []
  }
  
  const getFavoriteEventReducer = (state = initialState,action) => {
    switch (action.type) {
      case 'GET_FAVOURITE_EVENT':
        return {
          ...state,
          favouriteEventData: action.payload
        }
  
      default:
        return {...state}
    }
  }
  export default getFavoriteEventReducer 
  