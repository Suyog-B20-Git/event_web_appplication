import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUserEdit, FaArrowLeft, FaSearch, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../utility/utils.jsx';

const EditUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useParams();

    // Form state
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
        phoneNumber: '',
        address: '',
        profileImage: '',
        organizer: '',
        performers: '',
        venues: [],
        services: [],
        googleId: '',
        facebookId: '',
        isEnabled: true
    });

    // UI state
    const [loading, setLoading] = useState(false);
    const [fetchingUser, setFetchingUser] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [searchResults, setSearchResults] = useState({
        organizers: [],
        performers: [],
        venues: [],
        services: []
    });
    const [showDropdowns, setShowDropdowns] = useState({
        organizers: false,
        performers: false,
        venues: false,
        services: false
    });
    const [selectedItems, setSelectedItems] = useState({
        organizer: null,
        performers: null,
        venues: [],
        services: []
    });

    // Role options
    const roleOptions = [
        { value: 'user', label: 'User' },
        { value: 'organizer', label: 'Organizer' },
        { value: 'superadmin', label: 'Super Admin' },
        { value: 'scanner', label: 'Scanner' },
        { value: 'manager', label: 'Manager' },
        { value: 'POS', label: 'POS' },
        { value: 'performer', label: 'Performer' }
    ];

    // Fetch user data on component mount
    useEffect(() => {
        fetchUserData();
    }, [userId]);

    const fetchUserData = async () => {
        try {
            setFetchingUser(true);
            const response = await axiosInstance.get(`/auth/user/${userId}`);
            if (response.data.status) {
                const userData = response.data.data;
                console.log('Fetched user data:', userData); // Debug log

                // Set form data
                setFormData({
                    username: userData.username || '',
                    email: userData.email || '',
                    password: '', // Don't populate password
                    role: userData.role || '',
                    phoneNumber: userData.phoneNumber || '',
                    address: userData.address || '',
                    profileImage: userData.profileImage || '',
                    organizer: userData.organizer?._id || '',
                    performers: Array.isArray(userData.performers) && userData.performers.length > 0 ? userData.performers[0]._id : (userData.performers?._id || ''),
                    venues: userData.venues?.map(v => v._id) || [],
                    services: userData.services?.map(s => s._id) || [],
                    googleId: userData.googleId || '',
                    facebookId: userData.facebookId || '',
                    isEnabled: userData.isEnabled !== undefined ? userData.isEnabled : true
                });

                // Set selected items for display - handle both populated objects and IDs
                setSelectedItems({
                    organizer: userData.organizer || null,
                    performers: Array.isArray(userData.performers) && userData.performers.length > 0 ? userData.performers[0] : (userData.performers || null),
                    venues: userData.venues || [],
                    services: userData.services || []
                });

                console.log('Set form data:', {
                    formData: {
                        username: userData.username || '',
                        email: userData.email || '',
                        role: userData.role || '',
                        organizer: userData.organizer?._id || '',
                        performers: Array.isArray(userData.performers) && userData.performers.length > 0 ? userData.performers[0]._id : (userData.performers?._id || ''),
                        venues: userData.venues?.map(v => v._id) || [],
                        services: userData.services?.map(s => s._id) || [],
                    },
                    selectedItems: {
                        organizer: userData.organizer || null,
                        performers: Array.isArray(userData.performers) && userData.performers.length > 0 ? userData.performers[0] : (userData.performers || null),
                        venues: userData.venues || [],
                        services: userData.services || []
                    }
                });
            } else {
                toast.error('Failed to fetch user data');
                navigate('/admin/users');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            toast.error('Failed to fetch user data');
            navigate('/admin/users');
        } finally {
            setFetchingUser(false);
        }
    };

    // Search functions with debouncing
    const searchOrganizers = useCallback(async (query) => {
        if (!query.trim()) {
            setSearchResults(prev => ({ ...prev, organizers: [] }));
            return;
        }
        try {
            const response = await axiosInstance.get(`/auth/search/organizers?query=${encodeURIComponent(query)}&limit=10`);
            if (response.data.status) {
                setSearchResults(prev => ({ ...prev, organizers: response.data.data }));
            }
        } catch (error) {
            console.error('Error searching organizers:', error);
        }
    }, []);

    const searchPerformers = useCallback(async (query) => {
        if (!query.trim()) {
            setSearchResults(prev => ({ ...prev, performers: [] }));
            return;
        }
        try {
            const response = await axiosInstance.get(`/auth/search/performers?query=${encodeURIComponent(query)}&limit=10`);
            if (response.data.status) {
                setSearchResults(prev => ({ ...prev, performers: response.data.data }));
            }
        } catch (error) {
            console.error('Error searching performers:', error);
        }
    }, []);

    const searchVenues = useCallback(async (query) => {
        if (!query.trim()) {
            setSearchResults(prev => ({ ...prev, venues: [] }));
            return;
        }
        try {
            const response = await axiosInstance.get(`/auth/search/venues?query=${encodeURIComponent(query)}&limit=10`);
            if (response.data.status) {
                setSearchResults(prev => ({ ...prev, venues: response.data.data }));
            }
        } catch (error) {
            console.error('Error searching venues:', error);
        }
    }, []);

    const searchServices = useCallback(async (query) => {
        if (!query.trim()) {
            setSearchResults(prev => ({ ...prev, services: [] }));
            return;
        }
        try {
            const response = await axiosInstance.get(`/auth/search/services?query=${encodeURIComponent(query)}&limit=10`);
            if (response.data.status) {
                setSearchResults(prev => ({ ...prev, services: response.data.data }));
            }
        } catch (error) {
            console.error('Error searching services:', error);
        }
    }, []);

    // Debounced search functions
    const debouncedSearch = useCallback((searchFunc, query) => {
        const timeoutId = setTimeout(() => searchFunc(query), 300);
        return () => clearTimeout(timeoutId);
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle organizer search
    const handleOrganizerSearch = (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, organizer: value }));
        setShowDropdowns(prev => ({ ...prev, organizers: true }));
        debouncedSearch(searchOrganizers, value);
    };

    // Handle performer search
    const handlePerformerSearch = (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, performers: value }));
        setShowDropdowns(prev => ({ ...prev, performers: true }));
        debouncedSearch(searchPerformers, value);
    };

    // Handle venue search
    const handleVenueSearch = (e) => {
        const value = e.target.value;
        setShowDropdowns(prev => ({ ...prev, venues: true }));
        debouncedSearch(searchVenues, value);
    };

    // Handle service search
    const handleServiceSearch = (e) => {
        const value = e.target.value;
        setShowDropdowns(prev => ({ ...prev, services: true }));
        debouncedSearch(searchServices, value);
    };

    // Handle item selection
    const handleSelectOrganizer = (organizer) => {
        setSelectedItems(prev => ({ ...prev, organizer }));
        setFormData(prev => ({ ...prev, organizer: organizer._id }));
        setShowDropdowns(prev => ({ ...prev, organizers: false }));
    };

    const handleSelectPerformer = (performer) => {
        setSelectedItems(prev => ({ ...prev, performers: performer }));
        setFormData(prev => ({ ...prev, performers: performer._id }));
        setShowDropdowns(prev => ({ ...prev, performers: false }));
    };

    const handleSelectVenue = (venue) => {
        if (!selectedItems.venues.find(v => v._id === venue._id)) {
            setSelectedItems(prev => ({ ...prev, venues: [...prev.venues, venue] }));
            setFormData(prev => ({ ...prev, venues: [...prev.venues, venue._id] }));
        }
        setShowDropdowns(prev => ({ ...prev, venues: false }));
    };

    const handleSelectService = (service) => {
        if (!selectedItems.services.find(s => s._id === service._id)) {
            setSelectedItems(prev => ({ ...prev, services: [...prev.services, service] }));
            setFormData(prev => ({ ...prev, services: [...prev.services, service._id] }));
        }
        setShowDropdowns(prev => ({ ...prev, services: false }));
    };

    // Remove selected items
    const removeVenue = (venueId) => {
        setSelectedItems(prev => ({ ...prev, venues: prev.venues.filter(v => v._id !== venueId) }));
        setFormData(prev => ({ ...prev, venues: prev.venues.filter(id => id !== venueId) }));
    };

    const removeService = (serviceId) => {
        setSelectedItems(prev => ({ ...prev, services: prev.services.filter(s => s._id !== serviceId) }));
        setFormData(prev => ({ ...prev, services: prev.services.filter(id => id !== serviceId) }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.username || !formData.email || !formData.role) {
            toast.error('Please fill in all required fields');
            return;
        }

        setLoading(true);
        try {
            // Remove password if empty (don't update password)
            const updateData = { ...formData };
            if (!updateData.password) {
                delete updateData.password;
            }

            const response = await axiosInstance.put(`/auth/user/${userId}`, updateData);
            if (response.data.status) {
                toast.success('User updated successfully!');
                navigate('/admin/users');
            } else {
                toast.error(response.data.message || 'Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error(error.response?.data?.message || 'Failed to update user');
        } finally {
            setLoading(false);
        }
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setShowDropdowns({
                organizers: false,
                performers: false,
                venues: false,
                services: false
            });
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    if (fetchingUser) {
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
                                <FaUserEdit className="text-2xl text-blue-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800">Edit User</h1>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Username <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter username"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password (leave blank to keep current)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter new password (optional)"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Role <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select role</option>
                                        {roleOptions.map(role => (
                                            <option key={role.value} value={role.value}>
                                                {role.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter phone number"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter address"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Profile Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="profileImage"
                                        value={formData.profileImage}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter profile image URL"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="isEnabled"
                                            checked={formData.isEnabled}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700">
                                            User Enabled
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Associations */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Associations</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Organizer */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Organizer
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={selectedItems.organizer ? selectedItems.organizer.name : formData.organizer || ''}
                                            onChange={handleOrganizerSearch}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Search for organizer..."
                                        />
                                        {(selectedItems.organizer || formData.organizer) && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedItems(prev => ({ ...prev, organizer: null }));
                                                    setFormData(prev => ({ ...prev, organizer: '' }));
                                                }}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                                            >
                                                <FaTimes />
                                            </button>
                                        )}
                                    </div>
                                    {showDropdowns.organizers && searchResults.organizers.length > 0 && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                            {searchResults.organizers.map(organizer => (
                                                <div
                                                    key={organizer._id}
                                                    onClick={() => handleSelectOrganizer(organizer)}
                                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                >
                                                    <div className="font-medium">{organizer.name}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {organizer.city}, {organizer.state}, {organizer.country}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Performer */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Performer
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={selectedItems.performers ? selectedItems.performers.name : formData.performers || ''}
                                            onChange={handlePerformerSearch}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Search for performer..."
                                        />
                                        {(selectedItems.performers || formData.performers) && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedItems(prev => ({ ...prev, performers: null }));
                                                    setFormData(prev => ({ ...prev, performers: '' }));
                                                }}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                                            >
                                                <FaTimes />
                                            </button>
                                        )}
                                    </div>
                                    {showDropdowns.performers && searchResults.performers.length > 0 && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                            {searchResults.performers.map(performer => (
                                                <div
                                                    key={performer._id}
                                                    onClick={() => handleSelectPerformer(performer)}
                                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                >
                                                    <div className="font-medium">{performer.name}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {performer.city}, {performer.state}, {performer.country}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Venues */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Venues
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        onChange={handleVenueSearch}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Search for venues..."
                                    />
                                </div>
                                {showDropdowns.venues && searchResults.venues.length > 0 && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {searchResults.venues.map(venue => (
                                            <div
                                                key={venue._id}
                                                onClick={() => handleSelectVenue(venue)}
                                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                            >
                                                <div className="font-medium">{venue.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {venue.city}, {venue.state}, {venue.country}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {selectedItems.venues.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {selectedItems.venues.map(venue => (
                                            <span
                                                key={venue._id}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                                            >
                                                {venue.name}
                                                <button
                                                    type="button"
                                                    onClick={() => removeVenue(venue._id)}
                                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Services */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Services
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        onChange={handleServiceSearch}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Search for services..."
                                    />
                                </div>
                                {showDropdowns.services && searchResults.services.length > 0 && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {searchResults.services.map(service => (
                                            <div
                                                key={service._id}
                                                onClick={() => handleSelectService(service)}
                                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                            >
                                                <div className="font-medium">{service.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {service.city}, {service.state}, {service.country}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {selectedItems.services.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {selectedItems.services.map(service => (
                                            <span
                                                key={service._id}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                                            >
                                                {service.name}
                                                <button
                                                    type="button"
                                                    onClick={() => removeService(service._id)}
                                                    className="ml-2 text-green-600 hover:text-green-800"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Social Media</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Google ID
                                    </label>
                                    <input
                                        type="text"
                                        name="googleId"
                                        value={formData.googleId}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter Google ID"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Facebook ID
                                    </label>
                                    <input
                                        type="text"
                                        name="facebookId"
                                        value={formData.facebookId}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter Facebook ID"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/users')}
                                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? 'Updating...' : 'Update User'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUser; 