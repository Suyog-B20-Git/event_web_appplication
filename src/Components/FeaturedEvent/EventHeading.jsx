/* eslint-disable react/prop-types */
import React from "react";
import { MdEvent } from "react-icons/md";
import Button from "../Button";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io5";
import { CiTwitter } from "react-icons/ci";

// Function to convert UTC to Local Time
const convertUTCToLocal = (utcString) => {
  if (!utcString) return "Invalid Date"; // Handle empty or invalid values
  const date = new Date(utcString);
  return date.toLocaleString(); // Convert to local time
};

function EventHeading({ heading, startDate, endDate, by }) {
  const currentUrl = window.location.href;
  const shareUrls = {
    whatsapp: `https://api.whatsapp.com/send?text=${currentUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}`,
    messenger: `https://www.messenger.com/t/?link=${currentUrl}`,
    instagram: `https://www.instagram.com/`, // No direct sharing, just opens Instagram
  };
  const handleShare = (platform) => {
    window.open(shareUrls[platform], "_blank");
  };
  return (
    <div
      className=" m-1 rounded-xl p-2 border-2 pb-0 pl-0 pr-0"
      style={{ boxShadow: "2px 2px 10px white" }}
    >
      <h1 className="p-2 lg:text-3xl text-xl font-semibold font-serif">
        {heading}
      </h1>

      <p className="font-semibold flex gap-3 lg:text-base text-sm  p-2 pb-1">
        <MdEvent className="text-[#ff2459] text-xl relative top-1" />
        {/* {startDate} - {endDate} */}
        {convertUTCToLocal(startDate)} - {convertUTCToLocal(endDate)}
      </p>
      <p className="p-2 lg:text-lg whitespace-nowrap flex md:gap-10 lg:gap-10 gap-3">
        By {by}{" "}
        <Button
          text={"live music"}
          variant={"primary"}
          textSize={"text-xs"}
          rounded={"rounded-2xl"}
        />
      </p>
      <div className="flex rounded-b-lg font-semibold lg:text-lg p-3 gap-4 bg-[#ffa7bc]">
        Share Event
        <p className="flex relative text-2xl gap-2 text-white">
          <button
            onClick={() => handleShare("facebook")}
            className="flex gap-1 shadow  p-1 rounded"
          >
            <FaFacebook className=" bg-[#ff2459] rounded-full p-0.5" />
          </button>
          <button
            onClick={() => handleShare("instagram")}
            className="flex gap-1 shadow  p-1 rounded"
          >
            <IoLogoInstagram className=" bg-[#ff2459]  rounded-full p-0.5" />
          </button>

          
          <button
            onClick={() => handleShare("twitter")}
            className="flex gap-1 shadow  p-1 rounded"
          >
            <CiTwitter className=" bg-[#ff2459]  rounded-full p-0.5" />
          </button>
          <button
            onClick={() => handleShare("whatsapp")}
            className="flex gap-1 shadow  p-1 rounded"
          >
            <IoLogoWhatsapp className=" bg-[#ff2459]  rounded-full p-0.5" />
          </button>
        </p>
      </div>
    </div>
  );
}

export default EventHeading;
