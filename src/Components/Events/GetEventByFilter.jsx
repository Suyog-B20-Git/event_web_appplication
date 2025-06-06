import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Loading from "../Loading";
import EventCardData from "../EventCardData";
import { CalendarCheck } from "lucide-react";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { BsCalendar2DateFill } from "react-icons/bs";
import {
  FaFacebookMessenger,
  FaHeart,
  FaInstagram,
  FaSquareFacebook,
  FaSquareXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { getEventByFilter1 } from "../../redux/actions/master/Events/getEventByFilter1";
import CommonCalendar from "../CommonCalendar";

function GetEventByFilter() {
  const location = useLocation();
  const value = location.state;
  console.log("Location State:", value);

  const filterValue = value || "";
  console.log("Filter Value:", filterValue);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [heading, setHeading] = useState("");
  // Fetch data when `filterValue` is available
  useEffect(() => {
    if (filterValue) {
      dispatch(getEventByFilter1(setLoading, filterValue));
      setHeading(filterValue);
    }
  }, [dispatch, filterValue]);

  // Fetch data when `category` is selected
  useEffect(() => {
    if (category) {
      dispatch(getEventByFilter1(setLoading, category));
      setHeading(category);
    }
  }, [dispatch, category]);

  const store = useSelector((state) => state.getEventByFilter1Reducer) || {
    eventData: [],
  };
  const data = store.eventData;
  console.log("DATAAA", data);
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
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
            <section className="flex lg:flex-col flex-row  overflow-x-scroll gap-2 pt-3 ">
              <div className="flex gap-2 ">
                <div
                  onClick={() => {
                    setCategory("festival");
                  }}
                  className="cursor-pointer bg-gray-200 hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Festival
                </div>
                <div
                  onClick={() => {
                    setCategory("live music");
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Live Music
                </div>
                <div
                  onClick={() => {
                    setCategory("business");
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Business
                </div>
                <div
                  onClick={() => {
                    setCategory("professional");
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Professional
                </div>
              </div>
              <div className="flex gap-2">
                <div
                  onClick={() => {
                    setCategory("nightlife & club");
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Nightlife & Club
                </div>
                <div
                  onClick={() => {
                    setCategory("sport & leisure");
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Sport & Leisure
                </div>
                <div className="flex gap-2 ">
                  <div
                    onClick={() => {
                      setCategory("social");
                    }}
                    className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs "
                  >
                    Social
                  </div>
                </div>
              </div>
              <div
                onClick={() => {
                  setCategory("theatre & arts");
                }}
                className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs "
              >
                Theatre & Arts
              </div>
            </section>
          </div>
          <div className="rounded border ">
            <h1 className="text-lg font-medium text-gray-900 p-4 border-b flex justify-start ">
              Share
              <div className="flex ml-4 gap-4 mt-1 text-2xl ">
                <FaSquareFacebook
                  onClick={() => handleShare("facebook")}
                  className=" text-blue-600  relative "
                />
                <FaWhatsapp
                  onClick={() => handleShare("whatsapp")}
                  className=" text-green-600  relative "
                />
                <FaFacebookMessenger
                  onClick={() => handleShare("messenger")}
                  className=" text-blue-800  relative "
                />
                <FaSquareXTwitter
                  onClick={() => handleShare("twitter")}
                  className=" text-white-600 relative"
                />
              </div>
            </h1>
            <hr />
            <h2 className="text-lg font-medium text-gray-900 p-2 border-b flex justify-start ml-2">
              Find Events
            </h2>
             <CommonCalendar /> 
          </div>
        </div>

        <div>
          {data.length > 0 ? (
            <EventCardData data={data} heading={heading} />
          ) : (
            <div className="flex lg:h-[500px] md:h-[400px] h-[250px] font-medium text-3xl justify-center items-center">
              No data found...
            </div>
          )}
        </div>
      </div>
      <div className="w-[25%] lg:flex hidden flex-col gap-8 rounded pt-5 pr-3 mt-2 ">
        <div className="lg:flex hidden flex-col gap-5 border justify-center bg-white shadow-md  w-[95%] ml-3 ">
          <div className=" p-3 shadow gap-2 ">
            <h1 className="text-lg font-medium text-gray-900 p-2 border-b ">
              Share
            </h1>
            <div className="flex flex-cols gap-4 text-2xl p-2 cursor-pointer mt-2">
              <FaSquareFacebook
                onClick={() => handleShare("facebook")}
                className="text-blue-500 border-0 border-transparent rounded hover:shadow-[0_0_10px_3px_#1877f2] transition duration-300"
              />

              <FaWhatsapp
                onClick={() => handleShare("whatsapp")}
                className="text-green-600 border-0 border-transparent rounded hover:shadow-[0_0_10px_3px_#25D366] transition duration-300"
              />

              <FaFacebookMessenger
                onClick={() => handleShare("messenger")}
                className="text-blue-700 border-0 border-transparent rounded hover:shadow-[0_0_10px_3px_#0084ff] transition duration-300"
              />

              <FaSquareXTwitter
                onClick={() => handleShare("twitter")}
                className="text-black-500 border-0 border-transparent rounded hover:shadow-[0_0_10px_3px_#000000] transition duration-300"
              />
            </div>
          </div>
        </div>

        <div className="lg:flex hidden flex-col gap-5 border justify-center bg-white shadow-md  w-[95%] ml-3 ">
          <div className=" p-3  shadow gap-2 ">
            <h1 className="text-lg font-medium text-gray-900 p-1 border-b ">
              Events Category
            </h1>

            <section className="flex flex-wrap gap-3 p-3 justify-start items-start">
              <div className="flex gap-4 flex-wrap justify-center">
                <div
                  onClick={() => {
                    setCategory("business");
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs"
                >
                  Business
                </div>
                <div
                  onClick={() => {
                    setCategory("festival");
                  }}
                  className="cursor-pointer bg-gray-200 hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs"
                >
                  Festival
                </div>
                <div
                  onClick={() => {
                    setCategory("live music");
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs"
                >
                  Live Music
                </div>
              </div>
              <div
                onClick={() => {
                  setCategory("nightlife & club");
                }}
                className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs"
              >
                Nightlife & Club
              </div>
              <div
                onClick={() => {
                  setCategory("professional");
                }}
                className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs"
              >
                Professional
              </div>
              <div
                onClick={() => {
                  setCategory("social");
                }}
                className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs"
              >
                Social
              </div>
              <div
                onClick={() => {
                  setCategory("sport & leisure");
                }}
                className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs"
              >
                Sport & Leisure
              </div>

              <div
                onClick={() => {
                  setCategory("theatre & arts");
                }}
                className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs"
              >
                Theatre & Arts
              </div>
            </section>
          </div>
        </div>
        <div className="border shadow w-[95%] ml-3 mb-5">
          <h1 className="text-lg font-medium border-b text-gray-900 p-2 w-[95%] ml-2">
            Find Events
          </h1>
          <CommonCalendar />
        </div>
      </div>
    </div>
  );
}

export default GetEventByFilter;
