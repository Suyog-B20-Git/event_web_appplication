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

import { TiBookmark } from "react-icons/ti";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../Components/Util/ContextProvider";
import LoginModal from "../Components/FeaturedEvent/LoginModal";
import Guest from "../Components/FeaturedEvent/Guest";
import RegisterModal from "../Components/FeaturedEvent/RegisterModal";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaEye, FaHeart } from "react-icons/fa6";
import { MdDateRange, MdOutlineMailOutline } from "react-icons/md";
import { PiBuildingApartmentFill } from "react-icons/pi";
import OrganiserContact from "../Components/FeaturedEvent/OrganiserContact";
import { useDispatch, useSelector } from "react-redux";
import Collapsible from "react-collapsible";
import {
  getEventById,
  getEventByCategoryAndSlug,
  getEventBySlug,
} from "../redux/actions/master/Events/getEventById";
import MapContainer from "../Components/CreatePage/MapComponent";
import EnquiryForm from "../Components/Organizer/EnquiryForm";
import { addFavouriteEvent } from "../redux/actions/master/Events/AddFavouriteEvent";
import getFavoriteEventReducer from "../redux/reducers/pages/Events/getFavoriteEvent";
import { getFavouriteEventData } from "../redux/actions/master/Events/GetFavouriteEvent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteFavouriteEvent } from "../redux/actions/master/Events/deleteFavouriteEvent";

