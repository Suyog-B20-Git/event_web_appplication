import { useState, useEffect } from "react";
import { axiosInstance } from "../../../utility/utils";

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
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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
      setLoading(true);
      const response = await axiosInstance.get(`/categories/all?includeInactive=true`);

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
      showToast(error.response?.data?.message || "Failed to fetch categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!modalData?.type || modalMode === "edit") return;

      try {
        const res = await axiosInstance.get(`/categories/all?type=${modalData.type}&includeInactive=false`);
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
    setModalData({ type: "", name: "", isActive: false });
    setShowModal(true);
  };

  const handleDeactivate = async (id) => {
    setConfirmModal({
      show: true,
      id,
      bulk: false,
      action: 'deactivate',
      message: "Are you sure you want to deactivate this category?",
    });
  };

  const handleBulkDeactivate = () => {
    if (selectedIds.length === 0) {
      showToast(" Please select at least one category.");
      return;
    }

    setConfirmModal({
      show: true,
      bulk: true,
      action: 'deactivate',
      id: null,
      message: "Are you sure you want to deactivate selected categories?",
    });
  };

  const handleActivate = async (id) => {
    setConfirmModal({
      show: true,
      id,
      bulk: false,
      action: 'activate',
      message: "Are you sure you want to activate this category?",
    });
  };

  const handleBulkActivate = () => {
    if (selectedIds.length === 0) {
      showToast(" Please select at least one category.");
      return;
    }

    setConfirmModal({
      show: true,
      bulk: true,
      action: 'activate',
      id: null,
      message: "Are you sure you want to activate selected categories?",
    });
  };

  const handlePermanentDelete = async (id) => {
    setConfirmModal({
      show: true,
      id,
      bulk: false,
      action: 'permanent-delete',
      message: "Are you sure you want to PERMANENTLY DELETE this category? This action cannot be undone!",
    });
  };

  const handleBulkPermanentDelete = () => {
    if (selectedIds.length === 0) {
      showToast(" Please select at least one category.");
      return;
    }

    setConfirmModal({
      show: true,
      bulk: true,
      action: 'permanent-delete',
      id: null,
      message: "Are you sure you want to PERMANENTLY DELETE selected categories? This action cannot be undone!",
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
    <div className="pt-2 px-3 pb-3 sm:pt-3 sm:px-4 sm:pb-4 max-w-full overflow-x-hidden min-w-0">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-3 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <FaFolderOpen className="text-2xl sm:text-3xl text-gray-700 flex-shrink-0" />
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 truncate">Categories</h2>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 w-full lg:w-auto justify-start lg:justify-end min-w-0">
          <button
            onClick={handleAddNew}
            className="bg-green-500 text-white text-xs sm:text-base lg:text-lg font-semibold px-3 py-2 sm:px-4 rounded-xl"
          >
            Add New
          </button>
          <button
            onClick={handleBulkDeactivate}
            className="bg-red-500 text-white text-xs sm:text-base lg:text-lg font-semibold px-3 py-2 sm:px-4 rounded-xl"
          >
            Bulk Deactivate
          </button>
          <button
            onClick={handleBulkActivate}
            className="bg-green-500 text-white text-xs sm:text-base lg:text-lg font-semibold px-3 py-2 sm:px-4 rounded-xl"
          >
            Bulk Activate
          </button>
          <button
            onClick={handleBulkPermanentDelete}
            className="bg-red-700 text-white text-xs sm:text-base lg:text-lg font-semibold px-3 py-2 sm:px-4 rounded-xl col-span-2 sm:col-span-1"
          >
            Bulk Permanent Delete
          </button>
        </div>
      </div>
      {/* </div> */}
      <input
        className="mb-4 border px-4 py-3 rounded-xl w-full max-w-full sm:w-1/2 lg:w-1/3 text-sm sm:text-base min-w-0"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table wrapper: only the table should scroll horizontally on small screens */}
      <div className="w-full overflow-x-auto overflow-y-visible scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pb-2 min-w-0">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        ) : (
          <>
            <table className="min-w-[600px] w-full border text-xs sm:text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 sm:p-3">
                    <input type="checkbox" disabled />
                  </th>
                  {/* <th className="p-2">Id</th> */}
                  <th className="p-2 sm:p-3 text-left text-xs sm:text-sm font-semibold">Category</th>
                  <th className="p-2 sm:p-3 text-left text-xs sm:text-sm font-semibold">Sub-Category</th>
                  <th className="p-2 sm:p-3 text-xs sm:text-sm font-semibold">Thumb</th>
                  {/* <th className="p-2">Updated At</th> */}
                  <th className="p-2 sm:p-3 text-xs sm:text-sm font-semibold">Status</th>
                  <th className="p-2 sm:p-3 text-xs sm:text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((cat) => (
                  <tr key={cat._id} className="border-t">
                    <td className="p-2 sm:p-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(cat._id)}
                        onChange={() => toggleCheckbox(cat._id)}
                      />
                    </td>
                    {/* <td className="p-2">{cat._id}</td> */}
                    <td className="p-2 sm:p-3 text-xs sm:text-sm">{cat.type}</td>
                    <td className="p-2 sm:p-3 text-xs sm:text-sm">{cat.name}</td>
                    <td className="p-2 sm:p-3 text-center">
                      {categoryIcons[cat.name?.toLowerCase()] || (
                        <span className="text-gray-400">No Icon</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs ${cat.isActive === true ? "bg-green-500" : "bg-gray-500"
                          }`}
                      >
                        {cat.isActive === true ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="p-2 sm:p-3 relative">
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
                            {cat.isActive ? (
                              <button
                                onClick={() => handleDeactivate(cat._id)}
                                className="block w-full bg-red-600 text-white px-2 py-1 mb-1 rounded-xl"
                              >
                                Deactivate
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleActivate(cat._id)}
                                  className="block w-full bg-green-600 text-white px-2 py-1 mb-1 rounded-xl"
                                >
                                  Activate
                                </button>
                                <button
                                  onClick={() => handlePermanentDelete(cat._id)}
                                  className="block w-full bg-red-800 text-white px-2 py-1 mb-1 rounded-xl"
                                >
                                  Permanent Delete
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && !loading && (
              <p className="text-center text-gray-500 py-4">No categories found.</p>
            )}
          </>
        )}

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
                      <strong>Status:</strong> {modalData?.isActive === true ? "Active" : "Inactive"}
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
                      value={modalData?.isActive === true ? "true" : "false"}
                      onChange={(e) =>
                        setModalData({ ...modalData, isActive: e.target.value === "true" })
                      }
                      className="w-full border px-3 py-2 rounded mb-3"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
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
                        setSubmitting(true);
                        if (modalMode === "edit") {
                          await axiosInstance.put(
                            `/categories/${modalData._id}`,
                            {
                              name: modalData.name,
                              type: modalData.type,
                              icon: modalData.icon,
                              isActive: modalData.isActive,
                            }
                          );
                          showToast("Category updated successfully");
                          setShowModal(false);
                          fetchCategories();
                        } else if (modalMode === "add") {
                          await axiosInstance.post(
                            `/categories`,
                            {
                              type: modalData.type,
                              name: modalData.name,
                              isActive: modalData.isActive,
                              icon: modalData.icon,
                            }
                          );
                          showToast("Category added successfully");
                          setShowModal(false);
                          fetchCategories();
                        }
                      } catch (err) {
                        console.error("Category save error:", err);
                        showToast(err.response?.data?.message || "Failed to save category");
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                    disabled={submitting}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Saving..." : "Save"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {confirmModal.show && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-80">
              <h2 className={`text-lg font-semibold mb-4 ${confirmModal.action === 'deactivate' ? 'text-red-600' :
                confirmModal.action === 'permanent-delete' ? 'text-red-800' : 'text-green-600'
                }`}>
                Confirm {
                  confirmModal.action === 'deactivate' ? 'Deactivation' :
                    confirmModal.action === 'permanent-delete' ? 'Permanent Deletion' : 'Activation'
                }
              </h2>
              <p className="text-gray-700 mb-6">
                {confirmModal.message}
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
                      setSubmitting(true);
                      if (confirmModal.bulk) {
                        if (confirmModal.action === 'deactivate') {
                          await axiosInstance.post(
                            `/categories/bulk-deactivate`,
                            {
                              categoryIds: selectedIds,
                            }
                          );
                          setSelectedIds([]);
                          showToast("Selected categories deactivated successfully");
                        } else if (confirmModal.action === 'permanent-delete') {
                          await axiosInstance.post(
                            `/categories/bulk-permanent-delete`,
                            {
                              categoryIds: selectedIds,
                            }
                          );
                          setSelectedIds([]);
                          showToast("Selected categories permanently deleted successfully");
                        } else {
                          await axiosInstance.post(
                            `/categories/bulk-activate`,
                            {
                              categoryIds: selectedIds,
                            }
                          );
                          setSelectedIds([]);
                          showToast("Selected categories activated successfully");
                        }
                      } else {
                        if (confirmModal.action === 'deactivate') {
                          await axiosInstance.patch(
                            `/categories/${confirmModal.id}/deactivate`
                          );
                          showToast("Category deactivated successfully");
                        } else if (confirmModal.action === 'permanent-delete') {
                          await axiosInstance.delete(
                            `/categories/${confirmModal.id}/permanent`
                          );
                          showToast("Category permanently deleted successfully");
                        } else {
                          await axiosInstance.patch(
                            `/categories/${confirmModal.id}/activate`
                          );
                          showToast("Category activated successfully");
                        }
                      }

                      setConfirmModal({ show: false, id: null, bulk: false });
                      fetchCategories();
                    } catch (err) {
                      console.error("Operation failed", err);
                      showToast(err.response?.data?.message || `Failed to ${confirmModal.action} category`);
                      setConfirmModal({ show: false });
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  disabled={submitting}
                  className={`px-4 py-2 text-white rounded disabled:cursor-not-allowed ${confirmModal.action === 'deactivate'
                    ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-400'
                    : confirmModal.action === 'permanent-delete'
                      ? 'bg-red-800 hover:bg-red-900 disabled:bg-red-600'
                      : 'bg-green-600 hover:bg-green-700 disabled:bg-green-400'
                    }`}
                >
                  {submitting ?
                    `${confirmModal.action === 'deactivate' ? 'Deactivating' :
                      confirmModal.action === 'permanent-delete' ? 'Deleting' : 'Activating'}...` :
                    confirmModal.action === 'deactivate' ? 'Deactivate' :
                      confirmModal.action === 'permanent-delete' ? 'Permanent Delete' : 'Activate'
                  }
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

      </div>
    </div>
  );
};

export default AdminCategories;
