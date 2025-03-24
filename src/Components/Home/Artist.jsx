// import React, { useRef } from "react";
// import { CiLocationOn } from "react-icons/ci";
// import { FaArrowAltCircleRight } from "react-icons/fa";
// import {
//   FaArrowRightLong,
//   FaFacebook,
//   FaInstagram,
//   FaTwitter,
// } from "react-icons/fa6";
// import { GrFormPrevious } from "react-icons/gr";
// import { MdNavigateNext } from "react-icons/md";
// import { TbWorld } from "react-icons/tb";

// function Artist() {
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
//   const card1 = [
//     {
//       img: "Speaker1.png",
//       name: "Decon Duffy",
//       desc: "Engineer & Businessman",
//     },
//     { img: "Speaker2.png", name: "Jordyn Bryn", desc: "CEO & Founder" },
//     {
//       img: "Speaker1.png",
//       name: "Decon Duffy",
//       desc: "Engineer & Businessman",
//     },
//     {
//       img: "Speaker1.png",
//       name: "Decon Duffy",
//       desc: "Engineer & Businessman",
//     },
//     { img: "Speaker2.png", name: "Jordyn Bryn", desc: "CEO & Founder" },
//     {
//       img: "Speaker1.png",
//       name: "Decon Duffy",
//       desc: "Engineer & Businessman",
//     },
//     {
//       img: "Speaker1.png",
//       name: "Decon Duffy",
//       desc: "Engineer & Businessman",
//     },
//     { img: "Speaker2.png", name: "Jordyn Bryn", desc: "CEO & Founder" },
//     {
//       img: "Speaker1.png",
//       name: "Decon Duffy",
//       desc: "Engineer & Businessman",
//     },
//     {
//       img: "Speaker1.png",
//       name: "Decon Duffy",
//       desc: "Engineer & Businessman",
//     },
//     { img: "Speaker2.png", name: "Jordyn Bryn", desc: "CEO & Founder" },
//     {
//       img: "Speaker1.png",
//       name: "Decon Duffy",
//       desc: "Engineer & Businessman",
//     },
//   ];
//   return (
//     <div className=" w-full flex justify-center items-center pt-5 ">
//       <div className="lg:p-10 md:p-4 md:pb-5  p-5 ">
//         <div className="flex justify-around md:justify-between lg:justify-between lg:relative lg:left-14 lg:pb-0 pb-2">
//           <h1 className="text-base md:text-lg  font-medium  pb-1 relative lg:left-0 left-14 md:left-7 md:right-8 ">
//             Artist
//           </h1>
//           {/* <div className="flex gap-2 relative right-8 md:-right-4 lg:right-32">
//             Swipe
//             <FaArrowAltCircleRight size={20} />
//           </div> */}
//         </div>

//         {/* <div className="md:flex gap-10   grid grid-cols-2 grid-rows-2   md:flex-row md:gap-20 "> */}
//         {/* <div className="   grid grid-cols-3   grid-rows-2 lg:grid-cols-6 md:grid-cols-4 lg:grid-rows-1 lg:gap-12 md:gap-12 gap-7 "> */}
//         {/* <div className="flex relative lg:right-14 left-52 lg:-left-10 md:left-2 lg:gap-20 md:gap-10 lg:ml-[100px] md:ml-0 overflow-x-auto p-2 scrollbar-hide lg:max-w-[1200px] md:max-w-[700px] max-w-3xl whitespace-nowrap">
//           {card1.map((item, index) => {
//             return (
//               <div key={index} className="  p-1 rounded-lg">
//                 <img
//                   src={item.img}
//                   className="h-20 w-20 lg:h-36 md:h-28 md:w-28 lg:w-36 rounded-full"
//                 />
//                 <div className="flex flex-col gap-2 items-center">
//                   <p className=" text-gray-800  text-sm p-1 font-medium">
//                     {item.name}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div> */}
//         {/* <div className="flex relative lg:right-14 left-52 lg:-left-10 md:left-2 lg:gap-24 md:gap-10 lg:ml-[100px] md:ml-0 overflow-x-auto p-2 scrollbar-hide lg:max-w-[1200px] md:max-w-[700px] max-w-3xl whitespace-nowrap">
//           {card1.map((item, index) => {
//             return (
//               <div key={index} className="p-1 flex flex-col items-center">
//                 <div className="h-20 w-20 lg:h-36 md:h-28 md:w-28 lg:w-36 rounded-full overflow-hidden flex justify-center items-center">
//                   <img src={item.img} className="h-full w-full object-cover" />
//                 </div>
//                 <p className="text-gray-800 text-sm p-1 font-medium">
//                   {item.name}
//                 </p>
//               </div>
//             );
//           })}
//         </div> */}

//         <div className="relative left-3 flex  items-center">
//           {/* Back button */}
//           <button
//             className="lg:block relative left-10 hidden h-[max-content] bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800"
//             onClick={() => handleScroll("left")}
//           >
//             <GrFormPrevious size={20} />
//           </button>
//           {/* Scrollable container */}
//           <div
//             ref={scrollRef}
//             className="flex relative lg:right-14 left-52 lg:-left-10 md:left-2 lg:gap-24 md:gap-10 lg:ml-[100px] md:ml-0 overflow-x-auto p-2 scrollbar-hide lg:max-w-[1200px] md:max-w-[700px] max-w-3xl whitespace-nowrap"
//           >
//             {card1.map((item, index) => {
//               return (
//                 <div key={index} className="p-1 flex flex-col items-center">
//                   <div className="h-20 w-20 lg:h-36 md:h-28 md:w-28 lg:w-36 rounded-full overflow-hidden flex justify-center items-center">
//                     <img
//                       src={item.img}
//                       className="h-full w-full object-cover"
//                     />
//                   </div>
//                   <p className="text-gray-800 text-sm p-1 font-medium">
//                     {item.name}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//           {/* Forward button */}
//           <button
//             className=" lg:block relative right-10 hidden h[max-content] bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800"
//             onClick={() => handleScroll("right")}
//           >
//             <MdNavigateNext size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Artist;


