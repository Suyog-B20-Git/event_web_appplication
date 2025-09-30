


import React, { useState } from "react";

function Sponsors() {
  const company = [
    "assets/Logos/l1.png",

    "assets/Logos/l3.png",
    "assets/Logos/l4.png",
    "assets/Logos/l5.png",
    "assets/Logos/l6.png",
  
    "assets/Logos/l8.png",
    "assets/Logos/l9.png",
    "assets/Logos/l10.png",
    "assets/Logos/l11.png",
    "assets/Logos/l12.png",
    "assets/Logos/l13.png",
    "assets/Logos/l14.png",
    "assets/Logos/l15.png",
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

        <div className="grid  grid-cols-3 md:grid-cols-4 lg:grid-cols-8 md:gap-4 lg:gap-4">
          {displayedSponsors.map((item, index) => (
            <div key={index} className="p-1 flex justify-center">
              <img
                src={item}
                style={{aspectRatio:"3/2",objectFit:"contain",mixBlendMode:"color-burn"}}
                alt={`Sponsor ${index + 1}`}
                className="lg:h-20  h-16 w-[120px] lg:w-[150px] rounded-2xl"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <p style={{textDecoration:'underline'}}
            className="text-blue-500 cursor-pointer px-4 py-2 rounded-lg  transition"
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
