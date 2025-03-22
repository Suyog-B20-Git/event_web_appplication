import React from "react";

const YouTubeProfile = ({ youtubeEmbedUrl }) => {
    if (!youtubeEmbedUrl) {
        return <p>No YouTube URL provided.</p>;
    }

    return (
        <div>
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