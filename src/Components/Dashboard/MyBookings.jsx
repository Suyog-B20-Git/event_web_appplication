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
import { MdPrivacyTip, MdOutlineQrCodeScanner,MdGroups2,} from "react-icons/md";
import {FaPeopleArrows, FaMapLocation, FaTags, FaMoneyCheckDollar, FaMapLocationDot,} from "react-icons/fa6";
import { GrDashboard } from "react-icons/gr";
import { TbActivityHeartbeat } from "react-icons/tb";
import { FiCreditCard } from "react-icons/fi";
import { IoTicket } from "react-icons/io5";
import { TbCalendarEvent, TbLayoutDashboardFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";


import {
  FaBars,
  FaWallet,
  FaCalendarAlt, 
} from "react-icons/fa";


   const MyBookings = () => {
    const [activeSection, setActiveSection] = useState("my-bookings");
const loggedInUser = "John Doe";
     const sections = [
     { name: "My Bookings", icon: <FaMoneyCheckDollar />, id: "my-bookings" },
     ];

  return (
    <div className="mt-4 w-full">
     
      {activeSection === "my-bookings" && (
            <div className="mt-4 w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                My Bookings
              </h2>
              <div className="flex flex-wrap gap-4 mb-4">
                {/* Events  */}

                <label className="flex-col px-2px" htmlFor="rows">
                  Events
                  <input
                    type="text"
                    placeholder="All Events"
                    className=" flex flex-col border px-4 py-2 rounded-xl w-full md:w-[500px]"
                  />
                </label>

                {/* Booking Date  */}
                <label className="flex-col px-2px" htmlFor="rows">
                  Booking Date
                  <input
                    type="Date"
                    placeholder="Booking Date "
                    className="flex flex-col border px-4 py-2 rounded-xl w-full md:w-[500px]"
                  />
                </label>
                {/* Event Date  */}
                <label className="flex-col px-2px" htmlFor="rows">
                  Event Date
                   <input
                    type="Date"
                    placeholder="Event Date "
                    className="flex flex-col border px-4 py-2 rounded-xl w-full md:w-[500px]"
                  /> 
                   
                </label>
                {/* Search Any  */}
                <label className="flex-col px-2px" htmlFor="rows">
                  Search Any
                  <input
                    type="text"
                    placeholder="Search "
                    className="flex flex-col border px-4 py-2 rounded-xlw-full md:w-[500px]"
                  />
                </label>
                {/* <DatePicker
      selected={null}
      onChange={(date) => {}}
      placeholderText="Booking Date"
      className="border px-4 py-2 rounded-md w-full"
      isClearable
      showPopperArrow={false}
    />
    <DatePicker
     
      onChange={(date) => {}}
      placeholderText="Event Date"
      className="border px-4 py-2 rounded-md w-full"
      isClearable
      showPopperArrow={false}
    /> */}

                {/* Show  */}
                <label className="flex-col px-2px" htmlFor="rows">
                  Show
                  <input
                    type="text"
                    placeholder="10"
                    className="flex flex-col border px-4 py-2 rounded-xl w-full md:w-[500px]"
                  />
                </label>

                <button className=" flex justify-center w-1/6  h-8 text-[#ff2459] border border-[#ff2459] hover:bg-[#dd2e5a] hover:text-white  m-7 rounded-xl mb-2">
                  <IoMdRefresh className=" flex flex-wrap text-[#ff2459 font-bold text-md" />
                  Reset Filters
                </button>
              </div>
              {/* Booking Table */}
              <div className="overflow-x-auto shadow-md rounded-lg bg-white">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-100 font-bold">
                    <tr>
                      <th className="px-4 py-3">Event</th>
                      <th className="px-4 py-3">Customer Email</th>
                      <th className="px-4 py-3">Ticket</th>
                      <th className="px-4 py-3">Order Total</th>
                      <th className="px-4 py-3">Promocode Reward(-)</th>
                      <th className="px-4 py-3">Booked On</th>
                      <th className="px-4 py-3">Payment</th>
                      <th className="px-4 py-3">Checked in</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Cancellation</th>
                      <th className="px-4 py-3">Expired</th>
                      <th className="px-4 py-3">Download</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td
                        className="px-4 py-4 text-center text-gray-800"
                        colSpan={13}
                      >
                        No Bookings!
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

    </div>
  );
};

export default MyBookings;