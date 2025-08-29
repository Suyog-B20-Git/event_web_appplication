import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { FaUsers, FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import { updatePerformer } from '../../redux/actions/master/Performers/updatePerformer';
import { getLocation } from '../../redux/actions/master/location/location';
import { getLocationDetails } from '../../redux/actions/master/location/locationDetail';
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
    const [location, setLocation] = useState('');
    const [isResolvingLocation, setIsResolvingLocation] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const { control, handleSubmit, setValue, register, reset, watch, formState: { errors } } = useForm();

    const storeLocations = useSelector((state) => state.locationsReducer) || { locations: [] };
    const locationOptions = (Array.isArray(storeLocations?.locations) ? storeLocations.locations : []).map((item) => ({ value: item.place_id, label: item.description }));
    const storeLocationDetails = useSelector((state) => state.locationDetailsReducer) || { locationDetails: {} };
    const locationDetails = storeLocationDetails.locationDetails || {};

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
                const response = await fetch(`http://dev.eventsnode.com:3000/api/categories?type=Performer`);
                const data = await response.json();
                const formatted = data.data?.map((sub) => ({ label: sub.name, value: sub.name })) || [];
                setSubCategoryList(formatted);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
                setSubCategoryList([]);
            }
        };
        fetchSubCategories();
    }, []);

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

    useEffect(() => {
        if (!location || location.length < 3) return;
        if (location.startsWith('http')) return;
        dispatch(getLocation(location));
    }, [dispatch, location]);

    // Fetch place details only when user selects a valid place_id in the selector (handled inline onChange)

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
            // Do not send 'location' string; backend constructs geojson from googleSearchLocation
            formData.append('name', data.listingTitle);
            formData.append('description', data.listingDescription);
            formData.append('address', locationDetails.address || performer.address || '');
            formData.append('googleSearchLocation', data.location || performer.googleSearchLocation || '');
            formData.append('googleSearchLat', locationDetails.location?.lat || performer.googleSearchLat || '');
            formData.append('googleSearchLong', locationDetails.location?.lng || performer.googleSearchLong || '');

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
            {isResolvingLocation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-xl">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Fetching location details…</h3>
                            <p className="text-sm text-gray-500">Please wait, resolving map data.</p>
                        </div>
                    </div>
                </div>
            )}
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
                    {/* Debug Info - Show current values */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-medium text-gray-700">Current Location Data:</h3>
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedCountry(null);
                                    setSelectedState(null);
                                    setSelectedCity(null);
                                    setValue('country', null);
                                    setValue('state', null);
                                    setValue('city', null);

                                    // Re-run the location setup
                                    (async () => {
                                        try {
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
                                            if (performer.country) countryToUse = Country.getAllCountries().find(c => c.name === performer.country);
                                            if (!countryToUse && performer.state) countryToUse = findCountryByState(performer.state);
                                            if (!countryToUse && performer.city) countryToUse = findCountryByCity(performer.city);

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
                                        } catch (e) {
                                            console.error('Error refreshing location data:', e);
                                        }
                                    })();
                                }}
                                className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                            >
                                Reset & Refresh Location
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div><strong>Country:</strong> {performer.country || 'Not set'}</div>
                            <div><strong>State:</strong> {performer.state || 'Not set'}</div>
                            <div><strong>City:</strong> {performer.city || 'Not set'}</div>
                            <div><strong>Google Maps Location:</strong> {performer.googleSearchLocation || 'Not set'}</div>
                            <div><strong>Selected Country:</strong> {selectedCountry?.label || 'Not selected'}</div>
                            <div><strong>Selected State:</strong> {selectedState?.label || 'Not selected'}</div>
                            <div><strong>Selected City:</strong> {selectedCity?.label || 'Not selected'}</div>
                            <div><strong>Location Options:</strong> {locationOptions.length}</div>
                        </div>
                        <div className="mt-3 flex gap-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${selectedCountry ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {selectedCountry ? '✓ Country Set' : '✗ Country Not Set'}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${selectedState ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {selectedState ? '✓ State Set' : '✗ State Not Set'}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${selectedCity ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {selectedCity ? '✓ City Set' : '✗ City Not Set'}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${performer.googleSearchLocation ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {performer.googleSearchLocation ? '✓ Location Set' : '✗ Location Not Set'}
                            </span>
                        </div>
                        {(!selectedCountry || !selectedState || !selectedCity) && (performer.country || performer.state || performer.city) && (
                            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                                <p className="text-xs text-yellow-800 font-medium mb-1">Current Location Data (from database):</p>
                                <div className="text-xs text-yellow-700">
                                    {performer.country && <span className="mr-3"><strong>Country:</strong> {performer.country}</span>}
                                    {performer.state && <span className="mr-3"><strong>State:</strong> {performer.state}</span>}
                                    {performer.city && <span><strong>City:</strong> {performer.city}</span>}
                                </div>
                                <p className="text-xs text-yellow-600 mt-1">This data will be preserved when saving if not re-selected above.</p>
                            </div>
                        )}
                    </div>
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location*</label>
                            <Controller name="location" control={control} rules={{ required: 'Please select a location' }} render={({ field }) => {
                                let allOptions = [...locationOptions];
                                if (performer.googleSearchLocation && !locationOptions.find(opt => opt.value === performer.googleSearchLocation)) {
                                    allOptions.unshift({ value: performer.googleSearchLocation, label: `${performer.googleSearchLocation} (Current)` });
                                }
                                return (
                                    <Select
                                        {...field}
                                        isClearable
                                        options={allOptions}
                                        placeholder="Search location..."
                                        onInputChange={(value, { action }) => {
                                            if (action === 'input-change') setLocation(value);
                                            if (action === 'input-blur' || action === 'menu-close') setLocation('');
                                        }}
                                        onChange={async (selectedOption) => {
                                            field.onChange(selectedOption ? selectedOption.value : null);
                                            if (selectedOption && typeof selectedOption.value === 'string' && selectedOption.value.startsWith('ChI')) {
                                                try {
                                                    setIsResolvingLocation(true);
                                                    await dispatch(getLocationDetails(selectedOption.value));
                                                } finally {
                                                    setIsResolvingLocation(false);
                                                }
                                            }
                                        }}
                                        value={allOptions.find((option) => option.value === field.value) || null}
                                    />
                                );
                            }} />
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                            {performer.googleSearchLocation && (
                                <div className="mt-2 p-2 bg-blue-50 rounded-md">
                                    <p className="text-xs text-blue-700"><strong>Current Google Maps Location:</strong> {performer.googleSearchLocation}</p>
                                    {performer.googleSearchLat && performer.googleSearchLong && (
                                        <p className="text-xs text-blue-600 mt-1">Coordinates: {performer.googleSearchLat}, {performer.googleSearchLong}</p>
                                    )}
                                </div>
                            )}
                        </div>
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


