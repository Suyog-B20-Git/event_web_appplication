import { getPerformers } from "./actions/master/Events/GetPerformer";
import { getVenue } from "./actions/master/Events/GetVenue";
import { getLocationDetails } from "./actions/master/location/locationDetail";

export const baseUrl = "http://localhost:5000/api/";
// export const baseUrl = "http://dev.eventsnode.com:3000/api/";


export const Auth={
  refreshToken:`${baseUrl}auth/refresh`,
  register:`${baseUrl}auth/setup`,
  login:`${baseUrl}auth/login`,
}
export const Event = {
  createEvent: `${baseUrl}event`,
  featuredEvent: `${baseUrl}event/featured?page=1&limit=10&timezoneOffset=0`,
  upcomingEvent: `${baseUrl}event/upcoming?page=1&limit=10&timezoneOffset=0`,
  getAllEvents: `${baseUrl}event?`,
  getEventByFilter:`${baseUrl}event/filter?`,
  getRecentlyView:`${baseUrl}event/recently-viewed?page=1&limit=10`,
  addFavouriteEvent:`${baseUrl}event/favorites`,
  
};

export const Performer = {
  getPerformer: `${baseUrl}performer/suggestions`,
  postPerformer:`${baseUrl}performer`,
  getPerformerByFilter:`${baseUrl}performer/filter`,
  postFavouritePerformer:`${baseUrl}performer/favorites`
};

export const Organizer={
    getOrganizerFilter:`${baseUrl}organizer/`,
    getOrganizerByFilter:`${baseUrl}organizer/filter?`,
    addFavouriteOrganizer:`${baseUrl}organizer/favorites`
}

export const Venue = {
  getVenue: `${baseUrl}venue/suggestions?`,
  postVenue:`${baseUrl}venue`,
  filterVenue:`${baseUrl}venue/filter/`,
  getFavouriteVenue:`${baseUrl}venue/favorites`
};
export const Location = {
  city: `${baseUrl}location/citySuggestions`,
  country: `${baseUrl}location/countrySuggestions`,
  state: `${baseUrl}location/stateSuggestions`,
  location: `${baseUrl}location/mapSuggestions`,
  getLocationDetails: `${baseUrl}location/locationDetails`,
};

export const Service={
    postService:`${baseUrl}services`,
    getFilterService:`${baseUrl}services/filter`,
    getFavouriteService:`${baseUrl}services/favorites`
    
}
