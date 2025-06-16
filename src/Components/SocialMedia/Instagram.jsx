
const convertToInstagramEmbedUrlAndUsername = (instagramUrl) => {
  try {
      const url = new URL(instagramUrl);
      if (!['instagram.com', 'www.instagram.com'].includes(url.hostname)) {
          throw new Error('Invalid Instagram URL');
      }
      const pathParts = url.pathname.split('/').filter(Boolean);
      if (!pathParts.length) {
          throw new Error('Username not found in the URL');
      }
      // If the URL contains a 'p' segment, it's a post URL, which is not supported.
      if (pathParts[0] === 'p') {
          throw new Error('Instagram post URLs are not supported; only profile URLs with username are allowed');
      }
      const username = pathParts[0];
      const embedUrl = `https://www.instagram.com/${username}/embed/`;
      return { embedUrl, username };
  } catch (error) {
      throw new Error(`Instagram conversion error: ${error.message}`);
  }
};

import React from "react";

function InstagramEmbed({ instagramUrl }) {
  try {
      const { embedUrl } = convertToInstagramEmbedUrlAndUsername(instagramUrl);
      return (
          <div className="flex justify-center items-center w-full">
              {/* Scrollable container without visible scrollbar */}
              <div
                  className="w-[90%] max-w-[500px] h-[600px] overflow-auto flex justify-center"
                  style={{
                      scrollbarWidth: "none", // Hides scrollbar in Firefox
                      msOverflowStyle: "none", // Hides scrollbar in IE/Edge
                  }}
              >
                  {/* Hides scrollbar in Chrome, Safari, and Edge */}
                  <style>
                      {`
                          .scroll-container {
                              overflow: auto;
                          }
                          .scroll-container::-webkit-scrollbar {
                              display: none; /* Hides scrollbar */
                          }
                      `}
                  </style>

                  <iframe
                      src={embedUrl}
                      className="w-full h-full scroll-container"
                      style={{
                          border: "none",
                          display: "block",
                          margin: "auto",
                      }}
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency="true"
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
}

export default InstagramEmbed;
