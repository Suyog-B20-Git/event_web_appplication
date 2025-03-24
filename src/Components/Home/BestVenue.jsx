// import React, { useRef } from "react";
// import { GrFormPrevious } from "react-icons/gr";
// import { ImInsertTemplate } from "react-icons/im";
// import { MdNavigateNext } from "react-icons/md";

// function BestVenue() {
//   const scrollRef = useRef(null); // Reference to the scrollable container

//   // Function to scroll horizontally
//   const handleScroll = (direction) => {
//     const container = scrollRef.current;
//     const scrollAmount = 300; // Adjust this value for the scroll distance
//     if (direction === "right") {
//       container.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     } else if (direction === "left") {
//       container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//     }
//   };

//   const Venues = [
//     {
//       img: "venue1.jpg",
//       desc: "Best Venue 1",
//     },
//     {
//       img: "venue2.jpeg",
//       desc: "Best  Venue 2",
//     },
//     {
//       img: "venue3.jpeg",
//       desc: "Best  Venue 3",
//     },
//     {
//       img: "venue4.jpeg",
//       desc: "Best Venue 1",
//     },
//     {
//       img: "venue5.jpg",
//       desc: "Best  Venue 2",
//     },
//     {
//       img: "venue7.jpg",
//       desc: "Best  Venue 3",
//     },
//   ];
//   return (
//     // <div className="max-w-7xl rounded-md  mx-auto p-6 bg-gray-100 mt-5">
//     <div className="lg:max-w-7xl lg:mt-10 lg:ml-32  w-full rounded-lg mx-auto p-4  pt-0 shadow-md ">
//       <h1 className="lg:text-3xl text-lg relative lg:left-3 md:left-10 left-4  font-semibold  font-sans">
//         Top Best Venue
//       </h1>

//       <div className="relative left-3 flex justify-around items-center">
//         {/* Back button */}
//         <button
//           className="lg:block hidden h-[max-content] bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800"
//           onClick={() => handleScroll("left")}
//         >
//           <GrFormPrevious size={20} />
//         </button>
//         {/* Scrollable container */}
//         <div
//           ref={scrollRef}
//           className="flex overflow-x-auto scroll-smooth lg:-space-x-2 md:space-x-6 pb-4 lg:-ml-7 md:ml-4 pr-12" // Added `ml-12` for spacing
//           style={{ scrollbarWidth: "none" }} // Hide scrollbar for modern browsers
//         >
//           {Venues.map((venue, index) => (
//             <div
//               key={index}
//               className="lg:min-w-[250px] md:min-w-[160px] min-w-[150px] lg:p-5 p-2 flex flex-col items-center text-center"
//             >
//               <div
//                 className="lg:w-44 w-32 h-32 lg:h-48  flex items-center rounded-xl"
//                 // className="lg:w-56 w-32 h-32 lg:h-56 flex items-center"
//                 style={{
//                   backgroundImage: `url(${venue.img})`,
//                   backgroundRepeat: "no-repeat",
//                   backgroundPosition: "center",
//                   backgroundSize: "cover",
//                   // borderRadius:"34% 32% 10% 10% / 28% 28% 1% 0% "
//                 }}
//               >
//                 <p className="font-medium text-white lg:text-2xl text-xl p-2">
//                   {/* {venue.desc} */}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Forward button */}
//         <button
//           className=" lg:block hidden h[max-content] bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800"
//           onClick={() => handleScroll("right")}
//         >
//           <MdNavigateNext size={20} />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default BestVenue;


import React, { useRef } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { ImInsertTemplate } from "react-icons/im";
import { MdNavigateNext } from "react-icons/md";

function BestVenue() {
  const scrollRef = useRef(null); // Reference to the scrollable container

  // Function to scroll horizontally
  const handleScroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300; // Adjust this value for the scroll distance
    if (direction === "right") {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const Venues = [
    {
      img: "staticAssets/venue1.jpg",
      desc: "Best Venue 1",
    },
    {
      img: "staticAssets/venue2.jpeg",
      desc: "Best  Venue 2",
    },
    {
      img: "staticAssets/venue3.jpeg",
      desc: "Best  Venue 3",
    },
    {
      img: "staticAssets/venue4.jpeg",
      desc: "Best Venue 1",
    },
    {
      img: "staticAssets/venue5.jpg",
      desc: "Best  Venue 2",
    },
    {
      img: "staticAssets/venue7.jpg",
      desc: "Best  Venue 3",
    },
  ];
  return (
    // <div className="max-w-7xl rounded-md  mx-auto p-6 bg-gray-100 mt-5">
    
<div className="w-full flex flex-col items-center justify-center pt-5">
<div className="w-full max-w-6xl bg-white rounded-lg p-6 shadow-md">     
   <h1 className="font-bold font-sans lg:text-2xl">
        TOP BEST VENUES
      </h1>

        <div className="relative flex items-center justify-center">
        {/* Back button */}
        <button
            className="hidden lg:block bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800"
            onClick={() => handleScroll("left")}
        >
          <GrFormPrevious size={20} />
        </button>
        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth gap-6 px-4 scrollbar-hide max-w-4xl mx-auto"
          style={{ scrollbarWidth: "none" }} // Hide scrollbar for modern browsers
        >
          {Venues.map((venue, index) => (
            <div
              key={index}
              className="lg:min-w-[250px] md:min-w-[160px] min-w-[150px] lg:p-5 p-2 flex flex-col items-center text-center"
            >
              <div
                className="lg:w-44 w-32 h-32 lg:h-48  flex items-center rounded-xl"
                // className="lg:w-56 w-32 h-32 lg:h-56 flex items-center"
                style={{
                  backgroundImage: `url(${venue.img})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  // borderRadius:"34% 32% 10% 10% / 28% 28% 1% 0% "
                }}
              >
                <p className="font-medium text-white lg:text-2xl text-xl p-2">
                  {/* {venue.desc} */}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Forward button */}
        <button
          className=" lg:block hidden h[max-content] bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800"
          onClick={() => handleScroll("right")}
        >
          <MdNavigateNext size={20} />
        </button>
      </div>
    </div>
    </div>

  );
}

export default BestVenue;
