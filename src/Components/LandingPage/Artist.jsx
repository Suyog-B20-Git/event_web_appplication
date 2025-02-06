import React from "react";
import { CiLocationOn } from "react-icons/ci";
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
  ];
  return (
    <div className=" w-full flex justify-center items-center ">
      <div className="lg:p-12 md:p-12 p-5 ">
        <div>
          <h1 className="text-base  font-medium  pb-1 ">Artist</h1>
        </div>

        {/* <div className="flex gap-1   flex-col md:flex-row md:gap-20 "> */}
        {/* <div className="md:flex gap-10   grid grid-cols-2 grid-rows-2   md:flex-row md:gap-20 "> */}
        <div className="   grid grid-cols-3 grid-rows-2 lg:grid-cols-6 lg:grid-rows-1 lg:gap-12 gap-7 ">
          {card1.map((item, index) => {
            return (
              <div key={index} className="  p-1 rounded-lg">
                <img
                  src={item.img}
                  
                  className="h-20 w-20 lg:h-36 md:h-32 md:w-32 lg:w-36  rounded-full"
                 
                />
                <div className="flex flex-col gap-2 items-center">
                  <p className=" text-gray-800  text-sm p-1 font-medium">{item.name}</p>
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
