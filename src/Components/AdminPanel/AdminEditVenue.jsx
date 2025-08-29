import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import { FaBuilding, FaArrowLeft, FaSave, FaTimes, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaCalendarAlt, FaTag, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { getLocation } from '../../redux/actions/master/location/location';
import { getLocationDetails } from '../../redux/actions/master/location/locationDetail';
import { updateVenue } from '../../redux/actions/master/Venue/updateVenue';

const AdminEditVenue = ({ venue, onBack, onUpdate }) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const [coverImage, setCoverImage] = useState(null);
    const [coverImageError, setCoverImageError] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [locationQuery, setLocationQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        register,
        reset,
        formState: { errors },
    } = useForm();

    const place_id = watch('location');

    // Fetch venue subcategories
    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const response = await fetch(`http://dev.eventsnode.com:3000/api/categories?type=Venue`);
                const data = await response.json();
                const formatted = data.data?.map((sub) => ({ label: sub.name, value: sub.name })) || [];
                setSubCategoryList(formatted);
            } catch (error) {
                console.error('Error fetching venue categories:', error);
                setSubCategoryList([]);
            }
        };
        fetchSubCategories();
    }, []);

    // Location suggestions
    useEffect(() => {
        if (locationQuery) {
            dispatch(getLocation(locationQuery));
        }
    }, [dispatch, locationQuery]);

    // Place details
    useEffect(() => {
        if (place_id) {
            dispatch(getLocationDetails(place_id));
        }
    }, [dispatch, place_id]);

    const locationsStore = useSelector((state) => state.locationsReducer) || { locations: [] };
    const locationOptions = Array.isArray(locationsStore?.locations)
        ? locationsStore.locations.map((item) => ({ value: item.place_id, label: item.description }))
        : [];

    const locationDetailsStore = useSelector((state) => state.locationDetailsReducer) || { locationDetails: {} };
    const locationDetails = locationDetailsStore.locationDetails || {};

    // Prefill form
    useEffect(() => {
        if (venue) {
            reset({
                listingTitle: venue.name || '',
                listingDescription: venue.description || '',
                phone: venue.phoneNumber || '',
                email: venue.email || '',
                website: venue.website || '',
                availableTime: venue.availableTime || '',
                location: venue.googleSearchLocation || '',
            });

            setSelectedSubCategory(venue.categories || []);

            // Prefill country/state/city
            const normalizeCountryCode = (raw) => {
                if (!raw) return raw;
                const s = String(raw).trim().toUpperCase();
                const map = {
                    'USA': 'US', 'U.S.A': 'US', 'UNITED STATES OF AMERICA': 'US', 'UNITED STATES': 'US', 'US': 'US',
                    'UK': 'GB', 'U.K.': 'GB', 'UNITED KINGDOM': 'GB',
                    'INDIA': 'IN', 'IND': 'IN'
                };
                return map[s] || raw;
            };

            const findCountryByState = (stateNameOrCode) => {
                for (const c of Country.getAllCountries()) {
                    const states = State.getStatesOfCountry(c.isoCode);
                    if (states.find((s) => s.name === stateNameOrCode || s.isoCode === stateNameOrCode)) return c;
                }
                return null;
            };
            const findCountryByCity = (cityName) => {
                for (const c of Country.getAllCountries()) {
                    const states = State.getStatesOfCountry(c.isoCode);
                    for (const s of states) {
                        const cities = City.getCitiesOfState(c.isoCode, s.isoCode);
                        if (cities.find((ci) => ci.name === cityName)) return c;
                    }
                }
                return null;
            };

            const init = async () => {
                try {
                    let countryToUse = null;
                    if (venue.country) {
                        const normalized = normalizeCountryCode(venue.country);
                        countryToUse = Country.getAllCountries().find((c) => c.name === venue.country) ||
                            Country.getAllCountries().find((c) => c.isoCode.toUpperCase() === String(normalized).toUpperCase()) ||
                            null;
                    }
                    if (!countryToUse && venue.state) countryToUse = findCountryByState(venue.state);
                    if (!countryToUse && venue.city) countryToUse = findCountryByCity(venue.city);

                    if (countryToUse) {
                        const countryOption = { value: countryToUse.isoCode, label: countryToUse.name };
                        setSelectedCountry(countryOption);
                        setValue('country', countryOption);
                        await new Promise((r) => setTimeout(r, 200));

                        if (venue.state) {
                            const stateList = State.getStatesOfCountry(countryToUse.isoCode).map((s) => ({ value: s.isoCode, label: s.name }));
                            const stateOption = stateList.find((s) => s.label === venue.state || s.value === venue.state) || null;
                            if (stateOption) {
                                setSelectedState(stateOption);
                                setValue('state', stateOption);
                                await new Promise((r) => setTimeout(r, 200));
                                if (venue.city) {
                                    const cityList = City.getCitiesOfState(countryToUse.isoCode, stateOption.value).map((ci) => ({ value: ci.name, label: ci.name }));
                                    const cityOption = cityList.find((ci) => ci.label === venue.city) || null;
                                    if (cityOption) {
                                        setSelectedCity(cityOption);
                                        setValue('city', cityOption);
                                    }
                                }
                            }
                        }
                    }
                } finally {
                    setFormLoading(false);
                }
            };
            init();
        } else {
            setFormLoading(false);
        }
    }, [venue, reset, setValue]);

    // Options for selects
    const countryOptions = Country.getAllCountries().map((c) => ({ value: c.isoCode, label: c.name }));
    const stateOptions = selectedCountry
        ? State.getStatesOfCountry(selectedCountry.value).map((s) => ({ value: s.isoCode, label: s.name }))
        : [];
    const cityOptions = selectedState && selectedCountry
        ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map((ci) => ({ value: ci.name, label: ci.name }))
        : [];

    // Image selection
    const handleImageChange = (e) => {
        setImageLoading(true);
        const file = e.target.files?.[0];
        if (!file) {
            setImageLoading(false);
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setImageError('File size must be less than 2MB');
            setImageLoading(false);
            return;
        }
        setImage(file);
        setImageError('');
        setImageLoading(false);
    };

    const handleCoverImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setCoverImageError('Cover image size must be less than 2MB');
            return;
        }
        setCoverImage(file);
        setCoverImageError('');
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();

            if (image) formData.append('profileImage', image);
            if (coverImage) formData.append('coverImage', coverImage);

            // Categories
            selectedSubCategory.forEach((cat) => formData.append('categories[]', cat));

            // Location fields
            formData.append('country', selectedCountry ? selectedCountry.label : venue.country || '');
            formData.append('state', selectedState ? selectedState.label : venue.state || '');
            formData.append('city', selectedCity ? selectedCity.label : venue.city || '');
            formData.append('googleSearchLocation', data.location || venue.googleSearchLocation || '');
            formData.append('googleSearchLat', locationDetails.location?.lat || venue.googleSearchLat || '');
            formData.append('googleSearchLong', locationDetails.location?.lng || venue.googleSearchLong || '');

            // Basics
            formData.append('name', data.listingTitle || '');
            formData.append('description', data.listingDescription || '');
            formData.append('address', locationDetails.address || venue.address || '');
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

            // Contact
            if (data.phone) formData.append('phoneNumber', data.phone);
            if (data.email) formData.append('email', data.email);
            if (data.website) formData.append('website', data.website);
            if (data.availableTime) formData.append('availableTime', data.availableTime);

            await dispatch(updateVenue(venue._id, formData));
            toast.success('Venue updated successfully!');
            onUpdate?.();
        } catch (err) {
            console.error('Error updating venue:', err);
            toast.error('Error updating venue. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!venue) {
        return (
            <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                    <FaBuilding className="mx-auto text-5xl text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700">Venue Not Found</h3>
                    <p className="text-gray-500 mt-2">The venue you're trying to edit doesn't exist or couldn't be loaded.</p>
                    <button onClick={onBack} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                        <FaArrowLeft className="mr-2 inline" /> Back to Venues
                    </button>
                </div>

                {/* Venue Meta */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Venue Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Venue Type</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="eg. cinema,theater,stadium" defaultValue={venue.type || ''} {...register('type')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Amenities*</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter Amenities" defaultValue={venue.amenities || ''} {...register('amenities')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">No of Seated Guest*</label>
                            <input type="number" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter no of seated guest" defaultValue={venue.noOfSeatedGuest || ''} {...register('noOfSeatedGuest')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">No of Standing Guest*</label>
                            <input type="number" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter no of standing guest" defaultValue={venue.noOfStandingGuest || ''} {...register('noOfStandingGuest')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Neighbourhoods</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter neighbourhood" defaultValue={Array.isArray(venue.neighbourhoods) ? venue.neighbourhoods.join(',') : (venue.neighbourhoods || '')} {...register('neighbourhoods')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pricing</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter pricing" defaultValue={venue.pricing || ''} {...register('pricing')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Food and Beverages Details</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter food beverage details" defaultValue={venue.foodAndBeveragesDetails || ''} {...register('foodAndBeveragesDetails')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Quoted Form</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter quoted Form like per hour/day" defaultValue={venue.quotedForm || ''} {...register('quotedForm')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter availability" defaultValue={venue.availability || ''} {...register('availability')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter ZIP Code" defaultValue={venue.zipcode || ''} {...register('zipcode')} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (formLoading) {
        return (
            <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <h3 className="text-xl font-semibold text-gray-700">Loading Venue Data...</h3>
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
                        <button onClick={onBack} className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                            <FaArrowLeft className="text-gray-600" />
                        </button>
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <FaBuilding className="text-2xl text-indigo-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Edit Venue</h1>
                            <p className="text-sm text-gray-500">Venue ID: {venue._id}</p>
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
                {/* Basic Info */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Basic Information</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Venue Categories*</label>
                        <Select
                            isMulti
                            options={subCategoryList}
                            onChange={(selectedOptions) => {
                                const values = Array.isArray(selectedOptions) ? selectedOptions.map((o) => o.value) : [];
                                setSelectedSubCategory(values);
                            }}
                            value={subCategoryList.filter((opt) => selectedSubCategory.includes(opt.value))}
                            placeholder="Select categories..."
                            className="mb-3"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Venue Name*</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter venue name"
                            {...register('listingTitle', { required: 'Venue name is required' })}
                        />
                        {errors.listingTitle && <p className="text-red-500 text-sm mt-1">{errors.listingTitle.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description*</label>
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                            rows={4}
                            placeholder="Enter venue description"
                            {...register('listingDescription', { required: 'Description is required' })}
                        />
                        {errors.listingDescription && <p className="text-red-500 text-sm mt-1">{errors.listingDescription.message}</p>}
                    </div>
                </div>

                {/* Location */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Location Information</h2>

                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-medium text-gray-700">Current Location Data</h3>
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedCountry(null);
                                    setSelectedState(null);
                                    setSelectedCity(null);
                                    setValue('country', null);
                                    setValue('state', null);
                                    setValue('city', null);
                                }}
                                className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                            >
                                Reset & Refresh Location
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div><strong>Country:</strong> {venue.country || 'Not set'}</div>
                            <div><strong>State:</strong> {venue.state || 'Not set'}</div>
                            <div><strong>City:</strong> {venue.city || 'Not set'}</div>
                            <div><strong>Google Maps Location:</strong> {venue.googleSearchLocation || 'Not set'}</div>
                        </div>
                    </div>

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
                            <label className="block text-sm font-medium text-gray-700 mb-2">State*</label>
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
                                        isDisabled={!selectedState}
                                        options={cityOptions}
                                        placeholder="Search city..."
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
                            <Controller
                                name="location"
                                control={control}
                                rules={{ required: 'Please select a location' }}
                                render={({ field }) => {
                                    let allOptions = [...locationOptions];
                                    if (venue.googleSearchLocation && !locationOptions.find((o) => o.value === venue.googleSearchLocation)) {
                                        allOptions.unshift({ value: venue.googleSearchLocation, label: `${venue.googleSearchLocation} (Current)` });
                                    }
                                    return (
                                        <Select
                                            {...field}
                                            isClearable
                                            options={allOptions}
                                            placeholder="Search location..."
                                            onInputChange={(value, { action }) => {
                                                if (action === 'input-change') setLocationQuery(value);
                                                if (action === 'input-blur' || action === 'menu-close') setLocationQuery('');
                                            }}
                                            onChange={(opt) => field.onChange(opt ? opt.value : null)}
                                            value={allOptions.find((o) => o.value === field.value) || null}
                                        />
                                    );
                                }}
                            />
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                        </div>
                    </div>
                </div>
                {/* Profile Image */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Image</h2>
                    {venue.profileImage && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Profile Image</label>
                            <div className="flex items-center space-x-4">
                                <img src={venue.profileImage} alt={venue.name} className="w-24 h-24 object-cover rounded-lg shadow-md" onError={(e) => { e.target.style.display = 'none'; }} />
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

                {/* Cover Image */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Cover Image</h2>
                    {venue.coverImage && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Cover Image</label>
                            <div className="flex items-center space-x-4">
                                <img src={venue.coverImage} alt={venue.name} className="w-40 h-24 object-cover rounded-lg shadow-md" onError={(e) => { e.target.style.display = 'none'; }} />
                            </div>
                        </div>
                    )}
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Cover Image</label>
                        <input type="file" onChange={handleCoverImageChange} accept="image/*" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        {coverImageError && <p className="text-red-500 text-sm mt-1">{coverImageError}</p>}
                        <p className="text-gray-500 text-sm mt-1">Cover image size must be less than 2MB.</p>
                    </div>
                </div>

                {/* Venue Details */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Venue Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Venue Type</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="eg. cinema,theater,stadium" defaultValue={venue.type || ''} {...register('type')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Amenities*</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter Amenities" defaultValue={venue.amenities || ''} {...register('amenities')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">No of Seated Guest*</label>
                            <input type="number" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter no of seated guest" defaultValue={venue.noOfSeatedGuest || ''} {...register('noOfSeatedGuest')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">No of Standing Guest*</label>
                            <input type="number" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter no of standing guest" defaultValue={venue.noOfStandingGuest || ''} {...register('noOfStandingGuest')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Neighbourhoods</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter neighbourhood" defaultValue={Array.isArray(venue.neighbourhoods) ? venue.neighbourhoods.join(',') : (venue.neighbourhoods || '')} {...register('neighbourhoods')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pricing</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter pricing" defaultValue={venue.pricing || ''} {...register('pricing')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Food and Beverages Details</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter food beverage details" defaultValue={venue.foodAndBeveragesDetails || ''} {...register('foodAndBeveragesDetails')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Quoted Form</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter quoted Form like per hour/day" defaultValue={venue.quotedForm || ''} {...register('quotedForm')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter availability" defaultValue={venue.availability || ''} {...register('availability')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter ZIP Code" defaultValue={venue.zipcode || ''} {...register('zipcode')} />
                        </div>
                    </div>
                </div>

                {/* Contact */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter phone number" {...register('phone')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter email" {...register('email')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                            <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter website URL" {...register('website')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Available Time*</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., 9 AM to 6 PM" {...register('availableTime', { required: 'Available time is required' })} />
                            {errors.availableTime && <p className="text-red-500 text-sm mt-1">{errors.availableTime.message}</p>}
                        </div>
                    </div>
                </div>


            </form>
        </div>
    );
};

export default AdminEditVenue;


