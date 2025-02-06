import { useState } from "react";

import "./index.css";

import Routess from "./Routes/Routess";
import MyBooking from "./Pages/UserPanel/MyBooking";
import BookingDetails from "./Pages/UserPanel/BookingDetails";
import EventForm from "./Components/CreateEventFlow/EventForm";
import Details from "./Components/CreateEventFlow/Details";
import { ContextProvider } from "./Components/Util/ContextProvider";
import CreateProfile from "./Pages/UserPanel/CreateProfile";
function App() {
  return (
    <ContextProvider>
      <Routess />
    </ContextProvider>
    // <CreateProfile/>
  );
}

export default App;
