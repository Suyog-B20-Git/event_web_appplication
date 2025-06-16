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


   const Guests = () => {
const [activeSection, setActiveSection] = useState("guests");
const loggedInUser = "John Doe";
     const sections = [
     { name: "Guests", icon: <MdGroups2 />, id: "guests" },
     ];

  return (
    <div className="mt-4 w-full">
  
     {activeSection === "guests" && (
            <div className="w-full px-4">
              {/* Heading and Buttons */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Manage Guests
                </h2>

                <div className="flex gap-2">
                  {/* Create GuestList Button */}
                  <button className="flex items-center gap-2 bg-[#ff2459] hover:bg-[#e91e63] text-white px-4 py-2 rounded-lg transition">
                    <FaCalendarPlus className="text-md" />
                    <span className="text-sm font-semibold">
                      Create GuestsList
                    </span>
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
                      <th className="px-4 py-3 font-bold border-r w-1/3">
                        Name
                      </th>
                      <th className="px-4 py-3 font-bold border-r w-1/3">
                        Total Guests
                      </th>
                      <th className="px-4 py-3 font-bold w-1/3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td
                        colSpan={3}
                        className="px-4 py-6 text-center text-gray-700"
                      >
                        No Guest Found!
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

export default Guests;