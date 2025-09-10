import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { createPortal } from "react-dom";
import { cloneEvent } from "../../redux/actions/master/Events/CloneEvent";
import { makeEventPrivate } from "../../redux/actions/master/Events/MakeEventPrivate";
import { makeEventPublic } from "../../redux/actions/master/Events/MakeEventPublic";
import { addUser } from "../../redux/actions/master/Events/AddUser";
import { getMyUsers } from "../../redux/actions/master/Events/GetMyUsers";
import { assignSubOrganizers } from "../../redux/actions/master/Events/AssignSubOrganizers";

const AdminMyEvents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const [totalEvents, setTotalEvents] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [addUserForm, setAddUserForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'scanner'
  });
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [showSubOrganizersModal, setShowSubOrganizersModal] = useState(false);
  const [selectedEventForSubOrganizers, setSelectedEventForSubOrganizers] = useState(null);
  const [myUsers, setMyUsers] = useState([]);
  const [scannerUsers, setScannerUsers] = useState([]);
  const [posUsers, setPosUsers] = useState([]);
  const [selectedScanners, setSelectedScanners] = useState([]);
  const [selectedPosUsers, setSelectedPosUsers] = useState([]);
  const [subOrganizersLoading, setSubOrganizersLoading] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
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
      setTotalEvents(responseData.totalEvents || 0);
    } catch (err) {
      // console.error("Failed to load events", err);
      showToast("❌ Failed to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [searchQuery, selectedOrganizer, page, showCount]);



  useEffect(() => {
    const handleClickOutside = (e) => {
      const portalEl = dropdownOpen
        ? document.getElementById(`dropdown-${dropdownOpen}`)
        : null;
      const clickedOutsideTrigger =
        dropdownRef.current && !dropdownRef.current.contains(e.target);
      const clickedOutsidePortal = !(portalEl && portalEl.contains(e.target));

      if (clickedOutsideTrigger && clickedOutsidePortal) {
        setDropdownOpen(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setDropdownOpen(null);
      }
    };

    const handleScroll = () => {
      if (dropdownOpen) {
        // Update dropdown position when scrolling
        const buttonElement = document.querySelector(`button[data-event-id="${dropdownOpen}"]`);
        if (buttonElement) {
          const position = calculateDropdownPosition(buttonElement);
          setDropdownPosition(position);
        }
      }
    };



    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dropdownOpen]);

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

  const calculateDropdownPosition = (buttonElement) => {
    const rect = buttonElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const dropdownWidth = 176; // w-44 = 11rem = 176px
    const dropdownHeight = 240; // max-h-60 = 15rem = 240px

    // Header height (adjust this value based on your actual header height)
    const headerHeight = 80; // Approximate header height in pixels

    // Calculate position relative to the button but ensure it doesn't go above header
    let x = rect.right - dropdownWidth;
    let y = rect.bottom + 8; // Position below the button

    // Adjust if dropdown would go off the right edge
    if (x < 0) {
      x = rect.left;
    }

    // Ensure dropdown doesn't go off the left edge
    if (x < 0) {
      x = 8;
    }

    // Ensure dropdown doesn't go off the right edge
    if (x + dropdownWidth > viewportWidth) {
      x = viewportWidth - dropdownWidth - 8;
    }

    // Ensure dropdown doesn't go above the header
    if (y < headerHeight) {
      y = headerHeight + 8;
    }

    // If dropdown would go off the bottom, position it above the button
    if (y + dropdownHeight > viewportHeight) {
      y = rect.top - dropdownHeight - 8;
      // But still ensure it doesn't go above header
      if (y < headerHeight) {
        y = headerHeight + 8;
      }
    }

    return { x, y };
  };

  const handleClone = async (event) => {
    const id = event._id;
    console.log(id);
    console.log("clone event working");

    try {
      await dispatch(cloneEvent(id));
      // Refresh the events list after successful clone
      fetchEvents();
    } catch (error) {
      // Error handling is already done in the Redux action
      console.error("Clone failed:", error);
    }
  };

  const handleTogglePublish = async (event) => {
    const id = event._id;
    try {
      if (event.isPublish) {
        // If currently published, make it private
        await dispatch(makeEventPrivate(id));
      } else {
        // If currently private, make it public
        await dispatch(makeEventPublic(id));
      }
      // Refresh the events list after successful operation
      fetchEvents();
    } catch (error) {
      // Error handling is already done in the Redux action
      console.error("Toggle publish failed:", error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddUserLoading(true);
    try {
      await dispatch(addUser(addUserForm));
      setShowAddUserModal(false);
      setAddUserForm({
        username: '',
        email: '',
        password: '',
        role: 'scanner'
      });
    } catch (error) {
      console.error("Add user failed:", error);
    } finally {
      setAddUserLoading(false);
    }
  };

  const handleAddUserFormChange = (e) => {
    const { name, value } = e.target;
    setAddUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSubOrganizersClick = async (event) => {
    setSelectedEventForSubOrganizers(event);
    setShowSubOrganizersModal(true);
    setDropdownOpen(null); // Close dropdown
  };

  // Fetch users when modal opens
  useEffect(() => {
    if (showSubOrganizersModal && selectedEventForSubOrganizers) {
      const fetchUsers = async () => {
        try {
          // Fetch my users
          const usersData = await dispatch(getMyUsers());
          setMyUsers(usersData.users || []);

          // Filter users by role
          const scanners = usersData.users?.filter(user => user.role === 'scanner') || [];
          const posUsers = usersData.users?.filter(user => user.role === 'POS') || [];

          setScannerUsers(scanners);
          setPosUsers(posUsers);

          // Set current selections based on event data
          setSelectedScanners(selectedEventForSubOrganizers.scanner?.map(s => s._id) || []);
          setSelectedPosUsers(selectedEventForSubOrganizers.pos?.map(p => p._id) || []);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      fetchUsers();
    }
  }, [showSubOrganizersModal, selectedEventForSubOrganizers, dispatch]);

  // Cleanup modal state when it closes
  useEffect(() => {
    if (!showSubOrganizersModal) {
      // Reset selections when modal closes
      setSelectedScanners([]);
      setSelectedPosUsers([]);
      setSelectedEventForSubOrganizers(null);
    }
  }, [showSubOrganizersModal]);

  const handleAddSubOrganizersButtonClick = (e, event) => {
    e.stopPropagation(); // Prevent event bubbling
    setDropdownOpen(null); // Close dropdown first

    // Use setTimeout to ensure dropdown closes before opening modal
    setTimeout(() => {
      handleAddSubOrganizersClick(event);
    }, 50);
  };

  const handleAssignSubOrganizers = async () => {
    if (!selectedEventForSubOrganizers) return;

    setSubOrganizersLoading(true);
    try {
      await dispatch(assignSubOrganizers(selectedEventForSubOrganizers._id, {
        scannerIds: selectedScanners,
        posIds: selectedPosUsers
      }));

      // Refresh events list to get updated data
      fetchEvents();
      setShowSubOrganizersModal(false);
    } catch (error) {
      console.error("Error assigning sub-organizers:", error);
    } finally {
      setSubOrganizersLoading(false);
    }
  };

  const handleScannerToggle = (userId) => {
    setSelectedScanners(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handlePosToggle = (userId) => {
    setSelectedPosUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };



  const renderPagination = () => (
    <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-gray-50 rounded-lg">
      {/* Simple Results Info */}
      <div className="text-sm text-gray-600 font-medium">
        {totalEvents} events • Page {page} of {totalPages}
      </div>

      {/* Clean Navigation */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${page === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-[#ff2459]/10 hover:text-[#ff2459] shadow-sm"
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
              if (page > 3) {
                pages.push(1);
                if (page > 4) pages.push('...');
              }

              // Show pages around current page
              const start = Math.max(1, page - 1);
              const end = Math.min(totalPages, page + 1);

              for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i);
              }

              // Always show last page
              if (page < totalPages - 2) {
                if (page < totalPages - 3) pages.push('...');
                pages.push(totalPages);
              }

              return pages;
            };

            return getVisiblePages().map((pageNum, index) => {
              if (pageNum === '...') {
                return (
                  <span key={`ellipsis-${index}`} className="px-2 py-2 text-gray-400">
                    ⋯
                  </span>
                );
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${page === pageNum
                    ? "bg-[#ff2459] text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-[#ff2459]/10 hover:text-[#ff2459] shadow-sm"
                    }`}
                >
                  {pageNum}
                </button>
              );
            });
          })()}
        </div>

        {/* Next Button */}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${page === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-[#ff2459]/10 hover:text-[#ff2459] shadow-sm"
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
              const pageNum = parseInt(e.target.value);
              if (pageNum >= 1 && pageNum <= totalPages) {
                setPage(pageNum);
              }
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const pageNum = parseInt(e.target.value);
                if (pageNum >= 1 && pageNum <= totalPages) {
                  setPage(pageNum);
                  e.target.value = '';
                }
              }
            }}
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
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
    <div className="p-4 md:p-6 font-sans text-gray-800 min-h-screen md:min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-3rem)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Events</h2>
        <button
          onClick={() => setShowAddUserModal(true)}
          className="bg-[#ff2459] hover:bg-[#e61e4d] text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Create Sub-Organizer
        </button>
      </div>

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

      <div className="overflow-x-auto min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
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
            {loading ? (
              <tr>
                <td colSpan="6" className="p-3 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="ml-2">Loading events...</span>
                  </div>
                </td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  No events found
                </td>
              </tr>
            ) : (
              events.map((event) => (
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
                      className="px-2 py-1 rounded-md font-bold bg-[#ff2459] hover:bg-[#e61e4d] text-white"
                      data-event-id={event._id}
                      onClick={(e) => {
                        e.stopPropagation();
                        const newDropdownState = dropdownOpen === event._id ? null : event._id;
                        setDropdownOpen(newDropdownState);

                        if (newDropdownState) {
                          // Calculate position for the dropdown below header
                          const position = calculateDropdownPosition(e.currentTarget);
                          setDropdownPosition(position);
                        }
                      }}
                    >
                      ⋮
                    </button>
                    {dropdownOpen === event._id && createPortal(
                      <div
                        id={`dropdown-${event._id}`}
                        className="fixed z-50 w-44 max-h-60 overflow-y-auto bg-white shadow-lg border border-gray-200 rounded text-sm animate-fade-in scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                        style={{
                          top: dropdownPosition.y,
                          left: dropdownPosition.x,
                        }}
                      >
                        <button className="block w-full text-left px-4 py-2 hover:bg-[#ff2459]/10 hover:text-[#ff2459]">
                          Export Attendees
                        </button>
                        <button
                          onClick={() => handleEdit(event)}
                          className="block w-full text-left px-4 py-2 hover:bg-[#ff2459]/10 hover:text-[#ff2459]"
                        >
                          Edit Event
                        </button>
                        <button
                          onClick={() => handleClone(event)}
                          className="block w-full text-left px-4 py-2 hover:bg-[#ff2459]/10 hover:text-[#ff2459]"
                        >
                          Clone Event
                        </button>
                        <button
                          onClick={() => handleTogglePublish(event)}
                          className="block w-full text-left px-4 py-2 hover:bg-[#ff2459]/10 hover:text-[#ff2459]"
                        >
                          {event.isPublish ? "Make Private" : "Make Public"}
                        </button>
                        <button
                          onClick={(e) => handleAddSubOrganizersButtonClick(e, event)}
                          className="block w-full text-left px-4 py-2 hover:bg-[#ff2459]/10 hover:text-[#ff2459]"
                        >
                          Add Sub-Organizers
                        </button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-[#ff2459]/10 hover:text-[#ff2459]">
                          Add to GuestList
                        </button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-[#ff2459]/10 hover:text-[#ff2459]">
                          Export Sales Report
                        </button>
                      </div>,
                      document.body
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {renderPagination()}
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

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New User</h3>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  value={addUserForm.username}
                  onChange={handleAddUserFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff2459] focus:border-[#ff2459]"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={addUserForm.email}
                  onChange={handleAddUserFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff2459] focus:border-[#ff2459]"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={addUserForm.password}
                  onChange={handleAddUserFormChange}
                  required
                  minLength={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff2459] focus:border-[#ff2459]"
                  placeholder="Enter password (min 8 characters)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role *
                </label>
                <select
                  name="role"
                  value={addUserForm.role}
                  onChange={handleAddUserFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff2459] focus:border-[#ff2459]"
                >
                  <option value="scanner">Scanner</option>
                  <option value="manager">Manager</option>
                  <option value="POS">POS</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addUserLoading}
                  className="flex-1 px-4 py-2 bg-[#ff2459] text-white rounded-md hover:bg-[#e61e4d] disabled:bg-[#ff2459]/50 transition-colors"
                >
                  {addUserLoading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sub-Organizers Modal */}
      {showSubOrganizersModal && selectedEventForSubOrganizers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Assign Sub-Organizers</h3>
              <button
                onClick={() => {
                  setShowSubOrganizersModal(false);
                  setSelectedEventForSubOrganizers(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors"
              >
                ×
              </button>
            </div>

            {/* Event Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-lg font-semibold text-gray-800">
                Event: {selectedEventForSubOrganizers.name}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Category: {selectedEventForSubOrganizers.category}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Scanner Users */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Scanner Users ({selectedScanners.length} selected)
                </h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {scannerUsers.length > 0 ? (
                    scannerUsers.map((user) => (
                      <div
                        key={user._id}
                        onClick={() => handleScannerToggle(user._id)}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedScanners.includes(user._id)
                          ? 'border-[#ff2459] bg-[#ff2459]/5'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-800">{user.username}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selectedScanners.includes(user._id)
                            ? 'bg-[#ff2459] border-[#ff2459]'
                            : 'border-gray-300'
                            }`}>
                            {selectedScanners.includes(user._id) && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-gray-500 text-center">No scanner users available.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* POS Users */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  POS Users ({selectedPosUsers.length} selected)
                </h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {posUsers.length > 0 ? (
                    posUsers.map((user) => (
                      <div
                        key={user._id}
                        onClick={() => handlePosToggle(user._id)}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedPosUsers.includes(user._id)
                          ? 'border-[#ff2459] bg-[#ff2459]/5'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-800">{user.username}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selectedPosUsers.includes(user._id)
                            ? 'bg-[#ff2459] border-[#ff2459]'
                            : 'border-gray-300'
                            }`}>
                            {selectedPosUsers.includes(user._id) && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-gray-500 text-center">No POS users available.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Total Scanners:</span> {selectedScanners.length} |
                  <span className="font-medium ml-2">Total POS:</span> {selectedPosUsers.length}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowSubOrganizersModal(false);
                      setSelectedEventForSubOrganizers(null);
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAssignSubOrganizers}
                    disabled={subOrganizersLoading}
                    className="px-6 py-2 bg-[#ff2459] text-white rounded-lg hover:bg-[#e61e4d] disabled:bg-[#ff2459]/50 transition-colors font-medium"
                  >
                    {subOrganizersLoading ? 'Assigning...' : 'Assign Sub-Organizers'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMyEvents;
