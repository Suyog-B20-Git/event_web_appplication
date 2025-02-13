/* eslint-disable react/prop-types */

import { useLocation } from "react-router-dom";

function Photo1({ h }) {
  const location=useLocation()
  return (
    <div
      className={`md:w-1/2 ${location.pathname==='/createEventForm'?"lg:w-full":""} lg:block   hidden `}
      style={{
        height: h ? `${h}%` : "400px", // Dynamically set height or fallback to 400px
        backgroundImage:
          "url(https://jandevents.com/wp-content/uploads/jand-party.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    ></div>
  );
}

export default Photo1;
