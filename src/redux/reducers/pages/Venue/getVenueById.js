
const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    venueData: []
  }
  
  const getVenueByIdReducer = (state = initialState,action) => {
    console.log("action..:",action)
    switch (action.type) {
      case 'GET_VENUE_BY_ID':
        return {
          ...state,
          venueData: action.venueData
        }
  
      default:
        return {...state}
    }
  }
  export default getVenueByIdReducer
  