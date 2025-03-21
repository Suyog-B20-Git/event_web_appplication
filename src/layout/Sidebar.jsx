// /* eslint-disable react/prop-types */
// import React from "react";
// import { IoClose, IoLocationSharp } from "react-icons/io5";
// import { IoIosPerson, IoMdHome } from "react-icons/io";
// import {
//   MdAccountCircle,
//   MdContactPhone,
//   MdEvent,
//   MdMiscellaneousServices,
// } from "react-icons/md";
// import { GrGroup } from "react-icons/gr";
// import { useNavigate } from "react-router-dom";
// import { RiPagesLine } from "react-icons/ri";
// // import Dropdown from './DropDown'
// // import SA_FilterCheckBox from './SA_FilterCheckBox'

// const Sidebar = ({ setShowPopup }) => {
//   console.log(setShowPopup);
//   //  const [ShowPopup,setShowPopup]=useState(false);

//   var text_data = [
//     { name: "Home", icon: <IoMdHome />, path: "/home" },

//     { name: "Event", path: "/viewAll", icon: <MdEvent /> },
//     { name: "Organisers", path: "/Organizers", icon: <GrGroup /> },
//     { name: "Performers", path: "/Performers", icon: <IoIosPerson /> },

//     {
//       name: "Services",
//       path: "/Services",
//       icon: <MdMiscellaneousServices />,
//     },
//     { name: "Contact Us", path: "#", icon: <MdContactPhone /> },
//     { name: "Venues", path: "/Venues", icon: <IoLocationSharp /> },
//     { name: "Create Event", path: "/createEvent", icon: <MdEvent /> },
//     { name: "Create Page", path: "/createPage", icon: <RiPagesLine /> },
//     { name: "SignUp/Login", path: "/login", icon: <MdAccountCircle /> },
//   ];
//   const navigate = useNavigate();
//   return (
//     <>
//       <div>
//         {" "}
//         <div
//           className="fixed inset-0 bg-black bg-opacity-25 z-10"
//           onClick={() => setShowPopup(false)} // Close popup when clicking on overlay
//         />
//         <div className="absolute top-0 right-0 z-30   bg-white min-h-40 w-[80%] rounded py-6 px-4">
//           <div className=" flex justify-between place-self-end items-center px-3 mb-2">
//             {/* <p className='text-[#0A1629] text-[22px] font-bold'>Notification</p> */}

//             <IoClose
//               className="cursor-pointer self-end "
//               size={25}
//               onClick={() => setShowPopup(false)}
//             />
//           </div>
//           <hr />

//           <div className="text-black">
//             {text_data.map((item) => (
//               <div
//                 key={item}
//                 onClick={() => {
//                   navigate(item.path);
//                   setShowPopup(false);
//                 }}
//                 className=" flex gap-2 hover:bg-gray-300 p-3  hover:border-s-4  border-red-500 rounded-e-lg "
//               >
//                 <p className="relative top-1">{item.icon}</p>
//                 {item.name}
//               </div>
//             ))}

//             {/* <Dropdown  ></Dropdown> */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;




