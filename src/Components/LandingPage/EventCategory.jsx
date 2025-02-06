import { FaArrowRightLong } from "react-icons/fa6";
import Card2 from "./cards2";
import { useState } from "react";
import { MdOutlineCategory } from "react-icons/md";

const EventCategory = () => {
  const [show, setshow] = useState(false);
  var data = [
    { Name: "public/Ev1.png", text: "" },
    { Name: "public/Ev2.png", text: "Food & Drinks" },
    { Name: "public/Ev3.png", text: "Music & Concerts" },
    { Name: "public/Ev4.png", text: "Travel & Trekking" },
  ];
  var data1 = [
    { Name: "public/Ev1.png", text: "" },
    { Name: "public/Ev2.png", text: "Food & Drinks" },
    { Name: "public/Ev3.png", text: "Music & Concerts" },
    { Name: "public/Ev4.png", text: "Travel & Trekking" },
    { Name: "public/Ev5.png", text: "Charity & Non-profits" },
    { Name: "public/Ev6.png", text: "Yoga & Health" },
    { Name: "public/Ev7.png", text: "Sports & Fitness" },
    { Name: "public/Ev8.png", text: "Education & Classes" },
    
  ];
  return (
    <>
      <div className=" p-4 ">
        <div className="flex justify-around items-center p-2 font-sans">
          <div className="w-[95%]  lg:text-2xl text-xl font-bold  font-sans lg:px-28  flex gap-2 ">
          <MdOutlineCategory className="relative top-1" /> Event Category
          </div>
          <div
            onClick={() => setshow(!show)}
            className="flex items-center w-[10%] mr-16"
          >
            <button className=" shadow-md p-2 cursor-pointer text-base sm:font-medium font-normal sm:text-base text-[#000000]">
              {show ? "ViewAll" : "ViewLess"}
            </button>{" "}
          </div>
        </div>

        {/* <div className="hidden"> */}
        {/* <div
          className={` grid grid-cols-1 sm:flex sm:justify-center sm:flex-wrap gap-5 sm:gap-16 p-8 ${
            show === true ? "block" : "hidden"
          }
          `}
        > */}
        <div
          className={` grid grid-cols-2 lg:flex lg:justify-center flex-wrap gap-5  lg:p-8 lg:px-16 pt-4 lg:pt-8
          `}
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
