


import React, { useState } from "react";
import Details from "./Details";
import Timing from "./Timing";
import Ticket from "./Ticket";
import Location from "./Location";
import Media from "./Media";
import SEO from './SEO'
import Publish from "./Publish";

function EventForm() {
  const header = [
    "Details",
    "Timing",
    "Ticket",
    "Location",
    "Media",
    "SEO",
    "Publish",
  ];

  const slides = [
    <Details />,
    <Timing />,
    <Ticket />,
    <Location />,
    <Media />,
    <SEO/>,
    <Publish/>
  ];

  const [activeIndex, setActiveIndex] = useState(0); // Track the active button
  const [data, setData] = useState(<Details />);

  return (
    <div>
      {/* Header buttons */}
      <div className="flex lg:gap-6 md:gap-4 bg-[#E9ECEF] lg:text-lg font-medium lg:p-2 md:p-2 md:text-base text-xs items-center">
        {header.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              className={`lg:px-4 px-2.5 md:px-3 py-2  ${
                isActive
                  ? " text-green-800 bg-blue-300 rounded-md border-b-blue-400 border-b-2"
                  : "bg-transparent text-gray-800"
              } hover:bg-sky-100`}
              onClick={() => {
                setActiveIndex(index); // Set the active index
                setData(slides[index]); // Set the corresponding slide
              }}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Content area */}
      <div className="p-4">{data}</div>
    </div>
  );
}

export default EventForm;
