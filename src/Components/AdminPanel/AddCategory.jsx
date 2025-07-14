import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AddCategory = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [thumb, setThumb] = useState(null);
  const [status, setStatus] = useState("enabled");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("thumb", thumb);
    formData.append("status", status);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/categories",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Category created:", response.data);
      navigate("/adminCategories");
    } catch (error) {
      console.error("Category creation failed", error);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-2">
        <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/admin")}>
          Dashboard
        </span>{" "}
        &gt;{" "}
        <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/admin/categories")}>
          Categories
        </span>{" "}
        &gt; <span>Create</span>
      </div>

      {/* Card */}
      <div className="bg-white shadow rounded-md p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span role="img" aria-label="folder" className="text-gray-600">
            📁
          </span>
          Add Category
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>

          {/* Thumb */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumb (480x270 px)
            </label>
            <input
              type="file"
              accept="image/*"
              className="border rounded px-3 py-2"
              onChange={(e) => setThumb(e.target.files[0])}
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
