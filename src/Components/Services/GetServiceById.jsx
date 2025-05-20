import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";

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
} from "react-icons/ci";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";

import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { CalendarCheck } from "lucide-react";
import MapContainer from "../Organizer/Map";
import { FcLike } from "react-icons/fc";
import FacebookComments from "../Organizer/FacebookComments";
import EnquiryForm from "../Organizer/EnquiryForm";
import OwnerShipForm from "../Organizer/OwnerShipForm";
import { getServiceById } from "../../redux/actions/master/Services/getServiceById";
import FacebookEmbeded from "../SocialMedia/Facebook";
import InstagramProfile from "../SocialMedia/Instagram";
import YouTubeProfile from "../SocialMedia/Youtube";
import ServiceStats from "../SocialMedia/ServiceStat";
import { getFavouriteServiceData } from "../../redux/actions/master/Services/getFavouriteService";
import { deleteFavouriteService } from "../../redux/actions/master/Services/deleteFavouriteService";
import { toast, Zoom } from "react-toastify";
import { postFavouriteService } from "../../redux/actions/master/Services/postFavouriteService";
import {
  getUpcomingEventData,
  getUpcomingEventsDataForProfile,
} from "../../redux/actions/master/Events/UpcomingEvent";
import TwitterEmbed from "../SocialMedia/TwiiterEmbed.jsx";

