/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";

const Card2 = ({ item, customStyle }) => {
  const navigate=useNavigate()
  return (
    <div onClick={()=>{
      navigate("/getEventByFilter", {
        state:item.text,
      });
    }} className="w-full cursor-pointer lg:w-max   md:w-[80%]   rounded-lg border border-blue-500 ">
      <div
        className="relative lg:h-44 h-28 lg:w-52  w-[100px] rounded-lg overflow-hidden shadow-lg bg-cover bg-center"
        style={{
          backgroundImage: `url(${item.Name})`, // Replace with your image URL
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        {/* Text */}
        <div className="absolute inset-0 flex flex-row justify-center  text-white w-[100%] ">
          <h2 className="text-lg w-[100%] lg:text-3xl m-2 ml-3 font-medium mt-7  sm:font-semibold">
            {item.text}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Card2;
