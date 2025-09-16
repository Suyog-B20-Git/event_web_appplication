import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserTag, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../utility/utils.jsx';

const ViewUser = () => {
    const navigate = useNavigate();
    const { userId } = useParams();

    // State
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user data on component mount
    useEffect(() => {
        fetchUserData();
    }, [userId]);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/auth/user/${userId}`);
            if (response.data.status) {
                setUserData(response.data.data);
            } else {
                toast.error('Failed to fetch user data');
                navigate('/admin/users');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            toast.error('Failed to fetch user data');
            navigate('/admin/users');
        } finally {
            setLoading(false);
        }
    };

    // Helper function to format role
    const formatRole = (role) => {
        const roleMap = {
            'user': 'User',
            'organizer': 'Organizer',
            'superadmin': 'Super Admin',
            'scanner': 'Scanner',
            'manager': 'Manager',
            'POS': 'POS',
            'performer': 'Performer'
        };
        return roleMap[role] || role;
    };

    // Helper function to format location
    const formatLocation = (item) => {
        if (!item) return 'Not specified';
        const parts = [item.city, item.state, item.country].filter(Boolean);
        return parts.length > 0 ? parts.join(', ') : 'Not specified';
    };

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen p-4 md:p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <h3 className="text-xl font-semibold text-gray-700">Loading User Data...</h3>
                    </div>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="bg-gray-50 min-h-screen p-4 md:p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center py-16">
                        <h3 className="text-xl font-semibold text-gray-700">User not found</h3>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => navigate('/admin/users')}
                                className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <FaArrowLeft className="text-xl" />
                            </button>
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <FaUser className="text-2xl text-blue-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800">View User</h1>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => navigate(`/admin/edit-user/${userId}`)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Edit User
                            </button>
                        </div>
                    </div>
                </div>

                {/* User Profile Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-center space-x-4">
                        {userData.profileImage ? (
                            <img
                                src={userData.profileImage}
                                alt={userData.username}
                                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                                <FaUser className="text-3xl text-gray-400" />
                            </div>
                        )}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{userData.username}</h2>
                            <p className="text-gray-600 flex items-center">
                                <FaEnvelope className="mr-2" />
                                {userData.email}
                            </p>
                            <div className="flex items-center mt-2">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${userData.isEnabled
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                    {userData.isEnabled ? (
                                        <>
                                            <FaCheckCircle className="mr-1" />
                                            Enabled
                                        </>
                                    ) : (
                                        <>
                                            <FaTimesCircle className="mr-1" />
                                            Disabled
                                        </>
                                    )}
                                </span>
                                <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    <FaUserTag className="mr-1" />
                                    {formatRole(userData.role)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Username</label>
                                <p className="text-gray-800 font-medium">{userData.username}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                                <p className="text-gray-800 flex items-center">
                                    <FaEnvelope className="mr-2 text-gray-400" />
                                    {userData.email}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                                <p className="text-gray-800 flex items-center">
                                    <FaPhone className="mr-2 text-gray-400" />
                                    {userData.phoneNumber || 'Not specified'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                                <p className="text-gray-800 flex items-center">
                                    <FaMapMarkerAlt className="mr-2 text-gray-400" />
                                    {userData.address || 'Not specified'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Role</label>
                                <p className="text-gray-800">{formatRole(userData.role)}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                                <p className={`font-medium ${userData.isEnabled ? 'text-green-600' : 'text-red-600'}`}>
                                    {userData.isEnabled ? 'Enabled' : 'Disabled'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Associations */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Associations</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Organizer</label>
                                {userData.organizer ? (
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <p className="font-medium text-blue-800">{userData.organizer.name}</p>
                                        <p className="text-sm text-blue-600">{formatLocation(userData.organizer)}</p>
                                    </div>
                                ) : (
                                    <p className="text-gray-500">Not assigned</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Performer</label>
                                {userData.performers ? (
                                    <div className="bg-purple-50 p-3 rounded-lg">
                                        <p className="font-medium text-purple-800">
                                            {Array.isArray(userData.performers)
                                                ? userData.performers[0]?.name
                                                : userData.performers.name}
                                        </p>
                                        <p className="text-sm text-purple-600">
                                            {formatLocation(Array.isArray(userData.performers)
                                                ? userData.performers[0]
                                                : userData.performers)}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-gray-500">Not assigned</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Venues</label>
                                {userData.venues && userData.venues.length > 0 ? (
                                    <div className="space-y-2">
                                        {userData.venues.map((venue, index) => (
                                            <div key={venue._id || index} className="bg-green-50 p-3 rounded-lg">
                                                <p className="font-medium text-green-800">{venue.name}</p>
                                                <p className="text-sm text-green-600">{formatLocation(venue)}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No venues assigned</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Services</label>
                                {userData.services && userData.services.length > 0 ? (
                                    <div className="space-y-2">
                                        {userData.services.map((service, index) => (
                                            <div key={service._id || index} className="bg-orange-50 p-3 rounded-lg">
                                                <p className="font-medium text-orange-800">{service.name}</p>
                                                <p className="text-sm text-orange-600">{formatLocation(service)}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No services assigned</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media & Additional Info */}
                <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Google ID</label>
                            <p className="text-gray-800">{userData.googleId || 'Not specified'}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Facebook ID</label>
                            <p className="text-gray-800">{userData.facebookId || 'Not specified'}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Created By</label>
                            <p className="text-gray-800">
                                {userData.createdBy ? `${userData.createdBy.username} (${userData.createdBy.email})` : 'System'}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Created At</label>
                            <p className="text-gray-800">
                                {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Not available'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={() => navigate('/admin/users')}
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Back to Users
                    </button>
                    <button
                        onClick={() => navigate(`/admin/edit-user/${userId}`)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Edit User
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewUser; 