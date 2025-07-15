
import { useState, useEffect, useRef } from "react";
import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { FaUser, FaTag, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaMapMarkedAlt, FaClipboardList, FaTicketAlt, FaBuilding, FaUserFriends, FaBars, FaWallet } from "react-icons/fa";
import { FaChartLine, FaMoneyBillAlt, FaShoppingBag } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout, MdPrivacyTip, MdOutlineQrCodeScanner, MdGroups2 } from "react-icons/md";
import { FaCalendarPlus, FaPeopleArrows, FaMapLocation, FaTags, FaMoneyCheckDollar, FaMapLocationDot } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { BiQrScan } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import { TbMoneybag, TbActivityHeartbeat, TbCalendarEvent, TbLayoutDashboardFilled } from "react-icons/tb";
import { FiCreditCard } from "react-icons/fi";
import { IoTicket } from "react-icons/io5";
import { FaStarHalfAlt, FaUserTag } from "react-icons/fa";
import { GrDashboard } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import CommonCalendar from "./CommonCalendar";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(null);
  const popupRef = useRef(null);
  const loggedInUser = "John Doe";

  const sections = [
    { name: "Dashboard", icon: <GrDashboard />, id: "dashboard" },
    { name: "My Events", icon: <FaCalendarAlt />, id: "my-events" },
    { name: "Scan Tickets", icon: <MdOutlineQrCodeScanner />, id: "scan-tickets" },
    { name: "My Bookings", icon: <FaMoneyCheckDollar />, id: "my-bookings" },

import { useState, useRef, useEffect} from "react";
import { MdOutlineQrCodeScanner,MdGroups2,} from "react-icons/md";
import {FaPeopleArrows, FaTags,FaMoneyCheckDollar, FaMapLocation,FaMapLocationDot,} from "react-icons/fa6";
import { GrDashboard } from "react-icons/gr";
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
     { name: "My Events", icon: <FaCalendarAlt />, id: "my-events" },

    { name: "My Earnings", icon: <FaWallet />, id: "my-earnings" },
    { name: "My Tags", icon: <FaTags />, id: "my-tags" },
    { name: "My Venues", icon: <FaMapLocation />, id: "my-venues" },
    { name: "Scan Tickets", icon: <MdOutlineQrCodeScanner />, id: "scan-tickets" },
    { name: "Guests", icon: <MdGroups2 />, id: "guests" },
    { name: "Sub Organizers", icon: <FaPeopleArrows />, id: "sub-organizers" },
    { name: "Reviews", icon: <FaStarHalfAlt />, id: "reviews" },
  ];


  const ticketInfo = [
    {
      eventName: "Concert XYZ",
      img: "music.jpeg",
      date: "2025-03-15",
      time: "19:00",
      orderId: "ORD123456",
      ticketQuantity: 2,
      orderTotal: 2000,
      promoCodeReward: "DISCOUNT10",
      bookingDate: "2025-02-25",
      paymentMode: "online",
      checkedIn: "no",
      status: "upcoming",
      expired: "no",
    },
    {
      eventName: "Theater Play ABC",
      img: "music.jpeg",
      date: "2025-04-10",
      time: "18:30",
      orderId: "ORD123457",
      ticketQuantity: 4,
      orderTotal: 5000,
      promoCodeReward: "VIPACCESS",
      bookingDate: "2025-02-27",
      paymentMode: "offline",
      checkedIn: "yes",
      status: "upcoming",
      expired: "no",
    },
    {
      eventName: "Football Match DEF",
      img: "music.jpeg",
      date: "2025-03-20",
      time: "16:00",
      orderId: "ORD123458",
      ticketQuantity: 1,
      orderTotal: 1200,
      promoCodeReward: "GAMEDEAL",
      bookingDate: "2025-02-24",
      paymentMode: "online",
      checkedIn: "no",
      status: "refunded",
      expired: "yes",
    },
    {
      eventName: "Music Festival GHI",
      img: "music.jpeg",
      date: "2025-05-05",
      time: "14:00",
      orderId: "APPED",
      ticketQuantity: 3,
      orderTotal: 3000,
      promoCodeReward: "EARLYBIRD",
      bookingDate: "2025-02-28",
      paymentMode: "online",
      checkedIn: "no",
      status: "used",
      expired: "no",
    },
  ];

  const data = [
    {
      id: 1,
      title: "The Westin Pune Koregaon Park",
      description: "Hotel",
      state: "Maharashtra",
      city: "Pune",
    },
    {
      id: 2,
      title: "Club LPK",
      description: "Nightclub",
      state: "Goa",
      city: "",
    },
    {
      id: 3,
      title: "ABC ",
      description: "Laudge",
      state: "Maharashta",
      city: "Mumbai",
    },
  ];

  const myEvents = [
    { id: 'event01', name: 'Test Events 01', bookings: 0, timings: '10 Jun 2025 03:03 AM\n19 Jun 2025 05:05 AM', repetitive: 'No', seasonalTickets: 'No', publish: 'Published', status: 'Disabled' },
    { id: 'event02', name: 'Annual Tech Conference', bookings: 25, timings: '01 Aug 2025 09:00 AM\n03 Aug 2025 05:00 PM', repetitive: 'Yes', seasonalTickets: 'No', publish: 'Published', status: 'Enabled' },
    { id: 'event03', name: 'Charity Run', bookings: 120, timings: '15 Sep 2025 07:00 AM\n15 Sep 2025 11:00 AM', repetitive: 'No', seasonalTickets: 'No', publish: 'Published', status: 'Enabled' },
    { id: 'event04', name: 'Winter Music Fest', bookings: 0, timings: '10 Dec 2025 06:00 PM\n12 Dec 2025 11:00 PM', repetitive: 'No', seasonalTickets: 'Yes', publish: 'Published', status: 'Disabled' },
  ];

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleThreeDotsClick = (eventId, e) => {
    e.stopPropagation();
    setShowPopup(showPopup === eventId ? null : eventId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      <aside
        className={`bg-gray-800 text-white flex flex-col py-6 space-y-4 transition-all duration-300 fixed left-0 top-[5.5rem] h-[calc(100vh-5.5rem)] z-50
        ${isExpanded ? "w-48 items-start px-4" : "w-20 items-center"}`}


  return (
    <div className="flex min-h-screen bg-gray-100">
       {/* Header */}
     <div className="fixed left-0 top-22 z-50 mt-2 ml-2"> 
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
        className={`fixed left-0 w-14  top-44 z-30 p-2 bg-gray-900 text-white
          transition-transform duration-300
          h-[calc(100vh-4rem)]
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
        `}

      >
        {sections.map((item) => (
          <div
            key={item.id}

            className={`relative flex items-center px-4 cursor-pointer py-2 rounded-md transition-all group
      ${activeSection === item.id ? "bg-red-500 text-white" : "text-white hover:bg-gray-700"}`}
            onClick={() => setActiveSection(item.id)}
            onMouseEnter={(e) => {
              const tooltip = e.currentTarget.querySelector(".tooltip");
              tooltip && (tooltip.style.opacity = "1");
            }}
            onMouseLeave={(e) => {
              const tooltip = e.currentTarget.querySelector(".tooltip");
              tooltip && (tooltip.style.opacity = "0");
            }}
          >
            <div className="text-xl">{item.icon}</div>
            {isExpanded ? (
              <span className="ml-3 whitespace-nowrap">{item.name}</span>
            ) : (
              <span
                className="tooltip absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-white text-black text-sm font-semibold px-2 py-1 rounded opacity-0 pointer-events-none transition-opacity duration-200 z-50"
              >
                {item.name}
              </span>
            )}

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


      <main className={`flex-1 p-6 ${isExpanded ? "ml-48" : "ml-20"} transition-all duration-300 overflow-y-auto`}>
        <div
          className="flex items-center cursor-pointer mb-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <FaBars className="text-2xl text-gray-800" />
        </div>

        <div className="mt-6 transition-opacity duration-500 ease-in-out" key={activeSection}>
          {activeSection === "dashboard" && (
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap">
                Hello, {loggedInUser}
              </h1>
              <p className="text-gray-800 mt-2 border-b-2 border-gray-300">
                Here's ongoing activity for all your events and the bookings, have a look.
              </p>
              <h2 className="text-2xl font-semibold text-gray-900"></h2>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="bg-white p-6 shadow rounded-lg flex justify-between items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Total Events</h3>
                    <p className="text-3xl font-bold mt-2 text-gray-900">15</p>
                  </div>
                  <TbActivityHeartbeat className="text-pink-500 text-3xl" />
                </div>
                <div className="bg-white p-6 shadow rounded-lg flex justify-between items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Total Earnings</h3>
                    <p className="text-3xl font-bold mt-2 text-gray-900">0.00</p>
                  </div>
                  <TbMoneybag className="text-green-500 text-3xl" />
                </div>
                <div className="bg-white p-6 shadow rounded-lg flex justify-between items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Total Bookings</h3>
                    <p className="text-3xl font-bold mt-2 text-gray-900">10</p>
                  </div>
                  <FiCreditCard className="text-pink-500 text-3xl" />
                </div>
              </div>
              <div className="bg-white mt-8 p-6 shadow rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Top Selling Events</h3>
                <div className="h-[300px] w-full border-t border-l relative">
                  <div className="absolute left-[30%] top-[50px] flex items-center gap-2">
                    <div className="w-[120px] h-6 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-600">Total Bookings</span>
                  </div>
                  <div className="absolute top-[100px] left-8 text-sm text-gray-500">Event A</div>
                  <div className="absolute top-[150px] left-8 text-sm text-gray-500">Event B</div>
                  <div className="absolute top-[200px] left-8 text-sm text-gray-500">Event C</div>
                </div>
              </div>
              <div className="bg-white mt-8 p-6 shadow rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Event Tickets Statistics</h3>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search Table"
                    className="border px-3 py-2 w-full max-w-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-left">
                      <tr>
                        <th className="px-4 py-3 font-bold border-r">ORDER</th>
                        <th className="px-4 py-3 font-bold border-r">TICKETS</th>
                        <th className="px-4 py-3 font-bold border-r">TICKETS QUANTITY</th>
                        <th className="px-4 py-3 font-bold border-r">TOTAL PRICE</th>
                        <th className="px-4 py-3 font-bold">TOTAL CHECKINS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-4 py-4 text-center text-gray-500" colSpan={5}>No data for table</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                  <div>
                    Rows per page: <select className="ml-2 border rounded p-1">
                      <option>10</option>
                      <option>20</option>
                      <option>50</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Page</span>
                    <input value="1" disabled className="border w-10 text-center rounded-md px-2 py-1" />
                    <span>of 0</span>
                    <button disabled className="text-gray-400 px-2">Previous</button>
                    <button disabled className="text-gray-400 px-2">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "my-events" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Events</h2>
                <button className="flex items-center gap-2 bg-[#ff2459] hover:bg-[#e91e63] text-white px-4 py-2 rounded-lg transition shadow-md hover:shadow-lg">
                  <FaCalendarPlus className="text-lg" />
                  <span className="text-sm font-semibold">Create Event</span>
                </button>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex flex-row items-center gap-4">
                  <div className="w-36">
                    <span className="text-sm font-medium text-gray-700">Search Any</span>
                  </div>
                  <div className="w-24">
                    <span className="text-sm font-medium text-gray-700">Show</span>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <div className="w-36">
                    <input
                      type="text"
                      id="search-events"
                      placeholder="Search"
                      className="border px-4 py-2 rounded-xl w-full max-w-xs"
                    />
                  </div>
                  <div className="w-24">
                    <select className="border rounded-xl px-2 py-2 w-full" defaultValue="10" id="rows">
                      <option>5</option>
                      <option>10</option>
                      <option>20</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto shadow-md rounded-lg bg-white">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-100 font-bold">
                    <tr>
                      <th className="px-4 py-3">Event</th>
                      <th className="px-4 py-3">Timings</th>
                      <th className="px-4 py-3">Repetitive</th>
                      <th className="px-4 py-3">Seasonal Tickets</th>
                      <th className="px-4 py-3">Publish</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myEvents.map((event) => (
                      <tr key={event.id} className="border-t hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-800">{event.name}</span>
                            <span className="text-gray-500 text-xs">🕒 {event.bookings} Bookings</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-pre-line">{event.timings}</td>
                        <td className="px-4 py-4">
                          <span className={`${event.repetitive === 'No' ? 'bg-red-500' : 'bg-green-500'} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                            {event.repetitive}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`${event.seasonalTickets === 'No' ? 'bg-blue-900' : 'bg-purple-600'} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                            {event.seasonalTickets}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`${event.publish === 'Published' ? 'bg-green-500' : 'bg-gray-500'} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                            {event.publish}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`${event.status === 'Disabled' ? 'bg-red-500' : 'bg-green-500'} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 relative">
                          <button
                            className="text-xl text-gray-600 hover:text-gray-900 transition-colors"
                            onClick={(e) => handleThreeDotsClick(event.id, e)}
                          >
                            ⋮
                          </button>
                          {showPopup === event.id && (
                            <div
                              ref={popupRef}
                              className="absolute right-[2.5rem] top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-xl shadow-2xl py-2 w-56 z-20 animate-in fade-in zoom-in-95 duration-200"
                            >
                              <button className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                                <IoTicket className="text-base text-red-500" />
                                <span className="text-sm font-medium">Export Attendees</span>
                              </button>
                              <button className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <FaEdit className="text-base text-blue-500" />
                                <span className="text-sm font-medium">Edit Event</span>
                              </button>
                              <div className="border-t border-gray-200 my-1"></div>
                              <button className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">
                                <FaCheckCircle className="text-base text-green-500" />
                                <span className="text-sm font-medium">Clone Event</span>
                              </button>
                              <button className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                                <MdPrivacyTip className="text-base text-purple-500" />
                                <span className="text-sm font-medium">Private Event</span>
                              </button>
                              <button className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">
                                <FaUserFriends className="text-base text-yellow-500" />
                                <span className="text-sm font-medium">Add Sub-Organizers</span>
                              </button>
                              <button className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                                <FaUsers className="text-base text-indigo-500" />
                                <span className="text-sm font-medium">Add To GuestsList</span>
                              </button>
                              <button className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                                <AiOutlineStock className="text-base text-teal-500" />
                                <span className="text-sm font-medium">Export Sales Report</span>
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === "scan-tickets" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Scan Tickets</h2>
              <div className="bg-blue-100 text-gray-900 px-4 py-3 rounded-xl mb-4 border border-blue-300">
                <div className="flex items-center gap-2 p-1 font-semibold">
                  <BiQrScan className="text-gray-900 font-bold text-xl" />
                  Scan Tickets
                </div>
              </div>
              <div className="bg-pink-200 text-brown-900 px-4 py-3 rounded-xl mb-4 border border-brown-500">
                <div className="flex items-center gap-2 p-1 font-semibold">
                  <FaCamera className="text-brown-900 text-xl" />
                  Camera access required
                </div>
              </div>
            </div>
          )}

          {activeSection === "my-bookings" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
              <div className="flex flex-col md:flex-row gap-4 mb-4 p-2 m-2">
                <div className="flex flex-col gap-2 w-full md:w-1/3">
                  <div className="flex flex-row items-center gap-4">
                    <div className="w-36">
                      <span className="text-sm font-medium text-gray-700">Events</span>
                    </div>
                    <div className="w-36">
                      <span className="text-sm font-medium text-gray-700">Booking Date</span>
                    </div>
                    <div className="w-36">
                      <span className="text-sm font-medium text-gray-700">Event Date</span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <div className="w-36">
                      <select
                        id="events"
                        className="border px-4 py-2 rounded-xl w-full max-w-xs"
                        defaultValue="All Events"
                      >
                        <option>All Events</option>
                        {myEvents.map((event) => (
                          <option key={event.id} value={event.name}>
                            {event.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-36">
                      <input
                        type="date"
                        id="booking-date"
                        className="border px-4 py-2 rounded-xl w-full max-w-xs"
                      />
                    </div>
                    <div className="w-36">
                      <input
                        type="date"
                        id="event-date"
                        className="border px-4 py-2 rounded-xl w-full max-w-xs"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/3">
                  <div className="flex flex-row items-center gap-4">
                    <div className="w-36">
                      <span className="text-sm font-medium text-gray-700">Search Any</span>
                    </div>
                    <div className="w-24">
                      <span className="text-sm font-medium text-gray-700">Show</span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <div className="w-36">
                      <input
                        type="text"
                        id="search-bookings"
                        placeholder="Search"
                        className="border px-4 py-2 rounded-xl w-full max-w-xs"
                      />
                    </div>
                    <div className="w-24">
                      <select
                        id="rows"
                        className="border rounded-xl px-2 py-2 w-full"
                        defaultValue="10"
                      >
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                      </select>
                    </div>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto shadow-md rounded-lg bg-white">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-100 font-bold">
                    <tr>
                      <th className="px-4 py-3">Event</th>
                      <th className="px-4 py-3">Customer Email</th>
                      <th className="px-4 py-3">Ticket</th>
                      <th className="px-4 py-3">Order Total</th>
                      <th className="px-4 py-3">Promocode Reward</th>
                      <th className="px-4 py-3">Booked On</th>
                      <th className="px-4 py-3">Payment</th>
                      <th className="px-4 py-3">Checked In</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Cancellation</th>
                      <th className="px-4 py-3">Expired</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketInfo.map((booking) => (
                      <tr key={booking.orderId} className="border-t hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">{booking.eventName}</td>
                        <td className="px-4 py-4">{loggedInUser.toLowerCase().replace(" ", ".") + "@example.com"}</td>
                        <td className="px-4 py-4">{booking.ticketQuantity}</td>
                        <td className="px-4 py-4">{booking.orderTotal}</td>
                        <td className="px-4 py-4">{booking.promoCodeReward}</td>
                        <td className="px-4 py-4">{booking.bookingDate}</td>
                        <td className="px-4 py-4">{booking.paymentMode}</td>
                        <td className="px-4 py-4">{booking.checkedIn}</td>
                        <td className="px-4 py-4">{booking.status}</td>
                        <td className="px-4 py-4">-</td>
                        <td className="px-4 py-4">{booking.expired}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === "my-earnings" && (
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">My Earning</h2>
              <div className="mb-4 w-[200px]">
                <select
                  value={selectedOption}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">All Events</option>
                  <option value="event1">Event 1</option>
                  <option value="event2">Event 2</option>
                </select>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-sky-400 text-white p-6 rounded-lg flex justify-between items-center shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div>
                    <h3 className="text-lg font-semibold">Total Bookings</h3>
                    <p className="text-2xl font-bold mt-2">0</p>
                  </div>
                  <MdOutlineShoppingCartCheckout className="text-white text-3xl" />
                </div>
                <div className="bg-gray-900 text-white p-6 rounded-lg flex justify-between items-center shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div>
                    <h3 className="text-lg font-semibold">Total Admin Commission</h3>
                    <p className="text-2xl font-bold mt-2">0</p>
                  </div>
                  <RiAdminFill className="text-white text-3xl" />
                </div>
                <div className="bg-green-400 text-white p-6 rounded-lg flex justify-between items-center shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div>
                    <h3 className="text-lg font-semibold">Total Profit</h3>
                    <p className="text-2xl font-bold mt-2">0</p>
                  </div>
                  <TbMoneybag className="text-white text-3xl" />
                </div>
              </div>
              <div className="overflow-x-auto mt-6 bg-white shadow-md rounded-lg">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-200 font-bold">
                    <tr>
                      <th className="px-4 py-3">Event</th>
                      <th className="px-4 py-3">Bookings</th>
                      <th className="px-4 py-3">Commission</th>
                      <th className="px-4 py-3">Profit</th>
                      <th className="px-4 py-3">Month</th>
                      <th className="px-4 py-3">Transferred</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-4 text-center text-gray-800" colSpan={6}>No Bookings!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === "my-tags" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">My Tags</h2>
                <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg transition hover:bg-gray-700">
                  <FaUserTag className="text-lg" />
                  <span className="text-sm font-semibold">Add Tag</span>
                </button>
              </div>
              <div className="overflow-x-auto p-6 m-4">
                <table className="min-w-full text-sm border border-gray-250 rounded-lg overflow-hidden">
                  <thead className="bg-gray-300 text-left">
                    <tr>
                      <th className="px-4 py-3 font-bold border-r">Name</th>
                      <th className="px-4 py-3 font-bold border-r">Type</th>
                      <th className="px-4 py-3 font-bold border-r">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-4 text-center text-gray-800" colSpan={3}>No Tags!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === "my-venues" && (
            <div className="overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">My Venues</h2>
                <div className="flex justify-end mb-4">
                  <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg transition hover:bg-gray-700">
                    <FaMapLocationDot className="text-lg" />
                    <span className="text-sm font-semibold">Create Venue</span>
                  </button>
                </div>
              </div>
              <div className="bg-blue-100 text-blue-900 px-4 py-3 rounded mb-4 border border-blue-300">
                <div className="flex items-center justify-left mb-4">
                  <MdPrivacyTip className="text-xl" />
                  <span className="font-medium">
                    Tip: Add a new Venue only if it does not exist on the website. You can use the Venues created by other Organizers into your event.
                  </span>
                </div>
              </div>
              <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg mt-4">
                <thead className="bg-gray-300 text-left">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold">Title</th>
                    <th className="px-4 py-3 text-left font-bold">State</th>
                    <th className="px-4 py-3 text-left font-bold">City</th>
                    <th className="px-4 py-3 text-left font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((venue) => (
                    <tr key={venue.id} className="border-t">
                      <td className="px-4 py-4">{venue.title}</td>
                      <td className="px-4 py-4">{venue.state}</td>
                      <td className="px-4 py-4">{venue.city}</td>
                      <td className="px-4 py-4 flex gap-2">
                        <button className="text-blue-500 hover:text-blue-700">
                          <FaEdit />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeSection === "guests" && (
            <div className="w-full px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Manage Guests</h2>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 bg-[#ff2459] hover:bg-[#e91e63] text-white px-4 py-2 rounded-lg transition">
                    <FaCalendarPlus className="text-md" />
                    <span className="text-sm font-semibold">Create GuestsList</span>
                  </button>
                  <button className="flex items-center gap-2 bg-gray-900 hover:bg-[#e91e63] text-white px-4 py-2 rounded-lg transition">
                    <FaCalendarPlus className="text-md" />
                    <span className="text-sm font-semibold">Create Guest</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
                  <thead className="bg-gray-200 text-left">
                    <tr>
                      <th className="px-4 py-3 font-bold border-r w-1/3">Name</th>
                      <th className="px-4 py-3 font-bold border-r w-1/3">Total Guests</th>
                      <th className="px-4 py-3 font-bold w-1/3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td colSpan={3} className="px-4 py-6 text-center text-gray-700">No Guest Found!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === "sub-organizers" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Manage Sub Organizers</h2>
              <div className="overflow-x-auto p-6 m-4">
                <table className="min-w-full text-sm border border-gray-250 rounded-lg overflow-hidden">
                  <thead className="bg-gray-300 text-left">
                    <tr>
                      <th className="px-4 py-3 font-bold border-r">Name</th>
                      <th className="px-4 py-3 font-bold border-r">Email</th>
                      <th className="px-4 py-3 font-bold border-r">Role</th>
                      <th className="px-4 py-3 font-bold border-r">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-4 text-center text-gray-800" colSpan={4}>No Sub Organizers Found!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === "reviews" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Manage Reviews</h2>
              <div className="flex flex-col gap-2 mb-4 p-2 m-2">
                <div className="flex flex-row items-center gap-4">
                  <div className="w-36">
                    <span className="text-sm font-medium text-gray-700">Events</span>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <div className="w-36">
                    <input
                      type="text"
                      id="search-events"
                      placeholder="Search"
                      className="border px-4 py-2 rounded-xl w-full max-w-xs"
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
                  <thead className="bg-gray-200 text-left">
                    <tr>
                      <th className="px-4 py-3 font-bold border-r w-1/3">Title</th>
                      <th className="px-4 py-3 font-bold border-r w-1/3">Rating</th>
                      <th className="px-4 py-3 font-bold w-1/3">Review</th>
                      <th className="px-4 py-3 font-bold w-1/3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td colSpan={4} className="px-4 py-6 text-center text-gray-700">No Reviews Found!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

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