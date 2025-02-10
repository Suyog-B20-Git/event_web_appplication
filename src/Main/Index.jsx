import React from "react";
import Header from "../layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "../layout/Footer";

function Index() {
  return (
    <div>
      <div className="lg:pb-[160px] pb:[87px]">
        {" "}
        <Header />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
}

export default Index;
