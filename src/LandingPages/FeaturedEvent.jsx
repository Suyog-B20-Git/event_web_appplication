import React, { useContext, useEffect, useRef, useState } from "react";
import Overview from "../Components/FeaturedEvent/OverView";
import EventInfo from "../Components/FeaturedEvent/EventInfo";
import RatingReview from "../Components/FeaturedEvent/RatingReview";
import Speakers from "../Components/FeaturedEvent/Speakers";
import WatchTrailer from "../Components/FeaturedEvent/WatchTrailer";
import Sponsors from "../Components/FeaturedEvent/Sponsors";
import EventHeading from "../Components/FeaturedEvent/EventHeading";
import Dj from "../Components/FeaturedEvent/Dj";
import Button from "../Components/Button";
import { FaPhoneAlt, FaTelegramPlane } from "react-icons/fa";
import { IoIosContact, IoMdStar } from "react-icons/io";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import GetTicket from "../Components/FeaturedEvent/GetTicket";
import EventGallery from "../Components/FeaturedEvent/EventGallery";
import MeditationForm from "../Components/FeaturedEvent/MeditationForm";
import PerformersSection from "../Components/Performers/PerformersSection";
import { TiBookmark } from "react-icons/ti";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../Components/Util/ContextProvider";
import LoginModal from "../Components/FeaturedEvent/LoginModal";
import Guest from "../Components/FeaturedEvent/Guest";
import RegisterModal from "../Components/FeaturedEvent/RegisterModal";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaEye, FaHeart } from "react-icons/fa6";
import {
  MdDateRange,
  MdOutlineMailOutline,
  MdOutlineEventRepeat,
} from "react-icons/md";
import { PiBuildingApartmentFill, PiBookmarkThin } from "react-icons/pi";
import OrganiserContact from "../Components/FeaturedEvent/OrganiserContact";
import { useDispatch, useSelector } from "react-redux";
import Collapsible from "react-collapsible";
import {
  getEventById,
  getEventByCategoryAndSlug,
  getEventBySlug,
} from "../redux/actions/master/Events/getEventById";
import EnquiryForm from "../Components/Organizer/EnquiryForm";
import { addFavouriteEvent } from "../redux/actions/master/Events/AddFavouriteEvent";
import getFavoriteEventReducer from "../redux/reducers/pages/Events/getFavoriteEvent";
import { getFavouriteEventData } from "../redux/actions/master/Events/GetFavouriteEvent";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteFavouriteEvent } from "../redux/actions/master/Events/deleteFavouriteEvent";
import fallbackImage from "/public/assets/staticAssets/fallback-image.jpg";
import VenueData from "../Components/FeaturedEvent/VenueData";
import TicketPrice from "../Components/FeaturedEvent/TicektPrice";
import { IoShareSocialOutline } from "react-icons/io5"; // <-- IMPORT THE SHARE ICON

