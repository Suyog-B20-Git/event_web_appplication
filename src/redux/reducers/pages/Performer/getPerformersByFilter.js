const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  performerData: [],
};

const getPerformerReducer = (state = initialState, action) => {
  console.log("action..:", action);
  switch (action.type) {
    // case "GET_ORGANIZER":
    //   return {
    //     ...state,
    //     organizerData: [...state.organizerData,...action.organizerData],
    //   };
    case "GET_PERFORMER":
      return {
        ...state,
        performerData:
          action.pageNo === 1
            ? action.performerData
            : [...state.performerData, ...action.performerData],

      };

    default:
      return { ...state };
  }
};
export default getPerformerReducer;

