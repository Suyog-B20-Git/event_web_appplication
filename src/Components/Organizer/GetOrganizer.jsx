// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getOrganizer } from "../../redux/actions/master/Organizer/getOrganiser";
// import Loading from "../Loading";
// import { useNavigate } from "react-router-dom";
// import { FcLike } from "react-icons/fc";
// import { CiFacebook } from "react-icons/ci";
// import { FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
// import Select from "react-select";

// function GetOrganizer() {
//   const options = [
//     { value: "alphabetical", label: "Alphabetical" },
//     { value: "title asc", label: "Title ascending" },
//     { value: "title desc", label: "Title descending" },
//   ];
//   const [selectedOption, setSelectedOption] = useState("");
//   console.log(
//     "selected option",
//     selectedOption.value ? selectedOption.value : ""
//   );
//   const customStyles = {
//     control: (base) => ({
//       ...base,

//       borderRadius: "8px",
//     }),
//     option: (base, { isFocused, isSelected }) => ({
//       ...base,
//       backgroundColor: isSelected ? "#3498db" : isFocused ? "#85c1e9" : "white",
//       color: isSelected ? "white" : "black",
//       padding: "10px",
//     }),
//     menu: (base) => ({
//       ...base,
//       borderRadius: "8px",

//       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//     }),
//   };
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     dispatch(
//       getOrganizer(setLoading, selectedOption.value ? selectedOption.value : "")
//     );
//   }, [dispatch, selectedOption.value]);

//   const store = useSelector((state) => state.getOrganizerReducer) || {
//     organizerData: [],
//   };

//   const data = store.organizerData;
//   console.log(data, "OragnizerData....");

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <div className="p-2">
//       <div className="flex justify-between pt-5 border-b pb-2">
//         <h1 className="font-bold text-3xl text-[#ff2459] lg:px-10 px-9 md:px-10 ">
//           ORGANIZER
//         </h1>
//         <div className="md:pr-10">
//           <Select
//             options={options}
//             value={selectedOption}
//             onChange={setSelectedOption}
//             placeholder="Sort by..."
//             styles={customStyles}
//             className="lg:w-40"
//           />
//         </div>
//       </div>
//       <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-14 gap-10 p-10 grid-cols-1">
//         {data.map((item, index) => {
//           return (
//             <div
//               key={index}
//               className=" flex flex-col pb-5 shadow-md rounded   "
//               onClick={() => {
//                 navigate("/getOrganizerById", { state: item._id });
//               }}
//             >
//               <div className="h-40 lg:w-[314px] w-full overflow-hidden">
//                 <img
//                   src={item.profileImage}
//                   className="rounded-t h-40 w-full transition-transform duration-300 hover:scale-125"
//                   alt={item.name}
//                 />
//               </div>
//               <div className="p-2">
//                 <h1 className="font-medium text-lg capitalize">{item.name}</h1>
//                 <section className="text-sm text-gray-500 ">
//                   {item.address}, {item.city}, {item.state}
//                 </section>
//               </div>
//               <p className="flex gap-2 p-1 pl-0 text-lg">
//                 {/* <button>
//                   {" "}
//                   <FcLike />
//                 </button> */}

//                 <button className="text-red-500">
//                   <a href={item.facebookUrl ? item.facebookUrl : ""}>
//                     {item.facebookUrl ? (
//                       <CiFacebook className="text-red-500" />
//                     ) : (
//                       ""
//                     )}
//                   </a>
//                 </button>
//                 <button className="text-red-500">
//                   <a href={item.instagramUrl ? item.instagramUrl : ""}>
//                     {item.instagramUrl ? (
//                       <FaInstagram className="text-red-500" />
//                     ) : (
//                       ""
//                     )}
//                   </a>
//                 </button>
//                 <FcLike />
//                 <FaInstagram className="text-red-500" />
//                 <FaSquareXTwitter className="text-red-500" />
//                 <button className="text-red-500">
//                   <a href={item.twitterUrl ? item.twitterUrl : ""}>
//                     {item.twitterUrl ? (
//                       <FaSquareXTwitter className="text-red-500" />
//                     ) : (
//                       ""
//                     )}
//                   </a>
//                 </button>
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default GetOrganizer;


import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizer } from "../../redux/actions/master/Organizer/getOrganiser";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function GetOrganizer() {
  const [selectedOption, setSelectedOption] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.getOrganizerReducer.organizerData);

  useEffect(() => {
    dispatch(getOrganizer(setLoading, selectedOption.value, 1, 10)); // Fetch initial data
  }, [selectedOption.value]);

  useEffect(() => {
    if (page > 1) {
      dispatch(getOrganizer(setLoading, selectedOption.value, page, 10)); // Fetch next page data
    }
  }, [page]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -400  && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
    else{
      return;
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="p-2">
      <div className="flex justify-between pt-5 border-b pb-2">
        <h1 className="font-bold text-3xl text-[#ff2459] lg:px-10 px-9 md:px-10 ">ORGANIZER</h1>
        <div className="md:pr-10">
          <Select
            options={[
              { value: "alphabetical", label: "Alphabetical" },
              { value: "title asc", label: "Title ascending" },
              { value: "title desc", label: "Title descending" },
            ]}
            value={selectedOption}
            onChange={setSelectedOption}
            placeholder="Sort by..."
            className="lg:w-40"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-14 gap-10 p-10 grid-cols-1">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col pb-5 shadow-md rounded"
            onClick={() => navigate("/getOrganizerById", { state: item._id })}
          >
            <div className="h-40 lg:w-[314px] w-full overflow-hidden">
              <img
                src={item.profileImage}
                className="rounded-t h-40 w-full transition-transform duration-300 hover:scale-125"
                alt={item.name}
              />
            </div>
            <div className="p-2">
              <h1 className="font-medium text-lg capitalize">{item.name}</h1>
              <section className="text-sm text-gray-500 ">
                {item.address}, {item.city}, {item.state}
              </section>
            </div>
          </div>
        ))}
      </div>

      {loading && <Loading />}
    </div>
  );
}

export default GetOrganizer;
