/* eslint-disable react/prop-types */
import React from "react";

function WatchTrailer({ youtubeVideoUrl = [] }) {
 const getEmbedUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    let videoId = parsedUrl.searchParams.get("v");

    // Fallback for shorts URLs
    if (!videoId && parsedUrl.pathname.startsWith("/shorts/")) {
      videoId = parsedUrl.pathname.split("/shorts/")[1];
    }

    if (!videoId) {
      console.error("No video ID found in URL:", url);
      return "";
    }

    return `https://www.youtube.com/embed/${videoId}`;
  } catch (error) {
    console.error("Invalid YouTube URL:", url);
    return "";
  }
};


  return (
    <center>
        {youtubeVideoUrl.length === 1 ? (
          <div className="flex justify-center items-center w-full mb-3">
            <iframe
              className="lg:w-[700px] h-[220px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-lg"
              src={getEmbedUrl(youtubeVideoUrl[0])}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto scroll-hide px-2 w-full py-2">
            {youtubeVideoUrl.map((url, index) => (
              <iframe
                key={index}
                className="flex-none w-[300px] h-[180px] sm:w-[360px] sm:h-[220px] md:w-[400px] md:h-[250px] rounded-lg"
                src={getEmbedUrl(url)}
                title={`YouTube video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            ))}
          </div>
        )}
    </center>
  );
}

export default WatchTrailer;
