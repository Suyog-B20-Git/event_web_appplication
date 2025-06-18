import { useState, useRef, useEffect} from "react";
import { MdOutlineQrCodeScanner,MdGroups2,} from "react-icons/md";
import {FaPeopleArrows, FaTags,FaMoneyCheckDollar, FaMapLocation,FaMapLocationDot,} from "react-icons/fa6";
import { GrDashboard } from "react-icons/gr";
// import { useNavigate } from "react-router-dom";
import {FaBars, FaWallet,FaCalendarAlt, FaStarHalfAlt} from "react-icons/fa";


import DashboardOverview from "./Dashboard/DashboardOverview";
import MyEvents from "./Dashboard/MyEvents";
import ScanTickets from "./Dashboard/ScanTickets";
import MyBookings from "./Dashboard/MyBookings";
import MyEarnings from "./Dashboard/MyEarnings";
import MyTags from "./Dashboard/MyTags";
import MyVenues from "./Dashboard/MyVenues";
import Guest from "./Dashboard/Guests";
import SubOrganizers from "./Dashboard/SubOrganizers";
import Reviews from "./Dashboard/Reviews";


const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isExpanded, setIsExpanded]     = useState(false); // your desktop expand
  const [showSidebar, setShowSidebar]   = useState(false); // mobile toggle
  const sidebarRef = useRef(null);

    const headerHeight = "4rem";

  // click‑outside to close mobile sidebar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setShowSidebar(false);
      }
    };
    if (showSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar]);

 const sections = [
    { name: "Dashboard", icon: <GrDashboard />, id: "dashboard" },
    { name: "My Bookings", icon: <FaMoneyCheckDollar />, id: "my-bookings" },
    { name: "My Earnings", icon: <FaWallet />, id: "my-earnings" },
    { name: "My Tags", icon: <FaTags />, id: "my-tags" },
    { name: "My Events", icon: <FaCalendarAlt />, id: "my-events" },
    { name: "My Venues", icon: <FaMapLocation />, id: "my-venues" },
    { name: "Scan Tickets", icon: <MdOutlineQrCodeScanner />, id: "scan-tickets" },
    { name: "Guests", icon: <MdGroups2 />, id: "guests" },
    { name: "Sub Organizers", icon: <FaPeopleArrows />, id: "sub-organizers" },
    { name: "Reviews", icon: <FaStarHalfAlt />, id: "reviews" },
  ];


  return (
    <div className="flex min-h-screen bg-gray-100">
       {/* Header */}
     <div className="fixed left-0 top-16 z-50 mt-2 ml-2"> {/* 👈 top-16 = 4rem (same as header height) */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="p-2 bg-gray-800 text-white rounded"
        >
          <FaBars className="text-xl" />
        </button>
      </div>

      {/* Overlay for mobile */}
      {/* {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowSidebar(false)}
        />
      )} */}

      {/* Sidebar starts below header */}
      <aside
        ref={sidebarRef}
        className={`fixed left-0 w-14  top-28 z-30 p-2 bg-gray-900 text-white
          transition-transform duration-300
          h-[calc(100vh-4rem)]
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {sections.map((item) => (
          <div
            key={item.id}
            className={`relative group flex justify-center p-4 rounded hover:bg-gray-700 cursor-pointer ${
              activeSection === item.id ? "bg-red-500" : ""
            }`}
            onClick={() => {
              setActiveSection(item.id);
              setShowSidebar(false);
            }}
          >
            <div className="text-2xl">{item.icon}</div>
            {/* Tooltip on hover */}
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 
              opacity-0 group-hover:opacity-100 transition bg-white text-black text-md font-semibold  px-2 py-1 rounded shadow whitespace-nowrap z-50"
            >
              {item.name}
            </div>
          </div>
        ))}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 pt-20 ml-10 px-4 p-4 md:p-6 mt-16 md:mt-0 overflow-y-auto">
        {activeSection === "dashboard" && <DashboardOverview />}
        {activeSection === "my-events" && <MyEvents />}
        {activeSection === "scan-tickets" && <ScanTickets />}
        {activeSection === "my-bookings" && <MyBookings />}
        {activeSection === "my-earnings" && <MyEarnings />}
        {activeSection === "my-tags" && <MyTags />}
        {activeSection === "my-venues" && <MyVenues />}
        {activeSection === "guests" && <Guest />}
        {activeSection === "sub-organizers" && <SubOrganizers />}
        {activeSection === "reviews" && <Reviews />}
      </main>
    </div>
  );
};

export default Dashboard;