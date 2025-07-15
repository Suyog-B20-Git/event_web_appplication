import { useState, useEffect } from "react";
import axios from "axios";
// import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaFolderOpen , FaCameraRetro} from "react-icons/fa";

import { BiParty } from "react-icons/bi";
import { GiFireplace } from "react-icons/gi";
import { MdOutlineTheaterComedy ,  MdOutlineFestival , MdNightlife, MdBusinessCenter } from "react-icons/md";
import { BsPciCardSound } from "react-icons/bs";
import { GiPartyPopper, GiTie, GiSpeaker, GiHanger,  GiFoodTruck ,GiLovers } from "react-icons/gi";
import {
  FaMusic,
  FaTheaterMasks,
  FaUtensils,
  FaBusinessTime,
  FaUmbrellaBeach,
  FaSuitcase,
  FaBeer,
  FaMicrophoneAlt,
} from "react-icons/fa";


const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [modalData, setModalData] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: null,
    bulk: false,
  });

  const navigate = useNavigate();

  const categoryIcons = {
    "business-and-seminars": 
      <MdBusinessCenter className="text-7xl text-center mx-auto" />,
     "party-supplies": <BiParty className="text-7xl text-center mx-auto" />,
    "wedding planner": <GiFireplace className="text-7xl text-center mx-auto" />,
    "live-music": <FaMusic className="text-7xl text-center mx-auto" />,
    "party-supplies": <GiFoodTruck className="text-7xl text-center mx-auto" />,
    "live-music": <FaMusic className="text-7xl text-center mx-auto" />,
    "anchor": <FaMicrophoneAlt className="text-7xl text-center mx-auto" />,
    "sound-artist": <BsPciCardSound className="text-7xl text-center mx-auto" />,
    "stand-up-comedian": 
    <MdOutlineTheaterComedy className="text-7xl text-center mx-auto" />,
        "festivals": <MdOutlineFestival className="text-7xl text-center mx-auto" />,
    "live-music": <FaMusic className="text-7xl text-center mx-auto" />,
    "nightlife-and-clubs": 
      <MdNightlife className="text-7xl text-center mx-auto" />,
        "professional": <GiTie className="text-7xl text-center mx-auto" />,
    "social": <FaMicrophoneAlt className="text-7xl text-center mx-auto" />,
    "sport-and-leisure": 
      <FaUmbrellaBeach className="text-7xl text-center mx-auto" />,
      "theatre-and-arts": 
      <FaTheaterMasks className="text-7xl text-center mx-auto" />,
      " testing": <GiSpeaker className="text-7xl text-center mx-auto" />,
    "disc-jockey": <GiSpeaker className="text-7xl text-center mx-auto" />,
    "photography & videography": <FaCameraRetro className="text-7xl text-center mx-auto" />,
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
    setModalMode("add");
    setModalData({ type: "", slug: "", status: "enabled" });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    setConfirmModal({
      show: true,
      id,
      bulk: false,
      message: "Are you sure you want to delete this category?",
    });
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) {
      showToast(" Please select at least one category.");
      return;
    }

    setConfirmModal({
      show: true,
      bulk: true,
      id: null,
      message: "Are you sure you want to delete selected categories?",
    });
  };

  const handleEdit = (id) => {
    const selected = categories.find((c) => c._id === id);
    if (!selected) return;
    setModalMode("edit");
    setModalData(selected);
    setShowModal(true);
  };

  const handleView = (id) => {
    const selected = categories.find((c) => c._id === id);
    if (!selected) return;
    setModalMode("view");
    setModalData(selected);
    setShowModal(true);
  };

  // const handleOrder = () => {
  //   navigate("/admin/categories/order");
  // };

  const toggleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const filtered = categories.filter((cat) =>
    cat.type.toLowerCase().includes(search.toLowerCase())
  );

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

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
          {/* <button
            onClick={handleOrder}
            className="bg-blue-500 text-white text-lg font-semibold px-4 py-2 rounded-xl"
          >
            Order
          </button> */}
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
              <th className="p-2">Category</th>
              <th className="p-2">Sub-Category</th>
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
                <td className="p-2">{cat.name}</td>
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

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-2xl relative">
              <h3 className="text-2xl font-bold mb-4 text-center text-blue-700 capitalize">
                {modalMode} Category
              </h3>

              <>
                {modalMode === "view" ? (
                  <>
                    {/* You can keep your VIEW layout here if needed */}
                    <p>View Mode</p>
                  </>
                ) : modalMode === "add" ? (
                  <>
                    <label className="block mb-1 font-medium">Category:</label>
                    <input
                      type="text"
                      value={modalData?.type || ""}
                      onChange={(e) =>
                        setModalData({ ...modalData, type: e.target.value })
                      }
                      className="w-full border px-3 py-2 rounded mb-3"
                    />

                    <label className="block mb-1 font-medium">
                      Subcategory:
                    </label>
                    <input
                      type="text"
                      value={modalData?.name || ""}
                      onChange={(e) =>
                        setModalData({ ...modalData, name: e.target.value })
                      }
                      className="w-full border px-3 py-2 rounded mb-3"
                    />

                    <label className="block mb-1 font-medium">Status:</label>
                    <select
                      value={modalData?.status || "enabled"}
                      onChange={(e) =>
                        setModalData({ ...modalData, status: e.target.value })
                      }
                      className="w-full border px-3 py-2 rounded mb-3"
                    >
                      <option value="enabled">Enabled</option>
                      <option value="disabled">Disabled</option>
                    </select>

                    <label className="block mb-1 font-medium">Icon:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setModalData({
                              ...modalData,
                              icon: reader.result,
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full border px-3 py-2 rounded mb-4"
                    />
                  </>
                ) : (
                  <>
                    <label className="block mb-1 font-medium">Category:</label>
                    <input
                      type="text"
                      value={modalData?.type || ""}
                      readOnly
                      className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-600 mb-3"
                    />

                    <label className="block mb-1 font-medium">
                      Subcategory:
                    </label>
                    <input
                      type="text"
                      value={modalData?.slug || ""}
                      onChange={(e) =>
                        setModalData({ ...modalData, slug: e.target.value })
                      }
                      className="w-full border px-3 py-2 rounded mb-3"
                    />

                    <label className="block mb-1 font-medium">Status:</label>
                    <select
                      value={modalData?.status || "enabled"}
                      onChange={(e) =>
                        setModalData({ ...modalData, status: e.target.value })
                      }
                      className="w-full border px-3 py-2 rounded mb-3"
                    >
                      <option value="enabled">Enabled</option>
                      <option value="disabled">Disabled</option>
                    </select>

                    <label className="block mb-1 font-medium">Thumbnail:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setModalData({
                              ...modalData,
                              thumb: reader.result,
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full border px-3 py-2 rounded mb-4"
                    />
                  </>
                )}
              </>
              <div className="flex justify-end gap-2 mt-5">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                {(modalMode === "edit" || modalMode === "add") && (
                  <button
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem("authToken");

                        if (modalMode === "edit") {
                          await axios.put(
                            `http://localhost:5000/api/categories/${modalData._id}`,
                            {
                              name: modalData.name,
                              status: modalData.status,
                              icon: modalData.icon,
                            },
                            {
                              headers: { Authorization: token },
                            }
                          );
                          showToast("Category updated successfully");
                        } else if (modalMode === "add") {
                          await axios.post(
                            `http://localhost:5000/api/categories`,
                            {
                              type: modalData.type,
                              name: modalData.name,
                              status: modalData.status,
                              icon: modalData.icon,
                            },
                            {
                              headers: { Authorization: token },
                            }
                          );
                          showToast("Category added successfully");
                        }
                        setShowModal(false);
                        fetchCategories();
                      } catch (err) {
                        console.error("Save failed", err);
                        showToast("Failed to save category");
                      }
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {confirmModal.show && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-80">
              <h2 className="text-lg font-semibold text-red-600 mb-4">
                Confirm Deletion
              </h2>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete{" "}
                {confirmModal.bulk ? "selected categories" : "this category"}?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmModal({ show: false })}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem("authToken");

                      if (confirmModal.bulk) {
                        await axios.post(
                          "http://localhost:5000/api/categories/bulk-delete",
                          {
                            categoryIds: selectedIds,
                          },
                          {
                            headers: { Authorization: token },
                          }
                        );
                        setSelectedIds([]);
                        showToast(" Selected categories deleted");
                      } else {
                        await axios.delete(
                          `http://localhost:5000/api/categories/${confirmModal.id}`,
                          {
                            headers: { Authorization: token },
                          }
                        );
                        showToast("Category deleted");
                      }

                      setConfirmModal({ show: false, id: null, bulk: false });
                      fetchCategories(); // 🔁 RELOAD list after deletion
                    } catch (err) {
                      console.error("Deletion failed", err);
                      showToast(" Failed to delete");
                      setConfirmModal({ show: false });
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {toast && (
          <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce z-50">
            <span className="font-medium">{toast}</span>
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-4">No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
