import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { FaUsers, FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import { Country, State, City } from 'country-state-city';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../utility/utils.jsx';
import { getCategories } from '../../redux/actions/master/Categories/getCategories';

const AdminAddPerformer = ({ onBack, onCreate }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [selectedTagKeywords, setSelectedTagKeywords] = useState([]);
    const [customTag, setCustomTag] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const { control, handleSubmit, setValue, register, formState: { errors } } = useForm();

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

    const countryOptions = Country.getAllCountries().map((c) => ({ value: c.isoCode, label: c.name }));
    const stateOptions = selectedCountry ? State.getStatesOfCountry(selectedCountry.value).map((s) => ({ value: s.isoCode, label: s.name })) : [];
    const cityOptions = selectedState ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map((c) => ({ value: c.name, label: c.name })) : [];

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

    // Initialize Google Maps with Places Autocomplete
    useEffect(() => {
        let isMounted = true;
        let autocompleteInstance = null;
        let markerInstance = null;
        let mapInstance = null;
        let retryCount = 0;
        const maxRetries = 10;

        const initializeAutocomplete = () => {
            if (autocompleteRef.current) return;
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
                if (!input || typeof input.focus !== 'function') return;
                mapInstance = new window.google.maps.Map(mapRefForAutocomplete.current, {
                    center: { lat: 20.593684, lng: 78.96288 },
                    zoom: 5
                });
                autocompleteInstance = new window.google.maps.places.Autocomplete(input, {
                    types: ['geocode', 'establishment'],
                    fields: ['formatted_address', 'geometry', 'place_id', 'name', 'address_components'],
                    componentRestrictions: undefined,
                });
                autocompleteInstance.bindTo('bounds', mapInstance);
                markerInstance = new window.google.maps.Marker({
                    map: mapInstance,
                    anchorPoint: new window.google.maps.Point(0, -29)
                });
                autocompleteRef.current = autocompleteInstance;
                markerRefForAutocomplete.current = markerInstance;
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
                    setTimeout(() => { if (isMounted) initializeAutocomplete(); delete window[callbackName]; }, 300);
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
        };
    }, [updateFormValues]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) { toast.error('No file selected'); return; }
        if (file.size > 2 * 1024 * 1024) { setImageError('File size must be less than 2MB'); return; }
        setImage(file); setImageError('');
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            if (image) formData.append('profileImage', image);
            selectedSubCategory.forEach((c) => formData.append('categories[]', c));

            formData.append('country', selectedCountry ? selectedCountry.label : '');
            formData.append('state', selectedState ? selectedState.label : '');
            formData.append('city', selectedCity ? selectedCity.label : '');
            formData.append('name', data.listingTitle);
            formData.append('description', data.listingDescription);
            formData.append('address', selectedPlaceAddress || '');
            formData.append('googleSearchLocation', selectedPlaceId || '');
            formData.append('googleSearchLat', selectedPlaceLat || '');
            formData.append('googleSearchLong', selectedPlaceLng || '');
            if (selectedPlaceLat && selectedPlaceLng) {
                const locationGeoJSON = {
                    type: 'Point',
                    coordinates: [parseFloat(selectedPlaceLng), parseFloat(selectedPlaceLat)]
                };
                formData.append('location', JSON.stringify(locationGeoJSON));
            }

            selectedTagKeywords.forEach((tag) => formData.append('tags[]', tag));

            if (data.phone) formData.append('phoneNumber', data.phone);
            if (data.email) formData.append('email', data.email);
            if (data.availableTime) formData.append('availableTime', data.availableTime || '9 AM to 6 PM');
            if (data.website) formData.append('website', data.website);
            if (data.facebookUrl) formData.append('facebookUrl', data.facebookUrl);
            if (data.instagramUrl) formData.append('instagramUrl', data.instagramUrl);
            if (data.youtubeUrl) formData.append('youtubeUrl', data.youtubeUrl);
            if (data.twitterUrl) formData.append('twitterUrl', data.twitterUrl);

            await axiosInstance.post('/performer', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            toast.success('Performer created successfully!');
            onCreate(formData);
        } catch (e) {
            console.error('Error creating performer:', e);
            toast.error(e?.response?.data?.message || 'Error creating performer');
        } finally {
            setLoading(false);
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
                        <div className="bg-green-100 p-2 rounded-lg">
                            <FaUsers className="text-2xl text-green-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Add New Performer</h1>
                            <p className="text-sm text-gray-500">Create a new performer</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={onBack} className="flex items-center bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                            <FaTimes className="mr-2" /> Cancel
                        </button>
                        <button onClick={handleSubmit(onSubmit)} disabled={loading} className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors disabled:opacity-50">
                            <FaSave className="mr-2" /> {loading ? 'Creating...' : 'Create Performer'}
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
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter performer name" {...register('listingTitle', { required: 'Performer name is required' })} />
                        {errors.listingTitle && <p className="text-red-500 text-sm mt-1">{errors.listingTitle.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description*</label>
                        <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-y" rows={4} placeholder="Enter description" {...register('listingDescription', { required: 'Description is required' })} />
                        {errors.listingDescription && <p className="text-red-500 text-sm mt-1">{errors.listingDescription.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Tag Keywords</label>
                        <Select
                            isMulti
                            options={[{ value: 'DJ', label: 'DJ' }, { value: 'Singer', label: 'Singer' }, { value: 'Band', label: 'Band' }, { value: 'Guitarist', label: 'Guitarist' }, { value: 'Pianist', label: 'Pianist' }]}
                            onChange={(selectedOptions) => setSelectedTagKeywords((selectedOptions || []).map((o) => o.value))}
                            value={[{ value: '', label: '' }]?.filter(() => false)}
                            className="mb-3"
                            placeholder="Select tags..."
                        />
                        <div className="flex gap-2 max-w-[500px]">
                            <input type="text" value={customTag} onChange={(e) => setCustomTag(e.target.value)} placeholder="Type to add custom tag..." className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                            <button type="button" onClick={() => { if (customTag.trim() !== '') { setSelectedTagKeywords([...selectedTagKeywords, customTag.trim()]); setCustomTag(''); } }} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">Add</button>
                        </div>
                        {selectedTagKeywords.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {selectedTagKeywords.map((tag, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm flex items-center">
                                        {tag}
                                        <button type="button" className="text-gray-800 hover:text-red-500 font-bold ml-2" onClick={() => setSelectedTagKeywords(selectedTagKeywords.filter((t) => t !== tag))}>×</button>
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
                            <label className="block text sm font-medium text-gray-700 mb-2">State*</label>
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
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                            <input type="hidden" name="latitude" value={selectedPlaceLat} />
                            <input type="hidden" name="longitude" value={selectedPlaceLng} />
                            <input type="hidden" name="place_id" value={selectedPlaceId} />
                            <style>{`
                                .pac-container {
                                    z-index: 9999 !important;
                                    border-radius: 8px;
                                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                                }
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
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Profile Image*</label>
                        <input type="file" onChange={handleImageChange} accept="image/*" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                        {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
                        <p className="text-gray-500 text-sm mt-1">Image size must be less than 2MB</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Social Media</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[{ label: 'Facebook Url', value: 'facebookUrl', placeholder: 'https://www.facebook.com/abc' }, { label: 'Twitter Url', value: 'twitterUrl', placeholder: 'https://www.twitter.com/abc' }, { label: 'Youtube Url', value: 'youtubeUrl', placeholder: 'https://www.youtube.com/@tseries' }, { label: 'Instagram Url', value: 'instagramUrl', placeholder: 'https://www.instagram.com/Adidas' }].map((item, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{item.label}</label>
                                <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder={item.placeholder} {...register(item.value)} />
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminAddPerformer;


