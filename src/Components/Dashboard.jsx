
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
import { FaStarHalfAlt,  FaUserTag } from "react-icons/fa";
import { MdPrivacyTip,  MdOutlineQrCodeScanner , MdGroups2 } from "react-icons/md";
import { FaPeopleArrows,FaMapLocation,FaTags , FaMoneyCheckDollar, FaMapLocationDot} from "react-icons/fa6";
import { GrDashboard } from "react-icons/gr";
import { TbActivityHeartbeat } from "react-icons/tb";
import { FiCreditCard } from "react-icons/fi";

import { IoTicket } from "react-icons/io5";
import { TbCalendarEvent, TbLayoutDashboardFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";


import {
  FaBars,
  FaWallet,
  FaCalendarAlt,
  FaUsers,
  FaMapMarkedAlt,
  FaClipboardList,
  FaTicketAlt,
  FaBuilding,
  FaUserFriends,
  FaUserCog,
  FaEdit,
  FaTrash

} from "react-icons/fa";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const navigate = useNavigate();


  const loggedInUser = "John Doe";

  const sections = [
    { name: "Dashboard", icon: <GrDashboard  />, id: "dashboard" },
    { name: "My Events", icon: <FaCalendarAlt />, id: "my-events" },
    { name: "Scan Tickets", icon: <MdOutlineQrCodeScanner />, id: "scan-tickets" },
    { name: "My Bookings", icon: <FaMoneyCheckDollar />, id: "my-bookings" },
    // { name: "My Orders", icon: , id: "my-bookings" },
    { name: "My Earnings", icon: <FaWallet />, id: "my-earnings" },
    { name: "My Tags", icon: <FaTags />, id: "my-tags" },
    { name: "My Venues", icon: <FaMapLocation />, id: "my-venues" },
    { name: "Guests", icon: <MdGroups2 />, id: "guests" },
    {
      name: "Sub Organizers",
      icon: <FaPeopleArrows />,
      id: "sub-organizers",
    },
    
    { name: "Reviews", icon: <FaStarHalfAlt  />, id: "reviews" },
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
      orderId: "ORD123459",
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

// const SimpleDropdown = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  }

  return (
    <div className="flex min-h-screen bg-white-00">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 mt-20 md:mt-0 text-white flex flex-col py-6 space-y-4 transition-all duration-300
        ${isExpanded ? "w-48 items-start px-4" : "w-20 items-center"}`}
      >
        {/* Toggle Button */}
        <div
          className="flex items-center px-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <FaBars className="text-2xl" />
        </div>

        {sections.map((item) => (
          <div
            key={item.id}
            className={`relative flex items-center px-4 cursor-pointer py-2 rounded-md transition-all group
      ${
        activeSection === item.id
          ? "bg-red-500 text-white"
          : "text-white hover:bg-gray-700"
      }`}
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
              <span className="ml-3 whitespace-nowrap ">{item.name}</span>
            ) : (
              <span
                className="tooltip absolute left-full ml-2 top-1/2 -translate-y-1/2 
        bg-white text-black text-sm font-semibold px-2 py-1 rounded opacity-0 pointer-events-none transition-opacity duration-200 z-50"
              >
                {item.name}
              </span>
            )}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 mt-20 md:mt-0 overflow-y-auto ">
        

        {/* Content Rendering */}
        <div className="mt-6">
          {activeSection === "dashboard" && (
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap">
          Hello, {loggedInUser}
        </h1>
        <p className="text-gray-800 mt-2 border-b-2 border-gray-300">
          Here's ongoing activity for all your events and the bookings, have a
          look.
        </p>
              <h2 className="text-2xl font-semibold text-gray-900">
                {/* Dashboard Overview */}
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                {/* Total Events */}
                <div className="bg-white p-6 shadow rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Total Events
                    </h3>
                    <p className="text-3xl font-bold mt-2 text-gray-900">15</p>
                  </div>
                  <TbActivityHeartbeat className="text-pink-500 text-3xl" />
                </div>

                {/* Total Earnings */}
                <div className="bg-white p-6 shadow rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Total Earnings
                    </h3>
                    <p className="text-3xl font-bold mt-2 text-gray-900">
                      0.00
                    </p>
                  </div>
                  <TbMoneybag className="text-green-500 text-3xl" />
                </div>

                {/* Total Bookings */}
                <div className="bg-white p-6 shadow rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Total Bookings
                    </h3>
                    <p className="text-3xl font-bold mt-2 text-gray-900">10</p>
                  </div>
                  <FiCreditCard className="text-pink-500 text-3xl" />
                </div>
              </div>

              {/* Top Selling Events (Static Bar Chart) */}
              <div className="bg-white mt-8 p-6 shadow rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Top Selling Events
                </h3>
                <div className="h-[300px] w-full border-t border-l relative">
                  <div className="absolute left-[30%] top-[50px] flex items-center gap-2">
                    <div className="w-[120px] h-6 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-600">
                      Total Bookings
                    </span>
                  </div>
                  <div className="absolute top-[100px] left-8 text-sm text-gray-500">
                    Event A
                  </div>
                  <div className="absolute top-[150px] left-8 text-sm text-gray-500">
                    Event B
                  </div>
                  <div className="absolute top-[200px] left-8 text-sm text-gray-500">
                    Event C
                  </div>
                </div>
              </div>

              {/* Event Tickets Statistics Table */}
              <div className="bg-white mt-8 p-6 shadow rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Event Tickets Statistics
                </h3>

                {/* Search Input */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search Table"
                    className="border px-3 py-2 w-full max-w-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-left">
                      <tr>
                        <th className="px-4 py-3 font-bold border-r">ORDER</th>
                        <th className="px-4 py-3 font-bold border-r">
                          TICKETS
                        </th>
                        <th className="px-4 py-3 font-bold border-r">
                          TICKETS QUANTITY
                        </th>
                        <th className="px-4 py-3 font-bold border-r">
                          TOTAL PRICE
                        </th>
                        <th className="px-4 py-3 font-bold">TOTAL CHECKINS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td
                          className="px-4 py-4 text-center text-gray-500"
                          colSpan={5}
                        >
                          No data for table
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                  <div>
                    Rows per page:{" "}
                    <select className="ml-2 border rounded p-1">
                      <option>10</option>
                      <option>20</option>
                      <option>50</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Page</span>
                    <input
                      value="1"
                      disabled
                      className="border w-10 text-center rounded-md px-2 py-1"
                    />
                    <span>of 0</span>
                    <button disabled className="text-gray-400 px-2">
                      Previous
                    </button>
                    <button disabled className="text-gray-400 px-2">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "my-events" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Events</h2>
              <div>
                <button className="flex justify-end bg-[#ff2459] hover:bg-[#e91e63] text-white px-2 py-2 rounded-md ml-auto">
                  📅 Create Event
                </button>
              </div>
              {/* Filter Row */}
              <div className="flex flex-col md:flex-row gap-4 md:items-center mb-4">
                <label className="flex-col px-2px" htmlFor="rows">
                  Search Any
                  <input
                    type="text"
                    placeholder="Search"
                    className="border px-4 py-2 rounded-xl w-full md:max-w-xs"
                  />
                </label>
                <div className="flex items-center gap-2">
                  <label htmlFor="rows">Show</label>
                  <select
                    className="border rounded-xl  px-2 py-1"
                    defaultValue="10"
                    id="rows"
                  >
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                  </select>
                </div>
              </div>

              {/* Events Table */}
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
                    <tr className="border-t">
                      <td className="px-4 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800">
                            Test Events 01
                          </span>
                          <span className="text-gray-500 text-xs">
                            🕒 0 Bookings
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-700">
                          10 Jun 2025 03:03 AM
                          <br />
                          19 Jun 2025 05:05 AM
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          No
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="bg-blue-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          No
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          Published
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          Disabled
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button className="text-xl">⋮</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === "scan-tickets" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Scan Tickets
              </h2>
              <div className="bg-blue-100 text-gray-900 px-4 py-3 rounded-xl mb-4 border border-blue-300">
                <div className="flex items-center gap-2 p-1 font-semibold ">
                  <BiQrScan className="text-gray-900 font-bold text-xl" />
                  Scan Tickets
                </div>
              </div>

              <div className="bg-pink-200 text-brown-900 px-4 py-3 rounded-xl  mb-4 border border-brown-500">
                <div className="flex items-center gap-2 p-1 font-semibold">
                  <FaCamera className="text-brown-900 text-xl" />
                  Camera access required
                </div>
              </div>
            </div>
          )}

       

        {/* {activeSection === "my-bookings" && (
  <div className="mt-4 w-full">
    {/* Title */}
    {/* <h2 className="text-2xl font-bold text-gray-900 mb-4">My Bookings</h2> */}

    {/* Filters */}
    {/* <div className="grid md:grid-cols-5 gap-4 mb-4">
      <input
        type="text"
        placeholder="All Events"
        className="border px-4 py-2 rounded-md w-full"
      />
      <input
        type="text"
        placeholder="Search Any"
        className="border px-4 py-2 rounded-md w-full"
      />
      <DatePicker
        selected={null}
        onChange={(date) => {}}
        placeholderText="Booking Date"
        className="border px-4 py-2 rounded-md w-full"
        isClearable
        showPopperArrow={false}
      />
      <DatePicker
        selected={null}
        onChange={(date) => {}}
        placeholderText="Event Date"
        className="border px-4 py-2 rounded-md w-full"
        isClearable
        showPopperArrow={false}
      />
      <input
        type="text"
        placeholder="Show"
        className="border px-4 py-2 rounded-md w-full"
      />
    </div> */}

    {/* Reset Button */}
    {/* <button className="text-[#ff2459] border border-[#ff2459] hover:bg-[#ff2459] hover:text-white px-4 py-2 rounded mb-4">
      ⟳ Reset Filters
    </button>

    {/* Table */}
    {/* <div className="overflow-x-auto shadow-md rounded-lg bg-white">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 font-bold">
          <tr>
            <th className="px-4 py-3">Event</th>
            <th className="px-4 py-3">Customer Email</th>
            <th className="px-4 py-3">Ticket</th>
            <th className="px-4 py-3">Order Total</th>
            <th className="px-4 py-3">Promocode Reward(-)</th>
            <th className="px-4 py-3">Booked</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Cancellation</th>
            <th className="px-4 py-3">Expired</th>
            <th className="px-4 py-3">Download</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="px-4 py-4 text-center text-gray-800" colSpan={11}>
              No Bookings!
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)} */}


{activeSection === "my-earnings" && (
  <div className="mt-4">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">My Earning</h2>

    {/* Dropdown */}
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

    {/* Summary Boxes */}
    <div className="grid md:grid-cols-3 gap-4">
      {/* Total Bookings */}
      <div className="bg-sky-400 text-white p-6 rounded-lg flex justify-between items-center shadow">
        <div>
          <h3 className="text-lg font-semibold">Total Bookings</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <MdOutlineShoppingCartCheckout className="text-white text-3xl" />
      </div>

      {/* Admin Commission */}
      <div className="bg-gray-900 text-white p-6 rounded-lg flex justify-between items-center shadow">
        <div>
          <h3 className="text-lg font-semibold">Total Admin Commission</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <RiAdminFill className="text-white text-3xl" />
      </div>

      {/* Profit */}
      <div className="bg-green-400 text-white p-6 rounded-lg flex justify-between items-center shadow">
        <div>
          <h3 className="text-lg font-semibold">Total Profit</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <TbMoneybag className="text-white text-3xl" />
      </div>
    </div>

    {/* Earnings Table */}
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
            <td className="px-4 py-4 text-center text-gray-800" colSpan={6}>
              No Bookings!
            </td>
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
              {/* Button Add Tag  */}
             
                <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg transition hover:bg-gray-700">
                  <FaUserTag className="text-lg " />
                  <span className="text-sm font-semibold ">Add Tag</span>
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto p-6 m-4 ">
                <table className="min-w-full text-sm border border-gray-250 rounded-lg overflow-hidden">
                  <thead className="bg-gray-300 text-left ">
                    <tr>
                      <th className="px-4 py-3 font-bold border-r">Name</th>
                      <th className="px-4 py-3 font-bold border-r">Type</th>
                      <th className="px-4 py-3 font-bold border-r">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td
                        className="px-4 py-4 text-center text-gray-800"
                        colSpan={5}
                      >
                        No Tags !
                      </td>
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
                  <FaMapLocationDot className="text-lg " />
                  <span className="text-sm font-semibold ">Create Venue</span>

                </button>
              </div>
              </div>
              <div className="bg-blue-100 text-blue-900 px-4 py-3 rounded mb-4 border border-blue-300">
                <div className="flex items-center justify-left mb-4">
                     <MdPrivacyTip className="text-xl " /> 
                <span className="font-medium">
              Tip: 
                Add a new Venue only
                if it does not exist on the website. You can use the Venues
                created by other Organizers into your event. </span>
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
                  <tr className="border-t">
                    <td
                      className="px-4 py-4 text-center text-gray-800"
                      colSpan={5}
                    >
                      No Venues !
                    </td>
                  </tr>
                  {/* {data.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-3 flex items-center space-x-4">
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-gray-500 text-sm">
                            {item.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">{item.state}</td>
                      <td className="px-4 py-3">{item.city}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button className="flex items-center px-2 py-1 bg-red-100 text-red-600 rounded-lg">
                            <FaEdit className="mr-2" /> Edit
                          </button>
                          <button className="flex items-center px-2 py-1 bg-red-500 text-white rounded-lg">
                            <FaTrash className="mr-2" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}*/}
                </tbody>
              </table>
            </div>
          )}

        {activeSection === "guests" && (
  <div className="w-full px-4">
    {/* Heading and Buttons */}
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Manage Guests</h2>

      <div className="flex gap-2">
        {/* Create GuestList Button */}
        <button className="flex items-center gap-2 bg-[#ff2459] hover:bg-[#e91e63] text-white px-4 py-2 rounded-lg transition">
          <FaCalendarPlus className="text-md" />
          <span className="text-sm font-semibold">Create GuestsList</span>
        </button>

        {/* Create Guest Button */}
        <button className="flex items-center gap-2 bg-gray-900 hover:bg-[#e91e63] text-white px-4 py-2 rounded-lg transition">
          <FaCalendarPlus className="text-md" />
          <span className="text-sm font-semibold">Create Guest</span>
        </button>
      </div>
    </div>

    {/* Table */}
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
            <td colSpan={3} className="px-4 py-6 text-center text-gray-700">
              No Guest Found!
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)}
          {activeSection === "sub-organizers" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Manage Sub Organizers
              </h2>
              {/* Table */}
              <div className="overflow-x-auto p-6 m-4 ">
                <table className="min-w-full text-sm border border-gray-250 rounded-lg overflow-hidden">
                  <thead className="bg-gray-300 text-left ">
                    <tr>
                      <th className="px-4 py-3 font-bold border-r">Name</th>
                      <th className="px-4 py-3 font-bold border-r">Email</th>
                      <th className="px-4 py-3 font-bold border-r">Role</th>
                      <th className="px-4 py-3 font-bold border-r">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td
                        className="px-4 py-4 text-center text-gray-800"
                        colSpan={5}
                      >
                        {/* No Guest Found ! */}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === "reviews" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Manage Reviews</h2>
              <div className="flex flex-col md:flex-row gap-4 md:items-center mb-4 p-2 m-2">
                <label className="flex-col px-2px" htmlFor="rows">
                  Events
                  <input
                    type="text"
                    placeholder="Search"
                    className="border px-4 py-2 rounded-xl w-full md:max-w-xs p-2 m-2"
                  />
                </label>
                </div>
               {/* Table */}
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
            <td colSpan={3} className="px-4 py-6 text-center text-gray-700">
              {/* No Guest Found! */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;




