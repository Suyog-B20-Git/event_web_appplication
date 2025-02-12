const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: []
}

//   const typeOfLiftMasterData = (state = initialState, action) => {
//     switch (action.type) {
//       case 'GET_LIFT_TYPE':
//         return {
//           ...state,
//           allData: action.allData,
//           data: action.data,
//           total: action.totalPages,
//           params: action.params
//         }
//       case 'CREATE_LIFT_TYPE':
//         return { ...state }
//       case 'UPDATE_LIFT_TYPE':
//         return { ...state }
//       default:
//         return { ...state }
//     }
// }

const organizerReducer = (state = initialState,action) => {
  switch (action.type) {
    case "CREATE_ORGANIZER":
      return {...state,organizer: action.payload};
    default:
      return state;
  }
};


export default organizerReducer
