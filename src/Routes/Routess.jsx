import React from "react";
import { Route, Routes } from "react-router-dom";

import { Orgnizer } from "../../views/pages/Orgnizer/Orgnizer"; // Remove curly braces
import Index from "../Main/Index";
import Home from "../LandingPages/Home";
import { text_data } from "../Components/Events/menuData";
import Viewall from "../LandingPages/Viewall";
import CreateEvent from "../Components/CreateEvent/CreateEvent";
import CreateEventForm from "../Components/CreateEvent/CreateEventForm";
import Login from "../Users/Login";
import Register from "../Users/Register";
import CreatePage from "../Components/CreatePage/CreatePage";
import GetOrganizer from "../Components/Organizer/GetOrganizer";
import GetOrganizerById from "../Components/Organizer/GetOrganizerById";
import GetPerformers from "../Components/Performers/Performers";
import GetPerformerById from "../Components/Performers/PerformerById";
import GetVenue from "../Components/Venue/GetVenue";
import GetVenueById from "../Components/Venue/GetVenueById";
import GetService from "../Components/Services/GetServices";
import GetServiceById from "../Components/Services/GetServiceById";
import GetEventByFilter from "../Components/Events/GetEventByFilter";
import GetOrganizerByFilter from "../Components/Organizer/GetOragnizerByFilter";
import FeaturedEvent from "../LandingPages/FeaturedEvent";
import MyBookings from "../Components/MyBookings";
import Dashboard from "../Components/Dashboard";
import Profile from "../Components/Profile";
import MybookingDetail from "../Components/MybookingDetail";
import CreateTicket from "../Components/CreateEvent/CreateTicket";
import SearchData from "../Components/SearchData";
import OAuthSuccess from "../Users/OAuthSuccess";
import OAuthFailure from "../Users/OAuthFailure";
import BookTicket from "../LandingPages/BookTicket";
import Terms from "../Components/Home/Terms";
import About from "../Components/Home/About";
import ContactUs from "../Components/Home/ContactUs";
import EventFilterBar from "../LandingPages/EventFilterBar";
import AdminPanelOverview from "../Components/AdminPanel/AdminPanelOverview";
import AdminMyEvents from "../Components/AdminPanel/AdminMyEvents";


function Routess() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />

          {text_data.map((item) => (
            <React.Fragment key={item.path}>
              {/* Parent route (e.g., /events, /organisers, /venues, etc.) */}
              <Route
                path={item.path}
                element={
                  item.name === "Events" ? (
                    <Viewall />
                  ) : item.name === "Organisers" ? (
                    <Orgnizer />
                  ) : item.name === "Venues" ? (
                    <GetVenue />
                  ) : item.name === "Performers" ? (
                    <GetPerformers />
                  ) : item.name === "Services" ? (
                    <GetService />
                  ) : null
                }
              />

              {/* Submenu routes */}
              {item.popUpMenu &&
                item.popUpMenu.map(
                  (subItem) =>
                    subItem.path && (
                      <Route
                        key={subItem.path}
                        path={subItem.path}
                        element={
                          item.name === "Events" ? (
                            <Viewall />
                          ) : item.name === "Organisers" ? (
                            <Orgnizer />
                          ) : item.name === "Venues" ? (
                            <GetVenue />
                          ) : item.name === "Performers" ? (
                            <GetPerformers />
                          ) : item.name === "Services" ? (
                            <GetService />
                          ) : null
                        }
                      />
                    )
                )}
            </React.Fragment>
          ))}

          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/submit-event" element={<CreateEventForm />} />
          {/* <Route path="/dashboard/create-event" element={<DashCreateEvent />} /> */}
          {/* <Route path="/adminPanelOverview" element={<AdminPanelOverview />} /> */}

          <Route path="/eventfilerbar" element={<EventFilterBar />} />"

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-page" element={<CreatePage />} />
          <Route path="/organizers" element={<GetOrganizer />} />
          <Route path="/organizers/wedding-planner" element={<GetOrganizer />} />
          <Route path="/organizers/adventure" element={<GetOrganizer />} />
          <Route path="/organizers/event-planner" element={<GetOrganizer />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/oauth-failure" element={<OAuthFailure />} />

          <Route path="/Organizer/:organizerId" element={<GetOrganizerById />} />
          <Route path="/city/:cityName/listing/organizers/:organizerName" element={<GetOrganizerById />} />

          <Route path="/Performer/:performerId" element={<GetPerformerById />} />
          <Route path="/Venue/:venueId" element={<GetVenueById />} />
          <Route path="/Service/:serviceId" element={<GetServiceById />} />

          <Route path="/city/events" element={<Viewall />} />
          <Route path="/filtered-events" element={<GetEventByFilter />} />
          <Route path="/events/:categoryname/:eventId" element={<FeaturedEvent />} />
          <Route path="/events/live-music/:eventId" element={<FeaturedEvent />} />
          <Route path="/city/location" element={<SearchData />} />
          <Route path='event/:eventId' element={<FeaturedEvent />} />
          <Route path="/bookTicket" element={<BookTicket />} />

          <Route path="/featuredEvent" element={<FeaturedEvent />} />
          <Route path="/getOrganizerByFilter" element={<GetOrganizerByFilter />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin-panel" element={<AdminPanelOverview />} />
          <Route path="/myBookings" element={<MyBookings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/myBookingDetails" element={<MybookingDetail />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/events" element={<Viewall />} />
        </Route>

      </Routes>
    </div>
  );
}

export default Routess;
