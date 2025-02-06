// import React from "react";

// function Photo1({h}) {
//   return (
//     <div
//       className="h-[400px] md:h-[h%] md:w-1/2 lg:block hidden "
//       style={{
//         backgroundImage:
//           "url(https://jandevents.com/wp-content/uploads/jand-party.jpg)",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//       }}
//     ></div>
//   );
// }

// export default Photo1;


import React from "react";

function Photo1({ h }) {
  return (
    <div
      className={`md:w-1/2 lg:block hidden`}
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
