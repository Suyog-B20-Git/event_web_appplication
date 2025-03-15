import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizer } from "../../redux/actions/master/Organizer/getOrganiser";
import Loading from "../Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { CiFacebook } from "react-icons/ci";
import {
  FaFacebookMessenger,
  FaHeart,
  FaInstagram,
  FaSquareFacebook,
  FaSquareXTwitter,
} from "react-icons/fa6";
import Select from "react-select";
import { IoLogoWhatsapp, IoStarSharp } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { CalendarCheck } from "lucide-react";
import Pagination from "../Pagination";
import { postFavouriteOrganizer } from "../../redux/actions/master/Organizer/postFavouriteOrganizer";
import { getFavouriteOrganizerData } from "../../redux/actions/master/Organizer/GetFavouriteOrganizer";
import { toast } from "react-toastify";

function GetOrganizer() {
  const navigate = useNavigate();
  const location = useLocation();
  const value = location.state;
  const filterValue = value ? value.toLowerCase() : "";
  {
    /*header*/
  }
  const [category, setCategory] = useState("");

  const category1 = "";
  const options = [
    { value: "alphabetical", label: "Alphabetical" },
    { value: "title asc", label: "Title ascending" },
    { value: "title desc", label: "Title descending" },
  ];
  const [selectedOption, setSelectedOption] = useState("");
  console.log(
    "selected option",
    selectedOption.value ? selectedOption.value : ""
  );
  const customStyles = {
    control: (base) => ({
      ...base,

      borderRadius: "8px",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? "#3498db" : isFocused ? "#85c1e9" : "white",
      color: isSelected ? "white" : "black",
      padding: "10px",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "8px",

      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    }),
  };
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (category1) {
      dispatch(
        getOrganizer(
          setLoading,
          selectedOption?.value || "",
          currentPage,
          category1
        )
      );
    } else {
      dispatch(
        getOrganizer(
          setLoading,
          selectedOption?.value || "",
          currentPage,
          category ? category : filterValue
        )
      );
    }
  }, [dispatch, selectedOption, currentPage, category1, category, filterValue]);

  const store = useSelector((state) => state.getOrganizerReducer) || {
    organizerData: [],
  };

  const data1 = store.organizerData;
  const data = [...new Set(data1)];
  // console.log(data, "OragnizerData....");
  
  const store1 = useSelector((state) => state.getFavoriteOrganizerReducer) || {
    favouriteOrganizerData: [],
  };
  const favouriteOragnizer = store1.favouriteOrganizerData;

  // const isFavourite = favouriteOragnizer.some((event) => event._id === oId);
  const isFavourite = (id) => {
    return favouriteOragnizer.some((fav) => fav._id === id);
  };
  useEffect(() => {
    dispatch(getFavouriteOrganizerData(setLoading)); // Fetch favorites on mount
  }, [dispatch]);

  useEffect(() => {
    favouriteOragnizer.forEach((item) => {
      isFavourite(item._id);
    });
  }, [favouriteOragnizer]); // Add dependency to re-run when favorite data updates

  const checkFavourite = (id) => {
    if (favouriteOragnizer.some((fav) => fav._id === id)) {
      toast.warning("Already added to favorites!", {
        position: "top-right",
        autoClose: 2000, // Closes after 2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const handleFavourite = (id) => {
    if (isFavourite(id)) {
      return;
    } else {
      dispatch(postFavouriteOrganizer(id));

      dispatch(getFavouriteOrganizerData(setLoading));
    }
  };

  const currentUrl = window.location.href;
  const shareUrls = {
    whatsapp: `https://api.whatsapp.com/send?text=${currentUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}`,
    messenger: `https://www.messenger.com/t/?link=${currentUrl}`,
  };
  const handleShare = (platform) => {
    window.open(shareUrls[platform], "_blank");
  };

  const totalPages = store.totalPages;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex lg:flex-row flex-col gap-2 lg:pt-0 md:pt-0 pt-20">
      <div className="p-2 lg:w-[75%] w-full">
        <div className="flex justify-between pt-5 border-b pb-2">
          <h1 className="font-bold text-3xl text-[#ff2459] lg:px-10 px-3 md:px-3 ">
            {/* {filterValue ? filterValue : category ? category : "  Oraganizer"} */}
            Organizers
          </h1>

          <div className="md:pr-10">
            <Select
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
              placeholder="Sort by..."
              styles={customStyles}
              className="lg:w-40"
            />
          </div>
        </div>
        <div className=" lg:hidden flex  flex-col gap-5 rounded pt-0  ">
          <div className="rounded p-2 shadow md:flex md:gap-7 justify-between ">
            <h1 className="text-lg font-medium text-gray-900 p-2 border-b ">
              Oragnizer Category
            </h1>
            <section className="flex lg:flex-col flex-row  overflow-x-scroll gap-2 pt-3 ">
              <div className="flex gap-2 ">
                <div
                  onClick={() => {
                    setCategory("event planner");
                  }}
                  className="cursor-pointer bg-gray-200 hover:bg-[#ff2459] hover:text-white    w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Event Planner
                </div>
                <div
                  onClick={() => {
                    setCategory("wedding planner");
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white    w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Wedding Planner
                </div>
              </div>
              <div className="flex gap-2 px-2">
                <div
                  onClick={() => {
                    setCategory("adventure");
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Adventure
                </div>
              </div>
            </section>
          </div>
          <div className="rounded border ">
            <h1 className="text-lg font-medium text-gray-900 p-3 border-b flex  justify-between">
              Find Events
              <div className="flex  gap-2 text-xl">
                <button
                  onClick={() => handleShare("facebook")}
                  className="flex gap-1 shadow border p-1 rounded"
                >
                  <FaSquareFacebook className="text-blue-700 relative " />
                </button>
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="flex gap-1 shadow border p-1 rounded"
                >
                  <IoLogoWhatsapp className="text-green-600" />
                </button>
                <button
                  onClick={() => handleShare("messenger")}
                  className="flex gap-1 shadow border p-1 rounded"
                >
                  <FaFacebookMessenger className="text-red-500" />
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="flex gap-1 shadow border p-1 rounded"
                >
                  <FaSquareXTwitter className="" />
                </button>
              </div>
            </h1>
            <div className="flex justify-center items-center ">
              <div className="flex  gap-5 p-3  overflow-x-scroll ">
                <div className="bg-blue-600 rounded  h-28 min-w-28   text-white font-medium flex flex-col gap-2 items-start p-4 ">
                  <BsCalendar2DateFill className=" text-white  text-2xl font-medium" />

                  <p>Todays 0</p>
                </div>
                <div className="bg-orange-400 rounded  h-28 min-w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <BsCalendar2DateFill className=" text-white text-2xl font-medium" />

                  <p>Tommorrow 0</p>
                </div>
                <div className="bg-blue-400 rounded  h-28 min-w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <HiOutlineCalendarDateRange className="text-2xl text-white font-medium" />

                  <p className="text-sm p-1">These Weekend 0</p>
                </div>
                <div className="bg-green-600  rounded  h-28 min-w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <CalendarCheck className="text-2xl text-white font-medium" />
                  <p>Choose Date</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid  lg:grid-cols-3 md:grid-cols-3 lg:gap-14 gap-10 lg:p-10 p-2 lg:pt-10 pt-5 grid-cols-1">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className=" flex flex-col pb-5 shadow-md rounded border  "
              >
                <div
                  onClick={() => {
                    navigate(`/getOrganizerById/${item._id}`, {
                      state: item._id,
                    });
                  }}
                  className="h-40 md:h-36 lg:h-40 w-full overflow-hidden"
                >
                  <img
                    src={item.profileImage}
                    className="rounded-t h-40 w-full transition-transform duration-300 hover:scale-125"
                    alt={item.name}
                  />
                </div>
                <div
                  onClick={() => {
                    navigate(`/getOrganizerById/${item._id}`, {
                      state: item._id,
                    });
                  }}
                  className="p-2"
                >
                  <h1 className="font-medium text-lg capitalize">
                    {item.name}
                  </h1>
                  <section className="text-sm text-gray-500 ">
                    {item.address}, {item.city}, {item.state}
                  </section>
                </div>
                <div className="flex justify-between">
                  <p className="flex gap-2 p-1 px-3 text-lg">
                    <button className="text-red-500">
                      <a href={item.facebookUrl ? item.facebookUrl : ""}>
                        {item.facebookUrl ? (
                          <CiFacebook className="text-red-500" />
                        ) : (
                          ""
                        )}
                      </a>
                    </button>
                    <button className="text-red-500">
                      <a href={item.instagramUrl ? item.instagramUrl : ""}>
                        {item.instagramUrl ? (
                          <FaInstagram className="text-red-500" />
                        ) : (
                          ""
                        )}
                      </a>
                    </button>
                    <button
                      onClick={() => {
                        handleFavourite(item._id);
                        checkFavourite(item._id);
                      }}
                      className={`flex gap-1 text-xs font-bold cursor-pointer ${
                        isFavourite(item._id) ? "text-[#ff2459]" : "text-gray-200"
                      }`}
                    >
                      <FaHeart className="text-lg" />
                    </button>

                    <button className="text-red-500">
                      <a href={item.twitterUrl ? item.twitterUrl : ""}>
                        {item.twitterUrl ? (
                          <FaSquareXTwitter className="text-red-500" />
                        ) : (
                          ""
                        )}
                      </a>
                    </button>
                  </p>
                  {/* <p className="flex gap-2 pr-5">
                  5 <IoStarSharp className="relative top-1 text-yellow-400" />
                </p> */}
                </div>
              </div>
            );
          })}
        </div>
        <div className="pb-3">
          <Pagination
            handlePreviousPage={handlePreviousPage}
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            totalPages={totalPages}
          />
        </div>
      </div>
      <div className="lg:w-[25%] lg:block hidden m-2 w-full">
        <div className="flex flex-col gap-2 px-2 shadow-md p-2">
          <div className="grid grid-cols-3 gap-2 text-xl">
            <button
              onClick={() => handleShare("facebook")}
              className="flex gap-1 shadow border p-1 rounded"
            >
              <span className="text-sm border-r px-2">SHARE </span>
              <FaSquareFacebook className="text-blue-700 relative " />
            </button>
            <button
              onClick={() => handleShare("whatsapp")}
              className="flex gap-1 shadow border p-1 rounded"
            >
              <span className="text-sm border-r px-2">SHARE </span>
              <IoLogoWhatsapp className="text-green-600" />
            </button>
            <button
              onClick={() => handleShare("messenger")}
              className="flex gap-1 shadow border p-1 rounded"
            >
              <span className="text-sm border-r px-2">SHARE </span>
              <FaFacebookMessenger className="text-red-500" />
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="flex gap-1 shadow border p-1 rounded"
            >
              <span className="text-sm border-r px-2">SHARE </span>
              <FaSquareXTwitter className="" />
            </button>
          </div>
        </div>
        <div className=" lg:flex hidden flex-col gap-5 rounded pt-5 pr-3 ">
          <div className="rounded p-2 shadow ">
            <h1 className="text-lg font-medium text-gray-900 p-3 border-b ">
              Organizer Category
            </h1>
            <section className="flex flex-col gap-2 pt-3 ">
              <div className="flex gap-2 ">
                <div
                  onClick={() => {
                    setCategory("event planner");
                  }}
                  className="cursor-pointer bg-gray-200 hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Event Planner
                </div>
                <div
                  onClick={() => {
                    setCategory("wedding planner");
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white   w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Wedding Planner
                </div>
                <div
                  onClick={() => {
                    setCategory("adventure");
                  }}
                  className="cursor-pointer bg-gray-200 whitespace-nowrap hover:bg-[#ff2459] hover:text-white w-max rounded-full font-medium p-1 px-4 text-xs "
                >
                  Adventure
                </div>
              </div>
            </section>
          </div>
          <div className="rounded border">
            <h1 className="text-lg font-medium text-gray-900 p-3 border-b">
              Find Events
            </h1>
            <div className="flex justify-center items-center ">
              <div className="grid grid-cols-2 gap-4 p-3 ">
                <div className="bg-blue-600 rounded h-28 w-28 text-white font-medium flex flex-col gap-2 items-start p-4">
                  <BsCalendar2DateFill className=" text-white  text-2xl font-medium" />

                  <p>Todays 0</p>
                </div>
                <div className="bg-orange-400 rounded h-28 w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <BsCalendar2DateFill className=" text-white text-2xl font-medium" />

                  <p>Tommorrow 0</p>
                </div>
                <div className="bg-blue-400 rounded h-28 w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <HiOutlineCalendarDateRange className="text-2xl text-white font-medium" />

                  <p className="text-sm p-1">These Weekend 0</p>
                </div>
                <div className="bg-green-600 h-28 rounded w-28 font-medium flex flex-col gap-2 items-start p-4 text-white">
                  <CalendarCheck className="text-2xl text-white font-medium" />
                  <p>Choose Date</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetOrganizer;

// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getOrganizer } from "../../redux/actions/master/Organizer/getOrganiser";
// import Loading from "../Loading";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FcLike } from "react-icons/fc";
// import { CiFacebook } from "react-icons/ci";
// import {
//   FaInstagram,
//   FaSquareXTwitter,
// } from "react-icons/fa6";

// function GetOrganizer() {
//   const [category, setCategory] = useState("");
//   const location = useLocation();
//   const category1 = location.state;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [pageNo, setPageNo] = useState(1);

//   useEffect(() => {
//     dispatch(
//       getOrganizer(setLoading, "", pageNo, category1 || category || "")
//     );
//   }, [dispatch, pageNo, category1, category]);

//   const store = useSelector((state) => state.getOrganizerReducer) || {
//     organizerData: [],
//   };
//   const data = [...new Set(store.organizerData)];
//   console.log(data, "OrganizerData....");

//   const observerRef = useRef();

//   // Intersection Observer with proper clean-up
//   const lastElementRef = useCallback(
//     (node) => {
//       if (loading) return;

//       if (observerRef.current) observerRef.current.disconnect();

//       observerRef.current = new IntersectionObserver(
//         (entries) => {
//           if (entries[0].isIntersecting) {
//             setPageNo((prevPage) => prevPage + 1);
//           }
//         },
//         { rootMargin: "330px" } // Adjusting for footer height
//       );

//       if (node) observerRef.current.observe(node);
//     },
//     [loading]
//   );

//   if (loading && pageNo === 1) {
//     return <Loading />;
//   }

//   return (
//     <div className="flex lg:flex-row flex-col gap-2 lg:pt-0 md:pt-0 pt-20">
//       <div className="p-2 lg:w-[75%] w-full">
//         <div className="grid lg:grid-cols-3 md:grid-cols-3 lg:gap-14 gap-10 lg:p-10 p-2 lg:pt-10 pt-5 grid-cols-1">
//           {data.map((item, index) => (
//             <div
//               key={index}
//               className="flex flex-col pb-5 shadow-md rounded border"
//               onClick={() => navigate("/getOrganizerById", { state: item._id })}
//             >
//               <div className="h-40 md:h-36 lg:w-[303px] w-full overflow-hidden">
//                 <img
//                   src={item.profileImage}
//                   className="rounded-t h-40 w-full transition-transform duration-300 hover:scale-125"
//                   alt={item.name}
//                 />
//               </div>
//               <div className="p-2">
//                 <h1 className="font-medium text-lg capitalize">{item.name}</h1>
//                 <section className="text-sm text-gray-500">
//                   {item.address}, {item.city}, {item.state}
//                 </section>
//               </div>
//               <div className="flex justify-between">
//                 <p className="flex gap-2 p-1 px-3 text-lg">
//                   <a href={item.facebookUrl || "#"}>
//                     {item.facebookUrl && <CiFacebook className="text-red-500" />}
//                   </a>
//                   <a href={item.instagramUrl || "#"}>
//                     {item.instagramUrl && <FaInstagram className="text-red-500" />}
//                   </a>
//                   <FcLike />
//                   <a href={item.twitterUrl || "#"}>
//                     {item.twitterUrl && <FaSquareXTwitter className="text-red-500" />}
//                   </a>
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* Infinite Scroll Trigger */}
//         <div ref={lastElementRef} className="h-10"></div>
//       </div>
//     </div>
//   );
// }

// export default GetOrganizer;
