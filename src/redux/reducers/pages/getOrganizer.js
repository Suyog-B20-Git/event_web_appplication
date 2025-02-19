
// const initialState = {
//     data: [],
//     total: 1,
//     params: {},
//     allData: [],
//     organizerData: []
//   }
  
//   const getOrganizerReducer = (state = initialState,action) => {
//     console.log("action..:",action)
//     switch (action.type) {
//       case 'GET_ORGANIZER':
//         return {
//           ...state,
//           organizerData: action.organizerData
//         }
  
//       default:
//         return {...state}
//     }
//   }
//   export default getOrganizerReducer
  

const initialState = {
  organizerData: [],
  page: 1,
};

const getOrganizerReducer = (state = initialState, action) => {
  console.log("Action Received:", action);
  switch (action.type) {
    case "GET_ORGANIZER":
      return {
        ...state,
        organizerData: action.page === 1 
          ? action.organizerData // Replace on first page
          : [...state.organizerData, ...action.organizerData], // Append on next pages
      };

    default:
      return state;
  }
};

export default getOrganizerReducer;
