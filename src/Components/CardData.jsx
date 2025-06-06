import React from "react";
import { CiFacebook } from "react-icons/ci";
import { FaEye, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { BsFire } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function CardData({ data, heading, navigation }) {
  const navigate = useNavigate();

  const dataArray = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <div className="flex justify-center items-center w-full">
      <div className="lg:p-12 lg:pb-5 lg:pt-10 pt-5 p-5 w-full max-w-[1340px] mx-auto">
        {/* Header & View All */}
        <div className="flex justify-between">
          <div className="flex gap-2 lg:pl-3">
            {/* <BsFire className="text-2xl relative top-1" /> */}
            <p className="font-bold font-sans lg:text-2xl">{heading}</p>
          </div>
          <button
            onClick={() => navigate(navigation)}
            className="shadow-md lg:text-base text-sm p-2 font-medium bg-[#ff2459] text-white rounded"
          >
            View All
          </button>
        </div>

        {/* Horizontal scrollable card container */}
        <div className="flex gap-9 overflow-x-auto lg:p-4 pt-2 w-full">
          {data.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer transition-transform duration-300 hover:scale-105 flex-none border p-2 rounded-lg lg:w-[372px] w-64 shadow-md"
              onClick={() => {
                navigate(`/Organizer/${item._id}`, { state: item._id });
              }}
            >
              {/* Image */}
              <div className="h-40 lg:h-52 w-full rounded-lg overflow-hidden relative">
                <img
                  src={
                    item.profileImage || "public/assets/staticAssets/music.jpeg"
                  }
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-125"
                />
              </div>

              {/* Text content */}
              <div className="p-2 flex flex-col gap-2">
                <h1 className="font-medium text-lg capitalize flex items-center gap-2">
                  {item.name}
                  {(item.categories.includes("indoor") || item.categories.includes("outdoor")) && (
                    <span className="flex items-center text-gray-500 text-sm">
                      <FaEye className="text-blue-600 mr-1" />
                      {item.visits}
                    </span>
                  )}
                </h1>

                <p className="text-sm text-gray-500">
                  {item.address}, {item.city}, {item.state}
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-3 pt-2 text-lg text-red-500">
                  {item.facebookUrl && (
                    <a
                      href={item.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CiFacebook />
                    </a>
                  )}
                  {item.instagramUrl && (
                    <a
                      href={item.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram />
                    </a>
                  )}
                  <FcLike />
                  {item.twitterUrl && (
                    <a
                      href={item.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaSquareXTwitter />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardData;
