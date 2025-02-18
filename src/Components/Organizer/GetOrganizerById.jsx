import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { getOrganizerById } from "../../redux/actions/master/Organizer/getOrganizerById";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineNavigateNext,
} from "react-icons/md";
import {
  FaEye,
  FaInstagram,
  FaLocationDot,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { IoFlagSharp } from "react-icons/io5";
import { CiCircleCheck, CiCircleInfo, CiHeart } from "react-icons/ci";
import { BsCalendar2DateFill } from "react-icons/bs";

import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { CalendarCheck } from "lucide-react";
import MapContainer from "./Map";
import { FcLike } from "react-icons/fc";
import FacebookComments from "./FacebookComments";
import EnquiryForm from "./EnquiryForm";
import OwnerShipForm from "./OwnerShipForm";

function GetOrganizerById() {
  const [enquiry, setEnquiry] = useState(false);
  const [ownership, setOwnership] = useState(false);
  const [about, setAbout] = useState(true);
  const [upcomimg, setUpcoming] = useState(false);
  const [facebook, setFacebook] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const organizerId = location.state;
  console.log(organizerId);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state.getOrganizerByIdReducer) || {
    organizerData: [],
  };

  const data = store.organizerData;
  console.log(data, "OrganizerData....");

  useEffect(() => {
    dispatch(getOrganizerById(organizerId, setLoading));
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  }

  // useEffect(() => {
  //   if (!window.FB) {
  //     const script = document.createElement("script");
  //     script.src =
  //       "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0";
  //     script.async = true;
  //     script.defer = true;
  //     document.body.appendChild(script);
  //   }
  // }, []);

  return (
    <div>
      <div className="flex lg:flex-row flex-col gap-10">
        <div className="lg:pt-3 pt-24 bg-gray-100 lg:w-[75%] lg:px-4 ">
          <div className="flex justify-between font-medium">
            <p className="hidden gap-2 p-3 lg:flex ">
              <p
                className="cursor-pointer hover:text-[#ff2459]"
                onClick={() => navigate("/home")}
              >
                Home
              </p>
              <MdKeyboardDoubleArrowRight className="text-lg top-1 relative" />
              <p className="hover:text-[#ff2459]">{data.city}</p>
              <MdKeyboardDoubleArrowRight className="text-lg top-1 relative" />
              <p
                className="cursor-pointer hover:text-[#ff2459]"
                onClick={() => {
                  navigate("/getOrganizer");
                }}
              >
                Organizer
              </p>
              <MdKeyboardDoubleArrowRight className="text-lg top-1 relative" />
              <p
                className="cursor-pointer text-[#ff2459] hover:text-[#ff2459]"
                onClick={() => navigate("/getOrganizerById", { state: data })}
              >
                {data.name}
              </p>
            </p>
            <p className="text-blue-400  lg:text-base text-xs lg:flex hidden gap-1 pt-3 p-3 pb-0 ">
              <FaEye className="relative top-1" />
              {data.visit} 4133 Visit, 9 visites today
            </p>
          </div>
          <div
            className=" text-white flex flex-col justify-around gap-4 pt-10 lg:px-8   lg:p-2"
            style={{
              backgroundImage:
                "radial-gradient( circle farthest-corner at 5.6% 54.5%,  rgba(47,71,79,1) 0%, rgba(159,188,198,1) 83.6% )",
            }}
          >
            <div className="flex flex-col gap-4 lg:px-0 px-2">
              <h1
                className="text-white  font-medium lg:text-4xl"
                style={{ textShadow: "1px 1px 1px black" }}
              >
                {data.name}
              </h1>
              <p className="text-sm lg:block hidden">
                Visited 4133 times,9 visites today
              </p>
            </div>
            <div className="flex gap-2 lg:px-0 px-2">
              <p>
                <FaLocationDot
                  className="text-red-500 relative top-1 "
                  style={{ textShadow: "1px 1px 1px black" }}
                />
              </p>
              <p>
                {data.city},{data.state},{data.country}
              </p>
            </div>
            <div className=" flex w-full justify-end p-1 cursor-pointer ">
              <div className="bg-white text-gray-900 w-max p-2 lg:text-base text-xs px-3 flex lg:gap-4 gap-1 rounded-full">
                <p
                  className="flex gap-1 hover:text-[#ff2459] "
                  onClick={() => setOwnership(!ownership)}
                >
                  <IoFlagSharp className="relative top-1 lg:text-base text-xs" />{" "}
                  Claim Ownership
                </p>
                <p
                  className="flex gap-1 bg-white text-gray-900"
                  onClick={() => setEnquiry(!enquiry)}
                >
                  <CiCircleInfo className="relative top-1 lg:text-base text-xs" />
                  Send Inquiry
                </p>
                <p className="flex gap-1 bg-white text-gray-900">
                  <CiHeart className="relative top-1 lg:text-base text-xs" />{" "}
                  Favourite
                </p>
              </div>
            </div>
          </div>
          <div className=" flex lg:flex-row flex-col p-3">
            <div className="flex justify-center items-center flex-col gap-3 lg:p-10">
              <img
                src={data.profileImage}
                className="h-56 lg:w-56  border-2 "
                alt=""
              />
              <div className="px-2 flex gap-1 bg-gray-200 rounded-full p-1 ">
                <CiCircleCheck className="relative top-1 text-lg" />
                Following
              </div>
            </div>
            <div>
              <div className="text-gray-500  flex  gap-5 font-medium px-10  ">
                <button
                  className={`${about ? "border-b-2 border-b-red-600" : ""}`}
                  onClick={() => {
                    setAbout(true);
                    setUpcoming(false);
                    setFacebook(false);
                  }}
                >
                  ABOUT
                </button>
                <button
                  className={`${
                    upcomimg ? "border-b-2 border-b-red-600" : ""
                  } p-2`}
                  onClick={() => {
                    setAbout(false);
                    setUpcoming(true);
                    setFacebook(false);
                  }}
                >
                  UPCOMING EVENT
                </button>
                <button
                  className={`${
                    facebook ? "border-b-2 border-b-red-600" : ""
                  } p-2`}
                  onClick={() => {
                    setAbout(false);
                    setUpcoming(false);
                    setFacebook(true);
                  }}
                >
                  FACEBOOK
                </button>
              </div>
              <div className="px-10 ">
                <p className="pt-5">{about ? data.description : ""}</p>
                <p className="font-medium text-lg text-center">
                  {upcomimg? "" : " "}
                </p>
                <p>
                  {facebook ? (
                    <div>
                      <iframe
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FZeenews&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=849920522233544"
                        width="340"
                        height="500"
                        style={{ border: "none", overflow: "hidden" }}
                        scrolling="no"
                        frameBorder="0"
                        allowfullscreen="true"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      ></iframe>
                    </div>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
          </div>
          <MapContainer data={data} />

          <div className="flex justify-between">
            <div className="flex  pt-0 gap-5 p-10 ">
              <button className="text-red-500">
                <a
                  className="flex"
                  href={data.instagramUrl ? data.instagramUrl : ""}
                >
                  {data.instagramUrl ? (
                    <FaInstagram className=" text-red-500" />
                  ) : (
                    ""
                  )}
                </a>
              </button>
              <button className="text-red-500">
                <a href={data.facebookmUrl ? data.facebookUrl : ""}>
                  {data.facebookUrl ? <FcLike className="text-red-500" /> : ""}
                </a>
              </button>
              <button className="text-red-500">
                <a href={data.twitterUrl ? data.twitterUrl : ""}>
                  {data.twitterUrl ? (
                    <FaSquareXTwitter className="text-red-500" />
                  ) : (
                    ""
                  )}
                </a>
              </button>
            </div>
            <div className="text-sm">Visited 4133 Times , 9 Times in Day</div>
          </div>
          <FacebookComments
            dataHref="https://www.bezkoder.com/vue-3-authentication-jwt/"
            numPosts={10}
            width="1000"
          />
        </div>

        <div className="w-[25%] flex flex-col gap-5 rounded pt-5 pr-3 ">
          <div className="rounded p-2 shadow ">
            <h1 className="text-lg font-medium text-gray-900 p-3 border-b ">
              Organizers Category
            </h1>
            <section className="grid grid-cols-2 pt-3 p-2 ">
              {data.categories &&
                data.categories.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-gray-200  w-max rounded-full font-medium p-1 px-3 "
                    >
                      {item}
                    </div>
                  );
                })}
            </section>
          </div>
          <div className="rounded border">
            <h1 className="text-lg font-medium text-gray-900 p-3 border-b">
              Find Events
            </h1>
            <div className="flex justify-center items-center ">
              <div className="grid grid-cols-2 gap-4 p-3 ">
                <div className="bg-blue-600 rounded h-28 w-28 text-white font-medium flex flex-col gap-2 items-center justify-center">
                  <BsCalendar2DateFill className="text-4xl text-white font-medium" />

                  <p>Todays 0</p>
                </div>
                <div className="bg-orange-400 rounded h-28 w-28 flex flex-col gap-2 items-center justify-center text-white">
                  <BsCalendar2DateFill className="text-4xl text-white font-medium" />

                  <p>Tommorrow 0</p>
                </div>
                <div className="bg-red-600 rounded h-28 w-28 flex flex-col gap-2 items-center justify-center text-white">
                  <HiOutlineCalendarDateRange className="text-4xl text-white font-bold" />

                  <p className="text-sm p-1">These Weekend 0</p>
                </div>
                <div className="bg-green-600 h-28 rounded w-28 flex flex-col gap-2 items-center justify-center text-white">
                  <CalendarCheck className="text-4xl text-white font-bold" />
                  <p>Choose Date</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded border">
            <h1 className="text-lg font-medium text-gray-900 p-3 border-b">
              Popular events
            </h1>
            <div className="flex justify-center items-center p-3">
              <MdOutlineNavigateNext className="text-4xl rounded-full bg-gray-100 " />
            </div>
          </div>
        </div>
      </div>
      {ownership && (
        <OwnerShipForm
          setOwnership={setOwnership}
          name={data.name}
          ownership={ownership}
        />
      )}
      {enquiry && (
        <EnquiryForm
          setEnquiry={setEnquiry}
          name={data.name}
          enquiry={enquiry}
        />
      )}
    </div>
  );
}

export default GetOrganizerById;
