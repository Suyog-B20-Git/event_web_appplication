import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaPlus, FaTrash, FaSearch, FaEye, FaPencilAlt, FaEnvelope, FaUserTag, FaBriefcase, FaCalendarAlt, FaFilter, FaTimes, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { getAllUsers } from '../../redux/actions/master/Events/GetAllUsers';
import { enableUser, disableUser, deleteUser as deleteUserAction, bulkEnableUsers, bulkDisableUsers, bulkDeleteUsers } from '../../redux/actions/master/Events/UserOps';

// Custom Confirmation Dialog Component
const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText, type = 'warning' }) => {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'danger':
                return <FaExclamationTriangle className="text-red-500 text-4xl" />;
            case 'success':
                return <FaCheckCircle className="text-green-500 text-4xl" />;
            default:
                return <FaExclamationTriangle className="text-yellow-500 text-4xl" />;
        }
    };

    const getButtonStyles = () => {
        switch (type) {
            case 'danger':
                return {
                    confirm: 'bg-red-500 hover:bg-red-600 text-white',
                    cancel: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                };
            case 'success':
                return {
                    confirm: 'bg-green-500 hover:bg-green-600 text-white',
                    cancel: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                };
            default:
                return {
                    confirm: 'bg-blue-500 hover:bg-blue-600 text-white',
                    cancel: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                };
        }
    };

    const buttonStyles = getButtonStyles();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all">
                <div className="p-6">
                    <div className="flex items-center justify-center mb-4">
                        {getIcon()}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                        {title}
                    </h3>
                    <p className="text-gray-600 text-center mb-6">
                        {message}
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${buttonStyles.cancel}`}
                        >
                            {cancelText || 'Cancel'}
                        </button>
                        <button
                            onClick={onConfirm}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${buttonStyles.confirm}`}
                        >
                            {confirmText || 'Confirm'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ icon, label, children }) => (
    <div>
        <p className="text-xs text-gray-500 flex items-center">{icon}<span className="ml-2">{label}</span></p>
        <div className="text-sm font-semibold text-gray-800 break-words mt-1">{children}</div>
    </div>
);

