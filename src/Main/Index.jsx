import React from "react";
import Header from "../layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "../layout/Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Index() {
  const role = localStorage.getItem("role");
  const location = useLocation();
  const hideFooterRoutes = ["/admin-panel"];
  const hideHeaderRoutes = ["/admin-panel"];
  return (
    <div>
      <div
      // className={`${role === "superadmin" ? "lg:pb-[88px]" : "lg:pb-[88px] md:pb-[88px]"
      //   }`}
      >
        {" "}
        {/* {!hideHeaderRoutes.includes(location.pathname) && <Header />} */}
      </div>
      <Outlet />
      {/* {!hideFooterRoutes.includes(location.pathname) && <Footer />} */}
    </div>
  );
}

export default Index;
