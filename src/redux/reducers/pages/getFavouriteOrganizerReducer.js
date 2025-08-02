
const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    favouriteOrganizerData: []
  }
  
  const getFavoriteOrganizerReducer = (state = initialState,action) => {
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
  