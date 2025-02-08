/* eslint-disable react/prop-types */
import React from "react";
import { MdEvent } from "react-icons/md";
import Button from "../ReusableComponents/Button";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io5";
import { CiTwitter } from "react-icons/ci";

function EventHeading({ heading, startDate, endDate, by }) {
  return (
    <div className=" m-1 rounded-xl p-2 border-2 pb-0 pl-0 pr-0" style={{boxShadow:"2px 2px 10px white"}}>
      <h1 className="p-2 lg:text-3xl text-xl font-semibold font-serif">{heading}</h1>

      <p className="font-semibold flex gap-3 lg:text-base text-sm  p-2 pb-1">
        <MdEvent className="text-[#ff2459] text-xl relative top-1" />
        {startDate} - {endDate}
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
      <div className="flex rounded-b-lg font-semibold lg:text-lg p-2 gap-2 bg-[#ffa7bc]">
        Share Event
        <p className="flex relative text-2xl top-1.5 gap-2 text-white">
          <FaFacebook className=" bg-[#ff2459] rounded-full p-0.5" />
          <IoLogoInstagram className=" bg-[#ff2459]  rounded-full p-0.5" />
          <CiTwitter className=" bg-[#ff2459]  rounded-full p-0.5" />
          <IoLogoWhatsapp className=" bg-[#ff2459]  rounded-full p-0.5" />
        </p>
      </div>
    </div>
  );
}

export default EventHeading;
