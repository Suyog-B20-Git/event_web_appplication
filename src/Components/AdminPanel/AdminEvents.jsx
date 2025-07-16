// AdminEvents.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/event", {
        headers: { Authorization: token },
      });
      setEvents(response.data.events || []);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/event/${id}`, {
        headers: { Authorization: token },
      });
      fetchEvents(); // refresh list
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (id) => {
    navigate("/dashboard/create-event");
  };

  const handleCreateEvent = () => {
    navigate("/dashboard/create-event");
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const paginatedEvents = events.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(events.length / perPage);


  useEffect(() => {
  const handleClickOutside = () => setDropdownOpen(null);
  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Events</h2>
        <button
          onClick={handleCreateEvent}
          className="bg-green-500 font-semibold text-white px-4 py-2 rounded-xl hover:bg-green-600"
        >
          Add New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Organizer</th>
              <th className="p-3">Start</th>
              <th className="p-3">End</th>
              <th className="p-3">Publish</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEvents.map((event) => (
              <tr key={event._id} className="border-t">
                <td className="p-3">{event.name}</td>
                <td className="p-3">{event.category}</td>
                <td className="p-3">{event.organizer}</td>
                <td className="p-3">{event.startDate}</td>
                <td className="p-3">{event.endDate}</td>
                <td className="p-3">{event.publish}</td>
                <td className="p-3">{event.status}</td>
                <td className="p-3 relative">
                  <button
                    className="bg-green-500 text-white px-2 py-1  w-16 h-8 flex items-center justify-center rounded-xl h "
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpen(dropdownOpen === event._id ? null : event._id);
                    }}
                    
                  >
                    <span className="text-md font-bold text-white-600 w-full ">
                        {" "}
                        ⋮ 
                        </span>
                  </button>
                  {dropdownOpen === event._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-red-100 text-gray-800 font-semibold border border-gray-200 rounded-xl shadow z-10">
                      <button
                        onClick={() => handleEdit(event._id)}
                        className="block w-full   px-2 py-1  mb-1 rounded-xl hover:bg-purple-400"
                      >
                        Edit Event
                      </button>
                      <button
                        // onClick={() => navigate(`/dashboard/view-event/${event._id}`)}
                        // navigate(`/events/${event.category}/${event.id}
                        // onClick={() => navigate(`/events/${event.category}/${event.organizer}`)}
                        onClick={() => navigate(`/events/${event.category}/${event._id}`)}
                        className="block w-full   px-2 py-1  mb-1 rounded-xl hover:bg-purple-400"
                      >
                        View Event
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="block w-full px-2 py-1  mb-1 rounded-xl hover:bg-purple-400"
                      >
                        Delete Event
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="block w-full  px-2 py-1  mb-1 rounded-xl hover:bg-purple-400"
                      >
                       More Actions
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;
