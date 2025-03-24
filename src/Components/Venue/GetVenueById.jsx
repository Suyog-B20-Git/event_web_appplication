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
} from "react-icons/fa6";
import { IoFlagSharp, IoLogoWhatsapp } from "react-icons/io5";
import {
  CiCircleCheck,
  CiCircleInfo,
  CiHeart,
  CiMenuKebab,
} from "react-icons/ci";
import { BsCalendar2DateFill } from "react-icons/bs";

import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { CalendarCheck } from "lucide-react";
import MapContainer from "../Organizer/Map";
import { FcLike } from "react-icons/fc";
import FacebookComments from "../Organizer/FacebookComments";
import EnquiryForm from "../Organizer/EnquiryForm";
import OwnerShipForm from "../Organizer/OwnerShipForm";
import { getVenueById } from "../../redux/actions/master/Venue/getVenueById";
import YouTubeProfile from "../SocialMedia/Youtube";
import InstagramProfile from "../SocialMedia/Instagram";
import FacebookEmbeded from "../SocialMedia/Facebook";
import VenueStats from "../SocialMedia/VenueStat";
import { getFavouriteVenueData } from "../../redux/actions/master/Venue/getFavouriteVenue";
import { toast } from "react-toastify";
import { postFavouriteVenue } from "../../redux/actions/master/Venue/postFavouriteVenueReducer";
import {getUpcomingEventData, getUpcomingEventsDataForProfile} from "../../redux/actions/master/Events/UpcomingEvent";
import TwitterEmbed from "../SocialMedia/TwiiterEmbed.jsx";

