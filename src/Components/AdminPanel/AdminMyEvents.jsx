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

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/event", {
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
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const organizers = [...new Set(events.map((e) => e.organizer))];

  const filteredEvents = events
    .filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((e) => (selectedOrganizer ? e.organizer === selectedOrganizer : true));

  const totalPages = Math.ceil(filteredEvents.length / showCount);
  const paginated = filteredEvents.slice((page - 1) * showCount, page * showCount);

  // const handleClone = async (event) => {
  //   const newEvent = { ...event, _id: Date.now(), name: event.name + " (Clone)" };
  //   localStorage.setItem("clonedEvent", JSON.stringify(newEvent));
  //   navigate("/dashboard/create-event", { state: { isClone: true } });
  // };
  const handleClone = (event) => {
    console.log(event,"CLONE THIS EVENT");
    const newEvent = {
      ...event,
      _id: Date.now(),
      name: event.name + " (Clone)",
    };
    setEvents((prev) => [newEvent, ...prev]);
    setPage(1);
  };

  // const handleClone = (event) => {
  //   const newEvent = { ...event, id: Date.now(), name: `${event.name} (Clone)` };
  //   setEvents([newEvent, ...events]);
  //   setPage(1);
  // };

//   const handleClone = async (event) => {
//   const clonedEvent = { ...event };
//   // delete clonedEvent._id;
//   clonedEvent.name = event.name + " (Clone)";

//   try {
//     const res = await axios.get("http://localhost:5000/api/event", clonedEvent, {
//       headers: { Authorization: token },
//     });
//     alert("✅ Event cloned successfully");
//     fetchEvents(); // refresh list so clone appears at top
//   } catch (err) {
//     console.error("Clone failed:", err);
//   }
// };


 const handleEdit = (id) => {
  console.log("ID", id);
  navigate("/dashboard/create-event", { state: id });
};

  const renderPagination = () => {
    const buttons = [];
    if (page > 1) {
      buttons.push(
        <button key="prev" onClick={() => setPage(page - 1)} className="px-3 py-1 border">
          Prev
        </button>
      );
    }
    const maxToShow = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + maxToShow - 1);
    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          className={`px-3 py-1 border rounded ${page === i ? "bg-blue-600 text-white" : ""}`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }
    if (end < totalPages) {
      buttons.push(<span key="dots">...</span>);
      buttons.push(
        <button key="next" onClick={() => setPage(page + 1)} className="px-3 py-1 border">
          Next
        </button>
      );
    }
    return buttons;
  };

  const formatDate = (str) => {
    if (!str) return "";
    const date = new Date(str);
    return `${date.getDate().toString().padStart(2, '0')}/${
      (date.getMonth() + 1).toString().padStart(2, '0')}/${
      date.getFullYear()}`;
  };

  return (
    <div className="p-6 font-sans text-gray-800">
      <h2 className="text-3xl font-bold mb-6">My Events</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          className="border p-2 rounded w-full max-w-xs"
          placeholder="Search events"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="border p-2 rounded"
          value={selectedOrganizer}
          onChange={(e) => {
            setSelectedOrganizer(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Organizers</option>
          {organizers.map((o) => (
            <option key={o} value={o}>{o?.lastname || "not found"}</option>
          ))}
        </select>
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
                <img src={event.thumbnail || "/no-img.png"} alt="thumb" className="w-12 h-12 rounded object-cover" />
                <div>
                  <div className="font-semibold">{event.name}</div>
                </div>
              </td>
              <td className="p-3">{formatDate(event.startDate)}</td>
              <td className="p-3">{formatDate(event.endDate)}</td>
              <td className="p-3">{event.isPublish ? "Yes" : "No"}</td>
              <td className="p-3">{event.status ? "Enabled" : "Disabled"}</td>
              <td className="p-3 relative" ref={dropdownRef}>
                <button
                  className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(dropdownOpen === event._id ? null : event._id);
                  }}
                >
                  ⋮
                </button>
                {dropdownOpen === event._id && (
                  <div className="absolute z-10 right-0 mt-2 w-40 bg-white shadow border rounded text-sm">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      📤 Export Attendees
                    </button>
                    <button
                      onClick={() => handleEdit(event._id)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      ✏️ Edit Event
                    </button>
                    <button
                      onClick={() => handleClone(event)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      📋 Clone Event
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      🔒 Private Event
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      ➕ Add Sub-Organizers
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      ➕ Add to GuestList
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      📈 Export Sales Report
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-center gap-2">{renderPagination()}</div>
    </div>
  );
};

export default AdminMyEvents;
