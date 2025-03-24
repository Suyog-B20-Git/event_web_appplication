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
import { useLocation } from "react-router-dom";
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
import { getEventById } from "../redux/actions/master/Events/getEventById";
import MapContainer from "../Components/CreatePage/MapComponent";
import EnquiryForm from "../Components/Organizer/EnquiryForm";
import { addFavouriteEvent } from "../redux/actions/master/Events/AddFavouriteEvent";
import getFavoriteEventReducer from "../redux/reducers/pages/Events/getFavoriteEvent";
import { getFavouriteEventData } from "../redux/actions/master/Events/GetFavouriteEvent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteFavouriteEvent } from "../redux/actions/master/Events/deleteFavouriteEvent";

function FeaturedEvent() {
  const [enquiry, setEnquiry] = useState(false);
  const location = useLocation();
  const id = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state.getEventByIdReducer) || {
    eventData: [],
  };
  const receivedData = store.eventData;
  console.log(receivedData);

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
  const checkFavourite = (id) => {
    if (isFavourite) {
      // toast.warning("Already added to favorites!", {
      //   position: "top-right",
      //   autoClose: 2000, // Closes after 2 seconds
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
      dispatch(deleteFavouriteEvent(id));
      dispatch(getFavouriteEventData(setLoading));

      // favouriteEvent=deletedFavouriteEvent;

      // window.location.reload();
    }
  };

  useEffect(() => {
    dispatch(getEventById(id, setLoading));
    dispatch(getFavouriteEventData(setLoading));

  }, [dispatch]);

  const handleFavourite = (id) => {
    if (isFavourite) {
      return;
    } else {
      dispatch(addFavouriteEvent(id));
      dispatch(getFavouriteEventData(setLoading));
    }
  };

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
console.log("Phone:", receivedData.organizer?.mobileNumber);

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const extractDateAndTime = () => {
    const date = new Date(receivedData.startDate);

    // Extract date in YYYY-MM-DD format
    const formattedDate = date.toISOString().split("T")[0];

    // Extract time in 12-hour format (HH:MM AM/PM)
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Ensures 12-hour format
    });

    setDate(formattedDate);
    setTime(formattedTime);
  };

  const loc = {
    lat: receivedData?.venue?.googleSearchLat || 40.7127753,
    lng: receivedData?.venue?.googleSearchLong || -74.0059728,
  };
  console.log(receivedData);

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
              receivedData.media?.thumbnailImage || "assets/staticAssets/fallback-image.jpg"
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
              onClick={() => setEnquiry(!enquiry)}
              className="flex gap-1 md:text-xs lg:text-xs text-[10px] font-bold text-gray-900 cursor-pointer hover:text-[#ff2459]"
            >
              {" "}
              <IoIosInformationCircleOutline className="text-lg " />
              Send Enquiry
            </p>

            <button
              onClick={() => {
                handleFavourite(receivedData._id);
                checkFavourite(receivedData._id);
              }}
              className={`flex gap-1 text-xs lg:text-xs text-[10px] font-bold cursor-pointer ${
                isFavourite ? "text-[#ff2459]" : "text-gray-900"
              }`}
            >
              <FaHeart className="text-lg" />
              {isFavourite ? "Added to Favourites" : "Add To Favourite"}
            </button>
            <p
              onClick={addToCalendar}
              className="flex gap-1 md:text-xs lg:text-xs text-[10px] font-bold text-gray-900 cursor-pointer hover:text-[#ff2459]"
            >
              <MdDateRange className="text-lg " />
              Add to My Calendar
            </p>

            <div className="hidden md:hidden lg:flex gap-4">
              <p className="flex gap-1 text-xs font-bold text-gray-900 cursor-pointer">
                <FaEye className="relative top-0.5 text-blue-600" />
                <span>Total {receivedData.visits}</span>
              </p>
              <p className="flex gap-1 text-xs font-bold text-gray-900 cursor-pointer">
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
              <p >
                {date} - {time}
              </p>
              <p></p>
              <p>
                {" "}
                {receivedData.venue?.city || "-"} -{" "}
                {receivedData.venue?.country || "-"}
              </p>
            </div>
          </div>
          <hr />
          <div className="pt-2 flex justify-between gap-2 lg:pt-3 md:p-2 px-3 mt-0 sm:mt-6">
            <p className="lg:text-xl text-base font-bold">$99 onwards </p>

            {/* <button
              onClick={() => {
                setModal(true);
                sectionRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                });
              }}
              className="relative lg:text-lg text-xs overflow-hidden font-medium rounded-md p-2 px-4 bg-[#ff2459] hover:text-black  text-white   transition-all duration-300 before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-pink-400 hover:before:w-full before:transition-all before:duration-300"
              // className="lg:text-lg text-xs bg-[#ff2459] text-white font-medium rounded-md p-2 px-4"
            >
              Get Ticket
            </button> */}
            <button
              // onClick={() => {
              //   if (receivedData.isRepetitive) {
              //     setModal(true);
              //     sectionRef.current?.scrollIntoView({
              //       behavior: "smooth",
              //       block: "nearest",
              //     });
              //   } else {
              //     setForm(!form);
              //   }
              // }}
              onClick={() => {
                setModal(true); // Ensure the form is open
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
          {/* <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md shadow-sm w-full  mt-2">

            <div className="flex items-center  space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a4 4 0 00-5-4M9 20H4v-2a4 4 0 015-4m9-7a4 4 0 11-8 0 4 4 0 018 0zM12 11a9 9 0 00-9 9v2h18v-2a9 9 0 00-9-9z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-800">
                  Invite your friends
                </h3>
                <p className="text-xs text-gray-500">
                  and enjoy a shared experience
                </p>
              </div>
            </div>

            <button className="flex items-center justify-center w-8 h-8 text-gray-400 transition hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div> */}
        </div>
      </div>

      <div className="lg:p-10 p-3 flex lg:flex-row md:flex-row flex-col w-full gap-4">
        <div className="lg:w-[90%] md:w-[90%]  ">
          {receivedData ? (
            <EventHeading
              heading={receivedData.name}
              by={receivedData.name}
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
              Organiser
            </h1>

            {/* Organizer Image */}
            <div className="flex flex-col items-center w-full">
              <div className="h-20 w-20 lg:h-32 lg:w-32 md:w-20 md:h-20 rounded-full bg-gray-500 flex items-center justify-center text-white text-lg font-semibold">
                {receivedData.organizer?.name?.charAt(0) || ""}
              </div>

              {/* Organizer Name */}
              <p className="font-semibold lg:text-base text-sm pt-2 text-center">
                {receivedData.organizer?.name || "Organizer Name"}
              </p>

              {/* Organizer Info */}
              <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-2 gap-2 pt-4 text-center">
                <p className="flex items-center justify-center lg:text-xs md:text-xs text-sm gap-1">
                  <PiBuildingApartmentFill className="text-lg" />
                  {receivedData.venue?.city || "-"}, {receivedData.venue?.country || "-"}
                </p>
                <p className="flex items-center justify-center lg:text-xs md:text-xs text-sm gap-1">
                  <FaPhoneAlt className="text-lg" />
                  {receivedData.organizer?.mobileNumber || "Not available"}
                </p>
                <p className="flex items-center  lg:text-xs md:text-xs text-sm gap-1">
                  <MdOutlineMailOutline className="text-lg" />
                  {receivedData.organizer?.email || "Not available"}
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
          </div>

          <div className="border-2 rounded-xl p-2 flex flex-col items-center">
            <p className="font-semibold">Google Location</p>
            <p className="flex font-semibold ">
              {/* <CiLocationOn className="relative top-1 text-pink-500" />  {receivedData.venue.googleSearchLocation ? receivedData.venue.googleSearchLocation :""} */}
            </p>
            {/* <p className="text-gray-400 ">Goa, india</p> */}
          </div>
          <div className="flex md:flex-row flex-col gap-1 border-2 rounded-xl p-2 items-center">
            <p className="text-gray-400">Page visited By </p>
            <p className="font-semibold">{receivedData.dailyVisits} Times</p>
          </div>
        </div>
      </div>
      <div className="px-3 sm:px-10 py-2 ">
        {/* <Overview />
        <EventInfo /> */}
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">Event Description</h2>
          <p className="text-lg text-gray-600 mt-2">{receivedData.description || "Description not available."}</p>
        </div>
        <div>
          
          <h1 className="text-2xl sm:text-3xl text-gray-900 font-semibold pt-10 p-4 pl-0">
            Location
          </h1>

          {loc && <MapContainer location={loc} />}
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
      {form && (
        <div className="w-[45%]">
          <div className="fixed w-full backdrop-blur-md bg-black/50  inset-0 flex flex-col items-center  overflow-y-scroll  z-40 ">
            <div className="bg-white p-2 rounded-lg   shadow-lg  lg:w-[full]">
              <div className="flex justify-end relative lg:right-0 right-16  ">
                <button
                  className="bg-[#ff2459] relative lg:left-0 left-10 w-[max-content] p-1 px-2  text-white"
                  onClick={() => setForm(!form)}
                >
                  X
                </button>
              </div>
              <MeditationForm data={receivedData} />
            </div>
          </div>
        </div>
      )}
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
          name={receivedData.name}
          enquiry={enquiry}
        />
      )}
    </div>
  );
}

export default FeaturedEvent;
