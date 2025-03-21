const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  serviceData: [],
  totalPages: 0,
};

const getServiceReducer = (state = initialState, action) => {
  console.log("action..:", action);
  switch (action.type) {
    case "GET_SERVICE":
      return {
        ...state,
        serviceData: action.serviceData,
        totalPages: action.totalPages,
      };

    // case "GET_SERVICE":
    //   return {
    //     ...state,
    //     serviceData:
    //       action.pageNo === 1
    //         ? action.serviceData
    //         : [...state.serviceData, ...action.serviceData],
    //   };

    default:
      return { ...state };
  }
};
export default getServiceReducer;
