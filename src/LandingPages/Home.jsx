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
import { useNavigate } from "react-router-dom";

import Artist from "../Components/Home/Artist";
import jwt_decode from "jwt-decode";

import { useDispatch, useSelector } from "react-redux";
import { getEventData } from "../redux/actions/master/Events/index";
import { getUpcomingEventData } from "../redux/actions/master/Events/UpcomingEvent";
import { getFeaturedEventData } from "../redux/actions/master/Events/FeaturedEvent";
import { getOrganizer } from "../redux/actions/master/Organizer/getOrganiser";
import { getVenue } from "../redux/actions/master/Venue/getVenue";

import Loading from "../Components/Loading";
import CardData from "../Components/CardData";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getEventData(setLoading));
    dispatch(getUpcomingEventData(setLoading));
    dispatch(getFeaturedEventData(setLoading));
    dispatch(getOrganizer(setLoading));
    dispatch(getVenue(setLoading));
  }, [dispatch]);

  const heading = [];
  const store = useSelector((state) => state.eventReducer) || { eventData: [] };
  const data = store.eventData;

  const store1 = useSelector((state) => state.upcomingEventReducer) || {
    upcomingEventData: [],
  };
  const data1 = store1.upcomingEventData;

  const store2 = useSelector((state) => state.featuredEventReducer) || {
    featuredEventData: [],
  };
  const data2 = store2.featuredEventData;

  const store3 = useSelector((state) => state.getOrganizerReducer) || {
    organizerData: [],
  };
  const data3 = store3.organizerData;

  const store4 = useSelector((state) => state.getVenueReducer) || {
    venueData: [],
  };
  const data4 = store4.venueData;
  const data5 = [...new Set(data4)];

  // Create initial slides from your dynamic data
  const initialSlides = [
    ...data.slice(0, 7),
    ...data1.slice(0, 7),
  ]
    .map((item, index) => ({
      id: index + 1,
      bgImage: item?.media?.thumbnailImage || item?.media?.posterImage || "https://images.unsplash.com/photo-1464047736614-af63643285bf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      label: item?.name || item?.title || "Untitled",
      location: `${item?.venue?.city || item?.venue?.country || "India"}`,
      category: item?.category.toLowerCase(),
      eventId: item?._id,
      originalIndex: index, // Keep track of original position
    }))
    .filter((slide) => slide.bgImage);

  // State for infinite queue management
  const [slides, setSlides] = useState(initialSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Update slides when data changes
  useEffect(() => {
    if (initialSlides.length > 0) {
      setSlides(initialSlides);
      setCurrentSlide(0);
    }
  }, [data.length, data1.length]);

  const totalSlides = slides.length;
  const [isAuth, setIsAuth] = useState("");

  useEffect(() => {
    setIsAuth(localStorage.getItem("isLogin"));
  }, []);

  const authToken = localStorage.getItem("authToken");
  const name = authToken ? jwt_decode(authToken)?.name : "Guest";

  // Modified auto-slide logic with infinite queue
  useEffect(() => {
    const interval = setInterval(() => {
      setSlides(prevSlides => {
        const currentSlideData = prevSlides[currentSlide];

        // Check if this slide (by eventId) already exists after the current position
        const existsLater = prevSlides.slice(currentSlide + 1).some(slide =>
          slide.eventId === currentSlideData.eventId
        );

        // Only add to queue if it doesn't exist later
        if (!existsLater) {
          return [...prevSlides, { ...currentSlideData, id: Date.now() + Math.random() }];
        }

        return prevSlides;
      });

      setCurrentSlide((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  // Handle seamless looping when reaching the end
  useEffect(() => {
    if (currentSlide >= slides.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 100);
    }
  }, [currentSlide, slides.length]);

  useEffect(() => {
    if (!isTransitioning) {
      setTimeout(() => setIsTransitioning(true), 50);
    }
  }, [isTransitioning]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    // Changed pt-[65px] to pt-[80px] to match Header height
    <div className="flex flex-col lg:gap-0 gap-0 overflow-x-hidden lg:pt-0 md:pt-0 pt-[80px]">
      <div className="flex items-center justify-center">
        <div className="w-full h-[250px] flex items-center justify-center bg-white p-1">
          <div className="relative w-[400px] sm:w-[250px] h-full flex items-center lg:ml-[-8%]">
            <div
              className="flex transition-transform duration-100 ease-in"
              style={{
                transform: `translateX(-${currentSlide * 400}px)`,
                transition: isTransitioning ? "transform 0.5s linear" : "none",
              }}
            >
              {slides.map((slide, index) => (
                <div
                  key={`slide-${slide.id}-${index}`}
                  className=" h-full flex items-center justify-center px-3 w-[400px]  lg:px-0 "

                >
                  <div
                    onClick={() => {
                      navigate(`/events/${slide.category}/${slide.eventId}`, {
                        state: slide.eventId
                      });
                    }}
                    className={`relative w-full h-full rounded-2xl overflow-hidden shadow-lg transition-all duration-5000 cursor-pointer border border-black sm:mx-4 sm:ml-[10px] ${
                      index === currentSlide ? "border-2 border-black opacity-100 scale-115" : "opacity-50 scale-80"
                    }`}
                  >
                    <h4 className="absolute top-4 left-4 text-white text-lg font-bold bg-[#ff4259] rounded-full px-2 z-10">
                      {slide.category}
                    </h4>
                    <img
                      src={slide.bgImage}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-[200px] object-cover"
                    />
                    <p className="absolute bottom-0 w-full text-white text-lg font-bold bg-black bg-opacity-50 px-2 py-1">
                      {slide.label.toUpperCase()}
                      <br />
                      <span className="text-sm text-gray-300 ml-2">
                        {slide.location}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isAuth && <RecentView />}
      <EventCategory />

      {data.length > 0 ? (
        <Cards data={data} heading={"TRENDING EVENTS"} />
      ) : (
        <p></p>
      )}
      {data1.length > 0 ? (
        <Cards data={data1} heading={"UPCOMING EVENTS"} />
      ) : (
        <p></p>
      )}
      {data2.length > 0 ? (
        <Cards data={data2} heading={"FEATURED EVENTS"} />
      ) : (
        <p></p>
      )}
      {data3.length >= 0 ? (
        <CardData data={data3} heading={"ORGANIZERS"} navigation={"/organizers"}/>
      ) : (
        <p></p>
      )}
      {data5.length > 0 ? (
        <CardData data={data5} heading={"VENUES"} navigation={"/venues"}/>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Home;