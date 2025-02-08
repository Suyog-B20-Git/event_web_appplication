import React, { useContext, useEffect, useRef, useState } from "react";
import Overview from "../../Components/FeaturedEvent/OverView";
import EventInfo from "../../Components/FeaturedEvent/EventInfo";
import RatingReview from "../../Components/FeaturedEvent/RatingReview";
import Speakers from "../../Components//FeaturedEvent/Speakers";
import WatchTrailer from "../../Components/FeaturedEvent/WatchTrailer";
import Sponsors from "../../Components/FeaturedEvent/Sponsors";
import EventHeading from "../../Components/FeaturedEvent/EventHeading";
import Dj from "../../Components/FeaturedEvent/Dj";
import Button from "../../Components/ReusableComponents/Button";
import { FaPhoneAlt, FaTelegramPlane } from "react-icons/fa";
import { IoIosContact, IoMdStar } from "react-icons/io";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import GetTicket from "../../Components/FeaturedEvent/GetTicket";
import EventGallery from "../../Components/FeaturedEvent/EventGallery";
import MeditationForm from "../../Components/FeaturedEvent/MeditationForm";
// import Login from "../../Components/FeaturedEvent/Login";
import { TiBookmark } from "react-icons/ti";
import { useLocation } from "react-router-dom";
import { Context } from "../../Components/Util/ContextProvider";
import LoginModal from "../../Components/FeaturedEvent/LoginModal";
import Guest from "../../Components/FeaturedEvent/Guest";
import RegisterModal from "../../Components/FeaturedEvent/RegisterModal";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaEye, FaHeart } from "react-icons/fa6";
import { MdDateRange, MdOutlineMailOutline } from "react-icons/md";
import { PiBuildingApartmentFill } from "react-icons/pi";
import OrganiserContact from "../../Components/FeaturedEvent/OrganiserContact";

