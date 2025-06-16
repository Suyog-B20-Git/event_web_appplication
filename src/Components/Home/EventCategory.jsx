import { FaArrowRightLong } from "react-icons/fa6";
import Card2 from "./cards2";
import { useRef, useState } from "react";
import { MdNavigateNext, MdOutlineCategory } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GrFormPrevious } from "react-icons/gr";

const EventCategory = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  var data = [
    { Name: "assets/staticAssets/Ev1.png", text: "Business " },
    { Name: "assets/staticAssets/fest.jpg", text: "Festival" },
    { Name: "assets/staticAssets/music.jpeg", text: "Live Music" },
    { Name: "assets/staticAssets/pro.jpg", text: "Professional" },
    { Name: "assets/staticAssets/cahrity.webp", text: "Social" },
  ];
  var data1 = [
    { Name: "assets/staticAssets/Ev1.png", text: "Business " },
    { Name: "assets/staticAssets/fest.jpg", text: "Festival" },
    { Name: "assets/staticAssets/music.jpeg", text: "Live Music" },
    { Name: "assets/staticAssets/pro.jpg", text: "Professional" },
    { Name: "assets/staticAssets/cahrity.webp", text: "Social" },
    { Name: "assets/staticAssets/music.jpeg", text: "Nightlife & Club" },
    { Name: "assets/staticAssets/sport.jpeg", text: "Sport & Leisure" },
    { Name: "assets/staticAssets/education.jpg", text: "Theatre & Arts" },
  ];
  return (
    <div className="flex flex-col px-4 lg:px-12 pt-2 lg:pt-10 pb-8 w-full max-w-[1340px] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          <MdOutlineCategory className="text-2xl" />
          <div>
            <p className="font-bold font-sans lg:text-2xl text-lg">
              EVENT CATEGORY
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full relative">
        <button
          className="hidden lg:flex mr-4 bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800"
          onClick={scrollLeft}
        >
          <GrFormPrevious size={20} />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex flex-row overflow-x-auto scrollbar-hide gap-5 lg:gap-12 w-full px-2 lg:px-0"
        >
          {data1.map((item, index) => (
            <Card2 key={index} item={item} />
          ))}
        </div>

        <button
          className="hidden lg:flex ml-4 bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800"
          onClick={scrollRight}
        >
          <MdNavigateNext size={20} />
        </button>
      </div>
    </div>
  );
};
export default EventCategory;
