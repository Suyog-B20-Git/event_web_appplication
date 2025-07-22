import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { GrDashboard } from "react-icons/gr";
import { AiFillDashboard } from "react-icons/ai";
import { FaPuzzlePiece } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa"; // Corrected icon import
import { SlCalender } from "react-icons/sl";
import { GiWallet, GiVerticalBanner } from "react-icons/gi";
import { FaMoneyBillWave, FaRegFileAlt, FaRupeeSign, FaFolderOpen } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { RiContactsBook3Line } from "react-icons/ri";
import { MdOutlinePermMedia, MdOutlineDocumentScanner } from "react-icons/md";
import { PiListBulletsFill } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import { BsBuildingsFill, BsPuzzleFill } from "react-icons/bs";
import { TbTagStarred } from "react-icons/tb";

import Events from './AdminEvents'
import Categories from './AdminCategories';
import Dashboard from './AdminDashboard';
import AdminPages from './AdminPages';

const AdminPanelOverview = () => {

  const [activeSection, setActiveSection] = useState("adminDashboard");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sections = [
    { name: "Dashboard", icon: <AiFillDashboard />, id: "adminDashboard" },
    { name: "Categories", icon: <FaFolderOpen />, id: "adminCategories" },
    { name: "Events", icon: <SlCalender />, id: "adminEvents" },
    { name: "Tags", icon: <FaPuzzlePiece />, id: "adminTags" },
    { name: "Bookings", icon: <FaMoneyBillWave />, id: "adminBookings" },
    { name: "Commissions", icon: <GiWallet />, id: "adminCommissions" },
    { name: "Taxes", icon: <HiClipboardDocumentList />, id: "adminTaxes" },
    { name: "Users", icon: <ImUsers />, id: "adminUsers" },
    { name: "Contacts", icon: <RiContactsBook3Line />, id: "adminContacts" },
    { name: "Media", icon: <MdOutlinePermMedia />, id: "adminMedia" },
    { name: "Banners", icon: <GiVerticalBanner />, id: "AdminBanners" },
    { name: "Pages", icon: <FaRegFileAlt />, id: "adminPages" },
    { name: "Blog Posts", icon: <MdOutlineDocumentScanner />, id: "adminBlogPosts" },
    { name: "HeaderMenu", icon: <PiListBulletsFill />, id: "adminHeaderMenu" },
    { name: "FooterMenu", icon: <PiListBulletsFill />, id: "adminFooterMenu" },
    { name: "Venues", icon: <BsBuildingsFill />, id: "adminVenues" },
    { name: "Settings", icon: <FiSettings />, id: "adminSettings" },
    { name: "PromoCodes", icon: <TbTagStarred />, id: "adminPromoCodes" },
    { name: "Complimentary Bookings", icon: <BsPuzzleFill />, id: "adminComplimentaryBookings" },
    { name: "Currencies", icon: <FaRupeeSign />, id: "adminCurrencies" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 mt-[-88px]">
      {/* sideBar  */}
      <div className="fixed left-0 top-22 z-50 mt-2 ml-2">
        <aside
          ref={sidebarRef}
          onMouseEnter={() => setIsSidebarExpanded(true)}
          onMouseLeave={() => setIsSidebarExpanded(false)}
          className={`bg-gray-900 text-white h-[calc(100vh-1rem)] p-2 pt-5 fixed top-0 left-0 transition-all duration-300 z-40 overflow-y-auto ${isSidebarExpanded ? "w-56" : "w-14"
            }`}
        >
          {/* --- EVENTSNODE Section --- */}
          <div className="flex items-center space-x-3 mb-4 sticky top-0 bg-gray-900 pb-2 px-1">
            <GrDashboard className="w-8 h-8 text-white" />
            {isSidebarExpanded && (
              <div className="text-white font-bold text-lg">EVENTSNODE</div>
            )}
          </div>
          
          {/* --- Admin Profile Section --- */}
          <div className="flex items-center space-x-3 mb-6 sticky top-12 bg-gray-900 pb-2 px-1">
            <FaUserCircle className="w-8 h-8 rounded-full" />
            {isSidebarExpanded && (
              <div className="text-white font-medium">Admin</div>
            )}
          </div>

          <div className="space-y-1">
            {sections.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center space-x-3 cursor-pointer p-3 rounded hover:bg-gray-700 ${activeSection === item.id ? "bg-red-500" : ""
                  }`}
              >
                <div className="text-lg">{item.icon}</div>
                {isSidebarExpanded && <div className="text-sm">{item.name}</div>}
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* MAIN CONTENT */}
      {/* This section is now back to your original code */}
      <main className={`flex-1 pt-20 px-4 p-4 md:p-6 mt-16 md:mt-0 overflow-y-auto transition-all duration-300 ${isSidebarExpanded ? 'ml-56' : 'ml-14'}`}>
        {activeSection === "adminCategories" && <Categories />}
        {activeSection === "adminEvents" && <Events />}
        {activeSection === "scan-tickets" && <ScanTickets />}
        {activeSection === "adminTags" && <Tags />}
        {activeSection === "adminBookings" && <Bookings />}
        {activeSection === "adminCommissions" && <Commissions />}
        {activeSection === "adminTaxes" && <Taxes />}
        {activeSection === "adminUsers" && <Users />}
        {activeSection === "adminContacts" && <Contacts />}
        {activeSection === "adminMedia" && <Media />}
        {activeSection === "AdminBanners" && <Banners />}
        {activeSection === "adminPages" && <AdminPages />}
        {activeSection === "adminBlogPosts" && <BlogPosts />}
        {activeSection === "adminHeaderMenu" && <HeaderMenu />}
        {activeSection === "adminFooterMenu" && <FooterMenu />}
        {activeSection === "adminVenues" && <Venues />}
        {activeSection === "adminSettings" && <Settings />}
        {activeSection === "adminPromoCodes" && <PromoCodes />}
        {activeSection === "adminComplimentaryBookings" && <Complimentary Bookings />}
        {activeSection === "adminCurrencies" && <Currencies />}
        {/* {activeSection === "addCategory" && <AddCategory />} */}
      </main>
    </div>
  )
}

export default AdminPanelOverview;