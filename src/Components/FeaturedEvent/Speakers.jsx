// import React from "react";
// import { CiLocationOn } from "react-icons/ci";
// import {
//   FaArrowRightLong,
//   FaFacebook,
//   FaInstagram,
//   FaTwitter,
// } from "react-icons/fa6";
// import { TbWorld } from "react-icons/tb";

// function Speakers() {
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
//   ];
//   return (
//     <div className="lg:w-full flex justify-center items-center ">
//       <div className="lg:p-10 p-5">
//         <div>
//           <h1 className="text-base  font-medium  pb-1 ">Speakers</h1>
//         </div>

       
//         <div className="lg:flex gap-10   grid grid-cols-2 grid-rows-2 md:grid-cols-3   lg:flex-row lg:gap-20 ">
//           {card1.map((item, index) => {
//             return (
//               <div
//                 key={index}
//                 className="shadow flex flex-col justify-center items-center  p-1 rounded-lg"
//               >
//                 <img
//                   src={item.img}
//                   className="h-20  lg:h-36 lg:w-36 md:h-32 md:w-36   w-20 rounded-full"
//                 />
//                 <div className="flex flex-col gap-1 items-center">
//                   <p className=" text-gray-800 lg:text-xl text-sm">
//                     {item.name}
//                   </p>
//                   <div>
//                     <p className="text-xs font-thin">{item.desc} </p>
//                     <p className="flex lg:text-base text-xs  gap-2 p-1 justify-center">
//                       <FaFacebook />
//                       <FaInstagram />
//                       <FaTwitter />
//                       <TbWorld />
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Speakers;


import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";

function Speakers() {
  const card1 = [
    { img: "Speaker1.png", name: "Decon Duffy", desc: "Engineer & Businessman" },
    { img: "Speaker2.png", name: "Jordyn Bryn", desc: "CEO & Founder" },
    { img: "Speaker1.png", name: "Decon Duffy", desc: "Engineer & Businessman" },
    { img: "Speaker1.png", name: "Decon Duffy", desc: "Engineer & Businessman" },
    { img: "Speaker2.png", name: "Jordyn Bryn", desc: "CEO & Founder" },
 
  ];

  return (
    <div className="lg:w-full flex justify-center items-center">
      <div className="lg:p-10 p-5 w-full">
        <div>
          <h1 className="text-base font-medium pb-1">Speakers</h1>
        </div>
        {/* Card Container */}
        <div className="flex gap-5 overflow-x-scroll lg:overflow-visible lg:flex-wrap scrollbar-hide">
          {card1.map((item, index) => {
            return (
              <div
                key={index}
                className="shadow flex flex-col justify-center items-center p-5 rounded-lg min-w-[120px] lg:min-w-[250px]"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-20 lg:h-36 lg:w-36 w-20 rounded-full"
                />
                <div className="flex flex-col gap-1 items-center">
                  <p className="text-gray-800 lg:text-xl text-sm">{item.name}</p>
                  <p className="text-xs font-thin">{item.desc}</p>
                  <div className="flex text-xs lg:text-base gap-2 justify-center">
                    <FaFacebook />
                    <FaInstagram />
                    <FaTwitter />
                    <TbWorld />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Speakers;
