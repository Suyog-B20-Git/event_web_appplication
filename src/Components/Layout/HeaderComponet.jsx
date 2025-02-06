// import Button from "../Reusablecomponent/ButtonComponent";
// import InputField from "../Reusablecomponent/InputField";
import { IoMenu } from "react-icons/io5";
// import SideBarComponent from "./SideBArComponent";
import { useEffect, useState } from "react";
import Button from "../ReusableComponents/Button";
import InputField from "../ReusableComponents/InputField";
import SideBarComponent from "./SideBArComponent";
import jwt_decode from "jwt-decode"; // Correct import

const HeaderComponet = () => {
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
    { name: "Home", },
    { name: "Event", paths: '/organiser' },
    { name: "Organisers", paths: '/venues' },
    { name: "Performers", paths: '/contact-us' },
    { name: "Services", paths: '/create-event' },
    { name: "Contact Us", paths: '/create-event' },


  ];
  return (
    <>
      <div>
        <div className="sm:w-[100%] w-[100%] h-[190px]  inset-0 z-60 items-center justify-center bg-opacity-50 relative z-20">
          {/* first div */}
          <div className="flex w-[100%  h-[100px] inset-0 z-60 items-center justify-center bg-opacity-50 relative ">
            <div className="flex justify-between items-center  md:w-[60%] w-[100%] ">
              <div className="md:w-[35%] w-[80%]  ml-3 relative p-1 rounded-md">
              {/* <div className="md:w-[35%] w-[80%]  ml-3 relative z-20 p-1 rounded-md"> */}
                <img
                  src="public/Logo.png"
                  className=" md:w-[17vw] sm:[20vw] w-[100%] "
                  alt="logo"
                />
              </div>

              <div className="relative  md:w-[65%] w-[96%] " >
              {/* <div className="relative z-20 md:w-[65%] w-[96%] " > */}
                {/* search bar */}
                <InputField width={"w-[100%]"} rounded={"rounded-full"} placeholder={"Search"} />
              </div>

              <div className="relative z-20 w-[10%] block md:hidden text-white text-4xl sm:font-medium font-normal  sm:text-2xl" onClick={(e) => handleShowAlert()} >
                <IoMenu />

              </div>


            </div>
            {/* second div */}
            <div className="md:flex  relative z-20  md:justify-end hidden   md:w-[40%] w-[100%]">
              <div className=" m-1">
                <Button text={"Create Event"} rounded={"rounded"} variant={"primary"} />
              </div>
              <div className="m-1">
                <Button text={"Create page"} rounded={"rounded"} variant={"secondary"} />


              </div>
            </div>
          </div>

          {/* Second Headding */}
          <div className="w-[100%] hidden md:flex ">
            <div className="hidden sm:flex justify-end gap-5  items-center  w-[70%] " >
              {
                text_data.map((item, index) => (
                  <div key={index} className="font-medium text-lg mr-5 text-[#FFFFFF] relative z-20 ">{item.name}</div>
                ))
              }


            </div>
            <div className="   md:w-[30%]">
              <div className="md:flex  relative z-20  md:justify-end hidden   md:w-[100%] w-[100%]">
                <div className=" m-1 md:mr-20 lg:mr-36  w-[100%] hidden md:flex md:justify-end">
                  {/* <Button text={"Sign Up / Login "} textSize={"md:text-lg text-lg"} width={"sm:w-[100%] w-[100%] "} rounded={"rounded"} variant={"primary"} /> */}
                  {userName ? (
                <span>Welcome, {userName}!</span> // Show user name if available
              ) : (
                <button>Sign Up / Login</button> // Show Sign Up/Login button if no token or name
              )}
                </div>

              </div>
            </div>
          </div>


        </div>

      </div>
      {
        ShowPopup && <SideBarComponent setShowPopup={setShowPopup} />
      }
    </>
  );
};

export default HeaderComponet;

