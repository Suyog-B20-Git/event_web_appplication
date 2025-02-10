import React, { useState, useEffect, useRef } from "react";

import Cards from "../Components/Home/Cards";
import Card2 from "../Components/Home/cards2";
import EventCategory from "../Components/Home/EventCategory";
import { MdEvent, MdOutlineEventAvailable } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { LuTicketCheck } from "react-icons/lu";
import { FaPerson } from "react-icons/fa6";
import EventStepOrg from "../Components/Home/EventStepOrg";

import RecentView from "../Components/Home/RecentView";
import EventGenre from "../Components/Home/EventGenre";
import BestVenue from "../Components/Home/BestVenue";

import Artist from "../Components/Home/Artist";
import jwt_decode from "jwt-decode"; // Correct import
const slides = [
  {
    id: 1,
    bgImage:
      "https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_400/c_crop%2Cg_custom%2Fv1736567956%2Fzkhqvrmodswgmjfu7m9h.jpg",
  },
  {
    id: 2,
    bgImage:
      "https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_400/c_crop%2Cg_custom%2Fv1735232122%2Fpsm8bj8hey5ijuc0qftb.jpg",
  },
  {
    id: 3,
    bgImage:
      "https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_400/c_crop%2Cg_custom%2Fv1734849105%2Fty5iaoyi1pdsmvlxgdof.jpg",
  },
  {
    id: 4,
    bgImage:
      "https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_400/c_crop%2Cg_custom%2Fv1733994160%2Fxdvnpklinj7nglb8zlli.jpg",
  },
  {
    id: 5,
    bgImage:
      "https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_400/c_crop%2Cg_custom%2Fv1735232122%2Fpsm8bj8hey5ijuc0qftb.jpg",
  },
];

import { useDispatch, useSelector } from "react-redux";
import { getEventData } from "../redux/actions/master/Events/index";
function Home() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.eventReducer);
  useEffect(() => {
    dispatch(getEventData()); // Call API when component mounts
  }, [dispatch]);
  const [currentSlide, setCurrentSlide] = useState(2);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const totalSlides = slides.length;

  const authToken = localStorage.getItem("authToken");
  const name = authToken ? jwt_decode(authToken)?.name : "Guest";
  console.log(name);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentSlide === totalSlides) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(2);
      }, 100);
    }
  }, [currentSlide, totalSlides]);

  useEffect(() => {
    if (!isTransitioning) {
      setTimeout(() => setIsTransitioning(true), 50);
    }
  }, [isTransitioning]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="flex  flex-col lg:gap-0 gap-0.5  overflow-x-hidden">
      <div className=" bg-gray-900 flex items-center justify-center">
        <div className="w-full h-[250px] flex items-center justify-center bg-gray-900 p-1">
          <div className="relative w-[350px] h-full flex items-center">
            <div
              className="flex transition-transform duration-100 ease-in"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                width: `${totalSlides * 100}%`,
                transition: isTransitioning ? "transform 0.2s linear" : "none",
              }}
            >
              {slides.map((slide, index) => (
                <div
                  key={`slide-${index}`}
                  className="w-full h-full flex-shrink-0 flex items-center justify-center px-2"
                >
                  <div
                    className={`relative w-full h-full rounded-2xl overflow-hidden shadow-lg transition-opacity duration-700 ${
                      index === currentSlide ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <img
                      src={slide.bgImage}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
              {slides.map((slide, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="w-full h-[90%] flex-shrink-0 flex items-center justify-start"
                  style={{
                    backgroundImage: `url(${slide.bgImage})`,
                    backgroundRepeat: "repeat-X",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "25px",
                    marginRight: "20px",
                    opacity: "0.7",
                    transition: "opacity 0.2s linear",
                    justifyContent: "start",
                    justifyItems: "start",
                  }}
                >
                  <img
                    src={slide.bgImage}
                    alt={`Duplicate Slide ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-lg "
                    style={{ borderRadius: "35px" }}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Dots - Centered below the active slide */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? "bg-white" : "bg-gray-400"
                  }`}
                  onClick={() => {
                    setIsTransitioning(true);
                    setCurrentSlide(index);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <RecentView />

      {data.length > 0 ? <Cards data={data} /> : "No Event Data"}
      {/* <Cards heading={"TRENDING EVENTS"} />
      <Cards heading={"FEATURED EVENTS"} /> */}

      <EventCategory />
      <BestVenue />
      <EventGenre />

      {/* <NewExperience /> */}
      <Artist />
      <EventStepOrg
        heading={"For Event Organiser"}
        i1={<MdEvent />}
        step1={"create Event"}
        i2={<MdOutlineEventAvailable />}
        step2={"Publish Event"}
        i3={<GiPayMoney />}
        step3={"Selling Event"}
      />

      <EventStepOrg
        heading={"For Event Customer"}
        i1={<MdEvent />}
        step1={"Choose Event"}
        i2={<LuTicketCheck />}
        step2={"Get Ticket"}
        i3={<FaPerson />}
        step3={"Attend Event"}
      />
    </div>
  );
}

export default Home;
