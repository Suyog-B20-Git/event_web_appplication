import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getEventByFilter } from "../../redux/actions/master/Events/getEventByFilter";
import Loading from "../Loading";
import EventCardData from "../EventCardData";
import { CalendarCheck } from "lucide-react";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookMessenger, FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FcLike } from "react-icons/fc";

function GetEventByFilter() {
  const location = useLocation();
  const value = location.state;

  const filterValue = value.toLowerCase();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventByFilter(setLoading, filterValue));
  }, [dispatch,filterValue]);

  const store = useSelector((state) => state.getEventByFilterReducer) || {
    filterEventData: [],
  };
  const data = store.filterEventData;
  console.log(data, "FilterEvent Data");
  const currentUrl = window.location.href;
  const shareUrls = {
    whatsapp: `https://api.whatsapp.com/send?text=${currentUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}`,
    messenger: `https://www.messenger.com/t/?link=${currentUrl}`,
  };
  const handleShare = (platform) => {
    window.open(shareUrls[platform], "_blank");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    // <div>
    //   {data.length > 0 ? (
    //     <EventCardData data={data} heading={value} />
    //   ) : (
    //     <div className="flex lg:h-[500px] md:h-[400px] h-[250px] font-medium text-3xl justify-center items-center">
    //       No data found...
    //     </div>
    //   )}
    // </div>
    <div className="flex lg:flex-row flex-col gap-2 lg:pt-0 md:pt-0 pt-20">
      <div className="p-2 lg:w-[75%] w-full">
        <div className="flex justify-between pt-5 border-b pb-2">
          <h1 className="font-bold text-3xl text-[#ff2459] lg:px-10 px-3 md:px-3 ">
       
            {/* {filterValue ? filterValue : category ? category : "  Events"} */}
            Events
            
          </h1>
        </div>
        <div className=" lg:hidden flex  flex-col gap-5 rounded pt-0  ">
          <div className="rounded p-2 shadow md:flex md:gap-7 justify-between ">
            <h1 className="text-lg font-medium text-gray-900 p-2 border-b ">
              Events Category
            </h1>
            {/* <section className="flex lg:flex-col flex-row  overflow-x-scroll gap-2 pt-3 ">
            <div className="flex gap-2 ">
              <div
                onClick={() => {
                  setCategory("event planner");
                }}
                className="cursor-pointer bg-gray-200 hover:bg-[#ff2459] hover:text-white    w-max rounded-full font-medium p-1 px-4 text-xs "
              >
                Event Planner
              </div>
              <div
                onClick={() => {
                  setCategory("wedding planner");
                }}
                className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white    w-max rounded-full font-medium p-1 px-4 text-xs "
              >
                Wedding Planner
              </div>
            </div>
            <div className="flex gap-2 px-2">
              <div
                onClick={() => {
                  setCategory("adventure");
                }}
                className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
              >
                Adventure
              </div>
            </div>
          </section> */}
          </div>
          <div className="rounded border ">
            <h1 className="text-lg font-medium text-gray-900 p-3 border-b flex  justify-between">
              Find Events
              <div className="flex  gap-2 text-xl">
                <button
                  onClick={() => handleShare("facebook")}
                  className="flex gap-1 shadow border p-1 rounded"
                >
                  <FaSquareFacebook className="text-blue-700 relative " />
                </button>
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="flex gap-1 shadow border p-1 rounded"
                >
                  <IoLogoWhatsapp className="text-green-600" />
                </button>
                <button
                  onClick={() => handleShare("messenger")}
                  className="flex gap-1 shadow border p-1 rounded"
                >
                  <FaFacebookMessenger className="text-red-500" />
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="flex gap-1 shadow border p-1 rounded"
                >
                  <FaSquareXTwitter className="" />
                </button>
              </div>
            </h1>
            <div className="flex justify-center items-center ">
              <div className="flex  gap-5 p-3  overflow-x-scroll ">
                <div className="bg-blue-600 rounded  h-28 min-w-28   text-white font-medium flex flex-col gap-2 items-start p-4 ">
                  <BsCalendar2DateFill className=" text-white  text-2xl font-medium" />

                  <p>Todays 0</p>
                </div>
                <div className="bg-orange-400 rounded  h-28 min-w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <BsCalendar2DateFill className=" text-white text-2xl font-medium" />

                  <p>Tommorrow 0</p>
                </div>
                <div className="bg-blue-400 rounded  h-28 min-w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <HiOutlineCalendarDateRange className="text-2xl text-white font-medium" />

                  <p className="text-sm p-1">These Weekend 0</p>
                </div>
                <div className="bg-green-600  rounded  h-28 min-w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <CalendarCheck className="text-2xl text-white font-medium" />
                  <p>Choose Date</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {data.length > 0 ? (
            <EventCardData data={data} heading={value} />
          ) : (
            <div className="flex lg:h-[500px] md:h-[400px] h-[250px] font-medium text-3xl justify-center items-center">
              No data found...
            </div>
          )}
        </div>
      </div>
      <div className="lg:w-[25%] lg:block hidden m-2 w-full">
        <div className="flex flex-col gap-2 px-2 shadow-md p-2">
          <div className="grid grid-cols-3 gap-2 text-xl">
            <button
              onClick={() => handleShare("facebook")}
              className="flex gap-1 shadow border p-1 rounded"
            >
              <span className="text-sm border-r px-2">SHARE </span>
              <FaSquareFacebook className="text-blue-700 relative " />
            </button>
            <button
              onClick={() => handleShare("whatsapp")}
              className="flex gap-1 shadow border p-1 rounded"
            >
              <span className="text-sm border-r px-2">SHARE </span>
              <IoLogoWhatsapp className="text-green-600" />
            </button>
            <button
              onClick={() => handleShare("messenger")}
              className="flex gap-1 shadow border p-1 rounded"
            >
              <span className="text-sm border-r px-2">SHARE </span>
              <FaFacebookMessenger className="text-red-500" />
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="flex gap-1 shadow border p-1 rounded"
            >
              <span className="text-sm border-r px-2">SHARE </span>
              <FaSquareXTwitter className="" />
            </button>
          </div>
        </div>
        <div className=" lg:flex hidden flex-col gap-5 rounded pt-5 pr-3 ">
          <div className="rounded p-2 shadow ">
            <h1 className="text-lg font-medium text-gray-900 p-3 border-b ">
              Event Category
            </h1>
            {/* <section className="flex flex-col gap-2 pt-3 ">
            <div className="flex gap-2 ">
              <div
                onClick={() => {
                  setCategory("event planner");
                }}
                className="cursor-pointer bg-gray-200 hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
              >
                Event Planner
              </div>
              <div
                onClick={() => {
                  setCategory("wedding planner");
                }}
                className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
              >
                Wedding Planner
              </div>
              <div
                onClick={() => {
                  setCategory("adventure");
                }}
                className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs "
              >
                Adventure
              </div>
            </div>
          </section> */}
          </div>
          <div className="rounded border">
            <h1 className="text-lg font-medium text-gray-900 p-3 border-b">
              Find Events
            </h1>
            <div className="flex justify-center items-center ">
              <div className="grid grid-cols-2 gap-4 p-3 ">
                <div className="bg-blue-600 rounded h-28 w-28 text-white font-medium flex flex-col gap-2 items-start p-4">
                  <BsCalendar2DateFill className=" text-white  text-2xl font-medium" />

                  <p>Todays 0</p>
                </div>
                <div className="bg-orange-400 rounded h-28 w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <BsCalendar2DateFill className=" text-white text-2xl font-medium" />

                  <p>Tommorrow 0</p>
                </div>
                <div className="bg-blue-400 rounded h-28 w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <HiOutlineCalendarDateRange className="text-2xl text-white font-medium" />

                  <p className="text-sm p-1">These Weekend 0</p>
                </div>
                <div className="bg-green-600 h-28 rounded w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <CalendarCheck className="text-2xl text-white font-medium" />
                  <p>Choose Date</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetEventByFilter;
