import React, { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { FaEye } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Event } from "../redux/Urls";

const EventFilterBar = ({ searchEvent, priceType, cityFilter, convertUTCToLocal, navigate }) => {
  const [activeTime, setActiveTime] = useState("All");
  const [activeGenre, setActiveGenre] = useState("All");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const inFlightKeyRef = useRef(null);
  const abortRef = useRef(null);

  const formatYMD = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const getDateRangeForTime = (time) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (time === "Today") {
      return { startDate: formatYMD(today), endDate: formatYMD(today) };
    }
    if (time === "Tomorrow") {
      return { startDate: formatYMD(tomorrow), endDate: formatYMD(tomorrow) };
    }
    if (time === "Weekend") {
      // Compute Saturday and Sunday of the current week (Mon-Sun week)
      const day = today.getDay(); // 0=Sun..6=Sat
      const monday = new Date(today);
      monday.setDate(today.getDate() - ((day + 6) % 7));
      const saturday = new Date(monday);
      saturday.setDate(monday.getDate() + 5);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      return { startDate: formatYMD(saturday), endDate: formatYMD(sunday) };
    }
    return { startDate: null, endDate: null };
  };

  const timeOptions = ["All", "Today", "Tomorrow", "Weekend"];
  const genres = [
    "All",
    "Business",
    "Festivals",
    "Live Music",
    "Nightlife and Club",
    "Professional",
    "Social",
    "Sport & Leisure",
    "Theatre & Arts",
  ];

  const filterEvents = (allEvents, time, genre, search, price, city) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    return allEvents.filter((event) => {
      const eventDate = new Date(event.startDate);
      const isTimeMatch =
        time === "All"
          ? true
          : time === "Today"
            ? eventDate.toDateString() === today.toDateString()
            : time === "Tomorrow"
              ? eventDate.toDateString() === tomorrow.toDateString()
              : time === "Weekend"
                ? eventDate.getDay() === 6 || eventDate.getDay() === 0
                : true;

      const isGenreMatch = genre === "All" ? true : event.category === genre;

      const isSearchMatch = search
        ? event.name.toLowerCase().includes(search.toLowerCase()) ||
        event.venueDetails?.city.toLowerCase().includes(search.toLowerCase())
        : true;

      const isPriceMatch =
        price === ""
          ? true
          : price === "free"
            ? event.price === 0
            : event.price > 0;

      const isCityMatch = city
        ? event.venueDetails?.city.toLowerCase() === city.toLowerCase()
        : true;

      return isTimeMatch && isGenreMatch && isSearchMatch && isPriceMatch && isCityMatch;
    });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const { startDate, endDate } = getDateRangeForTime(activeTime);

      const params = new URLSearchParams();
      if (startDate && endDate) {
        params.append("startDate", startDate);
        params.append("endDate", endDate);
      }
      params.append("page", "1");
      params.append("limit", "20");
      params.append("sortBy", "startDate");
      params.append("sortOrder", "desc");

      const url = `${Event.getEventByFilter}${params.toString()}`;

      // Prevent duplicate calls for the same query (e.g., React StrictMode)
      if (inFlightKeyRef.current === url) {
        return; // identical request already in-flight
      }

      // Abort any previous request
      if (abortRef.current) {
        abortRef.current.abort();
      }

      const controller = new AbortController();
      abortRef.current = controller;
      inFlightKeyRef.current = url;
      setLoading(true);

      try {
        const res = await axios.get(url, { signal: controller.signal });
        const allEvents = res.data?.data?.events || [];
        setEvents(allEvents);
        const filtered = filterEvents(
          allEvents,
          activeTime,
          activeGenre,
          searchEvent,
          priceType,
          cityFilter
        );
        setFilteredEvents(filtered);
      } catch (err) {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          console.error("Fetch error:", err);
        }
        setEvents([]);
        setFilteredEvents([]);
      } finally {
        // Clear in-flight key only if it matches this request's url
        if (inFlightKeyRef.current === url) {
          inFlightKeyRef.current = null;
        }
        setLoading(false);
      }
    };

    fetchEvents();
  }, [activeTime, activeGenre, searchEvent, priceType, cityFilter]);

  return (
    <div className="w-full flex flex-col items-center px-4">
      <div className="max-w-6xl w-full">
        <h2 className="text-xl font-semibold text-center mb-5">
          <span className="text-sky-600">
            All Events{" "}
            {activeTime === "Weekend"
              ? "This Weekend"
              : activeTime === "Today"
                ? "Today"
                : activeTime === "Tomorrow"
                  ? "Tomorrow"
                  : ""}
            {activeGenre !== "All" && ` - ${activeGenre}`}
          </span>{" "}
          <span className="text-black">({filteredEvents.length})</span>
        </h2>

        {/* Time Filters */}
        <div className="flex items-center justify-center gap-2 mb-5 flex-wrap">
          {timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => setActiveTime(time)}
              className={`text-sm px-3 py-1.5 rounded-full border transition ${activeTime === time
                ? "bg-red-600 text-white border-red-600"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
            >
              {time}
            </button>
          ))}
        </div>

        {/* Genre Filters - Scrollable, Small, Centered */}
        <div className="w-full mb-4">
          <div className="flex justify-center">
            <div className="max-w-full overflow-x-auto">
              <div className="inline-flex gap-2 px-2 whitespace-nowrap">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setActiveGenre(genre)}
                    className={`text-xs px-3 py-1 rounded-full border shrink-0 transition ${activeGenre === genre
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-black border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Event Cards */}
        {loading ? (
          <p className="text-center text-gray-500">Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <p className="text-center text-gray-500">No events found.</p>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-9 gap-5 lg:p-4 pt-2 w-full">
            {filteredEvents.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden flex-none transition-transform duration-300 hover:scale-105 border shadow-lg p-2 rounded-lg lg:w-[372px] w-57"
                onClick={() => navigate("/featuredEvent", { state: item._id })}
              >
                <div className="h-24 lg:h-52 md:h-32 w-full rounded-lg flex justify-end overflow-hidden relative">
                  <div
                    style={{
                      backgroundImage: `url(${item.media?.thumbnailImage ||
                        "assets/staticAssets/fallback-image.jpg"
                        })`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="absolute inset-0 transition-transform duration-300 hover:scale-125"
                  ></div>
                  <div className="relative text-white m-2 bg-blue-300 rounded-xl lg:text-base text-xs font-bold lg:px-3 lg:p-0 p-1 w-max h-max">
                    {item.category}
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-2 lg:text-base text-xs">
                  <p className="lg:text-xl text-base flex justify-between">
                    {item.name}
                    <span className="flex gap-2 text-gray-500 text-xs">
                      <FaEye className="text-blue-600" />
                      {item.visits}
                    </span>
                  </p>
                  <p className="flex gap-2 text-gray-500">
                    <MdEvent className="relative top-1" />
                    {convertUTCToLocal(item.startDate)}
                  </p>
                  <p className="flex gap-2 text-gray-500">
                    <CiLocationOn className="relative top-1" />
                    {item.venueDetails?.city} - {item.venueDetails?.country}
                  </p>
                  <div className="mt-auto flex justify-between items-center text-sm">
                    <span>{item.price === 0 ? "FREE" : `$${item.price} ONWARDS`}</span>
                    <button
                      className="relative hover:text-white rounded shadow p-2 text-xs bg-white transition-all duration-300 
                                  before:absolute before:top-0 before:left-0 before:rounded-md before:w-0 before:h-full before:bg-[#ff2459] before:transition-all before:duration-300 
                                  hover:before:w-full before:z-0"
                    >
                      <span className="relative">BUY NOW</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventFilterBar;
