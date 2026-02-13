import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPuzzlePiece, FaPlus, FaSearch, FaEye, FaPencilAlt, FaTrash, FaTag, FaCheckCircle, FaCalendarAlt, FaBars } from 'react-icons/fa';


const DetailItem = ({ icon, label, children }) => (
    <div>
        <p className="text-xs text-gray-500 flex items-center">{icon}<span className="ml-2">{label}</span></p>
        <div className="text-sm font-semibold text-gray-800 break-words mt-1">{children}</div>
    </div>
);


const AdminTags = () => {
    const [tags, setTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalTags, setTotalTags] = useState(0);
    const [loading, setLoading] = useState(false);
    // const [toast, setToast] = useState(null); // Removed custom toast state
    const [showAddForm, setShowAddForm] = useState(false);
    const [addFormData, setAddFormData] = useState({
        name: '',
        description: '',
        type: 'general'
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Edit Mode State
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingTagId, setEditingTagId] = useState(null);

    // View Mode State
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewingTag, setViewingTag] = useState(null);

    // Delete Modal State
    const [deleteModal, setDeleteModal] = useState({
        show: false,
        type: null, // 'single' or 'bulk'
        id: null
    });

    const token = localStorage.getItem("authToken");
    const baseUrl = "http://localhost:5000/api/tag";

    // Custom showToast helper removed, using direct calls or simple wrapper if needed
    // But to keep code minimal change, let's just use toast directly in calls.

    // const showToast = (msg, type = 'success') => {
    //     setToast({ message: msg, type });
    //     setTimeout(() => setToast(null), 3000);
    // };

    const fetchTags = async (pageNum = currentPage) => {
        try {
            setLoading(true);
            const response = await axios.get(baseUrl, {
                headers: { Authorization: token },
                params: {
                    page: pageNum,
                    limit: perPage
                }
            });

            setTags(response.data.tags || []);
            setTotalPages(response.data.totalPages || 1);
            setTotalTags(response.data.totalTags || 0);
        } catch (err) {
            console.error("Failed to fetch tags:", err);
            toast.error("Failed to load tags. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTags(currentPage);
    }, [currentPage]);

    // Handle modal interactions
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && showAddForm) {
                handleCancelForm();
            }
        };

        const handleClickOutside = (event) => {
            if (showAddForm && event.target.classList.contains('modal-backdrop')) {
                handleCancelForm();
            }
        };

        if (showAddForm) {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showAddForm]);

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
    };

    const handleAddNewClick = () => {
        setIsEditMode(false);
        setEditingTagId(null);
        setShowAddForm(true);
        setAddFormData({
            name: '',
            description: '',
            type: 'general'
        });
        setFormErrors({});
    };

    const handleEditClick = (tag) => {
        setIsEditMode(true);
        setEditingTagId(tag._id);
        setAddFormData({
            name: tag.name,
            description: tag.description || '',
            type: tag.type
        });
        setFormErrors({});
        setShowAddForm(true);
    };

    const handleViewClick = (tag) => {
        setViewingTag(tag);
        setShowViewModal(true);
    };

    const handleCloseView = () => {
        setShowViewModal(false);
        setViewingTag(null);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setAddFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!addFormData.name.trim()) {
            errors.name = 'Tag name is required';
        } else if (addFormData.name.length < 2) {
            errors.name = 'Tag name must be at least 2 characters';
        }

        const validTypes = ['event', 'performer', 'venue', 'organizer', 'service', 'general'];
        if (!validTypes.includes(addFormData.type)) {
            errors.type = 'Please select a valid tag type';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            if (isEditMode) {
                // Update existing tag
                const response = await axios.put(`${baseUrl}/${editingTagId}`, addFormData, {
                    headers: { Authorization: token }
                });
                toast.success("Tag updated successfully!");
            } else {
                // Create new tag
                const response = await axios.post(baseUrl, addFormData, {
                    headers: { Authorization: token }
                });
                toast.success("Tag created successfully!");
            }

            setShowAddForm(false);
            // Refresh the tags list
            fetchTags(currentPage);
        } catch (error) {
            console.error("Error saving tag:", error);
            const errorMessage = error.response?.data?.message || "Failed to save tag. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancelForm = () => {
        setShowAddForm(false);
        setIsEditMode(false);
        setEditingTagId(null);
        setAddFormData({
            name: '',
            description: '',
            type: 'general'
        });
        setFormErrors({});
    };

    const filteredTags = useMemo(() => {
        if (!searchTerm) return tags;
        return tags.filter(tag =>
            tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tag.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (tag.description && tag.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, tags]);

    const handleSelectTag = (id) => {
        setSelectedTags(prev =>
            prev.includes(id) ? prev.filter(tagId => tagId !== id) : [...prev, id]
        );
    };

    const handleBulkDelete = () => {
        if (selectedTags.length === 0) {
            toast.error('Please select tags to delete.');
            return;
        }
        setDeleteModal({
            show: true,
            type: 'bulk',
            id: null
        });
    };

    const handleDeleteSingle = (tagId) => {
        setDeleteModal({
            show: true,
            type: 'single',
            id: tagId
        });
    };

    const closeDeleteModal = () => {
        setDeleteModal({
            show: false,
            type: null,
            id: null
        });
    };

    const confirmDelete = async () => {
        try {
            if (deleteModal.type === 'single') {
                await axios.delete(`${baseUrl}/${deleteModal.id}`, {
                    headers: { Authorization: token }
                });
                setTags(prev => prev.filter(tag => tag._id !== deleteModal.id));
                setSelectedTags(prev => prev.filter(id => id !== deleteModal.id));
                toast.success("Tag deleted successfully!");
            } else if (deleteModal.type === 'bulk') {
                // Note: If backend supports bulk delete, use that. 
                // If not, we iterate. Assuming iteration for safety unless backend has bulk endpoint.
                // Ideally, backend should have a bulk delete endpoint. 
                // For now, implementing parallel delete requests as per likely existing backend capability or lack thereof.
                // Checking codebase, no bulk delete route mentioned in previous steps. 

                // However, let's look at `deleteTag` controller. It uses `findByIdAndDelete`.
                // So we must loop.

                await Promise.all(selectedTags.map(id =>
                    axios.delete(`${baseUrl}/${id}`, {
                        headers: { Authorization: token }
                    })
                ));

                setTags(prev => prev.filter(tag => !selectedTags.includes(tag._id)));
                setSelectedTags([]);
                toast.success(`${selectedTags.length} tags deleted successfully!`);
            }
            // Refresh logic if needed, but we updated state optimistically/locally above.
            // fetchTags(currentPage); 
        } catch (error) {
            console.error("Error deleting tag(s):", error);
            toast.error("Failed to delete tag(s). Please try again.");
        } finally {
            closeDeleteModal();
        }
    };

    const StatusBadge = ({ status }) => {
        const styles = { Enabled: 'bg-green-100 text-green-800', Disabled: 'bg-red-100 text-red-800' };
        return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${styles[status]}`}>{status.toUpperCase()}</span>;
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6">
            <header className="mb-6">
                <div className="flex justify-between items-center flex-nowrap md:flex-wrap gap-4">

                    {/* LEFT : ICON + TITLE */}
                    <div className="flex items-center space-x-3">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <FaPuzzlePiece className="text-2xl text-indigo-600" />
                        </div>
                        {/* ⛔ NOT CHANGED */}
                        <h1 className="text-3xl font-bold text-gray-800">
                            Tags
                        </h1>
                    </div>

                    {/* RIGHT : BUTTONS */}
                    <div className="flex items-center space-x-2 shrink-0">
                        <button
                            onClick={handleAddNewClick}
                            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors"
                        >
                            <FaPlus className="mr-2" /> Add New
                        </button>

                        {selectedTags.length > 0 && (
                            <button
                                onClick={handleBulkDelete}
                                className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors"
                            >
                                <FaTrash className="mr-2" /> Bulk Delete ({selectedTags.length})
                            </button>
                        )}

                        <button className="flex items-center bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                            <FaBars className="mr-2" /> Order
                        </button>
                    </div>

                </div>
            </header>


            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="relative w-full md:w-1/2 lg:w-1/3">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search tags..." className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
            </div>

            <div className="space-y-5">
                {loading ? (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                        <h3 className="text-xl font-semibold text-gray-700">Loading Tags...</h3>
                        <p className="text-gray-500 mt-2">Please wait while we fetch the tags.</p>
                    </div>
                ) : filteredTags.length > 0 ? filteredTags.map(tag => (
                    <div key={tag._id} className={`bg-white rounded-lg shadow-sm border transition-all duration-300 hover:shadow-lg ${selectedTags.includes(tag._id) ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}`}>

                        <input type="checkbox" checked={selectedTags.includes(tag._id)} onChange={() => handleSelectTag(tag._id)} className="absolute m-4 h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500 z-10" />

                        <header className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                            <div className="pl-8">
                                <h3 className="font-bold text-lg text-indigo-700">{tag.name}</h3>
                                <p className="text-sm text-gray-500">Tag ID: <span className="font-medium text-gray-600">{tag._id}</span></p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tag.usageCount > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {tag.usageCount > 0 ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </header>

                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                            <DetailItem icon={<FaTag size={14} />} label="Type">
                                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${tag.type === 'event' ? 'bg-purple-100 text-purple-800' :
                                    tag.type === 'performer' ? 'bg-blue-100 text-blue-800' :
                                        tag.type === 'venue' ? 'bg-green-100 text-green-800' :
                                            tag.type === 'organizer' ? 'bg-orange-100 text-orange-800' :
                                                tag.type === 'service' ? 'bg-pink-100 text-pink-800' :
                                                    'bg-gray-100 text-gray-800'
                                    }`}>
                                    {tag.type.charAt(0).toUpperCase() + tag.type.slice(1)}
                                </span>
                            </DetailItem>
                            <DetailItem icon={<FaCheckCircle size={14} />} label="Usage Count">
                                <span className="text-sm font-semibold text-gray-800">{tag.usageCount || 0}</span>
                            </DetailItem>
                            <DetailItem icon={<FaCalendarAlt size={14} />} label="Created">
                                <span>{new Date(tag.createdAt).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}</span>
                            </DetailItem>
                            {tag.description && (
                                <DetailItem icon={<FaEye size={14} />} label="Description">
                                    <span className="text-sm text-gray-700 line-clamp-2">{tag.description}</span>
                                </DetailItem>
                            )}
                        </div>


                        <footer className="p-3 bg-gray-50 rounded-b-lg flex justify-between sm:justify-end items-center gap-2">

                            <button
                                onClick={() => handleViewClick(tag)}
                                className="flex flex-1 sm:flex-none items-center justify-center text-sm font-semibold py-2 px-2 sm:px-4 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors">
                                <FaEye className="mr-1 sm:mr-2" /> View
                            </button>

                            <button
                                onClick={() => handleEditClick(tag)}
                                className="flex flex-1 sm:flex-none items-center justify-center text-sm font-semibold py-2 px-2 sm:px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                                <FaPencilAlt className="mr-1 sm:mr-2" /> Edit
                            </button>

                            <button
                                onClick={() => handleDeleteSingle(tag._id)}
                                className="flex flex-1 sm:flex-none items-center justify-center text-sm font-semibold py-2 px-2 sm:px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                            >
                                <FaTrash className="mr-1 sm:mr-2" /> Delete
                            </button>

                        </footer>


                    </div>
                )) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <FaSearch className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700">No Tags Found</h3>
                        <p className="text-gray-500 mt-2">Your search for "{searchTerm}" did not match any tags.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    {/* Results Info */}
                    <div className="text-sm text-gray-600 font-medium">
                        {totalTags} tags • Page {currentPage} of {totalPages}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-2">
                        {/* Previous Button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentPage === 1
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 shadow-sm"
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Prev
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1">
                            {(() => {
                                const getVisiblePages = () => {
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

                                return getVisiblePages().map((page, index) => {
                                    if (page === '...') {
                                        return (
                                            <span key={`ellipsis-${index}`} className="px-2 py-2 text-gray-400">
                                                ⋯
                                            </span>
                                        );
                                    }

                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${currentPage === page
                                                ? "bg-indigo-600 text-white shadow-lg scale-105"
                                                : "bg-white text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 shadow-sm"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                });
                            })()}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentPage === totalPages
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 shadow-sm"
                                }`}
                        >
                            Next
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Add Tag Modal */}
            {showAddForm && (
                <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-800">{isEditMode ? 'Edit Tag' : 'Add New Tag'}</h2>
                            <button
                                onClick={handleCancelForm}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <form onSubmit={handleSubmitForm} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    {/* Tag Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tag Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={addFormData.name}
                                            onChange={handleFormChange}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.name ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Enter tag name"
                                            autoFocus
                                        />
                                        {formErrors.name && (
                                            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                                        )}
                                    </div>

                                    {/* Tag Type */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tag Type <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="type"
                                            value={addFormData.type}
                                            onChange={handleFormChange}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.type ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        >
                                            <option value="general">General</option>
                                            <option value="event">Event</option>
                                            <option value="performer">Performer</option>
                                            <option value="venue">Venue</option>
                                            <option value="organizer">Organizer</option>
                                            <option value="service">Service</option>
                                        </select>
                                        {formErrors.type && (
                                            <p className="text-red-500 text-sm mt-1">{formErrors.type}</p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={addFormData.description}
                                            onChange={handleFormChange}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                            placeholder="Enter tag description (optional)"
                                        />
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={handleCancelForm}
                                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Tag' : 'Create Tag')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* View Tag Modal */}
            {showViewModal && viewingTag && (
                <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-800">Tag Details</h2>
                            <button
                                onClick={handleCloseView}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                                <p className="text-lg font-semibold text-gray-800">{viewingTag.name}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Type</h3>
                                    <span className={`inline-block mt-1 text-sm font-semibold px-2 py-1 rounded-md ${viewingTag.type === 'event' ? 'bg-purple-100 text-purple-800' :
                                        viewingTag.type === 'performer' ? 'bg-blue-100 text-blue-800' :
                                            viewingTag.type === 'venue' ? 'bg-green-100 text-green-800' :
                                                viewingTag.type === 'organizer' ? 'bg-orange-100 text-orange-800' :
                                                    viewingTag.type === 'service' ? 'bg-pink-100 text-pink-800' :
                                                        'bg-gray-100 text-gray-800'
                                        }`}>
                                        {viewingTag.type.charAt(0).toUpperCase() + viewingTag.type.slice(1)}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                                    <span className={`inline-block mt-1 text-xs font-bold px-2 py-1 rounded-full ${viewingTag.usageCount > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {viewingTag.usageCount > 0 ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                                <p className="text-gray-700 mt-1">{viewingTag.description || 'No description available'}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Usage Count</h3>
                                    <p className="text-gray-800">{viewingTag.usageCount || 0}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                                    <p className="text-gray-800">{new Date(viewingTag.createdAt).toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={handleCloseView}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal.show && (
                <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
                        <div className="p-6">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                                <FaTrash className="text-red-600 text-xl" />
                            </div>
                            <h3 className="text-lg font-bold text-center text-gray-800 mb-2">
                                {deleteModal.type === 'bulk' ? 'Delete Multiple Tags' : 'Delete Tag'}
                            </h3>
                            <p className="text-center text-gray-600 mb-6">
                                {deleteModal.type === 'bulk'
                                    ? `Are you sure you want to delete ${selectedTags.length} selected tags? This action cannot be undone.`
                                    : 'Are you sure you want to delete this tag? This action cannot be undone.'}
                            </p>
                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={closeDeleteModal}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default AdminTags;