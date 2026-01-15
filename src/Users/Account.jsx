import React, { useState } from "react";
import { FcViewDetails } from "react-icons/fc";
import { GiPartyPopper } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import EventStepVertical from "../Components/LandingPage/EventStepVertical";

import Login from "./Login";
import Register from "./Register";

function Account() {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="flex flex-col md:flex-row  w-full pt-10 pb-20 lg:pt-[200px]">
     

      <div className="flex flex-col gap-1 items-center w-full md:w-[80%]  p-2">
        <div className="flex lg:w-2/4 w-full lg:p-0 p-1 ">
          <button
            className={`p-3 ${toggle ? "bg-[#ff2459]" : "text-black"}  w-full
               rounded-2xl ${toggle ? "z-10 relative left-4 text-white" : ""}
            
                flex justify-center items-center px-5 py-2   shadow `}
            onClick={() => setToggle(true)}
          >
            Login
          </button>
          <button
            className={` p-3 ${
              toggle ? "text-black" : "bg-[#ff2459]"
            } w-full  rounded-2xl ${
              toggle ? "" : "z-10 relative right-4 text-white"
            } flex justify-center items-center px-5 py-2   shadow `}
            onClick={() => setToggle(false)}
          >
            Sign up
          </button>
        </div>
        <h1 className="lg:text-2xl text-base pt-4 font-medium justify-center flex items-center">
          Welcome to Our Page
        </h1>
        {toggle ? <Login /> : <Register />}
      </div>
    </div>
  );
}

export default Account;
