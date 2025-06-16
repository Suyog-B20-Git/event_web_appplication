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


   const ScanTickets = () => {
 const [activeSection, setActiveSection] = useState("scan-tickets");
const loggedInUser = "John Doe";
     const sections = [
  {
      name: "Scan Tickets",
      icon: <MdOutlineQrCodeScanner />,
      id: "scan-tickets",
    },
        ];


  return (
    <div className="mt-4 w-full">
    
     {activeSection === "scan-tickets" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Scan Tickets</h2>
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


        </div>
  );
};

export default ScanTickets;