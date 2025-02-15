
const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    organizerData: []
  }
  
  const getOrganizerByIdReducer = (state = initialState,action) => {
    console.log("action..:",action)
    switch (action.type) {
      case 'GET_ORGANIZER_BY_ID':
        return {
          ...state,
          organizerData: action.organizerData
        }
  
      default:
        return {...state}
    }
  }
  export default getOrganizerByIdReducer
  