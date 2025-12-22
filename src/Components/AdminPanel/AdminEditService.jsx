import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import { FaPuzzlePiece, FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import { updateService } from '../../redux/actions/master/Services/updateService';
import { getCategories } from '../../redux/actions/master/Categories/getCategories';

const AdminEditService = ({ service, onBack, onUpdate }) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const { control, handleSubmit, register, setValue, reset, formState: { errors } } = useForm();

    // Google Places Autocomplete refs and state
    const autocompleteInputRef = React.useRef(null);
    const autocompleteRef = React.useRef(null);
    const mapRefForAutocomplete = React.useRef(null);
    const markerRefForAutocomplete = React.useRef(null);
    const mapInstanceRef = React.useRef(null);
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
                return;
            }
            if (!window.google || !window.google.maps || !window.google.maps.places) {
                if (retryCount < maxRetries) {
                    retryCount++;
                    setTimeout(initializeAutocomplete, 500);
                }
                return;
            }
            if (!mapRefForAutocomplete.current || !autocompleteInputRef.current) {
                if (retryCount < maxRetries) {
                    retryCount++;
                    setTimeout(initializeAutocomplete, 300);
                }
                return;
            }
            try {
                const input = autocompleteInputRef.current;
                if (!input || typeof input.focus !== 'function') {
                    return;
                }

                // Create map centered on India
                mapInstance = new window.google.maps.Map(mapRefForAutocomplete.current, {
                    center: { lat: 20.593684, lng: 78.96288 },
                    zoom: 5
                });

                // Create Autocomplete instance
                autocompleteInstance = new window.google.maps.places.Autocomplete(input, {
                    types: ['geocode', 'establishment'],
                    fields: ['formatted_address', 'geometry', 'place_id', 'name', 'address_components'],
                    componentRestrictions: undefined,
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
                if (service && service.googleSearchLocation && service.googleSearchLocation.startsWith('ChI')) {
                    try {
                        const placesService = new window.google.maps.places.PlacesService(mapInstance);
                        placesService.getDetails(
                            {
                                placeId: service.googleSearchLocation,
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
                                    const formattedAddress = place.formatted_address || service.address || '';
                                    updateFormValues(formattedAddress, place.place_id, lat, lng);
                                    if (autocompleteInputRef.current) {
                                        autocompleteInputRef.current.value = formattedAddress;
                                    }
                                }
                            }
                        );
                    } catch { }
                } else if (service && service.googleSearchLat && service.googleSearchLong) {
                    const lat = parseFloat(service.googleSearchLat);
                    const lng = parseFloat(service.googleSearchLong);
                    if (!isNaN(lat) && !isNaN(lng)) {
                        mapInstance.setCenter({ lat, lng });
                        mapInstance.setZoom(15);
                        markerInstance.setPosition({ lat, lng });
                        markerInstance.setVisible(true);
                    }
                } else if (service && service.location?.coordinates) {
                    const [lng, lat] = service.location.coordinates;
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
                    if (place.geometry.viewport) {
                        mapInstance.fitBounds(place.geometry.viewport);
                    } else {
                        mapInstance.setCenter(place.geometry.location);
                        mapInstance.setZoom(17);
                    }
                    markerInstance.setPosition(place.geometry.location);
                    markerInstance.setVisible(true);

                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();
                    const placeId = place.place_id;
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
            setTimeout(() => { if (isMounted) initializeAutocomplete(); }, 300);
        } else {
            const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
            if (existingScript) {
                existingScript.addEventListener('load', () => {
                    setTimeout(() => { if (isMounted) initializeAutocomplete(); }, 300);
                });
            } else {
                const callbackName = `initMap_${Date.now()}`;
                window[callbackName] = () => {
                    setTimeout(() => {
                        if (isMounted) initializeAutocomplete();
                        delete window[callbackName];
                    }, 300);
                };
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=${callbackName}`;
                script.async = true;
                script.defer = true;
                script.onerror = () => { console.error('Failed to load Google Maps API'); delete window[callbackName]; };
                document.head.appendChild(script);
            }
        }
        return () => {
            isMounted = false;
            if (autocompleteInstance) {
                try { window.google?.maps?.event?.clearInstanceListeners?.(autocompleteInstance); } catch { }
                autocompleteInstance = null;
            }
            if (markerInstance) {
                try { markerInstance.setMap(null); } catch { }
                markerInstance = null;
            }
            autocompleteRef.current = null;
            markerRefForAutocomplete.current = null;
            mapInstanceRef.current = null;
        };
    }, [updateFormValues, service]);

    // Fetch subcategories when component mounts (for Service)
    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const data = await dispatch(getCategories('Service'));

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

    useEffect(() => {
        if (!service) return;
        reset({
            listingTitle: service.name || '',
            listingDescription: service.description || '',
            phone: service.phoneNumber || '',
            email: service.email || '',
            website: service.website || '',
            availableTime: service.availableTime || '',
            location: service.googleSearchLocation || ''
        });

        // Pre-fill Google Places location data
        // Use address (human-readable) for display, googleSearchLocation (place ID) for place_id
        if (service.address && service.address !== 'not specified') {
            setSelectedPlaceAddress(service.address);
        } else if (service.googleSearchLocation) {
            // If no address, use googleSearchLocation (might be place ID or address)
            setSelectedPlaceAddress(service.googleSearchLocation);
        }

        if (service.googleSearchLocation) {
            setSelectedPlaceId(service.googleSearchLocation);
        }

        // Handle lat/lng - they might not exist in the response
        if (service.googleSearchLat) {
            setSelectedPlaceLat(service.googleSearchLat.toString());
        }
        if (service.googleSearchLong) {
            setSelectedPlaceLng(service.googleSearchLong.toString());
        }
    }, [service, reset]);

    // prefill country/state/city
    useEffect(() => {
        if (!service) return;
        let countryToUse = Country.getAllCountries().find(c => c.name === service.country) || null;
        if (!countryToUse && service.state) {
            for (const c of Country.getAllCountries()) { const states = State.getStatesOfCountry(c.isoCode); if (states.find(s => s.name === service.state)) { countryToUse = c; break; } }
        }
        if (!countryToUse && service.city) {
            for (const c of Country.getAllCountries()) { const states = State.getStatesOfCountry(c.isoCode); for (const s of states) { const cities = City.getCitiesOfState(c.isoCode, s.isoCode); if (cities.find(ci => ci.name === service.city)) { countryToUse = c; break; } } if (countryToUse) break; }
        }
        (async () => {
            if (countryToUse) {
                const countryOption = { value: countryToUse.isoCode, label: countryToUse.name };
                setSelectedCountry(countryOption); setValue('country', countryOption);
                await new Promise(r => setTimeout(r, 200));
                if (service.state) {
                    const stateList = State.getStatesOfCountry(countryToUse.isoCode).map(s => ({ value: s.isoCode, label: s.name }));
                    const stateOption = stateList.find(s => s.label === service.state) || null;
                    if (stateOption) { setSelectedState(stateOption); setValue('state', stateOption); await new Promise(r => setTimeout(r, 200)); }
                    if (service.city) {
                        const cityList = City.getCitiesOfState(countryToUse.isoCode, stateOption?.value).map(ci => ({ value: ci.name, label: ci.name }));
                        const cityOption = cityList.find(ci => ci.label === service.city) || null;
                        if (cityOption) { setSelectedCity(cityOption); setValue('city', cityOption); }
                    }
                }
            }
        })();
    }, [service, setValue]);

    const onImage = (e) => { const f = e.target.files?.[0]; if (!f) return; if (f.size > 2 * 1024 * 1024) { setImageError('Image size must be less than 2MB'); return; } setImage(f); setImageError(''); };

    const onSubmit = async (data) => {
        const formData = new FormData();
        if (image) formData.append('profileImage', image);
        if (Array.isArray(service.categories)) service.categories.forEach((c) => formData.append('categories[]', c));
        formData.append('country', selectedCountry ? selectedCountry.label : service.country || '');
        formData.append('state', selectedState ? selectedState.label : service.state || '');
        formData.append('city', selectedCity ? selectedCity.label : service.city || '');

        // Construct GeoJSON Point for location field (MongoDB expects this format)
        const lat = selectedPlaceLat || service.googleSearchLat;
        const lng = selectedPlaceLng || service.googleSearchLong;
        if (lat && lng) {
            const locationGeoJSON = {
                type: "Point",
                coordinates: [parseFloat(lng), parseFloat(lat)] // GeoJSON: [longitude, latitude]
            };
            formData.append("location", JSON.stringify(locationGeoJSON));
        }

        formData.append('googleSearchLocation', selectedPlaceId || service.googleSearchLocation || '');
        formData.append('googleSearchLat', lat || '');
        formData.append('googleSearchLong', lng || '');
        formData.append('name', data.listingTitle || '');
        formData.append('description', data.listingDescription || '');
        formData.append('address', selectedPlaceAddress || service.address || '');
        if (data.phone) formData.append('phoneNumber', data.phone);
        if (data.email) formData.append('email', data.email);
        if (data.website) formData.append('website', data.website);
        if (data.availableTime) formData.append('availableTime', data.availableTime);
        if (data.facebookUrl) formData.append('facebookUrl', data.facebookUrl);
        if (data.instagramUrl) formData.append('instagramUrl', data.instagramUrl);
        if (data.youtubeUrl) formData.append('youtubeUrl', data.youtubeUrl);
        if (data.twitterUrl) formData.append('twitterUrl', data.twitterUrl);

        await dispatch(updateService(service._id, formData));
        onUpdate?.();
        onBack?.();
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
            <header className="mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <button onClick={onBack} className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"><FaArrowLeft className="text-gray-600" /></button>
                        <div className="bg-indigo-100 p-2 rounded-lg"><FaPuzzlePiece className="text-2xl text-indigo-600" /></div>
                        <div><h1 className="text-3xl font-bold text-gray-800">Edit Service</h1><p className="text-sm text-gray-500">Service ID: {service?._id}</p></div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={onBack} className="flex items-center bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors"><FaTimes className="mr-2" /> Cancel</button>
                        <button onClick={handleSubmit(onSubmit)} className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors"><FaSave className="mr-2" /> Save Changes</button>
                    </div>
                </div>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Basic Information</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Categories*</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" readOnly value={(service?.categories || []).join(', ')} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Name*</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Listing Title" defaultValue={service?.name || ''} {...register('listingTitle', { required: 'Service name is required' })} />
                        {errors.listingTitle && <p className="text-red-500 text-sm mt-1">{errors.listingTitle.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description*</label>
                        <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y" rows={4} placeholder="Enter Description" defaultValue={service?.description || ''} {...register('listingDescription', { required: 'Description is required' })} />
                        {errors.listingDescription && <p className="text-red-500 text-sm mt-1">{errors.listingDescription.message}</p>}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Location and map</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Country*</label>
                            <Controller name="country" control={control} rules={{ required: 'Please select a country' }} render={({ field }) => (<Select {...field} isClearable options={Country.getAllCountries().map(c => ({ value: c.isoCode, label: c.name }))} placeholder="Search country..." onChange={(opt) => { field.onChange(opt); setSelectedCountry(opt); setValue('state', null); setValue('city', null); }} value={selectedCountry} />)} />
                            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">States*</label>
                            <Controller name="state" control={control} rules={{ required: 'Please select a state' }} render={({ field }) => (<Select {...field} isClearable isDisabled={!selectedCountry} options={selectedCountry ? State.getStatesOfCountry(selectedCountry.value).map(s => ({ value: s.isoCode, label: s.name })) : []} placeholder="Search state..." onChange={(opt) => { field.onChange(opt); setSelectedState(opt); setValue('city', null); }} value={selectedState} />)} />
                            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City*</label>
                            <Controller name="city" control={control} rules={{ required: selectedState ? 'Please select a city' : 'Select a state first' }} render={({ field }) => (<Select {...field} isClearable options={selectedState && selectedCountry ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map(ci => ({ value: ci.name, label: ci.name })) : []} placeholder="Search city..." isDisabled={!selectedState} onChange={(opt) => { field.onChange(opt); setSelectedCity(opt); }} value={selectedCity} />)} />
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
                                defaultValue={selectedPlaceAddress || service.address || service.googleSearchLocation || ''}
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
                            {service?.googleSearchLocation && (
                                <div className="mt-2 p-2 bg-blue-50 rounded-md">
                                    <p className="text-xs text-blue-700"><strong>Current Google Maps Location:</strong> {service.googleSearchLocation}</p>
                                    {service.googleSearchLat && service.googleSearchLong && (
                                        <p className="text-xs text-blue-600 mt-1">Coordinates: {service.googleSearchLat}, {service.googleSearchLong}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Map Container */}
                    <div className="mt-4">
                        <div id="map" ref={mapRefForAutocomplete} style={{ height: '300px', width: '100%', borderRadius: '8px' }}></div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter phone number" defaultValue={service?.phoneNumber || ''} {...register('phone')} /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Email</label><input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter email" defaultValue={service?.email || ''} {...register('email')} /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Website</label><input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter website URL" defaultValue={service?.website || ''} {...register('website')} /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Available Time*</label><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., 9 AM to 6 PM" defaultValue={service?.availableTime || ''} {...register('availableTime', { required: 'Available time is required' })} />{errors.availableTime && <p className="text-red-500 text-sm mt-1">{errors.availableTime.message}</p>}</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Image</h2>
                    {service?.profileImage && (<div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-2">Current Profile Image</label><div className="flex items-center space-x-4"><img src={service.profileImage} alt={service.name} className="w-24 h-24 object-cover rounded-lg shadow-md" onError={(e) => { e.target.style.display = 'none'; }} /></div></div>)}
                    <div className="mb-2"><label className="block text-sm font-medium text-gray-700 mb-2">Upload New Profile Image</label><input type="file" onChange={e => { const f = e.target.files?.[0]; if (!f) return; if (f.size > 2 * 1024 * 1024) { setImageError('Image size must be less than 2MB'); return; } setImage(f); setImageError(''); }} accept="image/*" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />{imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}<p className="text-gray-500 text-sm mt-1">Image size must be less than 2MB. Leave empty to keep current image.</p></div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Social Profiles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Url</label>
                            <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://www.facebook.com/abc" defaultValue={service?.facebookUrl || ''} {...register('facebookUrl')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Url</label>
                            <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://www.twitter.com/abc" defaultValue={service?.twitterUrl || ''} {...register('twitterUrl')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Youtube Url</label>
                            <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://www.youtube.com/@tseries" defaultValue={service?.youtubeUrl || ''} {...register('youtubeUrl')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Url</label>
                            <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://www.instagram.com/Adidas" defaultValue={service?.instagramUrl || ''} {...register('instagramUrl')} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminEditService;


