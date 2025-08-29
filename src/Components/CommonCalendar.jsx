import React, { useState, useRef, useEffect } from "react";
import { Calendar, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CustomDateIcon = ({ date, bgColor }) => (
  <div
    style={{
      width: 48,
      height: 48,
      backgroundColor: bgColor,
      borderRadius: "50%",
      border: "2px solid white",
      color: "white",
      fontWeight: "700",
      userSelect: "none",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      lineHeight: "18px",
      textAlign: "center",
      cursor: "default",
      position: "relative",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <span style={{ zIndex: 1 }}>{date}</span>
  </div>
);

const SimpleCalendar = ({
  value,
  onChange,
  tileContent,
  tileDisabled,
  showNavigation = true,
  activeStartDate,
  getEventsForDate,
  hoveredDate,
  setHoveredDate,
}) => {
  const [currentDate, setCurrentDate] = useState(activeStartDate || value || new Date());

  const hasEventOnDate = (date) => {
    if (typeof getEventsForDate === "function") {
      const eventsOnDate = getEventsForDate(date);
      return Array.isArray(eventsOnDate) && eventsOnDate.length > 0;
    }
    return false;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    if (date && (!tileDisabled || !tileDisabled({ date, view: "month" }))) {
      onChange(date);
    }
  };

  const isSelected = (date) => {
    if (!date || !value) return false;
    return date.toDateString() === value.toDateString();
  };

  const isDisabled = (date) => {
    if (!date || !tileDisabled) return false;
    return tileDisabled({ date, view: "month" });
  };

  return (
    <div className="calendar-container" style={{ width: "100%", maxWidth: "400px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", padding: "20px" }}>
      {showNavigation && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "2px solid #e0e0e0",
            marginBottom: "10px",
          }}
        >
          <button
            onClick={handlePrevMonth}
            style={{
              background: "#4a90e2",
              border: "none",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              padding: "5px 10px",
              borderRadius: "5px",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#357ab8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4a90e2")}
          >
            ‹
          </button>
          <h3
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "600",
              color: "#333",
            }}
          >
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={handleNextMonth}
            style={{
              background: "#4a90e2",
              border: "none",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              padding: "5px 10px",
              borderRadius: "5px",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#357ab8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4a90e2")}
          >
            ›
          </button>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "4px",
          marginBottom: "10px",
        }}
      >
        {daysOfWeek.map((day) => (
          <div
            key={day}
            style={{
              textAlign: "center",
              fontWeight: "600",
              padding: "10px 0",
              fontSize: "14px",
              color: "#666",
              backgroundColor: "#f0f0f0",
              borderRadius: "8px",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "4px",
        }}
      >
        {days.map((date, index) => (
          <div key={index} style={{ position: "relative" }}>
            {date ? (
              <div
                onClick={() => handleDateClick(date)}
                onMouseEnter={() => setHoveredDate(date.toDateString())}
                onMouseLeave={() => setHoveredDate(null)}
                style={{
                  padding: "10px 0",
                  textAlign: "center",
                  cursor: isDisabled(date) ? "not-allowed" : "pointer",
                  backgroundColor: isSelected(date)
                    ? "#4a90e2"
                    : hasEventOnDate(date)
                      ? "#9b59b6"
                      : "transparent",
                  color: isSelected(date) || hasEventOnDate(date) ? "white" : "#333",
                  borderRadius: "8px",
                  fontSize: "16px",
                  minHeight: "50px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: isDisabled(date) ? 0.5 : 1,
                  pointerEvents: isDisabled(date) ? "none" : "auto",
                  transition: "background-color 0.3s",
                }}
              >
                <span>{date.getDate()}</span>
                {tileContent && tileContent({ date, view: "month" })}
              </div>
            ) : (
              <div style={{ padding: "10px 0", minHeight: "50px" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const CommonCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showWeekCalendar, setShowWeekCalendar] = useState(false);
  const [showChooseDateCalendar, setShowChooseDateCalendar] = useState(false);
  const [todayCount, setTodayCount] = useState(0);
  const [tomorrowCount, setTomorrowCount] = useState(0);
  const [weekCount, setWeekCount] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const weekPickerRef = useRef(null);
  const todayPickerRef = useRef(null);
  const tomorrowPickerRef = useRef(null);
  const chooseDatePickerRef = useRef(null);
  const [highlightedEvents, setHighlightedEvents] = useState([]);
  const [highlightedTodayEvents, setHighlightedTodayEvents] = useState([]);
  const [highlightedTomorrowEvents, setHighlightedTomorrowEvents] = useState([]);
  const [showTodayCalendar, setShowTodayCalendar] = useState(false);
  const [showTomorrowCalendar, setShowTomorrowCalendar] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowEndDate = new Date(tomorrow);
  tomorrowEndDate.setDate(tomorrow.getDate() + 1); // day after tomorrow

  const formatDateYMD = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().split("T")[0];
  };

  const getWeekRange = (date) => {
    const day = date.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(date);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(date.getDate() + diffToMonday);

    const sunday = new Date(monday);
    sunday.setHours(23, 59, 59, 999);
    sunday.setDate(monday.getDate() + 6);

    return { monday, sunday };
  };

  const { monday, sunday } = getWeekRange(today);
  const weekRangeString = `${formatDateYMD(monday)} - ${formatDateYMD(sunday)}`;

  const [eventDays, setEventDays] = useState([]);
  useEffect(() => {
    if (events && events.length > 0) {
      const days = events.map((event) => ({
        date: formatDateYMD(new Date(event.startDate)),
        title: event.title,
        description: event.description || "",
      }));
      setEventDays(days);
    }
  }, [events]);

  const fetchEventData = async (url, description) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${description}: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(`Error fetching ${description}:`, err);
      throw err;
    }
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        setError(null);

        const todayStr = formatDateYMD(today);
        const tomorrowStr = formatDateYMD(tomorrow);
        const tomorrowEndStr = formatDateYMD(tomorrowEndDate);
        const mondayStr = formatDateYMD(monday);
        const sundayStr = formatDateYMD(sunday);

        const baseUrl = "http://dev.eventsnode.com:3000/api/event/filter";

        const todayUrl = `${baseUrl}?startDate=${todayStr}&endDate=${tomorrowStr}&page=1&limit=100&sortBy=startDate&sortOrder=asc`;
        const tomorrowUrl = `${baseUrl}?startDate=${tomorrowStr}&endDate=${tomorrowEndStr}&page=1&limit=100&sortBy=startDate&sortOrder=asc`;
        const weekUrl = `${baseUrl}?startDate=${mondayStr}&endDate=${sundayStr}&page=1&limit=100&sortBy=startDate&sortOrder=asc`;
        const allEventsUrl = `${baseUrl}?startDate=2025-01-01&endDate=2025-12-31&page=1&limit=1000&sortBy=startDate&sortOrder=asc`;

        const [todayData, tomorrowData, weekData, allEventData] = await Promise.all([
          fetchEventData(todayUrl, "today events"),
          fetchEventData(tomorrowUrl, "tomorrow events"),
          fetchEventData(weekUrl, "week events"),
          fetchEventData(allEventsUrl, "all events"),
        ]);

        const getEventsArray = (data) => {
          if (data?.data?.docs && Array.isArray(data.data.docs)) return data.data.docs;
          if (data?.data && Array.isArray(data.data)) return data.data;
          if (Array.isArray(data)) return data;
          return [];
        };

        const todayEventData = getEventsArray(todayData);
        const uniqueTodayEvents = [];
        const seenToday = new Set();

        for (const event of todayEventData) {
          const key = `${event._id}-${event.startDate}`;
          if (!seenToday.has(key)) {
            seenToday.add(key);
            uniqueTodayEvents.push({
              date: new Date(event.startDate).toISOString().split("T")[0],
              name: event.name,
              id: event._id,
              category: event.category?.toLowerCase(),
            });
          }
        }
        setHighlightedTodayEvents(uniqueTodayEvents);
        setTodayCount(uniqueTodayEvents.length);

        const tomorrowEventData = getEventsArray(tomorrowData);
        const uniqueTomorrowEvents = [];
        const seenTomorrow = new Set();

        for (const event of tomorrowEventData) {
          const key = `${event._id}-${event.startDate}`;
          if (!seenTomorrow.has(key)) {
            seenTomorrow.add(key);
            uniqueTomorrowEvents.push({
              date: new Date(event.startDate).toISOString().split("T")[0],
              name: event.name,
              id: event._id,
              category: event.category?.toLowerCase(),
            });
          }
        }
        setHighlightedTomorrowEvents(uniqueTomorrowEvents);
        setTomorrowCount(uniqueTomorrowEvents.length);

        const weekEventData = weekData?.data?.events || [];
        const simplifiedWeekEvents = weekEventData.map((event) => ({
          date: new Date(event.startDate).toISOString().split("T")[0],
          name: event.name,
          id: event._id,
          category: event.category.toLowerCase(),
        }));
        setHighlightedEvents(simplifiedWeekEvents);

        const getTotalCount = (data) => {
          if (data?.data?.total !== undefined) return data.data.total;
          if (data?.data?.length !== undefined) return data.data.length;
          if (data?.total !== undefined) return data.total;
          if (Array.isArray(data?.data)) return data.data.length;
          if (Array.isArray(data)) return data.length;
          return 0;
        };

        setTodayCount(getTotalCount(todayData));
        setTomorrowCount(getTotalCount(tomorrowData));
        setWeekCount(getTotalCount(weekData));
        const allFetchedEvents = getEventsArray(allEventData);
        setEvents(allFetchedEvents);

      } catch (err) {
        console.error("Error fetching event data:", err);
        setError(err.message || "Failed to fetch event data");

        const mockEvents = [
          { title: "Team Meeting", startDate: today.toISOString() },
          { title: "Project Review", startDate: today.toISOString() },
          { title: "Client Call", startDate: tomorrow.toISOString() },
          { title: "Workshop", startDate: new Date(2025, 4, 30).toISOString() },
          { title: "Conference", startDate: new Date(2025, 5, 15).toISOString() },
          { title: "Training Session", startDate: new Date(2025, 5, 20).toISOString() },
        ];

        setEvents(mockEvents);
        setTodayCount(1);
        setTomorrowCount(2);
        setWeekCount(3);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (weekPickerRef.current && !weekPickerRef.current.contains(event.target)) {
        setShowWeekCalendar(false);
      }
      if (chooseDatePickerRef.current && !chooseDatePickerRef.current.contains(event.target)) {
        setShowChooseDateCalendar(false);
      }
      if (todayPickerRef.current && !todayPickerRef.current.contains(event.target)) {
        setShowTodayCalendar(false);
      }
      if (tomorrowPickerRef.current && !tomorrowPickerRef.current.contains(event.target)) {
        setShowTomorrowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getEventsForTodayDate = (date) => {
    const dateStr = formatDateYMD(date);
    return highlightedTodayEvents.filter((event) => event.date === dateStr);
  };

  const getEventsForTomorrowDate = (date) => {
    const dateStr = formatDateYMD(date);
    return highlightedTomorrowEvents.filter((event) => event.date === dateStr);
  };

  const getEventsForDate = (date) => {
    const dateStr = formatDateYMD(date);
    return highlightedEvents.filter((event) => event.date === dateStr);
  };

  const tileDisabledToday = ({ date, view }) => {
    return view === "month" && date.toDateString() !== today.toDateString();
  };

  const tileDisabledTomorrow = ({ date, view }) => {
    return view === "month" && date.toDateString() !== tomorrow.toDateString();
  };

  const hasEventOnDate = (date) => {
    const formattedDate = formatDateYMD(date);
    return highlightedTodayEvents.some((event) => event.date === formattedDate) ||
      highlightedTomorrowEvents.some((event) => event.date === formattedDate) ||
      highlightedEvents.some((event) => event.date === formattedDate);
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const dailyEvents = getEventsForDate(date);
    const isHovered = hoveredDate === date.toDateString();

    return (
      <div
        style={{ position: "relative", width: "100%" }}
        onMouseEnter={() => setHoveredDate(date.toDateString())}
        onMouseLeave={() => setHoveredDate(null)}
      >
        {dailyEvents.length > 0 && isHovered && (
          <div
            style={{
              position: "absolute",
              top: "-120px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#800080", // Changed to purple
              borderRadius: "10px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
              padding: "10px",
              zIndex: 999,
              minWidth: "220px",
              fontSize: "14px",
              transition: "all 0.3s ease-in-out",
              opacity: isHovered ? 1 : 0,
              pointerEvents: isHovered ? "auto" : "none",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                marginBottom: "8px",
                color: "#fff",
                borderBottom: "1px solid #e5e7eb",
                paddingBottom: "4px",
                textAlign: "center",
              }}
            >
              {dailyEvents.length} Event{dailyEvents.length > 1 ? "s" : ""}
            </div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                maxHeight: "140px",
                overflowY: "auto",
              }}
            >
              {dailyEvents.map((event, idx) => (
                <li
                  key={idx}
                  style={{
                    marginBottom: "8px",
                    padding: "6px",
                    backgroundColor: "#f1f1f1",
                    borderRadius: "6px",
                    transition: "background-color 0.2s",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (event.category && event.id) {
                      navigate(`/events/${event.category}/${event.id}`, {
                        state: event.id,
                      });
                    } else {
                      console.warn("Missing event data:", event);
                      alert("This event is missing a category. Cannot navigate.");
                    }
                  }}
                >
                  <div style={{ fontWeight: "600", color: "#333" }}>{event.name}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const tileDisabled = ({ date, view }) =>
    view === "month" && (date.getTime() < monday.getTime() || date.getTime() > sunday.getTime());

  const boxClasses =
    "rounded-lg h-32 w-32 min-w-24 text-white font-semibold flex flex-col justify-center items-center gap-2 p-3 transition-transform hover:scale-105 cursor-pointer shadow-lg";

  if (loading) {
    return (
      <div className="flex flex-col items-center w-full p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full p-4">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
          <strong>Error:</strong> {error}. Using mock data for demonstration.
        </div>
      )}

      <div className="overflow-x-auto scrollbar-hide w-full">
        <div className="grid grid-cols-2 gap-4 px-4 py-4 justify-items-center max-w-md mx-auto">
          <div
            className={`${boxClasses} bg-blue-600`}
            onClick={() => {
              setShowTodayCalendar(true);
              setShowWeekCalendar(false);
              setShowChooseDateCalendar(false);
              setShowTomorrowCalendar(false);
            }}
          >
            <CustomDateIcon date={today.getDate()} bgColor="#2563EB" />
            <p className="text-center text-sm mt-1">
              Today {loading ? "..." : todayCount}
            </p>
          </div>

          <div
            className={`${boxClasses} bg-orange-400`}
            onClick={() => {
              setShowTomorrowCalendar(true);
              setShowTodayCalendar(false);
              setShowWeekCalendar(false);
              setShowChooseDateCalendar(false);
            }}
          >
            <CustomDateIcon date={tomorrow.getDate()} bgColor="#F97316" />
            <p className="text-center text-sm mt-1">
              Tomorrow {loading ? "..." : tomorrowCount}
            </p>
          </div>

          <div
            className={`${boxClasses} bg-blue-400`}
            onClick={() => {
              setShowWeekCalendar(true);
              setShowTodayCalendar(false);
              setShowTomorrowCalendar(false);
              setShowChooseDateCalendar(false);
            }}
          >
            <Calendar className="text-white text-3xl" />
            <p className="text-center text-sm">
              This Week {loading ? "..." : weekCount}
            </p>
          </div>

          <div
            className={`${boxClasses} bg-green-600`}
            onClick={() => {
              setShowChooseDateCalendar(true);
              setShowTodayCalendar(false);
              setShowTomorrowCalendar(false);
              setShowWeekCalendar(false);
            }}
          >
            <CalendarCheck className="text-white text-3xl" />
            <p className="text-center text-sm">Choose Date</p>
          </div>
        </div>
      </div>
      {/* Week Calendar Modal */}
      {showWeekCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div
            ref={weekPickerRef}
            className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4"
          >
            <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
              Events for This Week ({weekRangeString})
            </h3>
            <SimpleCalendar
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setShowChooseDateCalendar(false);
              }}
              tileContent={tileContent}
              tileDisabled={tileDisabled}
              showNavigation={false}
              activeStartDate={monday}
              getEventsForDate={getEventsForDate}
              eventDays={eventDays}
              hoveredDate={hoveredDate}
              hasEventOnDate={hasEventOnDate}
              setHoveredDate={setHoveredDate}
            />
          </div>
        </div>
      )}
      {/* Today Calendar Modal */}
      {showTodayCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div ref={todayPickerRef} className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
              Events for Today ({formatDateYMD(today)})
            </h3>
            <SimpleCalendar
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setShowTodayCalendar(false);
              }}
              tileContent={tileContent}
              tileDisabled={tileDisabledToday}
              showNavigation={false}
              activeStartDate={today}
              getEventsForDate={getEventsForTodayDate}
              hoveredDate={hoveredDate}
              hasEventOnDate={hasEventOnDate}
              setHoveredDate={setHoveredDate}
            />
          </div>
        </div>
      )}
      {/* Tomorrow Calendar Modal */}
      {showTomorrowCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div ref={tomorrowPickerRef} className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
              Events for Tomorrow ({formatDateYMD(tomorrow)})
            </h3>
            <SimpleCalendar
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setShowTomorrowCalendar(false);
              }}
              tileContent={tileContent}
              tileDisabled={tileDisabledTomorrow}
              showNavigation={false}
              activeStartDate={tomorrow}
              getEventsForDate={getEventsForTomorrowDate}

              hoveredDate={hoveredDate}
              eventDays={eventDays}
              setHoveredDate={setHoveredDate}
              hasEventOnDate={hasEventOnDate}
            />
          </div>
        </div>
      )}

      {showChooseDateCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div
            ref={chooseDatePickerRef}
            className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4"
          >
            <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">Choose Any Date</h3>
            <SimpleCalendar
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setShowChooseDateCalendar(false);
              }}
              tileContent={tileContent}
              showNavigation={true}
              getEventsForDate={getEventsForDate}
              eventDays={eventDays}
              hoveredDate={hoveredDate}
              hasEventOnDate={hasEventOnDate}
              setHoveredDate={setHoveredDate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommonCalendar;
