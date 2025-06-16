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


   const MyTags = () => {
    const [activeSection, setActiveSection] = useState("my-tags");
const loggedInUser = "John Doe";
     const sections = [
     { name: "My Tags", icon: <FaTags />, id: "my-tags" },
     ];
     
  return (
    <div className="mt-4 w-full">
    
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
        </div>
  );
};

export default MyTags;