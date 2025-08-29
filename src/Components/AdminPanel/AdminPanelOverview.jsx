import React, { useState, useRef, useEffect } from 'react';
import { GrDashboard } from "react-icons/gr";
import { AiFillDashboard } from "react-icons/ai";
import { FaPuzzlePiece, FaUserCircle, FaMoneyBillWave, FaRegFileAlt, FaRupeeSign, FaFolderOpen } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { GiWallet, GiVerticalBanner } from "react-icons/gi";
import { ImUsers } from "react-icons/im";
import { HiOutlineLogout } from "react-icons/hi";
import { HiClipboardDocumentList, HiOutlineUserCircle, HiOutlineUser, HiOutlineGlobeAlt } from "react-icons/hi2";
import { RiContactsBook3Line } from "react-icons/ri";
import { MdOutlinePermMedia, MdOutlineDocumentScanner } from "react-icons/md";
import { PiListBulletsFill } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import { BsBuildingsFill, BsPuzzleFill } from "react-icons/bs";
import { TbTagStarred } from "react-icons/tb";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


import Events from './AdminEvents';
import Categories from './AdminCategories';
import Dashboard from './AdminDashboard';
import AdminPages from './AdminPages';
import OrderPages from './OrderPages';
import AdminBlogPost from './AdminBlogPost';
import AdminCreatePage from './AdminCreatePage';
import AdminViewPage from './AdminViewPage';
import AdminAddPost from './AdminAddPost';
import AdminTags from './AdminTags';
import AdminBookings from './AdminBookings';
import AdminHeaderMenu from './AdminHeaderMenu';
import AdminFooterMenu from './AdminFooterMenu';
import AdminCommissions from './AdminCommissions';
import AdminTaxes from './AdminTaxes';
import AdminUsers from './AdminUsers';
import AdminOrganizers from './AdminOrganizers';
import AdminViewOrganizer from './AdminViewOrganizer';
import AdminEditOrganizer from './AdminEditOrganizer';
import AdminAddOrganizer from './AdminAddOrganizer';
import AdminPerformers from './AdminPerformers';
import AdminViewPerformer from './AdminViewPerformer';
import AdminEditPerformer from './AdminEditPerformer';
import AdminAddPerformer from './AdminAddPerformer';
import AdminContacts from './AdminContacts';
import AdminBanners from './AdminBanners';
import AdminVenues from './AdminVenues';
import AdminEditVenue from './AdminEditVenue';
import AdminViewVenue from './AdminViewVenue';
import AdminAddVenue from './AdminAddVenue';
import AdminServices from './AdminServices';
import AdminViewService from './AdminViewService';
import AdminEditService from './AdminEditService';
import AdminAddService from './AdminAddService';
import AdminSettings from './AdminSettings';
import AdminPromocodes from './AdminPromocodes';
import AdminComplimentaryBookings from './AdminComplimentaryBookings';
import AdminCurrencies from './AdminCurrencies';



const Commissions = () => <AdminCommissions />;

const Taxes = () => <AdminTaxes />;
const Users = () => <AdminUsers />;
const Contacts = () => <AdminContacts />;
const Banners = () => <AdminBanners />;
const Venues = () => <AdminVenues />;
const Settings = () => <AdminSettings />;
const PromoCodes = () => <AdminPromocodes />;
const ComplimentaryBookings = () => <AdminComplimentaryBookings />;
const Currencies = () => <AdminCurrencies />;



const Media = () => <div>Media Component</div>;

const ScanTickets = () => <div>ScanTickets Component</div>;

