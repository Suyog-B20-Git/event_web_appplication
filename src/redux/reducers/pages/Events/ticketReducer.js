
const initialState = {
    tickets: [],
    ticketResponse: {},
  };
  
  const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_TICKET_DATA":
        return {
          ...state,
          tickets: action.payload,
        };
  
      case "POST_TICKET_DATA":
        return {
          ...state,
          ticketResponse: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default ticketReducer;
  