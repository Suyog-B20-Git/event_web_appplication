import React, { useEffect, useState } from "react";
import { BsFire } from "react-icons/bs";
import { IoMenu, IoRefresh } from "react-icons/io5";
import { VscFilterFilled } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getEventByFilter } from "../redux/actions/master/Events/getEventByFilter";
import Loading from "../Components/Loading";
import EventFilterBar from "./EventFilterBar";
import Pagination from "../Components/Pagination";
import FollowEvent from "../Components/FollowEvent";
import Select from "react-select";

const convertUTCToLocal = (utcString) => {
  if (!utcString) return "Invalid Date";
  const date = new Date(utcString);
  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
};

function Viewall() {
  const location = useLocation();
  const value = location.state;
  const filterValue = value?.toLowerCase() || "";

  const [filter, setFilter] = useState(false);
  
  // Price options
  const priceOptions = [
    { value: "free", label: "Free" },
    { value: "paid", label: "Paid" },
  ];
  
  // City options
  const cityOptions = [
    { value: "mumbai", label: "Mumbai" },
    { value: "delhi", label: "Delhi" },
    { value: "bangalore", label: "Bangalore" },
    { value: "pune", label: "Pune" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "chennai", label: "Chennai" },
    { value: "kolkata", label: "Kolkata" },
    { value: "ahmedabad", label: "Ahmedabad" },
    { value: "jaipur", label: "Jaipur" },
    { value: "surat", label: "Surat" },
    { value: "lucknow", label: "Lucknow" },
    { value: "kanpur", label: "Kanpur" },
    { value: "nagpur", label: "Nagpur" },
    { value: "indore", label: "Indore" },
    { value: "thane", label: "Thane" },
    { value: "bhopal", label: "Bhopal" },
    { value: "visakhapatnam", label: "Visakhapatnam" },
    { value: "pimpri", label: "Pimpri-Chinchwad" },
    { value: "patna", label: "Patna" },
    { value: "vadodara", label: "Vadodara" },
  ];

  const [price, setPrice] = useState("");
  const [city, setCity] = useState(""); // New city state
  const priceType = price?.value || "";
  const cityType = city?.value || ""; // New city value
  const [searchEvent, setSearchEvent] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch data only when page changes
    handleApi();
  }, [currentPage]);

  const handleApi = () => {
    dispatch(
      getEventByFilter(
        setLoading,
        filterValue,
        priceType,
        searchEvent,
        currentPage,
        cityType // Pass city filter to API
      )
    );
  };

  const store = useSelector((state) => state.getEventByFilterReducer) || {
    filterEventData: [],
    totalPages: 1,
  };
  const data = store.filterEventData || [];
  const totalPages = store.totalPages || 1;

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

  const reset = () => {
    setSearchEvent("");
    setPrice("");
    setCity(""); // Reset city filter
    setCurrentPage(1);
    dispatch(
      getEventByFilter(
        setLoading,
        filterValue,
        "",
        "",
        1,
        "" // Reset city in API call
      )
    );
  };

  const selCategory = localStorage.getItem("selectedCategory");

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center w-full pt-[87px] sm:pt-4">
      <div className="p-5 w-full max-w-[1340px]">
        <div className="flex justify-between">
          <div className="flex gap-2 lg:pl-3">
            <BsFire className="text-2xl relative top-0" />
            <p className="font-bold font-sans lg:text-2xl">EVENTS</p>
          </div>
        </div>

        <div className="flex justify-between pt-8 p-2 lg:px-3 gap-4">
          <button
            onClick={() => setFilter(!filter)}
            className="flex gap-3 lg:text-2xl md:text-base font-medium"
          >
            <div className="border-2 h-max border-[#ff2459] text-[#ff2459] flex lg:justify-center lg:items-center p-1 rounded-md">
              <IoMenu />
            </div>
            Filters
          </button>

          <div className="flex lg:text-base text-xs lg:gap-4 gap-2">
            <button
              onClick={reset}
              className="flex gap-1 lg:text-base md:text-base text-xs font-medium text-[#ff2459] border border-[#ff2459] p-1 rounded"
            >
              <IoRefresh className="text-[#ff2459] relative top-1" />
              Refresh Filters
            </button>

            <button
              onClick={() => {
                setCurrentPage(1);
                handleApi();
              }}
              disabled={!(priceType || searchEvent || cityType)} // Include city in condition
              className={`flex gap-1 font-medium lg:text-base md:text-base text-xs
                ${
                  priceType || searchEvent || cityType // Include city in condition
                    ? "text-[#ff2459] border border-[#ff2459]"
                    : "text-gray-400 border border-gray-400 cursor-not-allowed"
                }
                p-1 rounded`}
            >
              <VscFilterFilled className="relative top-1 lg:text-lg" />
              Apply Filter
            </button>
          </div>
        </div>

        {filter && (
          <div className="px-5 lg:text-lg text-sm p-5 flex flex-col gap-2">
            <div className="grid lg:grid-cols-3 gap-3 md:grid-cols-2 grid-cols-1"> {/* Changed to 3 columns for large screens */}
              <div className="flex flex-col gap-0.5">
                <label htmlFor="searchEvent" className="lg:text-lg text-sm text-gray-900 p-1">
                  Search event
                </label>
                <input
                  type="text"
                  name="searchEvent"
                  placeholder="Search event by event name, venue, city..."
                  value={searchEvent}
                  className="border-gray-300 outline-blue-500 outline-2 border bg-white rounded-md px-3 p-1.5"
                  onChange={(e) => setSearchEvent(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-0.5">
                <label htmlFor="price" className="lg:text-lg text-sm text-gray-900 p-1">
                  Price
                </label>
                <Select
                  options={priceOptions}
                  value={price}
                  onChange={setPrice}
                  placeholder="Select a price"
                  isClearable
                />
              </div>

              <div className="flex flex-col gap-0.5">
                <label htmlFor="city" className="lg:text-lg text-sm text-gray-900 p-1">
                  City
                </label>
                <Select
                  options={cityOptions}
                  value={city}
                  onChange={setCity}
                  placeholder="Select a city"
                  isClearable
                  isSearchable
                />
              </div>
            </div>
          </div>
        )}


        <EventFilterBar
          searchEvent={searchEvent}
          priceType={priceType}
          cityFilter={cityType} // Pass city to EventFilterBar
          convertUTCToLocal={convertUTCToLocal}
          navigate={navigate}
        />

        <div className="flex justify-end items-center mr-3 pt-2">
         <FollowEvent modelName="Category" categoryType="Event" categoryName={selCategory}  />
         </div>
        <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-9 gap-5  lg:p-4 pt-2 relative lg:right-46   w-full">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                // className="flex-none shadow-lg p-2 rounded-lg lg:w-80 w-56"
                className="overflow-hidden flex-none transition-transform duration-300 hover:scale-105  border  shadow-lg p-2 rounded-lg lg:w-[372px] w-57"
                onClick={() => navigate("/featuredEvent", { state: item._id })}
              >
                <div className="h-24 lg:h-52 md:h-32 w-full rounded-lg flex justify-end overflow-hidden relative">
                  {/* Background Image Container */}
                  <div
                    style={{
                      backgroundImage: `url(${
                        item.media?.thumbnailImage || item.media?.posterImage ||
                       "/assets/staticAssets/fallback-image.jpg"
                      })`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="absolute inset-0 transition-transform duration-300 hover:scale-125"
                    onError={(e) => {
                      e.target.style.backgroundImage = `url(/assets/staticAssets/fallback-image.jpg)`;
                    }}
                  ></div>


        <div className="flex justify-end items-center mr-3 pt-3">
          <FollowEvent modelName="Category" categoryType="Event" categoryName={selCategory} />
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
    </div>
  );
}

export default Viewall;
