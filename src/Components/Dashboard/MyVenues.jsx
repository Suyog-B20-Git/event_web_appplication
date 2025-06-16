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


   const MyVenues = () => {
    const [activeSection, setActiveSection] = useState("my-venues");
const loggedInUser = "John Doe";
     const sections = [
     { name: "My Venues", icon: <FaMapLocation />, id: "my-venues" },
     ];
     
  return (
    <div className="mt-4 w-full">
      
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
                    Tip: Add a new Venue only if it does not exist on the
                    website. You can use the Venues created by other Organizers
                    into your event.{" "}
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
        </div>
  );
};

export default MyVenues;