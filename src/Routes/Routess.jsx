import React from "react";
import { Route, Routes } from "react-router-dom";

import { Orgnizer } from "../../views/pages/Orgnizer/Orgnizer"; // Remove curly braces
import Index from "../Main/Index";
import Home from "../LandingPages/Home";

import Viewall from "../LandingPages/Viewall";
import CreateEvent from "../Components/CreateEvent/CreateEvent";
import CreateEventForm from "../Components/CreateEvent/CreateEventForm";
import Login from "../../views/pages/Users/Login";
import Register from "../../views/pages/Users/Register";
import CreatePage from "../Components/CreatePage/CreatePage";
import GetOrganizer from "../Components/Organizer/GetOrganizer";
import GetOrganizerById from "../Components/Organizer/GetOrganizerById";

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
        </Route>

        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default Routess;
