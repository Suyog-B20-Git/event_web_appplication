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


   const SubOrganizers = () => {
    const [activeSection, setActiveSection] = useState( "sub-organizers");
const loggedInUser = "John Doe";
     const sections = [
      {
      name: "Sub Organizers",
      icon: <FaPeopleArrows />,
      id: "sub-organizers",
    },
     ];


  return (
    <div className="mt-4 w-full">
  
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

        </div>
  );
};

export default SubOrganizers;