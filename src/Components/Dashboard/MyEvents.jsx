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


   const MyEvents = () => {
const [activeSection, setActiveSection] = useState("my-events");
const loggedInUser = "John Doe";
     const sections = [
    { name: "My Events", icon: <FaCalendarAlt />, id: "my-events" },
     ];
    
  return (
    <div className="mt-4 w-full">

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
       </div>
  );
};

export default MyEvents;