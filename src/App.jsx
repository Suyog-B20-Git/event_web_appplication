import { useState } from "react";

import "./index.css";

import Routess from "./Routes/Routess";

import { Orgnizer } from "../views/pages/Orgnizer/Orgnizer";
import { Provider } from "react-redux";
import { store } from "./redux/storeConfig/store";
import CreatePage from "./Components/CreatePage/CreatePage";
import GetOrganizer from "./Components/Organizer/GetOrganizer";
import GetPerformers from "./Components/Performers/Performers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EnquiryForm from "./Components/Organizer/EnquiryForm";
import OwnerShipForm from "./Components/Organizer/OwnerShipForm";
import { ContextProvider } from "./Components/Util/ContextProvider";
import FeaturedEvent from "./LandingPages/FeaturedEvent";

function App() {
  return (
    <Provider store={store}>
      <ContextProvider>
        <Routess />
        {/* <FeaturedEvent /> */}
      </ContextProvider>

      <ToastContainer position="top-right" autoClose={3000} />
      {/* <GetPerformers /> */}
    </Provider>
  );
}

export default App;
