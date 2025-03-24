import React from "react";

function WatchTrailer() {
  return (
    <center>
      <div className="rounded-md bg-white shadow-lg  w-full p-1 sm:p-8 flex flex-col justify-center ">
        <h1 className="text-2xl sm:text-3xl text-left font-semibold w-full mb-4 sm:mb-8">Watch Trailer</h1>
        <div className="flex justify-center items-center">
          <iframe
            width="960"
            height="370"
            className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[370px]"
            src="https://www.youtube.com/embed/lD1X-ODWhvg?si=CbGzId282KczSEVj"
            title="YouTube video player"
            frameBorder="0"
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
