import React from "react";

function EventGallery() {
  const gallery = [
    "EventGallery/eventg1.png",
    "EventGallery/eventg1.png",
    "EventGallery/eventg1.png",
    "EventGallery/eventg1.png",
    "EventGallery/eventg1.png",
  ];
  return (
    // <div className="m-2 shadow-lg rounded-xl p-3">
    //   <h1 className="font-semibold text-lg m-2">Event Gallery</h1>
    //   <div className="grid grid-cols-3 gap-2 grid-rows-2 lg:flex md:gap-30 lg:justify-around ">
    //     {gallery.map((item, index) => {
    //       return (
    //         <img
    //           key={index}
    //           src={item}
    //           alt=""
    //           width={"200px"}
    //           height={"200px"}
    //         />
    //       );
    //     })}
    //   </div>
    // </div>
    <div className="flex lg:justify-center lg:items-center overflow-hidden">
      <div className="lg:p-12 p-3 w-full max-w-8xl">
      
          <div className="flex ">
            <p className="font-bold font-sans lg:text-2xl">Event Gallery</p>
          </div>
       

        {/* Cards container with horizontal scrolling */}
        <div className="flex gap-4 overflow-x-auto p-4 px-0 scrollbar-hide w-full">
          {gallery.map((item, index) => (
            <div
              key={index}
              className="flex-none shadow-lg p-2 rounded-lg lg:w-[320px] w-44"
            >
              <img
                src={item}
                className="h-24 lg:h-52 md:h-32 w-full rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventGallery;
