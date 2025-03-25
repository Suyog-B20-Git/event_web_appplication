import React from "react";

const YouTubeProfile = ({ youtubeEmbedUrl }) => {
    if (!youtubeEmbedUrl) {
        return (
            <div className="flex items-center justify-center h-full w-full text-center">
              <p className="text-gray-800 mt-4">No YouTube URL provided.</p>
            </div>
          );
    }

    return (
        <div className="flex justify-center">
            <iframe
                width="560"
                height="315"
                src={youtubeEmbedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};
export default YouTubeProfile