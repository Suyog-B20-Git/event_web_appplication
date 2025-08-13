import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";

import {
  MdKeyboardDoubleArrowRight,
  MdOutlineNavigateNext,
  MdEmail,
} from "react-icons/md";
import {
  FaEye,
  FaFacebook,
  FaFacebookMessenger,
  FaHeart,
  FaInstagram,
  FaLocationDot,
  FaShare,
  FaSquareFacebook,
  FaSquareXTwitter,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
  FaGlobe,
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
import { getVenueById } from "../../redux/actions/master/Venue/getVenueById";
import YouTubeProfile from "../SocialMedia/Youtube";
import InstagramProfile from "../SocialMedia/Instagram";
import FacebookEmbeded from "../SocialMedia/Facebook";
import VenueStats from "../SocialMedia/VenueStat";
import { getFavouriteVenueData } from "../../redux/actions/master/Venue/getFavouriteVenue";
import { toast, Zoom } from "react-toastify";
import { postFavouriteVenue } from "../../redux/actions/master/Venue/postFavouriteVenueReducer";
import { deleteFavouriteVenue } from "../../redux/actions/master/Venue/deleteFavouriteVenue";
import {
  getUpcomingEventsDataForProfile,
} from "../../redux/actions/master/Events/UpcomingEvent";
import TwitterEmbed from "../SocialMedia/TwiiterEmbed.jsx";
import FollowButton from "../FollowButton.jsx";
import CommonCalendar from "../CommonCalendar.jsx";
import YouTubeWall from "../SocialMedia/YouTubeWall.jsx";

function GetVenueById() {
  const { venueId } = useParams();
  const [isPopUp, setIsPopUp] = useState(false);
  const [category, setCategory] = useState("");
  const [localIsFavorite, setLocalIsFavorite] = useState("isFavourite");
  const [enquiry, setEnquiry] = useState(false);
  const [ownership, setOwnership] = useState(false);

  
  const [about, setAbout] = useState(true);
  const [upcoming, setUpcoming] = useState(false);
  const [social, setSocial] = useState(false);
  const [stat, setStat] = useState(false);

  const [activeSocialTab, setActiveSocialTab] = useState('');

  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareRef = useRef(null);

  const navigate = useNavigate();
  const [enquirySent, setEnquirySent] = useState(false);
  const [ownershipEnquirySent, setOwnershipEnquirySent] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showNumber, setShowNumber] = useState(false);

  const fallbackImage =
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG9yZ2FuaXplcnxlbnwwfHx8fDE2OTY5NzQ1NTg&ixlib=rb-4.0.3&q=80&w=1080";

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

  const upcomingEventData =
    useSelector((state) => state.upcomingEventReducer?.upcomingEventData) || [];

  const store = useSelector((state) => state.getVenueByIdReducer) || {
    venueData: [],
  };

  const data = store.venueData || {};
  const coverImage = data?.coverImage;
  const formatteddUrl = coverImage
    ? coverImage.replace(/\\/g, "/").replace(/\/{2,}/g, "/").replace("http:/", "http://")
    : fallbackImage;
  const email = data?.email;
  const name = data?.name;
  const targetId = data?._id;
  const modelName = "Venue";
  const currentUrl = encodeURIComponent(window.location.href);

  const store1 = useSelector((state) => state.getFavouriteVenueReducer) || {
    favouriteVenueData: [],
  };

  const favouriteVenue = store1.favouriteVenueData;

  const isFavourite = favouriteVenue.some((fav) => fav._id === data._id);
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  useEffect(() => {
    if (data && Object.keys(data).length > 0 && activeSocialTab === '') {
      const socialPlatforms = [
        data.facebookUrl && 'facebook',
        data.instagramUrl && 'instagram',
        data.youtubeId && 'youtube',
        data.twitterUrl && 'twitter',
      ].filter(Boolean);

      if (socialPlatforms.length > 0) {
        setActiveSocialTab(socialPlatforms[0]);
      }
    }
  }, [data, activeSocialTab]);

  const togglePhoneVisibility = () => {
    setShowNumber((prev) => !prev);
  };
  const hasPhoneNumber = data?.phoneNumber && data.phoneNumber.trim() !== "";

  useEffect(() => {
    if (name) {
      setEnquirySent(false);
      const sent = localStorage.getItem(`enquiry_sent_${name}`);
      if (sent === "true") {
        setEnquirySent(true);
      }
    }
  }, [name]);

  const handleEnquirySent = () => {
    setEnquirySent(true);
    setEnquiry(false);
  };

  useEffect(() => {
    if (targetId) {
      setOwnershipEnquirySent(false);
      const sent = localStorage.getItem(`enquiry_sent_${targetId}`);
      if (sent === "true") {
        setOwnershipEnquirySent(true);
      }
    }
  }, [targetId]);

  const handleOwnershipEnquirySent = () => {
    setOwnershipEnquirySent(true);
    setOwnership(true);
  };

  useEffect(() => {
    dispatch(getFavouriteVenueData(setLoading));
  }, [dispatch]);

  useEffect(() => {
    setLocalIsFavorite(isFavourite);
  }, [isFavourite]);

  const toggleFavorite = (id) => {
    if (localIsFavorite) {
      setLocalIsFavorite(false);
      dispatch(deleteFavouriteVenue(id));
    } else {
      setLocalIsFavorite(true);
      dispatch(postFavouriteVenue(id));
    }
    dispatch(getFavouriteVenueData(setLoading));
  };

  useEffect(() => {
    dispatch(getVenueById(venueId, setLoading));
    dispatch(getFavouriteVenueData(setLoading));
  }, [dispatch, venueId]);

  const shareUrls = {
    whatsapp: `https://api.whatsapp.com/send?text=${currentUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}`,
    messenger: `https://www.messenger.com/t/?link=${currentUrl}`,
  };
  const handleShare = (platform) => {
    window.open(shareUrls[platform], "_blank");
  };

  const handleMainTabClick = (tabName) => {
    setAbout(tabName === "about");
    setUpcoming(tabName === "upcoming");
    setSocial(tabName === "social");
    setStat(tabName === "stat");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShareOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shareRef]);
  
  const ensureUrlProtocol = (url) => {
    if (!url) return "#";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `https://${url}`;
  };

  const fullAddress = [data.address, data.city, data.state, data.country].filter(Boolean).join(', ');

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="">
      <div className="flex lg:flex-row flex-col gap-2">
        <div className="lg:pt-6 md:pt-0 pt-20 bg-gray-100 lg:w-[75%] lg:px-4 pb-12">
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
                  navigate("/venues");
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
            className="text-white flex flex-col justify-around gap-4 lg:pt-10 pt-3 lg:px-8 lg:p-2 min-h-[200px]"
            style={{
              backgroundImage: `url(${formatteddUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex flex-col gap-4 lg:px-0 px-2 ">
                <div className="flex justify-between items-center">
                    <h1
                        className="text-white  font-medium lg:text-4xl text-2xl"
                        style={{ textShadow: "1px 1px 1px black" }}
                    >
                        {data.name}
                    </h1>
                    <div className="flex items-center shrink-0 gap-2 md:gap-4">
                        <FollowButton targetId={targetId} modelName={modelName} />
                        <button className="lg:hidden" onClick={() => setIsPopUp(!isPopUp)}>
                            <CiMenuKebab className="text-white text-2xl md:text-3xl"/>
                        </button>
                    </div>
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
            <div className="lg:flex hidden w-full justify-end p-1 mt-auto">
              <div ref={shareRef} className="relative flex items-center bg-white text-gray-900 w-max p-1.5 lg:text-base text-xs px-2 rounded-full shadow-sm">
                <p
                  className={`py-1 px-3 flex items-center gap-1.5 cursor-pointer hover:text-[#ff2459] ${ownershipEnquirySent ? "text-[#ff2459] cursor-not-allowed" : ""
                    }`}
                  onClick={() => {
                    if (!isLogin) toast.error("Please login first to send enquiry!");
                    else setOwnership(!ownership);
                  }}
                >
                  <CiCircleInfo />
                  {ownershipEnquirySent ? "Claim Enquiry Sent" : "Claim Ownership"}
                </p>
                <p
                  className={`py-1 px-3 flex items-center gap-1.5 cursor-pointer hover:text-[#ff2459] ${enquirySent ? "text-[#ff2459] cursor-not-allowed" : ""
                    }`}
                  onClick={() => {
                    if (!isLogin) toast.error("Please login first to send enquiry!");
                    else if (!email) toast.error("Venue email not available.");
                    else if (!enquirySent) setEnquiry(!enquiry);
                  }}
                >
                  <CiCircleInfo />
                  {enquirySent ? "Enquiry Sent" : "Send Enquiry"}
                </p>
                <div className="border-l h-5 mx-2 bg-gray-200"></div>
                <button
                  onClick={() => toggleFavorite(data._id)}
                  className={`py-1 px-3 flex items-center gap-1.5 hover:text-[#ff2459] rounded-full hover:bg-gray-100 ${localIsFavorite ? "text-[#ff2459]" : "text-gray-900"
                    }`}
                >
                  <FaHeart />
                  {localIsFavorite ? "Added" : "Add Favourite"}
                </button>
                <button
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="py-1 px-3 flex items-center gap-1.5 hover:text-[#ff2459] rounded-full hover:bg-gray-100"
                >
                  <FaShare />
                  Share
                </button>
                {showShareOptions && (
                  <div className="absolute bottom-full mb-2 right-0 bg-white border rounded-lg shadow-xl p-2 flex gap-3 z-20">
                    <FaSquareFacebook onClick={() => handleShare("facebook")} className="cursor-pointer text-blue-600 text-3xl hover:scale-110 transition-transform" />
                    <FaWhatsapp onClick={() => handleShare("whatsapp")} className="cursor-pointer text-green-500 text-3xl hover:scale-110 transition-transform" />
                    <FaFacebookMessenger onClick={() => handleShare("messenger")} className="cursor-pointer text-blue-700 text-3xl hover:scale-110 transition-transform" />
                    <FaSquareXTwitter onClick={() => handleShare("twitter")} className="cursor-pointer text-black text-3xl hover:scale-110 transition-transform" />
                  </div>
                )}
              </div>
            </div>
          </div>
          {isPopUp && (
            <div className="lg:hidden block">
              <div className="fixed w-full inset-0 flex flex-col items-center md:items-end justify-start pt-52 md:pt-42 md:pr-10 overflow-y-scroll z-40">
                <div className="bg-white rounded-lg shadow-lg lg:w-full relative p-4">
                  <button
                    className="absolute top-0 right-2 text-gray-900 hover:text-red-500 text-3xl"
                    onClick={() => setIsPopUp(false)}
                  >
                    &times;
                  </button>
                  <div className="flex flex-col gap-2 px-0 h-[170px] w-[300px] border rounded mt-6">
                    <button
                      className={`flex gap-3 md:text-xs lg:text-xs ml-4 mt-3  hover:text-[#ff2459] ${ownershipEnquirySent
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
                      className={`flex gap-3 md:text-xs lg:text-xs ml-4 mt-3 hover:text-[#ff2459] ${enquirySent
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
                      className={`flex gap-3 p-4 px-4 bg-white hover:text-white hover:bg-[#ff2459] ${localIsFavorite ? "text-[#ff2459]" : "text-gray-900"
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
            <div className="lg:w-full rounded-lg">
              <div className="sticky top-0 z-10 bg-gray-50">
                <div className="text-gray-500 lg:text-base text-sm flex border-b font-medium justify-around p-2">
                  <button
                    className={`px-3 py-2 rounded-lg ${about ? "bg-white shadow" : "hover:bg-gray-100"
                      }`}
                    onClick={() => handleMainTabClick("about")}
                  >
                    ABOUT
                  </button>
                  <button
                    className={`px-3 py-2 rounded-lg ${upcoming ? "bg-white shadow" : "hover:bg-gray-100"
                      }`}
                    onClick={() => handleMainTabClick("upcoming")}
                  >
                    EVENT
                  </button>
                  <button
                    className={`px-3 py-2 rounded-lg ${social ? "bg-white shadow" : "hover:bg-gray-100"
                      }`}
                    onClick={() => handleMainTabClick("social")}
                  >
                    SOCIAL
                  </button>
                  <button
                    className={`px-3 py-2 rounded-lg ${stat ? "bg-white shadow" : "hover:bg-gray-100"
                      }`}
                    onClick={() => handleMainTabClick("stat")}
                  >
                    STAT
                  </button>
                </div>
              </div>
              <div className="lg:px-4 p-2 border-x border-b bg-white rounded-b-lg">
                {about && data && (
                  <div className="py-5 space-y-6 bg-white rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      About the Venue
                    </h2>
                    <p className="py-1 text-gray-600">
                      {data?.description || "No description available"}
                    </p>
                    
                  
                    <div className="pt-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Venue Highlights</h2>
                        <ul className="space-y-4 list-disc list-inside text-gray-700">
                          <li>
                            <strong>Spacious Main Hall:</strong> Accommodates up to 500 guests, perfect for large weddings and corporate events.
                          </li>
                          <li>
                            <strong>State-of-the-Art Sound System:</strong> Equipped with professional-grade audio equipment for crystal-clear sound.
                          </li>
                          <li>
                            <strong>Ample Parking Space:</strong> On-site parking available for over 200 vehicles with valet service options.
                          </li>
                          <li>
                            <strong>In-House Catering:</strong> Award-winning culinary team offering a diverse range of menu options.
                          </li>
                          <li>
                            <strong>Scenic Outdoor Area:</strong> Beautifully landscaped garden area for outdoor ceremonies and receptions.
                          </li>
                          <li>
                            <strong>Fully Air-Conditioned:</strong> Complete climate control for comfort in any season.
                          </li>
                        </ul>
                    </div>
                  </div>
                )}
                {upcoming && (
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center p-4">

                  </div>
                )}
                {social && (
                  <div>
                    <div className="flex border-b my-4 space-x-4 lg:space-x-6 text-sm lg:text-base overflow-x-auto scrollbar-hide">
                      <button
                        onClick={() => data.facebookUrl && setActiveSocialTab("facebook")}
                        disabled={!data.facebookUrl}
                        className={`py-2 px-3 whitespace-nowrap flex items-center gap-2 rounded-t-lg -mb-px ${activeSocialTab === "facebook"
                            ? "bg-white text-blue-600 font-semibold border-t border-x"
                            : "text-gray-500 hover:text-blue-600"
                          } disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-500`}
                      >
                        <FaFacebook /> Facebook
                      </button>
                      <button
                        onClick={() => data.instagramUrl && setActiveSocialTab("instagram")}
                        disabled={!data.instagramUrl}
                        className={`py-2 px-3 whitespace-nowrap flex items-center gap-2 rounded-t-lg -mb-px ${activeSocialTab === "instagram"
                            ? "bg-white text-pink-600 font-semibold border-t border-x"
                            : "text-gray-500 hover:text-pink-600"
                          } disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-500`}
                      >
                        <FaInstagram /> Instagram
                      </button>
                      <button
                        onClick={() => data.youtubeId && setActiveSocialTab("youtube")}
                        disabled={!data.youtubeId}
                        className={`py-2 px-3 whitespace-nowrap flex items-center gap-2 rounded-t-lg -mb-px ${activeSocialTab === "youtube"
                            ? "bg-white text-red-600 font-semibold border-t border-x"
                            : "text-gray-500 hover:text-red-600"
                          } disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-500`}
                      >
                        <FaYoutube /> YouTube
                      </button>
                      <button
                        onClick={() => data.twitterUrl && setActiveSocialTab("twitter")}
                        disabled={!data.twitterUrl}
                        className={`py-2 px-3 whitespace-nowrap flex items-center gap-2 rounded-t-lg -mb-px ${activeSocialTab === "twitter"
                            ? "bg-white text-sky-500 font-semibold border-t border-x"
                            : "text-gray-500 hover:text-sky-500"
                          } disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-500`}
                      >
                        <FaTwitter /> Twitter
                      </button>
                    </div>
                    <div className="py-4">
                      {activeSocialTab === 'facebook' && data.facebookUrl && <FacebookEmbeded appId="849920522233544" fbId={data.facebookUrl} />}
                      {activeSocialTab === 'instagram' && data.instagramUrl && <InstagramProfile instagramUrl={data.instagramUrl} />}
                      {activeSocialTab === 'youtube' && data.youtubeId && <YouTubeWall channelId={data.youtubeId} />}
                      {activeSocialTab === 'twitter' && data.twitterUrl && <TwitterEmbed twitterUrl={data.twitterUrl} />}
                      {activeSocialTab === '' && <p className="text-center text-gray-500 p-8">No social media profiles available for this venue.</p>}
                    </div>
                  </div>
                )}
                {stat && <VenueStats data={data} />}
              </div>
            </div>
          </div>
          
          <div className="lg:flex lg:gap-4 mt-4 w-full">
            <div className="lg:w-1/2 w-full mb-4 lg:mb-0">
                <div className="shadow-lg bg-white h-full rounded-lg overflow-hidden">
                    <h1 className="font-semibold text-xl p-3 border-b">Location</h1>
                    <MapContainer data={data} />
                </div>
            </div>
            <div className="lg:w-1/2 w-full">
                <div className="shadow-lg bg-white h-full rounded-lg p-4 flex flex-col">
                    <h1 className="font-semibold text-xl pb-3 border-b mb-4">Venue Details</h1>
                    <div className="flex flex-col gap-y-4">
                        {fullAddress && (
                            <div className="flex items-start gap-4">
                                <FaLocationDot className="text-gray-500 mt-1 text-xl shrink-0" />
                                <span className="text-gray-700">{fullAddress}</span>
                            </div>
                        )}
                        {data.phoneNumber && (
                            <div className="flex items-center gap-4">
                                <FaPhoneAlt className="text-gray-500 text-xl shrink-0" />
                                <span className="text-gray-700">{data.phoneNumber}</span>
                            </div>
                        )}
                        {email && (
                            <div className="flex items-center gap-4">
                                <MdEmail className="text-gray-500 text-xl shrink-0" />
                                <a href={`mailto:${email}`} className="text-blue-600 hover:underline break-all">{email}</a>
                            </div>
                        )}
                        {data.website && (
                            <div className="flex items-center gap-4">
                                <FaGlobe className="text-gray-500 text-xl shrink-0" />
                                <a href={ensureUrlProtocol(data.website)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{data.website}</a>
                            </div>
                        )}
                        {!fullAddress && !data.phoneNumber && !email && !data.website && (
                            <p className="text-gray-500">No contact details provided.</p>
                        )}
                    </div>
                </div>
            </div>
          </div>
          
          <div className="w-full mt-4">
            <div className="shadow-lg bg-white rounded-lg">
                <h1 className="font-semibold text-xl p-3 border-b">Comments</h1>
                <div className="p-2">
                    <FacebookComments dataHref="https://www.bezkoder.com/vue-3-authentication-jwt/" />
                </div>
            </div>
          </div>

          <div className=" lg:hidden flex flex-col gap-5 rounded  px-3 mt-4">
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
                        navigate("/venues/indoor", { state: category });
                      }}
                      className="bg-gray-200 hover:bg-[#ff2459] hover:text-white     w-max rounded-full font-medium p-1 px-4 text-xs "
                    >
                      Indoor
                    </div>
                    <div
                      onClick={() => {
                        setCategory("outdoor");
                        navigate("/venues/outdoor", { state: category });
                      }}
                      className="bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white     w-max rounded-full font-medium p-1 px-4 text-xs "
                    >
                      Outdoor
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
          <div className="lg:flex hidden flex-col gap-5 border justify-center bg-white shadow-md   w-[95%] ml-3 ">
            <div className=" p-3  shadow gap-2 ">
              <h1 className="text-lg font-medium text-gray-900 p-1 border-b ">
                Services Category
              </h1>
              <section className="flex flex-wrap gap-3 pt-3 justify-start items-start">
                <div className="flex gap-2 ">
                  <div
                    onClick={() => {
                      setCategory("indoor");
                      navigate("/venues/indoor", { state: category });
                    }}
                    className="bg-gray-200 hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                  >
                    Indoor
                  </div>
                  <div
                    onClick={() => {
                      setCategory("outdoor");
                      navigate("/venues/outdoor", { state: category });
                    }}
                    className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                  >
                    Outdoor
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
          email={email}
          enquiry={enquiry}
        />
      )}
    </div>
  );
}

export default GetVenueById;