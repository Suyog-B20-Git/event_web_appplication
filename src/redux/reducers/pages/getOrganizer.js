const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  organizerData: [],
  totalPages:0
};

const getOrganizerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ORGANIZER":
      return {
        ...state,
        organizerData: action.organizerData,
        totalPages: action.totalPages
      };
   

    default:
      return { ...state };
  }
};
export default getOrganizerReducer;

