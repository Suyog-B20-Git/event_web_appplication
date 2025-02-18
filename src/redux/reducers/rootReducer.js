// ** Redux Imports
import { combineReducers } from "redux";
import organizerReducer from "./pages/organizerReducer";
import eventReducer from "./pages/Events/eventReducer";
import upcomingEventReducer from "./pages/Events/upcomingEvent";
import featuredEventReducer from "./pages/Events/featuredEvent";
import venuesReducer from "./pages/Events/getVenue";
import performersReducer from "./pages/Events/getPerformers";
import countriesReducer from "./pages/location/country";
import statesReducer from "./pages/location/state";
import citiesReducer from "./pages/location/city";
import locationsReducer from "./pages/location/location";
import locationDetailsReducer from "./pages/location/locationDetails";
import getOrganizerReducer from "./pages/getOrganizer";
import getOrganizerByIdReducer from "./pages/getOrganizerById";

import postPerformerReducer from "./pages/Performer/PostPerformer";
import postServiceReducer from "./pages/Services/postServiceReducer";

// ** Reducers Import **//

const rootReducer = combineReducers({
  organizerReducer,
  eventReducer,
  upcomingEventReducer,
  featuredEventReducer,
  venuesReducer,
  performersReducer,
  countriesReducer,
  statesReducer,
  citiesReducer,
  locationsReducer,
  locationDetailsReducer,
  getOrganizerReducer,
  getOrganizerByIdReducer,
  postPerformerReducer,
  postServiceReducer,
});

export default rootReducer;
