// import React from "react";

// function Sponsors() {
//   const company = [
//     "Logos/l1.png",
//     "Logos/pl2.png",
//     "Logos/l3.png",
//     "Logos/l4.png",
//     "Logos/l5.png",
//     "Logos/l6.png",
//     "logos/l7.png",
//     "Logos/l8.png",
//     "Logos/l9.png",
//     "Logos/l10.png",
//     "Logos/l11.png",
//     "Logos/l12.png",
//     "Logos/l13.png",
//     "Logos/l14.png",
//     "Logos/l15.png",
//   ];
//   return (
//     <div className=" w-full flex justify-center items-center ">
//       <div className="lg:p-5">
//         <div>
//           <h1 className="lg:text-2xl  font-medium  pb-1 ">Sponsors</h1>
//         </div>

//         {/* <div className="flex gap-1   flex-col md:flex-row md:gap-20 "> */}
//         <div className="  grid grid-cols-2  md:grid-cols-8 grid-rows-3  gap-2 ">
//           {company.map((item, index) => {
//             return (
//               <div key={index} className=" p-1 ">
//                 <img
//                   src={item}
//                   className="md:h-20 h-20  w-[150px]  md:w-[150px] rounded-2xl"
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sponsors;


import React, { useState } from "react";

function Sponsors() {
  const company = [
    "Logos/l1.png",

    "Logos/l3.png",
    "Logos/l4.png",
    "Logos/l5.png",
    "Logos/l6.png",
  
    "Logos/l8.png",
    "Logos/l9.png",
    "Logos/l10.png",
    "Logos/l11.png",
    "Logos/l12.png",
    "Logos/l13.png",
    "Logos/l14.png",
    "Logos/l15.png",
  ];

  const [showAll, setShowAll] = useState(false);

  // Determine how many sponsors to display based on the state
  const displayedSponsors = showAll ? company : company.slice(0, 8);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="lg:p-5">
        <div>
          <h1 className="lg:text-2xl font-medium pb-4">Sponsors</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayedSponsors.map((item, index) => (
            <div key={index} className="p-1 flex justify-center">
              <img
                src={item}
                alt={`Sponsor ${index + 1}`}
                className="md:h-20 h-16 w-[120px] md:w-[150px] rounded-2xl"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <p style={{textDecoration:'underline'}}
            className="text-blue-500 px-4 py-2 rounded-lg  transition"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "See Less" : "See All Sponsors"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sponsors;
