import React from "react";

const YouTubeChannelEmbed = ({ youtubeUrl }) => {
    if (!youtubeUrl) {
        return (
            <div className="flex items-center justify-center h-full w-full text-center">
              <p className="text-gray-800 mt-4">No YouTube URL provided.</p>
            </div>
          );
    }

    return (
        <div>
            <iframe
                width="560"
                height="315"
                src={youtubeUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default YouTubeChannelEmbed;
