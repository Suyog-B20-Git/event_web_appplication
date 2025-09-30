
const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  eventData: []
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EVENT':
      return {
        ...state,
        eventData: action.eventData
      }

    case 'CLONE_EVENT':
      return {
        ...state,
        eventData: action.event
      }

    case 'MAKE_EVENT_PRIVATE':
      return {
        ...state,
        eventData: action.event
      }

    case 'MAKE_EVENT_PUBLIC':
      return {
        ...state,
        eventData: action.event
      }

    default:
      return { ...state }
  }
}
export default eventReducer
