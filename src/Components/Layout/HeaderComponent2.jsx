/* eslint-disable react/jsx-key */

import { IoLocationSharp, IoMenu, IoSearch } from "react-icons/io5";

import { useState, useEffect } from "react";
import Button from "../ReusableComponents/Button";
import InputField from "../ReusableComponents/InputField";
import SideBarComponent from "./SideBArComponent";
import { IoIosPerson, IoMdHome } from "react-icons/io";
import {
  MdAccountCircle,
  MdContactPhone,
  MdEvent,
  MdMiscellaneousServices,
} from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // Correct import

const HeaderComponent2 = () => {
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

  const handleShowAlert = () => setShowPopup(true);
  var text_data = [
    { name: "Home", icon: <IoMdHome />, path: "/landingPage" },
    { name: "Event", path: "/event-category", icon: <MdEvent /> },
    { name: "Organisers", path: "#", icon: <GrGroup /> },
    { name: "Performers", path: "#", icon: <IoIosPerson /> },
    {
      name: "Services",
      paths: "#",
      icon: <MdMiscellaneousServices />,
    },
    { name: "Contact Us", path: "#", icon: <MdContactPhone /> },
    { name: "Venues", path: "/Vanue", icon: <IoLocationSharp /> },
  ];
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
                  src="public/Logo.png"
                  className="lg:block md:block hidden md:w-[17vw] relative  sm:[17vw] w-[80%] "
                  alt="logo"
                />
                <img
                  src="public/logo2.jpg"
                  className="lg:hidden mt-3 ml-3 rounded-full md:hidden block md:w-[17vw] relative  sm:[17vw] w-[80%] "
                  alt="logo"
                />
                <p className=" lg:hidden pt-2 text-[10px] whitespace-nowrap font-bold text-[#ff2459]">
                  Event Node
                </p>
              </div>

              <div className="relative flex  md:w-[65%] w-[96%] p-2 ">
                {/* <div className="relative z-20 md:w-[65%] w-[96%] "> */}
                {/* search bar */}

                <div className="flex  lg:flex-row flex-col items-center rounded-full bg-gray-100 shadow-md p-2 lg:w-full w-[80%]  mx-auto">
                  {/* Search Input */}
                  <div className="flex items-center  flex-1 px-4 ">
                    <span className="text-gray-700 relative lg:left-0 text-lg font-bold">
                      <IoSearch />
                    </span>
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
                    <button className="bg-[#e33661]  font-semibold p-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 50 50"
                      >
                        <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

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
                />
              </div>
            </div>
          </div>

          {/* Second Headding */}
          <div className="w-[100%] hidden lg:flex ">
            <div className="hidden sm:flex justify-end gap-5 lg:relative lg:left-40 items-center  w-[70%] ">
              {text_data.map((item, index) => (
                <button
                  className="font-medium  lg:text-lg md:text-sm lg:mr-5 flex  lg:gap-1 md:gap-0.5 relative z-60 "
                  onClick={() => navigate(item.path)}
                >
                  <p className="relative top-1.5 "> {item.icon}</p> {item.name}
                </button>
              ))}
            </div>
            <div className="   md:w-[30%]">
              <div className="md:flex  relative left-20 z-60  md:justify-end hidden   md:w-[100%] w-[100%]">
                <div className=" m-1 md:mr-20 lg:mr-36  w-[100%] hidden md:flex md:justify-end">
                  {/* <Button
                    text={"Sign Up / Login "}
                    textSize={"md:text-lg text-lg"}
                    width={"lg:w-[60%] "}
                    rounded={"rounded"}
                    variant={"primary"}
                    onClick={()=>navigate('/account')}
                   
                  /> */}
                  {userName ? (
                    <span>Welcome, {userName}!</span> // Show user name if available
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
      {ShowPopup && <SideBarComponent setShowPopup={setShowPopup} />}
    </div>
  );
};

export default HeaderComponent2;
