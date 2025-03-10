
const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    favouriteOrganizerData: []
  }
  
  const getFavoriteOrganizerReducer = (state = initialState,action) => {
    // console.log("fav org list ..:",action.payload)
    switch (action.type) {
      case 'GET_FAVOURITE_ORGANIZER':
        return {
          ...state,
          favouriteOrganizerData: action.payload
        }
  
      default:
        return {...state}
    }
  }
  export default getFavoriteOrganizerReducer 
  