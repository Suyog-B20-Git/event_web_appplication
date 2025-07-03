import React, { useState, useRef, useEffect } from "react";
import { Calendar, CalendarCheck } from "lucide-react";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
  import { useLocation } from "react-router-dom";


const CustomDateIcon = ({ date, bgColor }) => (
  <div
    style={{
      width: 30,
      height: 30,
      backgroundColor: bgColor,
      borderRadius: 5,
      border: "1px solid white",
      color: "white",
      fontWeight: "700",
      userSelect: "none",
      boxShadow: "0 0 2px rgb(0 0 0 / 0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12,
      lineHeight: "12px",
      textAlign: "center",
      cursor: "default",
      position: "relative",
      fontFamily: "sans-serif",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 1,
        left: 0,
        right: 0,
        height: 5,
        backgroundColor: "rgba(255,255,255,0.6)",
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
      }}
    />
    <span style={{ zIndex: 1 }}>{date}</span>
  </div>
);

// Simple Calendar Component (replacing react-calendar)
const SimpleCalendar = ({ 
  value, 
  onChange, 
  tileContent, 
  tileDisabled, 
  showNavigation = true,
  activeStartDate,
  restrictToWeek = false ,
  getEventsForDate,
  // eventDays,
  hoveredDate,
  setHoveredDate
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
    "July", "August", "September", "October", "November", "December"
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
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
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
    if (date && (!tileDisabled || !tileDisabled({ date, view: 'month' }))) {
      onChange(date);
    }
  };
  
  const isSelected = (date) => {
    if (!date || !value) return false;
    return date.toDateString() === value.toDateString();
  };
  
  const isDisabled = (date) => {
    if (!date || !tileDisabled) return false;
    return tileDisabled({ date, view: 'month' });
  };

  
  return (
    <div
      className="calendar-container"
      style={{ width: "100%", maxWidth: "320px" }}
    >
      {showNavigation && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid #e0e0e0",
            marginBottom: "10px",
          }}
        >
          <button
            onClick={handlePrevMonth}
            style={{
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              padding: "5px 10px",
              borderRadius: "4px",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            ‹
          </button>
          <h3
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: "600",
              color: "#333",
            }}
          >
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={handleNextMonth}
            style={{
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              padding: "5px 10px",
              borderRadius: "4px",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            ›
          </button>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "2px",
          marginBottom: "10px",
        }}
      >
        {daysOfWeek.map((day) => (
          <div
            key={day}
            style={{
              textAlign: "center",
              fontWeight: "600",
              padding: "8px 4px",
              fontSize: "12px",
              color: "#666",
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
          gap: "2px",
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
                  padding: "8px 4px",
                  textAlign: "center",
                  cursor: isDisabled(date) ? "not-allowed" : "pointer",
                  backgroundColor: isSelected(date)
                    ? "#2563eb" //Blue color
                    : hasEventOnDate(date)
                    ? "#6c3483"//purple color
                    : "transparent",
                  color:
                    isSelected(date) || hasEventOnDate(date) ? "white" : "#333",
                  borderRadius: "4px",
                  fontSize: "14px",
                  minHeight: "36px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: isDisabled(date) ? 0.3 : 1,
                  pointerEvents: isDisabled(date) ? "none" : "auto",
                  transition: "background-color 0.2s ease",
                }}
                // onMouseOver={(e) => {
                //   if (!isSelected(date) && !isDisabled(date)) {
                //     e.target.style.backgroundColor = "#f3f4f6";
                //   }
                // }}
                // onMouseOut={(e) => {
                //   if (!isSelected(date)) {
                //     e.target.style.backgroundColor = "transparent";
                //   }
                // }}
              >
                <span>{date.getDate()}</span>
                {tileContent && tileContent({ date, view: "month" })}
              </div>
            ) : (
              <div style={{ padding: "8px 4px", minHeight: "36px" }} />
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
  const [highlightedTomorrowEvents, setHighlightedTomorrowEvents] = useState(
    []
  );
  const [showTodayCalendar, setShowTodayCalendar] = useState(false);
  const [showTomorrowCalendar, setShowTomorrowCalendar] = useState(false);
  const navigate = useNavigate();



const location = useLocation();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowEndDate = new Date(tomorrow);
  tomorrowEndDate.setDate(tomorrow.getDate() + 1); // day after tomorrow

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


  const { monday, sunday } = getWeekRange(today);

 const formatDateYMD = (date) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().split("T")[0];
};

  // API call function with error handling
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

  // Fetch all event data
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        setError(null);

        const todayStr = formatDateYMD(today);
        const tomorrowStr = formatDateYMD(tomorrow);
        const tomorrowEndStr= formatDateYMD(tomorrowEndDate);
        const mondayStr = formatDateYMD(monday);
        const sundayStr = formatDateYMD(sunday);


        const baseUrl = "http://dev.eventsnode.com:3000/api/event/filter";

        // Construct URLs for different date ranges
        const todayUrl = `${baseUrl}?startDate=${todayStr}&endDate=${tomorrowStr}&page=1&limit=100&sortBy=startDate&sortOrder=asc`;
        const tomorrowUrl = `${baseUrl}?startDate=${tomorrowStr}&endDate=${tomorrowEndStr}&page=1&limit=100&sortBy=startDate&sortOrder=asc`;
        const weekUrl = `${baseUrl}?startDate=${mondayStr}&endDate=${sundayStr}&page=1&limit=100&sortBy=startDate&sortOrder=asc`;
        const allEventsUrl = `${baseUrl}?startDate=2025-01-01&endDate=2025-12-31&page=1&limit=1000&sortBy=startDate&sortOrder=asc`;

        // Fetch all data concurrently
        const [todayData, tomorrowData, weekData, allEventData] =
          await Promise.all([
            fetchEventData(todayUrl, "today events"),
            fetchEventData(tomorrowUrl, "tomorrow events"),
            fetchEventData(weekUrl, "week events"),
            fetchEventData(allEventsUrl, "all events"),
          ]);


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
const todayCountFromAPI = Array.isArray(todayData?.data) ? todayData.data.length : 0;
setTodayCount(todayCountFromAPI);
        // const simplifiedTomorrowEvents = tomorrowEventData.map((event) => ({
        //   date: new Date(event.startDate).toISOString().split("T")[0],
        //   name: event.name,
        //   id: event._id,
        //   category: event.category.toLowerCase(),
        // }));
        // setHighlightedTomorrowEvents(simplifiedTomorrowEvents);

      //  Tomorrow Data  
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
      category: event.category?.toLowerCase() ,
    });
  }
}
setHighlightedTomorrowEvents(uniqueTomorrowEvents);
setTomorrowCount(uniqueTomorrowEvents.length);
const tomorrowCountFromAPI = Array.isArray(tomorrowData?.data) ? tomorrowData.data.length : 0;


        const weekEventData = weekData?.data?.events || [];
        const simplifiedWeekEvents = weekEventData.map((event) => ({
          date: new Date(event.startDate).toISOString().split("T")[0],
          name: event.name,
          id: event._id,
          category: event.category.toLowerCase(),
        }));
        setHighlightedEvents(simplifiedWeekEvents);

        // Extract counts - handle different possible response structures
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
        setEvents(getEventsArray(allEventData));
        const arr = setEvents(getEventsArray(allEventData));
     

        const rawEvents = arr?.data?.events || [];
        const simplifiedEvents = rawEvents.map((event) => ({
          date: new Date(event.startDate).toISOString().split("T")[0],
          name: event.name,
        }));

       
      } catch (err) {
        console.error("Error fetching event data:", err);
        setError(err.message || 'Failed to fetch event data');

const rawEvents = weekData?.data?.events || [];

const simplifiedEvents = rawEvents.map((event) => ({
  date: new Date(event.startDate).toISOString().split("T")[0],
  name: event.name
}));
      
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
    const getEventsArray = (data) => {
          if (data?.data?.docs && Array.isArray(data.data.docs))
            return data.data.docs;
          if (data?.data && Array.isArray(data.data)) return data.data;
          if (Array.isArray(data)) return data;
          return [];
        };

    fetchCounts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        weekPickerRef.current &&
        !weekPickerRef.current.contains(event.target)
      ) {
        setShowWeekCalendar(false);
      }
      if (
        chooseDatePickerRef.current &&
        !chooseDatePickerRef.current.contains(event.target)
      ) {
        setShowChooseDateCalendar(false);
      }
      if (
        todayPickerRef.current &&
        !todayPickerRef.current.contains(event.target)
      ) {
        setShowTodayCalendar(false);
      }
      if (
        tomorrowPickerRef.current &&
        !tomorrowPickerRef.current.contains(event.target)
      ) {
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

// const hasEventOnDate = (date) => {
//   return getEventsForDate(date).length > 0;
// };

// purple highlight tomorrow if event exists

const hasEventOnDate = (date) => {
  const formattedDate = formatDateYMD(date);
  return (
    highlightedTodayEvents.some(event => event.date === formattedDate) ||
    highlightedTomorrowEvents.some(event => event.date === formattedDate) ||
    highlightedEvents.some(event => event.date === formattedDate)
  );
};



  const tileContent = ({date, view }) => {
    if (view !== "month") return null;
    const dailyEvents = getEventsForDate(date);
    const isHovered = hoveredDate === date.toDateString();

const getSelectedDate = (date) => {
  setSelectedDate(date);
 
};
// disable rest of dates in calender (today /tomorrow)

    
    return (
      <div
        style={{ position: "relative", width: "100%" }}
        onMouseEnter={() => setHoveredDate(date.toDateString())}
        onMouseLeave={() => setHoveredDate(null)}
      >
        {dailyEvents.length > 0}

        {isHovered && (
          <div
            style={{
              position: "absolute",
              top: "-110px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#89b086", // bottle green background of popup
              borderRadius: "10px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
              padding: "10px",
              zIndex: 999,
              minWidth: "220px",
              fontSize: "13px",
              transition: "all 0.3s ease-in-out",
              opacity: isHovered ? 1 : 0,
              pointerEvents: isHovered ? "auto" : "none",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                marginBottom: "8px",
                color: "#4b5563",
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
                    backgroundColor: "#f9fafb",
                    borderRadius: "6px",
                    transition: "background-color 0.2s",
                    cursor: "pointer",
                  }}
                  //  onClick={() => window.location.href = `/event/${event.id}`}>
                  
                  onClick={(e) => {
                    e.stopPropagation();
                     if (event.category && event.id) {
                      navigate(`/events/${event.category}/${event.id}`,
                        {
                          state:event.id,
                      }
                      );
                    } else {
                      console.warn("Missing event data:", event);
                      alert("This event is missing a category. Cannot navigate.");
                    }
                  }}
                >
                  <div style={{ fontWeight: "600", color: "#111827" }}>
                    {event.name}
                  </div>
                  {/* <span style={{ color: "#10b981", fontWeight: "bold" }}>• </span> */}
                  {/* <strong>{event.name}</strong> */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
};

  const tileDisabled = ({ date, view }) =>
    view === "month" &&
    (date.getTime() < monday.getTime() || date.getTime() > sunday.getTime());

  const boxClasses = "rounded-md h-28 w-28 min-w-24 text-white font-medium flex flex-col justify-center items-center gap-2 p-2 transition-transform hover:scale-105 cursor-pointer";

  if (loading) {
    return (
      <div className="flex flex-col items-center w-full p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full p-4">
      {error && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md text-sm">
          <strong>Warning:</strong> {error}. Using mock data for demonstration.
        </div>
      )}

 <div className="overflow-x-auto scrollbar-hide w-full">
  <div className="flex gap-4 px-4 py-4 md:flex-nowrap lg:grid lg:grid-cols-2 lg:gap-6 lg:px-0 lg:py-0 justify-center max-w-md mx-auto">

        <div
          className={`${boxClasses} bg-blue-600`}
          onClick={() => {
            setShowTodayCalendar(true);
            setShowWeekCalendar(false);
            setShowChooseDateCalendar(false);
          }}
        >
         
          <CustomDateIcon date={today.getDate()} bgColor="#2563EB" />
          <p className="text-center text-sm mt-1">
            Today {loading ? "..." : todayCount} {/* today count */}
          </p>
        </div>

        <div
          className={`${boxClasses} bg-orange-400`}
          onClick={() => {
            setShowTomorrowCalendar(true);
            setShowWeekCalendar(false);
            setShowChooseDateCalendar(false);
          }}
        >
          <CustomDateIcon date={tomorrow.getDate()} bgColor="#F97316" />
          <p className="text-center text-sm mt-1">
            Tomorrow {loading ? "..." : tomorrowCount} {/* tomorrow count */}
          </p>
        </div>

        <div
          className={`${boxClasses} bg-blue-400`}
          onClick={() => {
            setShowWeekCalendar(true);
            setShowChooseDateCalendar(false);
          }}
        >
          <Calendar className="text-white text-2xl" />
          <p className="text-center text-sm">
            This Week {loading ? "..." : weekCount}
          </p>
        </div>

        <div
          className={`${boxClasses} bg-green-600`}
          onClick={() => {
            setShowChooseDateCalendar(true);
            setShowWeekCalendar(false);
          }}
        >
          <CalendarCheck className="text-white text-2xl" />
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
              Select Day This Week
            </h3>
            <SimpleCalendar
              value={selectedDate}
              onChange={(date) => {
                getSelectedDate(date);
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
    <div
       ref={todayPickerRef} 
      className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4"
    >
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
        Events for Today
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
 {/* tomorrow Calendar Modal */}
{showTomorrowCalendar && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div
      ref={tomorrowPickerRef}
      className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4"
    >
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
        Events for Tomorrow
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
            <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
              Choose Any Date
            </h3>
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