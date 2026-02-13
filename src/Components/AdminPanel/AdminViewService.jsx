import React, { useState } from 'react';
import { FaArrowLeft, FaMapMarkerAlt, FaGlobe, FaPhone, FaEnvelope, FaCalendarAlt, FaPuzzlePiece } from 'react-icons/fa';

const DetailItem = ({ icon, label, children, className = "" }) => (
    <div className={`${className}`}>
        <p className="text-xs text-gray-500 flex items-center mb-1">
            {icon}
            <span className="ml-2">{label}</span>
        </p>
        <div className="text-sm font-semibold text-gray-800 break-words">
            {children || 'N/A'}
        </div>
    </div>
);

const StatusBadge = ({ status }) => {
    const styles = { true: 'bg-green-100 text-green-800', false: 'bg-red-100 text-red-800', undefined: 'bg-red-100 text-red-800' };
    const label = status ? 'Enabled' : 'Disabled';
    return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${styles[status]}`}>{label}</span>;
};

const Badge = ({ children }) => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">{children}</span>
);

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
        return 'N/A';
    }
};

const AdminViewService = ({ service, onBack, onEdit }) => {
    if (!service) return null;

    const latitude = service.googleSearchLat || service.location?.coordinates?.[1];
    const longitude = service.googleSearchLong || service.location?.coordinates?.[0];
    const [isDescExpanded, setIsDescExpanded] = useState(false);
    const descriptionText = service.description || '';
    const isLongDesc = descriptionText.length > 400;

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
            {/* Header */}
            <header className="mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <button onClick={onBack} className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"><FaArrowLeft className="text-gray-600" /></button>
                        <div className="bg-indigo-100 p-2 rounded-lg"><FaPuzzlePiece className="text-2xl text-indigo-600" /></div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{service.name}</h1>
                            {/* <p className="text-sm text-gray-500">Service ID: {service._id}</p> */}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <StatusBadge status={service.isEnabled} />
                        <button onClick={() => onEdit?.(service)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Edit</button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem icon={<FaPuzzlePiece size={14} />} label="Name">{service.name}</DetailItem>
                            <DetailItem icon={<FaCalendarAlt size={14} />} label="Created At">{formatDate(service.createdAt)}</DetailItem>
                            <DetailItem icon={<FaCalendarAlt size={14} />} label="Last Updated">{formatDate(service.updatedAt)}</DetailItem>
                            <div className="md:col-span-2">
                                <p className="text-xs text-gray-500 mb-1">Categories</p>
                                <div className="flex flex-wrap">
                                    {(service.categories || []).map((c, idx) => (<Badge key={idx}>{c}</Badge>))}
                                    {(!service.categories || service.categories.length === 0) && <span className="text-sm text-gray-500">No categories</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    {service.description && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
                            <div className="relative">
                                <p className={`text-gray-700 leading-relaxed whitespace-pre-line break-words ${!isDescExpanded ? 'max-h-60 overflow-hidden' : ''}`}>{descriptionText}</p>
                                {!isDescExpanded && isLongDesc && (
                                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
                                )}
                            </div>
                            {isLongDesc && (
                                <button onClick={() => setIsDescExpanded(!isDescExpanded)} className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                                    {isDescExpanded ? 'Show less' : 'Show more'}
                                </button>
                            )}
                        </div>
                    )}

                    {/* Location Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Location Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem icon={<FaMapMarkerAlt size={14} />} label="City">{service.city}</DetailItem>
                            <DetailItem icon={<FaMapMarkerAlt size={14} />} label="State">{service.state}</DetailItem>
                            <DetailItem icon={<FaMapMarkerAlt size={14} />} label="Country">{service.country}</DetailItem>
                            <DetailItem icon={<FaMapMarkerAlt size={14} />} label="Address" className="md:col-span-2">{service.address}</DetailItem>
                            <DetailItem icon={<FaMapMarkerAlt size={14} />} label="Google Maps">{service.googleSearchLocation}</DetailItem>
                            {(latitude || longitude) && (
                                <DetailItem icon={<FaMapMarkerAlt size={14} />} label="Coordinates" className="md:col-span-2">{latitude || '—'}, {longitude || '—'}</DetailItem>
                            )}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem icon={<FaPhone size={14} />} label="Phone Number">{service.phoneNumber}</DetailItem>
                            <DetailItem icon={<FaEnvelope size={14} />} label="Email">{service.email}</DetailItem>
                            <DetailItem icon={<FaGlobe size={14} />} label="Website">
                                {service.website ? (
                                    <a href={service.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Website</a>
                                ) : 'N/A'}
                            </DetailItem>
                            <DetailItem icon={<FaCalendarAlt size={14} />} label="Available Time">{service.availableTime}</DetailItem>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Profile Image */}
                    {service.profileImage && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Image</h2>
                            <div className="flex justify-center">
                                <img src={service.profileImage} alt={service.name} className="w-48 h-48 object-cover rounded-lg shadow-md" onError={(e) => { e.target.style.display = 'none'; }} />
                            </div>
                        </div>
                    )}

                    {/* Statistics */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Statistics</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><span className="text-gray-500">Visits</span><span className="font-semibold text-gray-800">{typeof service.visits === 'number' ? service.visits : 0}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="font-semibold text-gray-800"><StatusBadge status={service.isEnabled} /></span></div>
                        </div>
                    </div>

                    {/* Social Media */}
                    {(service.facebookUrl || service.instagramUrl || service.twitterUrl || service.youtubeUrl) && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Social Media</h2>
                            <div className="space-y-2 text-sm">
                                {service.facebookUrl && <div><span className="text-gray-500 mr-2">Facebook</span><a href={service.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Open</a></div>}
                                {service.instagramUrl && <div><span className="text-gray-500 mr-2">Instagram</span><a href={service.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Open</a></div>}
                                {service.twitterUrl && <div><span className="text-gray-500 mr-2">Twitter</span><a href={service.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Open</a></div>}
                                {service.youtubeUrl && <div><span className="text-gray-500 mr-2">YouTube</span><a href={service.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Open</a></div>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminViewService;


