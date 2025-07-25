// AdminEvents.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:5000/api";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  // const [page, setPage] = useState(1);
  const [rowsToShow, setRowsToShow] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/event?page=${page}&limit=${rowsToShow}`,
        { headers: { Authorization: token } }
      );

      setEvents(response.data.events || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [page, rowsToShow]);

  const handleView = (event) => {
    try {
      const category = event.category || "";
      const lowerCategory = category.toLowerCase();
      const capitalCategory =
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
      const mainCategories = ["Organiser", "Performer", "Venue", "Service"];

      const viewUrl = mainCategories.includes(lowerCategory)
        ? `/${capitalCategory}/${event._id}`
        : `/events/${lowerCategory}/${event._id}`;

      navigate(viewUrl, { state: event._id });
      console.log("url is:", viewUrl);
    } catch (err) {
      console.error("Navigation error:", err);
    }
  };

  const handleDelete = async (event) => {
    const confirmed = window.confirm(
      `Really want to delete event "${event.name}"?`
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${baseUrl}/event/${event._id}`, {
        headers: { Authorization: token },
      });
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

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
        console.error("Event fetch failed", response);
        alert("Could not fetch event details.");
      }
    } catch (error) {
      alert("Error fetching event. Please try again.");
    }
  };

  const handleCreateEvent = () => {
    navigate("/dashboard/create-event");
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
            {events.map((event) => (
              <tr key={event._id} className="border-t">
                <td className="p-3">{event.name}</td>
                <td className="p-3">{event.category}</td>
                <td className="p-3">
                  {event?.organizer?.username || "no organizer found"}
                </td>
                <td className="p-3">{formatDate(event.startDate)}</td>
                <td className="p-3">{formatDate(event.endDate)}</td>
                <td className="p-3">{event.isPublish}</td>
                <td className="p-3">{event.status}</td>
                <td className="p-3 relative">
                  <button
                    className="bg-green-500 text-white px-2 py-1  w-16 h-8 flex items-center justify-center rounded-xl h "
                    onClick={(e) => {
                      e.stopPropagation();
                      const newOpen =
                        dropdownOpen === event._id ? null : event._id;
                      setDropdownOpen(newOpen);

                      const row = e.currentTarget.closest("tr");
                      if (row) {
                        row.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }
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
                        onClick={() => handleEdit(event)}
                        className="block w-full   px-2 py-1  mb-1 rounded-xl hover:bg-purple-400"
                      >
                        Edit Event
                      </button>
                      <button
                        onClick={() => handleView(event)}
                        className="block w-full   px-2 py-1  mb-1 rounded-xl hover:bg-purple-400"
                      >
                        View Event
                      </button>
                      <button
                        onClick={() => handleDelete(event)}
                        className="block w-full px-2 py-1  mb-1 rounded-xl hover:bg-purple-400"
                      >
                        Delete Event
                      </button>
                      <button
                        onClick={() => navigate(`/adminMyEvents`)}
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
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          className="px-3 py-1 rounded border bg-white hover:bg-gray-200"
          disabled={page === 1}
        >
          Prev
        </button>

        {/* {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i + 1}
      onClick={() => setPage(i + 1)}
      className={`px-3 py-1 rounded border ${
        page === i + 1 ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-200"
      }`}
    >
      {i + 1}
    </button>
  ))} */}

        <button
          onClick={() => page < totalPages && setPage(page + 1)}
          className="px-3 py-1 rounded border bg-white hover:bg-gray-200"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminEvents;
