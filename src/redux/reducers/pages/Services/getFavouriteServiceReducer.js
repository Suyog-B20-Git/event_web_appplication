
const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    favouriteServiceData: []
  }
  
  const getFavouriteServiceReducer = (state = initialState,action) => {
    // console.log("fav org list ..:",action.payload)
    switch (action.type) {
      case 'GET_FAVOURITE_SERVICE':
        return {
          ...state,
          favouriteServiceData: action.payload
        }
  
      default:
        return {...state}
    }
  }
  export default getFavouriteServiceReducer
  