import React, { useState } from "react";
import { IoClose, IoLocationSharp, IoTicket, } from "react-icons/io5";
import {  IoIosLogOut, IoIosPerson, IoMdHome, IoMdArrowDropdown } from "react-icons/io";
import {
  MdAccountCircle,
  MdContactPhone,
  MdEvent,
  MdMiscellaneousServices,
  MdDashboard,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GrGroup } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Sidebar = ({ setShowPopup }) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [userDropdown, setUserDropdown] = useState(false);

  let userName = "";
  let userRole = "";

  if (authToken) {
    const decodedToken = jwt_decode(authToken);
    userName = decodedToken?.name || "";
    userRole = decodedToken?.role || "";
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("eventData");
    setShowPopup(false);
    navigate("/home");
    window.location.reload();
  };

  const menuItems = [
    { name: "Home", icon: <IoMdHome />, path: "/home" },
    {
      name: "Event",
      path: "/viewAll",
      filterPath: "/getEventByFilter",
      icon: <MdEvent />,
      subMenu: [
        { name: "Business" },
        { name: "Festivals" },
        { name: "Live Music" },
        { name: "Nightlife and Club" },
        { name: "Professional" },
        { name: "Social" },
        { name: "Sport & Leisure" },
        { name: "Theatre & Arts" },
      ],
    },
    {
      name: "Organisers",
      path: "/Organizers",
      filterPath: "/Organizers",
      icon: <GrGroup />,
      subMenu: [
        { name: "Event Planner" },
        { name: "Wedding Planner" },
        { name: "Adventure" },
      ],
    },
    {
      name: "Performers",
      path: "/Performers",
      filterPath: "/Performers",
      icon: <IoIosPerson />,
      subMenu: [
        { name: "Band" },
        { name: "Disc Jockey" },
        { name: "Sound Artist" },
        { name: "Stand up Comedian" },
      ],
    },
    {
      name: "Services",
      path: "/Services",
      filterPath: "/Services",
      icon: <MdMiscellaneousServices />,
      subMenu: [
        { name: "Anchor" },
        { name: "Decor" },
        { name: "Entertainer"},
        { name: "Party Supplies" },
        { name: "Photography & Videography"},
        { name: "Promoters" },
        { name: "DanceStudio"},
      ],
    },
    {
      name: "Venues",
      path: "/Venues",
      filterPath: "/Venues",
      icon: <IoLocationSharp />,
      subMenu: [
        { name: "Indoor" },
        { name: "Outdoor" },
      ],
    },
    { name: "Contact Us", path: "#", icon: <MdContactPhone /> },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 z-10" onClick={() => setShowPopup(false)} />
      <div className="absolute top-0 right-0 z-30 bg-white min-h-screen w-[80%] rounded py-6 px-4">
        <div className="flex justify-between items-center px-3 mb-2">
          <IoClose className="cursor-pointer" size={25} onClick={() => setShowPopup(false)} />
        </div>
        <hr />

        <div className="text-black">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-2">
              {/* CATEGORY BUTTON */}
              <div className="flex items-center justify-between hover:bg-gray-300 p-3 rounded-lg">
                {/* navigate to category page */}
                <div
                  className="flex items-center gap-2 flex-grow cursor-pointer"
                  onClick={(e) => {
                    if (!item.subMenu) {
                      navigate(item.path);
                      setShowPopup(false);
                    } else {
                      navigate(item.path); 
                      setShowPopup(false);
                    }
                  }}
                >
                  {item.icon}
                  {item.name}
                </div>

                {/* Dropdown Toggle Button */}
                {item.subMenu && (
                  <IoMdArrowDropdown
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigation when clicking dropdown arrow
                      setDropdownOpen(dropdownOpen === index ? null : index);
                    }}
                  />
                )}
              </div>

              {/* DROPDOWN SUBMENU */}
              {dropdownOpen === index && item.subMenu && (
                <div className="ml-5 mt-2">
                  {item.subMenu.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
                      onClick={() => {
                        navigate(item.filterPath, { state: subItem.name });
                        setShowPopup(false);
                      }}
                    >
                      {subItem.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <hr className="my-4" />

          {/* Authentication Section with Dropdown */}
          {userName ? (
            <div>
              <div
                className="flex justify-between items-center hover:bg-gray-300 p-3 rounded-lg cursor-pointer"
                onClick={() => setUserDropdown(!userDropdown)}
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  <MdAccountCircle />
                  {userName}
                </div>
                <IoMdArrowDropdown className="cursor-pointer" />
              </div>

              {userDropdown && (
            <div className="ml-5 mt-2 space-y-2"> 
              {userRole === "organizer" && (
                <div
                  className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
                  onClick={() => {
                    setShowPopup(false); 
                    navigate("/dashboard");
                  }}
                >
                  <MdDashboard size={20} /> 
                  <span>Dashboard</span>
                </div>
              )}

              <div
                className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
                onClick={() => {
                  setShowPopup(false); 
                  navigate("/profile");
                }}
              >
                <CgProfile size={20} /> 
                <span>Profile</span>
              </div>

              {userRole === "user" && (
                <div
                  className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
                  onClick={() => {
                    setShowPopup(false); 
                    navigate("/myBookings");
                  }}
                >
                  <IoTicket size={20} /> 
                  <span>My Orders</span>
                </div>
              )}

              <div
                className="flex items-center gap-2 hover:bg-red-200 p-2 rounded-lg cursor-pointer text-red-500"
                onClick={handleLogout}
              >
                <IoIosLogOut size={20} /> 
                <span>Logout</span>
              </div>
            </div>
          )}
            </div>

          ) : (
            <div
            onClick={() => {
              navigate("/login");
              setShowPopup(false);
            }}
            className="flex items-center gap-2 hover:bg-gray-300 p-3 rounded-lg cursor-pointer"
          >
            <MdAccountCircle size={20} /> 
            <span>Sign Up / Login</span>
          </div>

          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
