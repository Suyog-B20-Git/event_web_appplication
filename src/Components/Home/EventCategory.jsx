import { FaArrowRightLong } from "react-icons/fa6";
import Card2 from "./cards2";
import { useState } from "react";
import { MdOutlineCategory } from "react-icons/md";

const EventCategory = () => {
  const [show, setshow] = useState(false);
  var data = [
    { Name: "public/Ev1.png", text: "Business Events" },
    { Name: "food.jpg", text: "Food & Drinks" },
    { Name: "music.jpeg", text: "Music & Concerts" },
    { Name: "travell.png", text: "Travel & Trekking" },
    { Name: "cahrity.webp", text: "Charity & Non-profits" }
  ];
  var data1 = [
    { Name: "public/Ev1.png", text: "Business "},
    { Name: "fest.jpg", text: "Festival" },
    { Name: "music.jpeg", text: "Live Music" },
    { Name: "pro.jpg", text: "Professional" },
    { Name: "cahrity.webp", text: "Social" },
    { Name: "music.jpeg", text: "Nightlife & Club" },
    { Name: "sport.jpeg", text: "Sports & Leisure" },
    { Name: "education.jpg", text: "Theatre & art" },
  ];
  return (
    <>
      <div className=" lg:p-4 lg:pb-0 p-4 pt-1 lg:pl-14  md:pl-12   ">
        <div className="flex justify-around items-center p-2 font-sans">
          <div className="w-[95%]  lg:text-2xl text-xl font-bold  font-sans lg:px-24  relative md:right-8 lg:right-5  flex gap-2 ">
            <MdOutlineCategory className="relative top-1" /> Event Category
          </div>
          <div
            onClick={() => setshow(!show)}
            className="flex items-center w-[10%] lg:mr-16 mr-7"
          >
            <button className=" shadow-md p-2 cursor-pointer text-base sm:font-medium font-normal sm:text-base text-[#000000]">
              {show ? "ViewAll" : "ViewLess"}
            </button>{" "}
          </div>
        </div>

        
        <div
          className={`  grid grid-cols-2 md:grid md:grid-cols-3  lg:grid-cols-5   lg:gap-5 gap-5 md:gap-5  lg:p-24 lg:pl-20  lg:pb-12 pt-4 pl-2 lg:pt-8
          `}
          // className={` grid grid-cols-2 md:grid md:grid-cols-3 lg:flex lg:justify-center flex-wrap gap-5  lg:p-8 lg:px-16 pt-4 lg:pt-8
          // `}
        >
          {show
            ? data.map((item, index) => <Card2 key={index} item={item} />)
            : data1.map((item, index) => <Card2 key={index} item={item} />)}
        </div>
      </div>
    </>
  );
};
export default EventCategory;