function GetServiceById() {
  const { serviceId } = useParams();
  const [isPopUp, setIsPopUp] = useState(false);
  const [category, setCategory] = useState("");
  const [enquiry, setEnquiry] = useState(false);
  const [ownership, setOwnership] = useState(false);
  const [about, setAbout] = useState(true);
  const [upcoming, setUpcoming] = useState(false);
  const [facebook, setFacebook] = useState(false);
  const [twitter, setTwitter] = useState(false);
  const [instagram, setInstagram] = useState(false);
  const [youtube, setYoutube] = useState(false);
  const [stat, setStat] = useState(false);
  const [localIsFavorite, setLocalIsFavorite] = useState("isFavourite");
  const navigate = useNavigate();
  const location = useLocation();
  const [enquirySent, setEnquirySent] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const HrefUrl = `http://localhost:5173/Service/${serviceId}`;

  // get Upcoming Event Data
  useEffect(() => {
    dispatch(
      getUpcomingEventsDataForProfile({
        service: serviceId, // Pass the service filter here
        setLoader: setLoading,
        page: 1,
        limit: 10,
        timezoneOffset: Date().time,
        sortBy: "startDate",
        sortOrder: "asc",
      })
    );
  }, [dispatch, serviceId]);

  const upcomingEventData =
    useSelector((state) => state.upcomingEventReducer?.upcomingEventData) || [];

  if (!upcomingEventData) {
    return <div>Loading...</div>;
  }

  const data1 = upcomingEventData;

  const store = useSelector((state) => state.getServiceByIdReducer) || {
    serviceData: [],
  };

  const data = store.serviceData;
  const name = data.name;
  const email = data?.organizerEmail || data?.email;

  const store1 = useSelector((state) => state.getFavouriteServiceReducer) || {
    favouriteServiceData: [],
  };
  const favouriteService = store1.favouriteServiceData;

  const isFavourite = favouriteService.some((fav) => fav._id === data._id);

  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

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
    dispatch(getFavouriteServiceData(setLoading));
  }, [dispatch]);

  const togglePhoneVisibility = () => {
    setShowNumber((prev) => !prev);
  };
  const hasPhoneNumber = data?.phoneNumber && data.phoneNumber.trim() !== "";

  useEffect(() => {
    setLocalIsFavorite(isFavourite);
  }, [isFavourite]);

  const toggleFavorite = (id) => {
    if (localIsFavorite) {
      setLocalIsFavorite(false);
      dispatch(deleteFavouriteService(id));
    } else {
      setLocalIsFavorite(true);
      dispatch(postFavouriteService(id));
    }
    dispatch(getFavouriteServiceData(setLoading));
  };

  const currentUrl = encodeURIComponent(window.location.href); // Get the current page URL

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
    dispatch(getServiceById(serviceId, setLoading));
    dispatch(getFavouriteServiceData(setLoading));
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex lg:flex-row flex-col gap-2">
        <div className="lg:pt-6 md:pt-0 pt-20 bg-gray-100 lg:w-[75%] lg:px-4 ">
          <div className="flex justify-between font-medium">
            <div className="flex flex-row gap-2 p-3 flex-wrap">
              <p
                className="cursor-pointer hover:text-[#ff2459]"
                onClick={() => navigate("/home")}
              >
                Home
              </p>
              <MdKeyboardDoubleArrowRight className="text-lg top-1 relative" />
              <p className="hover:text-[#ff2459]">{data ? data.city : ""}</p>
              <MdKeyboardDoubleArrowRight className="text-lg top-1 relative" />
              <p
                className="cursor-pointer hover:text-[#ff2459]"
                onClick={() => {
                  navigate("/Services");
                }}
              >
                Service
              </p>
              <MdKeyboardDoubleArrowRight className="text-lg top-1 relative" />
              <p
                className="cursor-pointer text-[#ff2459] hover:text-[#ff2459]"
                onClick={() =>
                  navigate(`/Service/${data._id}`, { state: data })
                }
              >
                {data.name}
              </p>
            </div>

            <div className="lg:flex hidden gap-1 pt-3 p-3 pb-0">
              <p className="flex gap-1 md:text-xs lg:text-xs text-[10px] font-bold text-gray-900 cursor-pointer ">
                <FaEye className="relative top-0.5 text-blue-600" />
                <span>Total {data.visits} </span>
              </p>
              <p className="flex gap-1 md:text-xs lg:text-xs text-[10px] font-bold text-gray-900 cursor-pointer ">
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
                {data.visits} , {data.dailyVisits} visits today
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
                {data.city},{data.state},{data.country}
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
                  className="flex gap-1 hover:text-[#ff2459] "
                  onClick={() => setOwnership(!ownership)}
                >
                  <IoFlagSharp className="relative top-1 lg:text-base text-xs" />{" "}
                  Claim Ownership
                </p>
                <p
                  className={`flex gap-1 bg-white  hover:text-[#ff2459] ${
                    enquirySent
                      ? "text-[#ff2459] cursor-not-allowed"
                      : "text-gray-900 cursor-pointer hover:text-[#ff2459]"
                  }`}
                  onClick={() => {
                    if (!isLogin) {
                      toast.error("Please login to send enquiry!", {
                        transition: Zoom,
                        hideProgressBar: true,
                        autoClose: 2000,
                      });
                      return;
                    }
                    if (!email) {
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
                  className={`flex gap-1 bg-white hover:text-[#ff2459]  ${
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

                  <div className="flex flex-col gap-0 px-0 h-[170px] w-[300px] border rounded mt-6">
                    <button
                      className="flex gap-3 p-4 px-4 hover:text-white hover:bg-[#ff2459]"
                      onClick={() => {
                        setOwnership(!ownership);
                        setIsPopUp(false);
                      }}
                    >
                      <IoFlagSharp className="relative top-1 lg:text-base" />
                      Claim Ownership
                    </button>
                    <button
                      className={`flex gap-3 md:text-xs lg:text-xs ml-4  hover:text-[#ff2459] ${
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
                        if (!email) {
                          toast.error("Email not available for this service.");
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
                  <span className="text-gray-500 text-sm">
                    No Image Available
                  </span>
                )}
              </div>

              <div className=" lg:flex gap-2 hidden justify-center">
                <button className="px-2 lg:flex hidden gap-1 bg-gray-200 rounded-full p-1 lg:text-base text-sm ">
                  <CiCircleCheck className="relative top-1 lg:text-lg" />
                  Follow
                </button>
                <div className="flex   gap-3 ">
                  <button className="text-red-500 text-2xl">
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

                  <button className="text-red-500 text-2xl">
                    <a href={data.facebookUrl ? data.facebookUrl : ""}>
                      {data.facebookUrl ? (
                        <CiFacebook className="text-red-500" />
                      ) : (
                        ""
                      )}
                    </a>
                  </button>

                  <button
                    onClick={() => toggleFavorite(data._id)}
                    className={` text-2xl ${
                      localIsFavorite ? "text-[#ff2459]" : "text-gray-400"
                    }`}
                  >
                    <FaHeart />
                  </button>

                  <button className="text-red-500 text-2xl">
                    <a href={data.twitterUrl ? data.twitterUrl : ""}>
                      {data.twitterUrl ? (
                        <FaSquareXTwitter className="text-red-500" />
                      ) : (
                        ""
                      )}
                    </a>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex lg:hidden gap-4 p-2 justify-center">
              <button className="px-2 lg:hidden mb-2 flex w-max mt-2 gap-1 bg-gray-200 rounded-full p-1 lg:text-base text-sm ">
                <CiCircleCheck className="relative top-1 lg:text-lg" />
                Follow
              </button>
              <div className="flex   gap-5 ">
                <button className="text-red-500 text-2xl">
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

                <button className="text-red-500 text-2xl">
                  <a href={data.facebookUrl ? data.facebookUrl : ""}>
                    {data.facebookUrl ? (
                      <CiFacebook className="text-red-500" />
                    ) : (
                      ""
                    )}
                  </a>
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
                  }}
                  className={`text-2xl ${
                    localIsFavorite ? "text-[#ff2459]" : "text-gray-900"
                  }`}
                >
                  <FaHeart />
                </button>

                <button className="text-red-500 text-2xl">
                  <a href={data.twitterUrl ? data.twitterUrl : ""}>
                    {data.twitterUrl ? (
                      <FaSquareXTwitter className="text-red-500" />
                    ) : (
                      ""
                    )}
                  </a>
                </button>
              </div>
            </div>

            {hoveredTab && (
              <div className="fixed bottom-1 left-2 text-xs text-white bg-gray-900 px-2 py-1 rounded shadow">
                {`${HrefUrl}#${hoveredTab}`}
              </div>
            )}

            <div className="lg:w-[70%]  h-[500px] overflow-scroll scrollbar-hide rounded-lg">
              <div className="text-gray-500 lg:text-base text-sm lg:w-full w-full lg:relative overflow-x-scroll scrollbar-hide  bg-white  flex border   md:gap-20 gap-5  lg:gap-16 font-medium lg:px-10 lg:p-0 p-2  ">
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
                  onMouseEnter={() => setHoveredTab("stats")}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  STATS
                </button>
              </div>
              <div className="lg:px-4 px-2 border bg-white  rounded-lg h-full overflow-auto">
                {about && data ? (
                  <p className="py-5 ">
                    <h2 className="text-2xl font-semibold text-gray-800 py-4">
                      About the Services
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

                {instagram ? (
                  <div className="w-full flex justify-center py-6">
                    <div className="w-full max-w-[1200px]">
                      <InstagramProfile instagramUrl={data.instagramUrl} />
                    </div>
                  </div>
                ) : null}

                <p className="font-medium text-lg text-center p-4">
                  {twitter ? <TwitterEmbed twitterUrl={data.twitterUrl} /> : ""}
                </p>

                <p>
                  {youtube ? (
                    <YouTubeProfile youtubeEmbedUrl={data.youtubeEmbedUrl} />
                  ) : (
                    ""
                  )}
                </p>

                <p>{stat ? <ServiceStats data={data} /> : ""}</p>
              </div>
            </div>
          </div>
          <div className="lg:px-0 border border-gray ml-[3%] shadow-lg bg-white lg:w-[70%] lg:ml-[30%]  w-[92%] mb-5">
            <MapContainer data={data} />
          </div>

          <div className="pl-8 border border-gray shadow md:w-[70%] md:ml-[30%] pr-14 pb-2 w-full h-auto mb-5 flex justify-start overflow-y-scroll">
            <FacebookComments
              dataHref="https://www.bezkoder.com/vue-3-authentication-jwt/"
              numPosts={10}
              width="750"
            />
            <hr />
          </div>

          <div className=" lg:hidden flex flex-col gap-5 rounded  px-3">
            <div className=" lg:hidden flex flex-col gap-5 rounded pt-0  ">
              <div className="rounded p-2 shadow ">
                <h1 className="text-lg font-medium text-gray-900 p-2 border-b ">
                  Service Category
                </h1>
                <section className="flex lg:flex-col flex-col md:flex-row overflow-x-scroll gap-2 pt-3 ">
                  <div className="flex gap-2 ">
                    <div
                      onClick={() => {
                        setCategory("anchor");
                        navigate("/Services", { state: category });
                      }}
                      className="bg-gray-200 hover:bg-[#ff2459] hover:text-white    w-max rounded-full font-medium p-1 px-4 text-xs "
                    >
                      Anchor
                    </div>
                    <div
                      onClick={() => {
                        setCategory("decor");
                        navigate("/Services", { state: category });
                      }}
                      className="bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white    w-max rounded-full font-medium p-1 px-4 text-xs "
                    >
                      Decor
                    </div>
                    <div
                      onClick={() => {
                        setCategory("entertainer");
                        navigate("/Services", { state: category });
                      }}
                      className="bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white    w-max rounded-full font-medium p-1 px-4 text-xs "
                    >
                      Entertainer
                    </div>
                  </div>
                  <div className="flex gap-2 ">
                    <div
                      onClick={() => {
                        setCategory("party supplies");
                        navigate("/Services", { state: category });
                      }}
                      className="bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white    w-max rounded-full font-medium p-1 px-4 text-xs "
                    >
                      Party Supplies
                    </div>
                  </div>
                  <div className="flex gap-2 ">
                    <div
                      onClick={() => {
                        setCategory("photography & videography");
                        navigate("/Services", { state: category });
                      }}
                      className="bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white    w-max rounded-full font-medium p-1 px-4 text-xs "
                    >
                      Photography & Videography
                    </div>
                  </div>
                  <div className="flex gap-2 ">
                    <div
                      onClick={() => {
                        setCategory("promoters");
                        navigate("/Services", { state: category });
                      }}
                      className="bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white    w-max rounded-full font-medium p-1 px-4 text-xs "
                    >
                      Promoters
                    </div>
                    <div
                      onClick={() => {
                        setCategory("dance studio");
                        navigate("/Services", { state: category });
                      }}
                      className="bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white    w-max rounded-full font-medium p-1 px-4 text-xs "
                    >
                      Dance Studio
                    </div>
                  </div>
                </section>
              </div>
              <div className="rounded border ">
                <h1 className="text-lg font-medium text-gray-900 p-3 border-b flex justify-between">
                  Find Events
                  <div className="flex  gap-2 text-xl">
                    <button
                      onClick={() => handleShare("facebook")}
                      className="flex gap-1 shadow border p-1 rounded"
                    >
                      <FaSquareFacebook className="text-red-500 relative " />
                    </button>
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="flex gap-1 shadow border p-1 rounded"
                    >
                      <FaWhatsapp className="bg-red-500 text-white p-0.5" />
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
                      <FaSquareXTwitter className="text-red-500" />
                    </button>
                  </div>
                </h1>
                <div className="flex justify-center items-center ">
                  <div className="flex  gap-5 p-3 overflow-x-scroll ">
                    <div className="bg-blue-600 rounded h-28 min-w-28 text-white font-medium flex flex-col gap-2 items-start p-4 ">
                      <BsCalendar2DateFill className=" text-white  text-2xl font-medium" />

                      <p>Today 0</p>
                    </div>
                    <div className="bg-orange-400 rounded h-28 min-w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                      <BsCalendar2DateFill className=" text-white text-2xl font-medium" />

                      <p>Tommorrow 0</p>
                    </div>
                    <div className="bg-blue-400 rounded h-28 min-w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                      <HiOutlineCalendarDateRange className="text-2xl text-white font-medium" />

                      <p className="text-sm p-1">This Weekend 0</p>
                    </div>
                    <div className="bg-green-600  rounded h-28 min-w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                      <CalendarCheck className="text-2xl text-white font-medium" />
                      <p>Choose Date</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[25%] lg:flex hidden flex-col gap-8 rounded pt-5 pr-3 mt-2">
          <div className="flex flex-col gap-2 px-2 shadow-md p-4">
            <div className="grid grid-cols-3 gap-2 text-xl">
              <button
                onClick={() => handleShare("facebook")}
                className="flex gap-1 shadow border p-1 rounded"
              >
                <span className="text-sm border-r px-2">SHARE </span>
                <FaSquareFacebook className="text-red-500 relative " />
              </button>
              <button
                onClick={() => handleShare("whatsapp")}
                className="flex gap-1 shadow border p-1 rounded"
              >
                <span className="text-sm border-r px-2">SHARE </span>
                <FaWhatsapp className="bg-red-500 text-white p-0.5" />
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
                <FaSquareXTwitter className="text-red-500" />
              </button>
            </div>
          </div>
          <div className="rounded p-2 shadow ">
            <h1 className="text-lg font-medium text-gray-900 p-3 border-b ">
              Service Category
            </h1>
            <section className="flex flex-col gap-2 pt-3 justify-center items-center">
              <div className="flex flex-wrap gap-2 justify-center ">
                <div
                  onClick={() => {
                    setCategory("anchor");
                    navigate("/Services", { state: category });
                  }}
                  className="cursor-pointer bg-gray-200 hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Anchor
                </div>
                <div
                  onClick={() => {
                    setCategory("decor");
                    navigate("/Services", { state: category });
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Decor
                </div>
                <div
                  onClick={() => {
                    setCategory("entertainer");
                    navigate("/Services", { state: category });
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Entertainer
                </div>
              </div>

              <div className="flex gap-2 ">
                <div
                  onClick={() => {
                    setCategory("photography & videography");
                    navigate("/Services", { state: category });
                  }}
                  className="cursor-pointer bg-gray-200 hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Photography & Videography
                </div>
                <div
                  onClick={() => {
                    setCategory("promoters");
                    navigate("/Services", { state: category });
                  }}
                  className="cursor-pointer bg-gray-200 hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Promoters
                </div>
              </div>
              <div className="flex gap-2 ">
                <div
                  onClick={() => {
                    setCategory("dance studio");
                    navigate("/Services", { state: category });
                  }}
                  className="cursor-pointer bg-gray-200 hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Dance Studio
                </div>
                <div
                  onClick={() => {
                    setCategory("party supplies");
                    navigate("/Services", { state: category });
                  }}
                  className="cursor-pointer whitespace-nowrap bg-gray-200 hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Party Supplies
                </div>
              </div>
            </section>
          </div>
          <div className="rounded border">
            <h1 className="text-lg font-medium text-gray-900 p-3 border-b">
              Find Events
            </h1>
            <div className="flex justify-center items-center ">
              <div className="grid grid-cols-2 gap-4 p-3 ">
                <div className="bg-blue-600 rounded h-28 w-28 text-white font-medium flex flex-col gap-2 items-start p-4">
                  <BsCalendar2DateFill className=" text-white  text-2xl font-medium" />

                  <p>Today 0</p>
                </div>
                <div className="bg-orange-400 rounded h-28 w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <BsCalendar2DateFill className=" text-white text-2xl font-medium" />

                  <p>Tommorrow 0</p>
                </div>
                <div className="bg-blue-400 rounded h-28 w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <HiOutlineCalendarDateRange className="text-2xl text-white font-medium" />

                  <p className="text-sm p-1">This Weekend 0</p>
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
          onEnquirySent={handleEnquirySent}
          name={name}
          email={email}
          enquiry={enquiry}
        />
      )}
    </div>
  );
}

export default GetServiceById;
