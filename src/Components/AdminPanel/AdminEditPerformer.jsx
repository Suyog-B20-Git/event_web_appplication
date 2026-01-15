import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { FaUsers, FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import { updatePerformer } from '../../redux/actions/master/Performers/updatePerformer';
import { getCategories } from '../../redux/actions/master/Categories/getCategories';
import { Country, State, City } from 'country-state-city';
import { toast } from 'react-toastify';

const AdminEditPerformer = ({ performer, onBack, onUpdate }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [selectedTagKeywords, setSelectedTagKeywords] = useState([]);
    const [customTag, setCustomTag] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const { control, handleSubmit, setValue, register, reset, watch, formState: { errors } } = useForm();

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

    const countryOptions = Country.getAllCountries().map((country) => ({ value: country.isoCode, label: country.name }));
    const stateOptions = selectedCountry ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({ value: state.isoCode, label: state.name })) : [];
    const cityOptions = selectedState && selectedCountry ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map((city) => ({ value: city.name, label: city.name })) : [];

    // Tag options for performers
    const tagKeywordOptions = {
        Performer: [
            { value: 'DJ', label: 'DJ' },
            { value: 'Singer', label: 'Singer' },
            { value: 'Band', label: 'Band' },
            { value: 'Guitarist', label: 'Guitarist' },
            { value: 'Pianist', label: 'Pianist' },
        ],
    };

    // Fetch subcategories when component mounts (for Performer)
    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const data = await dispatch(getCategories('Performer'));
                const formatted = data.data?.map((sub) => ({ label: sub.name, value: sub.name })) || [];
                setSubCategoryList(formatted);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
                setSubCategoryList([]);
            }
        };
        fetchSubCategories();
    }, [dispatch]);

    useEffect(() => {
        if (performer) {
            // Reset form with performer data
            reset({
                listingTitle: performer.name || '',
                listingDescription: performer.description || '',
                phone: performer.phoneNumber || '',
                email: performer.email || '',
                website: performer.website || '',
                availableTime: performer.availableTime || '',
                location: performer.googleSearchLocation || '',
                facebookUrl: performer.facebookUrl || '',
                instagramUrl: performer.instagramUrl || '',
                twitterUrl: performer.twitterUrl || '',
                youtubeUrl: performer.youtubeUrl || '',
            });
            setSelectedSubCategory(performer.categories || []);
            setSelectedTagKeywords(performer.tags || []);

            // Pre-fill Google Places location data
            if (performer.address && performer.address !== 'not specified') {
                setSelectedPlaceAddress(performer.address);
            } else if (performer.googleSearchLocation) {
                setSelectedPlaceAddress(performer.googleSearchLocation);
            }
            if (performer.googleSearchLocation) {
                setSelectedPlaceId(performer.googleSearchLocation);
            }
            if (performer.googleSearchLat) {
                setSelectedPlaceLat(performer.googleSearchLat.toString());
            }
            if (performer.googleSearchLong) {
                setSelectedPlaceLng(performer.googleSearchLong.toString());
            }

            // Pre-populate location selections similar to organizer
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

                    if (performer.country) {
                        countryToUse = Country.getAllCountries().find(c => c.name === performer.country);
                    }
                    if (!countryToUse && performer.state) {
                        countryToUse = findCountryByState(performer.state);
                    }
                    if (!countryToUse && performer.city) {
                        countryToUse = findCountryByCity(performer.city);
                    }

                    if (countryToUse) {
                        const countryOption = { value: countryToUse.isoCode, label: countryToUse.name };
                        setSelectedCountry(countryOption);
                        setValue('country', countryOption);

                        await new Promise(resolve => setTimeout(resolve, 200));

                        if (performer.state) {
                            const updatedStateOptions = State.getStatesOfCountry(countryToUse.isoCode).map((state) => ({ value: state.isoCode, label: state.name }));
                            const stateOption = updatedStateOptions.find(s => s.label === performer.state);
                            if (stateOption) {
                                setSelectedState(stateOption);
                                setValue('state', stateOption);

                                await new Promise(resolve => setTimeout(resolve, 200));

                                if (performer.city) {
                                    const updatedCityOptions = City.getCitiesOfState(countryToUse.isoCode, stateOption.value).map((city) => ({ value: city.name, label: city.name }));
                                    const cityOption = updatedCityOptions.find(c => c.label === performer.city);
                                    if (cityOption) {
                                        setSelectedCity(cityOption);
                                        setValue('city', cityOption);
                                    }
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error setting location data:', error);
                } finally {
                    setFormLoading(false);
                }
            };

            setLocationData();
        } else {
            setFormLoading(false);
        }
    }, [performer, reset, setValue]);

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
                if (performer && performer.googleSearchLocation && performer.googleSearchLocation.startsWith('ChI')) {
                    try {
                        const placesService = new window.google.maps.places.PlacesService(mapInstance);
                        placesService.getDetails(
                            {
                                placeId: performer.googleSearchLocation,
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
                                    const formattedAddress = place.formatted_address || performer.address || '';
                                    updateFormValues(formattedAddress, place.place_id, lat, lng);
                                    if (autocompleteInputRef.current) {
                                        autocompleteInputRef.current.value = formattedAddress;
                                    }
                                }
                            }
                        );
                    } catch { }
                } else if (performer && performer.googleSearchLat && performer.googleSearchLong) {
                    const lat = parseFloat(performer.googleSearchLat);
                    const lng = parseFloat(performer.googleSearchLong);
                    if (!isNaN(lat) && !isNaN(lng)) {
                        mapInstance.setCenter({ lat, lng });
                        mapInstance.setZoom(15);
                        markerInstance.setPosition({ lat, lng });
                        markerInstance.setVisible(true);
                    }
                } else if (performer && performer.location?.coordinates) {
                    const [lng, lat] = performer.location.coordinates;
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
    }, [updateFormValues, performer]);

    // Update state options when country changes
    useEffect(() => {
        if (selectedCountry && performer) {
            const currentStateOptions = State.getStatesOfCountry(selectedCountry.value).map((state) => ({ value: state.isoCode, label: state.name }));
            if (performer.state) {
                const stateOption = currentStateOptions.find(s => s.label === performer.state);
                if (!stateOption) {
                    setSelectedState(null);
                    setSelectedCity(null);
                    setValue('state', null);
                    setValue('city', null);
                }
            }
        }
    }, [selectedCountry, performer, setValue]);

    // Update city options when state changes
    useEffect(() => {
        if (selectedState && selectedCountry && performer) {
            const currentCityOptions = City.getCitiesOfState(selectedCountry.value, selectedState.value).map((city) => ({ value: city.name, label: city.name }));
            if (performer.city) {
                const cityOption = currentCityOptions.find(c => c.label === performer.city);
                if (!cityOption) {
                    setSelectedCity(null);
                    setValue('city', null);
                }
            }
        }
    }, [selectedState, selectedCountry, performer, setValue]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            setImageError('File size must be less than 2MB');
            return;
        }
        setImage(file);
        setImageError('');
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            if (image) formData.append('profileImage', image);
            selectedSubCategory.forEach((c) => formData.append('categories[]', c));

            formData.append('country', selectedCountry ? selectedCountry.label : performer.country || '');
            formData.append('state', selectedState ? selectedState.label : performer.state || '');
            formData.append('city', selectedCity ? selectedCity.label : performer.city || '');
            formData.append('name', data.listingTitle);
            formData.append('description', data.listingDescription);
            // Address and Google data from Places or existing
            const lat = selectedPlaceLat || performer.googleSearchLat || '';
            const lng = selectedPlaceLng || performer.googleSearchLong || '';
            formData.append('address', selectedPlaceAddress || performer.address || '');
            formData.append('googleSearchLocation', selectedPlaceId || performer.googleSearchLocation || '');
            formData.append('googleSearchLat', lat || '');
            formData.append('googleSearchLong', lng || '');
            if (lat && lng) {
                const locationGeoJSON = {
                    type: 'Point',
                    coordinates: [parseFloat(lng), parseFloat(lat)]
                };
                formData.append('location', JSON.stringify(locationGeoJSON));
            }

            if (data.phone) formData.append('phoneNumber', data.phone);
            if (data.email) formData.append('email', data.email);
            if (data.availableTime) formData.append('availableTime', data.availableTime);
            if (data.website) formData.append('website', data.website);

            formData.append('facebookUrl', data.facebookUrl || '');
            formData.append('instagramUrl', data.instagramUrl || '');
            formData.append('youtubeUrl', data.youtubeUrl || '');
            formData.append('twitterUrl', data.twitterUrl || '');

            // Append tags
            selectedTagKeywords.forEach((tag) => formData.append('tags[]', tag));

            await dispatch(updatePerformer(performer._id, formData));
            toast.success('Performer updated successfully!');
            onUpdate(formData);
        } catch (error) {
            console.error('Error updating performer:', error);
            toast.error('Error updating performer. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!performer) {
        return (
            <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                    <FaUsers className="mx-auto text-5xl text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700">Performer Not Found</h3>
                    <button onClick={onBack} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                        <FaArrowLeft className="mr-2 inline" /> Back to Performers
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
                    <h3 className="text-xl font-semibold text-gray-700">Loading Performer Data...</h3>
                    <p className="text-gray-500 mt-2">Please wait while we prepare the form with performer information.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">

            <header className="mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <button onClick={onBack} className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                            <FaArrowLeft className="text-gray-600" />
                        </button>
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <FaUsers className="text-2xl text-indigo-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Edit Performer</h1>
                            <p className="text-sm text-gray-500">Performer ID: {performer._id}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={onBack} className="flex items-center bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                            <FaTimes className="mr-2" /> Cancel
                        </button>
                        <button onClick={handleSubmit(onSubmit)} disabled={loading} className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors disabled:opacity-50">
                            <FaSave className="mr-2" /> {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Basic Information</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Categories*</label>
                        <Select
                            isMulti
                            options={subCategoryList}
                            onChange={(selectedOptions) => {
                                const values = (selectedOptions || []).map((opt) => opt.value);
                                setSelectedSubCategory(values);
                            }}
                            value={subCategoryList.filter((opt) => selectedSubCategory.includes(opt.value))}
                            placeholder="Select categories..."
                            className="mb-3"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Performer Name*</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter performer name" {...register('listingTitle', { required: 'Performer name is required' })} />
                        {errors.listingTitle && <p className="text-red-500 text-sm mt-1">{errors.listingTitle.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description*</label>
                        <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y" rows={4} placeholder="Enter description" {...register('listingDescription', { required: 'Description is required' })} />
                        {errors.listingDescription && <p className="text-red-500 text-sm mt-1">{errors.listingDescription.message}</p>}
                    </div>

                    {/* Tags */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Tag Keywords:</label>
                        <Select
                            isMulti
                            options={tagKeywordOptions.Performer || []}
                            onChange={(selectedOptions) => {
                                const selectedValues = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
                                setSelectedTagKeywords([
                                    ...selectedValues,
                                    ...selectedTagKeywords.filter((tag) => !(tagKeywordOptions.Performer || []).some((t) => t.value === tag)),
                                ]);
                            }}
                            value={(tagKeywordOptions.Performer || []).filter((opt) => selectedTagKeywords.includes(opt.value))}
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
                                onClick={() => {
                                    if (customTag.trim() !== '') {
                                        setSelectedTagKeywords([...selectedTagKeywords, customTag.trim()]);
                                        setCustomTag('');
                                    }
                                }}
                                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
                            >
                                Add
                            </button>
                        </div>

                        {selectedTagKeywords.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {selectedTagKeywords.map((tag, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm flex items-center">
                                        {tag}
                                        <button
                                            type="button"
                                            className="text-gray-800 hover:text-red-500 font-bold ml-2"
                                            onClick={() => setSelectedTagKeywords(selectedTagKeywords.filter((t) => t !== tag))}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Location Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Country*</label>
                            <Controller name="country" control={control} rules={{ required: 'Please select a country' }} render={({ field }) => (
                                <Select {...field} isClearable options={countryOptions} placeholder="Search country..." onChange={(selectedOption) => { field.onChange(selectedOption); setSelectedCountry(selectedOption); setValue('state', null); setValue('city', null); }} value={selectedCountry} />
                            )} />
                            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">State*</label>
                            <Controller name="state" control={control} rules={{ required: 'Please select a state' }} render={({ field }) => (
                                <Select {...field} isClearable isDisabled={!selectedCountry} options={stateOptions} placeholder="Search state..." onChange={(selectedOption) => { field.onChange(selectedOption); setSelectedState(selectedOption); setValue('city', null); }} value={selectedState} />
                            )} />
                            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City*</label>
                            <Controller name="city" control={control} rules={{ required: selectedState ? 'Please select a city' : 'Select a state first' }} render={({ field }) => (
                                <Select {...field} isClearable options={cityOptions} placeholder="Search city..." isDisabled={!selectedState} onChange={(selectedOption) => { field.onChange(selectedOption); setSelectedCity(selectedOption); }} value={selectedCity} />
                            )} />
                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location*</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                ref={autocompleteInputRef}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter a location (start typing to see suggestions)"
                                autoComplete="off"
                                defaultValue={selectedPlaceAddress || performer.address || performer.googleSearchLocation || ''}
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
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                            {performer.address && performer.address !== 'not specified' && (
                                <div className="mt-2 p-2 bg-blue-50 rounded-md">
                                    <p className="text-xs text-blue-700"><strong>Current Address:</strong> {performer.address}</p>
                                    {performer.googleSearchLocation && (
                                        <p className="text-xs text-blue-600 mt-1"><strong>Place ID:</strong> {performer.googleSearchLocation}</p>
                                    )}
                                    {performer.googleSearchLat && performer.googleSearchLong && (
                                        <p className="text-xs text-blue-600 mt-1"><strong>Coordinates:</strong> {performer.googleSearchLat}, {performer.googleSearchLong}</p>
                                    )}
                                </div>
                            )}
                            <input type="hidden" name="latitude" value={selectedPlaceLat} />
                            <input type="hidden" name="longitude" value={selectedPlaceLng} />
                            <input type="hidden" name="place_id" value={selectedPlaceId} />
                            <style>{`
                                .pac-container { z-index: 9999 !important; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); }
                                .pac-item { padding: 8px; cursor: pointer; }
                                .pac-item:hover { background-color: #f0f0f0; }
                            `}</style>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div id="map" ref={mapRefForAutocomplete} style={{ height: '300px', width: '100%', borderRadius: '8px' }}></div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Image</h2>
                    {performer.profileImage && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Profile Image</label>
                            <div className="flex items-center space-x-4">
                                <img src={performer.profileImage} alt={performer.name} className="w-24 h-24 object-cover rounded-lg shadow-md" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Profile Image</label>
                        <input type="file" onChange={handleImageChange} accept="image/*" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
                        <p className="text-gray-500 text-sm mt-1">Image size must be less than 2MB. Leave empty to keep current image.</p>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter phone number"
                                {...register('phone', {
                                    pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit phone number' },
                                })}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter email"
                                {...register('email', {
                                    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Enter a valid email address' },
                                })}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                            <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter website URL" {...register('website')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Available Time*</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="e.g., 9 AM to 6 PM"
                                {...register('availableTime', { required: 'Available time is required' })}
                            />
                            {errors.availableTime && <p className="text-red-500 text-sm mt-1">{errors.availableTime.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Social Media</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[{ label: 'Facebook Url', value: 'facebookUrl', placeholder: 'https://www.facebook.com/abc' }, { label: 'Twitter Url', value: 'twitterUrl', placeholder: 'https://www.twitter.com/abc' }, { label: 'Youtube Url', value: 'youtubeUrl', placeholder: 'https://www.youtube.com/@tseries' }, { label: 'Instagram Url', value: 'instagramUrl', placeholder: 'https://www.instagram.com/Adidas' }].map((item, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{item.label}</label>
                                <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder={item.placeholder} {...register(item.value)} />
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminEditPerformer;


