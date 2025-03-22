import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";

function Speakers() {
  const card1 = [
    {
      img: "staticAssets/Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    { img: "staticAssets/Speaker2.png", name: "Jordyn Bryn", desc: "CEO & Founder" },
    {
      img: "staticAssets/Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    {
      img: "staticAssets/Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    { img: "staticAssets/Speaker2.png", name: "Jordyn Bryn", desc: "CEO & Founder" },
  ];

  return (
    <div className="lg:w-full flex justify-center items-center">
      <div className="lg:p-10 p-5 w-full">
        <div>
          <h1 className="text-base lg:text-2xl font-medium pb-1">Speakers</h1>
        </div>
        {/* Card Container */}
        <div className="flex gap-5 overflow-x-scroll lg:overflow-visible lg:flex-wrap scrollbar-hide">
          {card1.map((item, index) => {
            return (
              <div
                key={index}
                className="shadow-xl border flex flex-col justify-center items-center p-5 rounded-lg min-w-[120px] lg:min-w-[250px]"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-20 lg:h-36 lg:w-36 w-20 rounded-full"
                />
                <div className="flex flex-col gap-1 items-center">
                  <p className="text-gray-800 lg:text-xl text-sm">
                    {item.name}
                  </p>
                  <p className="text-xs font-thin">{item.desc}</p>
                  <div className="flex text-xs lg:text-base gap-2 justify-center">
                    <FaFacebook />
                    <FaInstagram />
                    <FaTwitter />
                    <TbWorld />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Speakers;
