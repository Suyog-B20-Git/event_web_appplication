import { useState, useEffect } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";




const sections = [
  { name: "My Events", icon: <FaCalendarAlt />, id: "my-events" },
];

const MyEvents = () => {
  const [activeSection, setActiveSection] = useState("my-events");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsToShow, setRowsToShow] = useState(10);

  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `http://localhost:5000/api/organizer/events?page=${page}&limit=${rowsToShow}`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        
        const eventsData = Array.isArray(response.data.data)
          ? response.data.data
          : Array.isArray(response.data.data.events)
          ? response.data.data.events
          : [];

        setEvents(eventsData);
        setFilteredEvents(eventsData);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
        setEvents([]);
        setFilteredEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page, rowsToShow]);

  const handleCreateEvent = () => {
    navigate("/dashboard/create-event"); 
  };
 
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    const searchResults = events.filter((event) =>
      event.name?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEvents(searchResults);
  };

  useEffect(() => {
    const searchResults = events.filter((event) =>
      event.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(searchResults);
  }, [searchTerm, events]);

  return (
    <div className="mt-4 w-full px-2 md:px-6">
      {activeSection === "my-events" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Events</h2>

          {/* Create Event Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handleCreateEvent}
              className="flex items-center justify-center gap-2 bg-[#ff2459] hover:bg-[#e91e63] text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto"
            >
              <FaCalendarDays className="text-lg" />
              Create Event
            </button>
          </div>
          {/* Filter Row */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
            <label className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-medium">Search Any</span>
              <input
                type="text"
                placeholder="Search"
                className="border px-4 py-2 rounded-xl w-full md:w-auto"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </label>

            <label className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-medium">Show</span>
              <select
                className="border rounded-xl px-2 py-1"
                value={rowsToShow}
                onChange={(e) => {
                  setRowsToShow(parseInt(e.target.value));
                  setPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </label>
          </div>

          {/* Loading, Error */}
          {loading && <p className="text-gray-700">Loading events...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Events Table */}
          {!loading && !error && (
            <div className="overflow-x-auto shadow-md rounded-lg bg-white">
              <table className="min-w-[600px] md:min-w-full text-sm text-left">
                <thead className="bg-gray-100 font-bold">
                  <tr>
                    <th className="px-4 py-3">Event</th>
                    <th className="px-4 py-3">Timings</th>
                    <th className="px-4 py-3">Repetitive</th>
                    <th className="px-4 py-3">Seasonal Tickets</th>
                    <th className="px-4 py-3">Publish</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-4 py-4 text-center text-gray-500"
                      >
                        No event found. Create your new event.
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.slice(0, rowsToShow).map((event) => (
                      <tr key={event._id} className="border-t">
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-800">
                              {event.name || "Untitled Event"}
                            </span>
                            <span className="text-gray-500 text-xs">
                              🕒 {event.bookings || 0} Bookings
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-700">
                            {event.startDate || "--"} <br />
                            {event.endDate || "--"}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              event.repetitive
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {event.repetitive ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              event.seasonal
                                ? "bg-green-500 text-white"
                                : "bg-blue-900 text-white"
                            }`}
                          >
                            {event.seasonal ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              event.publish
                                ? "bg-green-500 text-white"
                                : "bg-gray-400 text-white"
                            }`}
                          >
                            {event.publish ? "Published" : "Unpublished"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              event.status === "enabled"
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {event.status || "Unknown"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button className="text-xl">⋮</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className="flex justify-center mt-4 gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>

                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
