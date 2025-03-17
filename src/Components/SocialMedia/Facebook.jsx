// /* eslint-disable react/prop-types */
// import React from 'react'

// function FacebookEmbeded({appId}) {
//   return (
//     <iframe
//     src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FZeenews&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=${appId}`}
   
    
//     className='w-[300px] h-[500px]'
//     style={{ border: "none", overflow: "hidden" }}
//     scrolling="no"
//     frameBorder="0"
//     allowfullscreen="true"
//     allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
//   ></iframe>
//   )
// }

// export default FacebookEmbeded




import React from "react";

function FacebookEmbeded({ appId }) {
  return (
    <div className="flex justify-center items-center w-full">
      {/* Scrollable container without visible scrollbar */}
      <div
        className="w-[90%] max-w-[800px] h-[500px] overflow-auto flex justify-center"
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
          src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FZeenews&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=${appId}`}
          className="w-full h-full scroll-container"
          style={{
            border: "none",
            display: "block",
            margin: "auto",
          }}
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
}

export default FacebookEmbeded;
