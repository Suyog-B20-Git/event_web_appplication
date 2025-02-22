
const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    serviceData: []
  }
  
  const getServiceByIdReducer = (state = initialState,action) => {
    console.log("action..:",action)
    switch (action.type) {
      case 'GET_SERVICE_BY_ID':
        return {
          ...state,
          serviceData: action.serviceData
        }
  
      default:
        return {...state}
    }
  }
  export default getServiceByIdReducer
  