
const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    eventData: []
  }
  
  const getEventByIdReducer = (state = initialState,action) => {
    console.log("action..:",action)
    switch (action.type) {
      case 'GET_EVENT_BY_ID':
        return {
          ...state,
          eventData: action.eventData
        }
  
      default:
        return {...state}
    }
  }
  export default getEventByIdReducer
  