import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import { getOrganizerById } from "../../redux/actions/master/Organizer/getOrganizerById";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineNavigateNext,
} from "react-icons/md";
import {
  FaEye,
  FaFacebookMessenger,
  FaHeart,
  FaInstagram,
  FaLocationDot,
  FaSquareFacebook,
  FaSquareXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import { IoFlagSharp, IoLogoWhatsapp } from "react-icons/io5";
import {
  CiCircleCheck,
  CiCircleInfo,
  CiHeart,
  CiMenuKebab,
  CiFacebook,
  CiCirclePlus,
} from "react-icons/ci";
import { BsCalendar2DateFill } from "react-icons/bs";

import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { CalendarCheck } from "lucide-react";
import MapContainer from "./Map";
import { FcLike } from "react-icons/fc";
import FacebookComments from "./FacebookComments";
import EnquiryForm from "./EnquiryForm";
import OwnerShipForm from "./OwnerShipForm";
import FacebookEmbeded from "../SocialMedia/Facebook";
import InstagramEmbed from "../SocialMedia/Instagram";
import YouTubeProfile from "../SocialMedia/Youtube";
import TwitterEmbed from "../SocialMedia/TwiiterEmbed";
import PerformerStats from "../SocialMedia/State";
import OrganizerStats from "../SocialMedia/OrganizerStat";
import { toast, Zoom } from "react-toastify";
import { getFavouriteOrganizerData } from "../../redux/actions/master/Organizer/GetFavouriteOrganizer";
import { postFavouriteOrganizer } from "../../redux/actions/master/Organizer/postFavouriteOrganizer";
import { removeFavouriteOrganizer } from "../../redux/actions/master/Organizer/removeFavouriteOrganizer";
import {
  getUpcomingEventData,
  getUpcomingEventsDataForProfile,
} from "../../redux/actions/master/Events/UpcomingEvent";
import { FaPhoneAlt } from "react-icons/fa";
const baseUrl = import.meta.env.VITE_API_URL;
import axios from "axios";
import FollowButton from "../FollowButton";
import CommonCalendar from "../CommonCalendar";

function GetOrganizerById() {
  const { organizerId } = useParams();
  const [isPopUp, setIsPopUp] = useState(false);
  const [category, setCategory] = useState("");
  const [enquiry, setEnquiry] = useState(false);
  const [ownership, setOwnership] = useState(false);
  const [about, setAbout] = useState(true);
  const [upcoming, setUpcoming] = useState(false);
  const [facebook, setFacebook] = useState(false);
  const [twitter, setTwitter] = useState(false);
  const [instagram, setInstagram] = useState(false);
  const [stat, setStat] = useState(false);
  const [youtube, setYoutube] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [localIsFavorite, setLocalIsFavorite] = useState("isFavourite");
  const [enquirySent, setEnquirySent] = useState(false);
  const [ownershipEnquirySent, setOwnershipEnquirySent] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const HrefUrl = window.location.href;

  useEffect(() => {
    dispatch(
      getUpcomingEventsDataForProfile({
        organizer: organizerId,
        setLoader: setLoading,
        page: 1,
        limit: 10,
        timezoneOffset: new Date().getTimezoneOffset(),
        sortBy: "startDate",
        sortOrder: "asc",
      })
    );
  }, [dispatch, organizerId]);

  const upcomingEventData =
    useSelector((state) => state.upcomingEventReducer?.upcomingEventData) || [];

  if (!upcomingEventData) {
    return <div>Loading...</div>;
  }

  const data1 = upcomingEventData;
  const store = useSelector((state) => state.getOrganizerByIdReducer) || {
    organizerData: [],
  };

  const data = store.organizerData;
  const targetId = data?._id;
  const modelName = "Organizer";
  const organizerEmail = data?.email;
  const store1 = useSelector((state) => state.getFavoriteOrganizerReducer) || {
    favouriteOrganizerData: [],
  };
  const favouriteOrganizer = store1.favouriteOrganizerData;

  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  const isFavourite = favouriteOrganizer.some((fav) => fav._id === data._id);

  const togglePhoneVisibility = () => {
    setShowNumber((prev) => !prev);
  };
  const hasPhoneNumber = data?.phoneNumber && data.phoneNumber.trim() !== "";

  const name = data.name;

  useEffect(() => {
    setEnquirySent(false);
    const sent = localStorage.getItem(`enquiry_sent_${name}`);
    if (sent === "true") {
      setEnquirySent(true);
    }
  }, [name]);

  const handleEnquirySent = () => {
    setEnquirySent(true);
    setEnquiry(false);
  };

  useEffect(() => {
    setOwnershipEnquirySent(false);
    const sent = localStorage.getItem(`enquiry_sent_${targetId}`);
    if (sent === "true") {
      setOwnershipEnquirySent(true);
    }
  }, [targetId]);

  const handleOwnershipEnquirySent = () => {
    setOwnershipEnquirySent(true);
    setOwnership(true);
  };

  useEffect(() => {
    setLocalIsFavorite(isFavourite);
  }, [isFavourite]);

  const toggleFavorite = (id) => {
    if (localIsFavorite) {
      setLocalIsFavorite(false);
      dispatch(removeFavouriteOrganizer(id));
    } else {
      setLocalIsFavorite(true);
      dispatch(postFavouriteOrganizer(id));
    }
    dispatch(getFavouriteOrganizerData(setLoading));
  };

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
    dispatch(getOrganizerById(organizerId, setLoading));
    dispatch(getFavouriteOrganizerData(setLoading));
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex lg:flex-row flex-col gap-2">
        <div className="lg:pt-6 md:pt-0 pt-20 bg-gray-100 lg:w-[75%] lg:px-4 ">
          <div className="flex justify-between font-medium">
            <p className="flex flex-row  gap-2 p-3 lg:flex flex-wrap">
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
                  navigate("/Organizers");
                }}
              >
                Organizer
              </p>
              <MdKeyboardDoubleArrowRight className="text-lg top-1 relative" />
              <p
                className="cursor-pointer text-[#ff2459] hover:text-[#ff2459]"
                onClick={() =>
                  navigate(`/Organizer/${data._id}`, { state: data })
                }
              >
                {data.name}
              </p>
            </p>
            <div className="lg:flex hidden gap-2 pt-3 p-3 pb-0 cursor-default">
              <p className="flex gap-1 md:text-xs lg:text-xs text-[10px] font-bold text-gray-900 ">
                <FaEye className="relative top-0.5 text-blue-600" />
                <span>Total {data.visits}</span>
              </p>
              <p className="flex gap-1 md:text-xs lg:text-xs text-[10px] font-bold text-gray-900 ">
                <FaEye className="relative top-0.5 text-blue-600" />
                <span>Daily {data.dailyVisits} </span>
              </p>
            </div>
          </div>
          <div
            className=" text-white flex flex-col justify-around gap-4 lg:pt-10 pt-3 lg:px-8   lg:p-2"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG9yZ2FuaXplcnxlbnwwfHx8fDE2OTY5NzQ1NTg&ixlib=rb-4.0.3&q=80&w=1080')",
            }}
          >
            <div className="flex flex-col gap-4 lg:px-0 px-2 ">
              <div className="flex justify-between">
                <h1
                  className="text-white  font-medium lg:text-4xl text-2xl"
                  style={{ textShadow: "1px 1px 1px black" }}
                >
                  {data.name}
                </h1>
                <button className="lg:hidden block">
                  <CiMenuKebab
                    onClick={() => setIsPopUp(!isPopUp)}
                    className="text-black text-2xl"
                  />
                </button>
              </div>
              <p className="text-sm lg:block hidden">
                Total {data.visits} , {data.dailyVisits} visits today
              </p>
            </div>
            <div className="flex gap-2 lg:px-0 px-2 lg:p-0  p-2">
              <p>
                <FaLocationDot
                  className="text-red-500 relative top-1 "
                  style={{ textShadow: "1px 1px 1px black" }}
                />
              </p>
              <p>
                {["city", "state", "country"].every(
                  (key) =>
                    data[key] &&
                    data[key].trim().toLowerCase() !== "not specified" &&
                    data[key].trim() !== ""
                )
                  ? `${data.city}, ${data.state}, ${data.country}`
                  : data.address?.trim()
                  ? data.address
                  : "not specified"}
              </p>
            </div>
            <div
              className="flex gap-2 lg:px-0 px-2 lg:p-0 p-2 py-0 cursor-pointer"
              onClick={hasPhoneNumber ? togglePhoneVisibility : undefined}
            >
              <p>
                <FaPhoneAlt
                  className="text-red-500 relative top-1"
                  style={{ textShadow: "1px 1px 1px black" }}
                />
              </p>
              <p>
                {!hasPhoneNumber
                  ? "Not available"
                  : showNumber
                  ? data.phoneNumber
                  : "View Contact"}
              </p>
            </div>
            <div className=" lg:flex hidden w-full justify-end p-1 cursor-pointer ">
              <div className="bg-white text-gray-900 w-max p-2 lg:text-base text-xs px-3 flex lg:gap-4 gap-1 rounded-full">
                <p
                  className={`flex gap-1 bg-white hover:text-[#ff2459]  ${
                    ownershipEnquirySent
                      ? "text-[#ff2459] cursor-not-allowed"
                      : "text-gray-900 cursor-pointer hover:text-[#ff2459]"
                  }`}
                  onClick={() => {
                    if (!isLogin) {
                      toast.error("Please login first to send enquiry!", {
                        transition: Zoom,
                        hideProgressBar: true,
                        autoClose: 2000,
                      });
                      return;
                    }
                    setOwnership(!ownership);
                  }}
                >
                  <CiCircleInfo className="relative top-1 lg:text-base text-xs" />
                  {ownershipEnquirySent
                    ? "Claim Enquiry Sent"
                    : "Claim Ownership"}
                </p>
                <p
                  className={`flex gap-1 bg-white hover:text-[#ff2459]  ${
                    enquirySent
                      ? "text-[#ff2459] cursor-not-allowed"
                      : "text-gray-900 cursor-pointer hover:text-[#ff2459]"
                  }`}
                  onClick={() => {
                    if (!isLogin) {
                      toast.error("Please login first to send enquiry!", {
                        transition: Zoom,
                        hideProgressBar: true,
                        autoClose: 2000,
                      });
                      return;
                    }
                    if (!organizerEmail) {
                      toast.error("Organizer email not available.");
                      return;
                    }
                    if (!enquirySent) {
                      setEnquiry(!enquiry);
                    }
                  }}
                >
                  <CiCircleInfo className="relative top-1 lg:text-base text-xs" />
                  {enquirySent ? "Enquiry Sent" : "Send Enquiry"}
                </p>
                <button
                  onClick={() => {
                    if (!isLogin) {
                      toast.error("Please login first to Add favorite!", {
                        transition: Zoom,
                        hideProgressBar: true,
                        autoClose: 2000,
                      });
                      return;
                    }
                    toggleFavorite(data._id);
                  }}
                  className={`flex gap-1 bg-white hover:text-[#ff2459] ${
                    localIsFavorite ? "text-[#ff2459]" : "text-gray-900"
                  }`}
                >
                  <FaHeart className="relative top-1 lg:text-base text-xs hover:text-[#ff2459]" />{" "}
                  {localIsFavorite ? "Added to Favourites" : "Add Favourite"}
                </button>
              </div>
            </div>
          </div>
          {isPopUp && (
            <div className="lg:hidden block">
              <div className="fixed w-full inset-0 flex flex-col items-center md:items-end justify-start pt-52 md:pt-42 md:pr-10 overflow-y-scroll z-40">
                <div className="bg-white rounded-lg shadow-lg lg:w-full relative p-4">
                  {/* Close Button */}
                  <button
                    className="absolute top-0 right-2 text-gray-900 hover:text-red-500 text-3xl"
                    onClick={() => setIsPopUp(false)}
                  >
                    &times;
                  </button>

                  <div className="flex flex-col gap-2 px-0 h-[170px] w-[300px] border rounded mt-8">
                    <button
                      className={`flex gap-3 md:text-xs lg:text-xs ml-4 mt-3  hover:text-[#ff2459] ${
                        ownershipEnquirySent
                          ? "text-[#ff2459] cursor-not-allowed font-bold"
                          : "text-gray-900 cursor-pointer hover:text-[#ff2459]"
                      }`}
                      onClick={() => {
                        if (!isLogin) {
                          toast.error("Please login first to send enquiry!", {
                            transition: Zoom,
                            hideProgressBar: true,
                            autoClose: 2000,
                          });
                          return;
                        }
                        setOwnership(!ownership);
                      }}
                    >
                      <IoFlagSharp className="relative top-1 lg:text-base" />
                      {ownershipEnquirySent
                        ? "Claim Enquiry Sent"
                        : "Claim Ownership"}
                    </button>
                    <button
                      className={`flex gap-3 md:text-xs lg:text-xs ml-4 mt-3 hover:text-[#ff2459] ${
                        enquirySent
                          ? "text-[#ff2459] cursor-not-allowed font-bold"
                          : "text-gray-900 cursor-pointer hover:text-[#ff2459]"
                      }`}
                      onClick={() => {
                        if (!isLogin) {
                          toast.error("Please login first to send enquiry!", {
                            transition: Zoom,
                            hideProgressBar: true,
                            autoClose: 2000,
                          });
                          return;
                        }
                        if (!organizerEmail) {
                          toast.error("Organizer email not available.");
                          return;
                        }
                        if (!enquirySent) {
                          setEnquiry(!enquiry);
                          setIsPopUp(false);
                        }
                      }}
                    >
                      <CiCircleInfo className="relative top-1 lg:text-base" />
                      {enquirySent ? "Enquiry Sent" : "Send Enquiry"}
                    </button>
                    <button
                      onClick={() => {
                        if (!isLogin) {
                          toast.error("Please login first to Add favorite!", {
                            transition: Zoom,
                            hideProgressBar: true,
                            autoClose: 2000,
                          });
                          return;
                        }
                        toggleFavorite(data._id);
                        setIsPopUp(false);
                      }}
                      className={`flex gap-3 p-4 px-4 bg-white hover:text-white hover:bg-[#ff2459] ${
                        localIsFavorite ? "text-[#ff2459]" : "text-gray-900"
                      }`}
                    >
                      <FaHeart className="relative top-2 lg:text-base text-sm" />
                      {localIsFavorite
                        ? "Added to Favourites"
                        : "Add Favourite"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className=" flex lg:flex-row flex-col py-3 ">
            <div className="flex lg:w-[30%] justify-start items-center flex-col gap-3 lg:p-10">
              <div className="w-full border border-gray-200 shadow max-w-[250px] md:max-w-[400px] lg:max-w-[180px] h-auto aspect-[5/5] bg-gray-200 rounded-t-lg overflow-hidden flex items-center justify-center min-h-[100px]">
                {data.profileImage ? (
                  <img
                    src={data.profileImage}
                    className="w-full h-full object-cover"
                    alt="Profile"
                  />
                ) : (
                  <img
                    src="/assets/staticAssets/user-icon.png"
                    className="w-full h-full object-cover"
                    alt="user"
                  />
                )}
              </div>

              <div className=" lg:flex gap-2 hidden justify-center">
                <FollowButton targetId={targetId} modelName={modelName} />
              </div>
            </div>
            <div className="flex lg:hidden gap-4 p-2 justify-center ">
              <FollowButton
                targetId={targetId}
                modelName={modelName}
                variant="mobile"
              />
            </div>

            {hoveredTab && (
              <div className="fixed bottom-1 left-2 text-xs text-white bg-gray-900 px-2 py-1 rounded shadow">
                {`${HrefUrl}#${hoveredTab}`}
              </div>
            )}

            <div className="lg:w-[70%]  h-[500px] overflow-scroll scrollbar-hide overflow-y-hidden rounded-lg ">
              <div
                className="text-gray-500 lg:text-base text-sm lg:w-full w-full lg:relative overflow-scroll scrollbar-hide  bg-white  flex border   md:gap-20 gap-5  
              lg:gap-16 font-medium lg:px-10 lg:p-0 p-2  "
              >
                <button
                  className={`px-2 ${
                    about ? "border-b-2 border-b-red-600" : ""
                  }`}
                  onClick={() => {
                    setAbout(true);
                    setUpcoming(false);
                    setFacebook(false);
                    setTwitter(false);
                    setInstagram(false);
                    setYoutube(false);
                    setStat(false);
                  }}
                  onMouseEnter={() => setHoveredTab("about")}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  ABOUT
                </button>
                <button
                  className={`${
                    upcoming ? "border-b-2 border-b-red-600" : ""
                  } p-2`}
                  onClick={() => {
                    setAbout(false);
                    setUpcoming(true);
                    setFacebook(false);
                    setTwitter(false);
                    setInstagram(false);
                    setYoutube(false);
                    setStat(false);
                  }}
                  onMouseEnter={() => setHoveredTab("upcoming-event")}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  UPCOMING EVENT
                </button>
                <button
                  className={`${
                    facebook ? "border-b-2 border-b-red-600" : ""
                  } p-2 lg:px-0 px-4`}
                  onClick={() => {
                    setAbout(false);
                    setUpcoming(false);
                    setFacebook(true);
                    setTwitter(false);
                    setInstagram(false);
                    setYoutube(false);
                    setStat(false);
                  }}
                  onMouseEnter={() => setHoveredTab("facebook")}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  FACEBOOK
                </button>
                <button
                  className={`${
                    twitter ? "border-b-2 border-b-red-600" : ""
                  } p-2 lg:px-0 px-4`}
                  onClick={() => {
                    setAbout(false);
                    setUpcoming(false);
                    setFacebook(false);
                    setTwitter(true);
                    setInstagram(false);
                    setYoutube(false);
                    setStat(false);
                  }}
                  onMouseEnter={() => setHoveredTab("twitter")}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  TWITTER
                </button>
                <button
                  className={`${
                    instagram ? "border-b-2 border-b-red-600" : ""
                  } p-2 lg:px-0 px-4`}
                  onClick={() => {
                    setAbout(false);
                    setUpcoming(false);
                    setFacebook(false);
                    setTwitter(false);
                    setInstagram(true);
                    setYoutube(false);
                    setStat(false);
                  }}
                  onMouseEnter={() => setHoveredTab("instagram")}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  INSTAGRAM
                </button>
                <button
                  className={`${
                    youtube ? "border-b-2 border-b-red-600" : ""
                  } p-2 lg:px-0 px-4`}
                  onClick={() => {
                    setAbout(false);
                    setUpcoming(false);
                    setFacebook(false);
                    setTwitter(false);
                    setInstagram(false);
                    setYoutube(true);
                    setStat(false);
                  }}
                  onMouseEnter={() => setHoveredTab("youtube")}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  YOUTUBE
                </button>
                <button
                  className={`${
                    stat ? "border-b-2 border-b-red-600" : ""
                  } p-2 lg:px-0 px-4`}
                  onClick={() => {
                    setAbout(false);
                    setUpcoming(false);
                    setFacebook(false);
                    setTwitter(false);
                    setInstagram(false);
                    setYoutube(false);
                    setStat(true);
                  }}
                  onMouseEnter={() => setHoveredTab("stat")}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  STAT
                </button>
              </div>
              <div className="lg:px-4 px-2 border bg-white rounded-lg h-full overflow-auto">
                {about && data ? (
                  <p className="py-5 ">
                    <h2 className="text-2xl font-semibold text-gray-800 py-4">
                      About the Organisers
                    </h2>

                    {/* {about ? data.description : ""} */}
                    {data?.description || "No description available"}
                  </p>
                ) : null}

                {upcoming && (
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center p-4">
                    {upcomingEventData.length > 0 ? (
                      upcomingEventData.map((event, index) => (
                        <div  
                          key={index}
                          className="bg-white shadow-md rounded-lg hover:shadow-lg transition-all duration-300 w-full max-w-[260px] h-[280px] flex flex-col mx-auto"
                          onClick={() => navigate(`/events/${event.category.toLowerCase()}/${event._id}`, { state: event._id }) }
                       >
                          {/* 🔹 Image Container*/}
                          <div className="w-full h-[100px] bg-gray-200 rounded-t-lg overflow-hidden flex items-center justify-center">
                            <img
                              src={
                                event.media?.thumbnailImage ||
                                "https://via.placeholder.com/250x160?text=No+Image"
                              }
                              alt={event.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* 🔹 Event Details  */}
                          <div className="p-2 flex flex-col flex-grow gap-y-2">
                            {/* Event Name */}
                            <div className="text-center min-h-[40px] max-h-[40px] flex items-center justify-center">
                              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 break-words line-clamp-2">
                                {event.name}
                              </h3>
                            </div>

                            {/* Category */}
                            <div className="text-center min-h-[20px] flex items-center justify-center">
                              <p className="text-xs sm:text-sm text-gray-500 break-words whitespace-normal">
                                {event.category || "Music Festival"}
                              </p>
                            </div>

                            {/* Date */}
                            <div className="text-center min-h-[20px] flex items-center justify-center">
                              <p className="text-xs sm:text-sm text-gray-400 break-words whitespace-normal">
                                {new Date(event.startDate).toDateString()} -{" "}
                                {new Date(event.endDate).toDateString()}
                              </p>
                            </div>

                            {/* Venue */}
                            <div className="text-center min-h-[25px] max-h-[40px] flex items-center justify-center flex-nowrap">
                              <p className="text-xs sm:text-sm text-gray-600 font-medium break-words whitespace-normal">
                                📍 {event.venue?.city || ""}{" "}
                                {event.venue?.state || ""}{" "}
                                {event.venue?.country || "Not Available"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 col-span-full p-4 text-xs sm:text-sm md:text-base">
                        No Upcoming Events Found
                      </p>
                    )}
                  </div>
                )}

                {facebook ? (
                  <div className="w-full flex justify-center py-6">
                    <div className="w-full max-w-[1200px]">
                      <FacebookEmbeded
                        appId={849920522233544}
                        fbId={data.facebookUrl}
                      />
                    </div>
                  </div>
                ) : null}

                <div className="font-medium text-lg text-center">
                  {instagram ? (
                    <div className="w-full flex justify-center py-6">
                      <div className="w-full max-w-[1200px]">
                        <InstagramEmbed instagramUrl={data.instagramUrl} />
                      </div>
                    </div>
                  ) : null}
                </div>

                <p className="font-medium text-lg text-center py-6">
                  {twitter ? <TwitterEmbed twitterUrl={data.twitterUrl} /> : ""}
                </p>
                <p className="font-medium text-lg text-center ">
                  {youtube ? (
                    <YouTubeProfile youtubeUrl={data.youtubeUrl} />
                  ) : (
                    <div></div>
                  )}
                </p>
                <p>{stat ? <OrganizerStats data={data} /> : ""}</p>
              </div>
            </div>
          </div>
          <div className="lg:px-0 border border-gray ml-[3%] shadow-lg bg-white lg:w-[70%] lg:ml-[30%]  w-[92%] mb-1">
            <h1 className="font-semibold text-xl p-2 ml-2 pb-0 ">Location</h1>
            <MapContainer className="mb-4" data={data} />
          </div>

          <div className="lg:px-0 border border-gray ml-[3%] shadow-lg bg-white lg:w-[70%] lg:ml-[30%]  w-[92%] mb-0 overflow-y-scroll scrollbar-hide">
            <FacebookComments dataHref="https://www.bezkoder.com/vue-3-authentication-jwt/" />
            <hr />
          </div>

          <div className="pl-8  md:w-[80%] md:ml-[25%]  pr-14 pb-2 w-full flex justify-end"></div>

          <div className=" lg:hidden flex flex-col gap-5 rounded  px-3">
            <div className=" lg:hidden flex flex-col gap-5 rounded pt-0  ">
              <div className="rounded p-2 shadow ">
                <h1 className="text-lg font-medium text-gray-900 p-2 border-b ">
                  Oragnizer Category
                </h1>
                <section className="flex lg:flex-col flex-col md:flex-row overflow-x-scroll gap-2 pt-3 ">
                  <div className="flex gap-2 ">
                    <div
                      onClick={() => {
                        setCategory("event planner");
                        navigate("/Organizers", { state: category });
                      }}
                      className="cursor-pointer bg-gray-200 hover:bg-[#ff2459] hover:text-white    w-max rounded-full font-medium p-1 px-4 text-xs "
                    >
                      Event Planner
                    </div>
                    <div
                      onClick={() => {
                        setCategory("wedding planner");
                        navigate("/Organizers", { state: category });
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
                        navigate("/Organizers", { state: category });
                      }}
                      className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                    >
                      Adventure
                    </div>
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
                Organizer Category
              </h1>
              <section className="flex flex-col gap-2 pt-3 justify-start items-start">
                <div className="flex flex-wrap gap-2 justify-center">
                  <div
                    onClick={() => {
                      setCategory("event planner");
                      navigate("/Organizers", { state: category });
                    }}
                    className="cursor-pointer bg-gray-200 hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs"
                  >
                    Event Planner
                  </div>
                  <div
                    onClick={() => {
                      setCategory("wedding planner");
                      navigate("/Organizers", { state: category });
                    }}
                    className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs"
                  >
                    Wedding Planner
                  </div>
                  <div
                    onClick={() => {
                      setCategory("adventure");
                      navigate("/Organizers", { state: category });
                    }}
                    className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs"
                  >
                    Adventure
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="border shadow w-[95%] ml-3">
            <h1 className="text-lg font-medium border-b text-gray-900 p-2 w-[95%] ml-2">
              Find Events
            </h1>
            <CommonCalendar /> 
          </div>
        </div>
      </div>

      {ownership && (
        <OwnerShipForm
          setOwnership={setOwnership}
          name={data.name}
          ownership={ownership}
          targetId={targetId}
          modelName={modelName}
          onOwnershipEnquirySent={handleOwnershipEnquirySent}
        />
      )}
      {enquiry && (
        <EnquiryForm
          setEnquiry={setEnquiry}
          onEnquirySent={handleEnquirySent}
          name={name}
          email={organizerEmail}
          enquiry={enquiry}
        />
      )}
    </div>
  );
}

export default GetOrganizerById;
