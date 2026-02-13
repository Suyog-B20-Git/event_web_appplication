import React from 'react';
import { FaUsers, FaMapMarkerAlt, FaStar, FaPhone, FaEnvelope, FaGlobe, FaCalendarAlt, FaTag, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaArrowLeft, FaEdit } from 'react-icons/fa';

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
    const styles = {
        true: 'bg-green-100 text-green-800',
        false: 'bg-red-100 text-red-800',
        undefined: 'bg-red-100 text-red-800'
    };
    const label = status ? 'Enabled' : 'Disabled';
    return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${styles[status]}`}>{label}</span>;
};

const AdminViewPerformer = ({ performer, onBack, onEdit }) => {
    if (!performer) {
        return (
            <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                    <FaUsers className="mx-auto text-5xl text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700">Performer Not Found</h3>
                    <p className="text-gray-500 mt-2">The performer you're looking for doesn't exist.</p>
                    <button
                        onClick={onBack}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                        <FaArrowLeft className="mr-2 inline" />
                        Back to Performers
                    </button>
                </div>
            </div>
        );
    }

    const formatCategories = (categories) => {
        if (!categories || categories.length === 0) return 'N/A';
        return categories.join(', ');
    };

    const formatRating = (rating) => {
        if (!rating) return 'N/A';
        return (
            <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span>{rating.toFixed(1)}</span>
            </div>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatSocialMedia = (url, platform) => {
        if (!url) return 'N/A';
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
            >
                {platform}
            </a>
        );
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
            <header className="mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={onBack}
                            className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <FaArrowLeft className="text-gray-600" />
                        </button>
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <FaUsers className="text-2xl text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{performer.name}</h1>
                            {/* <p className="text-sm text-gray-500">Performer ID: {performer._id}</p> */}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <StatusBadge status={performer.isEnabled} />
                        <button
                            onClick={() => onEdit(performer)}
                            className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors"
                        >
                            <FaEdit className="mr-2" /> Edit Performer
                        </button>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem icon={<FaUsers size={14} />} label="Name">{performer.name}</DetailItem>
                            <DetailItem icon={<FaTag size={14} />} label="Categories">{formatCategories(performer.categories)}</DetailItem>
                            <DetailItem icon={<FaStar size={14} />} label="Rating">{formatRating(performer.rating)}</DetailItem>
                            <DetailItem icon={<FaCalendarAlt size={14} />} label="Created At">{formatDate(performer.createdAt)}</DetailItem>
                            <DetailItem icon={<FaCalendarAlt size={14} />} label="Last Updated">{formatDate(performer.updatedAt)}</DetailItem>
                            <DetailItem icon={<FaUsers size={14} />} label="Status">
                                <StatusBadge status={performer.isEnabled} />
                            </DetailItem>
                        </div>
                    </div>

                    {performer.description && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
                            <p className="text-gray-700 leading-relaxed">{performer.description}</p>
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Location Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem icon={<FaMapMarkerAlt size={14} />} label="City">{performer.city}</DetailItem>
                            <DetailItem icon={<FaMapMarkerAlt size={14} />} label="State">{performer.state}</DetailItem>
                            <DetailItem icon={<FaMapMarkerAlt size={14} />} label="Country">{performer.country}</DetailItem>
                            <DetailItem icon={<FaMapMarkerAlt size={14} />} label="Address" className="md:col-span-2">{performer.address}</DetailItem>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem icon={<FaPhone size={14} />} label="Phone Number">{performer.phoneNumber || 'N/A'}</DetailItem>
                            <DetailItem icon={<FaEnvelope size={14} />} label="Email">{performer.email || 'N/A'}</DetailItem>
                            <DetailItem icon={<FaGlobe size={14} />} label="Website">{formatSocialMedia(performer.website, 'Website')}</DetailItem>
                            <DetailItem icon={<FaCalendarAlt size={14} />} label="Available Time">{performer.availableTime || 'N/A'}</DetailItem>
                        </div>
                    </div>

                    {(performer.facebookUrl || performer.instagramUrl || performer.twitterUrl || performer.youtubeUrl) && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Social Media</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DetailItem icon={<FaFacebook size={14} />} label="Facebook">{formatSocialMedia(performer.facebookUrl, 'Facebook')}</DetailItem>
                                <DetailItem icon={<FaInstagram size={14} />} label="Instagram">{formatSocialMedia(performer.instagramUrl, 'Instagram')}</DetailItem>
                                <DetailItem icon={<FaTwitter size={14} />} label="Twitter">{formatSocialMedia(performer.twitterUrl, 'Twitter')}</DetailItem>
                                <DetailItem icon={<FaYoutube size={14} />} label="YouTube">{formatSocialMedia(performer.youtubeUrl, 'YouTube')}</DetailItem>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    {performer.profileImage && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Image</h2>
                            <div className="flex justify-center">
                                <img
                                    src={performer.profileImage}
                                    alt={performer.name}
                                    className="w-48 h-48 object-cover rounded-lg shadow-md"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="w-48 h-48 bg-gray-100 rounded-lg shadow-md hidden items-center justify-center">
                                    <FaUsers className="text-4xl text-gray-400" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Statistics</h2>
                        <div className="space-y-4">
                            <DetailItem icon={<FaUsers size={14} />} label="Followers">
                                {performer.followers ? performer.followers.length : 0}
                            </DetailItem>
                            <DetailItem icon={<FaStar size={14} />} label="Popularity Score">
                                {performer.popularityScore || 0}
                            </DetailItem>
                            <DetailItem icon={<FaCalendarAlt size={14} />} label="Visits">
                                {performer.visits || 0}
                            </DetailItem>
                        </div>
                    </div>

                    {performer.tags && performer.tags.length > 0 && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Tags</h2>
                            <div className="flex flex-wrap gap-2">
                                {performer.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminViewPerformer;


