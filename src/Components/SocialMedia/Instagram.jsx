// /* eslint-disable react/prop-types */
// const InstagramProfile = ({ username }) => {
//     return (
//       <a 
//         href={`https://www.instagram.com/${username}/`} 
//         target="_blank" 
//         rel="noopener noreferrer"
//         className="flex justify-center items-center h-[200px]"
//       >
//         Visit {username} on Instagram
//       </a>
//     );
//   };
  
//   // ✅ Example Usage:
//   export default InstagramProfile
  


import React from "react";

function InstagramEmbed({ id }) {
    if (!id) {
        return (
            <div className="flex justify-center items-center h-full">
            <p className="text-gray-800 text-center mt-6">Missing Instagram ID</p>
            </div>
        );
      }
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
          src={`https://www.instagram.com/${id}/embed/`}
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
}

export default InstagramEmbed;



