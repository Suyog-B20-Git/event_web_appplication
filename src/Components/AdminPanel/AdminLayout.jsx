import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { BiMenuAltLeft } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { GrDashboard } from 'react-icons/gr';
import { AiFillDashboard } from 'react-icons/ai';
import { FaPuzzlePiece, FaUserCircle, FaMoneyBillWave, FaRegFileAlt, FaRupeeSign, FaFolderOpen, FaCloudDownloadAlt } from 'react-icons/fa';
import { SlCalender } from 'react-icons/sl';
import { GiWallet, GiVerticalBanner } from 'react-icons/gi';
import { ImUsers } from 'react-icons/im';
import { HiOutlineLogout } from 'react-icons/hi';
import { HiClipboardDocumentList, HiOutlineUserCircle, HiOutlineUser, HiOutlineGlobeAlt } from 'react-icons/hi2';
import { FaClipboardList } from 'react-icons/fa';
import { RiContactsBook3Line } from 'react-icons/ri';
import { MdOutlinePermMedia } from 'react-icons/md';
import { PiListBulletsFill } from 'react-icons/pi';
import { FiSettings } from 'react-icons/fi';
import { BsBuildingsFill, BsPuzzleFill } from 'react-icons/bs';
import { TbTagStarred } from 'react-icons/tb';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarPinned, setIsSidebarPinned] = React.useState(false);
    const [isMouseHovering, setIsMouseHovering] = React.useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = React.useState(false);
    const [isEntitiesDropdownOpen, setIsEntitiesDropdownOpen] = React.useState(false);

    const profileDropdownRef = React.useRef(null);
    const userEmail = "superadmin@eventsnode.com";
    const isDesktopSidebarExpanded = isSidebarPinned || isMouseHovering;

    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
                setProfileDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const sections = [
        { name: "Dashboard", icon: <AiFillDashboard />, path: "/admin-panel", id: "adminDashboard" },
        { name: "Categories", icon: <FaFolderOpen />, path: "/admin-panel", id: "adminCategories" },
        { name: "Events", icon: <SlCalender />, path: "/admin-panel", id: "adminEvents" },
        { name: "Tags", icon: <FaPuzzlePiece />, path: "/admin/tags", id: "adminTags" },
        { name: "Bookings", icon: <FaMoneyBillWave />, path: "/admin/bookings", id: "adminBookings" },
        { name: "Commissions", icon: <GiWallet />, path: "/commission", id: "adminCommissions" },
        { name: "Taxes", icon: <HiClipboardDocumentList />, path: "/admin-panel", id: "adminTaxes" },
        { name: "Users", icon: <ImUsers />, path: "/admin/users", id: "adminUsers" },
        { name: "Contacts", icon: <RiContactsBook3Line />, path: "/contacts", id: "adminContacts" },
        { name: "Media", icon: <MdOutlinePermMedia />, path: "/admin-panel", id: "adminMedia" },
        { name: "Banners", icon: <GiVerticalBanner />, path: "/banners", id: "adminBanners" },
        { name: "Pages", icon: <FaRegFileAlt />, path: "/admin-panel", id: "adminPages" },
        { name: "Blog Posts", icon: <FaRegFileAlt />, path: "/admin/posts", id: "adminBlogPosts" },
        { name: "HeaderMenu", icon: <PiListBulletsFill />, path: "/header-menu", id: "adminHeaderMenu" },
        { name: "FooterMenu", icon: <PiListBulletsFill />, path: "/admin-panel", id: "adminFooterMenu" },
        { name: "Settings", icon: <FiSettings />, path: "/admin/settings", id: "adminSettings" },
        { name: "PromoCodes", icon: <TbTagStarred />, path: "/admin/promocodes", id: "adminPromoCodes" },
        { name: "Complimentary Bookings", icon: <BsPuzzleFill />, path: "/admin/complimentary-bookings", id: "adminComplimentaryBookings" },
        { name: "Currencies", icon: <FaRupeeSign />, path: "/admin/currencies", id: "adminCurrencies" },
    ];

    const entitiesItems = [
        { name: "Organizers", icon: <FaUserCircle />, path: "/admin-panel", id: "adminOrganizers" },
        { name: "Performers", icon: <FaPuzzlePiece />, path: "/admin-panel", id: "adminPerformers" },
        { name: "Venues", icon: <BsBuildingsFill />, path: "/admin/venues", id: "adminVenues" },
        { name: "Services", icon: <FaPuzzlePiece />, path: "/admin-panel", id: "adminServices" },
    ];

    const handleLogout = () => {
        console.log("Logout Action: Clearing user session...");
        window.location.href = '/login';
    };

    const handleNavigate = (path) => {
        navigate(path);
        setIsMobileSidebarOpen(false);
    };

    const toggleEntitiesDropdown = () => {
        setIsEntitiesDropdownOpen(!isEntitiesDropdownOpen);
    };

    const isActive = (path, id) => {
        if (id === 'adminUsers') {
            return location.pathname.startsWith('/admin/users') ||
                location.pathname.startsWith('/admin/add-user') ||
                location.pathname.startsWith('/admin/edit-user') ||
                location.pathname.startsWith('/admin/view-user');
        }
        if (id === 'adminBlogPosts') {
            return location.pathname.startsWith('/admin/posts') ||
                location.pathname.startsWith('/admin/add-post') ||
                location.pathname.startsWith('/admin/edit-post');
        }
        return location.pathname === path;
    };

    const getBreadcrumbText = () => {
        const pathname = location.pathname;
        if (pathname.includes('/admin/add-user')) return 'Add New User';
        if (pathname.includes('/admin/edit-user')) return 'Edit User';
        if (pathname.includes('/admin/view-user')) return 'View User';
        if (pathname.includes('/admin/users')) return 'Users';
        if (pathname.includes('/admin/tags')) return 'Tags';
        if (pathname.includes('/admin/bookings')) return 'Bookings';
        if (pathname.includes('/header-menu')) return 'Header Menu';
        if (pathname.includes('/commission')) return 'Commissions';
        if (pathname.includes('/banners')) return 'Banners';
        if (pathname.includes('/admin/add-post')) return 'Add New Post';
        if (pathname.includes('/admin/edit-post')) return 'Edit Post';
        if (pathname.includes('/admin/posts')) return 'Blog Posts';
        if (pathname.includes('/contacts')) return 'Contacts';
        if (pathname.includes('/admin/venues')) return 'Venues';
        if (pathname.includes('/admin/settings')) return 'Settings';
        if (pathname.includes('/admin/promocodes')) return 'Promo Codes';
        if (pathname.includes('/admin/complimentary-bookings')) return 'Complimentary Bookings';
        if (pathname.includes('/admin/currencies')) return 'Currencies';
        return 'Dashboard';
    };

    return (
        <div className="flex min-h-screen bg-gray-50 w-full max-w-full overflow-x-hidden">
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden ${isMobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMobileSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            <aside
                onMouseEnter={() => setIsMouseHovering(true)}
                onMouseLeave={() => setIsMouseHovering(false)}
                className={`bg-gradient-to-b from-gray-900 to-slate-800 text-white h-screen p-2 pt-4 fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out overflow-y-auto
                        md:translate-x-0
                        ${isMobileSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
                        ${isDesktopSidebarExpanded ? 'md:w-56' : 'md:w-16'}`
                }
            >
                <div className="flex items-center justify-between mb-4 px-2">
                    <a href="/" className="flex items-center space-x-3 transition-all duration-200 ease-in-out hover:scale-105 w-full">
                        <GrDashboard className="w-8 h-8 text-white min-w-[32px] flex-shrink-0" />
                        <span className={`text-white font-bold text-lg whitespace-nowrap transition-opacity ${isDesktopSidebarExpanded || isMobileSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>EVENTSNODE</span>
                    </a>
                    <button onClick={() => setIsMobileSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
                        <IoClose size={28} />
                    </button>
                </div>

                <div className="flex items-center space-x-3 mb-4 p-2 rounded-lg">
                    <FaUserCircle className="w-8 h-8 rounded-full min-w-[32px] flex-shrink-0" />
                    <span className={`text-white font-medium whitespace-nowrap transition-opacity ${isDesktopSidebarExpanded || isMobileSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Admin</span>
                </div>

                <nav className="space-y-1">
                    {sections.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleNavigate(item.path)}
                            title={item.name}
                            className={`flex items-center space-x-4 cursor-pointer p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 ease-in-out ${isActive(item.path, item.id)
                                ? "text-white bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg"
                                : "text-gray-300"
                                }`}
                        >
                            <div className="text-xl flex-shrink-0">{item.icon}</div>
                            <span className={`text-sm font-medium whitespace-nowrap transition-opacity ${isDesktopSidebarExpanded || isMobileSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>{item.name}</span>
                        </div>
                    ))}

                    {/* Entities Dropdown */}
                    <div className="mt-4">
                        <div
                            onClick={toggleEntitiesDropdown}
                            className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 ease-in-out text-gray-300"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="text-xl flex-shrink-0">
                                    <FaPuzzlePiece />
                                </div>
                                <span className={`text-sm font-medium whitespace-nowrap transition-opacity ${isDesktopSidebarExpanded || isMobileSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                                    Entities
                                </span>
                            </div>
                            <div className={`transition-transform duration-200 ${isEntitiesDropdownOpen ? 'rotate-180' : 'rotate-0'} ${isDesktopSidebarExpanded || isMobileSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                                {isEntitiesDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </div>
                        </div>

                        {isEntitiesDropdownOpen && (
                            <div className="ml-4 mt-1 space-y-1">
                                {entitiesItems.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleNavigate(item.path)}
                                        title={item.name}
                                        className="flex items-center space-x-4 cursor-pointer p-2 rounded-lg hover:bg-gray-700/50 transition-all duration-200 ease-in-out text-gray-300"
                                    >
                                        <div className="text-lg flex-shrink-0">{item.icon}</div>
                                        <span className={`text-sm font-medium whitespace-nowrap transition-opacity ${isDesktopSidebarExpanded || isMobileSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                                            {item.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className={`flex flex-col flex-1 w-full max-w-full transition-all duration-300 relative z-20 ${isDesktopSidebarExpanded ? 'md:ml-56' : 'md:ml-16'}`}>
                {/* Header */}
                <header className="p-2 md:p-3 h-14 md:h-16 flex items-center justify-between z-30 sticky top-0 bg-white border-b border-gray-200 shadow-sm pointer-events-none">
                    <div className="flex items-center pointer-events-auto">
                        <button onClick={() => setIsMobileSidebarOpen(true)} className="p-2 rounded-md text-gray-700 hover:bg-gray-200/70 mr-2 md:hidden">
                            <BiMenuAltLeft size={24} />
                        </button>
                        <button onClick={() => setIsSidebarPinned(prev => !prev)} className="p-2 rounded-md text-gray-700 hover:bg-gray-200/70 mr-4 hidden md:block">
                            <BiMenuAltLeft size={24} />
                        </button>

                        <div className="text-sm text-gray-500 flex items-center">
                            <span className="cursor-pointer hover:text-gray-900 hidden sm:inline" onClick={() => navigate('/admin-panel')}>Dashboard</span>
                            <span className="mx-2 font-light text-gray-400 hidden sm:inline">&gt;</span>
                            <span className="font-semibold text-gray-800">{getBreadcrumbText()}</span>
                        </div>
                    </div>

                    <div className="relative pointer-events-auto" ref={profileDropdownRef}>
                        <button onClick={() => setProfileDropdownOpen(prev => !prev)} className="p-2 rounded-full hover:bg-gray-200/70">
                            <HiOutlineUserCircle size={28} className="text-gray-600" />
                        </button>
                        <div className={`absolute right-0 mt-2 w-64 origin-top-right rounded-xl shadow-2xl z-50 transition-all duration-200 ease-out ${isProfileDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
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

                {/* Page Content */}
                <main className="flex-1 w-full max-w-full px-4 md:px-6 pb-4 md:pb-6 pt-4 bg-gray-50 min-h-0 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
