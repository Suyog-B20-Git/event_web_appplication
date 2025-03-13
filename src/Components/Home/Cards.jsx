/* eslint-disable react/prop-types */
import React from "react";

import { BsFire } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { MdEvent } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
// function Cards({ heading }) {
function Cards({ data, heading }) {
  const navigate = useNavigate();

  return (
    <div className="flex lg:justify-start  justify-center lg:relative left-[70px] items-center overflow-hidden">
      <div className="lg:p-12 lg:pb-5 lg:pt-10 pt-5 p-5 w-full max-w-[1340px]">
        <div className="flex justify-between">
          <div className="flex gap-2 lg:pl-3">
            <BsFire className="text-2xl relative top-1" />
            <p className="font-bold font-sans lg:text-2xl">{heading}</p>
          </div>
          <button
            onClick={() => navigate("/viewall")}
            className="shadow-md lg:text-base text-sm p-2  font-medium"
          >
            View All
          </button>
        </div>

        {/* Cards container with horizontal scrolling */}
        <div className="  flex gap-9 overflow-x-auto lg:p-4 pt-2 relative lg:right-46   w-full">
          {data.map((item, index) => (
            <div
              key={index}
              // className="flex-none shadow-lg p-2 rounded-lg lg:w-80 w-56"
              className="overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 flex-none  border  p-2 rounded-lg lg:w-[372px] w-57"
              onClick={() => navigate("/featuredEvent", { state: item._id })}
            >
              {/* <div className=" h-24 lg:h-52 md:h-32 w-full rounded-lg  flex justify-end overflow-hidden">
                <div
                  style={{
                    // backgroundImage: `url(${item.media.thumbnailImage})`,
                    backgroundImage: `url(${
                      item.media?.thumbnailImage || "fallback-image.jpg"
                    })`,

                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className=" h-24 lg:h-52 md:h-32 w-full rounded-lg p-2 flex justify-end transition-transform duration-300 hover:scale-125"
                >
                  <div className=" text-white bg-blue-300 rounded-xl lg:text-base text-xs   font-bold lg:px-3 lg:p-0 p-1 w-[max-content] h-[max-content]">
                    {item.category}
                  </div>
                </div>
              </div> */}
              {/*background image*/}

              <div className="h-24 lg:h-52 md:h-32 w-full rounded-lg flex justify-end overflow-hidden relative">
                {/* Background Image Container */}
                <div
                  style={{
                    backgroundImage: `url(${
                      item.media?.thumbnailImage || "fallback-image.jpg"
                    })`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="absolute inset-0 transition-transform duration-300 hover:scale-125"
                ></div>

                {/* Category Text (Fixed on Top) */}
                <div className="relative z-10 text-white m-2 bg-blue-300 rounded-xl lg:text-base text-xs font-bold lg:px-3 lg:p-0 p-1 w-[max-content] h-[max-content]">
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
                        <span>{item.visits}</span>
                      </p>
                    </p>
                    <p className="flex gap-2 text-gray-500 lg:text-base text-xs">
                      <MdEvent className="relative top-1" />
                      <span>{item.startDate}</span>
                    </p>
                    <p className="flex gap-2 text-gray-500 lg:text-base text-xs">
                      <CiLocationOn className="relative top-1" />
                      <span>
                        {item.venue?.city || "Pune"} -{" "}
                        {item.venue?.country || "India"}
                      </span>
                    </p>
                  </div>

                  <p className="mt-auto  flex lg:justify-between gap-4 items-center bg-[#F5FCFE] text-sm lg:text-sm p-2">
                    <span className="lg:text-sm text-xs">$1300 ONWARDS</span>
                    <button
                      className="relative  hover:text-white rounded shadow lg:p-2 p-2 lg:m-0 mr-1 lg:text-sm text-xs bg-white transition-all duration-300 
  before:absolute before:top-0 before:left-0 before:rounded-md before:w-0 before:h-full before:bg-[#ff2459] before:transition-all before:duration-300 
  hover:before:w-full hover:text-back hover:before:opacity-100 before:z-0 "
                    >
                      <p className="relative "> BUY NOW</p>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* {card1.map((item, index) => (
            <div
              key={index}
              // className="flex-none shadow-lg p-2 rounded-lg lg:w-80 w-56"
              className="flex-none  shadow-lg p-2 rounded-lg lg:w-[372px] w-57"
              onClick={() => navigate("/featuredEvent", { state: item })}
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
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Cards;
