import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaClipboardList, FaEye, FaClock, FaCheckCircle, FaTimesCircle, FaCheck, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import { toast } from "react-toastify";

import { getMyClaims, getAllClaims, updateClaimStatus } from "../../redux/actions/master/Claims";

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

// Helper function to format status display
const formatStatusDisplay = (status) => {
    switch (status) {
        case "pending":
            return { text: "Pending", color: "bg-yellow-100 text-yellow-800", icon: <FaClock /> };
        case "approved":
            return { text: "Approved", color: "bg-green-100 text-green-800", icon: <FaCheckCircle /> };
        case "rejected":
            return { text: "Rejected", color: "bg-red-100 text-red-800", icon: <FaTimesCircle /> };
        default:
            return { text: "Pending", color: "bg-yellow-100 text-yellow-800", icon: <FaClock /> };
    }
};

const AdminClaims = () => {
    const dispatch = useDispatch();
    const { claims = [], loading = false, error = null, pagination = {} } = useSelector((state) => state.claims || {});

    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("");
    const [modelFilter, setModelFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showClaimModal, setShowClaimModal] = useState(false);
    const [selectedClaim, setSelectedClaim] = useState(null);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [actionType, setActionType] = useState(""); // "approve" or "reject"
    const [actionClaim, setActionClaim] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");

    useEffect(() => {
        loadData();
    }, [currentPage, statusFilter, modelFilter, searchTerm, isSuperAdmin]);

    const loadData = () => {
        const params = {
            page: currentPage,
            limit: 10,
        };

        if (statusFilter) {
            params.status = statusFilter;
        }

        if (modelFilter) {
            params.modelName = modelFilter;
        }

        if (searchTerm) {
            params.search = searchTerm;
        }

        // Check user role from token in real-time
        let isUserSuperAdmin = false;
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                isUserSuperAdmin = payload.role === 'superadmin';
                setIsSuperAdmin(isUserSuperAdmin); // Update state for UI rendering
            } catch (error) {
                console.error('Error decoding token:', error);
                setIsSuperAdmin(false);
            }
        }

        // Use appropriate API based on user role
        if (isUserSuperAdmin) {
            dispatch(getAllClaims(params));
        } else {
            dispatch(getMyClaims(params));
        }
    };

    const handleViewClaim = (claim) => {
        setSelectedClaim(claim);
        setShowClaimModal(true);
    };

    const handleApproveClaim = (claim) => {
        setActionClaim(claim);
        setActionType("approve");
        setRejectionReason(""); // Clear any previous rejection reason
        setShowActionModal(true);
    };

    const handleRejectClaim = (claim) => {
        setActionClaim(claim);
        setActionType("reject");
        setRejectionReason("");
        setShowActionModal(true);
    };

    const handleConfirmAction = async () => {
        if (!actionClaim) return;

        try {
            const status = actionType === "approve" ? "approved" : "rejected";
            await dispatch(updateClaimStatus(actionClaim._id, status));

            const message = actionType === "approve"
                ? "Claim approved successfully!"
                : "Claim rejected successfully!";
            toast.success(message);

            // Close modal and refresh data
            setShowActionModal(false);
            setActionClaim(null);
            setActionType("");
            setRejectionReason("");
            loadData();
        } catch (error) {
            console.error(`Error ${actionType}ing claim:`, error);
            const errorMessage = `Failed to ${actionType} claim. Please try again.`;
            toast.error(errorMessage);
        }
    };

    const handleCancelAction = () => {
        setShowActionModal(false);
        setActionClaim(null);
        setActionType("");
        setRejectionReason("");
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
        <div className="w-full px-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900">
                    {isSuperAdmin ? "All Claims" : "My Claims"}
                </h2>
            </div>

            {/* Filters */}
            <div className="mb-4 space-y-4">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <select
                            value={modelFilter}
                            onChange={(e) => setModelFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="">All Types</option>
                            <option value="Organizer">Organizer</option>
                            <option value="Performer">Performer</option>
                            <option value="Venue">Venue</option>
                            <option value="Service">Service</option>
                        </select>
                    </div>
                    {isSuperAdmin && (
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search by username or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                    <p className="mt-2 text-gray-600">Loading claims...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Claims List */}
            {!loading && (
                <div className="space-y-4">
                    {Array.isArray(claims) && claims.length > 0 ? (
                        claims.map((claim) => {
                            const statusInfo = formatStatusDisplay(claim.status);
                            return (
                                <div
                                    key={claim._id}
                                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <FaClipboardList className="text-gray-500" />
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {claim.modelName} Claim
                                                </h3>
                                                <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                                                    {statusInfo.icon}
                                                    {statusInfo.text}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                                <div>
                                                    <span className="font-medium">Entity:</span> {claim.targetId?.name || claim.targetId}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Type:</span> {claim.modelName}
                                                </div>
                                                {claim.targetId?.city && (
                                                    <div>
                                                        <span className="font-medium">City:</span> {claim.targetId.city}
                                                    </div>
                                                )}
                                                {claim.targetId?.categories && claim.targetId.categories.length > 0 && (
                                                    <div>
                                                        <span className="font-medium">Categories:</span> {claim.targetId.categories.join(', ')}
                                                    </div>
                                                )}
                                                <div>
                                                    <span className="font-medium">Submitted:</span> {formatDate(claim.createdAt)}
                                                </div>
                                                {claim.contactNumber && (
                                                    <div>
                                                        <span className="font-medium">Contact:</span> {claim.contactNumber}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Enhanced target description */}
                                            {claim.targetId?.description && (
                                                <div className="mt-3">
                                                    <span className="font-medium text-gray-700">Description:</span>
                                                    <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                                                        {claim.targetId.description.length > 100
                                                            ? `${claim.targetId.description.substring(0, 100)}...`
                                                            : claim.targetId.description
                                                        }
                                                    </p>
                                                </div>
                                            )}

                                            {/* Target tags */}
                                            {claim.targetId?.tags && claim.targetId.tags.length > 0 && (
                                                <div className="mt-2">
                                                    <span className="font-medium text-gray-700">Tags:</span>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {claim.targetId.tags.slice(0, 3).map((tag, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {claim.targetId.tags.length > 3 && (
                                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                                +{claim.targetId.tags.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {claim.message && (
                                                <div className="mt-3">
                                                    <span className="font-medium text-gray-700">Message:</span>
                                                    <p className="text-gray-600 mt-1 text-sm">{claim.message}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="ml-4 flex gap-2">
                                            <button
                                                onClick={() => handleViewClaim(claim)}
                                                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                                            >
                                                <FaEye className="text-sm" />
                                                View Details
                                            </button>

                                            {isSuperAdmin && claim.status === "pending" && (
                                                <>
                                                    <button
                                                        onClick={() => handleApproveClaim(claim)}
                                                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                                                        disabled={loading}
                                                    >
                                                        <FaCheck className="text-sm" />
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleRejectClaim(claim)}
                                                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                                                        disabled={loading}
                                                    >
                                                        <FaTimes className="text-sm" />
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-12">
                            <FaClipboardList className="mx-auto text-gray-400 text-4xl mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Claims Found</h3>
                            <p className="text-gray-600">
                                {statusFilter || modelFilter
                                    ? "Try adjusting your filters to see more claims."
                                    : "You haven't submitted any claims yet."
                                }
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Pagination */}
            {Array.isArray(claims) && claims.length > 0 && pagination && pagination.totalPages > 1 && (
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

            {/* Claim Details Modal */}
            <Modal
                isOpen={showClaimModal}
                onRequestClose={() => {
                    setShowClaimModal(false);
                    setSelectedClaim(null);
                }}
                className="modal-content bg-white rounded-lg p-6 w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto"
                overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-60 z-[1000] flex items-center justify-center px-4"
            >
                {selectedClaim && (
                    <div className="mb-4">
                        <h3 className="text-xl font-bold mb-4">Claim Details</h3>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Entity Type</label>
                                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">{selectedClaim.modelName}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <div className="flex items-center gap-2">
                                        {formatStatusDisplay(selectedClaim.status).icon}
                                        <span className={`px-3 py-2 rounded text-sm font-medium ${formatStatusDisplay(selectedClaim.status).color}`}>
                                            {formatStatusDisplay(selectedClaim.status).text}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Entity Name</label>
                                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">
                                        {selectedClaim.targetId?.name || selectedClaim.targetId || 'N/A'}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Entity Type</label>
                                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">{selectedClaim.modelName}</p>
                                </div>

                                {selectedClaim.targetId?.city && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">{selectedClaim.targetId.city}</p>
                                    </div>
                                )}

                                {selectedClaim.targetId?.categories && selectedClaim.targetId.categories.length > 0 && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">{selectedClaim.targetId.categories.join(', ')}</p>
                                    </div>
                                )}

                                {selectedClaim.targetId?.description && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <div className="bg-gray-50 px-3 py-2 rounded min-h-[80px] max-h-[120px] overflow-y-auto">
                                            {selectedClaim.targetId.description}
                                        </div>
                                    </div>
                                )}

                                {selectedClaim.targetId?.tags && selectedClaim.targetId.tags.length > 0 && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                                        <div className="bg-gray-50 px-3 py-2 rounded">
                                            <div className="flex flex-wrap gap-1">
                                                {selectedClaim.targetId.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedClaim.targetId?.slug && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded font-mono text-sm">
                                            {selectedClaim.targetId.slug}
                                        </p>
                                    </div>
                                )}

                                {selectedClaim.targetId?.profileImage && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                                        <div className="bg-gray-50 px-3 py-2 rounded">
                                            <img
                                                src={selectedClaim.targetId.profileImage}
                                                alt="Profile"
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Submitted Date</label>
                                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">
                                        {formatDate(selectedClaim.createdAt)}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">{selectedClaim.username}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">{selectedClaim.email}</p>
                                </div>

                                {selectedClaim.contactNumber && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded">{selectedClaim.contactNumber}</p>
                                    </div>
                                )}
                            </div>

                            {selectedClaim.message && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <div className="bg-gray-50 px-3 py-2 rounded min-h-[80px]">
                                        {selectedClaim.message}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2 mt-6">
                            <button
                                onClick={() => {
                                    setShowClaimModal(false);
                                    setSelectedClaim(null);
                                }}
                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Action Confirmation Modal */}
            <Modal
                isOpen={showActionModal}
                onRequestClose={handleCancelAction}
                className="modal-content bg-white rounded-lg p-6 w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto"
                overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-60 z-[1000] flex items-center justify-center px-4"
            >
                {actionClaim && (
                    <div className="mb-4">
                        <div className="flex items-center gap-3 mb-6">
                            {actionType === "approve" ? (
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <FaCheck className="text-green-600 text-xl" />
                                </div>
                            ) : (
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <FaTimes className="text-red-600 text-xl" />
                                </div>
                            )}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {actionType === "approve" ? "Approve Claim" : "Reject Claim"}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {actionType === "approve"
                                        ? "Are you sure you want to approve this claim?"
                                        : "Please provide a reason for rejecting this claim."
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Enhanced Claim Details Summary */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <div className="grid grid-cols-1 gap-3 text-sm">
                                <div>
                                    <span className="font-medium text-gray-700">Entity:</span> {actionClaim.targetId?.name || actionClaim.targetId}
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Type:</span> {actionClaim.modelName}
                                </div>
                                {actionClaim.targetId?.city && (
                                    <div>
                                        <span className="font-medium text-gray-700">City:</span> {actionClaim.targetId.city}
                                    </div>
                                )}
                                {actionClaim.targetId?.categories && actionClaim.targetId.categories.length > 0 && (
                                    <div>
                                        <span className="font-medium text-gray-700">Categories:</span> {actionClaim.targetId.categories.join(', ')}
                                    </div>
                                )}
                                <div>
                                    <span className="font-medium text-gray-700">Submitted by:</span> {actionClaim.username}
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Email:</span> {actionClaim.email}
                                </div>
                                {actionClaim.contactNumber && (
                                    <div>
                                        <span className="font-medium text-gray-700">Contact:</span> {actionClaim.contactNumber}
                                    </div>
                                )}
                                {actionClaim.targetId?.description && (
                                    <div>
                                        <span className="font-medium text-gray-700">Description:</span>
                                        <p className="text-gray-600 mt-1 text-xs line-clamp-2">
                                            {actionClaim.targetId.description.length > 80
                                                ? `${actionClaim.targetId.description.substring(0, 80)}...`
                                                : actionClaim.targetId.description
                                            }
                                        </p>
                                    </div>
                                )}
                                {actionClaim.targetId?.tags && actionClaim.targetId.tags.length > 0 && (
                                    <div>
                                        <span className="font-medium text-gray-700">Tags:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {actionClaim.targetId.tags.slice(0, 2).map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {actionClaim.targetId.tags.length > 2 && (
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                    +{actionClaim.targetId.tags.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {actionClaim.message && (
                                    <div>
                                        <span className="font-medium text-gray-700">Claim Message:</span>
                                        <p className="text-gray-600 mt-1">{actionClaim.message}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Rejection Reason Field (only for reject) */}
                        {actionType === "reject" && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rejection Reason <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    placeholder="Please provide a detailed reason for rejecting this claim..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-vertical"
                                    rows={4}
                                    required
                                />
                                {rejectionReason.trim().length < 10 && (
                                    <p className="text-red-500 text-xs mt-1">
                                        Please provide at least 10 characters for the rejection reason.
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={handleCancelAction}
                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmAction}
                                disabled={loading || (actionType === "reject" && rejectionReason.trim().length < 10)}
                                className={`flex-1 px-4 py-2 rounded-lg transition ${actionType === "approve"
                                    ? "bg-green-500 hover:bg-green-600 text-white"
                                    : "bg-red-500 hover:bg-red-600 text-white"
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Processing...
                                    </div>
                                ) : (
                                    actionType === "approve" ? "Approve Claim" : "Reject Claim"
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default AdminClaims;