function FeaturedEvent() {
  const location = useLocation();
  const receivedData = location.state;
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
  }, []);

  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const visits = localStorage.getItem("pageVisits");

    // Parse the visits (convert to a number) or initialize with 0
    const currentCount = visits ? parseInt(visits, 10) : 0;

    // Increment the count
    const newCount = currentCount - 1;

    // Update the state
    setVisitCount(newCount);

    // Store the updated count back in localStorage
    localStorage.setItem("pageVisits", newCount);
  }, []);
  const sectionRef = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className="lg:pt-[160px] pt-[88px]">
      <div className="flex lg:flex-row flex-col gap-4 ">
        <div
          className="lg:w-[80%] flex justify-end items-end  h-[300px] md:h-[300px] lg:h-[450px]"
          style={{
            backgroundImage: `url(${receivedData.img})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex justify-center gap-5 rounded bg-white/70 lg:w-max md:w-max w-full   p-2 text-black">
            <p className="flex gap-1 md:text-xs lg:text-xs text-[10px] font-bold text-gray-900 cursor-pointer hover:text-[#ff2459]">
              {" "}
              <IoIosInformationCircleOutline className="text-lg " />
              Send Enquiry
            </p>
            <p className="flex gap-1 md:text-xs lg:text-xs text-[10px]  font-bold text-gray-900 cursor-pointer hover:text-[#ff2459]">
              {" "}
              <FaHeart className="text-lg " />
              Add To Favourite
            </p>
            <p className="flex gap-1 md:text-xs lg:text-xs text-[10px] font-bold text-gray-900 cursor-pointer hover:text-[#ff2459]">
              {" "}
              <MdDateRange className="text-lg " />
              Add to My Calender
            </p>
            <p className="flex gap-1 md:text-xs lg:text-xs text-[10px] font-bold text-gray-900 cursor-pointer ">
              <FaEye className="relative top-0.5 text-blue-600" />
              <span>124 </span>
            </p>
          </div>
        </div>
        <div className="rounded-xl lg:m-0 m-2 mt-1 lg:p-4 p-2  shadow-xl lg:w-[20%] ">
          <h1 className="font-bold font-sans break-words text-xl p-2">
            {" "}
            {receivedData.name}
          </h1>
          <div className="flex gap-2 pb-3">
            <div className="relative flex flex-col gap-1 top-1 lg:text-2xl text-gray-600">
              <TiBookmark />
              <CiCalendarDate />
              <CiLocationOn />
            </div>
            <div className="text-gray-600 md:text-base lg:text-base text-xs font-medium flex flex-col gap-1 ">
              <p>{receivedData.category}</p>
              <p>
                {receivedData.start}|{receivedData.startTime}
              </p>
              <p>{receivedData.location}</p>
            </div>
          </div>
          <hr />
          <div className="pt-2 flex justify-between gap-2 lg:p-2 lg:pt-3 md:p-2 pr-3">
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
              <p className="relative "> Get Ticket</p>
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md shadow-sm w-full  mt-2">
            {/* Icon */}
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
              {/* Text */}
              <div>
                <h3 className="text-sm font-medium text-gray-800">
                  Invite your friends
                </h3>
                <p className="text-xs text-gray-500">
                  and enjoy a shared experience
                </p>
              </div>
            </div>
            {/* Close Icon */}
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
          </div>
        </div>
      </div>

      <div className="lg:p-10 p-5 flex lg:flex-row md:flex-row flex-col w-full gap-4">
        <div className="lg:w-[90%] md:w-[90%]  ">
          {receivedData ? (
            <EventHeading
              heading={receivedData.name}
              by={receivedData.organiser}
              startDate={receivedData.start}
              endDate={receivedData.end}
            />
          ) : (
            <EventHeading heading={"No Event data"} by={"-"} startDate={"-"} />
          )}
          {modal && (
            <div className="border-2 m-1 rounded-lg">
              <div ref={sectionRef} className="p-2 pb-3">
                <p className="font-semibold text-base lg:text-3xl pt-3 pb-3">
                  Get Tickets Now
                </p>
                <div className=" m-1 mb-0 w-48 rounded-lg h-1 bg-[#ff2459]"></div>
                <p className="font-medium  text-lg lg:text-2xl ml-1">
                  {receivedData ? receivedData.date : "-"}
                </p>
                <hr />
                <div onClick={() => setForm(!form)}>
                  {receivedData ? (
                    <GetTicket
                      start={receivedData.start}
                      sTime={receivedData.startTime}
                      eTime={receivedData.endTime}
                    />
                  ) : (
                    <GetTicket start={"NO Event"} sTime={"-"} eTime={"-"} />
                  )}
                </div>
                <div onClick={() => setForm(!form)}>
                  {receivedData ? (
                    <GetTicket
                      start={receivedData.start}
                      sTime={receivedData.startTime}
                      eTime={receivedData.endTime}
                    />
                  ) : (
                    <GetTicket start={"NO Event"} sTime={"-"} eTime={"-"} />
                  )}
                </div>
                <div onClick={() => setForm(!form)}>
                  {receivedData ? (
                    <GetTicket
                      start={receivedData.start}
                      sTime={receivedData.startTime}
                      eTime={receivedData.endTime}
                    />
                  ) : (
                    <GetTicket start={"NO Event"} sTime={"-"} eTime={"-"} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:w-[20%] md:w-[90%] flex flex-col gap-2">
          <div className="p-2 flex lg:flex-col md:flex-col justify-around  flex-row  w-full border rounded-xl">
            <div>
              <h1 className="lg:text-lg md:text-base text-xs lg:left-0 relative md:left-0 left-4   font-semibold gap-2  lg:pb-5   flex lg:flex-row flex-col">
                Organiser
                <p
                  className="flex text-yellow-300 relative lg:left-0 md:left-0 
                left-4 top-1"
                >
                  <IoMdStar /> <IoMdStar />
                </p>
              </h1>
              <div>
                <div className="h-20 lg:hidden md:hidden  block w-20 lg:h-32 lg:w-32 md:w-20 md:h-20 m-2 md:m-0  rounded-full bg-gray-500"></div>
                <p className="font-semibold lg:hidden md:hidden relative  left-7 block lg:text-base text-sm">
                  Name
                </p>
              </div>
            </div>
            <div className="flex  flex-col lg:items-center  lg:p-2">
              <div className="h-14 lg:block md:block hidden w-14 lg:h-32 lg:w-32 md:w-20 md:h-20 m-2 md:m-0  rounded-full bg-gray-500"></div>
              <p className="font-semibold lg:block md:block hidden  lg:text-base text-sm pt-2">
                Name
              </p>
              <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-2 pt-4">
                <p className="flex lg:text-xs md:text-xs  text-sm break-words gap-1 lg:whitespace-nowrap">
                  <PiBuildingApartmentFill className="relative top-1" />
                  Benguluru ,India
                </p>
                <p className="flex lg:text-xs   md:text-xs  text-sm break-words gap-1 lg:whitespace-nowrap">
                  <FaPhoneAlt className="relative top-1" />
                  +91 8456789032
                </p>
                <p className="flex lg:text-xs  md:text-xs   text-sm break-words gap-1 lg:whitespace-nowrap">
                  <MdOutlineMailOutline className="relative top-1" />{" "}
                  xyz@gmail.com
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(true)}
                className="flex shadow p-2 gap-1 w-full mt-3 rounded-md justify-center items-center"
              >
                <IoIosContact className="relative top-1 text-xl" />
                Contact Organiser
              </button>
            </div>
          </div>

          <div className="border-2 rounded-xl p-2 flex flex-col items-center">
            <p className="font-semibold"> where</p>
            <p className="flex font-semibold ">
              Goa <CiLocationOn className="relative top-1 text-pink-500" />
            </p>
            <p className="text-gray-400 ">Goa, india</p>
          </div>
          <div className="flex md:flex-row flex-col gap-1 border-2 rounded-xl p-2 items-center">
            <p className="text-gray-400">Page visited By </p>
            <p className="font-semibold">{visitCount} Times</p>
          </div>
        </div>
      </div>
      <div className="p-5 lg:p-10 md:p-10">
        <Overview />
        <EventInfo />
        <div>
          <h1 className="text-gray-900 font-bold pt-10 text-lg p-4 pl-0">
            Location
          </h1>
          <div className="bg-gray-100 w-full lg:h-60 h-48"></div>
        </div>
        <EventGallery />
        <Sponsors />
        <WatchTrailer />
        <Speakers />
        <Dj />
        <RatingReview />
      </div>
      {isFormOpen && (
        <div className="w-[60%]">
          <div className="fixed w-full inset-0 flex flex-col items-center justify-center  overflow-y-scroll  z-40 backdrop-blur-sm">
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
          <div className="fixed w-full inset-0 flex flex-col items-center  overflow-y-scroll  z-40 backdrop-blur-sm">
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
        <div className="fixed w-full lg:h-[120vh] pt-[40px] p-10  h-[100vh]  inset-0 flex flex-col items-center justify-center bg-transparent z-70 backdrop-blur-sm overflow-x-hidden">
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
    </div>
  );
}

export default FeaturedEvent;
