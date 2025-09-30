import React from "react";
import { BsFire } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { MdEvent } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const convertUTCToLocal = (utcString) => {
  if (!utcString) return "Invalid Date";
  const date = new Date(utcString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Change to false if you prefer 24-hour format
  });
};

// Function to get the correct price from ticketFormats
const getEventPrice = (event) => {
  if (!event.ticketFormats || event.ticketFormats.length === 0) {
    return "FREE";
  }

  // Find the minimum price among all ticket formats
  let minPrice = Infinity;
  let hasValidPrice = false;

  event.ticketFormats.forEach(ticket => {
    if (ticket.price !== undefined && ticket.price !== null) {
      hasValidPrice = true;
      
      // Check if ticket is on sale
      const now = new Date();
      const isOnSale = ticket.isSale && 
        new Date(ticket.saleStartDate) <= now && 
        now <= new Date(ticket.saleEndDate);
      
      const currentPrice = isOnSale ? ticket.salePrice : ticket.price;
      minPrice = Math.min(minPrice, currentPrice);
    }
  });

  if (!hasValidPrice || minPrice === Infinity) {
    return "FREE";
  }

  return `₹${minPrice} ONWARDS`;
};

// function Cards({ heading }) {
function EventCardData({ data, heading }) {
  const navigate = useNavigate();

  return (
    <div className="flex lg:justify-start justify-center items-center overflow-hidden">
      <div className="lg:p-12 lg:pb-5 lg:pt-10 pt-5 p-5 w-full max-w-[1340px]">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 lg:pl-3">
            <BsFire className="text-2xl relative top-1" />
            <p className="font-bold font-sans lg:text-2xl">{heading}</p>
          </div>
          <button
            onClick={() => navigate("/events")}
            className="shadow-md lg:text-base text-sm p-2 font-medium bg-[#ff2459] text-white  rounded"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:p-4 pt-2 w-full">
          {data.map((item, index) => (
            <div
              key={index}
              className="border shadow-lg p-3 rounded-lg w-full max-w-[320px] "

              onClick={() => {
                const path =
                  `/events/${item.category.toLowerCase()}/${item._id}` ||
                  "featured-event";
                navigate(path, { state: item._id });
              }}
            >
              <div className="h-24 lg:h-52 md:h-32 w-full rounded-lg flex justify-end overflow-hidden relative">
                <div
                  style={{
                    backgroundImage: `url(${
                      item.media?.thumbnailImage ||
                      "assets/staticAssets/fallback-image.jpg"
                    })`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="absolute inset-0 transition-transform duration-300 hover:scale-125"
                ></div>

                {/* Category Text (Fixed on Top) */}
                <div className="relative  text-white m-2 bg-blue-300 rounded-xl lg:text-base text-xs font-bold lg:px-3 lg:p-0 p-1 w-[max-content] h-[max-content]">
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
                      <span>{convertUTCToLocal(item.startDate)}</span>
                    </p>
                    <p className="flex gap-2 text-gray-500 lg:text-base text-xs">
                      <CiLocationOn className="relative top-1" />
                      <span>
                        {item.venueDetails?.city} - {item.venueDetails?.country}
                      </span>
                    </p>
                  </div>

                  <p className="mt-auto  flex lg:justify-between gap-4 items-center text-sm lg:text-sm p-2">
                    <span className="lg:text-sm text-xs">{getEventPrice(item)}</span>
                    {/* <button className="rounded shadow lg:p-2 p-2 lg:m-0 mr-1 lg:text-sm text-xs bg-white">
                                     BUY NOW
                                   </button> */}
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
        </div>
      </div>
    </div>
  );
}

export default EventCardData;
