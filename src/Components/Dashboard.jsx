// import { useState } from "react";
// import {
//   FaBars,
//   FaWallet,
//   FaCalendarAlt,
//   FaUsers,
//   FaMapMarkedAlt,
//   FaClipboardList,
//   FaTicketAlt,
//   FaBuilding,
//   FaUserFriends,
//   FaUserCog,
// } from "react-icons/fa";

// const Dashboard = () => {
//   const [activeSection, setActiveSection] = useState("dashboard");
//   const [isExpanded, setIsExpanded] = useState(false);

//   const loggedInUser = "John Doe";

//   const sections = [
//     { name: "Dashboard", icon: <FaCalendarAlt />, id: "dashboard" },
//     { name: "My Events", icon: <FaClipboardList />, id: "my-events" },
//     { name: "My Bookings", icon: <FaTicketAlt />, id: "my-bookings" },
//     { name: "My Earnings", icon: <FaWallet />, id: "my-earnings" },
//     { name: "My Venues", icon: <FaBuilding />, id: "my-venues" },
//     { name: "Manage Guests", icon: <FaUserFriends />, id: "manage-guests" },
//     { name: "Manage Sub-Organizers", icon: <FaUserCog />, id: "manage-sub-organizers" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside
//         className={`bg-gray-800 text-white flex flex-col py-6 space-y-4 transition-all duration-300 
//         ${isExpanded ? "w-48 items-start px-4" : "w-20 items-center"}`}
//       >
//         {/* Toggle Button */}
//         <div className="flex items-center px-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
//           <FaBars className="text-2xl" />
//         </div>

//         {/* Sidebar Items */}
//         {sections.map((item) => (
//           <div
//             key={item.id}
//             className={`flex items-center px-4 cursor-pointer py-2 rounded-md 
//             ${activeSection === item.id ? "bg-red-500" : ""}`}
//             onClick={() => setActiveSection(item.id)}
//           >
//             {item.icon}
//             {isExpanded && <span className="ml-3">{item.name}</span>}
//           </div>
//         ))}
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <h1 className="text-3xl font-bold text-gray-900">Hello, {loggedInUser}</h1>
//         <p className="text-gray-600">Welcome to your event management dashboard.</p>

//         {/* Dynamic Content Rendering */}
//         <div className="mt-6">
//           {activeSection === "dashboard" &&
//            <div>
//               <h2 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h2>
//               <div className="grid md:grid-cols-3 gap-6 mt-6">
//                 {/* Total Events */}
//                 <div className="bg-white p-6 shadow rounded-lg">
//                   <h3 className="text-lg font-semibold text-gray-500">Total Events</h3>
//                   <p className="text-3xl font-bold mt-2 text-gray-900">15</p>
//                 </div>

//                 {/* Total Earnings */}
//                 <div className="bg-white p-6 shadow rounded-lg">
//                   <h3 className="text-lg font-semibold text-gray-500">Total Earnings</h3>
//                   <p className="text-3xl font-bold mt-2 text-gray-900">10000.00 </p>
//                 </div>

//                 {/* Total Bookings */}
//                 <div className="bg-white p-6 shadow rounded-lg">
//                   <h3 className="text-lg font-semibold text-gray-500">Total Bookings</h3>
//                   <p className="text-3xl font-bold mt-2 text-gray-900">10</p>
//                 </div>
//               </div>
//             </div>
//           }



//           {activeSection === "my-events" && <p>Events. </p>}

//           {activeSection === "my-bookings" && <p>ticket bookings </p>}
          
//           {activeSection === "my-earnings" && <p> earnings.</p>}
         
//           {activeSection === "my-venues" && <p>venues  </p>}
         
//           {activeSection === "manage-guests" && <p>organize guests</p>}
          
//           {activeSection === "manage-sub-organizers" && <p>sub-organizers </p>}
       
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;




