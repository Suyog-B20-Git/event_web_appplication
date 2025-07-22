import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { GrDashboard } from "react-icons/gr";
import { AiFillDashboard } from "react-icons/ai";
import { FaPuzzlePiece } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { GiWallet, GiVerticalBanner } from "react-icons/gi";
import { FaMoneyBillWave, FaRegFileAlt, FaRupeeSign, FaFolderOpen } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { HiOutlineLogout } from "react-icons/hi";
import {
    HiClipboardDocumentList,
    HiOutlineUserCircle,
    HiOutlineUser,
    HiOutlineGlobeAlt,
} from "react-icons/hi2";
import { RiContactsBook3Line } from "react-icons/ri";
import { MdOutlinePermMedia, MdOutlineDocumentScanner } from "react-icons/md";
import { PiListBulletsFill } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import { BsBuildingsFill, BsPuzzleFill } from "react-icons/bs";
import { TbTagStarred } from "react-icons/tb";
import { BiMenuAltLeft } from "react-icons/bi";

import Events from './AdminEvents'
import Categories from './AdminCategories';
import Dashboard from './AdminDashboard';
import AdminPages from './AdminPages';
import AdminBlogPost from './AdminBlogPost';

const AdminPanelOverview = () => {

    const [activeSection, setActiveSection] = useState("adminDashboard");
    const [isSidebarPinned, setIsSidebarPinned] = useState(false);
    const [isMouseHovering, setIsMouseHovering] = useState(false);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const sidebarRef = useRef(null);
    const profileDropdownRef = useRef(null);

    const userEmail = "superadmin@eventsnode.com";
    const isSidebarExpanded = isSidebarPinned || isMouseHovering;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
                setProfileDropdownOpen(false);
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

    const activeSectionName = sections.find(sec => sec.id === activeSection)?.name;

    const handleLogout = () => {
        console.log("Logout Action: Clearing user session...");
        window.location.href = '/login';
    };

    return (
        <div className="flex min-h-screen bg-gray-100 mt-[-88px]">
            <aside
                ref={sidebarRef}
                onMouseEnter={() => setIsMouseHovering(true)}
                onMouseLeave={() => setIsMouseHovering(false)}
                className={`bg-gradient-to-b from-gray-900 to-slate-800 text-white h-screen p-2 pt-5 fixed top-0 left-0 transition-all duration-300 z-50 overflow-y-auto ${isSidebarExpanded ? "w-56" : "w-14"
                    }`}
            >
                <a href="/">
                    <div className="flex items-center space-x-3 mb-2 p-2 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-700/50 hover:scale-105">
                        <GrDashboard className="w-8 h-8 text-white min-w-[32px]" />
                        {isSidebarExpanded && (
                            <div className="text-white font-bold text-lg">EVENTSNODE</div>
                        )}
                    </div>
                </a>
                <div className="flex items-center space-x-3 mb-3 p-2 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-700/50 hover:scale-105">
                    <FaUserCircle className="w-8 h-8 rounded-full min-w-[32px]" />
                    {isSidebarExpanded && (
                        <div className="text-white font-medium">Admin</div>
                    )}
                </div>
                <div className="space-y-1">
                    {sections.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 ease-in-out hover:translate-x-2 ${activeSection === item.id ? "text-white bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg translate-x-2" : "text-gray-300"
                                }`}
                        >
                            <div className="text-lg">{item.icon}</div>
                            {isSidebarExpanded && <div className="text-sm font-medium">{item.name}</div>}
                        </div>
                    ))}
                </div>
            </aside>

            <div className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarExpanded ? 'ml-56' : 'ml-14'}`}>
                <header
                    className={`p-4 h-16 flex items-center justify-between z-40 sticky top-0 bg-white/70 backdrop-blur-lg border-b border-gray-200/50`}
                >
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsSidebarPinned(prev => !prev)}
                            className="p-2 rounded-md text-gray-700 hover:bg-gray-200/70 mr-4"
                        >
                            <BiMenuAltLeft size={24} />
                        </button>

                        {activeSectionName && (
                            <div className="text-sm text-gray-500 flex items-center">
                                <span
                                    className="cursor-pointer hover:text-gray-900"
                                    onClick={() => setActiveSection('adminDashboard')}
                                >
                                    Dashboard
                                </span>
                                <span className="mx-2 font-light text-gray-400">&gt;</span>
                                <span className="font-semibold text-gray-800">{activeSectionName}</span>
                            </div>
                        )}
                    </div>

                    <div className="relative" ref={profileDropdownRef}>
                        <button
                            onClick={() => setProfileDropdownOpen(prev => !prev)}
                            className="p-2 rounded-full hover:bg-gray-200/70"
                        >
                            <HiOutlineUserCircle size={28} className="text-gray-600" />
                        </button>

                        <div
                            className={`absolute right-0 mt-2 w-64 origin-top-right rounded-xl shadow-2xl z-50 transition-all duration-200 ease-out 
                            ${isProfileDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                                }`}
                        >
                            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                                <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-100">
                                    <p className="text-sm text-gray-500">Signed in as</p>
                                    <p className="text-base font-semibold text-gray-800 truncate">{userEmail}</p>
                                </div>
                                <div className="py-2 px-2">
                                    <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-200 group">
                                        <HiOutlineUser className="mr-3 text-gray-400 group-hover:text-blue-500" size={18} /> Profile
                                    </a>
                                    <a href="/" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-200 group">
                                        <HiOutlineGlobeAlt className="mr-3 text-gray-400 group-hover:text-blue-500" size={18} /> Website
                                    </a>
                                </div>
                                <div className="py-2 px-2 border-t border-gray-100">
                                    <button onClick={handleLogout} className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors duration-200 group">
                                        <HiOutlineLogout className="mr-3 text-red-400 group-hover:text-red-500" size={18} /> Logout
                                    </button>
                                 </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    {activeSection === "adminCategories" && <Categories />}
                    {activeSection === "adminDashboard" && <Dashboard />}
                    {activeSection === "adminEvents" && <Events />}
                    {activeSection === "adminPages" && <AdminPages />}
                    {activeSection === "adminBlogPosts" && <AdminBlogPost />}
                    {activeSection === "scan-tickets" && <ScanTickets />}
                    {activeSection === "adminTags" && <Tags />}
                    {activeSection === "adminBookings" && <Bookings />}
                    {activeSection === "adminCommissions" && <Commissions />}
                    {activeSection === "adminTaxes" && <Taxes />}
                    {activeSection === "adminUsers" && <Users />}
                    {activeSection === "adminContacts" && <Contacts />}
                    {activeSection === "adminMedia" && <Media />}
                    {activeSection === "AdminBanners" && <Banners />}
                    {activeSection === "adminHeaderMenu" && <HeaderMenu />}
                    {activeSection === "adminFooterMenu" && <FooterMenu />}
                    {activeSection === "adminVenues" && <Venues />}
                    {activeSection === "adminSettings" && <Settings />}
                    {activeSection === "adminPromoCodes" && <PromoCodes />}
                    {activeSection === "adminComplimentaryBookings" && <ComplimentaryBookings />}
                    {activeSection === "adminCurrencies" && <Currencies />}
                </main>
            </div>
        </div>
    )
}

export default AdminPanelOverview;