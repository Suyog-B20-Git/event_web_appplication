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

function FacebookEmbeded({ appId ,fbId}) {
    var pgName = convertToFacebookEmbedUrlAndPageId(fbId);;
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
          src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F${pgName}&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=${appId}`}
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

const convertToFacebookEmbedUrlAndPageId = (facebookUrl) => {
    try {
        const url = new URL(facebookUrl);

        // Validate the hostname (allowing multiple Facebook domains)
        const validHostnames = ['facebook.com', 'www.facebook.com', 'm.facebook.com', 'web.facebook.com'];
        if (!validHostnames.includes(url.hostname)) {
            throw new Error('Invalid Facebook URL');
        }

        let path = url.pathname.replace(/\/$/, ''); // Remove trailing slash if present
        if (!path || path === '/') {
            throw new Error('Invalid path in Facebook URL');
        }

        // Handle URLs with unnecessary query parameters or fragments
        path = path.split('?')[0].split('#')[0];

        // Extracting the Page username or ID
        const pathParts = path.split('/').filter(Boolean); // Remove empty parts

        // Handling different possible Facebook Page URL formats
        let pageIdOrUsername = null;

        if (pathParts.length >= 1) {
            if (pathParts[0] === 'pages' && pathParts.length >= 3) {
                // URLs like: https://www.facebook.com/pages/NASA/54971236789
                pageIdOrUsername = pathParts[2]; // Extract the numeric Page ID
            } else {
                // Standard page URL: https://www.facebook.com/nasa
                // Mobile URL: https://m.facebook.com/nasa/
                pageIdOrUsername = pathParts[0];
            }
        }

        if (!pageIdOrUsername) {
            throw new Error('Page ID or username not found in the URL');
        }
        return pageIdOrUsername;
    } catch (error) {
        console.error('Error converting Facebook Page URL:', error.message);
        return null;
    }
};



function isFacebookUrl(fbId) {
    try {
        const url = new URL(fbId);
        return url.hostname === 'www.facebook.com' || url.hostname === 'facebook.com';
    } catch (e) {
        return false;
    }
}

function isAlphanumericId(fbId) {
    return /^[a-zA-Z0-9]+$/.test(fbId);
}

function identifyFbId(fbId) {
    if (isFacebookUrl(fbId)) {
        return false;
    } else {
        return true;
    }
}