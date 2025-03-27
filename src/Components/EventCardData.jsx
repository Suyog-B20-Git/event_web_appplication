// /* eslint-disable react/prop-types */
// import React from "react";

// import { BsFire } from "react-icons/bs";
// import { CiLocationOn } from "react-icons/ci";
// import { MdEvent } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye } from "react-icons/fa";

// const convertUTCToLocal = (utcString) => {
//   if (!utcString) return "Invalid Date"; // Handle empty or invalid values
//   const date = new Date(utcString);
//   return date.toLocaleString(); // Converts UTC to local time
// };

// // function Cards({ heading }) {
// function EventCardData({ data, heading }) {
//   const navigate = useNavigate();



//   return (
//     <div className="flex lg:justify-start  justify-center lg:relative  items-center overflow-hidden">
//       <div className="lg:p-12 lg:pb-5 lg:pt-10 pt-5 p-5 w-full max-w-[1340px]">
//         <div className="flex justify-between">
//           <div className="flex gap-2 lg:pl-3">
//             <BsFire className="text-2xl relative top-1" />
//             <p className="font-bold font-sans lg:text-2xl">{heading}</p>
//           </div>
//           <button
//             onClick={() => navigate("/viewall")}
//             className="shadow-md lg:text-base text-sm p-2  font-medium"
//           >
//             View All
//           </button>
//         </div>

//         {/* Cards container with horizontal scrolling */}
//         <div className="  grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 lg:p-4 pt-2 relative lg:right-46   w-full">
//           {data.map((item, index) => (
//             <div
//               key={index}
//               // className="flex-none shadow-lg p-2 rounded-lg lg:w-80 w-56"
//               className="overflow-hidden flex-none  border  shadow-lg p-2 rounded-lg lg:w-[320px] w-57"
           
//               onClick={() => navigate("/featuredEvent", { state: item._id })}
//             >
//               <div className=" h-24 lg:h-52 md:h-32 w-full rounded-lg  flex justify-end overflow-hidden">
//                 <div
//                   style={{
//                     // backgroundImage: `url(${item.media.thumbnailImage})`,
//                     backgroundImage: `url(${
//                       item.media?.thumbnailImage || "assets/staticAssets/fallback-image.jpg"
//                     })`,

//                     backgroundRepeat: "no-repeat",
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                   }}
//                   className=" h-24 lg:h-52 md:h-32 w-full rounded-lg p-2 flex justify-end transition-transform duration-300 hover:scale-125"
//                 >
//                   <div className=" text-white bg-blue-300 rounded-xl lg:text-base text-xs   font-bold lg:px-3 lg:p-0 p-1 w-[max-content] h-[max-content]">
//                     {item.category}
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex    font-medium  flex-col gap-2 p-2 lg:text-base text-xs">
//                   <div className="">
//                     {" "}
//                     <p className="lg:text-xl overflow-x-hidden   text-base flex lg:flex-row flex-col justify-between">
//                       {item.name}{" "}
//                       <p className="flex gap-2 text-gray-500 lg:text-base text-xs  ">
//                         <FaEye className="relative top-1 text-blue-600" />
//                         <span>{item.visits}</span>
//                       </p>
//                     </p>
//                     <p className="flex gap-2 text-gray-500 lg:text-base text-xs">
//                       <MdEvent className="relative top-1" />
//                       <span>{convertUTCToLocal(item.startDate)}</span>
//                       </p>
//                     <p className="flex gap-2 text-gray-500 lg:text-base text-xs">
//                       <CiLocationOn className="relative top-1" />
//                       <span>
//                         {item.venue?.city || "Pune"} -{" "}
//                         {item.venue?.country || "India"}
//                       </span>
//                     </p>
//                   </div>

//                   <p className="mt-auto  flex lg:justify-between gap-4 items-center bg-[#F5FCFE] text-sm lg:text-sm p-2">
//                     <span className="lg:text-sm text-xs">$1300 ONWARDS</span>
//                     <button className="rounded shadow lg:p-2 p-2 lg:m-0 mr-1 lg:text-sm text-xs bg-white">
//                       BUY NOW
//                     </button>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EventCardData;



/* eslint-disable react/prop-types */
import React from "react";

import { BsFire } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { MdEvent } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const convertUTCToLocal = (utcString) => {
  if (!utcString) return "Invalid Date";
  const date = new Date(utcString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Change to false if you prefer 24-hour format
  });
};


// function Cards({ heading }) {
function EventCardData({ data, heading }) {
  const navigate = useNavigate();



  return (
    <div className="flex lg:justify-start justify-center items-center overflow-hidden">
      <div className="lg:p-12 lg:pb-5 lg:pt-10 pt-5 p-5 w-full max-w-[1340px]">
      <div className="flex justify-between items-center">
      <div className="flex gap-2 lg:pl-3">
      <BsFire className="text-2xl relative top-1" />
            <p className="font-bold font-sans lg:text-2xl">{heading}</p>
          </div>
          <button
            onClick={() => navigate("/viewall")}
            className="shadow-md lg:text-base text-sm p-2  font-medium"
          >
            View All
          </button>
        </div>

        {/* Cards container with horizontal scrolling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:p-4 pt-2 w-full">
          {data.map((item, index) => (
            <div
              key={index}
              // className="flex-none shadow-lg p-2 rounded-lg lg:w-80 w-56"
              className="border shadow-lg p-3 rounded-lg w-full max-w-[320px] "

              // className="overflow-hidden  border  shadow-lg p-3 rounded-lg lg:w-[320px] w-full"
           
              onClick={() => navigate("/featuredEvent", { state: item._id })}
            >
              <div className="h-32 w-full rounded-lg"
              >
                <div
                  style={{
                    // backgroundImage: `url(${item.media.thumbnailImage})`,
                    backgroundImage: `url(${
                      item.media?.thumbnailImage || "assets/staticAssets/fallback-image.jpg"
                    })`,

                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className=" h-24 lg:h-52 md:h-32 w-full rounded-lg p-2 flex justify-end transition-transform duration-300 hover:scale-125"
                >
                  <div className=" text-white bg-blue-300 rounded-xl lg:text-base text-xs   font-bold lg:px-3 lg:p-0 p-1 w-[max-content] h-[max-content]">
                    {item.category}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex    font-medium  flex-col gap-2 p-2 lg:text-base text-xs">
                  <div className="">
                    {" "}
                    <p className="lg:text-xl overflow-x-hidden   text-base flex lg:flex-row flex-col justify-between">
                      {item.name}{" "}
                      <p className="flex gap-2 text-gray-500 lg:text-base text-xs  ">
                        <FaEye className="relative top-1 text-blue-600" />
                        <span>{item.visits}</span>
                      </p>
                    </p>
                    <p className="flex gap-2 text-gray-500 lg:text-base text-xs">
                      <MdEvent className="relative top-1" />
                      <span>{convertUTCToLocal(item.startDate)}</span>
                      </p>
                    <p className="flex gap-2 text-gray-500 lg:text-base text-xs">
                      <CiLocationOn className="relative top-1" />
                      <span>
                        {item.venue?.city || "Pune"} -{" "}
                        {item.venue?.country || "India"}
                      </span>
                    </p>
                  </div>

                  <p className="mt-auto  flex lg:justify-between gap-4 items-center  text-sm lg:text-sm p-2 whitespace-nowrap">
                    <span className="lg:text-sm text-xs">$1300 ONWARDS</span>
                    <button className="rounded shadow lg:p-2 p-2 lg:m-0 mr-1 lg:text-sm text-xs bg-white">
                      BUY NOW
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventCardData;
