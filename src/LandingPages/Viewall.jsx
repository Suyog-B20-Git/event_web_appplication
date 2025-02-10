/* eslint-disable react/prop-types */
import React from "react";
import { BsFire } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

function Viewall() {
  const location = useLocation();
  const data = location.state;
  return (
    <div className="lg:p-32 lg:pt-10">
      <h1 className="text-2xl flex gap-2 font-medium ">
        {" "}
        <BsFire className="text-2xl relative top-1" />
        {data.heading}
      </h1>
      <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-10  overflow-x-auto p-4 relative  scrollbar-hide w-full">
        {data.card1.map((item, index) => (
          <div
            key={index}
            // className="flex-none shadow-lg p-2 rounded-lg lg:w-80 w-56"
            className="flex-none  shadow-lg p-2 rounded-lg lg:w-[372px] w-57"
            // onClick={() => navigate("/featuredEvent", { state: item })}
          >
            <div
              style={{
                backgroundImage: `url(${item.img})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="h-24 lg:h-52 md:h-32 w-full rounded-2xl p-2 flex justify-end"
            >
              <div className=" text-white bg-blue-300 rounded-xl lg:text-base text-xs   font-bold lg:px-3 lg:p-0 p-1 w-[max-content] h-[max-content]">
                {item.category}
              </div>
            </div>
            <div>
              <div className="flex    font-medium  flex-col gap-2 p-2 lg:text-base text-xs">
                <div className="">
                  {" "}
                  <p className="lg:text-xl overflow-x-hidden   text-base flex lg:flex-row flex-col justify-between">
                    {item.name}{" "}
                    <p className="flex gap-2 text-gray-500 lg:text-base text-xs  ">
                      <FaEye className="relative top-1 text-blue-600" />
                      <span>124 </span>
                    </p>
                  </p>
                  <p className="flex gap-2 text-gray-500 lg:text-base text-xs">
                    <MdEvent className="relative top-1" />
                    <span>
                      {item.date} - {item.time}
                    </span>
                  </p>
                  <p className="flex gap-2 text-gray-500 lg:text-base text-xs">
                    <CiLocationOn className="relative top-1" />
                    <span>{item.location}</span>
                  </p>
                </div>

                <p className="mt-auto  flex lg:justify-between gap-4 items-center bg-[#F5FCFE] text-sm lg:text-sm p-2">
                  <span className="lg:text-sm text-xs">$1300 ONWARDS</span>
                  <button className="rounded shadow lg:p-2 p-2 lg:m-0 mr-1 lg:text-sm text-xs bg-white">
                    BUY NOW
                  </button>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Viewall;
