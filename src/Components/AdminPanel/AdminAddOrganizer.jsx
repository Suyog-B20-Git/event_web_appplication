import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { FaUsers, FaArrowLeft, FaSave, FaTimes, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaCalendarAlt, FaTag, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { createOrganizer } from '../../redux/actions/master/Organizer/createOrganizer';
import { getCategories } from '../../redux/actions/master/Categories/getCategories';
import { Country, State, City } from 'country-state-city';
import { toast } from 'react-toastify';

const AdminAddOrganizer = ({ onBack, onCreate }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [selectedTagKeywords, setSelectedTagKeywords] = useState([]);
    const [customTag, setCustomTag] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    // Google Places Autocomplete refs and state
    const autocompleteInputRef = React.useRef(null);
    const autocompleteRef = React.useRef(null);
    const mapRefForAutocomplete = React.useRef(null);
    const markerRefForAutocomplete = React.useRef(null);
    const [selectedPlaceAddress, setSelectedPlaceAddress] = useState("");
    const [selectedPlaceLat, setSelectedPlaceLat] = useState("");
    const [selectedPlaceLng, setSelectedPlaceLng] = useState("");
    const [selectedPlaceId, setSelectedPlaceId] = useState("");

    const {
        control,
        handleSubmit,
        setValue,
        register,
        formState: { errors },
    } = useForm();

    // Update form values callback for Google Places
    const updateFormValues = useCallback((formattedAddress, placeId, lat, lng) => {
        setSelectedPlaceAddress(formattedAddress);
        setSelectedPlaceLat(lat.toString());
        setSelectedPlaceLng(lng.toString());
        setSelectedPlaceId(placeId);
        setValue('location', placeId, { shouldValidate: false });
        setValue('googleSearchLocation', formattedAddress, { shouldValidate: false });
        setValue('googleSearchLat', lat.toString(), { shouldValidate: false });
        setValue('googleSearchLong', lng.toString(), { shouldValidate: false });
    }, [setValue]);

    // Tag options for organizers
    const tagKeywordOptions = {
        Organizer: [
            { value: "Event Planner", label: "Event Planner" },
            { value: "Corporate Events", label: "Corporate Events" },
            { value: "Catering service", label: "Catering service" },
            { value: "Birthday Organizer", label: "Birthday Organizer" },
            { value: "Wedding Planner", label: "Wedding Planner" },
        ]
    };

    // Social media profiles
    const socialProfile = [
        { label: "Facebook Url", value: "facebookUrl", placeholder: "https://www.facebook.com/abc" },
        { label: "Twitter Url", value: "twitterUrl", placeholder: "https://www.twitter.com/abc" },
        { label: "Youtube Url", value: "youtubeUrl", placeholder: "https://www.youtube.com/@tseries" },
        { label: "Instagram Url", value: "instagramUrl", placeholder: "https://www.instagram.com/Adidas" },
    ];

    // Country/State/City options
    const countryOptions = Country.getAllCountries().map((country) => ({
        value: country.isoCode,
        label: country.name,
    }));

    const stateOptions = selectedCountry
        ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
            value: state.isoCode,
            label: state.name,
        }))
        : [];

    const cityOptions = selectedState
        ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map((city) => ({
            value: city.name,
            label: city.name,
        }))
        : [];

    // Fetch subcategories when component mounts (for Organizer)
    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const data = await dispatch(getCategories('Organizer'));

                const formatted = data.data?.map((sub) => ({
                    label: sub.name,
                    value: sub.name,
                })) || [];

                setSubCategoryList(formatted);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
                setSubCategoryList([]);
            }
        };

        fetchSubCategories();
    }, [dispatch]);

    // Initialize Google Maps with Places Autocomplete
    useEffect(() => {
        let isMounted = true;
        let autocompleteInstance = null;
        let markerInstance = null;
        let mapInstance = null;
        let retryCount = 0;
        const maxRetries = 10;

        const initializeAutocomplete = () => {
            if (autocompleteRef.current) {
                console.log("Autocomplete already initialized");
                return;
            }

            if (!window.google || !window.google.maps || !window.google.maps.places) {
                console.error("Google Maps API or Places library not loaded");
                if (retryCount < maxRetries) {
                    retryCount++;
                    setTimeout(initializeAutocomplete, 500);
                }
                return;
            }

            if (!mapRefForAutocomplete.current || !autocompleteInputRef.current) {
                console.log("Waiting for DOM elements...", {
                    mapRef: !!mapRefForAutocomplete.current,
                    inputRef: !!autocompleteInputRef.current
                });
                if (retryCount < maxRetries) {
                    retryCount++;
                    setTimeout(initializeAutocomplete, 300);
                }
                return;
            }

            try {
                const input = autocompleteInputRef.current;

                // Verify input element exists
                if (!input || typeof input.focus !== 'function') {
                    console.error("Input element is not valid");
                    return;
                }

                // Create map centered on India
                mapInstance = new window.google.maps.Map(mapRefForAutocomplete.current, {
                    center: {
                        lat: 20.593684,
                        lng: 78.96288
                    },
                    zoom: 5
                });

                // Create Autocomplete instance
                autocompleteInstance = new window.google.maps.places.Autocomplete(input, {
                    types: ['geocode', 'establishment'],
                    fields: ['formatted_address', 'geometry', 'place_id', 'name', 'address_components'],
                    componentRestrictions: undefined, // Allow all countries
                });

                autocompleteInstance.bindTo('bounds', mapInstance);

                // Create marker
                markerInstance = new window.google.maps.Marker({
                    map: mapInstance,
                    anchorPoint: new window.google.maps.Point(0, -29)
                });

                autocompleteRef.current = autocompleteInstance;
                markerRefForAutocomplete.current = markerInstance;

                // Handle place selection
                autocompleteInstance.addListener('place_changed', function () {
                    if (!isMounted) return;

                    markerInstance.setVisible(false);

                    const place = autocompleteInstance.getPlace();

                    if (!place.geometry) {
                        window.alert("No details available for input: '" + (place.name || '') + "'");
                        return;
                    }

                    // Update map view
                    if (place.geometry.viewport) {
                        mapInstance.fitBounds(place.geometry.viewport);
                    } else {
                        mapInstance.setCenter(place.geometry.location);
                        mapInstance.setZoom(17);
                    }

                    // Update marker position
                    markerInstance.setPosition(place.geometry.location);
                    markerInstance.setVisible(true);

                    // Extract location data
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();
                    const placeId = place.place_id;

                    // Extract address components
                    let address = '';
                    if (place.address_components) {
                        address = [
                            (place.address_components[0] && place.address_components[0].short_name || ''),
                            (place.address_components[1] && place.address_components[1].short_name || ''),
                            (place.address_components[2] && place.address_components[2].short_name || '')
                        ].join(' ');
                    }

                    const formattedAddress = place.formatted_address || address;
                    updateFormValues(formattedAddress, placeId, lat, lng);
                });

                console.log("Google Places Autocomplete initialized successfully", {
                    input: input,
                    autocomplete: autocompleteInstance
                });
            } catch (error) {
                console.error("Error initializing Google Places Autocomplete:", error);
            }
        };

        // Load Google Maps API script
        const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_OLD_MAP_MAPS_API_KEY || "AIzaSyCyhFwey6LGAKCSSYoQnfsoF37dUjFn6ys";

        if (window.google && window.google.maps && window.google.maps.places) {
            setTimeout(() => {
                if (isMounted) {
                    initializeAutocomplete();
                }
            }, 300);
        } else {
            const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');

            if (existingScript) {
                existingScript.addEventListener('load', () => {
                    setTimeout(() => {
                        if (isMounted) {
                            initializeAutocomplete();
                        }
                    }, 300);
                });
            } else {
                const callbackName = `initMap_${Date.now()}`;

                window[callbackName] = () => {
                    setTimeout(() => {
                        if (isMounted) {
                            initializeAutocomplete();
                        }
                        delete window[callbackName];
                    }, 300);
                };

                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=${callbackName}`;
                script.async = true;
                script.defer = true;

                script.onerror = () => {
                    console.error('Failed to load Google Maps API');
                    delete window[callbackName];
                };

                document.head.appendChild(script);
            }
        }

        return () => {
            isMounted = false;

            if (autocompleteInstance) {
                try {
                    window.google?.maps?.event?.clearInstanceListeners?.(autocompleteInstance);
                } catch (e) {
                    console.error("Error cleaning up autocomplete:", e);
                }
                autocompleteInstance = null;
            }

            if (markerInstance) {
                try {
                    markerInstance.setMap(null);
                } catch (e) {
                    console.error("Error cleaning up marker:", e);
                }
                markerInstance = null;
            }

            autocompleteRef.current = null;
            markerRefForAutocomplete.current = null;
        };
    }, [updateFormValues]);

    // Handle image selection
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            toast.error("No file selected");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setImageError("File size must be less than 2MB");
            return;
        }

        setImage(file);
        setImageError("");
    };

    // Handle tag keywords
    const handleTagKeywordChange = (selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
        setSelectedTagKeywords([...selectedValues, ...selectedTagKeywords.filter(tag => !tagKeywordOptions.Organizer.some(t => t.value === tag))]);
    };

    const addCustomTag = () => {
        if (customTag.trim() !== "") {
            setSelectedTagKeywords([...selectedTagKeywords, customTag.trim()]);
            setCustomTag("");
        }
    };

    const handleTagRemove = (tagToRemove) => {
        setSelectedTagKeywords(selectedTagKeywords.filter(tag => tag !== tagToRemove));
    };

    // Handle subcategory change
    const handleSubcategoryChange = (selectedOptions) => {
        let newSubCategory;
        if (Array.isArray(selectedOptions)) {
            newSubCategory = selectedOptions.map((option) => option.value);
        } else {
            newSubCategory = selectedOptions ? [selectedOptions.value] : [];
        }
        setSelectedSubCategory(newSubCategory);
    };

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const formData = new FormData();

            // Append profile image
            if (image) {
                formData.append("profileImage", image);
            }

            // Append categories
            selectedSubCategory.forEach((subCategory) =>
                formData.append("categories[]", subCategory)
            );

            // Append location data
            formData.append("country", selectedCountry ? selectedCountry.label : "");
            formData.append("state", selectedState ? selectedState.label : "");
            formData.append("city", selectedCity ? selectedCity.label : "");

            // Construct GeoJSON Point for location field (MongoDB expects this format)
            if (selectedPlaceLat && selectedPlaceLng) {
                const locationGeoJSON = {
                    type: "Point",
                    coordinates: [parseFloat(selectedPlaceLng), parseFloat(selectedPlaceLat)] // GeoJSON: [longitude, latitude]
                };
                formData.append("location", JSON.stringify(locationGeoJSON));
            }

            formData.append("name", data.listingTitle);
            formData.append("description", data.listingDescription);
            formData.append("address", selectedPlaceAddress || "");
            formData.append("googleSearchLocation", selectedPlaceId || "");
            formData.append("googleSearchLat", selectedPlaceLat || "");
            formData.append("googleSearchLong", selectedPlaceLng || "");

            // Append tags
            selectedTagKeywords.forEach((tag) => formData.append("tags[]", tag));

            // Append contact information
            if (data.phone) formData.append("phoneNumber", data.phone);
            if (data.email) formData.append("email", data.email);
            if (data.availableTime) formData.append("availableTime", data.availableTime || "9 AM to 6 PM");
            if (data.website) formData.append("website", data.website);

            // Append social media URLs
            formData.append("facebookUrl", data.facebookUrl || "");
            formData.append("instagramUrl", data.instagramUrl || "");
            formData.append("youtubeUrl", data.youtubeUrl || "");
            formData.append("twitterUrl", data.twitterUrl || "");

            // Create organizer
            await dispatch(createOrganizer(formData));
            toast.success("Organizer created successfully!");
            onCreate(formData);
        } catch (error) {
            console.error('Error creating organizer:', error);
            toast.error("Error creating organizer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
            {/* Header */}
            <header className="mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={onBack}
                            className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <FaArrowLeft className="text-gray-600" />
                        </button>
                        <div className="bg-green-100 p-2 rounded-lg">
                            <FaUsers className="text-2xl text-green-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Add New Organizer</h1>
                            <p className="text-sm text-gray-500">Create a new organizer account</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={onBack}
                            className="flex items-center bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors"
                        >
                            <FaTimes className="mr-2" /> Cancel
                        </button>
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={loading}
                            className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors disabled:opacity-50"
                        >
                            <FaSave className="mr-2" />
                            {loading ? 'Creating...' : 'Create Organizer'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Basic Information</h2>

                    {/* Subcategory Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Categories*
                        </label>
                        <Select
                            isMulti
                            options={subCategoryList}
                            onChange={(selectedOptions) => {
                                const values = selectedOptions.map((opt) => opt.value);
                                setSelectedSubCategory(values);
                            }}
                            value={subCategoryList.filter((opt) =>
                                selectedSubCategory.includes(opt.value)
                            )}
                            placeholder="Select categories..."
                            className="mb-3"
                        />
                    </div>

                    {/* Listing Title */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Organizer Name*
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter organizer name"
                            {...register("listingTitle", {
                                required: "Organizer name is required",
                            })}
                        />
                        {errors.listingTitle && (
                            <p className="text-red-500 text-sm mt-1">{errors.listingTitle.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description*
                        </label>
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
                            rows={4}
                            placeholder="Enter organizer description"
                            {...register("listingDescription", {
                                required: "Description is required",
                            })}
                        />
                        {errors.listingDescription && (
                            <p className="text-red-500 text-sm mt-1">{errors.listingDescription.message}</p>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Tag Keywords:
                        </label>
                        <Select
                            isMulti
                            options={tagKeywordOptions.Organizer || []}
                            onChange={handleTagKeywordChange}
                            value={(tagKeywordOptions.Organizer || []).filter(
                                (opt) => selectedTagKeywords.includes(opt.value)
                            )}
                            className="mb-3"
                            placeholder="Select tags..."
                        />

                        <div className="flex gap-2 max-w-[500px]">
                            <input
                                type="text"
                                value={customTag}
                                onChange={(e) => setCustomTag(e.target.value)}
                                placeholder="Type to add custom tag..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                type="button"
                                onClick={addCustomTag}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                            >
                                Add
                            </button>
                        </div>

                        {selectedTagKeywords.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {selectedTagKeywords.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm flex items-center"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            className="text-gray-800 hover:text-red-500 font-bold ml-2"
                                            onClick={() => handleTagRemove(tag)}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Location Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Location Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Country */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Country*
                            </label>
                            <Controller
                                name="country"
                                control={control}
                                rules={{ required: "Please select a country" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isClearable
                                        options={countryOptions}
                                        placeholder="Search country..."
                                        onChange={(selectedOption) => {
                                            field.onChange(selectedOption);
                                            setSelectedCountry(selectedOption);
                                            setValue("state", null);
                                            setValue("city", null);
                                        }}
                                        value={selectedCountry}
                                    />
                                )}
                            />
                            {errors.country && (
                                <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                            )}
                        </div>

                        {/* State */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                State*
                            </label>
                            <Controller
                                name="state"
                                control={control}
                                rules={{ required: "Please select a state" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isClearable
                                        isDisabled={!selectedCountry}
                                        options={stateOptions}
                                        placeholder="Search state..."
                                        onChange={(selectedOption) => {
                                            field.onChange(selectedOption);
                                            setSelectedState(selectedOption);
                                            setValue("city", null);
                                        }}
                                        value={selectedState}
                                    />
                                )}
                            />
                            {errors.state && (
                                <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* City */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                City*
                            </label>
                            <Controller
                                name="city"
                                control={control}
                                rules={{
                                    required: selectedState ? "Please select a city" : "Select a state first",
                                }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isClearable
                                        options={cityOptions}
                                        placeholder="Search city..."
                                        isDisabled={!selectedState}
                                        onChange={(selectedOption) => {
                                            field.onChange(selectedOption);
                                            setSelectedCity(selectedOption);
                                        }}
                                        value={selectedCity}
                                    />
                                )}
                            />
                            {errors.city && (
                                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                            )}
                        </div>

                        {/* Location */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location*
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                ref={autocompleteInputRef}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter a location (start typing to see suggestions)"
                                autoComplete="off"
                                defaultValue={selectedPlaceAddress}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSelectedPlaceAddress(value);
                                    setValue('location', value, { shouldValidate: false });
                                }}
                                onBlur={(e) => {
                                    const value = e.target.value || selectedPlaceAddress || '';
                                    setValue('location', value, { shouldValidate: true });
                                }}
                                required
                            />
                            {errors.location && (
                                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                            )}
                            {/* Hidden fields for latitude, longitude, and place_id */}
                            <input type="hidden" name="latitude" value={selectedPlaceLat} />
                            <input type="hidden" name="longitude" value={selectedPlaceLng} />
                            <input type="hidden" name="place_id" value={selectedPlaceId} />
                            {/* Ensure Google Autocomplete dropdown is visible */}
                            <style>{`
                                .pac-container {
                                    z-index: 9999 !important;
                                    border-radius: 8px;
                                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                                }
                                .pac-item {
                                    padding: 8px;
                                    cursor: pointer;
                                }
                                .pac-item:hover {
                                    background-color: #f0f0f0;
                                }
                            `}</style>
                        </div>
                    </div>

                    {/* Map Container */}
                    <div className="mt-4">
                        <div id="map" ref={mapRefForAutocomplete} style={{ height: '300px', width: '100%', borderRadius: '8px' }}></div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter phone number"
                                {...register("phone", {
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message: "Enter a valid 10-digit phone number",
                                    },
                                })}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter email"
                                {...register("email", {
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Enter a valid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Website */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Website
                            </label>
                            <input
                                type="url"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter website URL"
                                {...register("website")}
                            />
                        </div>

                        {/* Available Time */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Available Time*
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="e.g., 9 AM to 6 PM"
                                {...register("availableTime", {
                                    required: "Available time is required",
                                })}
                            />
                            {errors.availableTime && (
                                <p className="text-red-500 text-sm mt-1">{errors.availableTime.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile Image Upload */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Image</h2>

                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Profile Image*
                        </label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
                        <p className="text-gray-500 text-sm mt-1">Image size must be less than 2MB</p>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Social Media</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {socialProfile.map((item, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {item.label}
                                </label>
                                <input
                                    type="url"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder={item.placeholder}
                                    {...register(item.value)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminAddOrganizer; 