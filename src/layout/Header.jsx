import {
  IoLocationSharp,
  IoMenu,
  IoSearch,
  IoSearchSharp,
} from "react-icons/io5";

import { useState, useEffect, useRef } from "react";
import Button from "../Components/Button";
// import InputField from "../ReusableComponents/InputField";
import Sidebar from "./Sidebar";
import { IoIosLogOut, IoIosPerson, IoMdHome } from "react-icons/io";
import {
  MdContactPhone,
  MdDashboard,
  MdEvent,
  MdMiscellaneousServices,
} from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // Correct import
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import gsap from "gsap";

const Header = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(false);
  const [ShowPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState(""); // State to store the name from JWT

  // Get the authToken from localStorage
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      if (decodedToken?.name) {
        setUserName(decodedToken.name); // Set user name if token is valid
      }
    }
  }, [authToken]);
  const [isSearch, setIsSearch] = useState(false);
  const handleShowAlert = () => setShowPopup(true);
  var text_data = [
    { name: "Home", icon: <IoMdHome />, path: "/home" },
    {
      name: "Event",
      path: "#",
      icon: <MdEvent />,
      popUpMenu: [
        { name: "Business", path: "#" },
        { name: "Festivals", path: "#" },
        { name: "Live Music", path: "#" },
        { name: "Nightlife and club", path: "#" },
        { name: "Professional", path: "#" },
        { name: "Social", path: "#" },
        { name: "Sport & Leisure", path: "#" },
        { name: "Theatre & Arts", path: "#" },
      ],
    },
    {
      name: "Organisers",
      path: "/getOrganizer",
      icon: <GrGroup />,
      popUpMenu: [
        { name: "Event Planner", path: "#" },
        { name: "Wedding Planner", path: "#" },
        { name: "Adventure", path: "#" },
      ],
    },
    {
      name: "Performers",
      path: "#",
      icon: <IoIosPerson />,
      popUpMenu: [
        { name: "Band", path: "#" },
        { name: "Disc Jockey", path: "#" },
        { name: "Sound Artist", path: "#" },
        { name: "Stand up Comedian", path: "#" },
      ],
    },

    {
      name: "Services",
      paths: "#",
      icon: <MdMiscellaneousServices />,
      popUpMenu: [
        { name: "Anchor", path: "#" },
        { name: "Decor", path: "#" },
        { name: "Entertainer", path: "#" },
        { name: "Party Supplies", path: "#" },
        { name: "Photography And Videography", path: "#" },
        { name: "Promoters", path: "#" },
        { name: "DanceStudio", path: "#" },
      ],
    },
    { name: "Contact Us", path: "#", icon: <MdContactPhone /> },
    {
      name: "Venues",
      path: "/Vanue",
      icon: <IoLocationSharp />,
      popUpMenu: [
        { name: "Indoor", path: "#" },
        { name: "Outdoor", path: "#" },
      ],
    },
  ];

  const [isLog, setIsLog] = useState(false);
  const [isPop, setIsPop] = useState(false);
  const boxRef = useRef(null);
  const dropdownRef = useRef(null); // Ref for the dropdown
  useEffect(() => {
    gsap.from(boxRef.current, {
      y: 100, // Moves up from 100px
      opacity: 0, // Starts with opacity 0
      duration: 1, // Animation lasts for 1 second
      ease: "power3.out",
    });
  }, []);
  const [activeIndex, setActiveIndex] = useState(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLog(false);
        setIsPop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLogin");
  };
  const handleClickOutside1 = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearch(false);
    }
  };
  const searchRef = useRef(null);
  useEffect(() => {
    if (isSearch) {
      document.addEventListener("mousedown", handleClickOutside1);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside1);
    };
  }, [isSearch]);

  return (
    <div className="bg-gray-900 text-white p-1 fixed w-full z-30">
      <div>
        <div className="lg:w-[100%] w-[100%]  lg:h-[160px] inset-0 z-60 items-center justify-center bg-opacity-50 relative">
          {/* first div */}
          <div className="flex w-[100%] md:h-[100px] h-[80px]  lg:h-[100px]  inset-0 z-60 items-center justify-center bg-opacity-50 relative ">
            <div className="flex justify-between  items-center  lg:w-[60%] w-[100%] ">
              <div
                className="md:w-[35%] w-[100%]   
            ml-3 relative lg: p-1 rounded-md"
              >
                {/* <div className="md:w-[35%] w-[80%]  ml-3 relative z-20 p-1 rounded-md"> */}

                <img
                  src="logo.png"
                  className="lg:block md:block hidden md:w-[17vw] relative  sm:[17vw] w-[80%] "
                  alt="logo"
                />
              </div>

              {/*Mobile view */}
              {isSearch ? (
                <div
                  ref={searchRef}
                  className="flex relative lg:hidden md:hidden right-12 px-4 items-center rounded-full bg-gray-100 shadow-md p-2 w-[110%]   mx-auto "
                >
                  <span className="text-gray-700 relative lg:left-0 text-lg font-bold ">
                    <IoSearch />
                  </span>
                  <input
                    type="search"
                    placeholder="Search events"
                    onClick={() => setLocation(true)}
                    className="bg-transparent outline-none px-4 text-gray-700"
                  />
                </div>
              ) : (
                <img
                  src="public/Logo.png"
                  className="relative right-24 lg:hidden md:hidden block    h-[40%]   w-[40%] "
                  alt="logo"
                />
              )}

              <div className="relative flex  md:w-[65%] w-[96%] p-2 ">
                {/* <div className="relative z-20 md:w-[65%] w-[96%] "> */}
                {/* search bar */}

                <div className="lg:flex md:flex hidden  lg:flex-row flex-col items-center rounded-full bg-gray-100 shadow-md p-2 lg:w-full w-[80%]  mx-auto">
                  {/* Search Input */}
                  <div className="flex items-center  flex-1 px-4 ">
                    <input
                      type="text"
                      placeholder="Search events"
                      onClick={() => setLocation(true)}
                      className="flex-1 bg-transparent outline-none px-4 text-gray-700"
                    />
                  </div>

                  {/* Location */}
                  <div className="lg:flex  hidden  items-center gap-2 px-4 border-l border-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      height={"20px"}
                      id="location"
                    >
                      <g fill="#134563">
                        <path d="m32 55.7-.9-1.1c-.6-.8-15.9-18.7-15.9-29.4 0-9.3 7.6-16.8 16.8-16.8S48.8 16 48.8 25.2c0 10.7-15.3 28.7-15.9 29.4l-.9 1.1zm0-45c-8 0-14.4 6.5-14.4 14.4 0 8.4 11.1 22.7 14.4 26.8 3.3-4.1 14.4-18.3 14.4-26.8 0-7.9-6.4-14.4-14.4-14.4z"></path>
                        <path d="M32 31.6c-3.5 0-6.4-2.9-6.4-6.4s2.9-6.4 6.4-6.4 6.4 2.9 6.4 6.4-2.9 6.4-6.4 6.4zm0-10.4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"></path>
                      </g>
                    </svg>
                    <input
                      type="text"
                      placeholder="location"
                      className="flex-1 bg-transparent outline-none px-2 text-gray-700"
                    />
                    {/* Search Button */}
                    <button className="bg-[#e33661]   font-semibold p-1 rounded-full">
                      <IoSearchSharp className="text-white text-lg" />
                    </button>
                  </div>
                </div>

                {/*Mobile view search bar button*/}
                {!isSearch && (
                  <button
                    onClick={() => setIsSearch(true)}
                    className={`lg:hidden md:hidden block text-2xl m-1 mr-6 p-1 rounded-full bg-[#ff2459] font-bold`}
                  >
                    <CiSearch />
                  </button>
                )}

                <div
                  className="relative z-20 w-[10%] block lg:hidden md:left-4  text-4xl sm:font-medium font-normal  sm:text-2xl"
                  onClick={(e) => handleShowAlert()}
                >
                  <IoMenu />
                </div>
              </div>
            </div>

            {/* second div */}
            <div className="lg:flex p-4  relative z-60  lg:justify-end hidden   md:w-[40%] w-[100%]">
              <div className=" m-1">
                <Button
                  text={"Create Event"}
                  rounded={"rounded"}
                  variant={"primary"}
                  onClick={() => navigate("/createEvent")}
                />
              </div>
              <div className="m-1">
                <Button
                  text={"Create Page"}
                  rounded={"rounded"}
                  variant={"primary"}
                  onClick={() => navigate("/createPage")}
                />
              </div>
            </div>
          </div>

          {/* Second Headding */}
          <div className="w-[100%] hidden lg:flex ">
            {/* <div className="hidden sm:flex justify-end gap-5 lg:relative lg:left-40 items-center  w-[70%] ">
              {text_data.map((item, index) => (
                <button
                  key={index}
                  className="font-medium  lg:text-lg md:text-sm lg:mr-5 flex  lg:gap-1 md:gap-0.5 relative z-60 "
                  onClick={() => navigate(item.path)}
                >
                  <p
                    onMouseEnter={() => setIsPop(true)}
                    onMouseLeave={() => setIsPop(false)}
                    className="relative top-1.5 "
                  >
                    {" "}
                    {item.icon}
                  </p>{" "}
                  {item.name}
                  {isPop && (
                    <div
                      ref={boxRef}
                      className="bg-white rounded text-gray-900 absolute w-40  h-[120px] mt-1"
                    >
                      {item.popUpMenu.map((menuItem, index) => {
                        return (
                          <button
                            key={index}
                            className="flex gap-2 p-2 font-medium hover:text-white hover:bg-[#ff2459] w-full"
                          >
                            <MdDashboard className=" hover:text-white relative top-1" />
                            {menuItem.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </button>
              ))}
            </div> */}
            {/* <div className="hidden sm:flex justify-end gap-5 lg:relative lg:left-40 items-center w-[70%]">
              {text_data.map((item, index) => (
                <button
                  key={index}
                  className="font-medium lg:text-lg md:text-sm lg:mr-5 flex lg:gap-1 md:gap-0.5 relative z-60"
                  onClick={() => navigate(item.path)}
                  onMouseEnter={() => setActiveIndex(index)} // Set active index on hover
                  onMouseLeave={() => setActiveIndex(null)} // Reset on mouse leave
                >
                  <p className="relative top-1.5">{item.icon}</p> {item.name}
                  {activeIndex === index &&
                    item.popUpMenu && ( // Show popup only for the active item
                      <div
                        ref={boxRef}
                        className="bg-white rounded text-gray-900 absolute top-7 w-max h-max mt-1 shadow-lg"
                      >
                        {item.popUpMenu.map((menuItem, menuIndex) => (
                          <button
                            key={menuIndex}
                            className="flex gap-2 p-2 font-medium hover:text-white hover:bg-[#ff2459] w-full"
                          >
                            <MdDashboard className="hover:text-white relative top-1" />
                            {menuItem.name}
                          </button>
                        ))}
                      </div>
                    )}
                </button>
              ))}
            </div> */}
            <div className="hidden sm:flex justify-end gap-5 lg:relative lg:left-40 items-center w-[70%]">
              {text_data.map((item, index) => (
                <div
                  key={index}
                  className="relative pb-2"
                  onMouseEnter={() => setActiveIndex(index)} // Keep active when hovering over button or dropdown
                  onMouseLeave={() => setActiveIndex(null)} // Close dropdown only when mouse leaves both
                >
                  <button
                    className="font-medium lg:text-lg md:text-sm lg:mr-5 flex lg:gap-1 md:gap-0.5 relative z-60"
                    onClick={() => navigate(item.path)}
                  >
                    <p className="relative top-1.5">{item.icon}</p> {item.name}
                  </button>

                  {activeIndex === index && item.popUpMenu && (
                    <div
                      ref={boxRef}
                      className="bg-white rounded text-gray-900 absolute top-7 left-0 w-max  h-max mt-1 shadow-lg"
                    >
                      {item.popUpMenu.map((menuItem, menuIndex) => (
                        <button
                          key={menuIndex}
                          className="flex gap-2 p-2.5 font-medium hover:text-white hover:bg-[#ff2459]  w-full"
                        >
                          {/* <MdDashboard className="hover:text-white relative top-1" /> */}
                          {menuItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="   md:w-[30%]">
              <div
                onMouseEnter={() => setIsLog(true)}
                onMouseLeave={() => setIsLog(false)}
                className="md:flex  relative left-20 z-60  md:justify-end hidden   md:w-[100%] w-[100%]"
              >
                <div className=" m-1 md:mr-20 lg:mr-36  w-[100%] hidden md:flex md:justify-end">
                  {userName ? (
                    <div ref={dropdownRef}>
                      <span
                        onClick={() => setIsLog(!isLog)}
                        className="p-1 cursor-pointer font-medium  lg:text-lg md:text-sm lg:mr-5 flex  lg:gap-1 md:gap-0.5 relative z-60 "
                      >
                        Welcome, {userName}!
                      </span>
                      {isLog && (
                        <div
                          ref={boxRef}
                          className="bg-white rounded text-gray-900 absolute w-40  h-[120px] mt-1"
                        >
                          <button
                            onClick={() => {
                              setIsLog(false);
                            }}
                            className="flex gap-2 p-2 font-medium hover:text-white hover:bg-[#ff2459] w-full"
                          >
                            <MdDashboard className=" hover:text-white relative top-1" />
                            Dashboard
                          </button>
                          <button
                            onClick={() => {
                              setIsLog(false);
                            }}
                            className="flex gap-2 p-2 font-medium hover:text-white hover:bg-[#ff2459] w-full"
                          >
                            <CgProfile className=" hover:text-white relative top-1" />
                            Profile
                          </button>
                          <button
                            onClick={() => {
                              handleLogOut();
                              setIsLog(false);
                              setUserName("");
                              window.location.reload();
                            }}
                            className="flex gap-2 p-2 font-medium hover:text-white hover:bg-[#ff2459] w-full"
                          >
                            <IoIosLogOut className=" hover:text-white relative top-1" />
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      text={"Sign Up / Login "}
                      textSize={"text-base"}
                      width={"lg:w-[60%] "}
                      rounded={"rounded"}
                      variant={"primary"}
                      onClick={() => navigate("/login")}
                    /> // Show Sign Up/Login button if no token or name
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {ShowPopup && <Sidebar setShowPopup={setShowPopup} />}
    </div>
  );
};

export default Header;