function FeaturedEvent() {
  const {
    categoryname: urlCategory,
    slug: urlSlug,
    eventId: eventId,
  } = useParams();
  console.log("Event ID:", eventId);
  console.log("Category Name:", urlCategory);
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(false);
  const location = useLocation();
  const id = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [localIsFavorite, setLocalIsFavorite] = useState("isFavourite");
  const [enquirySent, setEnquirySent] = useState(false);

  const store = useSelector((state) => state.getEventByIdReducer) || {
    eventData: [],
  };
  const receivedData = store.eventData;
  console.log("Received Data from getEventByIdReducer:", receivedData);
  const phoneNumber = receivedData?.organizer?.phoneNumber?.trim();
  const hasPhoneNumber = phoneNumber !== "" && phoneNumber !== undefined;
  const organizerEmail = receivedData?.organizer?.email?.trim();
  console.log("Organizer Email from the FeaturedEvent page", organizerEmail);
  const togglePhone = () => {
    if (hasPhoneNumber) {
      setShowNumber((prev) => !prev);
    }
  };

  const categoryname = urlCategory || receivedData?.category || "all-events";
  const slug = urlSlug || receivedData?.slug || "featured-event";
  const eventid = eventId || receivedData?._id || "null";
  console.log("eventIdddddddddd", eventid);
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
  console.log("eventName", name);

  useEffect(() => {
    setEnquirySent(false);

    const sent = localStorage.getItem(`enquiry_sent_${name}`);
    console.log("is Sent for", name, ":", sent);
    if (sent === "true") {
      setEnquirySent(true);
    }
  }, [name]);

  const handleEnquirySent = () => {
    setEnquirySent(true);
    setEnquiry(false);
  };

  useEffect(() => {
    setLocalIsFavorite(isFavourite);
  }, [isFavourite]);

  const toggleFavorite = (id) => {
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


  useEffect(() => {
    console.log("FeaturedEvent useEffect running with params:", {
      id,
      categoryname,
      slug,
    });

    if (id) {
      dispatch(getEventById(id, setLoading));
    } else if (slug) {
      dispatch(getEventBySlug(slug, setLoading));
    }
    dispatch(getFavouriteEventData(setLoading));
  }, [dispatch, id, slug]);

  useEffect(() => {
    if (receivedData && receivedData.category && receivedData._id) {
      // Include /events in the path to match your route configuration
      const newPath = `/events/${(receivedData.category || "").toLowerCase()}/${
        receivedData._id
      }`;
      console.log("New Path:", newPath);

      // Check if current path is different to avoid navigation loops
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
  // const [form, setForm] = useState(false);
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
    receivedData.startDate && extractDateAndTime();
  }, []);

  console.log("Received Data:", receivedData);
  console.log("Organizer Data:", receivedData.organizer);
  console.log("Phone:", receivedData.organizer?.phoneNumber);

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const extractDateAndTime = () => {
    const date = new Date(receivedData.startDate);

    // Extract date in YYYY-MM-DD format
    const formattedDate = date.toISOString().split("T")[0];
    console.log("formattedDate from the FeaturedEvent page", formattedDate);
    // Extract time in 12-hour format (HH:MM AM/PM)
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, 
    });
    console.log("FormattedTime from the FeaturedEvent page", formattedTime);
    setDate(formattedDate);
    setTime(formattedTime);
  };
  console.log("Date & Time:", date, time);
  const venueData = receivedData.venue || {};

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
      .replace(/-|:|\.\d+/g, ""); // Format: YYYYMMDDTHHMMSSZ
    const endDate = new Date(
      new Date(receivedData.startDate).getTime() + 2 * 60 * 60 * 1000 // Assuming a 2-hour event
    )
      .toISOString()
      .replace(/-|:|\.\d+/g, "");

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${endDate}&details=${eventDetails}&location=${eventLocation}`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className="">
      <div className="flex lg:flex-row flex-col gap-4 ">
        <div
          className="lg:w-[80%] flex justify-end items-end  h-[300px] md:h-[300px] lg:h-[450px] mt-20 sm:mt-0 relative"
          style={{
            backgroundImage: `url(${
              receivedData.media?.thumbnailImage ||
              "assets/staticAssets/fallback-image.jpg"
            })`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute top-4 right-2 bg-white/70 rounded-lg p-2 flex gap-4 block md:block lg:hidden">
            <p className="flex gap-1 md:text-xs lg:text-xs text-[10px] font-bold text-gray-900">
              <FaEye className="relative top-0.5 text-blue-600" />
              <span>Total {receivedData.visits}</span>
            </p>
            <p className="flex gap-1 md:text-xs lg:text-xs text-[10px] font-bold text-gray-900">
              <FaEye className="relative top-0.5 text-blue-600" />
              <span>Daily {receivedData.dailyVisits}</span>
            </p>
          </div>

          <div className="flex justify-center gap-5 rounded bg-white/70 lg:w-max md:w-max w-full   p-2 text-black">
            <p
              onClick={() => {
                if (!enquirySent) {
                  setEnquiry(!enquiry);
                }
              }}
              className={`flex gap-1 md:text-xs lg:text-xs text-[10px] font-bold  hover:text-[#ff2459] ${
                enquirySent
                  ? "text-[#ff2459] cursor-not-allowed"
                  : "text-gray-900 cursor-pointer hover:text-[#ff2459]"
              }`}
            >
              <IoIosInformationCircleOutline className="text-lg" />
              {enquirySent ? "Enquiry Sent" : "Send Enquiry"}
            </p>

            <button
              onClick={() => toggleFavorite(receivedData._id)}
              className={`flex gap-1 text-xs lg:text-xs text-[10px] font-bold cursor-pointer hover:text-[#ff2459] ${
                localIsFavorite ? "text-[#ff2459]" : "text-gray-900"
              }`}
            >
              <FaHeart className="text-lg" />
              {localIsFavorite ? "Added to Favourites" : "Add To Favourite"}
            </button>

            <p
              onClick={addToCalendar}
              className="flex gap-1 md:text-xs lg:text-xs text-[10px] font-bold text-gray-900 cursor-pointer hover:text-[#ff2459]"
            >
              <MdDateRange className="text-lg " />
              Add to My Calendar
            </p>

            <div className="hidden md:hidden lg:flex gap-4">
              <p className="flex gap-1 text-xs font-bold text-gray-900 ">
                <FaEye className="relative top-0.5 text-blue-600" />
                <span>Total {receivedData.visits}</span>
              </p>
              <p className="flex gap-1 text-xs font-bold text-gray-900 ">
                <FaEye className="relative top-0.5 text-blue-600" />
                <span>Daily {receivedData.dailyVisits}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl lg:m-0 m-2 lg:p-4 p-2  shadow-lg lg:w-[20%] ">
          <h1 className="font-bold flex justify-start break-words text-xl p-2 mt-0 sm:mt-4 ">
            {" "}
            {receivedData.name}
          </h1>
          <div className="flex gap-2 pb-3 pl-4 justify-start mt-0 sm:mt-4 ">
            <div className="relative flex flex-col space-y-4 top-1 lg:text-2xl text-gray-600 ">
              <TiBookmark />
              <CiCalendarDate />
              <CiLocationOn />
            </div>
            <div className="text-gray-600 md:text-base  text-xs font-medium space-y-4">
              <p>{receivedData.category}</p>
              {/* <p>{receivedData.startDate}</p> */}
              <p>
                {receivedData?.startDate
                  ? new Date(receivedData.startDate).toLocaleString(undefined, {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "UTC",
                    })
                  : "--"}
              </p>
              <p></p>
              <p>
                {receivedData.venue?.city && receivedData.venue?.country
                  ? `${receivedData.venue.city} - ${receivedData.venue.country}`
                  : receivedData.venue?.name || "-"}
              </p>
            </div>
          </div>
          <hr />
          <div className="pt-2 flex justify-between gap-2 lg:pt-3 md:p-2 px-3 mt-0 sm:mt-6">
            <p className="lg:text-xl text-base font-bold">$99 onwards </p>
            <button
              onClick={() => {
                setModal(true); 
                sectionRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                });
              }}
              className="relative lg:text-lg text-xs font-medium rounded-md p-2 px-4 bg-[#ff2459] text-white transition-all duration-300 
            before:absolute before:top-0 before:left-0 before:rounded-md before:w-0 before:h-full before:bg-pink-700 before:transition-all before:duration-300 
            hover:before:w-full hover:text-back hover:before:opacity-100 before:z-0 "
            >
              <p className="relative">Get Ticket</p>
            </button>
          </div>
        </div>
      </div>

      <div className="lg:p-10 p-3 flex lg:flex-row md:flex-row flex-col w-full gap-4">
        <div className="lg:w-[90%] md:w-[90%]  ">
          {receivedData ? (
            <EventHeading
              heading={receivedData.name}
              by={receivedData.name}
              category={receivedData.category}
              startDate={receivedData.startDate}
              endDate={receivedData.endDate}
            />
          ) : (
            <EventHeading heading={"No Event data"} by={"-"} startDate={"-"} />
          )}
          <div className="border-2 m-1 mt-4 sm:mt-6 rounded-lg ">
            <div ref={sectionRef} className="p-2 pb-3">
              <p className="font-semibold text-base lg:text-3xl px-3">
                Get Tickets Now
              </p>
              <div className=" m-1 mb-2 w-36 sm:w-60 rounded-lg h-0.5 bg-[#ff2459] "></div>
              <p className="font-semibold text-lg  ml-3 mb-6">
                {receivedData?.startDate
                  ? new Date(receivedData.startDate).toLocaleString()
                  : "-"}
              </p>
              <hr />
              <div className="space-y-4">
                <div onClick={() => {
                  setForm(!form),
                  handleGetTicketClick()
                }
              }>
                  {receivedData ? (
                    <GetTicket
                      start={new Date(receivedData.startDate).toLocaleString()}
                      eTime={new Date(receivedData.endDate).toLocaleString()}
                    />
                  ) : (
                    <GetTicket start={"NO Event"} sTime={"-"} eTime={"-"} />
                  )}
                </div>
                <div onClick={() => setForm(!form)}>
                  {receivedData ? (
                    <GetTicket
                      start={new Date(receivedData.startDate).toLocaleString()}
                      eTime={new Date(receivedData.endDate).toLocaleString()}
                    />
                  ) : (
                    <GetTicket start={"NO Event"} sTime={"-"} eTime={"-"} />
                  )}
                </div>
                <div onClick={() => setForm(!form)}>
                  {receivedData ? (
                    <GetTicket
                      start={new Date(receivedData.startDate).toLocaleString()}
                      eTime={new Date(receivedData.endDate).toLocaleString()}
                    />
                  ) : (
                    <GetTicket start={"NO Event"} sTime={"-"} eTime={"-"} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[20%] md:w-[90%] flex flex-col gap-2">
          <div className="p-4 flex flex-col items-center w-full border rounded-xl">
            {/* Title */}
            <h1 className="text-xl font-semibold text-left px-6 pb-3 lg:pb-5">
              Organizer
            </h1>

            {/* Organizer Image */}
            <Collapsible
              trigger={
                <div className="text-center p-1 w-full font-semibold text-md mt-2 mb-2 bg-[#ff2459]  text-white hover:bg-red-600 rounded">
                  View Organizer Details
                </div>
              }
              triggerWhenOpen={
                <div className="text-center p-1 w-full font-semibold text-md mt-2 mb-2 bg-[#ff2459]  text-white hover:bg-red-600 rounded">
                  Hide Organizer Details
                </div>
              }
              className=""
            >
              {" "}
              <div className="flex flex-col items-center w-full">
                <div className="h-20 w-20 lg:h-32 lg:w-32 md:w-20 md:h-20 rounded-full bg-gray-500 flex items-center justify-center text-white text-lg font-semibold">
                  {receivedData.organizer?.username?.charAt(0) || ""}
                </div>

                {/* Organizer Name */}
                <p className="font-semibold lg:text-base text-sm pt-2 text-center">
                  {receivedData.organizer?.username || "Organizer Name"}
                </p>

                {/* Organizer Info */}
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-2 gap-2 pt-4 text-center">
                  <p className="flex items-center justify-center lg:text-xs md:text-xs text-sm gap-1">
                    <PiBuildingApartmentFill className="text-lg" />
                    {receivedData.venue?.city || "-"},{" "}
                    {receivedData.venue?.country || "-"}
                  </p>
                  <p
                    className="flex items-center justify-center lg:text-xs md:text-xs text-sm gap-1 cursor-pointer"
                    onClick={togglePhone}
                  >
                    <FaPhoneAlt className="text-lg" />
                    {hasPhoneNumber
                      ? showNumber
                        ? phoneNumber
                        : "View Contact"
                      : "Not available"}
                  </p>
                  <p className="flex items-center gap-2 text-sm md:text-xs lg:text-xs whitespace-nowrap">
                    <MdOutlineMailOutline className="text-base min-w-[1rem]" />
                    <span>
                      {receivedData.organizer?.email || "Not available"}
                    </span>
                  </p>
                </div>

                {/* Contact Organizer Button */}
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="flex shadow p-2 gap-1 w-full mt-3 rounded-md justify-center items-center"
                >
                  <IoIosContact className="text-xl" />
                  Contact Organizer
                </button>
              </div>
            </Collapsible>
          </div>

          <div className="border-2 rounded-xl p-2 flex flex-col items-center">
            <p className="font-semibold">Google Location</p>
            <p className="flex font-semibold ">
              {/* <CiLocationOn className="relative top-1 text-pink-500" />  {receivedData.venue.googleSearchLocation ? receivedData.venue.googleSearchLocation :""} */}
            </p>
            {/* <p className="text-gray-400 ">Goa, india</p> */}
          </div>
          <div className="flex md:flex-row flex-col gap-1 border-2 rounded-xl p-2  items-center">
            <p className="text-gray-400 ml-2">Page visited By </p>
            <p className="font-semibold ml-2">{receivedData.dailyVisits} Times</p>
          </div>
        </div>
      </div>
      <div className="px-3 sm:px-10 py-2 ">
        {/* <Overview />
        <EventInfo /> */}
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
            Event Description
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            {receivedData.description || "Description not available."}
          </p>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl text-gray-900 font-semibold pt-10 p-4 pl-0">
            Location
          </h1>

          <MapContainer venueData={venueData} />
        </div>
        <EventGallery data={receivedData?.media?.images || []} />

        {/* <Sponsors /> */}
        <WatchTrailer />
        {/* <Speakers />
        <Dj /> */}
        {/* <RatingReview /> */}
      </div>
      {isFormOpen && (
        <div className="w-[60%]">
          <div className="fixed w-full inset-0 flex flex-col bg-white/50 items-center justify-center  overflow-y-scroll  z-40 backdrop-blur-sm">
            <div className="bg-white p-2 rounded-lg   shadow-lg  lg:w-[full]">
              <OrganiserContact
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
              />
            </div>
          </div>
        </div>
      )}
      {/*show Meditation Form */}
      {/* {form && (
        <div className="w-[45%] ">
          <div className="fixed w-full backdrop-blur-md bg-black/50  inset-0 flex flex-col items-center  overflow-y-scroll  z-40 py-4 ">
            <div className="bg-white p-1 rounded-lg   shadow-lg  lg:w-[full]">
              <div className="flex justify-end relative lg:right-0 right-16  ">
                <button
                  className="hover:text-[#ff2459] text-black text-lg font-bold relative lg:left-0 left-12 w-[max-content] mr-0 sm:mr-6"
                  onClick={() => setForm(!form)}
                >
                  ✕
                </button>
              </div>
              <MeditationForm data={receivedData} />
            </div>
          </div>
        </div>
      )} */}
      {login && (
        <div className="fixed w-full lg:h-[120vh] pt-[40px] p-10  h-[100vh]  inset-0 flex flex-col items-center justify-center z-70 bg-white/30 overflow-x-hidden">
          <div className="bg-white p-6 rounded-lg shadow-lg  overflow-y-scroll scrollbar-hide  lg:w-[full] w-[max-content]">
            {/* <p className="flex items-center text-lg font-medium lg:p-0 p-4">
              {account ? (
                ""
              ) : guest ? (
                <h2
                  className=" text-3xl  md:text-2xl font-semibold"
                  style={{
                    textDecoration: "underline",
                    textDecorationColor: "#FF2459",
                    color: "#FF2459",
                  }}
                >
                Checkout as Guest
                </h2>
              ) : (
                ""
              )}
            </p> */}
            <div className="flex justify-end lg:p-0 mt-3 relative lg:bottom-3 -bottom-8">
              <Button
                text={"X"}
                textSize={"text-xs"}
                variant={"primary"}
                rounded={"rounded-xl"}
                onClick={() => {
                  setForm(true);
                  setLogin(false);
                }}
              />
            </div>

            {/* Render components based on state */}
            {account ? <LoginModal /> : guest ? <Guest /> : <RegisterModal />}

            <div className="flex gap-2 justify-center relative top-2">
              {/* Toggle between states */}
              {!guest && (
                <p
                  className="cursor-pointer break-words lg:text-base text-sm"
                  onClick={() => setAccount(!account)}
                >
                  {account
                    ? "Don't have an account?"
                    : "Already have an account/Login Now"}
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
                {account
                  ? "Register here"
                  : guest
                  ? "Back to Register/Login"
                  : "Checkout as Guest"}
              </p>
            </div>
          </div>
        </div>
      )}
      {enquiry && (
        <EnquiryForm
          setEnquiry={setEnquiry}
          onEnquirySent={handleEnquirySent}
          name={receivedData.name}
          email={organizerEmail}
          enquiry={enquiry}
        />
      )}
    </div>
  );
}

export default FeaturedEvent;