const AdminPanelOverview = () => {
    const [activeSection, setActiveSection] = useState("adminDashboard");
    const [isSidebarPinned, setIsSidebarPinned] = useState(false);
    const [isMouseHovering, setIsMouseHovering] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedOrganizer, setSelectedOrganizer] = useState(null);
    const [selectedPerformer, setSelectedPerformer] = useState(null);
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [isEntitiesDropdownOpen, setIsEntitiesDropdownOpen] = useState(false);

    const profileDropdownRef = useRef(null);
    const userEmail = "superadmin@eventsnode.com";
    const isDesktopSidebarExpanded = isSidebarPinned || isMouseHovering;

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
        { name: "Banners", icon: <GiVerticalBanner />, id: "adminBanners" },
        { name: "Pages", icon: <FaRegFileAlt />, id: "adminPages" },
        { name: "Blog Posts", icon: <MdOutlineDocumentScanner />, id: "adminBlogPosts" },
        { name: "HeaderMenu", icon: <PiListBulletsFill />, id: "adminHeaderMenu" },
        { name: "FooterMenu", icon: <PiListBulletsFill />, id: "adminFooterMenu" },
        { name: "Settings", icon: <FiSettings />, id: "adminSettings" },
        { name: "PromoCodes", icon: <TbTagStarred />, id: "adminPromoCodes" },
        { name: "Complimentary Bookings", icon: <BsPuzzleFill />, id: "adminComplimentaryBookings" },
        { name: "Currencies", icon: <FaRupeeSign />, id: "adminCurrencies" },
        { name: "Scan Tickets", icon: <MdOutlineDocumentScanner />, id: "adminScanTickets" },
    ];

    // Entities dropdown items
    const entitiesItems = [
        { name: "Organizers", icon: <FaUserCircle />, id: "adminOrganizers" },
        { name: "Performers", icon: <FaPuzzlePiece />, id: "adminPerformers" },
        { name: "Venues", icon: <BsBuildingsFill />, id: "adminVenues" },
        { name: "Services", icon: <FaPuzzlePiece />, id: "adminServices" },
    ];

    const activeSectionName = sections.find(sec => sec.id === activeSection)?.name || 'Dashboard';

    const handleLogout = () => {
        console.log("Logout Action: Clearing user session...");
        window.location.href = '/login';
    };

    const handleNavigate = (sectionId) => {
        setActiveSection(sectionId);
        setIsMobileSidebarOpen(false);
        setSelectedPage(null);
        setSelectedPost(null);
    };

    const toggleEntitiesDropdown = () => {
        setIsEntitiesDropdownOpen(!isEntitiesDropdownOpen);
    };

    const handleNavigateToCreatePage = (pageData = null) => {
        setSelectedPage(pageData);
        setActiveSection(pageData ? "adminEditPage" : "adminCreatePage");
    };

    const handleNavigateToViewPage = (page) => {
        setSelectedPage(page);
        setActiveSection("adminViewPage");
    };

    const handleNavigateToEditPage = (page) => {
        setSelectedPage(page);
        setActiveSection("adminEditPage");
    };

    const handleNavigateToOrderPages = () => {
        setActiveSection("adminOrderPages");
    };

    const handlePageCreate = (newPage) => {
        setActiveSection("adminPages");
    };

    const handlePageUpdate = (updatedPage) => {
        setActiveSection("adminPages");
    };

    const handleBackToPages = () => {
        setActiveSection("adminPages");
        setSelectedPage(null);
    };

    const handleNavigateToAddPost = () => {
        setSelectedPost(null);
        setActiveSection("adminAddPost");
    };

    const handleNavigateToEditPost = (postData) => {
        setSelectedPost(postData);
        setActiveSection("adminEditPost");
    };

    const handleBackToPosts = () => {
        setActiveSection("adminBlogPosts");
        setSelectedPost(null);
    };

    const handleNavigateToViewOrganizer = (organizer) => {
        setSelectedOrganizer(organizer);
        setActiveSection("adminViewOrganizer");
    };

    const handleNavigateToEditOrganizer = (organizer) => {
        setSelectedOrganizer(organizer);
        setActiveSection("adminEditOrganizer");
    };

    const handleNavigateToAddOrganizer = () => {
        setSelectedOrganizer(null);
        setActiveSection("adminAddOrganizer");
    };

    const handleBackToOrganizers = () => {
        setActiveSection("adminOrganizers");
        setSelectedOrganizer(null);
    };

    const handleOrganizerCreate = (newOrganizer) => {
        setActiveSection("adminOrganizers");
        setSelectedOrganizer(null);
    };

    const handleOrganizerUpdate = (updatedOrganizer) => {
        setActiveSection("adminOrganizers");
        setSelectedOrganizer(null);
    };

    // Performer navigation handlers
    const handleNavigateToViewPerformer = (performer) => {
        setSelectedPerformer(performer);
        setActiveSection("adminViewPerformer");
    };

    const handleNavigateToEditPerformer = (performer) => {
        setSelectedPerformer(performer);
        setActiveSection("adminEditPerformer");
    };

    const handleNavigateToAddPerformer = () => {
        setSelectedPerformer(null);
        setActiveSection("adminAddPerformer");
    };

    const handleBackToPerformers = () => {
        setActiveSection("adminPerformers");
        setSelectedPerformer(null);
    };

    const handlePerformerUpdate = () => {
        setActiveSection("adminPerformers");
        setSelectedPerformer(null);
    };

    // Venue navigation handlers
    const handleNavigateToViewVenue = (venue) => {
        setSelectedVenue(venue);
        setActiveSection("adminViewVenue");
    };

    const handleNavigateToEditVenue = (venue) => {
        setSelectedVenue(venue);
        setActiveSection("adminEditVenue");
    };

    const handleNavigateToAddVenue = () => {
        setSelectedVenue(null);
        setActiveSection("adminAddVenue");
    };

    const handleBackToVenues = () => {
        setActiveSection("adminVenues");
        setSelectedVenue(null);
    };

    const handleVenueCreate = (newVenue) => {
        setActiveSection("adminVenues");
        setSelectedVenue(null);
    };

    const handleVenueUpdate = (updatedVenue) => {
        setActiveSection("adminVenues");
        setSelectedVenue(null);
    };

    const handlePostCreate = (newPost) => {
        console.log('New post created:', newPost);
        setActiveSection("adminBlogPosts");
        setSelectedPost(null);
    };

    const handlePostUpdate = (updatedPost) => {
        console.log('Post updated:', updatedPost);
        setActiveSection("adminBlogPosts");
        setSelectedPost(null);
    };

    const getBreadcrumbText = () => {
        switch (activeSection) {
            case "adminViewPage":
                return selectedPage ? `View: ${selectedPage.title}` : "View Page";
            case "adminEditPage":
                return selectedPage ? `Edit: ${selectedPage.title}` : "Edit Page";
            case "adminCreatePage":
                return "Create New Page";
            case "adminOrderPages":
                return "Order Pages";
            case "adminAddPost":
                return "Add New Post";
            case "adminEditPost":
                return selectedPost ? `Edit: ${selectedPost.title}` : "Edit Post";
            case "adminOrganizers":
                return "Organizers";
            case "adminViewOrganizer":
                return selectedOrganizer ? `View: ${selectedOrganizer.name}` : "View Organizer";
            case "adminEditOrganizer":
                return selectedOrganizer ? `Edit: ${selectedOrganizer.name}` : "Edit Organizer";
            case "adminAddOrganizer":
                return "Add New Organizer";
            case "adminPerformers":
                return "Performers";
            case "adminViewPerformer":
                return selectedPerformer ? `View: ${selectedPerformer.name}` : "View Performer";
            case "adminEditPerformer":
                return selectedPerformer ? `Edit: ${selectedPerformer.name}` : "Edit Performer";
            case "adminAddPerformer":
                return "Add New Performer";
            case "adminVenues":
                return "Venues";
            case "adminViewVenue":
                return selectedVenue ? `View: ${selectedVenue.name}` : "View Venue";
            case "adminEditVenue":
                return selectedVenue ? `Edit: ${selectedVenue.name}` : "Edit Venue";
            case "adminAddVenue":
                return "Add New Venue";
            case "adminServices":
                return "Services";
            case "adminViewService":
                return selectedService ? `View: ${selectedService.name}` : "View Service";
            case "adminEditService":
                return selectedService ? `Edit: ${selectedService.name}` : "Edit Service";
            case "adminAddService":
                return "Add New Service";
            default:
                return activeSectionName;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 mt-[-88px]">
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden ${isMobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMobileSidebarOpen(false)}
            ></div>

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
                    {sections.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <div
                                onClick={() => handleNavigate(item.id)}
                                title={item.name}
                                className={`flex items-center space-x-4 cursor-pointer p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 ease-in-out ${activeSection === item.id ||
                                    (item.id === "adminPages" && ["adminViewPage", "adminEditPage", "adminCreatePage", "adminOrderPages"].includes(activeSection)) ||
                                    (item.id === "adminBlogPosts" && ["adminAddPost", "adminEditPost"].includes(activeSection))
                                    ? "text-white bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg"
                                    : "text-gray-300"
                                    }`}
                            >
                                <div className="text-xl flex-shrink-0">{item.icon}</div>
                                <span className={`text-sm font-medium whitespace-nowrap transition-opacity ${isDesktopSidebarExpanded || isMobileSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>{item.name}</span>
                            </div>

                            {/* Insert Entities Dropdown after Events */}
                            {item.id === "adminEvents" && (
                                <div className="mt-4">
                                    <div
                                        onClick={toggleEntitiesDropdown}
                                        className={`flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 ease-in-out ${["adminOrganizers", "adminPerformers", "adminVenues", "adminServices"].includes(activeSection)
                                            ? "text-white bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg"
                                            : "text-gray-300"
                                            }`}
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

                                    {/* Dropdown Items */}
                                    {isEntitiesDropdownOpen && (
                                        <div className="ml-4 mt-1 space-y-1">
                                            {entitiesItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleNavigate(item.id)}
                                                    title={item.name}
                                                    className={`flex items-center space-x-4 cursor-pointer p-2 rounded-lg hover:bg-gray-700/50 transition-all duration-200 ease-in-out ${activeSection === item.id
                                                        ? "text-white bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg"
                                                        : "text-gray-300"
                                                        }`}
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
                            )}
                        </React.Fragment>
                    ))}
                </nav>
            </aside>

            <div className={`flex flex-col flex-1 transition-all duration-300 relative z-0 ${isDesktopSidebarExpanded ? 'md:ml-56' : 'md:ml-16'}`}>
                <header className="p-2 md:p-4 h-16 flex items-center justify-between z-30 sticky top-0 bg-white/80 backdrop-blur-lg border-b border-gray-200/60">
                    <div className="flex items-center">
                        <button onClick={() => setIsMobileSidebarOpen(true)} className="p-2 rounded-md text-gray-700 hover:bg-gray-200/70 mr-2 md:hidden">
                            <BiMenuAltLeft size={24} />
                        </button>
                        <button onClick={() => setIsSidebarPinned(prev => !prev)} className="p-2 rounded-md text-gray-700 hover:bg-gray-200/70 mr-4 hidden md:block">
                            <BiMenuAltLeft size={24} />
                        </button>

                        <div className="text-sm text-gray-500 flex items-center">
                            <span className="cursor-pointer hover:text-gray-900 hidden sm:inline" onClick={() => handleNavigate('adminDashboard')}>Dashboard</span>
                            <span className="mx-2 font-light text-gray-400 hidden sm:inline">&gt;</span>
                            {["adminViewPage", "adminEditPage", "adminCreatePage", "adminOrderPages"].includes(activeSection) && (
                                <>
                                    <span className="cursor-pointer hover:text-gray-900" onClick={() => handleNavigate('adminPages')}>Pages</span>
                                    <span className="mx-2 font-light text-gray-400">&gt;</span>
                                </>
                            )}
                            {["adminAddPost", "adminEditPost"].includes(activeSection) && (
                                <>
                                    <span className="cursor-pointer hover:text-gray-900" onClick={() => handleNavigate('adminBlogPosts')}>Posts</span>
                                    <span className="mx-2 font-light text-gray-400">&gt;</span>
                                </>
                            )}
                            {["adminOrganizers", "adminViewOrganizer", "adminEditOrganizer", "adminAddOrganizer", "adminPerformers", "adminVenues", "adminViewVenue", "adminEditVenue", "adminAddVenue", "adminServices"].includes(activeSection) && (
                                <>
                                    <span className="cursor-pointer hover:text-gray-900" onClick={() => toggleEntitiesDropdown()}>Entities</span>
                                    <span className="mx-2 font-light text-gray-400">&gt;</span>
                                </>
                            )}
                            {["adminViewOrganizer", "adminEditOrganizer", "adminAddOrganizer"].includes(activeSection) && (
                                <>
                                    <span className="cursor-pointer hover:text-gray-900" onClick={() => handleBackToOrganizers()}>Organizers</span>
                                    <span className="mx-2 font-light text-gray-400">&gt;</span>
                                </>
                            )}
                            {["adminViewVenue", "adminEditVenue", "adminAddVenue"].includes(activeSection) && (
                                <>
                                    <span className="cursor-pointer hover:text-gray-900" onClick={() => handleBackToVenues()}>Venues</span>
                                    <span className="mx-2 font-light text-gray-400">&gt;</span>
                                </>
                            )}
                            <span className="font-semibold text-gray-800">{getBreadcrumbText()}</span>
                        </div>
                    </div>

                    <div className="relative" ref={profileDropdownRef}>
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

                <main className="flex-1 p-4 md:p-6 bg-gray-50">
                    {activeSection === "adminDashboard" && <Dashboard />}
                    {activeSection === "adminCategories" && <Categories />}
                    {activeSection === "adminEvents" && <Events />}
                    {activeSection === "adminTags" && <AdminTags />}
                    {activeSection === "adminBookings" && <AdminBookings />}
                    {activeSection === "adminHeaderMenu" && <AdminHeaderMenu />}
                    {activeSection === "adminFooterMenu" && <AdminFooterMenu />}
                    {activeSection === "adminCommissions" && <Commissions />}
                    {activeSection === "adminTaxes" && <Taxes />}
                    {activeSection === "adminUsers" && <Users />}

                    {/* Entities Sections */}
                    {activeSection === "adminOrganizers" && (
                        <AdminOrganizers
                            onNavigateToViewOrganizer={handleNavigateToViewOrganizer}
                            onNavigateToEditOrganizer={handleNavigateToEditOrganizer}
                            onNavigateToAddOrganizer={handleNavigateToAddOrganizer}
                        />
                    )}
                    {activeSection === "adminViewOrganizer" && selectedOrganizer && (
                        <AdminViewOrganizer
                            organizer={selectedOrganizer}
                            onBack={handleBackToOrganizers}
                            onEdit={handleNavigateToEditOrganizer}
                        />
                    )}
                    {activeSection === "adminEditOrganizer" && selectedOrganizer && (
                        <AdminEditOrganizer
                            organizer={selectedOrganizer}
                            onBack={handleBackToOrganizers}
                            onUpdate={handleOrganizerUpdate}
                        />
                    )}
                    {activeSection === "adminAddOrganizer" && (
                        <AdminAddOrganizer
                            onBack={handleBackToOrganizers}
                            onCreate={handleOrganizerCreate}
                        />
                    )}
                    {activeSection === "adminPerformers" && (
                        <AdminPerformers
                            onNavigateToViewPerformer={handleNavigateToViewPerformer}
                            onNavigateToEditPerformer={handleNavigateToEditPerformer}
                            onNavigateToAddPerformer={handleNavigateToAddPerformer}
                        />
                    )}
                    {activeSection === "adminViewPerformer" && selectedPerformer && (
                        <AdminViewPerformer
                            performer={selectedPerformer}
                            onBack={handleBackToPerformers}
                            onEdit={handleNavigateToEditPerformer}
                        />
                    )}
                    {activeSection === "adminEditPerformer" && selectedPerformer && (
                        <AdminEditPerformer
                            performer={selectedPerformer}
                            onBack={handleBackToPerformers}
                            onUpdate={handlePerformerUpdate}
                        />
                    )}
                    {activeSection === "adminAddPerformer" && (
                        <AdminAddPerformer
                            onBack={handleBackToPerformers}
                            onCreate={handlePerformerUpdate}
                        />
                    )}
                    {activeSection === "adminVenues" && (
                        <AdminVenues
                            onNavigateToViewVenue={handleNavigateToViewVenue}
                            onNavigateToEditVenue={handleNavigateToEditVenue}
                            onNavigateToAddVenue={handleNavigateToAddVenue}
                        />
                    )}
                    {activeSection === "adminAddVenue" && (
                        <AdminAddVenue
                            onBack={handleBackToVenues}
                            onCreate={handleVenueCreate}
                        />
                    )}
                    {activeSection === "adminViewVenue" && selectedVenue && (
                        <AdminViewVenue
                            venue={selectedVenue}
                            onBack={handleBackToVenues}
                            onEdit={handleNavigateToEditVenue}
                        />
                    )}
                    {activeSection === "adminEditVenue" && selectedVenue && (
                        <AdminEditVenue
                            venue={selectedVenue}
                            onBack={handleBackToVenues}
                            onUpdate={handleVenueUpdate}
                        />
                    )}
                    {activeSection === "adminServices" && (
                        <AdminServices
                            onNavigateToViewService={(service) => { setSelectedService(service); setActiveSection("adminViewService"); }}
                            onNavigateToEditService={(service) => { setSelectedService(service); setActiveSection("adminEditService"); }}
                            onNavigateToAddService={() => { setSelectedService(null); setActiveSection("adminAddService"); }}
                        />
                    )}
                    {activeSection === "adminViewService" && selectedService && (
                        <AdminViewService
                            service={selectedService}
                            onBack={() => { setActiveSection("adminServices"); setSelectedService(null); }}
                            onEdit={(service) => { setSelectedService(service); setActiveSection("adminEditService"); }}
                        />
                    )}
                    {activeSection === "adminEditService" && selectedService && (
                        <AdminEditService
                            service={selectedService}
                            onBack={() => { setActiveSection("adminServices"); setSelectedService(null); }}
                            onUpdate={() => { setActiveSection("adminServices"); setSelectedService(null); }}
                        />
                    )}
                    {activeSection === "adminAddService" && (
                        <AdminAddService
                            onBack={() => { setActiveSection("adminServices"); setSelectedService(null); }}
                            onCreate={() => { setActiveSection("adminServices"); setSelectedService(null); }}
                        />
                    )}

                    {activeSection === "adminPages" && (
                        <AdminPages
                            onNavigateToCreatePage={handleNavigateToCreatePage}
                            onNavigateToViewPage={handleNavigateToViewPage}
                            onNavigateToEditPage={handleNavigateToEditPage}
                            onNavigateToOrder={handleNavigateToOrderPages}
                        />
                    )}
                    {activeSection === "adminViewPage" && selectedPage && (
                        <AdminViewPage
                            page={selectedPage}
                            onBack={handleBackToPages}
                            onEdit={() => handleNavigateToEditPage(selectedPage)}
                        />
                    )}
                    {activeSection === "adminCreatePage" && (
                        <AdminCreatePage
                            onNavigate={handleNavigate}
                            onPageCreate={handlePageCreate}
                            onBack={handleBackToPages}
                        />
                    )}
                    {activeSection === "adminEditPage" && selectedPage && (
                        <AdminCreatePage
                            pageData={selectedPage}
                            isEdit={true}
                            onNavigate={handleNavigate}
                            onPageCreate={handlePageUpdate}
                            onBack={handleBackToPages}
                        />
                    )}
                    {activeSection === "adminOrderPages" && (
                        <OrderPages
                            onBack={handleBackToPages}
                        />
                    )}


                    {activeSection === "adminBlogPosts" && (
                        <AdminBlogPost
                            onNavigateToAddPost={handleNavigateToAddPost}
                            onNavigateToEditPost={handleNavigateToEditPost}
                        />
                    )}
                    {activeSection === "adminAddPost" && (
                        <AdminAddPost
                            onBack={handleBackToPosts}
                            onPostCreate={handlePostCreate}
                        />
                    )}
                    {activeSection === "adminEditPost" && selectedPost && (
                        <AdminAddPost
                            postData={selectedPost}
                            isEdit={true}
                            onBack={handleBackToPosts}
                            onPostCreate={handlePostUpdate}
                        />
                    )}


                    {activeSection === "adminCommissions" && <Commissions />}
                    {activeSection === "adminTaxes" && <Taxes />}
                    {activeSection === "adminContacts" && <Contacts />}
                    {activeSection === "adminMedia" && <Media />}
                    {activeSection === "adminBanners" && <Banners />}
                    {activeSection === "adminSettings" && <Settings />}
                    {activeSection === "adminPromoCodes" && <PromoCodes />}
                    {activeSection === "adminComplimentaryBookings" && <ComplimentaryBookings />}
                    {activeSection === "adminCurrencies" && <Currencies />}
                    {activeSection === "adminScanTickets" && <ScanTickets />}
                </main>
            </div>
        </div>
    );
};

export default AdminPanelOverview;
