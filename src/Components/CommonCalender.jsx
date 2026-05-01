import React, { useState, useRef, useEffect } from "react";
import { Calendar, CalendarCheck } from "lucide-react";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";

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
  restrictToWeek = false
}) => {
  const [currentDate, setCurrentDate] = useState(activeStartDate || value || new Date());

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
    <div className="calendar-container" style={{ width: '100%', maxWidth: '320px' }}>
      {showNavigation && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 0',
          borderBottom: '1px solid #e0e0e0',
          marginBottom: '10px'
        }}>
          <button
            onClick={handlePrevMonth}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '5px 10px',
              borderRadius: '4px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ‹
          </button>
          <h3 style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: '600',
            color: '#333'
          }}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={handleNextMonth}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '5px 10px',
              borderRadius: '4px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ›
          </button>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '2px',
        marginBottom: '10px'
      }}>
        {daysOfWeek.map(day => (
          <div key={day} style={{
            textAlign: 'center',
            fontWeight: '600',
            padding: '8px 4px',
            fontSize: '12px',
            color: '#666'
          }}>
            {day}
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '2px'
      }}>
        {days.map((date, index) => (
          <div key={index} style={{ position: 'relative' }}>
            {date ? (
              <div
                onClick={() => handleDateClick(date)}
                style={{
                  padding: '8px 4px',
                  textAlign: 'center',
                  cursor: isDisabled(date) ? 'not-allowed' : 'pointer',
                  backgroundColor: isSelected(date) ? '#2563eb' : 'transparent',
                  color: isSelected(date) ? 'white' : isDisabled(date) ? '#ccc' : '#333',
                  borderRadius: '4px',
                  fontSize: '14px',
                  minHeight: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isDisabled(date) ? 0.3 : 1,
                  pointerEvents: isDisabled(date) ? 'none' : 'auto',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseOver={(e) => {
                  if (!isSelected(date) && !isDisabled(date)) {
                    e.target.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSelected(date)) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span>{date.getDate()}</span>
                {tileContent && tileContent({ date, view: 'month' })}
              </div>
            ) : (
              <div style={{ padding: '8px 4px', minHeight: '36px' }} />
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
  const chooseDatePickerRef = useRef(null);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

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

  const formatDateYMD = (date) => date.toISOString().split("T")[0];

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
        const mondayStr = formatDateYMD(monday);
        const sundayStr = formatDateYMD(sunday);

        console.log('Fetching data for:', {
          today: todayStr,
          tomorrow: tomorrowStr,
          weekStart: mondayStr,
          weekEnd: sundayStr
        });

        const baseUrl = 'https://dev.eventsnode.com/api/event/filter';
        // const baseUrl = 'http://localhost:5000/api/event/filter';
        console.log('API URLs:', {
          todayUrl: `${baseUrl}?startDate=${todayStr}&endDate=${todayStr}&page=1&limit=100&sortBy=startDate&sortOrder=asc`,
          tomorrowUrl: `${baseUrl}?startDate=${tomorrowStr}&endDate=${tomorrowStr}&page=1&limit=100&sortBy=startDate&sortOrder=asc`,
          weekUrl: `${baseUrl}?startDate=${mondayStr}&endDate=${sundayStr}&page=1&limit=100&sortBy=startDate&sortOrder=asc`,
          allEventsUrl: `${baseUrl}?startDate=2025-01-01&endDate=2025-12-31&page=1&limit=1000&sortBy=startDate&sortOrder=asc`
        });

        // Your actual API URL


        // Construct URLs for different date ranges
        const todayUrl = `${baseUrl}?startDate=${todayStr}&endDate=${todayStr}&page=1&limit=100&sortBy=startDate&sortOrder=asc`;
        const tomorrowUrl = `${baseUrl}?startDate=${tomorrowStr}&endDate=${tomorrowStr}&page=1&limit=100&sortBy=startDate&sortOrder=asc`;
        const weekUrl = `${baseUrl}?startDate=${mondayStr}&endDate=${sundayStr}&page=1&limit=100&sortBy=startDate&sortOrder=asc`;
        const allEventsUrl = `${baseUrl}?startDate=2025-01-01&endDate=2025-12-31&page=1&limit=1000&sortBy=startDate&sortOrder=asc`;

        // Fetch all data concurrently
        const [todayData, tomorrowData, weekData, allEventData] = await Promise.all([
          fetchEventData(todayUrl, 'today events'),
          fetchEventData(tomorrowUrl, 'tomorrow events'),
          fetchEventData(weekUrl, 'week events'),
          fetchEventData(allEventsUrl, 'all events')
        ]);

        console.log('API Response Data:', {
          today: todayData,
          tomorrow: tomorrowData,
          week: weekData,
          allEvents: allEventData
        });

        // Extract counts - handle different possible response structures
        const getTotalCount = (data) => {
          if (data?.data?.total !== undefined) return data.data.total;
          if (data?.data?.length !== undefined) return data.data.length;
          if (data?.total !== undefined) return data.total;
          if (Array.isArray(data?.data)) return data.data.length;
          if (Array.isArray(data)) return data.length;
          return 0;
        };

        const getEventsArray = (data) => {
          if (data?.data?.docs && Array.isArray(data.data.docs)) return data.data.docs;
          if (data?.data && Array.isArray(data.data)) return data.data;
          if (Array.isArray(data)) return data;
          return [];
        };

        setTodayCount(getTotalCount(todayData));
        setTomorrowCount(getTotalCount(tomorrowData));
        setWeekCount(getTotalCount(weekData));
        setEvents(getEventsArray(allEventData));

        console.log('Set counts:', {
          today: getTotalCount(todayData),
          tomorrow: getTotalCount(tomorrowData),
          week: getTotalCount(weekData),
          events: getEventsArray(allEventData).length
        });

      } catch (err) {
        console.error("Error fetching event data:", err);
        setError(err.message || 'Failed to fetch event data');

        // Fallback to mock data if API fails
        console.log('Using fallback mock data due to API error');
        const mockEvents = [
          { title: "Team Meeting", startDate: today.toISOString() },
          { title: "Project Review", startDate: today.toISOString() },
          { title: "Client Call", startDate: tomorrow.toISOString() },
          { title: "Workshop", startDate: new Date(2025, 4, 30).toISOString() },
          { title: "Conference", startDate: new Date(2025, 5, 15).toISOString() },
          { title: "Training Session", startDate: new Date(2025, 5, 20).toISOString() },
        ];

        setEvents(mockEvents);
        setTodayCount(2);
        setTomorrowCount(1);
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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getEventsForDate = (date) => {
    const dateStr = formatDateYMD(date);
    return events.filter((event) => {
      const eventDateStr = formatDateYMD(new Date(event.startDate));
      return eventDateStr === dateStr;
    });
  };

  const renderDots = (dailyEvents) => (
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: 2,
      flexWrap: "wrap",
      gap: "1px",
      position: "relative",
      zIndex: 10,
    }}>
      {dailyEvents.slice(0, 3).map((_, idx) => (
        <span
          key={idx}
          style={{
            width: 5,
            height: 5,
            backgroundColor: "#10b981",
            borderRadius: "50%",
            margin: "0 1px",
            display: "block",
          }}
        />
      ))}
      {dailyEvents.length > 3 && (
        <span style={{
          fontSize: 8,
          color: "#059669",
          marginLeft: 2,
          fontWeight: "bold",
        }}>
          +{dailyEvents.length - 3}
        </span>
      )}
    </div>
  );

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const dailyEvents = getEventsForDate(date);
    console.log("DAILY EVENTS", dailyEvents);

    return (
      <div
        style={{ position: "relative", width: "100%" }}
        onMouseEnter={() => setHoveredDate(date.toDateString())}
        onMouseLeave={() => setHoveredDate(null)}
      >
        {dailyEvents.length > 0 && renderDots(dailyEvents)}

        {hoveredDate === date.toDateString() && dailyEvents.length > 0 && (
          <div style={{
            position: "absolute",
            top: "-90px",
            left: "50%",
            transform: "translateX(-50%)",
            minWidth: 180,
            maxWidth: 220,
            backgroundColor: "white",
            borderRadius: 8,
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            padding: "12px",
            zIndex: 1000,
            fontSize: 12,
            color: "#333",
            pointerEvents: "none",
            userSelect: "none",
            border: "1px solid #e5e7eb"
          }}>
            <div style={{
              fontWeight: "600",
              marginBottom: 8,
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: 6,
              textAlign: "center",
              color: "#374151"
            }}>
              {dailyEvents.length} Event{dailyEvents.length > 1 ? 's' : ''}
            </div>
            <ul style={{
              maxHeight: 120,
              overflowY: "auto",
              margin: 0,
              padding: 0,
              listStyle: "none",
            }}>
              {dailyEvents.map((event, idx) => (
                <li key={idx} style={{
                  marginBottom: 6,
                  fontSize: 11,
                  lineHeight: "1.4",
                  color: "#6b7280"
                }}>
                  <span style={{ color: "#10b981", marginRight: 4 }}>•</span>
                  {event.title || "Untitled Event"}
                </li>
              ))}
            </ul>
            <div style={{
              position: "absolute",
              bottom: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid white",
            }} />
          </div>
        )}
      </div>
    );
  };

  const tileDisabled = ({ date, view }) =>
    view === "month" &&
    (date.getTime() < monday.getTime() || date.getTime() > sunday.getTime());

  const boxClasses = "rounded-md h-28 w-28 text-white font-medium flex flex-col justify-center items-center gap-2 p-2 transition-transform hover:scale-105 cursor-pointer";

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

      <div className="flex flex-wrap justify-center gap-4">
        <div className={`${boxClasses} bg-blue-600 cursor-default`}>
          <CustomDateIcon date={today.getDate()} bgColor="#2563EB" />
          <p className="text-center text-sm mt-1">Today {loading ? '...' : todayCount}</p>
        </div>

        <div className={`${boxClasses} bg-orange-400 cursor-default`}>
          <CustomDateIcon date={tomorrow.getDate()} bgColor="#F97316" />
          <p className="text-center text-sm mt-1">Tomorrow {loading ? '...' : tomorrowCount}</p>
        </div>

        <div
          className={`${boxClasses} bg-blue-400`}
          onClick={() => {
            setShowWeekCalendar(true);
            setShowChooseDateCalendar(false);
          }}
        >
          <Calendar className="text-white text-2xl" />
          <p className="text-center text-sm">This Week {loading ? '...' : weekCount}</p>
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
                if (date >= monday && date <= sunday) {
                  setSelectedDate(date);
                  setShowWeekCalendar(false);
                }
              }}
              tileContent={tileContent}
              tileDisabled={tileDisabled}
              showNavigation={false}
              activeStartDate={monday}
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
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommonCalendar;