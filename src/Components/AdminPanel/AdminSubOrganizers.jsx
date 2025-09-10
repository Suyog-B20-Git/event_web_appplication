import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import Modal from "react-modal";
import { toast } from "react-toastify";

import {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    bulkDeleteUsers
} from "../../redux/actions/master/Events/index";

Modal.setAppElement("#root");

// Helper function to format role display
const formatRoleDisplay = (role) => {
    switch (role) {
        case "POS":
            return "POS";
        case "manager":
            return "Manager";
        case "scanner":
            return "Scanner";
        case "superadmin":
            return "Super Admin";
        default:
            return "POS";
    }
};

const AdminSubOrganizers = () => {
    const dispatch = useDispatch();
    const { users = [], loading = false, error = null, pagination = {} } = useSelector((state) => state.users || {});

    const [showUserModal, setShowUserModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showBulkActions, setShowBulkActions] = useState(false);

    // Form states
    const [userForm, setUserForm] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "POS",
    });

    useEffect(() => {
        loadData();
    }, [currentPage, searchTerm]);

    const loadData = () => {
        const params = {
            page: currentPage,
            limit: 10,
        };

        if (searchTerm) {
            params.search = searchTerm;
        }

        dispatch(getAllUsers(params));
    };

    const resetUserForm = () => {
        setUserForm({
            username: "",
            email: "",
            phoneNumber: "",
            password: "",
            role: "POS",
        });
        setEditingUser(null);
    };

    const handleCreateUser = async () => {
        try {
            const result = await dispatch(createUser(userForm));
            if (result?.success) {
                setShowUserModal(false);
                resetUserForm();
                loadData();
            }
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setUserForm({
            username: user.username || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            password: "", // Don't populate password for security
            role: user.role || "POS",
        });
        setShowUserModal(true);
    };

    const handleUpdateUser = async () => {
        try {
            const updateData = { ...userForm };
            // Remove password if empty
            if (!updateData.password) {
                delete updateData.password;
            }

            const result = await dispatch(updateUser(editingUser._id, updateData));
            if (result?.success) {
                setShowUserModal(false);
                resetUserForm();
                loadData();
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await dispatch(deleteUser(id));
                loadData();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    const handleSelectUser = (userId) => {
        setSelectedUsers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleSelectAll = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map(user => user._id));
        }
    };

    const handleBulkDelete = async () => {
        if (selectedUsers.length === 0) return;
        if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
            try {
                await dispatch(bulkDeleteUsers(selectedUsers));
                setSelectedUsers([]);
                loadData();
            } catch (error) {
                console.error("Error bulk deleting users:", error);
            }
        }
    };

    return (
        <div className="w-full px-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900">Manage Sub Organizers</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            resetUserForm();
                            setShowUserModal(true);
                        }}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition shadow-md"
                    >
                        <FaUserPlus className="text-md" />
                        <span className="text-sm font-semibold">Add Sub Organizer</span>
                    </button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-4 space-y-4">
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Search by username or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {selectedUsers.length > 0 && (
                        <div className="flex gap-2">
                            <button
                                onClick={handleBulkDelete}
                                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                            >
                                <FaTrash className="text-md" />
                                Delete ({selectedUsers.length})
                            </button>
                        </div>
                    )}
                </div>
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

            {/* Users Table */}
            {!loading && (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="px-4 py-3 font-bold border-r w-12">
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.length === users.length && users.length > 0}
                                        onChange={handleSelectAll}
                                        className="rounded"
                                    />
                                </th>
                                <th className="px-4 py-3 font-bold border-r w-1/4">Username</th>
                                <th className="px-4 py-3 font-bold border-r w-1/4">Email</th>
                                <th className="px-4 py-3 font-bold border-r w-1/5">Phone</th>
                                <th className="px-4 py-3 font-bold border-r w-1/6">Role</th>
                                <th className="px-4 py-3 font-bold w-1/2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(users) && users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-3 border-r">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user._id)}
                                                onChange={() => handleSelectUser(user._id)}
                                                className="rounded"
                                            />
                                        </td>
                                        <td className="px-4 py-3 border-r font-semibold">{user.username}</td>
                                        <td className="px-4 py-3 border-r text-gray-600">{user.email}</td>
                                        <td className="px-4 py-3 border-r text-gray-600">
                                            {user.phoneNumber || "N/A"}
                                        </td>
                                        <td className="px-4 py-3 border-r">
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                                {formatRoleDisplay(user.role)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditUser(user)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user._id)}
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
                                    <td colSpan={6} className="px-4 py-6 text-center text-gray-700">
                                        No Sub Organizers Found!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {Array.isArray(users) && users.length > 0 && pagination && pagination.totalPages > 1 && (
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

            {/* User Modal */}
            <Modal
                isOpen={showUserModal}
                onRequestClose={() => {
                    setShowUserModal(false);
                    resetUserForm();
                }}
                className="modal-content bg-white rounded-lg p-6 w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto"
                overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-60 z-[1000] flex items-center justify-center px-4"
            >
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-4">
                        {editingUser ? "Edit Sub Organizer" : "Add New Sub Organizer"}
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Username *</label>
                            <input
                                type="text"
                                value={userForm.username}
                                onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email *</label>
                            <input
                                type="email"
                                value={userForm.email}
                                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                                disabled={!!editingUser} // Disable email editing for existing users
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <input
                                type="tel"
                                value={userForm.phoneNumber}
                                onChange={(e) => setUserForm({ ...userForm, phoneNumber: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>

                        {!editingUser && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Password *</label>
                                <input
                                    type="password"
                                    value={userForm.password}
                                    onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-1">Role *</label>
                            <select
                                value={userForm.role}
                                onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900 appearance-none"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.75rem center',
                                    backgroundSize: '1rem',
                                    paddingRight: '2.5rem'
                                }}
                            >
                                <option value="POS">POS</option>
                                <option value="manager">Manager</option>
                                <option value="scanner">Scanner</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                        <button
                            onClick={() => {
                                setShowUserModal(false);
                                resetUserForm();
                            }}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={editingUser ? handleUpdateUser : handleCreateUser}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                            {editingUser ? "Update" : "Create"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminSubOrganizers;
