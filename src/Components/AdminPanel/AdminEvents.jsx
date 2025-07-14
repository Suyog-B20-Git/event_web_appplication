import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // const res = await axios.get("http://localhost:5000/api/admin/events");
      // setEvents(res.data || []);
    } catch (err) {
      console.error("Failed to load events", err);
    }
  };

  const handleDelete = async (id) => {
    // await axios.delete(`http://localhost:5000/api/admin/events/${id}`);
    // fetchEvents();
  };

  const handleAddNew = () => {
    navigate("/admin/events/new");
  };

  const handleEdit = (id) => {
    navigate(`/admin/events/${id}/edit`);
  };

  const handleView = (id) => {
    navigate(`/admin/events/${id}/view`);
  };

  const handleMore = (id) => {
    alert(`More options for event ${id}`);
  };

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Events</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={handleAddNew}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Add New
        </button>
      </div>

      <input
        className="mb-4 border px-3 py-2 rounded w-full md:w-1/3"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100 font-semibold text-left">
            <tr>
              <th className="p-2"><input type="checkbox" disabled /></th>
              <th className="p-2">Id</th>
              <th className="p-2">Title</th>
              <th className="p-2">Category</th>
              <th className="p-2">Organizer</th>
              <th className="p-2">Start Date</th>
              <th className="p-2">End Date</th>
              <th className="p-2">Repetitive</th>
              <th className="p-2">Featured</th>
              <th className="p-2">Publish</th>
              <th className="p-2">Status</th>
              <th className="p-2">Online</th>
              <th className="p-2">Updated At</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event.id} className="border-t">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(event.id)}
                    onChange={() => toggleCheckbox(event.id)}
                  />
                </td>
                <td className="p-2">{event.id}</td>
                <td className="p-2">{event.title}</td>
                <td className="p-2">{event.category}</td>
                <td className="p-2">{event.organizer}</td>
                <td className="p-2">{event.startDate}</td>
                <td className="p-2">{event.endDate}</td>
                <td className="p-2">{event.repetitive ? "Yes" : "No"}</td>
                <td className="p-2">{event.featured ? "Yes" : "No"}</td>
                <td className="p-2">{event.publish}</td>
                <td className="p-2">{event.status}</td>
                <td className="p-2">{event.online ? "Yes" : "No"}</td>
                <td className="p-2">{event.updatedAt}</td>
                <td className="p-2 flex gap-1 flex-wrap">
                  <button onClick={() => handleView(event.id)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                    View
                  </button>
                  <button onClick={() => handleEdit(event.id)} className="bg-blue-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(event.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                  <button onClick={() => handleMore(event.id)} className="bg-green-500 text-white px-2 py-1 rounded">
                    More
                  </button>
                </td>
              </tr>
            ))}
            {filteredEvents.length === 0 && (
              <tr>
                <td colSpan="14" className="text-center p-4 text-gray-500">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEvents;
