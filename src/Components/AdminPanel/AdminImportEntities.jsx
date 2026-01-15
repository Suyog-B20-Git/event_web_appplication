import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaCloudDownloadAlt, FaSave, FaTimes, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaSpotify, FaSoundcloud, FaInfoCircle } from 'react-icons/fa';
import { createEntityFromUrls } from '../../redux/actions/master/Unified/createEntityFromUrls';
import { getCategories } from '../../redux/actions/master/Categories/getCategories';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';

const AdminImportEntities = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [formData, setFormData] = useState({
        type: '',
        categories: [],
        googleSearchLocation: '',
        setAsUnknown: false, // Option to set location fields as "Unknown"
        city: '',
        state: '',
        country: '',
        address: '',
        facebookUrl: '',
        instagramUrl: '',
        twitterUrl: '',
        youtubeUrl: '',
        spotifyUrl: '',
        soundcloudUrl: '',
        website: '',
        phoneNumber: ''
    });

    // Entity type options
    const entityTypeOptions = [
        { value: 'performer', label: 'Performer' },
        { value: 'venue', label: 'Venue' },
        { value: 'service', label: 'Service' },
        { value: 'organizer', label: 'Organizer' }
    ];

    // Map entity type to API type parameter
    const getApiType = (entityType) => {
        const typeMap = {
            performer: 'Performer',
            venue: 'Venue',
            service: 'Service',
            organizer: 'Organizer'
        };
        return typeMap[entityType] || null;
    };

    // Fetch categories when entity type changes
    useEffect(() => {
        const fetchCategories = async () => {
            if (!formData.type) {
                setCategoryOptions([]);
                return;
            }

            const apiType = getApiType(formData.type);
            if (!apiType) {
                setCategoryOptions([]);
                return;
            }

            setLoadingCategories(true);
            try {
                const result = await dispatch(getCategories(apiType));
                if (result.status && result.data) {
                    const formatted = result.data.map((cat) => ({
                        value: cat.name,
                        label: cat.name.charAt(0).toUpperCase() + cat.name.slice(1)
                    }));
                    setCategoryOptions(formatted);
                } else {
                    setCategoryOptions([]);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error('Failed to load categories');
                setCategoryOptions([]);
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, [formData.type, dispatch]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCategoryChange = (selectedOptions) => {
        const categories = selectedOptions ? selectedOptions.map(opt => opt.value) : [];
        setFormData(prev => ({
            ...prev,
            categories
        }));
    };

    // Country, State, City options
    const countryOptions = Country.getAllCountries().map((c) => ({ value: c.isoCode, label: c.name }));
    const stateOptions = selectedCountry
        ? State.getStatesOfCountry(selectedCountry.value).map((s) => ({ value: s.isoCode, label: s.name }))
        : [];
    const cityOptions = selectedState && selectedCountry
        ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map((ci) => ({ value: ci.name, label: ci.name }))
        : [];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.type) {
            toast.error('Please select an entity type');
            return;
        }

        if (!formData.categories || formData.categories.length === 0) {
            toast.error('Please select at least one category');
            return;
        }

        // Validate: Either googleSearchLocation OR setAsUnknown must be provided for non-organizer types
        if (!formData.googleSearchLocation && !formData.setAsUnknown && formData.type !== 'organizer') {
            toast.error('Please provide Google Maps location or enable "Set Location as Unknown"');
            return;
        }

        // Check if at least one social URL is provided OR setAsUnknown is enabled
        const hasSocialUrl = formData.facebookUrl || formData.instagramUrl ||
            formData.twitterUrl || formData.youtubeUrl ||
            formData.spotifyUrl || formData.soundcloudUrl;

        if (!hasSocialUrl && !formData.googleSearchLocation && !formData.setAsUnknown) {
            toast.error('Please provide at least one social media URL, Google Maps location, or enable "Set Location as Unknown"');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                type: formData.type,
                categories: formData.categories,
                googleSearchLocation: formData.googleSearchLocation || undefined,
                setAsUnknown: formData.setAsUnknown || undefined,
                city: selectedCity ? selectedCity.label : (formData.city || undefined),
                state: selectedState ? selectedState.label : (formData.state || undefined),
                country: selectedCountry ? selectedCountry.label : (formData.country || undefined),
                address: formData.address || undefined,
                facebookUrl: formData.facebookUrl || undefined,
                instagramUrl: formData.instagramUrl || undefined,
                twitterUrl: formData.twitterUrl || undefined,
                youtubeUrl: formData.youtubeUrl || undefined,
                spotifyUrl: formData.spotifyUrl || undefined,
                soundcloudUrl: formData.soundcloudUrl || undefined,
                website: formData.website || undefined,
                phoneNumber: formData.phoneNumber || undefined
            };

            const result = await dispatch(createEntityFromUrls(payload));

            if (result.success) {
                toast.success(`${formData.type} created successfully from URLs!`);
                // Reset form
                setFormData({
                    type: '',
                    categories: [],
                    googleSearchLocation: '',
                    setAsUnknown: false,
                    city: '',
                    state: '',
                    country: '',
                    address: '',
                    facebookUrl: '',
                    instagramUrl: '',
                    twitterUrl: '',
                    youtubeUrl: '',
                    spotifyUrl: '',
                    soundcloudUrl: '',
                    website: '',
                    phoneNumber: ''
                });
                setCategoryOptions([]);
                setSelectedCountry(null);
                setSelectedState(null);
                setSelectedCity(null);
            }
        } catch (error) {
            console.error('Error creating entity:', error);
            toast.error(error.response?.data?.message || 'Failed to create entity from URLs');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
            <div className="container mx-auto p-4 md:p-6 max-w-4xl">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg">
                            <FaCloudDownloadAlt className="text-2xl text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Import Entities from URLs
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Create performers, venues, services, or organizers by providing social media links and location
                            </p>
                        </div>
                    </div>

                    {/* Info Alert */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                        <FaInfoCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                            <p className="font-semibold mb-1">How it works:</p>
                            <ul className="list-disc list-inside space-y-1 text-blue-700">
                                <li>Provide social media URLs (Facebook, Instagram, Twitter, YouTube, Spotify, SoundCloud)</li>
                                <li>Add Google Maps location URL (required for Venues, Services, and Performers)</li>
                                <li>Select entity type and categories</li>
                                <li>The system will automatically fetch and populate data from the provided URLs</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Entity Type */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Entity Type <span className="text-red-500">*</span>
                            </label>
                            <Select
                                value={entityTypeOptions.find(opt => opt.value === formData.type)}
                                onChange={(option) => {
                                    handleInputChange('type', option?.value || '');
                                    handleInputChange('categories', []); // Reset categories when type changes
                                }}
                                options={entityTypeOptions}
                                placeholder="Select entity type..."
                                isClearable
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>

                        {/* Categories */}
                        {formData.type && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Categories <span className="text-red-500">*</span>
                                    {loadingCategories && (
                                        <span className="ml-2 text-xs text-gray-500">(Loading...)</span>
                                    )}
                                </label>
                                <Select
                                    value={categoryOptions.filter(opt => formData.categories.includes(opt.value))}
                                    onChange={handleCategoryChange}
                                    options={categoryOptions}
                                    placeholder={loadingCategories ? "Loading categories..." : "Select categories..."}
                                    isMulti
                                    isLoading={loadingCategories}
                                    isDisabled={loadingCategories}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                />
                                {!loadingCategories && categoryOptions.length === 0 && formData.type && (
                                    <p className="text-xs text-yellow-600 mt-1">
                                        No categories available for this entity type
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Google Maps Location */}
                        {formData.type && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <FaMapMarkerAlt className="inline mr-2" />
                                    Google Maps Location {formData.type && formData.type !== 'organizer' && !formData.setAsUnknown && <span className="text-red-500">*</span>}
                                </label>
                                <input
                                    type="text"
                                    value={formData.googleSearchLocation}
                                    onChange={(e) => handleInputChange('googleSearchLocation', e.target.value)}
                                    placeholder="https://maps.app.goo.gl/... or Google Maps Place ID"
                                    disabled={formData.setAsUnknown}
                                    className={`w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${formData.setAsUnknown ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                />
                                {formData.type && (
                                    <div className="mt-2">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.setAsUnknown}
                                                onChange={(e) => handleInputChange('setAsUnknown', e.target.checked)}
                                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                            />
                                            <span className="text-sm text-gray-700">
                                                Set location fields as "Unknown" (skip Google Maps requirement)
                                            </span>
                                        </label>
                                    </div>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    {formData.setAsUnknown
                                        ? 'Google Maps is disabled. You can manually set location fields below, or leave them empty to use "Unknown" values.'
                                        : formData.type === 'organizer'
                                            ? 'Optional for Organizers. You can provide Google Maps location or manually set location fields below.'
                                            : 'Required for Venues, Services, and Performers (unless "Set as Unknown" is checked).'}
                                </p>
                            </div>
                        )}

                        {/* Manual Location Fields */}
                        {formData.type && (
                            <div>
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Manual Location Fields (Optional)
                                    </label>
                                    <p className="text-xs text-gray-600 mb-3">
                                        {formData.setAsUnknown
                                            ? 'You can manually set location fields below, or leave them empty to use "Unknown" values.'
                                            : formData.type === 'organizer'
                                                ? 'Set location fields manually below. You can also provide Google Maps location above.'
                                                : 'Override location fields from Google Maps by selecting them manually below.'}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Country
                                        </label>
                                        <Select
                                            value={selectedCountry}
                                            onChange={(option) => {
                                                setSelectedCountry(option);
                                                setSelectedState(null);
                                                setSelectedCity(null);
                                            }}
                                            options={countryOptions}
                                            placeholder={formData.setAsUnknown ? 'Select country or leave empty' : 'Select country...'}
                                            isClearable
                                            isSearchable
                                            className="react-select-container"
                                            classNamePrefix="react-select"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formData.setAsUnknown ? 'Leave empty to use "Unknown Country"' : 'Override country from Google Maps'}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            State
                                        </label>
                                        <Select
                                            value={selectedState}
                                            onChange={(option) => {
                                                setSelectedState(option);
                                                setSelectedCity(null);
                                            }}
                                            options={stateOptions}
                                            placeholder={formData.setAsUnknown ? 'Select state or leave empty' : 'Select state...'}
                                            isClearable
                                            isSearchable
                                            isDisabled={!selectedCountry}
                                            className="react-select-container"
                                            classNamePrefix="react-select"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formData.setAsUnknown ? 'Leave empty to use "Unknown State"' : 'Override state from Google Maps'}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            City
                                        </label>
                                        <Select
                                            value={selectedCity}
                                            onChange={(option) => {
                                                setSelectedCity(option);
                                            }}
                                            options={cityOptions}
                                            placeholder={formData.setAsUnknown ? 'Select city or leave empty' : 'Select city...'}
                                            isClearable
                                            isSearchable
                                            isDisabled={!selectedState}
                                            className="react-select-container"
                                            classNamePrefix="react-select"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formData.setAsUnknown ? 'Leave empty to use "Unknown City"' : 'Override city from Google Maps'}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            placeholder={formData.setAsUnknown ? 'Leave empty for "Unknown Address"' : 'e.g., 123 Main St'}
                                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formData.setAsUnknown ? 'Leave empty to use "Unknown Address"' : 'Override address from Google Maps'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Social Media URLs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <FaFacebook className="inline mr-2 text-blue-600" />
                                    Facebook URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.facebookUrl}
                                    onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                                    placeholder="https://www.facebook.com/..."
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <FaInstagram className="inline mr-2 text-pink-600" />
                                    Instagram URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.instagramUrl}
                                    onChange={(e) => handleInputChange('instagramUrl', e.target.value)}
                                    placeholder="https://www.instagram.com/..."
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <FaTwitter className="inline mr-2 text-blue-400" />
                                    Twitter/X URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.twitterUrl}
                                    onChange={(e) => handleInputChange('twitterUrl', e.target.value)}
                                    placeholder="https://twitter.com/... or https://x.com/..."
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <FaYoutube className="inline mr-2 text-red-600" />
                                    YouTube URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.youtubeUrl}
                                    onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                                    placeholder="https://www.youtube.com/@... or channel URL"
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <FaSpotify className="inline mr-2 text-green-600" />
                                    Spotify URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.spotifyUrl}
                                    onChange={(e) => handleInputChange('spotifyUrl', e.target.value)}
                                    placeholder="https://open.spotify.com/artist/..."
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <FaSoundcloud className="inline mr-2 text-orange-600" />
                                    SoundCloud URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.soundcloudUrl}
                                    onChange={(e) => handleInputChange('soundcloudUrl', e.target.value)}
                                    placeholder="https://soundcloud.com/..."
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Optional Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Website (Optional)
                                </label>
                                <input
                                    type="url"
                                    value={formData.website}
                                    onChange={(e) => handleInputChange('website', e.target.value)}
                                    placeholder="https://example.com"
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phone Number (Optional)
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                    placeholder="+1234567890"
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({
                                        type: '',
                                        categories: [],
                                        googleSearchLocation: '',
                                        setAsUnknown: false,
                                        city: '',
                                        state: '',
                                        country: '',
                                        address: '',
                                        facebookUrl: '',
                                        instagramUrl: '',
                                        twitterUrl: '',
                                        youtubeUrl: '',
                                        spotifyUrl: '',
                                        soundcloudUrl: '',
                                        website: '',
                                        phoneNumber: ''
                                    });
                                    setCategoryOptions([]);
                                    setSelectedCountry(null);
                                    setSelectedState(null);
                                    setSelectedCity(null);
                                }}
                                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-all duration-200 flex items-center space-x-2"
                            >
                                <FaTimes />
                                <span>Clear</span>
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Creating...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaSave />
                                        <span>Import Entity</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminImportEntities;