import React, { useRef } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowAltCircleRight } from "react-icons/fa";
import {
  FaArrowRightLong,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa6";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

function Artist() {
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
  const card1 = [
    {
      img: "assets/staticAssets/Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    { img: "assets/staticAssets/Speaker2.png", name: "Jordyn Bryn", desc: "CEO & Founder" },
    {
      img: "assets/staticAssets/Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    {
      img: "assets/staticAssets/Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    { img: "assets/staticAssets/Speaker2.png", name: "Jordyn Bryn", desc: "CEO & Founder" },
    {
      img: "assets/staticAssets/Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    {
      img: "assets/staticAssets/Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    { img: "assets/staticAssets/Speaker2.png", name: "Jordyn Bryn", desc: "CEO & Founder" },
    {
      img: "assets/staticAssets/Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    {
      img: "assets/staticAssets/Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
    { img: "assets/staticAssets/Speaker2.png", name: "Jordyn Bryn", desc: "CEO & Founder" },
    {
      img: "assets/staticAssets/Speaker1.png",
      name: "Decon Duffy",
      desc: "Engineer & Businessman",
    },
  ];
  return (
    <div className=" w-full flex justify-center items-center pt-5 ">
      <div className="lg:p-10 md:p-4 md:pb-5  p-5 w-full max-w-7xl">
      <div className="flex justify-between items-center pb-2">
        {/* <div className="flex justify-around md:justify-between lg:justify-between lg:relative lg:left-14 lg:pb-0 pb-2"> */}
          <h1 className="ml-2 smLml-6 font-bold font-sans lg:text-2xl">
            ARTIST
          </h1>
          {/* <div className="flex gap-2 relative right-8 md:-right-4 lg:right-32">
            Swipe
            <FaArrowAltCircleRight size={20} />
          </div> */}
        </div>

        {/* <div className="md:flex gap-10   grid grid-cols-2 grid-rows-2   md:flex-row md:gap-20 "> */}
        {/* <div className="   grid grid-cols-3   grid-rows-2 lg:grid-cols-6 md:grid-cols-4 lg:grid-rows-1 lg:gap-12 md:gap-12 gap-7 "> */}
        {/* <div className="flex relative lg:right-14 left-52 lg:-left-10 md:left-2 lg:gap-20 md:gap-10 lg:ml-[100px] md:ml-0 overflow-x-auto p-2 scrollbar-hide lg:max-w-[1200px] md:max-w-[700px] max-w-3xl whitespace-nowrap">
          {card1.map((item, index) => {
            return (
              <div key={index} className="  p-1 rounded-lg">
                <img
                  src={item.img}
                  className="h-20 w-20 lg:h-36 md:h-28 md:w-28 lg:w-36 rounded-full"
                />
                <div className="flex flex-col gap-2 items-center">
                  <p className=" text-gray-800  text-sm p-1 font-medium">
                    {item.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div> */}
        {/* <div className="flex relative lg:right-14 left-52 lg:-left-10 md:left-2 lg:gap-24 md:gap-10 lg:ml-[100px] md:ml-0 overflow-x-auto p-2 scrollbar-hide lg:max-w-[1200px] md:max-w-[700px] max-w-3xl whitespace-nowrap">
          {card1.map((item, index) => {
            return (
              <div key={index} className="p-1 flex flex-col items-center">
                <div className="h-20 w-20 lg:h-36 md:h-28 md:w-28 lg:w-36 rounded-full overflow-hidden flex justify-center items-center">
                  <img src={item.img} className="h-full w-full object-cover" />
                </div>
                <p className="text-gray-800 text-sm p-1 font-medium">
                  {item.name}
                </p>
              </div>
            );
          })}
        </div> */}

     <div className="relative flex items-center justify-center">
        {/* <div className="relative left-3 flex  items-center"> */}
          {/* Back button */}
          <button
            className="lg:block relative left-10 hidden h-[max-content] bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800"
            onClick={() => handleScroll("left")}
          >
            <GrFormPrevious size={20} />
          </button>
          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-10 overflow-x-auto p-2 scrollbar-hide max-w-4xl mx-auto whitespace-nowrap"
          >
            {card1.map((item, index) => {
              return (
                <div key={index} className="p-1 flex flex-col items-center">
                  <div className="h-20 w-20 lg:h-36 md:h-28 md:w-28 lg:w-36 rounded-full overflow-hidden flex justify-center items-center">
                    <img
                      src={item.img}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-gray-800 text-sm p-1 font-medium text-center">
                    {item.name}
                  </p>
                </div>
              );
            })}
          </div>
          {/* Forward button */}
          <button
            className=" lg:block relative right-10 hidden h[max-content] bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800"
            onClick={() => handleScroll("right")}
          >
            <MdNavigateNext size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Artist;
