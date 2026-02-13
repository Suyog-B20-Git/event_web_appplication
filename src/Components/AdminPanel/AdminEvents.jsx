// AdminEvents.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const baseUrl = "https://dev.eventsnode.com/api/event";
const baseUrl = "http://localhost:5000/api/event";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const [loading, setLoading] = useState(false);
  const [menuPosition, setMenuPosition] = useState({});
  const buttonRefs = useRef({});

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const fetchEvents = async (pageNum = currentPage) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}?page=${pageNum}`, {
        headers: { Authorization: token },
      });

      setEvents(response.data.events || []);
      setTotalPages(response.data.totalPages || 1);
      setTotalEvents(response.data.totalEvents || 0);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    } finally {
      setLoading(false);
    }
  };


  const handleView = (event) => {
    try {
      const category = event.category || "";
      const lowerCategory = category.toLowerCase();
      const capitalCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
      const mainCategories = ["Organiser", "Performer", "Venue", "Service"];

      const viewUrl = mainCategories.includes(lowerCategory)
        ? `/${capitalCategory}/${event._id}`
        : `/events/${lowerCategory}/${event._id}`;

      navigate(viewUrl, { state: event._id });
      console.log("url is:", viewUrl)
    } catch (err) {
      console.error("Navigation error:", err);
    }
  };


  //   const handleView = (event) => {
  //   const lowerCategory = event.category.toLowerCase();
  //   const upperCategory = event.category.charAt(0).toUpperCase() + event.category.slice(1);
  //   const mainCats = ["Organiser", "Performer", "Venue", "Service"];

  //   const url = mainCats.includes(lowerCategory)
  //     ? `/${upperCategory}/${event._id}`
  //     : `/events/${lowerCategory}/${event._id}`;
  //  console.log("url is:", url)
  //   navigate(`https://dev.eventsnode.com/api/${url}`);
  // };


  // const handleDelete = async (id) => {
  //       setConfirmModal({
  //     show: true,
  //     id,
  //     bulk: false,
  //     message: "Are you sure you want to delete this category?",
  //   });
  // };

  const handleDelete = async (event) => {
    const confirmed = window.confirm(`Really want to delete event "${event.name}"?`);
    if (!confirmed) return;

    try {
      await axios.delete(`${baseUrl}/${event._id}`, {
        headers: { Authorization: token },
      });
      // Refresh current page, but if it's empty and not the first page, go to previous page
      fetchEvents(currentPage);
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };


  const handleEdit = async (id) => {
    navigate("/dashboard/update-event", { state: { event: { _id: id } } });
  };

  const handleCreateEvent = () => {
    navigate("/dashboard/create-event");
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };


  useEffect(() => {
    const handleClickOutside = (e) => {
      // Don't close if clicking inside the dropdown menu
      if (!e.target.closest('.dropdown-menu-container') && !e.target.closest('.dropdown-button')) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const calculateMenuPosition = (eventId, buttonElement) => {
    if (!buttonElement) return;

    const rect = buttonElement.getBoundingClientRect();
    const menuHeight = 200; // Approximate height of the menu
    const menuWidth = 128; // w-32 = 128px
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Calculate available space below and above
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    
    // Determine if menu should open above or below
    const openAbove = spaceBelow < menuHeight && spaceAbove > spaceBelow;
    
    // Calculate horizontal position (right-aligned, but ensure it doesn't go off-screen)
    let left = rect.right - menuWidth;
    if (left < 10) {
      left = rect.left; // Align to left if right would go off-screen
    }
    if (left + menuWidth > viewportWidth - 10) {
      left = viewportWidth - menuWidth - 10; // Ensure it doesn't go off right edge
    }

    // Calculate vertical position (fixed positioning is relative to viewport)
    let top;
    if (openAbove) {
      top = rect.top - menuHeight - 4; // 4px gap above
    } else {
      top = rect.bottom + 4; // 4px gap below
    }

    // Ensure menu doesn't go off top or bottom of viewport
    if (top < 10) {
      top = 10; // Minimum top margin
    }
    if (top + menuHeight > viewportHeight - 10) {
      top = viewportHeight - menuHeight - 10; // Ensure it fits in viewport
    }

    setMenuPosition({
      [eventId]: {
        top: `${top}px`,
        left: `${left}px`,
        position: 'fixed',
      }
    });
  };

  const handleDropdownToggle = (eventId, e) => {
    e.stopPropagation();
    const buttonElement = buttonRefs.current[eventId];
    
    if (dropdownOpen === eventId) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(eventId);
      // Calculate position after state update
      setTimeout(() => {
        calculateMenuPosition(eventId, buttonElement);
      }, 0);
    }
  };

  const formatDate = (str) => {
    if (!str) return "";
    const date = new Date(str);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
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
            {loading ? (
              <tr>
                <td colSpan="8" className="p-3 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="ml-2">Loading events...</span>
                  </div>
                </td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-3 text-center text-gray-500">
                  No events found
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event._id} className="border-t">
                  <td className="p-3">{event.name}</td>
                  <td className="p-3">{event.category}</td>
                  <td className="p-3">{event?.organizer?.name || "no organizer found"}</td>
                  <td className="p-3">{formatDate(event.startDate)}</td>
                  <td className="p-3">{formatDate(event.endDate)}</td>
                  <td className="p-3">{event.isPublish}</td>
                  <td className="p-3">{event.isEnabled}</td>
                  <td className="p-3 relative">
                    <button
                      ref={(el) => (buttonRefs.current[event._id] = el)}
                      className="dropdown-button bg-green-500 text-white px-2 py-1 w-16 h-8 flex items-center justify-center rounded-xl"
                      onClick={(e) => handleDropdownToggle(event._id, e)}
                    >
                      <span className="text-md font-bold text-white-600 w-full">
                        {" "}
                        ⋮
                      </span>
                    </button>
                    {dropdownOpen === event._id && (
                      <div
                        className="dropdown-menu-container w-32 bg-red-100 text-gray-800 font-semibold border border-gray-200 rounded-xl shadow-lg z-50"
                        style={menuPosition[event._id] || {}}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            handleEdit(event._id);
                            setDropdownOpen(null);
                          }}
                          className="block w-full px-2 py-1 mb-1 rounded-xl hover:bg-purple-400 text-left"
                        >
                          Edit Event
                        </button>
                        <button
                          // onClick={() => navigate(`/events/${event.category}/${event.organizer}`)}
                          onClick={() => {
                            handleView(event);
                            setDropdownOpen(null);
                          }}
                          className="block w-full px-2 py-1 mb-1 rounded-xl hover:bg-purple-400 text-left"
                        //        onClick={(e) => {
                        //   e.stopPropagation();
                        //    if (event.category && event.id) {
                        //     navigate(`/events/${event.category}/${event.id}`,
                        //       {
                        //         state:event.id,
                        //     }
                        //     );
                        //   } else {
                        //     console.warn("Missing event data:", event);
                        //     alert("This event is missing a category. Cannot navigate.");
                        //   }
                        // }}
                        // className="block w-full   px-2 py-1  mb-1 rounded-xl hover:bg-purple-400"

                        >
                          View Event
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(event);
                            setDropdownOpen(null);
                          }}
                          className="block w-full px-2 py-1 mb-1 rounded-xl hover:bg-purple-400 text-left"
                        >
                          Delete Event
                        </button>
                        <button
                          onClick={() => {
                            navigate(`/create-ticket/${event._id}`);
                            setDropdownOpen(null);
                          }}
                          className="block w-full px-2 py-1 mb-1 rounded-xl hover:bg-purple-400"
                        >
                          Manage Tickets
                        </button>
                        <button
                          onClick={() => {
                            navigate(`/adminMyEvents`);
                            setDropdownOpen(null);
                          }}

                          className="block w-full px-2 py-1 mb-1 rounded-xl hover:bg-purple-400 text-left"
                        >
                          More Actions
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Intuitive Pagination */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-gray-50 rounded-lg">
        {/* Simple Results Info */}
        <div className="text-sm text-gray-600 font-medium">
          {totalEvents} events • Page {currentPage} of {totalPages}
        </div>

        {/* Clean Navigation */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm"
              }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </button>

          {/* Page Numbers - Simple approach */}
          <div className="flex items-center gap-1">
            {(() => {
              const getVisiblePages = () => {
                if (totalPages <= 7) {
                  return Array.from({ length: totalPages }, (_, i) => i + 1);
                }

                const pages = [];

                // Always show page 1
                if (currentPage > 3) {
                  pages.push(1);
                  if (currentPage > 4) pages.push('...');
                }

                // Show pages around current page
                const start = Math.max(1, currentPage - 1);
                const end = Math.min(totalPages, currentPage + 1);

                for (let i = start; i <= end; i++) {
                  if (!pages.includes(i)) pages.push(i);
                }

                // Always show last page
                if (currentPage < totalPages - 2) {
                  if (currentPage < totalPages - 3) pages.push('...');
                  pages.push(totalPages);
                }

                return pages;
              };

              return getVisiblePages().map((page, index) => {
                if (page === '...') {
                  return (
                    <span key={`ellipsis-${index}`} className="px-2 py-2 text-gray-400">
                      ⋯
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${currentPage === page
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-600 shadow-sm"
                      }`}
                  >
                    {page}
                  </button>
                );
              });
            })()}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm"
              }`}
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Quick Jump for Very Large Datasets */}
        {totalPages > 50 && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Go to:</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              placeholder="Page"
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= totalPages) {
                  handlePageChange(page);
                }
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const page = parseInt(e.target.value);
                  if (page >= 1 && page <= totalPages) {
                    handlePageChange(page);
                    e.target.value = '';
                  }
                }
              }}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
