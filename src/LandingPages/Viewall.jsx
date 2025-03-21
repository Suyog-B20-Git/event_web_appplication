/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { BsFire } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getEventData } from "../redux/actions/master/Events";
import Loading from "../Components/Loading";
import { IoMenu } from "react-icons/io5";
import { IoIosRefresh } from "react-icons/io";

import Select from "react-select";
import { getCountry } from "../redux/actions/master/location/Country";
import { getState } from "../redux/actions/master/location/State";
import { getCity } from "../redux/actions/master/location/City";
import { getEventByFilter } from "../redux/actions/master/Events/getEventByFilter";
import { VscFilterFilled } from "react-icons/vsc";
import Pagination from "../Components/Pagination";

// Function to convert UTC to local time
const convertUTCToLocal = (utcString) => {
  if (!utcString) return "Invalid Date";
  const date = new Date(utcString);
  return date.toLocaleString();
};


function Viewall() {
  const [filter, setFilter] = useState(false);
  const options = [
    { value: "all", label: "All" },
    { value: "business", label: "Business & Seminars" },
    { value: "festival", label: "Festivals" },
    { value: "live music", label: "Live Music" },
    { value: "nightlife and club", label: "Nightlife & Club" },
    { value: "professional", label: "Professional" },
    { value: "social", label: "Social" },
    { value: "sports  and leisure", label: "Sports & Leisure" },
    { value: "theatre and arts", label: "Theatre and Arts" },
  ];
  const priceOptions = [
    { value: "free", label: "Free" },
    { value: "paid", label: "Paid" },
  ];
  const [selectedOption, setSelectedOption] = useState("");
  const category = selectedOption.value ? selectedOption.value : "";

  console.log(selectedOption);
  const [price, setPrice] = useState("");
  const priceType = price.value;
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryFilter, setCountryFilter] = useState("");

  const [selectedState, setSelectedState] = useState(null);
  const [stateFilter, setStateFilter] = useState("");

  const [selectedCity, setSelectedCity] = useState(null);
  const [cityFilter, setCityFilter] = useState("");

  useEffect(() => {
    selectedCountry
      ? setCountryFilter(selectedCountry.value)
      : setCountryFilter("");

    selectedState ? setStateFilter(selectedState.value) : setStateFilter("");
    selectedCity ? setCityFilter(selectedCity.value) : "";
  }, [selectedCountry, selectedState, selectedCity]);

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState("");

  const [searchEvent, setSearchEvent] = useState("");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(
      getEventByFilter(
        setLoading,
        category,
        priceType,
        searchEvent,
        countryFilter,
        cityFilter,
        stateFilter,
        startDate,
        endDate,
        currentPage
      )
    ); // Call API when component mounts
  }, [dispatch, currentPage]);

  const handleApi = () => {
    dispatch(
      getEventByFilter(
        setLoading,
        category,
        priceType,
        searchEvent,
        countryFilter,
        cityFilter,
        stateFilter,
        startDate,
        endDate,
        currentPage
      )
    );
  };
  const store = useSelector((state) => state.getEventByFilterReducer) || {
    filterEventData: [],
  };
  const data = store.filterEventData;
  // console.log(data);
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

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);

    // Reset end date if it's before the new start date
    if (endDate && selectedStartDate > endDate) {
      setEndDate("");
      setError("End date must be after the start date");
    } else {
      setError("");
    }
  };

  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;

    if (selectedEndDate < startDate) {
      setError("End date must be after the start date");
    } else {
      setError("");
      setEndDate(selectedEndDate);
    }
  };

  useEffect(() => {
    if (country) {
      dispatch(getCountry(country)); // Dispatch Redux action to fetch data
    }
    if (country || state) {
      dispatch(getState(country, state));
    }

    if (country || state || city) {
      dispatch(getCity(country, state, city));
    }
  }, [dispatch, country, state, city]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const store4 = useSelector((state) => state.countriesReducer) || {
    countries: [],
  };
  const data4 = store4?.countries || []; // Ensure data is always an array
  const countryOption = data4.map((country) => ({
    value: country,
    label: country,
  }));

  const store1 = useSelector((state) => state.statesReducer) || {
    states: [],
  };

  const data1 = store1?.states || [];
  const stateOptions = data1.map((states) => ({
    value: states,
    label: states,
  }));

  const store2 = useSelector((state) => state.citiesReducer) || {
    cities: [],
  };

  const data2 = store2?.cities || [];
  const cityOptions = data2.map((item) => ({
    value: item,
    label: item,
  }));
  // console.log(selectedCity, selectedState, selectedCountry);
  const reset = () => {
    setStartDate("");
    setEndDate("");
    setSearchEvent("");
    setSelectedOption("");
    setPrice("");
    setSelectedCountry(null);
    setSelectedCity(null);
    setSelectedState(null);
    setCountryFilter("");
    setCityFilter("");
    setStateFilter("");
    handleApi();
  };

  console.log(
    category,
    startDate,
    endDate,
    countryFilter,
    cityFilter,
    stateFilter
  );

  // const isDisabled = () => {
  //   return !(
  //     category ||
  //     priceType ||
  //     searchEvent ||
  //     countryFilter ||
  //     cityFilter ||
  //     stateFilter ||
  //     startDate ||
  //     endDate ||
  //     currentPage
  //   );
  // };

  const navigate = useNavigate();
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center w-full pt-[87px] sm:pt-4">
  <div className="p-5 w-full max-w-[1340px]">
  <div className="flex justify-between">
          <div className="flex gap-2 lg:pl-3">
            <BsFire className="text-2xl relative top-1" />
            <p className="font-bold font-sans lg:text-2xl">EVENTS</p>
          </div>
        </div>

        <div className="flex justify-between pt-5 px-2 lg:px-3 gap-4">
          <button
            onClick={() => setFilter(!filter)}
            className="flex gap-3 lg:text-2xl md:text-base  font-medium"
          >
            <div className="border-2 h-max border-[#ff2459] text-[#ff2459] flex lg:justify-center lg:items-center p-1 rounded-md ">
              <IoMenu />
            </div>
            Filters
          </button>
          <div className="flex lg:text-base text-xs lg:gap-4 gap-2 ">
            <button
              onClick={reset}
              className="flex gap-1 lg:text-base md:text-base text-xs font-medium text-[#ff2459] border border-[#ff2459] p-1 rounded"
            >
              <IoIosRefresh className="text-[#ff2459] relative top-1" /> Refresh Filters
            </button>
            {/* <button
              onClick={handleApi}
              className={` flex gap-1 font-medium lg:text-base md:text-base text-xs text-[#ff2459] border border-[#ff2459] p-1 rounded`}
            >
              <VscFilterFilled className="text-[#ff2459]  relative top-1 lg:text-lg" />
              Apply Filter
            </button> */}
            <button
              onClick={handleApi}
              disabled={
                !(
                  category ||
                  priceType ||
                  searchEvent ||
                  countryFilter ||
                  cityFilter ||
                  stateFilter ||
                  startDate ||
                  endDate
                )
              }
              className={`flex gap-1 font-medium lg:text-base md:text-base text-xs 
    ${
      category ||
      priceType ||
      searchEvent ||
      countryFilter ||
      cityFilter ||
      stateFilter ||
      startDate ||
      endDate
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
            <div className="grid lg:grid-cols-4 gap-3 md:grid-cols-3 grid-cols-1">
              <div className="flex flex-col gap-0.5">
                <label
                  htmlFor="searchEvent"
                  className="lg:text-lg text-sm  text-gray-900 p-1"
                >
                  Search event
                </label>
                <input
                  type="text"
                  name="searchEvent"
                  placeholder="Search event by eventname,Venue,City,"
                  value={searchEvent}
                  className="border-gray-300 outline-blue-500 outline-2 border bg-white rounded-md px-3 p-1.5"
                  onChange={(e) => setSearchEvent(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <label
                  htmlFor="category"
                  className="lg:text-lg text-sm   text-gray-900 p-1"
                >
                  Category
                </label>
                <Select
                  options={options}
                  value={selectedOption}
                  onChange={setSelectedOption}
                  placeholder="Select an Category"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <label
                  htmlFor="price"
                  className="lg:text-lg text-sm  text-gray-900 p-1"
                >
                  Price
                </label>
                <Select
                  options={priceOptions}
                  value={price}
                  onChange={setPrice}
                  placeholder="Select an Price"
                />
              </div>

              <div className="flex flex-col  gap-0.5">
                <label
                  htmlFor="date"
                  className="lg:text-lg text-sm   text-gray-900 p-1"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  value={startDate}
                  className="border-gray-300 outline-blue-500 outline-2 border rounded-md px-3 p-1.5"
                  min={today} // Prevent selecting past dates
                  onChange={handleStartDateChange}
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-4 gap-3 md:grid-cols-3 grid-cols-1">
              <div className="flex flex-col gap-0.5">
                <label
                  htmlFor="category"
                  className="lg:text-lg text-sm  text-gray-900 p-1"
                >
                  Country
                </label>
                <Select
                  isClearable // Enables "X" button to clear input
                  options={countryOption}
                  placeholder="Search country..."
                  onChange={setSelectedCountry}
                  value={selectedCountry} // ✅ Maintain selected value
                  getOptionLabel={(option) => option.label} // Show venue name
                  getOptionValue={(option) => option.value} // Ensure unique selection by ID
                  onInputChange={(value, { action }) => {
                    if (action === "input-change") {
                      setCountry(value); // Update search query
                    }
                    if (action === "input-blur" || action === "menu-close") {
                      setCountry(""); // Clear input when dropdown closes
                    }
                  }}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <label
                  htmlFor="state"
                  className="lg:text-lg text-sm   text-gray-900 p-1"
                >
                  State
                </label>
                <Select
                  isClearable // Enables "X" button to clear input
                  options={stateOptions}
                  onChange={setSelectedState}
                  placeholder="Search state..."
                  value={selectedState} // ✅ Maintain selected value
                  getOptionLabel={(option) => option.label} // Show venue name
                  getOptionValue={(option) => option.value} // Ensure unique selection by ID
                  onInputChange={(value, { action }) => {
                    if (action === "input-change") {
                      setState(value); // Update search query
                    }
                    if (action === "input-blur" || action === "menu-close") {
                      setState(""); // Clear input when dropdown closes
                    }
                  }}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <label
                  htmlFor="city"
                  className="lg:text-lg text-sm  text-gray-900 p-1"
                >
                  City
                </label>
                <Select
                  isClearable // Enables "X" button to clear input
                  options={cityOptions} // Disable if no state selected
                  placeholder="Search city..."
                  onChange={setSelectedCity}
                  value={selectedCity}
                  getOptionLabel={(option) => option.label} // Show venue name
                  getOptionValue={(option) => option.value} // Ensure unique selection by ID
                  onInputChange={(value, { action }) => {
                    if (action === "input-change") {
                      setCity(value); // Update search query
                    }
                    if (action === "input-blur" || action === "menu-close") {
                      setCity(""); // Clear input when dropdown closes
                    }
                  }}
                />
              </div>
              <div className="flex flex-col  gap-0.5">
                <label
                  htmlFor="date"
                  className="lg:text-lg text-sm   text-gray-900 p-1"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="end-date"
                  value={endDate}
                  className="border border-gray-300 outline-blue-500 outline-2 rounded-md px-3 p-1.5"
                  min={startDate} // Prevent selecting dates before start date
                  onChange={handleEndDateChange}
                />
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>
          </div>
        )}
        {/* Cards container with horizontal scrolling */}
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
                        item.media?.thumbnailImage || "fallback-image.jpg"
                      })`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="absolute inset-0 transition-transform duration-300 hover:scale-125"
                  ></div>

                  {/* Category Text (Fixed on Top) */}
                  <div className="relative  text-white m-2 bg-blue-300 rounded-xl lg:text-base text-xs font-bold lg:px-3 lg:p-0 p-1 w-[max-content] h-[max-content]">
                    {item.category}
                  </div>
                </div>
                <div>
                  <div className="flex    font-medium  flex-col gap-2 p-2 lg:text-base text-xs">
                    <div className="">
                      {" "}
                      <p className="lg:text-xl overflow-x-hidden   text-base flex lg:flex-row flex-col justify-between">
                        {item.name}{" "}
                        <p className="flex gap-2 text-gray-500 lg:text-base text-xs  ">
                          <FaEye className="relative top-1 text-blue-600" />
                          <span>{item.visits}</span>
                        </p>
                      </p>
                      <p className="flex gap-2 text-gray-500 lg:text-base text-xs">
                        <MdEvent className="relative top-1" />
                        <span>{convertUTCToLocal(item.startDate)}</span>
                      </p>
                      <p className="flex gap-2 text-gray-500 lg:text-base text-xs">
                        <CiLocationOn className="relative top-1" />
                        <span>
                          {item.venue?.city} - {item.venue?.country}
                        </span>
                      </p>
                    </div>

                    <p className="mt-auto  flex lg:justify-between gap-4 items-center bg-[#F5FCFE] text-sm lg:text-sm p-2">
                      <span className="lg:text-sm text-xs">$1300 ONWARDS</span>
                      {/* <button className="rounded shadow lg:p-2 p-2 lg:m-0 mr-1 lg:text-sm text-xs bg-white">
                        BUY NOW
                      </button> */}
                      <button
                        className="relative  hover:text-white rounded shadow lg:p-2 p-2 lg:m-0 mr-1 lg:text-sm text-xs bg-white transition-all duration-300 
  before:absolute before:top-0 before:left-0 before:rounded-md before:w-0 before:h-full before:bg-[#ff2459] before:transition-all before:duration-300 
  hover:before:w-full hover:text-back hover:before:opacity-100 before:z-0 "
                      >
                        <p className="relative "> BUY NOW</p>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No Date found</div>
          )}
        </div>
        <div className="pb-3 ">
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
