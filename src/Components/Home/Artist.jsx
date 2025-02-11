import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowAltCircleRight } from "react-icons/fa";
import {
  FaArrowRightLong,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";

function Artist() {
  const card1 = [
    {
      img: "Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    { img: "Speaker2.png", name: "Jordyn Bryn", desc: "CEO & Founder" },
    {
      img: "Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    {
      img: "Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    { img: "Speaker2.png", name: "Jordyn Bryn", desc: "CEO & Founder" },
    {
      img: "Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    {
      img: "Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    { img: "Speaker2.png", name: "Jordyn Bryn", desc: "CEO & Founder" },
    {
      img: "Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    {
      img: "Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    { img: "Speaker2.png", name: "Jordyn Bryn", desc: "CEO & Founder" },
    {
      img: "Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
  ];
  return (
    <div className=" w-full flex justify-center items-center pt-5 ">
      <div className="lg:p-10 md:p-4 md:pb-5  p-5 ">
        <div className="flex justify-around md:justify-between lg:justify-between lg:relative lg:left-14 lg:pb-0 pb-2">
          <h1 className="text-base md:text-lg  font-medium  pb-1 relative lg:left-0 left-10 md:left-7 md:right-8 ">
            Artist
          </h1>
          <div className="flex gap-2 relative right-12 lg:right-32">
            Swipe
            <FaArrowAltCircleRight size={20} />
          </div>
        </div>

        {/* <div className="md:flex gap-10   grid grid-cols-2 grid-rows-2   md:flex-row md:gap-20 "> */}
        {/* <div className="   grid grid-cols-3   grid-rows-2 lg:grid-cols-6 md:grid-cols-4 lg:grid-rows-1 lg:gap-12 md:gap-12 gap-7 "> */}
        <div className="flex relative lg:right-14 lg:gap-16 md:gap-10 lg:ml-[100px] md:ml-0 overflow-x-auto p-2 scrollbar-hide lg:max-w-[1200px] md:max-w-[700px] max-w-3xl whitespace-nowrap">
          {card1.map((item, index) => {
            return (
              <div key={index} className="  p-1 rounded-lg">
                <img
                  src={item.img}
                  className="h-20 w-20 lg:h-24 md:h-28 md:w-28 lg:w-24 rounded-full"
                />
                <div className="flex flex-col gap-2 items-center">
                  <p className=" text-gray-800  text-sm p-1 font-medium">
                    {item.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Artist;
