const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  performerData: [],
  totalPages:0
};

const getPerformerReducer = (state = initialState, action) => {
  console.log("action..:", action);
  switch (action.type) {
    case "GET_PERFORMER":
      return {
        ...state,
        performerData: action.performerData,
        totalPages:action.totalPages

      };
    // case "GET_PERFORMER":
    //   return {
    //     ...state,
    //     performerData:
    //       action.pageNo === 1
    //         ? action.performerData
    //         : [...state.performerData, ...action.performerData],

    //   };

    default:
      return { ...state };
  }
};
export default getPerformerReducer;

