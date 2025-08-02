export const convertToYouTubeEmbedUrl = (url) => {
  console.log("Converting YouTube URL:", url);
  try {
    const parsedUrl = new URL(url);

    if (!['www.youtube.com', 'youtube.com', 'youtu.be', ""].includes(parsedUrl.hostname)) {
      throw new Error('Invalid YouTube URL');
    }

    let videoId = null;

    // Handle youtu.be short links
    if (parsedUrl.hostname === 'youtu.be') {
      videoId = parsedUrl.pathname.slice(1); // remove leading slash
    }

    // Handle normal watch links
    if (parsedUrl.hostname.includes('youtube.com')) {
      const v = parsedUrl.searchParams.get('v');
      if (v) videoId = v;
      console.log("videoId from search params:", videoId);
    }

    if (!videoId) throw new Error('Could not extract video ID');

    return `https://www.youtube.com/embed/${videoId}`;
  } catch (err) {
    throw new Error(`YouTube URL conversion error: ${err.message}`);
  }
};


import React from "react";

const YouTubeProfile = ({ youtubeUrl }) => {
  console.log("YouTube URL received:", youtubeUrl);
  try {
    const embedUrl = convertToYouTubeEmbedUrl(youtubeUrl);

    return (
      <div className="flex justify-center items-center w-full">
        <div className="w-[90%] max-w-[500px] h-[315px] overflow-auto flex justify-center"
             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <style>{`
              .yt-scroll-container {
                  overflow: auto;
              }
              .yt-scroll-container::-webkit-scrollbar {
                  display: none;
              }
          `}</style>

          <iframe
            src={embedUrl}
            className="w-full h-full yt-scroll-container"
            style={{ border: "none", display: "block", margin: "auto" }}
            title="YouTube video player"
            border="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-600 text-center mt-6">{error.message}</p>
      </div>
    );
  }
};

export default YouTubeProfile;
