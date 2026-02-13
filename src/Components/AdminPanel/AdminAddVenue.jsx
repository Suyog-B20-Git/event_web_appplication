import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import { FaBuilding, FaArrowLeft, FaSave } from 'react-icons/fa';

import { createVenue } from '../../redux/actions/master/Venue/createVenue';
import { getCategories } from '../../redux/actions/master/Categories/getCategories';

const AdminAddVenue = ({ onBack, onCreate }) => {
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [coverImageError, setCoverImageError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = 'success') => {
        setToast({ message: msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const {
        control,
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            listingTitle: '',
            listingDescription: '',
            type: '',
            amenities: '',
            noOfSeatedGuest: '',
            noOfStandingGuest: '',
            neighbourhoods: '',
            pricing: '',
            foodAndBeveragesDetails: '',
            quotedForm: '',
            availability: '',
            zipcode: '',
            phone: '',
            email: '',
            website: '',
            availableTime: '',
            location: '',
        }
    });

    // Google Places Autocomplete refs and state
    const autocompleteInputRef = React.useRef(null);
    const autocompleteRef = React.useRef(null);
    const mapRefForAutocomplete = React.useRef(null);
    const markerRefForAutocomplete = React.useRef(null);
    const [selectedPlaceAddress, setSelectedPlaceAddress] = useState('');
    const [selectedPlaceLat, setSelectedPlaceLat] = useState('');
    const [selectedPlaceLng, setSelectedPlaceLng] = useState('');
    const [selectedPlaceId, setSelectedPlaceId] = useState('');

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

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const data = await dispatch(getCategories('Venue'));
                const formatted = data.data?.map((sub) => ({ label: sub.name, value: sub.name })) || [];
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
        const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_OLD_MAP_MAPS_API_KEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyCyhFwey6LGAKCSSYoQnfsoF37dUjFn6ys";
        if (!GOOGLE_MAPS_API_KEY) {
            console.error('Google Maps API key is not defined. Please set VITE_OLD_MAP_MAPS_API_KEY in your .env file');
            return;
        }

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

    const countryOptions = Country.getAllCountries().map((c) => ({ value: c.isoCode, label: c.name }));
    const stateOptions = selectedCountry
        ? State.getStatesOfCountry(selectedCountry.value).map((s) => ({ value: s.isoCode, label: s.name }))
        : [];
    const cityOptions = selectedState && selectedCountry
        ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map((ci) => ({ value: ci.name, label: ci.name }))
        : [];

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            setImageError('Image size must be less than 2MB');
            return;
        }
        setImage(file);
        setImageError('');
    };

    const handleCoverImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            setCoverImageError('Cover image size must be less than 2MB');
            return;
        }
        setCoverImage(file);
        setCoverImageError('');
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();

            // images
            if (image) formData.append('profileImage', image);
            if (coverImage) formData.append('coverImage', coverImage);

            // categories (required)
            if (Array.isArray(data.categories)) {
                data.categories.forEach((c) => formData.append('categories[]', c.value || c));
            }

            // location fields
            formData.append('country', selectedCountry ? selectedCountry.label : '');
            formData.append('state', selectedState ? selectedState.label : '');
            formData.append('city', selectedCity ? selectedCity.label : '');

            // Construct GeoJSON Point for location field (MongoDB expects this format)
            if (selectedPlaceLat && selectedPlaceLng) {
                const locationGeoJSON = {
                    type: "Point",
                    coordinates: [parseFloat(selectedPlaceLng), parseFloat(selectedPlaceLat)] // GeoJSON: [longitude, latitude]
                };
                formData.append("location", JSON.stringify(locationGeoJSON));
            }

            formData.append('googleSearchLocation', selectedPlaceId || '');
            formData.append('googleSearchLat', selectedPlaceLat || '');
            formData.append('googleSearchLong', selectedPlaceLng || '');

            // basics
            formData.append('name', data.listingTitle || '');
            formData.append('description', data.listingDescription || '');
            formData.append('address', selectedPlaceAddress || '');
            if (data.type) formData.append('type', data.type);
            if (data.amenities) formData.append('amenities', data.amenities);
            if (data.noOfSeatedGuest) formData.append('noOfSeatedGuest', data.noOfSeatedGuest);
            if (data.noOfStandingGuest) formData.append('noOfStandingGuest', data.noOfStandingGuest);
            if (data.neighbourhoods) formData.append('neighbourhoods', data.neighbourhoods);
            if (data.pricing) formData.append('pricing', data.pricing);
            if (data.foodAndBeveragesDetails) formData.append('foodAndBeveragesDetails', data.foodAndBeveragesDetails);
            if (data.quotedForm) formData.append('quotedForm', data.quotedForm);
            if (data.availability) formData.append('availability', data.availability);
            if (data.zipcode) formData.append('zipcode', data.zipcode);

            // contact
            if (data.phone) formData.append('phoneNumber', data.phone);
            if (data.email) formData.append('email', data.email);
            if (data.website) formData.append('website', data.website);
            if (data.availableTime) formData.append('availableTime', data.availableTime);

            // socials (optional)
            if (data.facebookUrl) formData.append('facebookUrl', data.facebookUrl);
            if (data.instagramUrl) formData.append('instagramUrl', data.instagramUrl);
            if (data.youtubeUrl) formData.append('youtubeUrl', data.youtubeUrl);
            if (data.twitterUrl) formData.append('twitterUrl', data.twitterUrl);

            await dispatch(createVenue(formData));
            showToast("Venue created successfully!");
            // Delay navigation so user can see the success toast
            setTimeout(() => {
                onCreate?.();
                onBack?.();
            }, 500);
        } catch (err) {
            console.error("Error creating venue:", err);
            const errorMessage = err.response?.data?.message || "Failed to create venue. Please try again.";
            showToast(`${errorMessage}`, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
            <header className="mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <button onClick={onBack} className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                            <FaArrowLeft className="text-gray-600" />
                        </button>
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <FaBuilding className="text-2xl text-indigo-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Add Venue</h1>
                        </div>
                    </div>
                    <button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors disabled:opacity-50">
                        <FaSave className="mr-2" /> {isSubmitting ? 'Saving...' : 'Create Venue'}
                    </button>
                </div>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Basic Information</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Venue Categories*</label>
                        <Controller
                            name="categories"
                            control={control}
                            rules={{ required: 'Please select at least one category' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isMulti
                                    options={subCategoryList}
                                    placeholder="Select categories..."
                                />
                            )}
                        />
                        {errors.categories && <p className="text-red-500 text-sm mt-1">{errors.categories.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Venue Name*</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Listing Title" {...register('listingTitle', { required: 'Venue name is required' })} />
                        {errors.listingTitle && <p className="text-red-500 text-sm mt-1">{errors.listingTitle.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description*</label>
                        <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y" rows={4} placeholder="Enter Description" {...register('listingDescription', { required: 'Description is required' })} />
                        {errors.listingDescription && <p className="text-red-500 text-sm mt-1">{errors.listingDescription.message}</p>}
                    </div>
                </div>

                {/* Venue Details */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Venue Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Venue Type</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="eg. cinema,theater,stadium" {...register('type')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Amenities*</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter Amenities" {...register('amenities')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">No of Seated Guest*</label>
                            <input type="number" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter no of seated guest" {...register('noOfSeatedGuest')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">No of Standing Guest*</label>
                            <input type="number" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter no of standing guest" {...register('noOfStandingGuest')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Neighbourhoods</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter neighbourhood" {...register('neighbourhoods')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pricing</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter pricing" {...register('pricing')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Food and Beverages Details</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter food beverage details" {...register('foodAndBeveragesDetails')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Quoted Form</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter quoted Form like per hour/day" {...register('quotedForm')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter availability" {...register('availability')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter ZIP Code" {...register('zipcode')} />
                        </div>
                    </div>
                </div>

                {/* Location and map */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Location and map</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Country*</label>
                            <Controller
                                name="country"
                                control={control}
                                rules={{ required: 'Please select a country' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isClearable
                                        options={countryOptions}
                                        placeholder="Search country..."
                                        onChange={(opt) => {
                                            field.onChange(opt);
                                            setSelectedCountry(opt);
                                            setValue('state', null);
                                            setValue('city', null);
                                        }}
                                        value={selectedCountry}
                                    />
                                )}
                            />
                            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">States*</label>
                            <Controller
                                name="state"
                                control={control}
                                rules={{ required: 'Please select a state' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isClearable
                                        isDisabled={!selectedCountry}
                                        options={stateOptions}
                                        placeholder="Search state..."
                                        onChange={(opt) => {
                                            field.onChange(opt);
                                            setSelectedState(opt);
                                            setValue('city', null);
                                        }}
                                        value={selectedState}
                                    />
                                )}
                            />
                            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City*</label>
                            <Controller
                                name="city"
                                control={control}
                                rules={{ required: selectedState ? 'Please select a city' : 'Select a state first' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isClearable
                                        options={cityOptions}
                                        placeholder="Search city..."
                                        isDisabled={!selectedState}
                                        onChange={(opt) => {
                                            field.onChange(opt);
                                            setSelectedCity(opt);
                                        }}
                                        value={selectedCity}
                                    />
                                )}
                            />
                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location*</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                ref={autocompleteInputRef}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

                {/* Images */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Profile Image*</h2>
                    <input type="file" onChange={handleImageChange} accept="image/*" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
                    <p className="text-gray-500 text-sm mt-1">Image size must be less than 2MB</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Cover Image</h2>
                    <input type="file" onChange={handleCoverImageChange} accept="image/*" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    {coverImageError && <p className="text-red-500 text-sm mt-1">{coverImageError}</p>}
                    <p className="text-gray-500 text-sm mt-1">Cover image size must be less than 2MB</p>
                </div>

                {/* Social Profiles */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Social Profiles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Url</label>
                            <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://www.facebook.com/abc" {...register('facebookUrl')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Url</label>
                            <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://www.twitter.com/abc" {...register('twitterUrl')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Youtube Url</label>
                            <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://www.youtube.com/@tseries" {...register('youtubeUrl')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Url</label>
                            <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://www.instagram.com/Adidas" {...register('instagramUrl')} />
                        </div>
                    </div>
                </div>
            </form>

            {/* Toast Notification */}
            {toast && (
                <div className={`fixed top-4 right-4 text-white px-4 py-2 rounded shadow-md z-50 transition-all duration-300 ${
                    toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'
                }`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default AdminAddVenue;


