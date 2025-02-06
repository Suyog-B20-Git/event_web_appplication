import React from "react";

function Photo() {
  return (
    <div
      className="h-[500px] md:h-full lg:h-full lg:w-1/2 md:w-1/2 lg:block  md:block hidden "
      style={{
        backgroundImage:
          "url(https://jandevents.com/wp-content/uploads/jand-party.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    ></div>
  );
}

export default Photo;
