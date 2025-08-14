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
  const [totalPages, setTotalPages] = useState(1);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const fetchEvents = async () => {
    try {
      const params = {
        title: searchQuery,
        organizerName: selectedOrganizer,
        page,
        limit: showCount,
      };

      const res = await axios.get(`${baseUrl}/event`, {
        headers: { Authorization: token },
        params,
      });

      const responseData = res.data;
      setEvents(responseData.events || []);
      setTotalPages(responseData.totalPages || 1);
    } catch (err) {
      // console.error("Failed to load events", err);
      showToast("❌ Failed to load events. Please try again.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [searchQuery, selectedOrganizer, page, showCount]);

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
        navigate("/dashboard/update-event", { state: { event: eventData } });
      } else {
        showToast("Could not fetch event details.");
      }
    } catch (error) {
      showToast("Error fetching event. Please try again.");
    }
  };

  const handleClone = async (event) => {
    const id = event._id;
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(`${baseUrl}/event/${id}/clone`, event, {
        headers: { Authorization: token },
      });

      if (response.status === 200 && response.data) {
        const cloned = response.data.clonedEvent || response.data;
        cloned.name = `${event.name} - clone`;

        showToast(" Event cloned successfully!");
        fetchEvents();
      } else {
        showToast(" Failed to clone event.");
      }
    } catch (error) {
      showToast(" Error cloning event.");
    }
  };

  // const handleClone = async (event) => {
  //   const id = event._id;
  //   try {
  //     const token = localStorage.getItem("authToken");

  //     const response = await axios.post(
  //       `${baseUrl}/event/${id}/clone`,
  //       { event },
  //       {
  //         headers: { Authorization: token },
  //       }
  //     );

  //     if (response.status === 200 && response.data) {
  //       showToast(" Event cloned successfully!");
  //       fetchEvents();
  //     } else {
  //       showToast(" Failed to clone event.");
  //     }
  //   } catch (error) {
  //           showToast(error?.response?.data?.message || " Error cloning event.");
  //   }
  // };

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

      <div className="flex flex-col gap-4 mb-6">
        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">Search Event by Name</span>
          <input
            type="text"
            className="border p-2 rounded-lg w-full max-w-lg  hover:border-blue-500"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">
            Search Event By Organizer
          </span>
          <input
            type="text"
            placeholder="Search by Organizer"
            className="border p-2 rounded-lg w-full max-w-lg hover:border-blue-500"
            value={selectedOrganizer}
            onChange={(e) => {
              setSelectedOrganizer(e.target.value);
              setPage(1);
            }}
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">Show</span>
          <select
            className="border p-2 rounded w-20 text-center hover:border-blue-500"
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
          {events.map((event) => (
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
                  className="px-2 py-1 rounded-md font-bold bg-green-400 hover:bg-green-700"
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
                      className="block w-full text-left px-4 py-2 hover:bg-pink-300"
                    >
                      Edit Event
                    </button>
                    <button
                      onClick={() => handleClone(event)}
                      className="block w-full text-left px-4 py-2 hover:bg-pink-300"
                    >
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
      {toast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50 transition-all duration-300">
          {toast}
        </div>
      )}
    </div>
  );
};

export default AdminMyEvents;
