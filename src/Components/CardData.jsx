/* eslint-disable react/prop-types */
import React from "react";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

function CardData({ data }) {
  const navigate = useNavigate();

  return (
    <div className="grid  lg:grid-cols-3 md:grid-cols-3 lg:gap-14 gap-10 lg:p-10 p-2 lg:pt-10 pt-5 grid-cols-1">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className=" flex flex-col pb-5 shadow-md rounded border  "
            onClick={() => {
              navigate("/Organizer", { state: item._id });
            }}
          >
            {/* <div className="h-40 md:h-36 lg:w-[303px] w-full overflow-hidden"> */}
            <div className="h-40 md:h-36 lg:h-40 w-full overflow-hidden">

              <img
                src={item.profileImage}
                className="rounded-t h-40 w-full transition-transform duration-300 hover:scale-125"
                alt={item.name}
              />
            </div>
            <div className="p-2">
              <h1 className="font-medium text-lg capitalize">{item.name}</h1>
              <section className="text-sm text-gray-500 ">
                {item.address}, {item.city}, {item.state}
              </section>
            </div>
            <div className="flex justify-between">
              <p className="flex gap-2 p-1 px-3 text-lg">
                {/* <button>
                    {" "}
                    <FcLike />
                  </button> */}

                <button className="text-red-500">
                  <a href={item.facebookUrl ? item.facebookUrl : ""}>
                    {item.facebookUrl ? (
                      <CiFacebook className="text-red-500" />
                    ) : (
                      ""
                    )}
                  </a>
                </button>
                <button className="text-red-500">
                  <a href={item.instagramUrl ? item.instagramUrl : ""}>
                    {item.instagramUrl ? (
                      <FaInstagram className="text-red-500" />
                    ) : (
                      ""
                    )}
                  </a>
                </button>
                <FcLike />

                <button className="text-red-500">
                  <a href={item.twitterUrl ? item.twitterUrl : ""}>
                    {item.twitterUrl ? (
                      <FaSquareXTwitter className="text-red-500" />
                    ) : (
                      ""
                    )}
                  </a>
                </button>
              </p>
              {/* <p className="flex gap-2 pr-5">
                      5 <IoStarSharp className="relative top-1 text-yellow-400" />
                    </p> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CardData;
