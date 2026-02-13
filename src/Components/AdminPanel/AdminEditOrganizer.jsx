import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { FaUsers, FaArrowLeft, FaSave, FaTimes, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaCalendarAlt, FaTag, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { updateOrganizer } from '../../redux/actions/master/Organizer/updateOrganizer';
import { getCategories } from '../../redux/actions/master/Categories/getCategories';
import { Country, State, City } from 'country-state-city';
import { toast } from 'react-toastify';

const AdminEditOrganizer = ({ organizer, onBack, onUpdate }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
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
    const mapInstanceRef = React.useRef(null);
    const locationDataInitializedRef = React.useRef(false);
    const [selectedPlaceAddress, setSelectedPlaceAddress] = useState("");
    const [selectedPlaceLat, setSelectedPlaceLat] = useState("");
    const [selectedPlaceLng, setSelectedPlaceLng] = useState("");
    const [selectedPlaceId, setSelectedPlaceId] = useState("");

    const {
        control,
        handleSubmit,
        setValue,
        register,
        reset,
        formState: { errors },
    } = useForm();

    // Google Maps API Key - access at component level
    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_OLD_MAP_MAPS_API_KEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyCyhFwey6LGAKCSSYoQnfsoF37dUjFn6ys";

    // Debug: Log API key access (remove in production)
    if (process.env.NODE_ENV === 'development') {
        console.log('AdminEditOrganizer - API Key check:', {
            VITE_OLD_MAP_MAPS_API_KEY: import.meta.env.VITE_OLD_MAP_MAPS_API_KEY ? 'defined' : 'undefined',
            VITE_GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? 'defined' : 'undefined',
            finalKey: GOOGLE_MAPS_API_KEY ? 'defined' : 'undefined'
        });
    }

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
                mapInstanceRef.current = mapInstance;

                // If editing and a Place ID exists, center map using PlacesService immediately
                if (organizer && organizer.googleSearchLocation && organizer.googleSearchLocation.startsWith('ChI')) {
                    try {
                        const placesService = new window.google.maps.places.PlacesService(mapInstance);
                        placesService.getDetails(
                            {
                                placeId: organizer.googleSearchLocation,
                                fields: ['formatted_address', 'geometry', 'place_id', 'name', 'address_components']
                            },
                            (place, status) => {
                                if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
                                    const lat = place.geometry.location.lat();
                                    const lng = place.geometry.location.lng();
                                    mapInstance.setCenter({ lat, lng });
                                    mapInstance.setZoom(15);
                                    markerInstance.setPosition({ lat, lng });
                                    markerInstance.setVisible(true);
                                    const formattedAddress = place.formatted_address || organizer.address || '';
                                    updateFormValues(formattedAddress, place.place_id, lat, lng);
                                    if (autocompleteInputRef.current) {
                                        autocompleteInputRef.current.value = formattedAddress;
                                    }
                                }
                            }
                        );
                    } catch { }
                } else if (organizer && organizer.googleSearchLat && organizer.googleSearchLong) {
                    const lat = parseFloat(organizer.googleSearchLat);
                    const lng = parseFloat(organizer.googleSearchLong);
                    if (!isNaN(lat) && !isNaN(lng)) {
                        mapInstance.setCenter({ lat, lng });
                        mapInstance.setZoom(15);
                        markerInstance.setPosition({ lat, lng });
                        markerInstance.setVisible(true);
                    }
                } else if (organizer && organizer.location?.coordinates) {
                    const [lng, lat] = organizer.location.coordinates;
                    if (!isNaN(lat) && !isNaN(lng)) {
                        mapInstance.setCenter({ lat, lng });
                        mapInstance.setZoom(15);
                        markerInstance.setPosition({ lat, lng });
                        markerInstance.setVisible(true);
                    }
                }

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
            mapInstanceRef.current = null;
        };
    }, [updateFormValues]);

    // Update map with existing organizer location after map is initialized
    useEffect(() => {
        if (!organizer || !mapInstanceRef.current || !markerRefForAutocomplete.current) {
            return;
        }

        // Wait a bit for map to be ready
        const updateMapLocation = setTimeout(() => {
            if (!window.google || !window.google.maps || !window.google.maps.places) {
                return;
            }

            const mapInstance = mapInstanceRef.current;
            const marker = markerRefForAutocomplete.current;

            if (!mapInstance || !marker) {
                return;
            }

            // If we have a Place ID, use Places Service to get details
            if (organizer.googleSearchLocation && organizer.googleSearchLocation.startsWith('ChI')) {
                const placesService = new window.google.maps.places.PlacesService(mapInstance);
                const placeId = organizer.googleSearchLocation;

                placesService.getDetails(
                    {
                        placeId: placeId,
                        fields: ['formatted_address', 'geometry', 'place_id', 'name', 'address_components']
                    },
                    (place, status) => {
                        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
                            // Center map on place location
                            if (place.geometry && place.geometry.location) {
                                const lat = place.geometry.location.lat();
                                const lng = place.geometry.location.lng();

                                mapInstance.setCenter({ lat, lng });
                                mapInstance.setZoom(15);

                                // Show marker at place location
                                marker.setPosition({ lat, lng });
                                marker.setVisible(true);

                                // Update form values with place details
                                const formattedAddress = place.formatted_address || organizer.address || '';
                                updateFormValues(formattedAddress, place.place_id, lat, lng);

                                // Update input field value
                                if (autocompleteInputRef.current) {
                                    autocompleteInputRef.current.value = formattedAddress;
                                }
                            }
                        } else {
                            // Fallback to coordinates if Place ID lookup fails
                            if (organizer.googleSearchLat && organizer.googleSearchLong) {
                                const lat = parseFloat(organizer.googleSearchLat);
                                const lng = parseFloat(organizer.googleSearchLong);

                                if (!isNaN(lat) && !isNaN(lng)) {
                                    mapInstance.setCenter({ lat, lng });
                                    mapInstance.setZoom(15);
                                    marker.setPosition({ lat, lng });
                                    marker.setVisible(true);
                                }
                            } else if (organizer.location && organizer.location.coordinates) {
                                // Use location coordinates as last resort
                                const [lng, lat] = organizer.location.coordinates;
                                if (!isNaN(lat) && !isNaN(lng)) {
                                    mapInstance.setCenter({ lat, lng });
                                    mapInstance.setZoom(15);
                                    marker.setPosition({ lat, lng });
                                    marker.setVisible(true);
                                }
                            }
                        }
                    }
                );
            } else if (organizer.googleSearchLat && organizer.googleSearchLong) {
                // Fallback: Use coordinates directly
                const lat = parseFloat(organizer.googleSearchLat);
                const lng = parseFloat(organizer.googleSearchLong);

                if (!isNaN(lat) && !isNaN(lng)) {
                    mapInstance.setCenter({ lat, lng });
                    mapInstance.setZoom(15);
                    marker.setPosition({ lat, lng });
                    marker.setVisible(true);
                }
            } else if (organizer.location && organizer.location.coordinates) {
                // Last resort: Use location coordinates
                const [lng, lat] = organizer.location.coordinates;
                if (!isNaN(lat) && !isNaN(lng)) {
                    mapInstance.setCenter({ lat, lng });
                    mapInstance.setZoom(15);
                    marker.setPosition({ lat, lng });
                    marker.setVisible(true);
                }
            }
        }, 800); // Increased timeout to ensure map is fully ready

        return () => clearTimeout(updateMapLocation);
    }, [organizer?._id, organizer?.googleSearchLocation, organizer?.googleSearchLat, organizer?.googleSearchLong, organizer?.location, updateFormValues]);

    // Pre-fill form data when organizer changes
    useEffect(() => {
        if (!organizer) {
            setFormLoading(false);
            locationDataInitializedRef.current = false;
            return;
        }

        // Reset the initialization flag when organizer changes
        locationDataInitializedRef.current = false;

        // Reset form with organizer data
        reset({
            listingTitle: organizer.name || '',
            listingDescription: organizer.description || '',
            phone: organizer.phoneNumber || '',
            email: organizer.email || '',
            website: organizer.website || '',
            availableTime: organizer.availableTime || '',
            facebookUrl: organizer.facebookUrl || '',
            instagramUrl: organizer.instagramUrl || '',
            twitterUrl: organizer.twitterUrl || '',
            youtubeUrl: organizer.youtubeUrl || '',
            location: organizer.googleSearchLocation || '', // Pre-fill location field
        });

        // Set categories
        setSelectedSubCategory(organizer.categories || []);

        // Pre-fill Google Places location data
        // Use address (human-readable) for display, googleSearchLocation (place ID) for place_id
        if (organizer.address && organizer.address !== 'not specified') {
            setSelectedPlaceAddress(organizer.address);
        } else if (organizer.googleSearchLocation) {
            // If no address, use googleSearchLocation (might be place ID or address)
            setSelectedPlaceAddress(organizer.googleSearchLocation);
        }

        if (organizer.googleSearchLocation) {
            setSelectedPlaceId(organizer.googleSearchLocation);
        }

        // Handle lat/lng - they might not exist in the response
        if (organizer.googleSearchLat) {
            setSelectedPlaceLat(organizer.googleSearchLat.toString());
        }
        if (organizer.googleSearchLong) {
            setSelectedPlaceLng(organizer.googleSearchLong.toString());
        }

        // Set tags
        setSelectedTagKeywords(organizer.tags || []);

        // Set location data with proper async handling
        const setLocationData = async () => {
            // Guard: Don't re-set if already initialized for this organizer
            if (locationDataInitializedRef.current) {
                setFormLoading(false);
                return;
            }

            try {
                // Helper function to find country by state name
                const findCountryByState = (stateName) => {
                    for (const country of Country.getAllCountries()) {
                        const states = State.getStatesOfCountry(country.isoCode);
                        const foundState = states.find(s => s.name === stateName);
                        if (foundState) {
                            return country;
                        }
                    }
                    return null;
                };

                // Helper function to find country by city name
                const findCountryByCity = (cityName) => {
                    for (const country of Country.getAllCountries()) {
                        const states = State.getStatesOfCountry(country.isoCode);
                        for (const state of states) {
                            const cities = City.getCitiesOfState(country.isoCode, state.isoCode);
                            const foundCity = cities.find(c => c.name === cityName);
                            if (foundCity) {
                                return country;
                            }
                        }
                    }
                    return null;
                };

                let countryToUse = null;

                // Try to find country from organizer data
                if (organizer.country) {
                    countryToUse = Country.getAllCountries().find(c => c.name === organizer.country);
                }

                // If no country found, try to find it from state
                if (!countryToUse && organizer.state) {
                    countryToUse = findCountryByState(organizer.state);
                }

                // If still no country found, try to find it from city
                if (!countryToUse && organizer.city) {
                    countryToUse = findCountryByCity(organizer.city);
                }

                if (countryToUse) {
                    const countryOption = {
                        value: countryToUse.isoCode,
                        label: countryToUse.name
                    };

                    setSelectedCountry(countryOption);
                    setValue("country", countryOption);

                    // Wait for state options to update
                    await new Promise(resolve => setTimeout(resolve, 200));

                    // Set state
                    if (organizer.state) {
                        const updatedStateOptions = State.getStatesOfCountry(countryToUse.isoCode).map((state) => ({
                            value: state.isoCode,
                            label: state.name,
                        }));

                        const stateOption = updatedStateOptions.find(s => s.label === organizer.state);

                        if (stateOption) {
                            setSelectedState(stateOption);
                            setValue("state", stateOption);

                            // Wait for city options to update
                            await new Promise(resolve => setTimeout(resolve, 200));

                            // Set city
                            if (organizer.city) {
                                const updatedCityOptions = City.getCitiesOfState(countryToUse.isoCode, stateOption.value).map((city) => ({
                                    value: city.name,
                                    label: city.name,
                                }));

                                const cityOption = updatedCityOptions.find(c => c.label === organizer.city);

                                if (cityOption) {
                                    setSelectedCity(cityOption);
                                    setValue("city", cityOption);
                                }
                            }
                        }
                    }
                }

                // Mark as initialized to prevent re-running
                locationDataInitializedRef.current = true;
            } catch (error) {
                console.error('Error setting location data:', error);
            } finally {
                setFormLoading(false);
            }
        };

        setLocationData();
    }, [organizer?._id, reset, setValue]); // Only depend on organizer ID, not the whole object

    // Update state options when country changes
    useEffect(() => {
        if (selectedCountry && organizer?.state) {
            // If the current state doesn't match the new country, clear it
            const currentStateOptions = State.getStatesOfCountry(selectedCountry.value).map((state) => ({
                value: state.isoCode,
                label: state.name,
            }));

            const stateOption = currentStateOptions.find(s => s.label === organizer.state);
            if (!stateOption) {
                // State doesn't exist in new country, clear it
                setSelectedState(null);
                setSelectedCity(null);
                setValue("state", null);
                setValue("city", null);
            }
        }
    }, [selectedCountry, organizer?.state, setValue]);

    // Update city options when state changes
    useEffect(() => {
        if (selectedState && selectedCountry && organizer?.city) {
            // If the current city doesn't match the new state, clear it
            const currentCityOptions = City.getCitiesOfState(selectedCountry.value, selectedState.value).map((city) => ({
                value: city.name,
                label: city.name,
            }));

            const cityOption = currentCityOptions.find(c => c.label === organizer.city);
            if (!cityOption) {
                // City doesn't exist in new state, clear it
                setSelectedCity(null);
                setValue("city", null);
            }
        }
    }, [selectedState, selectedCountry, organizer?.city, setValue]);

    // Handle image selection
    const handleImageChange = (event) => {
        setImageLoading(true);
        const file = event.target.files[0];
        if (!file) {
            toast.error("No file selected");
            setImageLoading(false);
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setImageError("File size must be less than 2MB");
            setImageLoading(false);
            return;
        }

        setImage(file);
        setImageError("");
        setImageLoading(false);
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

            // Append profile image if new one is selected
            if (image) {
                formData.append("profileImage", image);
            }

            // Append categories
            selectedSubCategory.forEach((subCategory) =>
                formData.append("categories[]", subCategory)
            );

            // Append location data
            formData.append("country", selectedCountry ? selectedCountry.label : organizer.country || "");
            formData.append("state", selectedState ? selectedState.label : organizer.state || "");
            formData.append("city", selectedCity ? selectedCity.label : organizer.city || "");

            // Construct GeoJSON Point for location field (MongoDB expects this format)
            const lat = selectedPlaceLat || organizer.googleSearchLat;
            const lng = selectedPlaceLng || organizer.googleSearchLong;
            if (lat && lng) {
                const locationGeoJSON = {
                    type: "Point",
                    coordinates: [parseFloat(lng), parseFloat(lat)] // GeoJSON: [longitude, latitude]
                };
                formData.append("location", JSON.stringify(locationGeoJSON));
            }

            formData.append("name", data.listingTitle);
            formData.append("description", data.listingDescription);
            formData.append("address", selectedPlaceAddress || organizer.address || "");
            formData.append("googleSearchLocation", selectedPlaceId || organizer.googleSearchLocation || "");
            formData.append("googleSearchLat", lat || "");
            formData.append("googleSearchLong", lng || "");

            // Append tags
            selectedTagKeywords.forEach((tag) => formData.append("tags[]", tag));

            // Append contact information
            if (data.phone) formData.append("phoneNumber", data.phone);
            if (data.email) formData.append("email", data.email);
            if (data.availableTime) formData.append("availableTime", data.availableTime);
            if (data.website) formData.append("website", data.website);

            // Append social media URLs
            formData.append("facebookUrl", data.facebookUrl || "");
            formData.append("instagramUrl", data.instagramUrl || "");
            formData.append("youtubeUrl", data.youtubeUrl || "");
            formData.append("twitterUrl", data.twitterUrl || "");

            // Update organizer
            await dispatch(updateOrganizer(organizer._id, formData));
            toast.success("Organizer updated successfully!");
            onUpdate(formData);
        } catch (error) {
            console.error('Error updating organizer:', error);
            toast.error("Error updating organizer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!organizer) {
        return (
            <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                    <FaUsers className="mx-auto text-5xl text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700">Organizer Not Found</h3>
                    <p className="text-gray-500 mt-2">The organizer you're trying to edit doesn't exist or couldn't be loaded.</p>
                    <button
                        onClick={onBack}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                        <FaArrowLeft className="mr-2 inline" />
                        Back to Organizers
                    </button>
                </div>
            </div>
        );
    }

    if (formLoading) {
        return (
            <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <h3 className="text-xl font-semibold text-gray-700">Loading Organizer Data...</h3>
                    <p className="text-gray-500 mt-2">Please wait while we prepare the form with organizer information.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
            {imageLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-xl">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Processing image…</h3>
                            <p className="text-sm text-gray-500">Please wait, this may take a moment.</p>
                        </div>
                    </div>
                </div>
            )}
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
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <FaUsers className="text-2xl text-indigo-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Edit Organizer</h1>
                            {/* <p className="text-sm text-gray-500">Organizer ID: {organizer._id}</p> */}
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
                            className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors disabled:opacity-50"
                        >
                            <FaSave className="mr-2" />
                            {loading ? 'Saving...' : 'Save Changes'}
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
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
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={addCustomTag}
                                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
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

                    {/* Debug Info - Show current values */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-medium text-gray-700">Current Location Data:</h3>
                            <button
                                type="button"
                                onClick={() => {
                                    // Reset and re-set location data
                                    setSelectedCountry(null);
                                    setSelectedState(null);
                                    setSelectedCity(null);
                                    setValue("country", null);
                                    setValue("state", null);
                                    setValue("city", null);

                                    // Re-run the location setup with improved logic
                                    const setLocationData = async () => {
                                        try {
                                            // Helper function to find country by state name
                                            const findCountryByState = (stateName) => {
                                                for (const country of Country.getAllCountries()) {
                                                    const states = State.getStatesOfCountry(country.isoCode);
                                                    const foundState = states.find(s => s.name === stateName);
                                                    if (foundState) {
                                                        return country;
                                                    }
                                                }
                                                return null;
                                            };

                                            // Helper function to find country by city name
                                            const findCountryByCity = (cityName) => {
                                                for (const country of Country.getAllCountries()) {
                                                    const states = State.getStatesOfCountry(country.isoCode);
                                                    for (const state of states) {
                                                        const cities = City.getCitiesOfState(country.isoCode, state.isoCode);
                                                        const foundCity = cities.find(c => c.name === cityName);
                                                        if (foundCity) {
                                                            return country;
                                                        }
                                                    }
                                                }
                                                return null;
                                            };

                                            let countryToUse = null;

                                            // Try to find country from organizer data
                                            if (organizer.country) {
                                                countryToUse = Country.getAllCountries().find(c => c.name === organizer.country);
                                            }

                                            // If no country found, try to find it from state
                                            if (!countryToUse && organizer.state) {
                                                countryToUse = findCountryByState(organizer.state);
                                            }

                                            // If still no country found, try to find it from city
                                            if (!countryToUse && organizer.city) {
                                                countryToUse = findCountryByCity(organizer.city);
                                            }

                                            if (countryToUse) {
                                                const countryOption = {
                                                    value: countryToUse.isoCode,
                                                    label: countryToUse.name
                                                };

                                                setSelectedCountry(countryOption);
                                                setValue("country", countryOption);

                                                // Wait for state options to update
                                                await new Promise(resolve => setTimeout(resolve, 200));

                                                // Set state
                                                if (organizer.state) {
                                                    const updatedStateOptions = State.getStatesOfCountry(countryToUse.isoCode).map((state) => ({
                                                        value: state.isoCode,
                                                        label: state.name,
                                                    }));

                                                    const stateOption = updatedStateOptions.find(s => s.label === organizer.state);

                                                    if (stateOption) {
                                                        setSelectedState(stateOption);
                                                        setValue("state", stateOption);

                                                        // Wait for city options to update
                                                        await new Promise(resolve => setTimeout(resolve, 200));

                                                        // Set city
                                                        if (organizer.city) {
                                                            const updatedCityOptions = City.getCitiesOfState(countryToUse.isoCode, stateOption.value).map((city) => ({
                                                                value: city.name,
                                                                label: city.name,
                                                            }));

                                                            const cityOption = updatedCityOptions.find(c => c.label === organizer.city);

                                                            if (cityOption) {
                                                                setSelectedCity(cityOption);
                                                                setValue("city", cityOption);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        } catch (error) {
                                            console.error('Error setting location data:', error);
                                        }
                                    };

                                    setLocationData();
                                }}
                                className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                            >
                                Reset & Refresh Location
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div><strong>Country:</strong> {organizer.country || 'Not set'}</div>
                            <div><strong>State:</strong> {organizer.state || 'Not set'}</div>
                            <div><strong>City:</strong> {organizer.city || 'Not set'}</div>
                            <div><strong>Google Maps Location:</strong> {organizer.googleSearchLocation || 'Not set'}</div>
                            <div><strong>Selected Country:</strong> {selectedCountry?.label || 'Not selected'}</div>
                            <div><strong>Selected State:</strong> {selectedState?.label || 'Not selected'}</div>
                            <div><strong>Selected City:</strong> {selectedCity?.label || 'Not selected'}</div>
                        </div>
                        {/* Status indicators */}
                        <div className="mt-3 flex gap-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${selectedCountry ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {selectedCountry ? '✓ Country Set' : '✗ Country Not Set'}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${selectedState ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {selectedState ? '✓ State Set' : '✗ State Not Set'}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${selectedCity ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {selectedCity ? '✓ City Set' : '✗ City Not Set'}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${organizer.googleSearchLocation ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {organizer.googleSearchLocation ? '✓ Location Set' : '✗ Location Not Set'}
                            </span>
                        </div>

                        {/* Fallback display for current location data */}
                        {(!selectedCountry || !selectedState || !selectedCity) && (organizer.country || organizer.state || organizer.city) && (
                            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                                <p className="text-xs text-yellow-800 font-medium mb-1">Current Location Data (from database):</p>
                                <div className="text-xs text-yellow-700">
                                    {organizer.country && <span className="mr-3"><strong>Country:</strong> {organizer.country}</span>}
                                    {organizer.state && <span className="mr-3"><strong>State:</strong> {organizer.state}</span>}
                                    {organizer.city && <span><strong>City:</strong> {organizer.city}</span>}
                                </div>
                                <p className="text-xs text-yellow-600 mt-1">
                                    This data will be preserved when saving if not re-selected above.
                                </p>
                            </div>
                        )}
                    </div>

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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter a location (start typing to see suggestions)"
                                autoComplete="off"
                                defaultValue={selectedPlaceAddress || organizer.address || organizer.googleSearchLocation || ''}
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
                            {/* Show current Google Maps location if exists */}
                            {organizer.address && organizer.address !== 'not specified' && (
                                <div className="mt-2 p-2 bg-blue-50 rounded-md">
                                    <p className="text-xs text-blue-700">
                                        <strong>Current Address:</strong> {organizer.address}
                                    </p>
                                    {organizer.googleSearchLocation && (
                                        <p className="text-xs text-blue-600 mt-1">
                                            <strong>Place ID:</strong> {organizer.googleSearchLocation}
                                        </p>
                                    )}
                                    {organizer.googleSearchLat && organizer.googleSearchLong && (
                                        <p className="text-xs text-blue-600 mt-1">
                                            <strong>Coordinates:</strong> {organizer.googleSearchLat}, {organizer.googleSearchLong}
                                        </p>
                                    )}
                                </div>
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

                    {/* Current Image Display */}
                    {organizer.profileImage && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Profile Image
                            </label>
                            <div className="flex items-center space-x-4">
                                <img
                                    src={organizer.profileImage}
                                    alt={organizer.name}
                                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="w-24 h-24 bg-gray-100 rounded-lg shadow-md hidden items-center justify-center">
                                    <FaUsers className="text-2xl text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Current image</p>
                                    <p className="text-xs text-gray-500">Upload new image to replace</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload New Profile Image
                        </label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
                        <p className="text-gray-500 text-sm mt-1">Image size must be less than 2MB. Leave empty to keep current image.</p>
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

export default AdminEditOrganizer; 