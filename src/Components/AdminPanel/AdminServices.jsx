import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaPuzzlePiece, FaPlus, FaTrash, FaSearch, FaEye, FaPencilAlt, FaFilter, FaTimes, FaExclamationTriangle, FaCheckCircle, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { getAllServicesAdmin } from '../../redux/actions/master/Services/getServicesAdmin';
import { enableService, disableService, deleteService as deleteServiceAction, bulkEnableServices, bulkDisableServices, bulkDeleteServices } from '../../redux/actions/master/Services/ServiceOps';

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
                        <button onClick={onClose} className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${buttonStyles.cancel}`}>{cancelText || 'Cancel'}</button>
                        <button onClick={onConfirm} className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${buttonStyles.confirm}`}>{confirmText || 'Confirm'}</button>
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

const AdminServices = ({ onNavigateToViewService, onNavigateToEditService, onNavigateToAddService }) => {
    const dispatch = useDispatch();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalServices: 0, hasNextPage: false, hasPrevPage: false, limit: 10 });
    const [filters, setFilters] = useState({ categories: '', city: '', state: '' });
    const [showFilters, setShowFilters] = useState(false);
    const [confirmationDialog, setConfirmationDialog] = useState({ isOpen: false, title: '', message: '', confirmText: '', cancelText: '', type: 'warning', onConfirm: null });

    const fetchServices = async (page = 1, search = '', categoryFilter = '', cityFilter = '', stateFilter = '') => {
        setLoading(true);
        try {
            const params = { page, limit: pagination.limit, name: search || undefined, categories: categoryFilter || undefined, city: cityFilter || undefined, state: stateFilter || undefined };
            const result = await dispatch(getAllServicesAdmin(params));
            setServices(result.services || []);
            setPagination(result.pagination || {});
        } catch (e) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchServices(); }, []);
    useEffect(() => {
        const t = setTimeout(() => { fetchServices(1, searchTerm, filters.categories, filters.city, filters.state); }, 500);
        return () => clearTimeout(t);
    }, [searchTerm, filters]);

    const handleSelect = (id) => {
        setSelectedServices(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };
    const handleSelectAll = () => {
        if (selectedServices.length === services.length) setSelectedServices([]);
        else setSelectedServices(services.map(s => s._id));
    };

    const showConfirm = (title, message, confirmText, type, onConfirm) => setConfirmationDialog({ isOpen: true, title, message, confirmText, cancelText: 'Cancel', type, onConfirm: () => { onConfirm(); setConfirmationDialog(prev => ({ ...prev, isOpen: false })); } });
    const closeConfirm = () => setConfirmationDialog(prev => ({ ...prev, isOpen: false }));

    const handleSingleEnable = async (id) => {
        const entity = services.find(s => s._id === id);
        showConfirm('Enable Service', `Are you sure you want to enable "${entity?.name}"?`, 'Enable', 'success', async () => {
            try { await dispatch(enableService(id)); fetchServices(pagination.currentPage, searchTerm, filters.categories, filters.city, filters.state); } catch (e) { }
        });
    };
    const handleSingleDisable = async (id) => {
        const entity = services.find(s => s._id === id);
        showConfirm('Disable Service', `Are you sure you want to disable "${entity?.name}"?`, 'Disable', 'warning', async () => {
            try { await dispatch(disableService(id)); fetchServices(pagination.currentPage, searchTerm, filters.categories, filters.city, filters.state); } catch (e) { }
        });
    };
    const handleDeleteSingle = async (id) => {
        const entity = services.find(s => s._id === id);
        showConfirm('Delete Service', `Delete "${entity?.name}"? This cannot be undone.`, 'Delete', 'danger', async () => {
            try { await dispatch(deleteServiceAction(id)); setSelectedServices(prev => prev.filter(x => x !== id)); fetchServices(pagination.currentPage, searchTerm, filters.categories, filters.city, filters.state); } catch (e) { }
        });
    };

    const handleBulkEnable = async () => {
        if (selectedServices.length === 0) return alert('Select services first.');
        showConfirm('Enable Services', `Enable ${selectedServices.length} selected service(s)?`, 'Enable', 'success', async () => {
            try { await dispatch(bulkEnableServices(selectedServices)); setSelectedServices([]); fetchServices(pagination.currentPage, searchTerm, filters.categories, filters.city, filters.state); } catch (e) { }
        });
    };
    const handleBulkDisable = async () => {
        if (selectedServices.length === 0) return alert('Select services first.');
        showConfirm('Disable Services', `Disable ${selectedServices.length} selected service(s)?`, 'Disable', 'warning', async () => {
            try { await dispatch(bulkDisableServices(selectedServices)); setSelectedServices([]); fetchServices(pagination.currentPage, searchTerm, filters.categories, filters.city, filters.state); } catch (e) { }
        });
    };
    const handleBulkDelete = async () => {
        if (selectedServices.length === 0) return alert('Select services first.');
        showConfirm('Delete Services', `Delete ${selectedServices.length} selected service(s)? This cannot be undone.`, 'Delete', 'danger', async () => {
            try { await dispatch(bulkDeleteServices(selectedServices)); setSelectedServices([]); fetchServices(pagination.currentPage, searchTerm, filters.categories, filters.city, filters.state); } catch (e) { }
        });
    };

    const handlePageChange = (page) => { fetchServices(page, searchTerm, filters.categories, filters.city, filters.state); };

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
            {isNavigating && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-xl">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Opening editor…</h3>
                            <p className="text-sm text-gray-500">Please wait a moment.</p>
                        </div>
                    </div>
                </div>
            )}
            <ConfirmationDialog {...confirmationDialog} onClose={closeConfirm} />
            <header className="mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg"><FaPuzzlePiece className="text-2xl text-blue-600" /></div>
                        <h1 className="text-3xl font-bold text-gray-800">Services</h1>
                        <span className="text-sm text-gray-500">({pagination.totalServices} total)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => { setIsNavigating(true); setTimeout(() => onNavigateToAddService?.(), 0); }} className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors"><FaPlus className="mr-2" /> Add New</button>
                        {selectedServices.length > 0 && (
                            <>
                                <button onClick={handleBulkEnable} className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">Enable ({selectedServices.length})</button>
                                <button onClick={handleBulkDisable} className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">Disable ({selectedServices.length})</button>
                                <button onClick={handleBulkDelete} className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors"><FaTrash className="mr-2" /> Delete ({selectedServices.length})</button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <div className="mb-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by service name..." className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <button onClick={() => setShowFilters(!showFilters)} className="flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <FaFilter className="mr-2" />
                        Filters
                        {(filters.categories || filters.city || filters.state) && (
                            <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1">{(filters.categories ? 1 : 0) + (filters.city ? 1 : 0) + (filters.state ? 1 : 0)}</span>
                        )}
                    </button>
                </div>
                {showFilters && (
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-800">Filters</h3>
                            <button onClick={() => setFilters({ categories: '', city: '', state: '' })} className="flex items-center text-sm text-gray-500 hover:text-gray-700"><FaTimes className="mr-1" /> Clear All</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
                                <select value={filters.categories} onChange={e => setFilters(prev => ({ ...prev, categories: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    <option value="">All Categories</option>
                                    <option value="anchor">Anchor</option>
                                    <option value="decor">Decor</option>
                                    <option value="entertainer">Entertainer</option>
                                    <option value="party supplier">Party Supplier</option>
                                    <option value="photography & videography">Photography & Videography</option>
                                    <option value="promoter">Promoter</option>
                                    <option value="dance studio">Dance Studio</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input type="text" value={filters.city} onChange={e => setFilters(prev => ({ ...prev, city: e.target.value }))} placeholder="Filter by city..." className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input type="text" value={filters.state} onChange={e => setFilters(prev => ({ ...prev, state: e.target.value }))} placeholder="Filter by state..." className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-5">
                {loading ? (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <h3 className="text-xl font-semibold text-gray-700">Loading Services...</h3>
                    </div>
                ) : services.length > 0 ? (
                    <>
                        <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                            <input type="checkbox" checked={selectedServices.length === services.length && services.length > 0} onChange={handleSelectAll} className="h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                            <span className="text-sm font-medium text-gray-700">Select All ({selectedServices.length} of {services.length} selected)</span>
                        </div>

                        {services.map(service => (
                            <div key={service._id} className={`bg-white rounded-lg shadow-sm border transition-all duration-300 hover:shadow-lg ${selectedServices.includes(service._id) ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}`}>
                                <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                                    <div className="flex items-center space-x-3">
                                        <input type="checkbox" checked={selectedServices.includes(service._id)} onChange={() => handleSelect(service._id)} className="h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                        <div>
                                            <h3 className="font-bold text-lg text-indigo-700">{service.name}</h3>
                                            <p className="text-sm text-gray-500">Service ID: <span className="font-medium text-gray-600">{service._id}</span></p>
                                        </div>
                                    </div>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${service.isEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{service.isEnabled ? 'Enabled' : 'Disabled'}</span>
                                </div>
                                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
                                    <DetailItem icon={<FaMapMarkerAlt size={14} />} label="Location">{service.city}, {service.state}</DetailItem>
                                    <DetailItem icon={<FaPuzzlePiece size={14} />} label="Categories">{Array.isArray(service.categories) && service.categories.length ? service.categories.join(', ') : 'N/A'}</DetailItem>
                                    <DetailItem icon={<FaCalendarAlt size={14} />} label="Created At">{service.createdAt ? new Date(service.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}</DetailItem>
                                    <DetailItem icon={<FaEye size={14} />} label="Visits">{typeof service.visits === 'number' ? service.visits : '0'}</DetailItem>
                                </div>
                                <footer className="p-3 bg-gray-50 rounded-b-lg flex flex-wrap justify-end items-center gap-2">
                                    {service.isEnabled ? (
                                        <button onClick={() => handleSingleDisable(service._id)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition-colors">Disable</button>
                                    ) : (
                                        <button onClick={() => handleSingleEnable(service._id)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors">Enable</button>
                                    )}
                                    <button onClick={() => { setIsNavigating(true); setTimeout(() => onNavigateToViewService?.(service), 0); }} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"><FaEye className="mr-2" />View</button>
                                    <button onClick={() => { setIsNavigating(true); setTimeout(() => onNavigateToEditService?.(service), 0); }} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-colors"><FaPencilAlt className="mr-2" />Edit</button>
                                    <button onClick={() => handleDeleteSingle(service._id)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"><FaTrash className="mr-2" />Delete</button>
                                </footer>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <FaPuzzlePiece className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700">No Services Found</h3>
                        <p className="text-gray-500 mt-2">{searchTerm || filters.categories || filters.city || filters.state ? `Your search for "${searchTerm}" did not match any services.` : 'No services have been created yet.'}</p>
                    </div>
                )}

                {pagination.totalPages > 1 && (
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="text-sm text-gray-600">Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to {Math.min(pagination.currentPage * pagination.limit, pagination.totalServices)} of {pagination.totalServices} services</div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handlePageChange(1)} disabled={pagination.currentPage === 1} className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors" title="First Page">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
                                </button>
                                <button onClick={() => handlePageChange(pagination.currentPage - 1)} disabled={!pagination.hasPrevPage} className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors" title="Previous Page">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <div className="flex items-center gap-1">
                                    {(() => {
                                        const getVisiblePages = () => {
                                            const totalPages = pagination.totalPages;
                                            const currentPage = pagination.currentPage;
                                            if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
                                            const pages = [];
                                            if (currentPage > 3) { pages.push(1); if (currentPage > 4) pages.push('...'); }
                                            const start = Math.max(1, currentPage - 1);
                                            const end = Math.min(totalPages, currentPage + 1);
                                            for (let i = start; i <= end; i++) { if (!pages.includes(i)) pages.push(i); }
                                            if (currentPage < totalPages - 2) { if (currentPage < totalPages - 3) pages.push('...'); pages.push(totalPages); }
                                            return pages;
                                        };
                                        return getVisiblePages().map((pageNum, index) => pageNum === '...'
                                            ? <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">⋯</span>
                                            : (
                                                <button key={pageNum} onClick={() => handlePageChange(pageNum)} className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${pagination.currentPage === pageNum ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600 border border-gray-300'}`}>{pageNum}</button>
                                            )
                                        );
                                    })()}
                                </div>
                                <button onClick={() => handlePageChange(pagination.currentPage + 1)} disabled={!pagination.hasNextPage} className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors" title="Next Page">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </button>
                                <button onClick={() => handlePageChange(pagination.totalPages)} disabled={pagination.currentPage === pagination.totalPages} className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors" title="Last Page">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M6 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-600">Show:</span>
                                <select value={pagination.limit} onChange={(e) => { const newLimit = parseInt(e.target.value); setPagination(prev => ({ ...prev, limit: newLimit })); fetchServices(1, searchTerm, filters.categories, filters.city, filters.state); }} className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
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

export default AdminServices;


