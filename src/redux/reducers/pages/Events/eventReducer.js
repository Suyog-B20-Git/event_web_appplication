
const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  eventData: []
}

const eventReducer = (state = initialState,action) => {
  switch (action.type) {
    case 'GET_EVENT':
      return {
        ...state,
        eventData: action.eventData
      }

    default:
      return {...state}
  }
}
export default eventReducer
