// import { FaArrowRightLong } from "react-icons/fa6";
// import Card2 from "./cards2";
// import { useRef, useState } from "react";
// import { MdNavigateNext, MdOutlineCategory } from "react-icons/md";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { GrFormPrevious } from "react-icons/gr";

// const EventCategory = () => {
//   // const [show, setshow] = useState(true);
//   const scrollContainerRef = useRef(null);

//   const scrollLeft = () => {
//     scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
//   };

//   var data = [
//     { Name: "public/Ev1.png", text: "Business " },
//     { Name: "fest.jpg", text: "Festival" },
//     { Name: "music.jpeg", text: "Live Music" },
//     { Name: "pro.jpg", text: "Professional" },
//     { Name: "cahrity.webp", text: "Social" },
//   ];
//   var data1 = [
//     { Name: "public/Ev1.png", text: "Business " },
//     { Name: "fest.jpg", text: "Festival" },
//     { Name: "music.jpeg", text: "Live Music" },
//     { Name: "pro.jpg", text: "Professional" },
//     { Name: "cahrity.webp", text: "Social" },
//     { Name: "music.jpeg", text: "Nightlife & Club" },
//     { Name: "sport.jpeg", text: "Sports & Leisure" },
//     { Name: "education.jpg", text: "Theatre & art" },
//   ];
//   return (
//     <>
//       {/* <div className=" lg:p-4 lg:pb-0 p-4 pt-1 lg:pl-14  md:pl-12   ">
//         <div className="flex justify-around items-center p-2 font-sans">
//           <div className="w-[95%]  lg:text-2xl text-xl font-bold  font-sans lg:px-24  relative md:right-1 lg:right-5  flex gap-2 ">
//             <MdOutlineCategory className="relative top-1" /> Event Category
//           </div>
//           <div
//             onClick={() => setshow(!show)}
//             className="flex items-center w-[10%] lg:mr-16 mr-7"
//           >
//             <button className=" shadow-md p-2 cursor-pointer text-base sm:font-medium font-normal sm:text-base text-[#000000]">
//               {show ? "ViewAll" : "ViewLess"}
//             </button>{" "}
//           </div>
//         </div>

        
//         <div
//           className={`  grid grid-cols-2 md:grid md:grid-cols-3  lg:grid-cols-5   lg:gap-5 gap-5 md:gap-5  lg:p-24 lg:pl-20  lg:pb-12 pt-4 pl-2 lg:pt-8
//           `}
//           // className={` grid grid-cols-2 md:grid md:grid-cols-3 lg:flex lg:justify-center flex-wrap gap-5  lg:p-8 lg:px-16 pt-4 lg:pt-8
//           // `}
//         >
//           {show
//             ? data.map((item, index) => <Card2 key={index} item={item} />)
//             : data1.map((item, index) => <Card2 key={index} item={item} />)}
//         </div>
//       </div> */}
//       <div className=" lg:p-4 lg:pb-0 p-4 pt-1 lg:pl-14  md:pl-12   ">
//         <div className="flex justify-around items-center p-2 font-sans">
//           <div className="w-[95%]  lg:text-2xl text-xl font-bold  font-sans lg:px-14  relative md:right-1 lg:right-5  flex gap-2 ">
//             <MdOutlineCategory className="relative top-1" /> Event Category
//           </div>
//         </div>

//         {/* <div
//           ref={scrollContainerRef}
//           className={`flex flex-row relative lg:left-10 scrollbar-hide overflow-scroll  lg:gap-12 gap-5 md:gap-5 lg:max-w-7xl w-full lg:p-24 lg:pr-0 lg:pl-10  lg:pb-12 pt-4 pl-2 lg:pt-8
//           `}
//           // className={` grid grid-cols-2 md:grid md:grid-cols-3 lg:flex lg:justify-center flex-wrap gap-5  lg:p-8 lg:px-16 pt-4 lg:pt-8
//           // `}
//         >
//           {data1.map((item, index) => (
//             <Card2 key={index} item={item} />
//           ))}
//         </div>
//         <div className="flex justify-between max-w-7xl relative left-14 ">
//           <button
//             onClick={scrollLeft}
//             className=" absolute left-0 z-10 bg-white p-2 rounded-full shadow-lg hidden md:block"
//           >
//             <FaArrowLeft size={20} />
//           </button>
//           <button
//             onClick={scrollRight}
//             className="absolute right-0  z-10 bg-white p-2 rounded-full shadow-lg hidden md:block"
//           >
//             <FaArrowRight size={20} />
//           </button>
//         </div> */}

//         <div className="relative left-0 flex lg:max-w-8xl items-center">
//           {/* Back button */}
//           <button
//             className="lg:block hidden left-2 relative h-[max-content] bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800"
//             onClick={scrollLeft}
//           >
//             <GrFormPrevious size={20} />
//           </button>
//           {/* Scrollable container */}
//           <div
//             ref={scrollContainerRef}
//             className={`flex flex-row relative  scrollbar-hide overflow-scroll  lg:gap-12 gap-5 md:gap-5 lg:max-w-7xl w-full lg:p-24 lg:pr-0 lg:pl-10  lg:pb-12 pt-4 pl-2 lg:pt-8
//           `}
//             // className={` grid grid-cols-2 md:grid md:grid-cols-3 lg:flex lg:justify-center flex-wrap gap-5  lg:p-8 lg:px-16 pt-4 lg:pt-8
//             // `}
//           >
//             {data1.map((item, index) => (
//               <Card2 key={index} item={item} />
//             ))}
//           </div>

