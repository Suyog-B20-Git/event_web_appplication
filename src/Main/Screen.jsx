import React from "react";
import Footer from "../Components/Layout/Footer";
import { Outlet, useLocation } from "react-router-dom";
import ImageComponet from "../Components/LandingPage/ImageComponent";
import HeaderComponent2 from "../Components/Layout/HeaderComponent2";

function Screen() {
  const location = useLocation();

  return (
    <div>
      <HeaderComponent2 />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Screen;
