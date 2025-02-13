// ** Redux Imports
import { combineReducers } from "redux";
import organizerReducer from "./pages/organizerReducer";
import eventReducer from "./pages/Events/eventReducer";
import upcomingEventReducer from "./pages/Events/upcomingEvent";
import featuredEventReducer from "./pages/Events/featuredEvent";
import venuesReducer from "./pages/Events/getVenue";
import performersReducer from "./pages/Events/getPerformers";

// ** Reducers Import **//

const rootReducer = combineReducers({
  organizerReducer,
  eventReducer,
  upcomingEventReducer,
  featuredEventReducer,
  venuesReducer,
  performersReducer,
});

export default rootReducer;
