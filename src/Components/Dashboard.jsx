import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { FaUser, FaTag, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaMapMarkedAlt, FaClipboardList, FaTicketAlt, FaBuilding, FaUserFriends, FaBars, FaWallet } from "react-icons/fa";
import { FaChartLine, FaMoneyBillAlt, FaShoppingBag } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout, MdPrivacyTip, MdOutlineQrCodeScanner, MdGroups2 } from "react-icons/md";
import { FaCalendarPlus, FaPeopleArrows, FaMapLocation, FaTags, FaMoneyCheckDollar, FaMapLocationDot } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { BiQrScan } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import { TbMoneybag, TbActivityHeartbeat, TbCalendarEvent, TbLayoutDashboardFilled } from "react-icons/tb";
import { FiCreditCard } from "react-icons/fi";
import { IoTicket } from "react-icons/io5";
import { FaStarHalfAlt, FaUserTag } from "react-icons/fa";
import { GrDashboard } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import CommonCalendar from "./CommonCalendar";
import { FaUserCircle, FaPuzzlePiece } from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import AdminMyEvents from './AdminPanel/AdminMyEvents';
import AdminOrganizers from './AdminPanel/AdminOrganizers';
import AdminViewOrganizer from './AdminPanel/AdminViewOrganizer';
import AdminEditOrganizer from './AdminPanel/AdminEditOrganizer';
import AdminAddOrganizer from './AdminPanel/AdminAddOrganizer';
import AdminPerformers from './AdminPanel/AdminPerformers';
import AdminViewPerformer from './AdminPanel/AdminViewPerformer';
import AdminEditPerformer from './AdminPanel/AdminEditPerformer';
import AdminAddPerformer from './AdminPanel/AdminAddPerformer';
import AdminVenues from './AdminPanel/AdminVenues';
import AdminViewVenue from './AdminPanel/AdminViewVenue';
import AdminEditVenue from './AdminPanel/AdminEditVenue';
import AdminAddVenue from './AdminPanel/AdminAddVenue';
import AdminServices from './AdminPanel/AdminServices';
import AdminViewService from './AdminPanel/AdminViewService';
import AdminEditService from './AdminPanel/AdminEditService';
import AdminAddService from './AdminPanel/AdminAddService';
import AdminGuests from './AdminPanel/AdminGuests';
import AdminClaims from './AdminPanel/AdminClaims';
import AdminSubOrganizers from './AdminPanel/AdminSubOrganizers';

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState("dashboard");
    const [isExpanded, setIsExpanded] = useState(false);
    const [showBookings, setShowBookings] = useState(false);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(null);
    const popupRef = useRef(null);
    const loggedInUser = "John Doe";
    const [isEntitiesDropdownOpen, setIsEntitiesDropdownOpen] = useState(false);
    const [selectedOrganizer, setSelectedOrganizer] = useState(null);
    const [selectedPerformer, setSelectedPerformer] = useState(null);
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [selectedService, setSelectedService] = useState(null);

    const sections = [
        { name: "Dashboard", icon: <GrDashboard />, id: "dashboard" },
        { name: "My Events", icon: <FaCalendarAlt />, id: "my-events" },
        { name: "Scan Tickets", icon: <MdOutlineQrCodeScanner />, id: "scan-tickets" },
        { name: "My Bookings", icon: <FaMoneyCheckDollar />, id: "my-bookings" },
        { name: "My Earnings", icon: <FaWallet />, id: "my-earnings" },
        { name: "My Tags", icon: <FaTags />, id: "my-tags" },
        { name: "Guests", icon: <MdGroups2 />, id: "guests" },
        { name: "Claims", icon: <FaClipboardList />, id: "claims" },
        { name: "Sub Organizers", icon: <FaPeopleArrows />, id: "sub-organizers" },
        { name: "Reviews", icon: <FaStarHalfAlt />, id: "reviews" },
    ];

    const entitiesItems = [
        { name: "Organizers", icon: <FaUserCircle />, id: "adminOrganizers" },
        { name: "Performers", icon: <FaPuzzlePiece />, id: "adminPerformers" },
        { name: "Venues", icon: <BsBuildingsFill />, id: "adminVenues" },
        { name: "Services", icon: <FaPuzzlePiece />, id: "adminServices" },
    ];

    const ticketInfo = [
        {
            eventName: "Concert XYZ",
            img: "music.jpeg",
            date: "2025-03-15",
            time: "19:00",
            orderId: "ORD123456",
            ticketQuantity: 2,
            orderTotal: 2000,
            promoCodeReward: "DISCOUNT10",
            bookingDate: "2025-02-25",
            paymentMode: "online",
            checkedIn: "no",
            status: "upcoming",
            expired: "no",
        },
        {
            eventName: "Theater Play ABC",
            img: "music.jpeg",
            date: "2025-04-10",
            time: "18:30",
            orderId: "ORD123457",
            ticketQuantity: 4,
            orderTotal: 5000,
            promoCodeReward: "VIPACCESS",
            bookingDate: "2025-02-27",
            paymentMode: "offline",
            checkedIn: "yes",
            status: "upcoming",
            expired: "no",
        },
        {
            eventName: "Football Match DEF",
            img: "music.jpeg",
            date: "2025-03-20",
            time: "16:00",
            orderId: "ORD123458",
            ticketQuantity: 1,
            orderTotal: 1200,
            promoCodeReward: "GAMEDEAL",
            bookingDate: "2025-02-24",
            paymentMode: "online",
            checkedIn: "no",
            status: "refunded",
            expired: "yes",
        },
        {
            eventName: "Music Festival GHI",
            img: "music.jpeg",
            date: "2025-05-05",
            time: "14:00",
            orderId: "APPED",
            ticketQuantity: 3,
            orderTotal: 3000,
            promoCodeReward: "EARLYBIRD",
            bookingDate: "2025-02-28",
            paymentMode: "online",
            checkedIn: "no",
            status: "used",
            expired: "no",
        },
    ];

    const data = [
        {
            id: 1,
            title: "The Westin Pune Koregaon Park",
            description: "Hotel",
            state: "Maharashtra",
            city: "Pune",
        },
        {
            id: 2,
            title: "Club LPK",
            description: "Nightclub",
            state: "Goa",
            city: "",
        },
        {
            id: 3,
            title: "ABC ",
            description: "Laudge",
            state: "Maharashta",
            city: "Mumbai",
        },
    ];

    const myEvents = [
        { id: 'event01', name: 'Test Events 01', bookings: 0, timings: '10 Jun 2025 03:03 AM\n19 Jun 2025 05:05 AM', repetitive: 'No', seasonalTickets: 'No', publish: 'Published', status: 'Disabled' },
        { id: 'event02', name: 'Annual Tech Conference', bookings: 25, timings: '01 Aug 2025 09:00 AM\n03 Aug 2025 05:00 PM', repetitive: 'Yes', seasonalTickets: 'No', publish: 'Published', status: 'Enabled' },
        { id: 'event03', name: 'Charity Run', bookings: 120, timings: '15 Sep 2025 07:00 AM\n15 Sep 2025 11:00 AM', repetitive: 'No', seasonalTickets: 'No', publish: 'Published', status: 'Enabled' },
        { id: 'event04', name: 'Winter Music Fest', bookings: 0, timings: '10 Dec 2025 06:00 PM\n12 Dec 2025 11:00 PM', repetitive: 'No', seasonalTickets: 'Yes', publish: 'Published', status: 'Disabled' },
    ];

    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleThreeDotsClick = (eventId, e) => {
        e.stopPropagation();
        setShowPopup(showPopup === eventId ? null : eventId);
    };

    const toggleEntitiesDropdown = () => {
        setIsEntitiesDropdownOpen(!isEntitiesDropdownOpen);
    };

    const handleNavigate = (sectionId) => {
        setActiveSection(sectionId);
    };

    const handleToggleSidebar = () => {
        setIsExpanded((prev) => {
            const next = !prev;
            if (!next) {
                setIsEntitiesDropdownOpen(false);
            }
            return next;
        });
    };

    const handleEntitiesClick = () => {
        if (isExpanded) {
            toggleEntitiesDropdown();
        } else {
            setIsExpanded(true);
            setIsEntitiesDropdownOpen(true);
        }
    };

    // Organizer navigation handlers
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

    const handleOrganizerUpdate = () => {
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

    const handleVenueUpdate = () => {
        setActiveSection("adminVenues");
        setSelectedVenue(null);
    };

    // Service navigation handlers
    const handleNavigateToViewService = (service) => {
        setSelectedService(service);
        setActiveSection("adminViewService");
    };

    const handleNavigateToEditService = (service) => {
        setSelectedService(service);
        setActiveSection("adminEditService");
    };

    const handleNavigateToAddService = () => {
        setSelectedService(null);
        setActiveSection("adminAddService");
    };

    const handleBackToServices = () => {
        setActiveSection("adminServices");
        setSelectedService(null);
    };

    const handleServiceUpdate = () => {
        setActiveSection("adminServices");
        setSelectedService(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside
                className={`bg-gray-800 text-white flex flex-col transition-all duration-300 sticky top-0 h-screen overflow-y-auto overflow-x-hidden overscroll-contain scrollbar-hide
        ${isExpanded ? "w-48 items-start px-4" : "w-20 items-center"}`}
            >
                <div className="py-6 space-y-4 min-h-full">
                    {sections.map((item) => (
                        <React.Fragment key={item.id}>
                            <div
                                className={`relative flex items-center px-4 cursor-pointer py-2 rounded-md transition-all group
      ${activeSection === item.id ? "bg-red-500 text-white" : "text-white hover:bg-gray-700"}`}
                                onClick={() => setActiveSection(item.id)}
                                onMouseEnter={(e) => {
                                    const tooltip = e.currentTarget.querySelector(".tooltip");
                                    tooltip && (tooltip.style.opacity = "1");
                                }}
                                onMouseLeave={(e) => {
                                    const tooltip = e.currentTarget.querySelector(".tooltip");
                                    tooltip && (tooltip.style.opacity = "0");
                                }}
                            >
                                <div className="text-xl">{item.icon}</div>
                                {isExpanded ? (
                                    <span className="ml-3 whitespace-nowrap">{item.name}</span>
                                ) : (
                                    <span
                                        className="tooltip absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded-md opacity-0 pointer-events-none transition-opacity duration-200 z-50 shadow-lg"
                                    >
                                        {item.name}
                                    </span>
                                )}
                            </div>
                            {item.id === 'my-events' && (
                                <div className={`${isExpanded ? 'w-full' : ''}`}>
                                    <div
                                        onClick={handleEntitiesClick}
                                        onMouseEnter={(e) => {
                                            const tooltip = e.currentTarget.querySelector('.tooltip');
                                            tooltip && (tooltip.style.opacity = '1');
                                        }}
                                        onMouseLeave={(e) => {
                                            const tooltip = e.currentTarget.querySelector('.tooltip');
                                            tooltip && (tooltip.style.opacity = '0');
                                        }}
                                        className={`relative flex items-center ${isExpanded ? 'justify-between px-4' : 'justify-center'} py-2 rounded-md transition-all group text-white hover:bg-gray-700 cursor-pointer`}
                                    >
                                        <div className="flex items-center">
                                            <div className="text-xl"><FaPuzzlePiece /></div>
                                            {isExpanded ? (
                                                <span className="ml-3 whitespace-nowrap">Entities</span>
                                            ) : (
                                                <span
                                                    className="tooltip absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded-md opacity-0 pointer-events-none transition-opacity duration-200 z-50 shadow-lg"
                                                >
                                                    Entities
                                                </span>
                                            )}
                                        </div>
                                        {isExpanded && (
                                            <div className={`transition-transform duration-200 ${isEntitiesDropdownOpen ? 'rotate-180' : 'rotate-0'}`}>
                                                {isEntitiesDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                            </div>
                                        )}
                                    </div>

                                    {isEntitiesDropdownOpen && isExpanded && (
                                        <div className="ml-4 mt-1 space-y-1">
                                            {entitiesItems.map((entity) => (
                                                <div
                                                    key={entity.id}
                                                    onClick={() => handleNavigate(entity.id)}
                                                    title={entity.name}
                                                    className={`flex items-center space-x-4 cursor-pointer p-2 rounded-lg hover:bg-gray-700/50 transition-all duration-200 ease-in-out ${activeSection === entity.id
                                                        ? "text-white bg-red-500 shadow-lg"
                                                        : "text-gray-300"
                                                        }`}
                                                >
                                                    <div className="text-lg flex-shrink-0">{entity.icon}</div>
                                                    <span className={`text-sm font-medium whitespace-nowrap`}>
                                                        {entity.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </aside>

            <main className={`flex-1 p-8 transition-all duration-300 overflow-y-auto`}>
                <div
                    className="flex items-center cursor-pointer mb-6"
                    onClick={handleToggleSidebar}
                >
                    <FaBars className="text-2xl text-gray-800" />
                </div>

                <div className="mt-6 transition-opacity duration-500 ease-in-out" key={activeSection}>
                    {activeSection === "dashboard" && (
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 whitespace-nowrap">
                                Hello, {loggedInUser}
                            </h1>
                            <p className="text-gray-600 mt-2 border-b-2 border-gray-200 pb-2">
                                Here's ongoing activity for all your events and bookings.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6 mt-6">
                                <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700">Total Events</h3>
                                        <p className="text-3xl font-bold mt-2 text-gray-900">15</p>
                                    </div>
                                    <TbActivityHeartbeat className="text-pink-500 text-3xl" />
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700">Total Earnings</h3>
                                        <p className="text-3xl font-bold mt-2 text-gray-900">0.00</p>
                                    </div>
                                    <TbMoneybag className="text-green-500 text-3xl" />
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700">Total Bookings</h3>
                                        <p className="text-3xl font-bold mt-2 text-gray-900">10</p>
                                    </div>
                                    <FiCreditCard className="text-pink-500 text-3xl" />
                                </div>
                            </div>
                            <div className="bg-white mt-8 p-6 rounded-xl shadow-md">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Top Selling Events</h3>
                                <div className="h-[300px] w-full border-t border-l relative">
                                    <div className="absolute left-[30%] top-[50px] flex items-center gap-2">
                                        <div className="w-[120px] h-6 bg-blue-500 rounded"></div>
                                        <span className="text-sm text-gray-600">Total Bookings</span>
                                    </div>
                                    <div className="absolute top-[100px] left-8 text-sm text-gray-500">Event A</div>
                                    <div className="absolute top-[150px] left-8 text-sm text-gray-500">Event B</div>
                                    <div className="absolute top-[200px] left-8 text-sm text-gray-500">Event C</div>
                                </div>
                            </div>
                            <div className="bg-white mt-8 p-6 rounded-xl shadow-md">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Event Tickets Statistics</h3>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Search Table"
                                        className="border border-gray-300 px-4 py-2 w-full max-w-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    />
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                                        <thead className="bg-gray-100 text-left">
                                            <tr>
                                                <th className="px-4 py-3 font-bold border-r">ORDER</th>
                                                <th className="px-4 py-3 font-bold border-r">TICKETS</th>
                                                <th className="px-4 py-3 font-bold border-r">TICKETS QUANTITY</th>
                                                <th className="px-4 py-3 font-bold border-r">TOTAL PRICE</th>
                                                <th className="px-4 py-3 font-bold">TOTAL CHECKINS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-t">
                                                <td className="px-4 py-4 text-center text-gray-500" colSpan={5}>No data for table</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                                    <div>
                                        Rows per page: <select className="ml-2 border rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                            <option>10</option>
                                            <option>20</option>
                                            <option>50</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>Page</span>
                                        <input value="1" disabled className="border w-10 text-center rounded-lg px-2 py-1" />
                                        <span>of 0</span>
                                        <button disabled className="text-gray-400 px-2">Previous</button>
                                        <button disabled className="text-gray-400 px-2">Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === "my-events" && <AdminMyEvents />}

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
                            onCreate={handleOrganizerUpdate}
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
                    {activeSection === "adminAddVenue" && (
                        <AdminAddVenue
                            onBack={handleBackToVenues}
                            onCreate={handleVenueUpdate}
                        />
                    )}

                    {activeSection === "adminServices" && (
                        <AdminServices
                            onNavigateToViewService={handleNavigateToViewService}
                            onNavigateToEditService={handleNavigateToEditService}
                            onNavigateToAddService={handleNavigateToAddService}
                        />
                    )}
                    {activeSection === "adminViewService" && selectedService && (
                        <AdminViewService
                            service={selectedService}
                            onBack={handleBackToServices}
                            onEdit={handleNavigateToEditService}
                        />
                    )}
                    {activeSection === "adminEditService" && selectedService && (
                        <AdminEditService
                            service={selectedService}
                            onBack={handleBackToServices}
                            onUpdate={handleServiceUpdate}
                        />
                    )}
                    {activeSection === "adminAddService" && (
                        <AdminAddService
                            onBack={handleBackToServices}
                            onCreate={handleServiceUpdate}
                        />
                    )}

                    {activeSection === "scan-tickets" && (
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900">Scan Tickets</h2>
                            <div className="bg-blue-100 text-gray-900 px-4 py-3 rounded-xl mb-4 border border-blue-300">
                                <div className="flex items-center gap-2 p-1 font-semibold">
                                    <BiQrScan className="text-gray-900 font-bold text-xl" />
                                    Scan Tickets
                                </div>
                            </div>
                            <div className="bg-pink-100 text-gray-900 px-4 py-3 rounded-xl mb-4 border border-pink-300">
                                <div className="flex items-center gap-2 p-1 font-semibold">
                                    <FaCamera className="text-gray-900 text-xl" />
                                    Camera access required
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === "my-bookings" && (
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">My Bookings</h2>
                            <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Bookings</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Event</label>
                                        <select
                                            id="events"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition bg-gray-50"
                                            defaultValue="All Events"
                                        >
                                            <option>All Events</option>
                                            {myEvents.map((event) => (
                                                <option key={event.id} value={event.name}>
                                                    {event.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Booking Date</label>
                                        <input
                                            type="date"
                                            id="booking-date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                                        <input
                                            type="date"
                                            id="event-date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition bg-gray-50"
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-md hover:shadow-lg">
                                            Clear Filters
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                                        <input
                                            type="text"
                                            id="search-bookings"
                                            placeholder="Search by order ID or email..."
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition bg-gray-50"
                                        />
                                    </div>
                                    <div className="w-24">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Show</label>
                                        <select
                                            id="rows"
                                            className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition bg-gray-50"
                                            defaultValue="10"
                                        >
                                            <option>5</option>
                                            <option>10</option>
                                            <option>20</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {ticketInfo.map((booking) => (
                                    <div
                                        key={booking.orderId}
                                        className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
                                    >
                                        <div className="relative">
                                            <img
                                                src={booking.img}
                                                alt={booking.eventName}
                                                className="w-full h-40 object-cover"
                                            />
                                            <span
                                                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${booking.status === "upcoming"
                                                    ? "bg-blue-600"
                                                    : booking.status === "refunded"
                                                        ? "bg-red-600"
                                                        : "bg-green-600"
                                                    }`}
                                            >
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </span>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-gray-900 mb-3">{booking.eventName}</h3>
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Order ID:</span>
                                                    <span>{booking.orderId}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Email:</span>
                                                    <span>{loggedInUser.toLowerCase().replace(" ", ".") + "@example.com"}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Tickets:</span>
                                                    <span>{booking.ticketQuantity}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Total:</span>
                                                    <span>₹{booking.orderTotal}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Promo Code:</span>
                                                    <span>{booking.promoCodeReward}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Booked On:</span>
                                                    <span>{booking.bookingDate}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Payment:</span>
                                                    <span>{booking.paymentMode.charAt(0).toUpperCase() + booking.paymentMode.slice(1)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Checked In:</span>
                                                    <span>
                                                        {booking.checkedIn === "yes" ? (
                                                            <FaCheckCircle className="inline text-green-500" />
                                                        ) : (
                                                            <span className="text-red-500">No</span>
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Event Date:</span>
                                                    <span>{booking.date} at {booking.time}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Expired:</span>
                                                    <span
                                                        className={`font-semibold ${booking.expired === "yes" ? "text-red-500" : "text-green-500"
                                                            }`}
                                                    >
                                                        {booking.expired.charAt(0).toUpperCase() + booking.expired.slice(1)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex gap-2">
                                                <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                                                    View Details
                                                </button>
                                                <button className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                                                    Download Ticket
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {ticketInfo.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">No bookings found.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeSection === "my-earnings" && (
                        <div className="mt-4">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">My Earnings</h2>
                            <div className="mb-4 w-[200px]">
                                <select
                                    value={selectedOption}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                >
                                    <option value="">All Events</option>
                                    <option value="event1">Event 1</option>
                                    <option value="event2">Event 2</option>
                                </select>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-sky-400 text-white p-6 rounded-lg flex justify-between items-center shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <div>
                                        <h3 className="text-lg font-semibold">Total Bookings</h3>
                                        <p className="text-2xl font-bold mt-2">0</p>
                                    </div>
                                    <MdOutlineShoppingCartCheckout className="text-white text-3xl" />
                                </div>
                                <div className="bg-gray-900 text-white p-6 rounded-lg flex justify-between items-center shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <div>
                                        <h3 className="text-lg font-semibold">Total Admin Commission</h3>
                                        <p className="text-2xl font-bold mt-2">0</p>
                                    </div>
                                    <RiAdminFill className="text-white text-3xl" />
                                </div>
                                <div className="bg-green-400 text-white p-6 rounded-lg flex justify-between items-center shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <div>
                                        <h3 className="text-lg font-semibold">Total Profit</h3>
                                        <p className="text-2xl font-bold mt-2">0</p>
                                    </div>
                                    <TbMoneybag className="text-white text-3xl" />
                                </div>
                            </div>
                            <div className="overflow-x-auto mt-6 bg-white shadow-md rounded-lg">
                                <table className="min-w-full text-sm text-left">
                                    <thead className="bg-gray-100 font-bold">
                                        <tr>
                                            <th className="px-4 py-3">Event</th>
                                            <th className="px-4 py-3">Bookings</th>
                                            <th className="px-4 py-3">Commission</th>
                                            <th className="px-4 py-3">Profit</th>
                                            <th className="px-4 py-3">Month</th>
                                            <th className="px-4 py-3">Transferred</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t">
                                            <td className="px-4 py-4 text-center text-gray-800" colSpan={6}>No Bookings!</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeSection === "my-tags" && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-3xl font-extrabold text-gray-900">My Tags</h2>
                                <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg transition hover:bg-gray-700 shadow-md">
                                    <FaUserTag className="text-lg" />
                                    <span className="text-sm font-semibold">Add Tag</span>
                                </button>
                            </div>
                            <div className="overflow-x-auto p-6">
                                <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                                    <thead className="bg-gray-100 text-left">
                                        <tr>
                                            <th className="px-4 py-3 font-bold border-r">Name</th>
                                            <th className="px-4 py-3 font-bold border-r">Type</th>
                                            <th className="px-4 py-3 font-bold border-r">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t">
                                            <td className="px-4 py-4 text-center text-gray-800" colSpan={3}>No Tags!</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeSection === "my-venues" && (
                        <div className="overflow-x-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-3xl font-extrabold text-gray-900">My Venues</h2>
                                <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg transition hover:bg-gray-700 shadow-md">
                                    <FaMapLocationDot className="text-lg" />
                                    <span className="text-sm font-semibold">Create Venue</span>
                                </button>
                            </div>
                            <div className="bg-blue-100 text-blue-900 px-4 py-3 rounded-lg mb-4 border border-blue-200">
                                <div className="flex items-center gap-2">
                                    <MdPrivacyTip className="text-xl" />
                                    <span className="font-medium">
                                        Tip: Add a new Venue only if it does not exist on the website. You can use the Venues created by other Organizers into your event.
                                    </span>
                                </div>
                            </div>
                            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                                <thead className="bg-gray-100 text-left">
                                    <tr>
                                        <th className="px-4 py-3 font-bold">Title</th>
                                        <th className="px-4 py-3 font-bold">State</th>
                                        <th className="px-4 py-3 font-bold">City</th>
                                        <th className="px-4 py-3 font-bold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((venue) => (
                                        <tr key={venue.id} className="border-t hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-4">{venue.title}</td>
                                            <td className="px-4 py-4">{venue.state}</td>
                                            <td className="px-4 py-4">{venue.city}</td>
                                            <td className="px-4 py-4 flex gap-2">
                                                <button className="text-blue-500 hover:text-blue-700">
                                                    <FaEdit />
                                                </button>
                                                <button className="text-red-500 hover:text-red-700">
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeSection === "guests" && <AdminGuests />}

                    {activeSection === "sub-organizers" && <AdminSubOrganizers />}

                    {activeSection === "claims" && <AdminClaims />}

                    {activeSection === "reviews" && (
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900">Manage Reviews</h2>
                            <div className="flex flex-col gap-2 mb-4 p-2">
                                <div className="flex flex-row items-center gap-4">
                                    <div className="w-36">
                                        <span className="text-sm font-semibold text-gray-700">Events</span>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-4">
                                    <div className="w-36">
                                        <input
                                            type="text"
                                            id="search-events"
                                            placeholder="Search"
                                            className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                                    <thead className="bg-gray-100 text-left">
                                        <tr>
                                            <th className="px-4 py-3 font-bold border-r w-1/3">Title</th>
                                            <th className="px-4 py-3 font-bold border-r w-1/3">Rating</th>
                                            <th className="px-4 py-3 font-bold w-1/3">Review</th>
                                            <th className="px-4 py-3 font-bold w-1/3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t">
                                            <td colSpan={4} className="px-4 py-6 text-center text-gray-700">No Reviews Found!</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;