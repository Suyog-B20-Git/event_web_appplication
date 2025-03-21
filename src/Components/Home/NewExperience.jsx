import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";

function NewExperience() {
    const img=[
        "staticAssets/t1.png","staticAssets/t2.webp","staticAssets/t3.png","staticAssets/t4.png","staticAssets/t5.png","staticAssets/t6.png"
    ]
  return (
    // <div className="flex flex-col gap-3 px-4 lg:pt-2 lg:px-12 mt-6">
    <div className="flex flex-col gap-3 px-4 lg:pt-6 lg:px-[143px] mt-6">
      <div className="flex items-center gap-4">
        <FaMapLocationDot className="border-2 rounded-full relative top-1 text-3xl lg:text-4xl p-0.5 " />
        <p>
          <p className="font-semibold lg:text-xl">FIND NEW EXPERIENCE</p>
          <p className="text-gray-500 lg:text-base text-sm">Explore. Discover. Make a plan</p>
        </p>
      </div>
      <div className="grid gap-3 grid-rows-2  lg:grid-rows-1 grid-cols-3 lg:grid-cols-6">
        {img.map((item,index)=>{
            return(
                <img  key={index} src={item} alt="" className="rounded-xl" />
            )
        })}
      </div>

    </div>
  );
}

export default NewExperience;
