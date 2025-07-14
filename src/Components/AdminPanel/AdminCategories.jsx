import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFolderOpen } from "react-icons/fa";


import { FaMusic, FaTheaterMasks, FaUtensils, FaBusinessTime, FaUmbrellaBeach, FaSuitcase, FaBeer, FaMicrophoneAlt } from "react-icons/fa";
import { GiPartyPopper, GiTie, GiSpeaker, GiHanger } from "react-icons/gi";
import { MdNightlife } from "react-icons/md";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


const categoryIcons = {
  "business-&-seminars": <FaBusinessTime className="text-7xl text-center mx-auto" />,
  "festivals": <GiPartyPopper className="text-7xl text-center mx-auto" />,
  "live-music": <FaMusic className="text-7xl text-center mx-auto" />,
  "nightlife-and-clubs": <MdNightlife className="text-7xl text-center mx-auto" />,
  "professional": <GiTie className="text-7xl text-center mx-auto" />,
  "social": <FaMicrophoneAlt className="text-7xl text-center mx-auto" />,
  "sport-and-leisure": <FaUmbrellaBeach className="text-7xl text-center mx-auto" />,
  "theatre-and-arts": <FaTheaterMasks className="text-7xl text-center mx-auto" />,
  "testing": <GiSpeaker className="text-7xl text-center mx-auto" />,
};



  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/api/categories", {
        headers: {
          Authorization: token,
        },
      });

      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else if (Array.isArray(response.data.data)) {
        setCategories(response.data.data);
      } else {
        console.error("Unexpected categories response:", response.data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddNew = () => {
    navigate("/adminPanel/addCategory");
  };

const handleBulkDelete = async () => {
  if (selectedIds.length === 0) {
    alert("Please select at least one category to delete.");
    return;
  }

  const confirm = window.confirm("Do you really want to delete the selected categories?");
  if (!confirm) return;

  try {
    const token = localStorage.getItem("authToken");
     
    // await axios.post("http://localhost:5000/api/categories/bulk-delete", 
    await axios.delete(`http://localhost:5000/api/categories/${id}`,
      { ids: selectedIds },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setSelectedIds([]); // Clear selection
    fetchCategories();  // Refresh the list
  } catch (err) {
    console.error("Bulk delete failed", err);
  }
};

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you really want to delete this category?" );
    if (!confirm) return;
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:5000/api/categories/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      fetchCategories();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = async (id) => {
    const confirm = window.confirm("Do you really want to edit this category?" );
    if (!confirm) return;
    const token = localStorage.getItem("authToken");
    // navigate(`/admin/categories/${id}/edit`);
    try {
      const payload = {
        name: "Updated Type", // Replace with dynamic or modal input values
        slug: "updated-Name", // same here
        status: "enabled", // or "disabled"
      };
      await axios.put(`http://localhost:5000/api/categories/${id}`, {
        headers: {
          Authorization: token,
          // "Content-Type": "application/json",
        },
      });
      fetchCategories();
    } catch (err) {
      console.error("Edit failed", err);
    }
  };

  //   const handleEdit = (id) => {
  //   navigate(`/admin/categories/${id}/edit`);
  // };

  const handleView = (id) => {
    navigate(`/admin/categories/${id}/view`);
  };

  const handleOrder = () => {
    navigate("/admin/categories/order");
  };

  const toggleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const filtered = categories.filter((cat) =>
    cat.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Header with Icon and Title + Buttons aligned right */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        {/* Left: Icon + Heading */}
        <div className="flex items-center gap-2">
          <FaFolderOpen className="text-3xl text-gray-700" />
          <h2 className="text-3xl font-semibold text-gray-800">Categories</h2>
        </div>

        {/* Right: Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleAddNew}
            className="bg-green-500 text-white text-lg font-semibold  px-4 py-2 rounded-xl"
          >
            Add New
          </button>
          <button
            onClick={handleBulkDelete}
            className="bg-red-500 text-white  text-lg font-semibold px-4 py-2 rounded-xl"
          >
            Bulk Delete
          </button>
          <button
            onClick={handleOrder}
            className="bg-blue-500 text-white text-lg font-semibold px-4 py-2 rounded-xl"
          >
            Order
          </button>
        </div>
      </div>
      {/* </div> */}
      <input
        className="mb-4 border px-3 py-1 rounded-xl w-full sm:w-1/3"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">
                <input type="checkbox" disabled />
              </th>
              <th className="p-2">Id</th>
              <th className="p-2">Name</th>
              <th className="p-2">Slug</th>
              <th className="p-2">Thumb</th>
              <th className="p-2">Updated At</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((cat) => (
              <tr key={cat._id} className="border-t">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(cat._id)}
                    onChange={() => toggleCheckbox(cat._id)}
                  />
                </td>
                <td className="p-2">{cat._id}</td>
                <td className="p-2">{cat.type}</td>
                <td className="p-2">{cat.slug}</td>
                <td className="p-2 text-center">
  {categoryIcons[cat.slug] || (
    <div className="text-sm text-gray-500">No Icon</div>
  )}
</td>
                <td className="p-2">{cat.updatedAt || "--"}</td>
                <td className="p-2">{cat.status}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleView(cat._id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-xl"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(cat._id)}
                    className="bg-blue-600 text-white px-2 py-1 rounded-xl"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded-xl"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-4">No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