function GetVenueById() {
  const { venueId } = useParams();
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
  const navigate = useNavigate();
  const location = useLocation();
  // const venueId = location.state;
  console.log(venueId);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // get Upcoming Event Data
  useEffect(() => {
    dispatch(
        getUpcomingEventsDataForProfile({
          venue: venueId,
          setLoader: setLoading,
          page: 1,
          limit: 10,
          timezoneOffset: new Date().getTimezoneOffset(),
          sortBy: "startDate",
          sortOrder: "asc",
        })
    );
  }, [dispatch, venueId]);

      // const upcomingEventData=useSelector((state)=>state.getupcomingEventReducer)  || {
      //   upcomingEventData: [],
      // }

      const upcomingEventData = useSelector((state) => state.upcomingEventReducer?.upcomingEventData) || [];

      if (!upcomingEventData) {
        return <div>Loading...</div>;
      }

      const data1 = upcomingEventData;
      console.log("Upcoming Event Data:", data1);

  const store = useSelector((state) => state.getVenueByIdReducer) || {
    venueData: [],
  };

  const data = store.venueData;
  console.log(data, "VenueData....");
  const currentUrl = encodeURIComponent(window.location.href); // Get the current page URL

  const store1 = useSelector((state) => state.getFavouriteVenueReducer) || {
    favouriteVenueData: [],
  };
  const favouriteVenue = store1.favouriteVenueData;
  const isFavourite = (id) => {
    
    return favouriteVenue.some((fav) => fav._id === id);
  };
  useEffect(() => {
    dispatch(getFavouriteVenueData(setLoading)); // Fetch favorites on mount
  }, [dispatch]);

  const checkFavourite = (id) => {
    if (favouriteVenue.some((fav) => fav._id === id)) {
      toast.warning("Already added to favorites!", {
        position: "top-right",
        autoClose: 2000, // Closes after 2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleFavourite = (id) => {
    if (isFavourite(id)) {
      return;
    } else {
      dispatch(postFavouriteVenue(id));
      console.log(id, "fav id");
      dispatch(getFavouriteVenueData(setLoading));
    }
  };

  useEffect(() => {
    dispatch(getVenueById(venueId, setLoading));
    dispatch(getFavouriteVenueData(setLoading));
  }, [dispatch]);

  const shareUrls = {
    whatsapp: `https://api.whatsapp.com/send?text=${currentUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}`,
    messenger: `https://www.messenger.com/t/?link=${currentUrl}`,
  };
  const handleShare = (platform) => {
    window.open(shareUrls[platform], "_blank");
  };

  // useEffect(() => {
  //   dispatch(getVenueById(venueId, setLoading));
  // }, [dispatch]);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="">
      <div className="flex lg:flex-row flex-col gap-2">
        <div className="lg:pt-6 md:pt-0 pt-20 bg-gray-100 lg:w-[75%] lg:px-4 ">
        <div className="flex flex-row justify-between items-center font-medium flex-wrap">
        <div className="flex flex-row gap-2 p-3 flex-wrap">
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
                  navigate("/Venues");
                }}
              >
                Venue
              </p>
              <MdKeyboardDoubleArrowRight className="text-lg top-1 relative" />
              <p
                className="cursor-pointer text-[#ff2459] hover:text-[#ff2459]"
                onClick={() => navigate(`/Venue/${data._id}`, { state: data })}
              >
                {data.name}
              </p>
            </div>
            <p className="text-blue-400  lg:text-base text-xs lg:flex hidden gap-1 pt-3 p-3 pb-0 ">
              <FaEye className="relative top-1" />
              {data.visits} , {data.dailyVisits} visits today
            </p>
          </div>
          <div
            className=" text-white flex flex-col justify-around gap-4 lg:pt-10 pt-3 lg:px-8   lg:p-2"
            style={{
              backgroundImage:
                "radial-gradient( circle farthest-corner at 5.6% 54.5%,  rgba(47,71,79,1) 0%, rgba(159,188,198,1) 83.6% )",
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
                  className="flex gap-1 bg-white text-gray-900"
                  onClick={() => setEnquiry(!enquiry)}
                >
                  <CiCircleInfo className="relative top-1 lg:text-base text-xs" />
                  Send Enquiry
                </p>
                <button
                  onClick={() => {
                    handleFavourite(data._id);
                    checkFavourite(data._id);
                  }}
                  className={`flex gap-1 bg-white  ${
                    isFavourite(data._id) ? "text-[#ff2459]" : "text-gray-900"
                  }`}
                >
                  {console.log(isFavourite(data._id),"- Status")}
                  <FaHeart className="relative top-1 lg:text-base text-xs" />{" "}
                  {isFavourite(data._id)
                    ? "Added to Favourites"
                    : "Add Favourite"}
                </button>
              </div>
            </div>
          </div>
          {isPopUp && (
            <div className="lg:hidden block">
             <div className="fixed w-full inset-0 flex flex-col items-center md:items-end justify-start pt-56 md:pt-44 md:pr-10 overflow-y-scroll z-40 ">
      <div className="bg-white rounded-lg shadow-lg lg:w-full relative">
        {/* Close Button */}
        <button
          className="absolute top-1 right-4 text-gray-900 hover:text-red-500 text-3xl"
          onClick={() => setIsPopUp(false)}
        >
          &times;
        </button>
         <div className="  flex flex-col gap-0  px-0 h-[170px] w-[300px] border rounded">
                    <button
                      className="flex  gap-3 p-4  px-4 hover:text-white hover:bg-[#ff2459] "
                      onClick={() => {
                        setOwnership(!ownership);
                        setIsPopUp(!isPopUp);
                      }}
                    >
                      {" "}
                      <IoFlagSharp className="relative top-1 lg:text-base " />
                      Claim Ownership
                    </button>
                    <button
                      className="flex gap-3 p-4  px-4 bg-white text-gray-900 hover:text-white hover:bg-[#ff2459]"
                      onClick={() => {
                        setEnquiry(!enquiry);
                        setIsPopUp(!isPopUp);
                      }}
                    >
                      {" "}
                      <CiCircleInfo className="relative top-1 lg:text-base  " />
                      Send Enquiry
                    </button>
                    <button
                      onClick={() => {
                        handleFavourite(data._id);
                        checkFavourite(data._id);
                        setIsPopUp(!isPopUp);
                      }}
                      className={`flex gap-3 p-4  px-4 bg-white  hover:text-white hover:bg-[#ff2459]  ${
                        isFavourite(data._id)
                          ? "text-[#ff2459]"
                          : "text-gray-900"
                      }`}
                    >
                      <FaHeart className="relative top-1 lg:text-base text-xs" />{" "}
                      {isFavourite(data._id)
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
          <div className="h-56 w-56 md:h-56 md:w-64 lg:h-52 lg:w-56 border-2 overflow-hidden">

          <img
                src={data.profileImage}
                className="w-full h-full object-cover"
                alt=""
              />
           </div>

              <div className=" lg:flex gap-2 hidden justify-center">
                {/* <button className="px-2 lg:flex hidden gap-1 bg-gray-200 rounded-full p-1 lg:text-base text-sm ">
                  <CiCircleCheck className="relative top-1 lg:text-lg" />
                  Follow
                </button> */}
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
                    <a href={data.facebookmUrl ? data.facebookUrl : ""}>
                      {data.facebookUrl ? (
                        <FcLike className="text-red-500" />
                      ) : (
                        ""
                      )}
                    </a>
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
            <div className="flex lg:hidden gap-4 p-2 justify-center ">
              {/* <button className="px-2 lg:hidden mb-2 flex w-max mt-2 gap-1 bg-gray-200 rounded-full p-1 lg:text-base text-sm ">
                <CiCircleCheck className="relative top-1 lg:text-lg" />
                Follow
              </button> */}
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
                  <a href={data.facebookmUrl ? data.facebookUrl : ""}>
                    {data.facebookUrl ? (
                      <FcLike className="text-red-500" />
                    ) : (
                      ""
                    )}
                  </a>
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
            <div className="lg:w-[70%]  h-[500px] overflow-scroll  scrollbar-hide  rounded-lg">
            <div className="text-gray-500 lg:text-base text-sm lg:w-full w-full lg:relative overflow-scroll scrollbar-hide  bg-white  flex border   md:gap-20 gap-5  lg:gap-16 font-medium lg:px-10 p-2  ">
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
                >
                  TWITTER
                </button>
                {/* <button
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
                >
                  INSTAGRAM
                </button> */}
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
                >
                  STAT
                </button>
              </div>
              
              <div className="lg:px-10 p-2 border bg-white  rounded-lg h-full overflow-auto" >
              {about && data ? (
                <div className="py-5 space-y-6 bg-white shadow-md rounded-lg p-6">
                 <h2 className="text-2xl font-semibold text-gray-800">About the Venue</h2>
                  {/* Venue Description */}
                  <p className="py-1 text-gray-600">
                    {data?.description || "No description available"}
                  </p>

                  {/* Venue Details */}
                  <div className="border-b pb-4">
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-700">Venue Type</h3>
                      <p className="text-gray-600">{data?.type || "Not specified"}</p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-700">Website</h3>
                      {data?.url ? (
                        <a href={data.url} target="_blank" className="text-blue-500 hover:underline">
                          {data.url}
                        </a>
                      ) : "Not available"}
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-700">Amenities</h3>
                      <p className="text-gray-600">{data?.amenities || "Not specified"}</p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-700">Seated Guests</h3>
                      <p className="text-gray-600">{data?.noOfSeatedGuest || "Not provided"}</p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-700">Standing Guests</h3>
                      <p className="text-gray-600">{data?.noOfStandingGuest || "Not provided"}</p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-700">Neighbourhood</h3>
                      <p className="text-gray-600">{data?.neighbourhoods || "Not mentioned"}</p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-700">Pricing</h3>
                      <p className="text-gray-600">{data?.pricing || "Not specified"}</p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-700">Food & Beverages</h3>
                      <p className="text-gray-600">{data?.foodAndBeveragesDetails || "Not mentioned"}</p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-700">Quoted Form</h3>
                      <p className="text-gray-600">{data?.quotedForm || "Not specified"}</p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-700">Availability</h3>
                      <p className="text-gray-600">{data?.availability || "Not mentioned"}</p>
                    </div>
                  </div>
                </div>
              ) : null}

                {/* <p className="font-medium text-lg text-center">
                  {upcomimg ? "" : <div className="  "></div>}
                </p> */}
                   {upcoming && (
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
                    {upcomingEventData.length > 0 ? (
                      upcomingEventData.map((event, index) => (
                        <div
                          key={index}
                          className="bg-white shadow-lg rounded-lg border border-red-400 hover:shadow-xl transition-all duration-300 w-full max-w-[260px] h-[300px] flex flex-col mx-auto"
                        >
                          {/* Image */}
                          <div className="w-full h-[160px] bg-gray-200 rounded-t-lg overflow-hidden flex items-center justify-center">
                            <img
                              src={event.media?.thumbnailImage || "https://via.placeholder.com/250x160?text=No+Image"}
                              alt={event.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Event Details */}
                          <div className="p-3 text-center flex-grow flex flex-col justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">{event.name}</h3>
                              <p className="text-sm text-gray-500 mt-1">{event.category || "Music Festival"}</p>

                              {/* Date */}
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(event.startDate).toDateString()} - {new Date(event.endDate).toDateString()}
                              </p>
                            </div>

                            {/* Venue */}
                            {event.venue && (
                              <p className="text-sm text-gray-600 font-medium mt-2">
                                📍 {event.venue.city}, {event.venue.state}, {event.venue.country}
                              </p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 col-span-full">No Upcoming Events Found</p>
                    )}
                  </div>
                )}

                <p>
                {facebook ? (
                <div className="w-full flex justify-center">
                    <div className="w-full max-w-[1200px]">
                      <FacebookEmbeded appId={849920522233544} fbId={data.facebookUrl} />
                    </div>
                  </div>
                  ) :( "")}
                </p>
                <p className="font-medium text-lg text-center">
                  {instagram ? (
                    <InstagramProfile username="cristiano" />
                  ) : (
                    <div className=" "></div>
                  )}
                </p>
                <p className="font-medium text-lg text-center">
                  {twitter ? <TwitterEmbed twitterUrl={data.twitterUrl} /> : ""}
                </p>
                <p className="font-medium text-lg text-center">
                  {youtube ? (
                      <YouTubeProfile youtubeEmbedUrl={data.youtubeEmbedUrl} />
                  ) : (
                    <div></div>
                  )}
                </p>
                <p className="font-medium text-lg text-center">
                  {stat && <VenueStats data={data} />}
                </p>
              </div>
            </div>
          </div>

          <div className=" lg:hidden flex flex-col gap-5 rounded  px-3">
            <div className=" lg:hidden flex flex-col gap-5 rounded pt-0  ">
              <div className="rounded p-2 shadow ">
                <h1 className="text-lg font-medium text-gray-900 p-2 border-b ">
                  Venue Category
                </h1>
                <section className="flex lg:flex-col flex-row overflow-x-scroll gap-2 pt-3 ">
                  <div className="flex gap-2 ">
                    <div
                      onClick={() => {
                        setCategory("indoor");
                        navigate("/Venues", { state: category });
                      }}
                      className="bg-gray-200 hover:bg-[#ff2459] hover:text-white    w-max rounded-full font-medium p-1 px-4 text-xs "
                    >
                      Indoor
                    </div>
                    <div
                      onClick={() => {
                        setCategory("outdoor");
                        navigate("/Venues", { state: category });
                      }}
                      className="bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white    w-max rounded-full font-medium p-1 px-4 text-xs "
                    >
                      Outdoor
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
                  <div className="flex  gap-5 p-3 overflow-x-scroll ">
                    <div className="bg-blue-600 rounded h-28 min-w-28 text-white font-medium flex flex-col gap-2 items-start p-4 ">
                      <BsCalendar2DateFill className=" text-white  text-2xl font-medium" />

                      <p>Todays 0</p>
                    </div>
                    <div className="bg-orange-400 rounded h-28 min-w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                      <BsCalendar2DateFill className=" text-white text-2xl font-medium" />

                      <p>Tommorrow 0</p>
                    </div>
                    <div className="bg-blue-400 rounded h-28 min-w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                      <HiOutlineCalendarDateRange className="text-2xl text-white font-medium" />

                      <p className="text-sm p-1">These Weekend 0</p>
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
          <div className="rounded p-2 shadow ">
            <h1 className="text-lg font-medium text-gray-900 p-3 border-b ">
              Venue Category
            </h1>
            <section className="flex flex-col gap-2 pt-3  justify-center items-center">
              <div className="flex gap-2 ">
                <div
                  onClick={() => {
                    setCategory("indoor");
                    navigate("/Venues", { state: category });
                  }}
                  className="bg-gray-200 hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Indoor
                </div>
                <div
                  onClick={() => {
                    setCategory("outdoor");
                    navigate("/Venues", { state: category });
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Outdoor
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

      <h1 className="lg:text-2xl font-medium p-2 pb-1 px-6 text-lg pt-4">
            Venue Location
          </h1>
          <div className="px-6 w-full flex justify-center">
            <MapContainer data={data} />
          </div>

          {/* <div className="flex justify-between ">
            <div className="text-sm">Visited 4133 Times , 9 Times in Day</div>
          </div> */}
          <div className="pl-12 pr-16 pb-2 w-full flex justify-center">
          <FacebookComments
              dataHref="https://www.bezkoder.com/vue-3-authentication-jwt/"
              // dataHref={currentUrl}
              numPosts={10}
              width="1600"
            />
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

export default GetVenueById;
