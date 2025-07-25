import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminMyEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCount, setShowCount] = useState(10);
  const [page, setPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [selectedOrganizer, setSelectedOrganizer] = useState("");
  const dropdownRef = useRef(null);
  const token = localStorage.getItem("authToken");
  const baseUrl = "http://localhost:5000/api";

  const [toast, setToast] = useState(null);
const showToast = (msg) => {
  setToast(msg);
  setTimeout(() => setToast(null), 2500);
};

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${baseUrl}/event`, {
        headers: { Authorization: token },
      });
      setEvents(res.data.events || []);
    } catch (err) {
      console.error("Failed to load events", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

useEffect(() => {
  if (dropdownOpen) {
    const el = document.getElementById(`dropdown-${dropdownOpen}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
}, [dropdownOpen]);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const organizersAndPerformers = [
    ...new Set(
      events.flatMap((e) => [
        e.organizer?.firstname + " " + e.organizer?.lastname,
        e.performer?.firstname + " " + e.performer?.lastname,
      ])
    ),
  ];

  const filteredEvents = events
    .filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((e) => {
      const org = e.organizer?.firstname + " " + e.organizer?.lastname;
      const perf = e.performer?.firstname + " " + e.performer?.lastname;
      return selectedOrganizer
        ? org === selectedOrganizer || perf === selectedOrganizer
        : true;
    });

  const totalPages = Math.ceil(filteredEvents.length / showCount);
  const paginated = filteredEvents.slice(
    (page - 1) * showCount,
    page * showCount
  );

  const handleEdit = async (event) => {
        const id = event._id;
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${baseUrl}/event/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        const eventData = response.data;
        navigate("/dashboard/create-event", { state: { event: eventData } });
      } else {
        
        showToast("Could not fetch event details.");
      }
    } catch (error) {
      
      showToast("Error fetching event. Please try again.");
    }
  };

  // const handleClone = (event) => {
  //   const newEvent = {
  //     ...event,
  //     _id: Date.now().toString(),
  //     name: `${event.name} (Clone)`,
  //   };
  //   setEvents((prev) => [newEvent, ...prev]);
  //   setPage(1);
  // };

// const handleClone = async (event) => {
//   const id = event._id;
//   try {
//     const token = localStorage.getItem("authToken");

//     const response = await axios.post(`${baseUrl}/event/${id}/clone`, event, {
//       headers: { Authorization: token },
//     });

//     if (response.status === 200 && response.data) {
//       // Manually modify name in local copy if needed
//       const cloned = response.data.clonedEvent || response.data;
//       cloned.name = `${event.name} - clone`;

//       // Show toast and update list
//       showToast("✅ Event cloned successfully!");
//       fetchEvents();
//     } else {
//       showToast("❌ Failed to clone event.");
//     }
//   } catch (error) {
//     console.error("Clone error:", error);
//     showToast("⚠️ Error cloning event.");
//   }
// };

const handleClone = async (event) => {
  const id = event._id;
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(`${baseUrl}/event/${id}/clone`, {}, {
      headers: { Authorization: token },
    });

    if (response.status === 200 && response.data) {
      showToast("✅ Event cloned successfully!");
      fetchEvents();
    } else {
      showToast("❌ Failed to clone event.");
    }
  } catch (error) {
    console.error("Clone error:", error?.response?.data || error.message);
    showToast(
      error?.response?.data?.message || "⚠️ Error cloning event."
    );
  }
};




  const renderPagination = () => (
    <div className="flex gap-2">
      {page > 1 && (
        <button
          onClick={() => setPage(page - 1)}
          className="px-4 py-1 border rounded"
        >
          Prev
        </button>
      )}
      {page < totalPages && (
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-1 border rounded"
        >
          Next
        </button>
      )}
    </div>
  );

  const formatDate = (str) => {
    if (!str) return "";
    const date = new Date(str);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <div className="p-6 font-sans text-gray-800">
      <h2 className="text-3xl font-bold mb-6">My Events</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">Search Event</span>
          <input
            type="text"
            className="border p-2 rounded w-full max-w-xs"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">
            List of Organizer/Events
          </span>
          <select
            className="border p-2 rounded"
            value={selectedOrganizer}
            onChange={(e) => {
              setSelectedOrganizer(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All</option>
            {organizersAndPerformers.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">Show</span>
          <select
            className="border p-2 rounded"
            value={showCount}
            onChange={(e) => {
              setShowCount(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </label>
      </div>

      <table className="w-full text-sm border rounded overflow-hidden shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Event</th>
            <th className="p-3">Start</th>
            <th className="p-3">End</th>
            <th className="p-3">Publish</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((event) => (
            <tr key={event._id} className="border-t hover:bg-gray-50">
              <td className="p-3 flex items-center gap-2">
                <img
                  src={event.thumbnail || "/no-img.png"}
                  alt="thumb"
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <div className="font-semibold">{event.name}</div>
                </div>
              </td>
              <td className="p-3">{formatDate(event.startDate)}</td>
              <td className="p-3">{formatDate(event.endDate)}</td>
              <td className="p-3">{event.isPublish ? "Yes" : "No"}</td>
              <td className="p-3">{event.status ? "Enabled" : "Disabled"}</td>
              <td
                className="p-3 relative"
                ref={dropdownOpen === event._id ? dropdownRef : null}
              >
                <button
                  className="px-2 py-1 rounded-md font-bold bg-green-400 hover:bg-green-700 "
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(
                      dropdownOpen === event._id ? null : event._id
                    );
                  }}
                >
                  ⋮
                </button>
                {dropdownOpen === event._id && (
                  <div 
                  id={`dropdown-${event._id}`}
                  className="absolute z-10 right-0 mt-2 w-44 max-h-60 overflow-y-auto bg-blue-50 shadow-lg border border-gray-200 rounded text-sm animate-fade-in scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
>
                    <button className="block w-full text-left px-4 py-2 hover:bg-pink-300">
                      
                       Export Attendees
                    </button>
                    <button
                      onClick={() => handleEdit(event)}
                      className="block w-full text-left px-4 py-2 hover:bg-pink-300">
                       Edit Event
                    </button>
                    <button
                      onClick={() => handleClone(event)}
                      className="block w-full text-left px-4 py-2 hover:bg-pink-300">
                       Clone Event
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-pink-300">
                       Private Event
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-pink-300">
                       Add Sub-Organizers
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-pink-300">
                       Add to GuestList
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-pink-300">
                       Export Sales Report
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-center">{renderPagination()}</div>
      {toast && (
  <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50 transition-all duration-300">
    {toast}
  </div>
)}

    </div>
  );
};

export default AdminMyEvents;
