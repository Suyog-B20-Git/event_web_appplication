import React from "react";
import { IoIosTimer } from "react-icons/io";

function RecentView() {
  const card1 = [
    { img: "fI1.png", desc: "MUSIC CONCERT AT UK| ALL GABHD..." },
    { img: "fI2.png", desc: "LIVE DANCE EVENT|ALL BIG CELEBS.." },
    { img: "fI3.png", desc: "GIRLS PARTY AT MSG Tower..." },
    { img: "fI3.png", desc: "GIRLS PARTY AT MSG Tower..." },
    { img: "fI3.png", desc: "GIRLS PARTY AT MSG Tower..." },
    { img: "fI2.png", desc: "LIVE DANCE EVENT|ALL BIG CELEBS.." },
  ];
  return (
    <div
      className="flex flex-col p-2 lg:pt-5 mb-2 mt-4"
      style={{ fontFamily: "Nunito" }}
    >
      <div className="flex gap-4 items-center lg:pl-[120px]">
        <IoIosTimer className="text-3xl" />
        <div>
          <p className="lg:text-2xl text-lg font-bold">RECENTLY VIEWED</p>
          <p>Pick up where you left off</p>
        </div>
      </div>
      {/* <div className="flex gap-3 p-3 justify-center items-center"> */}
      <div className="flex gap-2 lg:ml-32 overflow-x-auto p-2 scrollbar-hide max-w-7xl">
        {card1.map((item, index) => {
          return (
            <div
              key={index}
              className="flex-none shadow-lg p-2 rounded-lg lg:w-[200px] w-56"
            >
              <img
                src={item.img}
                className="h-24 lg:h-28 md:h-32 w-full lg:pb-0   rounded-2xl"
                alt=""
              />
              <p className="font-semibold text-gray-700 lg:text-sm text-xs  pt-3  lg:break-words">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentView;
