/* eslint-disable react/prop-types */
// src/FacebookComments.jsx
import React, { useEffect } from "react";

const FacebookComments = ({ dataHref, numPosts = 5, width = "600" }) => {
  useEffect(() => {
    const parseFB = () => {
      if (window.FB) {
        window.FB.XFBML.parse();
      }
    };
    const appId = "2099487807026347";
    console.log(import.meta.env);
    if (window.FB) {
      parseFB();
    } else {
      // Ensure fb-root exists
      if (!document.getElementById("fb-root")) {
        const fbRoot = document.createElement("div");
        fbRoot.id = "fb-root";
        document.body.prepend(fbRoot);
      }

      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v22.0&appId=${appId}`;
      document.body.appendChild(script);
      script.onload = () => {
        if (window.FB) {
          window.FB.init({
            appId: appId,
            autoLogAppEvents: true,
            xfbml: true,
            version: "v22.0",
          });
          // Add a short delay to ensure DOM elements are ready
          setTimeout(parseFB, 100);
        }
      };
    }
  }, [dataHref]);
  return (
    <div
      className="fb-comments"
      data-href={dataHref}
      data-numposts={numPosts}
      data-width={width}
    ></div>
  );
};

export default FacebookComments;
