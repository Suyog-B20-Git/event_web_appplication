/* eslint-disable react/prop-types */

import { useState } from "react";
import { useLocation } from "react-router-dom";

function Photo1({ h }) {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  return (
    //   <div

    //   className={`md:w-1/2 ${location.pathname==='/createEventForm'?"lg:w-full":""} lg:block   hidden `}
    //   style={{
    //     height: h ? `${h}%` : "400px", // Dynamically set height or fallback to 400px
    //     backgroundImage:
    //       "url(https://jandevents.com/wp-content/uploads/jand-party.jpg)",
    //     backgroundPosition: "center",
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "cover",
    //   }}
    // ></div>
    <div
      className={`md:w-1/2 ${
        location.pathname === "/createEventForm" ? "lg:w-full" : ""
      } lg:block hidden relative`}
      style={{
        height: h ? `${h}%` : "400px", // Dynamically set height or fallback to 400px
      }}
    >
      {/* Show loader while image is loading */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}

      <img
        src="https://jandevents.com/wp-content/uploads/jand-party.jpg"
        alt="Event"
        onLoad={() => setLoading(false)}
        className="w-full h-full object-cover"
        style={{ display: loading ? "none" : "block" }}
      />
    </div>
  );
}

export default Photo1;
