
const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    performerData: []
  }
  
  const getPerformerByIdReducer = (state = initialState,action) => {
    console.log("action..:",action)
    switch (action.type) {
      case 'GET_PERFORMER_BY_ID':
        return {
          ...state,
          performerData: action.performerData
        }
  
      default:
        return {...state}
    }
  }
  export default getPerformerByIdReducer
  