const AdminUsers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalUsers: 0,
        hasNextPage: false,
        hasPrevPage: false,
        limit: 10
    });
    const [filters, setFilters] = useState({
        role: '',
        status: ''
    });
    const [showFilters, setShowFilters] = useState(false);

    // Confirmation dialog state
    const [confirmationDialog, setConfirmationDialog] = useState({
        isOpen: false,
        title: '',
        message: '',
        confirmText: '',
        cancelText: '',
        type: 'warning',
        onConfirm: null
    });

    // Fetch users function
    const fetchUsers = async (page = 1, search = '', roleFilter = '', statusFilter = '') => {
        setLoading(true);
        try {
            const params = {
                page,
                limit: pagination.limit,
                search: search || undefined,
                role: roleFilter || undefined,
                status: statusFilter || undefined
            };

            const result = await dispatch(getAllUsers(params));
            setUsers(result.users || []);
            setPagination(result.pagination || {});
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchUsers(1, searchTerm, filters.role, filters.status);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, filters]);

    const handleSelect = (id) => {
        setSelectedUsers(prev =>
            prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map(user => user._id));
        }
    };

    // Show confirmation dialog
    const showConfirmation = (title, message, confirmText, cancelText, type, onConfirm) => {
        setConfirmationDialog({
            isOpen: true,
            title,
            message,
            confirmText,
            cancelText,
            type,
            onConfirm: () => {
                onConfirm();
                setConfirmationDialog(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    // Close confirmation dialog
    const closeConfirmation = () => {
        setConfirmationDialog(prev => ({ ...prev, isOpen: false }));
    };

    // Single operations
    const handleSingleEnable = async (userId) => {
        const user = users.find(u => u._id === userId);
        showConfirmation(
            'Enable User',
            `Are you sure you want to enable "${user?.username}"? This will allow them to access the system.`,
            'Enable User',
            'Cancel',
            'success',
            async () => {
                try {
                    await dispatch(enableUser(userId));
                    fetchUsers(pagination.currentPage, searchTerm, filters.role, filters.status);
                } catch (e) { }
            }
        );
    };

    const handleSingleDisable = async (userId) => {
        const user = users.find(u => u._id === userId);
        showConfirmation(
            'Disable User',
            `Are you sure you want to disable "${user?.username}"? This will prevent them from accessing the system.`,
            'Disable User',
            'Cancel',
            'warning',
            async () => {
                try {
                    await dispatch(disableUser(userId));
                    fetchUsers(pagination.currentPage, searchTerm, filters.role, filters.status);
                } catch (e) { }
            }
        );
    };

    const handleDeleteSingle = async (userId) => {
        const user = users.find(u => u._id === userId);
        showConfirmation(
            'Delete User',
            `Are you sure you want to delete "${user?.username}"? This action cannot be undone.`,
            'Delete User',
            'Cancel',
            'danger',
            async () => {
                try {
                    await dispatch(deleteUserAction(userId));
                    setSelectedUsers(prev => prev.filter(id => id !== userId));
                    fetchUsers(pagination.currentPage, searchTerm, filters.role, filters.status);
                } catch (e) { }
            }
        );
    };

    // Bulk operations
    const handleBulkEnable = async () => {
        if (selectedUsers.length === 0) return alert('Please select users to enable.');
        showConfirmation(
            'Enable Users',
            `Are you sure you want to enable ${selectedUsers.length} selected user(s)?`,
            'Enable Users',
            'Cancel',
            'success',
            async () => {
                try {
                    await dispatch(bulkEnableUsers(selectedUsers));
                    setSelectedUsers([]);
                    fetchUsers(pagination.currentPage, searchTerm, filters.role, filters.status);
                } catch (e) { }
            }
        );
    };

    const handleBulkDisable = async () => {
        if (selectedUsers.length === 0) return alert('Please select users to disable.');
        showConfirmation(
            'Disable Users',
            `Are you sure you want to disable ${selectedUsers.length} selected user(s)?`,
            'Disable Users',
            'Cancel',
            'warning',
            async () => {
                try {
                    await dispatch(bulkDisableUsers(selectedUsers));
                    setSelectedUsers([]);
                    fetchUsers(pagination.currentPage, searchTerm, filters.role, filters.status);
                } catch (e) { }
            }
        );
    };

    const handleBulkDelete = async () => {
        if (selectedUsers.length === 0) return alert('Please select users to delete.');
        showConfirmation(
            'Delete Users',
            `Are you sure you want to delete ${selectedUsers.length} selected user(s)? This action cannot be undone.`,
            'Delete Users',
            'Cancel',
            'danger',
            async () => {
                try {
                    await dispatch(bulkDeleteUsers(selectedUsers));
                    setSelectedUsers([]);
                    fetchUsers(pagination.currentPage, searchTerm, filters.role, filters.status);
                } catch (e) { }
            }
        );
    };

    const handlePageChange = (page) => {
        fetchUsers(page, searchTerm, filters.role, filters.status);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({ role: '', status: '' });
        setSearchTerm('');
    };

    const StatusBadge = ({ status }) => {
        const styles = {
            true: 'bg-green-100 text-green-800',
            false: 'bg-red-100 text-red-800'
        };
        const label = status ? 'Enabled' : 'Disabled';
        return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${styles[status]}`}>{label}</span>;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
            {/* Confirmation Dialog */}
            <ConfirmationDialog
                isOpen={confirmationDialog.isOpen}
                onClose={closeConfirmation}
                onConfirm={confirmationDialog.onConfirm}
                title={confirmationDialog.title}
                message={confirmationDialog.message}
                confirmText={confirmationDialog.confirmText}
                cancelText={confirmationDialog.cancelText}
                type={confirmationDialog.type}
            />

            <header className="mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-lg"><FaUsers className="text-2xl text-green-600" /></div>
                        <h1 className="text-3xl font-bold text-gray-800">Users</h1>
                        <span className="text-sm text-gray-500">({pagination.totalUsers} total)</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => navigate('/admin/add-user')}
                            className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors"
                        >
                            <FaPlus className="mr-2" /> Add New
                        </button>
                        {selectedUsers.length > 0 && (
                            <>
                                <button onClick={handleBulkEnable} className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                                    Enable ({selectedUsers.length})
                                </button>
                                <button onClick={handleBulkDisable} className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                                    Disable ({selectedUsers.length})
                                </button>
                                <button onClick={handleBulkDelete} className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                                    <FaTrash className="mr-2" /> Delete ({selectedUsers.length})
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Search by name or email..."
                            className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <FaFilter className="mr-2" />
                        Filters
                        {(filters.role || filters.status) && (
                            <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                                {(filters.role ? 1 : 0) + (filters.status ? 1 : 0)}
                            </span>
                        )}
                    </button>
                </div>

                {showFilters && (
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-800">Filters</h3>
                            <button
                                onClick={clearFilters}
                                className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes className="mr-1" />
                                Clear All
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    value={filters.role}
                                    onChange={e => handleFilterChange('role', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">All Roles</option>
                                    <option value="user">User</option>
                                    <option value="organizer">Organizer</option>
                                    <option value="superadmin">Super Admin</option>
                                    <option value="scanner">Scanner</option>
                                    <option value="manager">Manager</option>
                                    <option value="POS">POS</option>
                                    <option value="performer">Performer</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    value={filters.status}
                                    onChange={e => handleFilterChange('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">All Status</option>
                                    <option value="enabled">Enabled</option>
                                    <option value="disabled">Disabled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Users List */}
            <div className="space-y-5">
                {loading ? (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <h3 className="text-xl font-semibold text-gray-700">Loading Users...</h3>
                    </div>
                ) : users.length > 0 ? (
                    <>
                        {/* Select All Checkbox */}
                        <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                            <input
                                type="checkbox"
                                checked={selectedUsers.length === users.length && users.length > 0}
                                onChange={handleSelectAll}
                                className="h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                Select All ({selectedUsers.length} of {users.length} selected)
                            </span>
                        </div>

                        {users.map(user => (
                            <div key={user._id} className={`bg-white rounded-lg shadow-sm border transition-all duration-300 hover:shadow-lg ${selectedUsers.includes(user._id) ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}`}>
                                <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user._id)}
                                            onChange={() => handleSelect(user._id)}
                                            className="h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                        />
                                        <div>
                                            <h3 className="font-bold text-lg text-indigo-700">{user.username}</h3>
                                            <p className="text-sm text-gray-500">User ID: <span className="font-medium text-gray-600">{user._id}</span></p>
                                        </div>
                                    </div>
                                    <StatusBadge status={user.isEnabled} />
                                </div>

                                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
                                    <DetailItem icon={<FaEnvelope size={14} />} label="Email">{user.email}</DetailItem>
                                    <DetailItem icon={<FaUserTag size={14} />} label="Role">{user.role}</DetailItem>
                                    <DetailItem icon={<FaBriefcase size={14} />} label="Phone">{user.phoneNumber || 'N/A'}</DetailItem>
                                    <DetailItem icon={<FaCalendarAlt size={14} />} label="Created At">{formatDate(user.createdAt)}</DetailItem>
                                </div>

                                <footer className="p-3 bg-gray-50 rounded-b-lg flex flex-wrap justify-end items-center gap-2">
                                    {user.isEnabled ? (
                                        <button onClick={() => handleSingleDisable(user._id)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition-colors">
                                            Disable
                                        </button>
                                    ) : (
                                        <button onClick={() => handleSingleEnable(user._id)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                                            Enable
                                        </button>
                                    )}
                                    <button
                                        onClick={() => navigate(`/admin/view-user/${user._id}`)}
                                        className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
                                    >
                                        <FaEye className="mr-2" />View
                                    </button>
                                    <button
                                        onClick={() => navigate(`/admin/edit-user/${user._id}`)}
                                        className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                                    >
                                        <FaPencilAlt className="mr-2" />Edit
                                    </button>
                                    <button onClick={() => handleDeleteSingle(user._id)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors">
                                        <FaTrash className="mr-2" />Delete
                                    </button>
                                </footer>
                            </div>
                        ))}

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                    {/* Results Info */}
                                    <div className="text-sm text-gray-600">
                                        Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to {Math.min(pagination.currentPage * pagination.limit, pagination.totalUsers)} of {pagination.totalUsers} users
                                    </div>

                                    {/* Pagination Controls */}
                                    <div className="flex items-center gap-2">
                                        {/* First Page */}
                                        <button
                                            onClick={() => handlePageChange(1)}
                                            disabled={pagination.currentPage === 1}
                                            className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                            title="First Page"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                            </svg>
                                        </button>

                                        {/* Previous Page */}
                                        <button
                                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                                            disabled={!pagination.hasPrevPage}
                                            className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                            title="Previous Page"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>

                                        {/* Page Numbers */}
                                        <div className="flex items-center gap-1">
                                            {(() => {
                                                const getVisiblePages = () => {
                                                    const totalPages = pagination.totalPages;
                                                    const currentPage = pagination.currentPage;

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

                                                return getVisiblePages().map((pageNum, index) => {
                                                    if (pageNum === '...') {
                                                        return (
                                                            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                                                                ⋯
                                                            </span>
                                                        );
                                                    }

                                                    return (
                                                        <button
                                                            key={pageNum}
                                                            onClick={() => handlePageChange(pageNum)}
                                                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${pagination.currentPage === pageNum
                                                                ? "bg-blue-600 text-white shadow-lg scale-105"
                                                                : "bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600 border border-gray-300"
                                                                }`}
                                                        >
                                                            {pageNum}
                                                        </button>
                                                    );
                                                });
                                            })()}
                                        </div>

                                        {/* Next Page */}
                                        <button
                                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                                            disabled={!pagination.hasNextPage}
                                            className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                            title="Next Page"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>

                                        {/* Last Page */}
                                        <button
                                            onClick={() => handlePageChange(pagination.totalPages)}
                                            disabled={pagination.currentPage === pagination.totalPages}
                                            className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                            title="Last Page"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M6 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Page Size Selector */}
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-600">Show:</span>
                                        <select
                                            value={pagination.limit}
                                            onChange={(e) => {
                                                const newLimit = parseInt(e.target.value);
                                                setPagination(prev => ({ ...prev, limit: newLimit }));
                                                fetchUsers(1, searchTerm, filters.role, filters.status);
                                            }}
                                            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value={5}>5</option>
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select>
                                        <span className="text-gray-600">per page</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <FaUsers className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700">No Users Found</h3>
                        <p className="text-gray-500 mt-2">
                            {searchTerm || filters.role || filters.status
                                ? `Your search for "${searchTerm}" with filters did not match any users.`
                                : 'No users have been created yet.'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;
