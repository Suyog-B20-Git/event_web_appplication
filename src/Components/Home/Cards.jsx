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

  // const card1 = [
  //   {
  //     img: "fI1.png",
  //     name: "Art Exhibition | India",
  //     date: "February 12",
  //     time: "5:00 PM",
  //     location: "Kala Ghoda, Mumbai",
  //     category: "Art",
  //     start: "10 Feb 2025",
  //     startTime: "10:00 AM",
  //     end: "14 Feb 2025",
  //     endTime: "6:00 PM",
  //     organiser: "ArtWave",
  //   },
  //   {
  //     img: "fI2.png",
  //     name: "Tech Conference 2025 | USA",
  //     date: "April 10",
  //     time: "9:00 AM",
  //     location: "Silicon Valley, California",
  //     category: "Technology",
  //     start: "8 Apr 2025",
  //     startTime: "9:00 AM",
  //     end: "12 Apr 2025",
  //     endTime: "5:00 PM",
  //     organiser: "InnovateTech",
  //   },
  //   {
  //     img: "fI3.png",
  //     name: "Food Festival | Italy",
  //     date: "May 20",
  //     time: "11:00 AM",
  //     location: "Piazza Navona, Rome",
  //     category: "Food",
  //     start: "18 May 2025",
  //     startTime: "11:00 AM",
  //     end: "22 May 2025",
  //     endTime: "8:00 PM",
  //     organiser: "FoodiesUnited",
  //   },
  //   {
  //     img: "fI1.png",
  //     name: "Marathon 2025 | UK",
  //     date: "June 5",
  //     time: "7:00 AM",
  //     location: "Hyde Park, London",
  //     category: "Sports",
  //     start: "4 Jun 2025",
  //     startTime: "6:30 AM",
  //     end: "6 Jun 2025",
  //     endTime: "12:00 PM",
  //     organiser: "RunLife",
  //   },
  //   {
  //     img: "fI2.png",
  //     name: "Literature Fair | France",
  //     date: "July 15",
  //     time: "2:00 PM",
  //     location: "Eiffel Tower, Paris",
  //     category: "Literature",
  //     start: "14 Jul 2025",
  //     startTime: "1:00 PM",
  //     end: "18 Jul 2025",
  //     endTime: "6:00 PM",
  //     organiser: "BookWorld",
  //   },
  // ];

  return (
    <div className="flex lg:justify-start  justify-center lg:relative left-[70px] items-center overflow-hidden">
      <div className="lg:p-12 lg:pb-5 lg:pt-10 pt-5 p-5 w-full max-w-[1340px]">
        <div className="flex justify-between">
          <div className="flex gap-2 lg:pl-3">
            <BsFire className="text-2xl relative top-1" />
            <p className="font-bold font-sans lg:text-2xl">{heading}</p>
          </div>
          <button
            // onClick={() =>
            //   navigate("/viewall", {
            //     state: { card1: card1, heading: heading },
            //   })
            // }
            className="shadow-md lg:text-base text-sm p-2  font-medium"
          >
            View All
          </button>
        </div>

        {/* Cards container with horizontal scrolling */}
        <div className="  flex gap-9 overflow-x-auto lg:p-4 pt-2 relative lg:right-46  scrollbar-hide w-full">
          {data.map((item, index) => (
            <div
              key={index}
              // className="flex-none shadow-lg p-2 rounded-lg lg:w-80 w-56"
              className="overflow-hidden flex-none  border  shadow-lg p-2 rounded-lg lg:w-[372px] w-57"
              // onClick={() => navigate("/featuredEvent", { state: item })}
            >
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
                className=" h-24 lg:h-52 md:h-32 w-full rounded-lg p-2 flex justify-end"
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
                    <button className="rounded shadow lg:p-2 p-2 lg:m-0 mr-1 lg:text-sm text-xs bg-white">
                      BUY NOW
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
