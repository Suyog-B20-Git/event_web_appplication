
const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    organizerData: []
  }
  
  const getOrganizerReducer = (state = initialState,action) => {
    console.log("action..:",action)
    switch (action.type) {
      case 'GET_ORGANIZER':
        return {
          ...state,
          organizerData: action.organizerData
        }
  
      default:
        return {...state}
    }
  }
  export default getOrganizerReducer
  