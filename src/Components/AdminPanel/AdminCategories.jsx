import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { FaFolderOpen, FaCameraRetro, FaCompactDisc } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import {
  GiFireplace,
  GiSwordman,
  GiFoodTruck,
  GiTie,
  GiSpeaker,
} from "react-icons/gi";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import {
  MdEmojiEvents,
  MdSportsGymnastics,
  MdSportsScore,
} from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import {
  MdOutlineTheaterComedy,
  MdOutlineFestival,
  MdNightlife,
  MdBusinessCenter,
} from "react-icons/md";
import { BsPciCardSound } from "react-icons/bs";
import { FaBuildingWheat } from "react-icons/fa6";
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
  const [subcategories, setSubcategories] = useState([]);
  const baseUrl = "http://localhost:5000/api";
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: null,
    bulk: false,
  });

  const navigate = useNavigate();

  const categoryIcons = {
    "business & seminars": (
      <MdBusinessCenter className="text-7xl text-center mx-auto" />
    ),
    "party supplies": <GiFoodTruck className="text-7xl text-center mx-auto" />,
    "wedding planner": <GiFireplace className="text-7xl text-center mx-auto" />,
    "live music": <FaMusic className="text-7xl text-center mx-auto" />,
    "dance studio": (
      <MdSportsGymnastics className="text-7xl text-center mx-auto" />
    ),
    entertainer: <GiSwordman className="text-7xl text-center mx-auto" />,
    anchor: <FaMicrophoneAlt className="text-7xl text-center mx-auto" />,
    "sound artist": <BsPciCardSound className="text-7xl text-center mx-auto" />,
    "stand up comedian": (
      <MdOutlineTheaterComedy className="text-7xl text-center mx-auto" />
    ),
    festivals: <MdOutlineFestival className="text-7xl text-center mx-auto" />,
    "live-music": <FaMusic className="text-7xl text-center mx-auto" />,
    "nightlife & club": (
      <MdNightlife className="text-7xl text-center mx-auto" />
    ),
    professional: <GiTie className="text-7xl text-center mx-auto" />,
    social: <FaMicrophoneAlt className="text-7xl text-center mx-auto" />,
    "sport & leisure": (
      <FaUmbrellaBeach className="text-7xl text-center mx-auto" />
    ),
    "theatre & arts": (
      <FaTheaterMasks className="text-7xl text-center mx-auto" />
    ),
    testing: <GiSpeaker className="text-7xl text-center mx-auto" />,
    indoor: <FaHouseUser className="text-7xl text-center mx-auto" />,
    outdoor: <FaBuildingWheat className="text-7xl text-center mx-auto" />,
    adventure: <MdSportsScore className="text-7xl text-center mx-auto" />,
    "disc jockey": <FaCompactDisc className="text-7xl text-center mx-auto" />,
    promoters: <FaPeopleGroup className="text-7xl text-center mx-auto" />,
    artist: <HiOutlinePaintBrush className="text-7xl text-center mx-auto" />,
    "event planner": <MdEmojiEvents className="text-7xl text-center mx-auto" />,
    "photography & videography": (
      <FaCameraRetro className="text-7xl text-center mx-auto" />
    ),
  };

  const [availableSubcategories, setAvailableSubcategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${baseUrl}/categories/all?includeDeleted=true`, {
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
    const fetchSubcategories = async () => {
      if (!modalData?.type || modalMode === "edit") return;

      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`${baseUrl}/categories/all?type=${modalData.type}&includeDeleted=false`, {
          headers: { Authorization: token },
        });
        const list = res.data.data || [];
        console.log("List", res.data)
        setAvailableSubcategories(list);
        console.log("setAvailableSubcategories", availableSubcategories)
      } catch (err) {
        console.error("Subcategory load error:", err);
      }
    };

    fetchSubcategories();
  }, [modalData?.type, modalMode]);




  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddNew = () => {
    setModalMode("add");
    setModalData({ type: "", name: "", isDeleted: true });
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

  const [openDropdown, setOpenDropdown] = useState(null);
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <div className="flex items-center gap-2">
          <FaFolderOpen className="text-3xl text-gray-700" />
          <h2 className="text-3xl font-semibold text-gray-800">Categories</h2>
        </div>

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
              {/* <th className="p-2">Id</th> */}
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Sub-Category</th>
              <th className="p-3">Thumb</th>
              {/* <th className="p-2">Updated At</th> */}
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
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
                {/* <td className="p-2">{cat._id}</td> */}
                <td className="p-3">{cat.type}</td>
                <td className="p-3">{cat.name}</td>
                <td className="p-3 text-center">
                  {categoryIcons[cat.name?.toLowerCase()] || (
                    <span className="text-gray-400">No Icon</span>
                  )}
                </td>
                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${cat.isDeleted === true ? "bg-gray-500" : "bg-green-500"
                      }`}
                  >
                    {cat.isDeleted === true ? "Inactive" : "Active"}
                  </span>
                </td>

                <td className="p-3 relative">
                  <div className="relative inline-block text-right bg-green-500 text-white px-2 py-1 rounded-xl">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown(
                          cat._id === openDropdown ? null : cat._id
                        );
                      }}
                      className="w-14 h-8 flex items-center justify-center rounded-full h"
                    >
                      <span className="text-md font-bold text-white-600 w-full ">
                        {" "}
                        ⋮More
                      </span>
                    </button>

                    {openDropdown === cat._id && (
                      <div className="absolute right-0 mt-2 w-32 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg z-50">
                        <button
                          onClick={() => handleView(cat._id)}
                          className="block w-full bg-yellow-500 text-white px-2 py-1 mb-1 rounded-xl"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(cat._id)}
                          className="block w-full bg-blue-600 text-white px-2 py-1 mb-1 rounded-xl"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="block w-full bg-red-600 text-white px-2 py-1  mb-1 rounded-xl"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
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
                    <p className="mb-2">
                      <strong>Category:</strong> {modalData?.type || "--"}
                    </p>
                    <p className="mb-2">
                      <strong>Subcategory:</strong> {modalData?.name || "--"}
                    </p>
                    <p className="mb-2">
                      <strong>Status:</strong> {modalData?.isDeleted === false ? "Active" : "Inactive"}
                    </p>
                    <div className="mt-4">
                      <strong>Thumb:</strong>
                      <br />
                      {modalData?.name?.toLowerCase() &&
                        categoryIcons[modalData.name.toLowerCase()] ? (
                        <div className="mt-2 text-center">
                          {categoryIcons[modalData.name.toLowerCase()]}
                        </div>
                      ) : modalData?.icon ? (
                        <img
                          src={modalData.icon}
                          alt="icon"
                          className="h-12 mx-auto mt-2"
                        />
                      ) : (
                        <span className="text-gray-500">No Icon</span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Category Input or Dropdown */}
                    <label className="block mb-1 font-medium">Category:</label>
                    {modalMode === "edit" ? (
                      <input
                        type="text"
                        value={modalData?.type || ""}
                        onChange={(e) =>
                          setModalData({ ...modalData, type: e.target.value })
                        }
                        className="w-full border px-3 py-2 rounded mb-3 text-gray-700"
                      />
                    ) : (
                      <>
                        {!modalData.newType ? (
                          <select
                            value={modalData?.type || ""}
                            onChange={(e) => {
                              if (e.target.value === "__add_new__") {
                                setModalData({ ...modalData, type: "", newType: true });
                              } else {
                                setModalData({ ...modalData, type: e.target.value });
                              }
                            }}
                            className="w-full border px-3 py-2 rounded mb-3"
                          >
                            <option value="">Select Category</option>
                            <option value="Organizer">Organizer</option>
                            <option value="Performer">Performer</option>
                            <option value="Venue">Venue</option>
                            <option value="Service">Service</option>
                            <option value="__add_new__">➕ Add New Category</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            placeholder="Enter new category"
                            className="w-full border px-3 py-2 rounded mb-3"
                            value={modalData.type}
                            onChange={(e) =>
                              setModalData({ ...modalData, type: e.target.value })
                            }
                          />
                        )}
                      </>
                    )}

                    {/* Subcategory */}
                    <label className="block mb-1 font-medium">Subcategory:</label>
                    {modalMode === "edit" ? (
                      <input
                        type="text"
                        value={modalData?.name || ""}
                        onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                        className="w-full border px-3 py-2 rounded mb-3 text-gray-700"
                      />
                    ) : (
                      <>
                        {!modalData.newName ? (
                          <select
                            value={modalData?.name || ""}
                            onChange={(e) => {
                              if (e.target.value === "__add_new__") {
                                setModalData({ ...modalData, name: "", newName: true });
                              } else {
                                setModalData({ ...modalData, name: e.target.value });
                              }
                            }}
                            className="w-full border px-3 py-2 rounded mb-3"
                          >
                            <option value="">Select Subcategory</option>
                            {availableSubcategories.map((subcat) => (
                              <option key={subcat} value={subcat}>{subcat.name}</option>
                            ))}
                            <option value="__add_new__">➕ Add New Subcategory</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            placeholder="Enter new subcategory"
                            className="w-full border px-3 py-2 rounded mb-3"
                            value={modalData.name}
                            onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                          />
                        )}
                      </>
                    )}


                    {/* Status */}
                    <label className="block mb-1 font-medium">Status:</label>
                    <select
                      value={modalData?.isDeleted === false ? "false" : "true"}
                      onChange={(e) =>
                        setModalData({ ...modalData, isDeleted: e.target.value === "true" })
                      }
                      className="w-full border px-3 py-2 rounded mb-3"
                    >
                      <option value="false">Active</option>
                      <option value="true">Inactive</option>
                    </select>

                    {/* Thumbnail Upload */}
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
                            `${baseUrl}/categories/${modalData._id}`,
                            {
                              name: modalData.name,
                              type: modalData.type,
                              icon: modalData.icon,
                              isDeleted: modalData.isDeleted,
                            },
                            {
                              headers: { Authorization: token },
                            }
                          );
                          showToast("Category updated successfully");
                          setShowModal(false);
                          fetchCategories();
                        } else if (modalMode === "add") {
                          await axios.post(
                            `${baseUrl}/categories`,
                            {
                              type: modalData.type,
                              name: modalData.name,
                              isDeleted: modalData.isDeleted,
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
                          `${baseUrl}/categories/bulk-delete`,
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
                          `${baseUrl}/categories/${confirmModal.id}`,
                          {
                            headers: { Authorization: token },
                          }
                        );
                        showToast("Category deleted");
                      }

                      setConfirmModal({ show: false, id: null, bulk: false });
                      fetchCategories();
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
