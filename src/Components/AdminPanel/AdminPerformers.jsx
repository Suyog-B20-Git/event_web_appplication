import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaUsers, FaPlus, FaTrash, FaSearch, FaEye, FaPencilAlt, FaFilter, FaTimes, FaExclamationTriangle, FaCheckCircle, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { getAllPerformersAdmin } from '../../redux/actions/master/Performers/getPerformersAdmin';
import { enablePerformer, disablePerformer, deletePerformer as deletePerformerAction, bulkEnablePerformers, bulkDisablePerformers, bulkDeletePerformers } from '../../redux/actions/master/Performers/PerformerOps';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText, type = 'warning' }) => {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'danger': return <FaExclamationTriangle className="text-red-500 text-4xl" />;
            case 'success': return <FaCheckCircle className="text-green-500 text-4xl" />;
            default: return <FaExclamationTriangle className="text-yellow-500 text-4xl" />;
        }
    };

    const getButtonStyles = () => {
        switch (type) {
            case 'danger': return { confirm: 'bg-red-500 hover:bg-red-600 text-white', cancel: 'bg-gray-200 hover:bg-gray-300 text-gray-800' };
            case 'success': return { confirm: 'bg-green-500 hover:bg-green-600 text-white', cancel: 'bg-gray-200 hover:bg-gray-300 text-gray-800' };
            default: return { confirm: 'bg-blue-500 hover:bg-blue-600 text-white', cancel: 'bg-gray-200 hover:bg-gray-300 text-gray-800' };
        }
    };

    const buttonStyles = getButtonStyles();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all">
                <div className="p-6">
                    <div className="flex items-center justify-center mb-4">{getIcon()}</div>
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">{title}</h3>
                    <p className="text-gray-600 text-center mb-6">{message}</p>
                    <div className="flex gap-3">
                        <button onClick={onClose} className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${buttonStyles.cancel}`}>
                            {cancelText || 'Cancel'}
                        </button>
                        <button onClick={onConfirm} className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${buttonStyles.confirm}`}>
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