//           {/* Forward button */}
//           <button
//             className=" lg:block hidden h[max-content] relative left-5 bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800"
//             onClick={scrollRight}
//           >
//             <MdNavigateNext size={20} />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };
// export default EventCategory;



import { FaArrowRightLong } from "react-icons/fa6";
import Card2 from "./cards2";
import { useRef, useState } from "react";
import { MdNavigateNext, MdOutlineCategory } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GrFormPrevious } from "react-icons/gr";

const EventCategory = () => {
  // const [show, setshow] = useState(true);
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  var data = [
    { Name: "Ev1.png", text: "Business " },
    { Name: "staticAssets/fest.jpg", text: "Festival" },
    { Name: "staticAssets/music.jpeg", text: "Live Music" },
    { Name: "staticAssets/pro.jpg", text: "Professional" },
    { Name: "staticAssets/cahrity.webp", text: "Social" },
  ];
  var data1 = [
    { Name: "Ev1.png", text: "Business " },
    { Name: "staticAssets/fest.jpg", text: "Festival" },
    { Name: "staticAssets/music.jpeg", text: "Live Music" },
    { Name: "staticAssets/pro.jpg", text: "Professional" },
    { Name: "staticAssets/cahrity.webp", text: "Social" },
    { Name: "staticAssets/music.jpeg", text: "Nightlife & Club" },
    { Name: "staticAssets/sport.jpeg", text: "Sports & Leisure" },
    { Name: "staticAssets/education.jpg", text: "Theatre & art" },
  ];
  return (
    <>
      {/* <div className=" lg:p-4 lg:pb-0 p-4 pt-1 lg:pl-14  md:pl-12   ">
        <div className="flex justify-around items-center p-2 font-sans">
          <div className="w-[95%]  lg:text-2xl text-xl font-bold  font-sans lg:px-24  relative md:right-1 lg:right-5  flex gap-2 ">
            <MdOutlineCategory className="relative top-1" /> Event Category
          </div>
          <div
            onClick={() => setshow(!show)}
            className="flex items-center w-[10%] lg:mr-16 mr-7"
          >
            <button className=" shadow-md p-2 cursor-pointer text-base sm:font-medium font-normal sm:text-base text-[#000000]">
              {show ? "ViewAll" : "ViewLess"}
            </button>{" "}
          </div>
        </div>

        
        <div
          className={`  grid grid-cols-2 md:grid md:grid-cols-3  lg:grid-cols-5   lg:gap-5 gap-5 md:gap-5  lg:p-24 lg:pl-20  lg:pb-12 pt-4 pl-2 lg:pt-8
          `}
          // className={` grid grid-cols-2 md:grid md:grid-cols-3 lg:flex lg:justify-center flex-wrap gap-5  lg:p-8 lg:px-16 pt-4 lg:pt-8
          // `}
        >
          {show
            ? data.map((item, index) => <Card2 key={index} item={item} />)
            : data1.map((item, index) => <Card2 key={index} item={item} />)}
        </div>
      </div> */}
          {/* <div className="flex flex-col items-center justify-center w-full"> */}


    <div className="items-center justify-center lg:p-4 lg:pb-0 p-4 pt-1">
    <div className="flex justify-around items-center p-2 font-sans">
          <div className="w-[95%]  lg:text-2xl text-xl font-bold  font-sans lg:px-14  relative md:right-1 lg:right-5  flex gap-2 ">
            <MdOutlineCategory className="relative top-1" /> Event Category
          </div>
        </div>

        {/* <div
          ref={scrollContainerRef}
          className={`flex flex-row relative lg:left-10 scrollbar-hide overflow-scroll  lg:gap-12 gap-5 md:gap-5 lg:max-w-7xl w-full lg:p-24 lg:pr-0 lg:pl-10  lg:pb-12 pt-4 pl-2 lg:pt-8
          `}
          // className={` grid grid-cols-2 md:grid md:grid-cols-3 lg:flex lg:justify-center flex-wrap gap-5  lg:p-8 lg:px-16 pt-4 lg:pt-8
          // `}
        >
          {data1.map((item, index) => (
            <Card2 key={index} item={item} />
          ))}
        </div>
        <div className="flex justify-between max-w-7xl relative left-14 ">
          <button
            onClick={scrollLeft}
            className=" absolute left-0 z-10 bg-white p-2 rounded-full shadow-lg hidden md:block"
          >
            <FaArrowLeft size={20} />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0  z-10 bg-white p-2 rounded-full shadow-lg hidden md:block"
          >
            <FaArrowRight size={20} />
          </button>
        </div> */}

        <div className="relative left-0 flex lg:max-w-8xl items-center justify-center">
          {/* Back button */}
          <button
          className="lg:block hidden mr-4 bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800"
          onClick={scrollLeft}
          >
            <GrFormPrevious size={20} />
          </button>
          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex flex-row scrollbar-hide overflow-scroll lg:gap-12 gap-5 md:gap-5 lg:max-w-7xl w-full lg:p-24 lg:pr-0 lg:pl-10 lg:pb-12 pt-4 pl-2 lg:pt-8"

            // className={` grid grid-cols-2 md:grid md:grid-cols-3 lg:flex lg:justify-center flex-wrap gap-5  lg:p-8 lg:px-16 pt-4 lg:pt-8
            // `}
          >
            {data1.map((item, index) => (
              <Card2 key={index} item={item} />
            ))}
          </div>

          {/* Forward button */}
          <button
          className="lg:block hidden ml-4 bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800"
          onClick={scrollRight}
          >
            <MdNavigateNext size={20} />
          </button>
        </div>
      </div>
    </>
  );
};
export default EventCategory;