import { useState } from "react";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { GrFormNext } from "react-icons/gr";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { IoIosTime, IoMdDownload } from "react-icons/io";
import { IoTicket } from "react-icons/io5";
import { TbCalendarEvent, TbLayoutDashboardFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";

import {
  FaBars,
  FaWallet,
  FaCalendarAlt,
  FaUsers,
  FaMapMarkedAlt,
  FaClipboardList,
  FaTicketAlt,
  FaBuilding,
  FaUserFriends,
  FaUserCog,
  FaEdit,
  FaTrash

} from "react-icons/fa";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const navigate = useNavigate();


  const loggedInUser = "John Doe";

  const sections = [
    { name: "Dashboard", icon: <FaCalendarAlt />, id: "dashboard" },
    { name: "My Events", icon: <FaClipboardList />, id: "my-events" },
    { name: "My Orders", icon: <FaTicketAlt />, id: "my-bookings" },
    { name: "My Earnings", icon: <FaWallet />, id: "my-earnings" },
    { name: "My Venues", icon: <FaBuilding />, id: "my-venues" },
    { name: "Manage Guests", icon: <FaUserFriends />, id: "manage-guests" },
    { name: "Manage Sub-Organizers", icon: <FaUserCog />, id: "manage-sub-organizers" },
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
      orderId: "ORD123459",
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 mt-20 md:mt-0 text-white flex flex-col py-6 space-y-4 transition-all duration-300
        ${isExpanded ? "w-48 items-start px-4" : "w-20 items-center"}`}
      >
        {/* Toggle Button */}
        <div className="flex items-center px-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <FaBars className="text-2xl" />
        </div>

        {/* Sidebar Items */}
        {sections.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center px-4 cursor-pointer py-2 rounded-md 
            ${activeSection === item.id ? "bg-red-500" : ""}`}
            onClick={() => setActiveSection(item.id)}
          >
            {item.icon}
            {isExpanded && <span className={`ml-3 ${index !== sections.length - 1 ? "whitespace-nowrap" : ""}`}>{item.name}</span>}
            </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 mt-20 md:mt-0 overflow-y-auto ">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap">Hello, {loggedInUser}</h1>
        <p className="text-gray-600 mt-2 border-b-2 border-gray-300">Welcome to your event management dashboard.</p>

        {/* Content Rendering */}
        <div className="mt-6">
          {activeSection === "dashboard" &&
           <div>
              <h2 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h2>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                {/* Total Events */}
                <div className="bg-white p-6 shadow rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-500">Total Events</h3>
                  <p className="text-3xl font-bold mt-2 text-gray-900">15</p>
                </div>

                {/* Total Earnings */}
                <div className="bg-white p-6 shadow rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-500">Total Earnings</h3>
                  <p className="text-3xl font-bold mt-2 text-gray-900">10000.00 </p>
                </div>

                {/* Total Bookings */}
                <div className="bg-white p-6 shadow rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-500">Total Bookings</h3>
                  <p className="text-3xl font-bold mt-2 text-gray-900">10</p>
                </div>
              </div>
            </div>
          }



          {activeSection === "my-events" && 
           <div>
           <h2 className="text-2xl font-semibold text-gray-900">My Events</h2>
           </div>
           }

          {activeSection === "my-bookings" &&   
          <div className="flex flex-col">
         <h2 className="text-2xl font-semibold text-gray-900">My Orders</h2>
          {ticketInfo.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  navigate("/myBookingDetails", { state: item });
                }}
                className="border p-2 flex gap-10 lg:px-10  lg:mt-8"
              >
                <div className="pt-2">
                  <img
                    src={item.img}
                    className="h-20 lg:h-32 shadow-xl lg:w-48 rounded-md"
                    alt=""
                  />
                  <p className="py-2 lg:px-2 md:px-4 flex lg:text-base text-sm items-center justify-center lg:gap-1 font-medium">
                    <span className="lg:block hidden">Qnty :</span>
                    <IoTicket className="text-[#ff2459]" /> x{item.ticketQuantity}
                  </p>
                </div>
                <div className="lg:flex grid grid-cols-2 justify-between lg:gap-20 w-full pr-2">
                  <div className="flex flex-col gap-2 p-2">
                    <h1 className="lg:text-xl font-bold text-gray-600">
                      {item.eventName}
                    </h1>
                    <p className="text-sm">id: {item.orderId}</p>
                    <p className="flex gap-1">
                      <p className="flex gap-1 text-gray-500 whitespace-nowrap text-sm">
                        <SlCalender className="relative top-1 text-[#ff2459]" />
                        {item.date}
                      </p>
                      <p className="flex gap-1 text-gray-500 text-sm">
                        - <IoIosTime className="relative top-1 text-[#ff2459]" />
                        {item.time}
                      </p>
                    </p>
                    <p className="whitespace-nowrap lg:text-base text-sm">price : {item.orderTotal} USD</p>
                  </div>
                  <div className="flex lg:items-center relative lg:top-0 top-6 justify-between">
                    <p
                      className={`flex lg:text-base text-xs item-center justify-center w-40 gap-2 rounded-full px-3 p-0.5 text-gray-400 capitalize font-medium ${
                        item.status === "upcoming"
                          ? "text-pink-600"
                          : item.status === "used"
                          ? "text-green-700"
                          : "text-orange-600"
                      }`}
                    >
                      {item.status === "upcoming" ? (
                        <TbCalendarEvent className="relative top-1" />
                      ) : item.status === "used" ? (
                        <FaCheck className="text-sm relative top-1" />
                      ) : (
                        <HiOutlineReceiptRefund className="relative top-1" />
                      )}
                      {item.status}
                    </p>
                    <button
                      onClick={() => {
                        navigate("/myBookingDetails", { state: item });
                      }}
                      className="bg-gray-200 w-max h-max rounded-full p-1"
                    >
                      <GrFormNext />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div> }
          
          {activeSection === "my-earnings" && 
             <div>
             <h2 className="text-2xl font-semibold text-gray-900">My Earnings</h2>
             <div className="grid md:grid-cols-3 gap-6 mt-6">
               {/* Total Bookings */}
               <div className="bg-white p-6 shadow rounded-lg">
                 <h3 className="text-lg font-semibold text-gray-500">Total Bookings</h3>
                 <p className="text-3xl font-bold mt-2 text-gray-900">10000.00</p>
               </div>

               {/* Total Admin Commitions */}
               <div className="bg-white p-6 shadow rounded-lg">
                 <h3 className="text-lg font-semibold text-gray-500">Total Admin Commitions</h3>
                 <p className="text-3xl font-bold mt-2 text-gray-900">700.00 </p>
               </div>

               {/* Total Profit */}
               <div className="bg-white p-6 shadow rounded-lg">
                 <h3 className="text-lg font-semibold text-gray-500">Total Profit</h3>
                 <p className="text-3xl font-bold mt-2 text-gray-900">8000.00</p>
               </div>
             </div>
           </div>
           }
         
          {activeSection === "my-venues" && 
           <div className="overflow-x-auto">
         <h2 className="text-2xl font-semibold text-gray-900">My Venues</h2>
           <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg mt-4">
             <thead className="bg-gray-100">
               <tr>
                 <th className="px-4 py-3 text-left font-bold">Title</th>
                 <th className="px-4 py-3 text-left font-bold">State</th>
                 <th className="px-4 py-3 text-left font-bold">City</th>
                 <th className="px-4 py-3 text-left font-bold">Actions</th>
               </tr>
             </thead>
             <tbody>
               {data.map((item) => (
                 <tr key={item.id} className="border-b">
                   <td className="px-4 py-3 flex items-center space-x-4">
                     <div>
                       <p className="font-semibold">{item.title}</p>
                       <p className="text-gray-500 text-sm">{item.description}</p>
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
               ))}
             </tbody>
           </table>
         </div>
          }
         
          {activeSection === "manage-guests" && 
          <div>
             <h2 className="text-2xl font-semibold text-gray-900">Manage Guests</h2>
             </div>
         }
          
          {activeSection === "manage-sub-organizers" && 
           <div>
           <h2 className="text-2xl font-semibold text-gray-900">Manage Sub Organizers</h2>
           </div>
           }
       
        </div>
      </main>
    </div>
  );
};

export default Dashboard;