function FeaturedEvent() {
  const {
    categoryname: urlCategory,
    slug: urlSlug,
    eventId: eventId,
  } = useParams();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(false);
  const location = useLocation();
  const id = location.state;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [localIsFavorite, setLocalIsFavorite] = useState("isFavourite");
  const [enquirySent, setEnquirySent] = useState(false);

  const store = useSelector((state) => state.getEventByIdReducer) || {
    eventData: [],
  };
  const receivedData = store.eventData;

  const updateStartDateTime = new Date(receivedData.startDate).toLocaleString(
    "en-IN",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }
  );

  const updateEndDateTime = new Date(receivedData.endDate).toLocaleString(
    "en-IN",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }
  );

  const youtubeVideoUrl = receivedData.youtubeVideoUrls;
  const VenuesData = Array.isArray(receivedData?.venue)
    ? receivedData?.venue
    : receivedData?.venue
      ? [receivedData.venue]
      : [];

  const formatImageUrl = (url) => {
    if (!url) return fallbackImage;
    return url.replace(/\\/g, "/");
  };

  const thumbnailImage = formatImageUrl(receivedData?.media?.thumbnailImage);
  const posterImage = formatImageUrl(receivedData?.media?.posterImage);
  const phoneNumber = receivedData?.organizer?.phoneNumber?.trim();
  const hasPhoneNumber = phoneNumber !== "" && phoneNumber !== undefined;
  const organizerEmail = receivedData?.organizer?.email?.trim();

  const togglePhone = () => {
    if (hasPhoneNumber) {
      setShowNumber((prev) => !prev);
    }
  };

  const categoryname = urlCategory || receivedData?.category || "all-events";
  const slug = urlSlug || receivedData?.slug || "featured-event";
  const eventid = eventId || receivedData?._id || "null";
  const store1 = useSelector((state) => state.getFavoriteEventReducer) || {
    favouriteEventData: [],
  };
  let favouriteEvent = store1.favouriteEventData;
  const store2 = useSelector((state) => state.deleteFavoriteEventReducer) || {
    deletedFavouriteEventData: [],
  };
  const deletedFavouriteEvent = store2.deletedFavouriteEventData;

  const isFavourite = favouriteEvent.some(
    (event) => event._id === receivedData?._id
  );

  const name = receivedData.name;
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  useEffect(() => {
    setEnquirySent(false);
    const eventId = receivedData?._id;
    const oldKey = `enquiry_sent_${name}`;
    const newKey = eventId ? `enquiry_sent_${eventId}` : oldKey;
    const sent = localStorage.getItem(newKey) || localStorage.getItem(oldKey);
    if (sent === "true") {
      setEnquirySent(true);
    }
  }, [name, receivedData?._id]);

  const handleEnquirySent = () => {
    setEnquirySent(true);
    setEnquiry(false);
  };

  useEffect(() => {
    setLocalIsFavorite(isFavourite);
  }, [isFavourite]);

  const toggleFavorite = (id) => {
    if (!isLogin) {
      toast.error("Please login first to add to favourites!", {
        transition: Zoom,
        hideProgressBar: true,
        autoClose: 2000,
      });
      return;
    }
    if (localIsFavorite) {
      setLocalIsFavorite(false);
      dispatch(deleteFavouriteEvent(id));
    } else {
      setLocalIsFavorite(true);
      dispatch(addFavouriteEvent(id));
    }
    dispatch(getFavouriteEventData(setLoading));
  };

  const handleGetTicketClick = () => {
    navigate("/bookTicket", {
      state: { data: receivedData },
    });
  };

  // --- NEW SHARE FUNCTION ---
  const handleShare = async () => {
    const shareData = {
      title: receivedData.name || "Check out this event!",
      text: `I found this event, '${receivedData.name}', and thought you might be interested.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getEventById(id, setLoading));
    } else if (slug) {
      dispatch(getEventBySlug(slug, setLoading));
    }
    dispatch(getFavouriteEventData(setLoading));
  }, [dispatch, id, slug]);

  useEffect(() => {
    if (receivedData && receivedData.category && receivedData._id) {
      const newPath = `/events/${(
        receivedData.category || ""
      ).toLowerCase()}/${receivedData._id}`;
      const currentPath = window.location.pathname;
      if (currentPath !== newPath) {
        navigate(newPath, {
          state: id,
          replace: true,
        });
      }
    }
  }, [receivedData, navigate, id]);

  const [modal, setModal] = useState(false);
  const {
    form,
    setForm,
    login,
    account,
    guest,
    setLogin,
    setAccount,
    setGuest,
  } = useContext(Context);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionRef = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const addToCalendar = () => {
    if (!receivedData.startDate) return;
    const eventTitle = encodeURIComponent(receivedData.name || "Event");
    const eventLocation = encodeURIComponent(
      `${receivedData.venue?.city || ""}, ${receivedData.venue?.country || ""}`
    );
    const eventDetails = encodeURIComponent(
      `Join us for ${receivedData.name}! More details: ${window.location.href}`
    );
    const startDate = new Date(receivedData.startDate)
      .toISOString()
      .replace(/-|:|\.\d+/g, "");
    const endDate = new Date(
      new Date(receivedData.startDate).getTime() + 2 * 60 * 60 * 1000
    )
      .toISOString()
      .replace(/-|:|\.\d+/g, "");
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${endDate}&details=${eventDetails}&location=${eventLocation}`;
    window.open(googleCalendarUrl, "_blank");
  };

  const formatTo12Hour = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours, 10);
    const minute = minutes;
    if (hour === 0) return `12:${minute} AM`;
    if (hour < 12) return `${hour}:${minute} AM`;
    if (hour === 12) return `12:${minute} PM`;
    return `${hour - 12}:${minute} PM`;
  };

  const SectionTitle = ({ children }) => (
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-pink-500 inline-block">
      {children}
    </h2>
  );

  return (
    <div className="bg-gray-100 font-sans">
      <section className="relative text-white pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-lg scale-110"
          style={{ backgroundImage: `url(${posterImage || thumbnailImage})` }}
        ></div>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-full md:w-1/4 lg:w-1/5 flex-shrink-0">
              <img
                src={posterImage}
                alt={receivedData.name || "Event Poster"}
                className="w-full h-auto object-cover rounded-xl shadow-2xl max-h-[300px] md:max-h-[350px] aspect-[2/3]"
              />
            </div>
            <div className="flex flex-col gap-3 w-full md:w-3/4 lg:w-4/5">
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                {receivedData.name || "Event Title"}
              </h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-lg font-medium text-gray-200">
                <p className="flex items-center gap-2">
                  <PiBookmarkThin className="text-pink-400" />
                  <span>{receivedData.category || "Category"}</span>
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-300 mt-2">
                <p className="flex items-center gap-2 text-sm">
                  <FaEye className="text-blue-400" />
                  <span>Total Views: {receivedData.visits || 0}</span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <FaEye className="text-blue-400" />
                  <span>Today's Views: {receivedData.dailyVisits || 0}</span>
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => toggleFavorite(receivedData._id)}
                  className={`flex items-center gap-2 font-semibold py-2 px-5 rounded-lg transition-colors duration-300 text-sm ${localIsFavorite
                      ? "bg-pink-100 text-[#ff2459]"
                      : "bg-gray-700/50 hover:bg-gray-600/50"
                    }`}
                >
                  <FaHeart />
                  <span>
                    {localIsFavorite
                      ? "Added to Favourites"
                      : "Add to Favourite"}
                  </span>
                </button>
                {/* --- SHARE BUTTON IN HERO --- */}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 font-semibold py-2 px-5 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors duration-300 text-sm"
                >
                  <IoShareSocialOutline />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/3 flex flex-col gap-10">
            {receivedData.isRepetitive === true && (
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <MdOutlineEventRepeat className="text-3xl text-pink-600" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Repeating Event Details
                  </h2>
                </div>
                <div className="space-y-3">
                  <p className="text-md font-semibold text-gray-700">
                    Repeats: {receivedData.repetitiveType}
                  </p>
                  {receivedData.repetitiveType === "Daily" && receivedData.repeatExcept?.length > 0 && (
                    <p className="text-md font-semibold text-red-600">
                      Except on: {receivedData.repeatExcept.join(", ")}
                    </p>
                  )}
                  {receivedData.repetitiveType === "Monthly" && (
                    <div className="flex flex-wrap gap-2">
                      {receivedData.repeatDates.sort((a, b) => parseInt(a) - parseInt(b)).map((date, idx) => (
                        <div key={idx} className="bg-[#ff2459] text-white px-3 py-1 rounded-full text-sm font-medium shadow">
                          {date}
                        </div>
                      ))}
                    </div>
                  )}
                  {receivedData.repetitiveType === "Weekly" && (
                    <div className="flex flex-wrap gap-2">
                      {receivedData.repeatDays.sort((a, b) => {
                        const dayOrder = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6, Sunday: 7 };
                        return dayOrder[a] - dayOrder[b];
                      }).map((day, idx) => (
                        <div key={idx} className="bg-[#ff2459] text-white px-3 py-1 rounded-full text-sm font-medium shadow">
                          {day}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="text-lg font-semibold text-gray-800">
                    Time: {formatTo12Hour(receivedData.repeatStartTime)} - {formatTo12Hour(receivedData.repeatEndTime)}
                  </div>
                </div>
              </div>
            )}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <SectionTitle>About The Event</SectionTitle>
              <p className="text-lg text-gray-600 mt-2 leading-relaxed">
                {receivedData.description || "Description not available."}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <SectionTitle>Event Performers</SectionTitle>
              <div className="mt-2">
                <PerformersSection performerIds={receivedData.performers} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <SectionTitle>Event Gallery</SectionTitle>
              {Array.isArray(receivedData?.media?.images) && receivedData.media.images.length > 0 ? (
                <EventGallery data={receivedData.media.images} />
              ) : (
                <p className="text-lg text-gray-600 mt-2">No images available.</p>
              )}
            </div>
            {Array.isArray(receivedData.youtubeVideoUrls) && receivedData.youtubeVideoUrls.some(url => url && url.trim() !== "") && (
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <SectionTitle>Watch Videos</SectionTitle>
                <WatchTrailer youtubeVideoUrl={youtubeVideoUrl} />
              </div>
            )}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <SectionTitle>Tags</SectionTitle>
              {Array.isArray(receivedData?.eventTags) && receivedData.eventTags.map(tag => typeof tag === 'object' && tag !== null ? tag.name : tag).filter(tagName => tagName && tagName.trim() !== "").length > 0 ? (
                <div className="flex flex-wrap gap-3 mt-2">
                  {receivedData.eventTags.map(tag => typeof tag === 'object' && tag !== null ? tag.name : tag).filter(tagName => tagName && tagName.trim() !== "").map((tagName, index) => (
                    <Button key={index} text={tagName} variant={"primary"} textSize={"text-sm"} rounded={"rounded-full"} />
                  ))}
                </div>
              ) : (
                <p className="text-lg text-gray-600 mt-2">No Tags available.</p>
              )}
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="sticky top-24 flex flex-col gap-8">
              <div ref={sectionRef} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Tickets & Event Info
                </h3>
                <div className="space-y-3 text-gray-700 font-medium mb-5">
                  <p className="flex items-start gap-3">
                    <CiCalendarDate className="text-pink-500 text-xl mt-1 flex-shrink-0" />
                    <span>{receivedData?.startDate ? updateStartDateTime : "--"}</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <CiLocationOn className="text-pink-500 text-xl mt-1 flex-shrink-0" />
                    <span>
                      {receivedData.venue?.city && receivedData.venue?.country
                        ? `${receivedData.venue.city}, ${receivedData.venue.country}`
                        : receivedData.venue?.name || "Online"}
                    </span>
                  </p>
                </div>
                <hr className="my-4" />
                <div className="mt-4">
                  {receivedData?.ticketFormats?.length > 0 ? (
                    <div
                      onClick={() => {
                        setForm(!form);
                        handleGetTicketClick();
                      }}
                      style={{ cursor: "pointer" }}
                      className="block"
                    >
                      <GetTicket
                        start={updateStartDateTime}
                        eTime={updateEndDateTime}
                      />
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500 select-none">
                      No tickets available for this event.
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Organizer
                </h3>
                <div className="h-16 w-16 rounded-full bg-pink-500 flex items-center justify-center text-white text-2xl font-bold mx-auto">
                  {receivedData.organizer?.username?.charAt(0).toUpperCase() || "O"}
                </div>
                <p className="font-semibold text-lg pt-3">
                  {receivedData.organizer?.name || receivedData.organizer?.username || "Organizer Name"}
                </p>
                <p className="flex items-center justify-center text-sm text-gray-500 gap-1 mt-1">
                  <PiBuildingApartmentFill />
                  {receivedData.venue?.city || "-"},{" "}
                  {receivedData.venue?.country || "-"}
                </p>
                <hr className="my-4" />
                <div className="space-y-3 text-left">
                  <p className="flex items-center gap-3 text-sm text-gray-700">
                    <MdOutlineMailOutline className="text-lg text-pink-500" />
                    <span className="truncate">{receivedData.organizer?.email || "Not available"}</span>
                  </p>
                  <p className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer" onClick={togglePhone}>
                    <FaPhoneAlt className="text-lg text-pink-500" />
                    <span>
                      {hasPhoneNumber ? (showNumber ? phoneNumber : "View Contact") : "Not available"}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (!organizerEmail) {
                      toast.error("Organizer email not available.");
                      return;
                    }
                    setIsFormOpen(true);
                  }}
                  className="flex items-center justify-center shadow p-2 gap-2 w-full mt-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <IoIosContact className="text-xl text-pink-500" />
                  Contact Organizer
                </button>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      if (!isLogin) {
                        toast.error("Please login first to send enquiry!", { transition: Zoom, hideProgressBar: true, autoClose: 2000 });
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
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${enquirySent ? "text-pink-600 bg-pink-50 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}>
                    <IoIosInformationCircleOutline className="text-xl" />
                    <span className="font-medium">{enquirySent ? "Enquiry Sent" : "Send Enquiry"}</span>
                  </button>
                  <button onClick={addToCalendar} className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                    <MdDateRange className="text-xl" />
                    <span className="font-medium">Add to My Calendar</span>
                  </button>
                  {/* --- SHARE BUTTON IN STICKY COLUMN --- */}
                  <button onClick={handleShare} className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                    <IoShareSocialOutline className="text-xl" />
                    <span className="font-medium">Share Event</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-lg">
            <OrganiserContact
              isFormOpen={isFormOpen}
              setIsFormOpen={setIsFormOpen}
              OrganizerName={name}
              OrganizerEmail={organizerEmail}
            />
          </div>
        </div>
      )}
      {login && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-full">
            <div className="absolute top-2 right-2">
              <Button
                text={"X"}
                textSize={"text-xs"}
                variant={"primary"}
                rounded={"rounded-full"}
                onClick={() => {
                  setForm(true);
                  setLogin(false);
                }}
              />
            </div>
            {account ? <LoginModal /> : guest ? <Guest /> : <RegisterModal />}
            <div className="flex flex-col sm:flex-row gap-2 justify-center mt-4 text-center">
              {!guest && (
                <p className="cursor-pointer text-sm" onClick={() => setAccount(!account)}>
                  {account ? "Don't have an account?" : "Already have an account?"}
                </p>
              )}
              <p
                className="text-[#ff2459] font-medium text-sm cursor-pointer"
                onClick={() => {
                  if (guest) {
                    setGuest(false);
                  } else if (!account) {
                    setGuest(true);
                  } else {
                    setAccount(false);
                  }
                }}
              >
                {account ? "Register here" : guest ? "Back to Login" : "Checkout as Guest"}
              </p>
            </div>
          </div>
        </div>
      )}
      {enquiry && (
        <EnquiryForm
          setEnquiry={setEnquiry}
          onEnquirySent={handleEnquirySent}
          name={name}
          email={organizerEmail}
          enquiry={enquiry}
          targetId={receivedData?._id}
          modelName="Event"
        />
      )}
    </div>
  );
}

export default FeaturedEvent;