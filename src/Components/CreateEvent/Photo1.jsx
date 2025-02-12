/* eslint-disable react/prop-types */

function Photo1({ h }) {
  return (
    <div
      className={`md:w-1/2 lg:w-full lg:block   hidden `}
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