const AdminPerformers = ({ onNavigateToViewPerformer, onNavigateToEditPerformer, onNavigateToAddPerformer }) => {
    const dispatch = useDispatch();
    const [performers, setPerformers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPerformers, setSelectedPerformers] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalPerformers: 0,
        hasNextPage: false,
        hasPrevPage: false,
        limit: 10
    });
    const [filters, setFilters] = useState({ categories: '', city: '', state: '' });
    const [showFilters, setShowFilters] = useState(false);

    const fetchPerformers = async (page = 1, search = '', categoryFilter = '', cityFilter = '', stateFilter = '') => {
        setLoading(true);
        try {
            const params = {
                page,
                limit: pagination.limit,
                name: search || undefined,
                categories: categoryFilter || undefined,
                city: cityFilter || undefined,
                state: stateFilter || undefined
            };

            const result = await dispatch(getAllPerformersAdmin(params));
            setPerformers(result.performers || []);
            setPagination(result.pagination || {});
        } catch (error) {
            console.error('Error fetching performers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPerformers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchPerformers(1, searchTerm, filters.categories, filters.city, filters.state);
        }, 500);
        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, filters]);

    const handleSelect = (id) => {
        setSelectedPerformers((prev) =>
            prev.includes(id) ? prev.filter((performerId) => performerId !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedPerformers.length === performers.length) {
            setSelectedPerformers([]);
        } else {
            setSelectedPerformers(performers.map((performer) => performer._id));
        }
    };

    const [confirmationDialog, setConfirmationDialog] = useState({
        isOpen: false,
        title: '',
        message: '',
        confirmText: '',
        cancelText: '',
        type: 'warning',
        onConfirm: null
    });

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
                setConfirmationDialog((prev) => ({ ...prev, isOpen: false }));
            }
        });
    };

    const closeConfirmation = () => {
        setConfirmationDialog((prev) => ({ ...prev, isOpen: false }));
    };

    // Single operations
    const handleSingleEnable = async (performerId) => {
        const performer = performers.find((o) => o._id === performerId);
        showConfirmation(
            'Enable Performer',
            `Are you sure you want to enable "${performer?.name}"? This will make them active.`,
            'Enable Performer',
            'Cancel',
            'success',
            async () => {
                try {
                    await dispatch(enablePerformer(performerId));
                    fetchPerformers(pagination.currentPage, searchTerm, filters.categories, filters.city, filters.state);
                } catch (e) { }
            }
        );
    };

    const handleSingleDisable = async (performerId) => {
        const performer = performers.find((o) => o._id === performerId);
        showConfirmation(
            'Disable Performer',
            `Are you sure you want to disable "${performer?.name}"? This will make them inactive.`,
            'Disable Performer',
            'Cancel',
            'warning',
            async () => {
                try {
                    await dispatch(disablePerformer(performerId));
                    fetchPerformers(pagination.currentPage, searchTerm, filters.categories, filters.city, filters.state);
                } catch (e) { }
            }
        );
    };

    const handleDeleteSingle = async (performerId) => {
        const performer = performers.find((o) => o._id === performerId);
        showConfirmation(
            'Delete Performer',
            `Are you sure you want to delete "${performer?.name}"? This action cannot be undone.`,
            'Delete Performer',
            'Cancel',
            'danger',
            async () => {
                try {
                    await dispatch(deletePerformerAction(performerId));
                    setSelectedPerformers((prev) => prev.filter((id) => id !== performerId));
                    fetchPerformers(pagination.currentPage, searchTerm, filters.categories, filters.city, filters.state);
                } catch (e) { }
            }
        );
    };

    // Bulk operations
    const handleBulkEnable = async () => {
        if (selectedPerformers.length === 0) return alert('Please select performers to enable.');
        showConfirmation(
            'Enable Performers',
            `Are you sure you want to enable ${selectedPerformers.length} selected performer(s)?`,
            'Enable Performers',
            'Cancel',
            'success',
            async () => {
                try {
                    await dispatch(bulkEnablePerformers(selectedPerformers));
                    setSelectedPerformers([]);
                    fetchPerformers(pagination.currentPage, searchTerm, filters.categories, filters.city, filters.state);
                } catch (e) { }
            }
        );
    };

    const handleBulkDisable = async () => {
        if (selectedPerformers.length === 0) return alert('Please select performers to disable.');
        showConfirmation(
            'Disable Performers',
            `Are you sure you want to disable ${selectedPerformers.length} selected performer(s)?`,
            'Disable Performers',
            'Cancel',
            'warning',
            async () => {
                try {
                    await dispatch(bulkDisablePerformers(selectedPerformers));
                    setSelectedPerformers([]);
                    fetchPerformers(pagination.currentPage, searchTerm, filters.categories, filters.city, filters.state);
                } catch (e) { }
            }
        );
    };

    const handleBulkDelete = async () => {
        if (selectedPerformers.length === 0) return alert('Please select performers to delete.');
        showConfirmation(
            'Delete Performers',
            `Are you sure you want to delete ${selectedPerformers.length} selected performer(s)? This action cannot be undone.`,
            'Delete Performers',
            'Cancel',
            'danger',
            async () => {
                try {
                    await dispatch(bulkDeletePerformers(selectedPerformers));
                    setSelectedPerformers([]);
                    fetchPerformers(pagination.currentPage, searchTerm, filters.categories, filters.city, filters.state);
                } catch (e) { }
            }
        );
    };

    const handlePageChange = (page) => {
        fetchPerformers(page, searchTerm, filters.categories, filters.city, filters.state);
    };

    const StatusBadge = ({ status }) => {
        const styles = { true: 'bg-green-100 text-green-800', false: 'bg-red-100 text-red-800', undefined: 'bg-red-100 text-red-800' };
        const label = status ? 'Enabled' : 'Disabled';
        return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${styles[status]}`}>{label}</span>;
    };

    const formatCategories = (categories) => {
        if (!categories || categories.length === 0) return 'N/A';
        return categories.join(', ');
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
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <FaUsers className="text-2xl text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800">Performers</h1>
                        <span className="text-sm text-gray-500">({pagination.totalPerformers} total)</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={onNavigateToAddPerformer}
                            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors"
                        >
                            <FaPlus className="mr-2" /> Add New
                        </button>
                        {selectedPerformers.length > 0 && (
                            <>
                                <button onClick={handleBulkEnable} className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                                    Enable ({selectedPerformers.length})
                                </button>
                                <button onClick={handleBulkDisable} className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                                    Disable ({selectedPerformers.length})
                                </button>
                                <button onClick={handleBulkDelete} className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                                    <FaTrash className="mr-2" /> Delete ({selectedPerformers.length})
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <div className="mb-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by performer name..."
                            className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <FaFilter className="mr-2" />
                        Filters
                        {(filters.categories || filters.city || filters.state) && (
                            <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                                {(filters.categories ? 1 : 0) + (filters.city ? 1 : 0) + (filters.state ? 1 : 0)}
                            </span>
                        )}
                    </button>
                </div>

                {showFilters && (
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-800">Filters</h3>
                            <button
                                onClick={() => setFilters({ categories: '', city: '', state: '' })}
                                className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes className="mr-1" />
                                Clear All
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
                                <select
                                    value={filters.categories}
                                    onChange={(e) => setFilters((prev) => ({ ...prev, categories: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">All Categories</option>
                                    <option value="dj">DJ</option>
                                    <option value="band">Band</option>
                                    <option value="singer">Singer</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    value={filters.city}
                                    onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value }))}
                                    placeholder="Filter by city..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input
                                    type="text"
                                    value={filters.state}
                                    onChange={(e) => setFilters((prev) => ({ ...prev, state: e.target.value }))}
                                    placeholder="Filter by state..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-5">
                {loading ? (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <h3 className="text-xl font-semibold text-gray-700">Loading Performers...</h3>
                    </div>
                ) : performers.length > 0 ? (
                    <>
                        <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                            <input
                                type="checkbox"
                                checked={selectedPerformers.length === performers.length && performers.length > 0}
                                onChange={handleSelectAll}
                                className="h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                Select All ({selectedPerformers.length} of {performers.length} selected)
                            </span>
                        </div>

                        {performers.map((performer) => (
                            <div key={performer._id} className={`bg-white rounded-lg shadow-sm border transition-all duration-300 hover:shadow-lg ${selectedPerformers.includes(performer._id) ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}`}>
                                <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedPerformers.includes(performer._id)}
                                            onChange={() => handleSelect(performer._id)}
                                            className="h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                        />
                                        <div>
                                            <h3 className="font-bold text-lg text-indigo-700">{performer.name}</h3>
                                            <p className="text-sm text-gray-500">Performer ID: <span className="font-medium text-gray-600">{performer._id}</span></p>
                                        </div>
                                    </div>
                                    <StatusBadge status={performer.isEnabled} />
                                </div>

                                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
                                    <DetailItem icon={<FaMapMarkerAlt size={14} />} label="Location">{performer.city}, {performer.state}</DetailItem>
                                    <DetailItem icon={<FaUsers size={14} />} label="Categories">{formatCategories(performer.categories)}</DetailItem>
                                    <DetailItem icon={<FaCalendarAlt size={14} />} label="Created At">{formatDate(performer.createdAt)}</DetailItem>
                                </div>

                                <footer className="p-3 bg-gray-50 rounded-b-lg flex flex-wrap justify-end items-center gap-2">
                                    {performer.isEnabled ? (
                                        <button onClick={() => handleSingleDisable(performer._id)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition-colors">
                                            Disable
                                        </button>
                                    ) : (
                                        <button onClick={() => handleSingleEnable(performer._id)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors">
                                            Enable
                                        </button>
                                    )}
                                    <button
                                        onClick={() => onNavigateToViewPerformer(performer)}
                                        className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                                    >
                                        <FaEye className="mr-2" />View
                                    </button>
                                    <button
                                        onClick={() => onNavigateToEditPerformer(performer)}
                                        className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-colors"
                                    >
                                        <FaPencilAlt className="mr-2" />Edit
                                    </button>
                                    <button onClick={() => handleDeleteSingle(performer._id)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors">
                                        <FaTrash className="mr-2" />Delete
                                    </button>
                                </footer>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <FaUsers className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700">No Performers Found</h3>
                        <p className="text-gray-500 mt-2">
                            {searchTerm || filters.categories || filters.city || filters.state
                                ? `Your search for "${searchTerm}" with filters did not match any performers.`
                                : 'No performers have been created yet.'
                            }
                        </p>
                    </div>
                )}

                {pagination.totalPages > 1 && (
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="text-sm text-gray-600">
                                Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to {Math.min(pagination.currentPage * pagination.limit, pagination.totalPerformers)} of {pagination.totalPerformers} performers
                            </div>

                            <div className="flex items-center gap-2">
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

                                <div className="flex items-center gap-1">
                                    {(() => {
                                        const getVisiblePages = () => {
                                            const totalPages = pagination.totalPages;
                                            const currentPage = pagination.currentPage;

                                            if (totalPages <= 7) {
                                                return Array.from({ length: totalPages }, (_, i) => i + 1);
                                            }

                                            const pages = [];

                                            if (currentPage > 3) {
                                                pages.push(1);
                                                if (currentPage > 4) pages.push('...');
                                            }

                                            const start = Math.max(1, currentPage - 1);
                                            const end = Math.min(totalPages, currentPage + 1);

                                            for (let i = start; i <= end; i++) {
                                                if (!pages.includes(i)) pages.push(i);
                                            }

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

                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-600">Show:</span>
                                <select
                                    value={pagination.limit}
                                    onChange={(e) => {
                                        const newLimit = parseInt(e.target.value);
                                        setPagination((prev) => ({ ...prev, limit: newLimit }));
                                        fetchPerformers(1, searchTerm, filters.categories, filters.city, filters.state);
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
            </div>
        </div>
    );
};

export default AdminPerformers;


