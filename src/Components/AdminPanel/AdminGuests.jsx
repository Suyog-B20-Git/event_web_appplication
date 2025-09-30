import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCalendarPlus, FaEdit, FaTrash, FaEye, FaUsers, FaPlus } from "react-icons/fa";
import Modal from "react-modal";
import { toast } from "react-toastify";
import Select from "react-select";

import {
    getGuests,
    getAllGuestsForList,
    createGuest,
    updateGuest,
    deleteGuest,
    getGuestLists,
    createGuestList,
    updateGuestList,
    deleteGuestList
} from "../../redux/actions/master/Guests";

Modal.setAppElement("#root");

const AdminGuests = () => {
    const dispatch = useDispatch();
    const { guests = [], guestLists = [], allGuests = [], loading = false, error = null, pagination = {} } = useSelector((state) => state.guests || {});

    const [activeTab, setActiveTab] = useState("lists"); // "lists" or "guests"
    const [showGuestModal, setShowGuestModal] = useState(false);
    const [showGuestListModal, setShowGuestListModal] = useState(false);
    const [editingGuest, setEditingGuest] = useState(null);
    const [editingGuestList, setEditingGuestList] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Form states
    const [guestForm, setGuestForm] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        guestList: "",
        tags: [],
        notes: "",
    });

    const [guestListForm, setGuestListForm] = useState({
        name: "",
        description: "",
        event: "",
        tags: [],
        notes: "",
        guests: [],
    });

    useEffect(() => {
        loadData();
    }, [activeTab, currentPage, searchTerm]);

    useEffect(() => {
        if (showGuestListModal) {
            dispatch(getAllGuestsForList());
        }
    }, [showGuestListModal, dispatch]);

    const loadData = () => {
        const params = {
            page: currentPage,
            limit: 10,
        };

        if (searchTerm) {
            if (activeTab === "guests") {
                params.name = searchTerm;
                params.email = searchTerm;
            } else {
                params.name = searchTerm;
            }
        }

        if (activeTab === "guests") {
            dispatch(getGuests(params));
        } else {
            dispatch(getGuestLists(params));
        }
    };

    const resetGuestForm = () => {
        setGuestForm({
            name: "",
            email: "",
            phoneNumber: "",
            tags: [],
            notes: "",
        });
        setEditingGuest(null);
    };

    const resetGuestListForm = () => {
        setGuestListForm({
            name: "",
            description: "",
            event: "",
            tags: [],
            notes: "",
            guests: [],
        });
        setEditingGuestList(null);
    };

    const handleCreateGuest = async () => {
        try {
            // Clean the form data before submission
            const cleanedGuestData = { ...guestForm };

            // Remove guestList field if it's empty or falsy
            if (!cleanedGuestData.guestList || cleanedGuestData.guestList === "") {
                delete cleanedGuestData.guestList;
            }

            // Clean tags array - remove empty strings
            if (Array.isArray(cleanedGuestData.tags)) {
                cleanedGuestData.tags = cleanedGuestData.tags.filter(tag => tag.trim() !== "");
            }

            if (editingGuest) {
                await dispatch(updateGuest(editingGuest._id, cleanedGuestData));
            } else {
                await dispatch(createGuest(cleanedGuestData));
            }
            setShowGuestModal(false);
            resetGuestForm();
            loadData();
        } catch (error) {
            console.error("Error saving guest:", error);
        }
    };

    const handleCreateGuestList = async () => {
        try {
            // Clean the form data before submission
            const cleanedGuestListData = {
                ...guestListForm,
                guests: guestListForm.guests.map(g => g.value),
            };

            // Remove event field if it's empty or falsy
            if (!cleanedGuestListData.event || cleanedGuestListData.event === "") {
                delete cleanedGuestListData.event;
            }

            // Clean tags array - remove empty strings
            if (Array.isArray(cleanedGuestListData.tags)) {
                cleanedGuestListData.tags = cleanedGuestListData.tags.filter(tag => tag.trim() !== "");
            }

            if (editingGuestList) {
                await dispatch(updateGuestList(editingGuestList._id, cleanedGuestListData));
            } else {
                await dispatch(createGuestList(cleanedGuestListData));
            }
            setShowGuestListModal(false);
            resetGuestListForm();
            loadData();
        } catch (error) {
            console.error("Error saving guest list:", error);
        }
    };

    const handleEditGuest = (guest) => {
        setEditingGuest(guest);
        const formData = {
            name: guest.name || "",
            email: guest.email || "",
            phoneNumber: guest.phoneNumber || "",
            tags: guest.tags || [],
            notes: guest.notes || "",
        };

        // Only include guestList if it exists
        if (guest.guestList) {
            formData.guestList = guest.guestList;
        }

        setGuestForm(formData);
        setShowGuestModal(true);
    };

    const handleEditGuestList = (guestList) => {
        setEditingGuestList(guestList);
        const formData = {
            name: guestList.name || "",
            description: guestList.description || "",
            tags: guestList.tags || [],
            notes: guestList.notes || "",
            guests: (guestList.guests || []).map(g => ({ value: g._id, label: g.name })),
        };

        // Only include event if it exists
        if (guestList.event) {
            formData.event = guestList.event;
        }

        setGuestListForm(formData);
        setShowGuestListModal(true);
    };

    const handleDeleteGuest = async (id) => {
        if (window.confirm("Are you sure you want to delete this guest?")) {
            try {
                await dispatch(deleteGuest(id));
                loadData();
            } catch (error) {
                console.error("Error deleting guest:", error);
            }
        }
    };

    const handleDeleteGuestList = async (id) => {
        if (window.confirm("Are you sure you want to delete this guest list?")) {
            try {
                await dispatch(deleteGuestList(id));
                loadData();
            } catch (error) {
                console.error("Error deleting guest list:", error);
            }
        }
    };

    const handleTagInput = (e, formType) => {
        const value = e.target.value;
        if (e.key === "Enter" && value.trim()) {
            e.preventDefault();
            if (formType === "guest") {
                setGuestForm({
                    ...guestForm,
                    tags: [...(guestForm.tags || []), value.trim()],
                });
            } else {
                setGuestListForm({
                    ...guestListForm,
                    tags: [...(guestListForm.tags || []), value.trim()],
                });
            }
            e.target.value = "";
        }
    };

    const removeTag = (index, formType) => {
        if (formType === "guest") {
            setGuestForm({
                ...guestForm,
                tags: guestForm.tags.filter((_, i) => i !== index),
            });
        } else {
            setGuestListForm({
                ...guestListForm,
                tags: guestListForm.tags.filter((_, i) => i !== index),
            });
        }
    };

    return (
        <div className="w-full px-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900">Manage Guests</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            resetGuestListForm();
                            setShowGuestListModal(true);
                        }}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition shadow-md"
                    >
                        <FaCalendarPlus className="text-md" />
                        <span className="text-sm font-semibold">Create Guest List</span>
                    </button>
                    <button
                        onClick={() => {
                            resetGuestForm();
                            setShowGuestModal(true);
                        }}
                        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition shadow-md"
                    >
                        <FaPlus className="text-md" />
                        <span className="text-sm font-semibold">Create Guest</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex mb-4 border-b">
                <button
                    onClick={() => setActiveTab("lists")}
                    className={`px-4 py-2 font-semibold ${activeTab === "lists"
                        ? "border-b-2 border-red-500 text-red-500"
                        : "text-gray-600 hover:text-gray-800"
                        }`}
                >
                    Guest Lists
                </button>
                <button
                    onClick={() => setActiveTab("guests")}
                    className={`px-4 py-2 font-semibold ${activeTab === "guests"
                        ? "border-b-2 border-red-500 text-red-500"
                        : "text-gray-600 hover:text-gray-800"
                        }`}
                >
                    Individual Guests
                </button>
            </div>

            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder={`Search ${activeTab === "lists" ? "guest lists" : "guests"}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                    <p className="mt-2 text-gray-600">Loading...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Guest Lists Table */}
            {activeTab === "lists" && !loading && (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="px-4 py-3 font-bold border-r w-1/3">Name</th>
                                <th className="px-4 py-3 font-bold border-r w-1/3">Description</th>
                                <th className="px-4 py-3 font-bold border-r w-1/4">Total Guests</th>
                                <th className="px-4 py-3 font-bold w-1/4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(guestLists) && guestLists.length > 0 ? (
                                guestLists.map((list) => (
                                    <tr key={list._id} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-3 border-r">
                                            <div className="font-semibold">{list.name}</div>
                                            {Array.isArray(list.tags) && list.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {list.tags.slice(0, 2).map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {list.tags.length > 2 && (
                                                        <span className="text-gray-500 text-xs">
                                                            +{list.tags.length - 2} more
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 border-r">
                                            <div className="text-gray-600 truncate max-w-xs">
                                                {list.description || "No description"}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 border-r">
                                            <div className="flex items-center gap-2">
                                                <FaUsers className="text-gray-500" />
                                                <span>{list.guestCount || 0}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditGuestList(list)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteGuestList(list._id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="border-t">
                                    <td colSpan={4} className="px-4 py-6 text-center text-gray-700">
                                        No Guest Lists Found!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Guests Table */}
            {activeTab === "guests" && !loading && (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="px-4 py-3 font-bold border-r w-1/4">Name</th>
                                <th className="px-4 py-3 font-bold border-r w-1/4">Email</th>
                                <th className="px-4 py-3 font-bold border-r w-1/4">Phone</th>
                                <th className="px-4 py-3 font-bold border-r w-1/4">Tags</th>
                                <th className="px-4 py-3 font-bold w-1/4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(guests) && guests.length > 0 ? (
                                guests.map((guest) => (
                                    <tr key={guest._id} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-3 border-r font-semibold">{guest.name}</td>
                                        <td className="px-4 py-3 border-r text-gray-600">{guest.email}</td>
                                        <td className="px-4 py-3 border-r text-gray-600">
                                            {guest.phoneNumber || "N/A"}
                                        </td>
                                        <td className="px-4 py-3 border-r">
                                            {Array.isArray(guest.tags) && guest.tags.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {guest.tags.slice(0, 2).map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {guest.tags.length > 2 && (
                                                        <span className="text-gray-500 text-xs">
                                                            +{guest.tags.length - 2} more
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">No tags</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditGuest(guest)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteGuest(guest._id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="border-t">
                                    <td colSpan={5} className="px-4 py-6 text-center text-gray-700">
                                        No Guests Found!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {((activeTab === "lists" && Array.isArray(guestLists) && guestLists.length > 0) ||
                (activeTab === "guests" && Array.isArray(guests) && guests.length > 0)) &&
                pagination && pagination.totalPages > 1 && (
                    <div className="flex justify-center mt-6">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            {Array.from({ length: pagination?.totalPages || 0 }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 border border-gray-300 rounded ${currentPage === page
                                        ? "bg-red-500 text-white border-red-500"
                                        : "hover:bg-gray-50"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(Math.min(pagination?.totalPages || 1, currentPage + 1))}
                                disabled={currentPage === (pagination?.totalPages || 1)}
                                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

            {/* Guest Modal */}
            <Modal
                isOpen={showGuestModal}
                onRequestClose={() => {
                    setShowGuestModal(false);
                    resetGuestForm();
                }}
                className="modal-content bg-white rounded-lg p-6 w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto"
                overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-60 z-[1000] flex items-center justify-center px-4"
            >
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-4">
                        {editingGuest ? "Edit Guest" : "Create New Guest"}
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name *</label>
                            <input
                                type="text"
                                value={guestForm.name}
                                onChange={(e) => setGuestForm({ ...guestForm, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email *</label>
                            <input
                                type="email"
                                value={guestForm.email}
                                onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <input
                                type="tel"
                                value={guestForm.phoneNumber}
                                onChange={(e) => setGuestForm({ ...guestForm, phoneNumber: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Tags (Press Enter to add)</label>
                            <input
                                type="text"
                                onKeyDown={(e) => handleTagInput(e, "guest")}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Add tags..."
                            />
                            {Array.isArray(guestForm.tags) && guestForm.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {guestForm.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                                        >
                                            {tag}
                                            <button
                                                onClick={() => removeTag(index, "guest")}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Notes</label>
                            <textarea
                                value={guestForm.notes}
                                onChange={(e) => setGuestForm({ ...guestForm, notes: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                        <button
                            onClick={() => {
                                setShowGuestModal(false);
                                resetGuestForm();
                            }}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreateGuest}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                            {editingGuest ? "Update" : "Create"}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Guest List Modal */}
            <Modal
                isOpen={showGuestListModal}
                onRequestClose={() => {
                    setShowGuestListModal(false);
                    resetGuestListForm();
                }}
                className="modal-content bg-white rounded-lg p-6 w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto"
                overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-60 z-[1000] flex items-center justify-center px-4"
            >
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-4">
                        {editingGuestList ? "Edit Guest List" : "Create New Guest List"}
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name *</label>
                            <input
                                type="text"
                                value={guestListForm.name}
                                onChange={(e) => setGuestListForm({ ...guestListForm, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                value={guestListForm.description}
                                onChange={(e) => setGuestListForm({ ...guestListForm, description: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Add Guests</label>
                            <Select
                                isMulti
                                options={(allGuests || []).map(g => ({ value: g._id, label: `${g.name} (${g.email})` }))}
                                value={guestListForm.guests}
                                onChange={(selectedOptions) => {
                                    setGuestListForm({ ...guestListForm, guests: selectedOptions || [] });
                                }}
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Tags (Press Enter to add)</label>
                            <input
                                type="text"
                                onKeyDown={(e) => handleTagInput(e, "list")}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Add tags..."
                            />
                            {Array.isArray(guestListForm.tags) && guestListForm.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {guestListForm.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                                        >
                                            {tag}
                                            <button
                                                onClick={() => removeTag(index, "list")}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Notes</label>
                            <textarea
                                value={guestListForm.notes}
                                onChange={(e) => setGuestListForm({ ...guestListForm, notes: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                        <button
                            onClick={() => {
                                setShowGuestListModal(false);
                                resetGuestListForm();
                            }}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreateGuestList}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                            {editingGuestList ? "Update" : "Create"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminGuests;
