import React from "react";
import { Route, Routes } from "react-router-dom";

import { Orgnizer } from "../../views/pages/Orgnizer/Orgnizer"; // Remove curly braces
import Index from "../Main/Index";
import Home from "../LandingPages/Home";

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

function Routess() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Screen />}> */}
        {/* <Route index element={<LandingPage />} />
          <Route path="/landingPage" element={<LandingPage />} />
          
          <Route path="/createPage" element={<CreateProfile />} />
          <Route path="/featuredEvent" element={<FeaturedEvent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/eventComponent" element={<EventComponent />} />
          <Route path="/Vanue" element={<Vanue />} />
          <Route path="/myBooking" element={<MyBooking />} />
          <Route path="/bookingDetails" element={<BookingDetails />} />
           */}
        <Route path="/" element={<Index />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="viewAll" element={<Viewall />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/createEvent1" element={<CreateEventForm />} />
          <Route path="organiser" element={<Orgnizer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createPage" element={<CreatePage />} />
          <Route path="/Organizers" element={<GetOrganizer />} />
          <Route
            path="/Organizer/:organizerId"
            element={<GetOrganizerById />}
          />

          <Route path="/Performers" element={<GetPerformers />} />
          <Route
            path="/Performer/:performerId"
            element={<GetPerformerById />}
          />

          <Route path="/Venues" element={<GetVenue />} />
          <Route path="/Venue/:venueId" element={<GetVenueById />} />

          <Route path="/Services" element={<GetService />} />
          <Route
            path="/Service/:serviceId"
            element={<GetServiceById />}
          />

          <Route path="/getEventByFilter" element={<GetEventByFilter />} />
          <Route path="/featuredEvent" element={<FeaturedEvent />} />
          <Route
            path="/getOrganizerByFilter"
            element={<GetOrganizerByFilter />}
          />
<Route path="/profile" element={<Profile />} />
<Route path="/myBookings" element={<MyBookings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/myBookingDetails" element={<MybookingDetail />} />
          <Route path="/createTicket" element={<CreateTicket />} />
        </Route>

        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default Routess;
