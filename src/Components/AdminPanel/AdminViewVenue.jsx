import React, { useState } from 'react';
import { FaArrowLeft, FaMapMarkerAlt, FaGlobe, FaPhone, FaEnvelope, FaCalendarAlt, FaBuilding, FaStar } from 'react-icons/fa';

const InfoRow = ({ label, value }) => (
    <div className="flex justify-between py-2">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-sm font-medium text-gray-800 text-right break-words ml-4">{value || '—'}</span>
    </div>
);

const Badge = ({ children }) => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">{children}</span>
);

const StatusBadge = ({ status }) => {
    const styles = {
        true: 'bg-green-100 text-green-800',
        false: 'bg-red-100 text-red-800',
        undefined: 'bg-red-100 text-red-800'
    };
    const label = status ? 'Enabled' : 'Disabled';
    return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${styles[status]}`}>{label}</span>;
};

const formatDate = (dateString) => {
    if (!dateString) return '—';
    try { return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); } catch { return '—'; }
};

const AdminViewVenue = ({ venue, onBack, onEdit }) => {
    if (!venue) return null;
    const [isDescExpanded, setIsDescExpanded] = useState(false);
    const descriptionText = venue.description || '';
    const isLongDesc = descriptionText.length > 400;

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
            <header className="mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <button onClick={onBack} className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                            <FaArrowLeft className="text-gray-600" />
                        </button>
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <FaBuilding className="text-2xl text-indigo-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{venue.name}</h1>
                            <p className="text-sm text-gray-500">Venue ID: {venue._id}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <StatusBadge status={venue.isEnabled} />
                        <button onClick={() => onEdit?.(venue)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Edit</button>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Overview */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Images */}
                    {(venue.coverImage || venue.profileImage) && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            {venue.coverImage && (
                                <img src={venue.coverImage} alt="Cover" className="w-full h-48 object-cover" />
                            )}
                            <div className="p-4">
                                <div className="flex items-center gap-4">
                                    {venue.profileImage && (
                                        <img src={venue.profileImage} alt={venue.name} className="w-20 h-20 object-cover rounded-lg shadow" />
                                    )}
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-gray-400" />
                                            <span className="text-gray-700 text-sm">{venue.address}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <FaStar className="text-yellow-400" />
                                            <span className="text-sm text-gray-700">{venue.rating ?? 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Basic Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoRow label="Created At" value={formatDate(venue.createdAt)} />
                            <InfoRow label="Last Updated" value={formatDate(venue.updatedAt)} />
                        </div>
                    </div>

                    {/* Description */}
                    {venue.description && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">About</h2>
                            <div className="relative">
                                <p className={`text-gray-700 text-sm leading-6 whitespace-pre-line break-words ${!isDescExpanded ? 'max-h-60 overflow-hidden' : ''}`}>{descriptionText}</p>
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

                    {/* Categories */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Categories</h2>
                        <div className="flex flex-wrap">
                            {(venue.categories || []).map((c, idx) => (<Badge key={idx}>{c}</Badge>))}
                            {(!venue.categories || venue.categories.length === 0) && <span className="text-sm text-gray-500">No categories</span>}
                        </div>
                    </div>

                    {/* Venue Details (Meta) */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Venue Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoRow label="Venue Type" value={venue.type} />
                            <InfoRow label="Amenities" value={venue.amenities} />
                            <InfoRow label="No. of Seated Guests" value={venue.noOfSeatedGuest} />
                            <InfoRow label="No. of Standing Guests" value={venue.noOfStandingGuest} />
                            <InfoRow label="Neighbourhoods" value={Array.isArray(venue.neighbourhoods) ? venue.neighbourhoods.join(', ') : venue.neighbourhoods} />
                            <InfoRow label="Pricing" value={venue.pricing} />
                            <InfoRow label="Food & Beverages Details" value={venue.foodAndBeveragesDetails} />
                            <InfoRow label="Quoted Form" value={venue.quotedForm} />
                            <InfoRow label="Availability" value={venue.availability} />
                            <InfoRow label="ZIP Code" value={venue.zipcode} />
                        </div>
                    </div>
                </div>

                {/* Right: Details */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Details</h2>
                        <InfoRow label="City" value={venue.city} />
                        <InfoRow label="State" value={venue.state} />
                        <InfoRow label="Country" value={venue.country} />
                        <InfoRow label="Website" value={venue.website} />
                        <InfoRow label="Phone" value={venue.phoneNumber} />
                        <InfoRow label="Email" value={venue.email} />
                        <InfoRow label="Available Time" value={venue.availableTime} />
                        <InfoRow label="Google Maps" value={venue.googleSearchLocation} />
                        {venue.location?.coordinates && (
                            <InfoRow label="Coordinates" value={`${venue.location.coordinates[1]}, ${venue.location.coordinates[0]}`} />
                        )}
                    </div>

                    {/* Statistics */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Statistics</h2>
                        <InfoRow label="Status" value={venue.isEnabled ? 'Enabled' : 'Disabled'} />
                        <InfoRow label="Visits" value={venue.visits} />
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Social</h2>
                        <InfoRow label="Facebook" value={venue.facebookUrl} />
                        <InfoRow label="Instagram" value={venue.instagramUrl} />
                        <InfoRow label="YouTube" value={venue.youtubeUrl} />
                        <InfoRow label="Twitter" value={venue.twitterUrl} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminViewVenue;


