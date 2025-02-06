import React from "react";

function WatchTrailer() {
  return (
    <center>
      <div className="rounded-md bg-white shadow-lg  w-full p-10 pt-3 flex flex-col gap-3 justify-center m-2 ">
        <h1 className="text-3xl text-left font-medium w-full">Watch Trailer</h1>
        <div className="flex justify-center items-center">
          <iframe
            width="960"
            height="370"
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
