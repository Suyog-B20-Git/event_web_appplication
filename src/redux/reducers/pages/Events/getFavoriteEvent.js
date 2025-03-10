
const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    favouriteEventData: []
  }
  
  const getFavoriteEventReducer = (state = initialState,action) => {
    console.log("fav events list ..:",action.payload)
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
  