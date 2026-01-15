import React from "react";
import { CiFacebook } from "react-icons/ci";
import { FaEye, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { BsFire } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { normalizeImageUrl } from "../../utility/urlUtils";

function VenueData({ data }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-full">
      <div className="lg:p-0 lg:pb-5 lg:pt-0 pt-0 p-5 w-full mx-auto">
        <div className="flex gap-9 overflow-x-auto overflow-y-hidden lg:p-4 pt-2 w-full">
          {data.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer transition-transform duration-300 hover:scale-105 flex-none border p-2 rounded-lg lg:w-[280px] w-64 shadow-md"
              onClick={() => {
                navigate(`/Venue/${item._id}`, { state: item._id });
              }}
            >
              <div className="h-40 lg:h-52 w-full rounded-lg overflow-hidden relative">
                <img
                  src={
                    item.profileImage
                      ? normalizeImageUrl(item.profileImage) || "/assets/staticAssets/fallback-image.jpg"
                      : "/assets/staticAssets/fallback-image.jpg"
                  }
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-125"
                />
                {item.type && (
                  <h3 className="absolute top-2 right-2 text-white bg-red-500 px-2 py-1 rounded-full text-sm">
                    {item.type}
                  </h3>
                )}
              </div>

              <div className="p-2 flex flex-col gap-2">
                <h1 className="font-medium text-lg capitalize flex items-center gap-2">
                  {item.name}
                </h1>

                <p className="text-sm text-gray-500">
                  {item.city}, {item.state}, {item.country}
                </p>
              </div>
              {item.categories && item.categories.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-2 p-1">
                  {item.categories.map((category, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-pink-300 text-black text-center text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VenueData;
