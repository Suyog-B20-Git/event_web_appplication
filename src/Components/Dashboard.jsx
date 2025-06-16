import { useState } from "react";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { FaUser, FaTag, FaMapMarkerAlt } from "react-icons/fa";
import { FaChartLine, FaMoneyBillAlt, FaShoppingBag } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { FaCalendarPlus } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { BiQrScan } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import { TbMoneybag } from "react-icons/tb";
import { FaStarHalfAlt, FaUserTag } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { MdPrivacyTip,MdOutlineQrCodeScanner,MdGroups2,} from "react-icons/md";
import {FaPeopleArrows,FaMapLocation, FaTags,FaMoneyCheckDollar,FaMapLocationDot,} from "react-icons/fa6";
import { GrDashboard } from "react-icons/gr";
import { TbActivityHeartbeat } from "react-icons/tb";
import { FiCreditCard } from "react-icons/fi";
import { IoTicket } from "react-icons/io5";
import { TbCalendarEvent, TbLayoutDashboardFilled } from "react-icons/tb";
import { useNavigate, Link } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import {FaBars, FaWallet,FaCalendarAlt,} from "react-icons/fa";


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
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const navigate = useNavigate();

  const loggedInUser = "John Doe";

  const sections = [
    { name: "Dashboard", icon: <GrDashboard />, id: "dashboard" },
    { name: "My Bookings", icon: <FaMoneyCheckDollar />, id: "my-bookings" },
    { name: "My Earnings", icon: <FaWallet />, id: "my-earnings" },
    { name: "My Tags", icon: <FaTags />, id: "my-tags" },
    { name: "My Events", icon: <FaCalendarAlt />, id: "my-events" },
    { name: "My Venues", icon: <FaMapLocation />, id: "my-venues" },
    {
      name: "Scan Tickets",
      icon: <MdOutlineQrCodeScanner />,
      id: "scan-tickets",
    },
    { name: "Guests", icon: <MdGroups2 />, id: "guests" },
    {
      name: "Sub Organizers",
      icon: <FaPeopleArrows />,
      id: "sub-organizers",
    },
    { name: "Reviews", icon: <FaStarHalfAlt />, id: "reviews" },
  ];


 

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 mt-20 md:mt-0 text-white flex flex-col py-6 space-y-4 transition-all duration-300
        ${isExpanded ? "w-48 items-start px-4" : "w-20 items-center"}
        `}
      >
        {/* Toggle Button */}
        <div className="flex items-center px-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <FaBars className="text-2xl" />
        </div>

        {/* Sidebar Items */}
        {sections.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center px-4 cursor-pointer py-2 rounded-md 
            ${activeSection === item.id ? "bg-red-500" : ""}`}
            onClick={() => setActiveSection(item.id)}
          >
            {item.icon}
            {isExpanded && <span className={`ml-3 ${index !== sections.length - 1 ? "whitespace-nowrap" : ""}`}>{item.name}</span>}
            </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 mt-20 md:mt-0 overflow-y-auto ">
        {/* Content Rendering */}
        <div className="mt-6">

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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
