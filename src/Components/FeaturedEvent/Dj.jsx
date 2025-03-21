import React from "react";
import { CiLocationOn } from "react-icons/ci";
import {
  FaArrowRightLong,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";

function Dj() {
  const card1 = [
    {
      img: "staticAssets/Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    { img: "staticAssets/Speaker2png", name: "Jordyn Bryn", desc: "CEO & Founder" },
   
  ];
  return (
    <div className="flex justify-center items-center ">
      <div className="p-10 ">
        <div>
          <h1 className="text-lg   font-medium  p-2 ">Dj</h1>
        </div>

        <div className="flex gap-12    md:gap-20 ">
          {card1.map((item, index) => {
            return (
              <div key={index} className="shadow-lg border p-2 rounded-lg">
                <img
                  src={item.img}
                  className="h-20 w-20 lg:h-48 md:h-32 md:w-32 lg:w-48  rounded-full"
                />
                <div className="flex flex-col gap-2 items-center">
                  <p className=" text-gray-800 lg:text-xl md:text-base text-sm">{item.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dj;
