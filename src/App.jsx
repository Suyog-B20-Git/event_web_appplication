import { useState } from "react";

import "./index.css";

import Routess from "./Routes/Routess";
import MyBooking from "./Pages/UserPanel/MyBooking";
import BookingDetails from "./Pages/UserPanel/BookingDetails";
import EventForm from "./Components/CreateEventFlow/EventForm";
import Details from "./Components/CreateEventFlow/Details";
import { ContextProvider } from "./Components/Util/ContextProvider";
import CreateProfile from "./Pages/UserPanel/CreateProfile";
import OrganiserContact from "./Components/FeaturedEvent/OrganiserContact";
import OrganiserList from "./testing/Oragsniser";
import { Provider } from "react-redux";
import store from "./ReactRedux/store/store";
import AddOrganiser from "./testing/AddOragniser";
function App() {
  return (
    // <ContextProvider>
    //   <Routess />
    // </ContextProvider>
    <Provider store={store}>
      <OrganiserList />
      <AddOrganiser/>
    </Provider>
  );
}

export default App;
