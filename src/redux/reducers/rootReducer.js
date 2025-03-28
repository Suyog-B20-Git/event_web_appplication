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

import postPerformerReducer from "./pages/Performer/postPerformer";
import postServiceReducer from "./pages/Services/postServiceReducer";
import postVenueReducer from "./pages/Venue/postVenue";
import getPerformerReducer from "./pages/Performer/getPerformersByFilter";
import getPerformerByIdReducer from "./pages/Performer/getPerformerById";
import getVenueReducer from "./pages/Venue/getVenue";
import getVenueByIdReducer from "./pages/Venue/getVenueById";
import getServiceReducer from "./pages/Services/getServiceReducer";
import getServiceByIdReducer from "./pages/Services/getServiceById";
import getEventByFilterReducer from "./pages/Events/getEventByFilter";
import getEventByFilter1Reducer from "./pages/Events/getEventByFilter1";
import getEventByIdReducer from "./pages/Events/getEventById";
import getRecentlyViewReducer from "./pages/Events/getRecentlyViewReducer";

import addFavouriteEventReducer from "./pages/Events/addFavouriteEvent";
import getFavoriteEventReducer from "./pages/Events/getFavoriteEvent";

import getFavoriteOrganizerReducer from "./pages/getFavouriteOrganizerReducer";
import postFavouriteOrganizerReducer  from "./pages/postFavouriteOragnizerReducer";
import removeFavouriteOrganizerReducer  from "./pages/deleteFavouriteOrganizerReducer";

import addFavouritePerformerReducer from "./pages/Performer/postFavouritePerformerReducer";
import getFavoritePerformerReducer from "./pages/Performer/getFavouritePerformerReducer";

import getFavouriteVenueReducer from "./pages/Venue/getFavouriteVenueReducer";
import addFavouriteVenueReducer from "./pages/Venue/postFavouriteVenueReducer";

import getFavouriteServiceReducer from "./pages/Services/getFavouriteServiceReducer";
import addFavouriteServiceReducer from "./pages/Services/postFavouriteServiceReducer";
import deleteFavouriteEventReducer from "./pages/Events/deleteFavouriteEvent";

import profileReducer from "./pages/profileReducer";
import changePasswordReducer  from "./pages/authReducer";

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
  postVenueReducer,
  getPerformerReducer,
  getPerformerByIdReducer,
  getVenueReducer,
  getVenueByIdReducer,
  getServiceReducer,
  getServiceByIdReducer,
  getEventByFilterReducer,
  getEventByFilter1Reducer,
  getEventByIdReducer,

  getRecentlyViewReducer,

  addFavouriteEventReducer,
  getFavoriteEventReducer,

  postFavouriteOrganizerReducer ,
  getFavoriteOrganizerReducer,
  removeFavouriteOrganizerReducer ,

  addFavouritePerformerReducer,
  getFavoritePerformerReducer,

  getFavouriteVenueReducer,
  addFavouriteVenueReducer,

  getFavouriteServiceReducer,
  addFavouriteServiceReducer,
  deleteFavouriteEventReducer,

  profileReducer,
  changePasswordReducer,

});

export default rootReducer;
