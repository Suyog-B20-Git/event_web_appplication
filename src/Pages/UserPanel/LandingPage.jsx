// import React from "react";
// import HeaderComponet from "../../Components/Layout/HeaderComponet";
// import Cards from "../../Components/LandingPage/Cards";
// import Card2 from "../../Components/LandingPage/cards2";
// import EventCategory from "../../Components/LandingPage/EventCategory";

// import { MdEvent, MdOutlineEventAvailable } from "react-icons/md";
// import { GiPayMoney } from "react-icons/gi";
// import { LuTicketCheck } from "react-icons/lu";
// import { FaPerson } from "react-icons/fa6";
// import EventStepOrg from "../../Components/LandingPage/EventStepOrg";
// import Footer from "../../Components/Layout/Footer";
// import ImageComponet from "../../Components/LandingPage/ImageComponent";
// import RecentView from "../../Components/LandingPage/RecentView";
// import EventGenre from "../../Components/LandingPage/EventGenre";
// import BestVenue from "../../Components/LandingPage/BestVenue";
// import NewExperience from "../../Components/LandingPage/NewExperience";
// import Artist from "../../Components/LandingPage/Artist";

// function LandingPage() {
//   return (
//     <div className="flex flex-col lg:gap-0 gap-0.5">
//       <RecentView />

//       <div className="px-5 lg:px-40">
//         <div
//           className="rounded-3xl h-[250px] lg:h-96 items-center flex text-white"
//           style={{
//             backgroundImage: "url(fI2.png)",
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div className="px-5 flex flex-col lg:gap-2 gap-3 ">
//             <h1 className="font-bold lg:text-3xl text-xs   ">
//               Arijit singh -LIVE CONCERT
//             </h1>
//             <p className="lg:text-base text-xs">
//               THe voice of generation makes a much awaited comeback <br /> to
//               stages
//             </p>
//             <p className="lg:text-base text-xs">
//               After two sold out cities,Arijit Singh India tour comes to yous !{" "}
//               <br /> get ready for an unforgotabe music journey Stayy ahead{" "}
//               <br /> folr you love
//             </p>
//             <button className="w-[max-content] text-black  font-semibold lg:text-base text-xs  p-2 rounded-xl bg-white">
//               Buy Now
//             </button>
//             <p></p>
//           </div>
//         </div>
//       </div>

//       <Cards />
//       <Cards />
//       <Cards />

//       <EventCategory />
//       <BestVenue />
//       <EventGenre />

//       <NewExperience />
//       <EventStepOrg
//         heading={"For Event Organiser"}
//         i1={<MdEvent />}
//         step1={"create Event"}
//         i2={<MdOutlineEventAvailable />}
//         step2={"Publish Event"}
//         i3={<GiPayMoney />}
//         step3={"Selling Event"}
//       />
//       <Artist />
//       <EventStepOrg
//         heading={"For Event Customer"}
//         i1={<MdEvent />}
//         step1={"Choose Event"}
//         i2={<LuTicketCheck />}
//         step2={"Get Ticket"}
//         i3={<FaPerson />}
//         step3={"Attend Event"}
//       />
//     </div>
//   );
// }

// export default LandingPage;

import React, { useState, useEffect, useRef } from "react";
import HeaderComponet from "../../Components/Layout/HeaderComponet";
import Cards from "../../Components/LandingPage/Cards";
import Card2 from "../../Components/LandingPage/cards2";
import EventCategory from "../../Components/LandingPage/EventCategory";
import { MdEvent, MdOutlineEventAvailable } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { LuTicketCheck } from "react-icons/lu";
import { FaPerson } from "react-icons/fa6";
import EventStepOrg from "../../Components/LandingPage/EventStepOrg";
import Footer from "../../Components/Layout/Footer";
import ImageComponet from "../../Components/LandingPage/ImageComponent";
import RecentView from "../../Components/LandingPage/RecentView";
import EventGenre from "../../Components/LandingPage/EventGenre";
import BestVenue from "../../Components/LandingPage/BestVenue";
import NewExperience from "../../Components/LandingPage/NewExperience";
import Artist from "../../Components/LandingPage/Artist";
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

function LandingPage() {
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

  return (
    <div className="flex flex-col lg:gap-0 gap-0.5 lg:pt-[160px] pt-[87px] overflow-x-hidden">
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

      <Cards  heading={"TRENDING EVENTS"}/>
      <Cards heading={"FEATURED EVENTS"} />
     

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

export default LandingPage;
