// ** Redux Imports
import { combineReducers } from "redux";
import organizerReducer from "./pages/organizerReducer";
import eventReducer from "./pages/eventReducer";

// ** Reducers Import **//

const rootReducer = combineReducers({
  organizerReducer,
  eventReducer,
});

export default rootReducer;
