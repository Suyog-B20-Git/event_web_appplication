import React from "react";

function WatchTrailer() {
  return (
    <center>
      <div className="rounded-md bg-white shadow-lg  w-full p-1 mb-0 sm:p-8 flex flex-col justify-center ">
        <div className="flex justify-center items-center">
          <iframe
            width="960"
            height="370"
            className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] "
            src="https://www.youtube.com/embed/lD1X-ODWhvg?si=CbGzId282KczSEVj"
            title="YouTube video player"
            Border="10"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </center>
  );
}

export default WatchTrailer;
