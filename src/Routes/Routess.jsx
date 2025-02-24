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
          <Route path="/createEventForm" element={<CreateEventForm />} />
          <Route path="organiser" element={<Orgnizer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createPage" element={<CreatePage />} />
          <Route path="/getOrganizer" element={<GetOrganizer />} />
          <Route path="/getOrganizerById" element={<GetOrganizerById />} />
          <Route path="/getPerformer" element={<GetPerformers />} />
          <Route path="/getPerformerById" element={<GetPerformerById />} />
          <Route path="/getVenue" element={<GetVenue />} />
          <Route path="/getVenueById" element={<GetVenueById />} />
          <Route path="/getService" element={<GetService />} />
          <Route path="/getServiceById" element={<GetServiceById />} />
          <Route path="/getEventByFilter" element={<GetEventByFilter />} />
          <Route
            path="/getOrganizerByFilter"
            element={<GetOrganizerByFilter />}
          />
        </Route>

        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default Routess;
