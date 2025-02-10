import React from "react";
import { Route, Routes } from "react-router-dom";
// import LandingPage from "../Pages/UserPanel/LandingPage";
// import FeaturedEvent from "../Pages/UserPanel/FeaturedEvent";
// import Screen from "../Main/Screen";
// import CreateEvent from "../Components/CreateEvent/CreateEvent";
// import CreateEventForm from "../Components/CreateEvent/CreateEventForm";
// import Profile from "../Components/Profile/Profile";
// import EventComponent from "../Components/Event/Event";
// import Vanue from "../Components/Vanue/Vanue";
// import MyBooking from "../Pages/UserPanel/MyBooking";
// import BookingDetails from "../Pages/UserPanel/BookingDetails";
// import Login from "../Users/Login";
// import Register from "../Users/Register";
// import CreateProfile from "../Pages/UserPanel/CreateProfile";
import { Orgnizer } from "../../views/pages/Orgnizer/Orgnizer"; // Remove curly braces
import Index from "../Main/Index";
import Home from '../LandingPages/Home'

import Viewall from "../LandingPages/Viewall";

function Routess() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Screen />}> */}
        {/* <Route index element={<LandingPage />} />
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/createEventForm" element={<CreateEventForm />} />
          <Route path="/createPage" element={<CreateProfile />} />
          <Route path="/featuredEvent" element={<FeaturedEvent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/eventComponent" element={<EventComponent />} />
          <Route path="/Vanue" element={<Vanue />} />
          <Route path="/myBooking" element={<MyBooking />} />
          <Route path="/bookingDetails" element={<BookingDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
        <Route path="/" element={<Index />}>
          <Route index element={<Home/>} />
          <Route path="home" element={<Home />} />
          <Route path="viewAll" element={<Viewall />} />
          <Route path="organiser" element={<Orgnizer />} />
        </Route>

        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default Routess;
