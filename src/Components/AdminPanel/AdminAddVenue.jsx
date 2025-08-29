import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import { FaBuilding, FaArrowLeft, FaSave } from 'react-icons/fa';

import { getLocation } from '../../redux/actions/master/location/location';
import { getLocationDetails } from '../../redux/actions/master/location/locationDetail';
import { createVenue } from '../../redux/actions/master/Venue/createVenue';

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
    const [locationQuery, setLocationQuery] = useState('');

    const {
        control,
        handleSubmit,
        register,
        setValue,
        watch,
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

    const place_id = watch('location');

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const response = await fetch(`http://dev.eventsnode.com:3000/api/categories?type=Venue`);
                const data = await response.json();
                const formatted = data.data?.map((sub) => ({ label: sub.name, value: sub.name })) || [];
                setSubCategoryList(formatted);
            } catch (error) {
                setSubCategoryList([]);
            }
        };
        fetchSubCategories();
    }, []);

    // location suggestions and details
    useEffect(() => {
        if (locationQuery) dispatch(getLocation(locationQuery));
    }, [dispatch, locationQuery]);

    useEffect(() => {
        if (place_id) dispatch(getLocationDetails(place_id));
    }, [dispatch, place_id]);

    const locationsStore = useSelector((state) => state.locationsReducer) || { locations: [] };
    const locationOptions = Array.isArray(locationsStore?.locations)
        ? locationsStore.locations.map((item) => ({ value: item.place_id, label: item.description }))
        : [];

    const locationDetailsStore = useSelector((state) => state.locationDetailsReducer) || { locationDetails: {} };
    const locationDetails = locationDetailsStore.locationDetails || {};

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
            formData.append('googleSearchLocation', data.location || '');
            formData.append('googleSearchLat', locationDetails.location?.lat || '');
            formData.append('googleSearchLong', locationDetails.location?.lng || '');

            // basics
            formData.append('name', data.listingTitle || '');
            formData.append('description', data.listingDescription || '');
            formData.append('address', locationDetails.address || '');
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
            onCreate?.();
            onBack?.();
        } catch (err) {
            // handled by toasts in action if present
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
                            <Controller
                                name="location"
                                control={control}
                                rules={{ required: 'Please select a location' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isClearable
                                        options={locationOptions}
                                        placeholder="Search location..."
                                        onInputChange={(value, { action }) => {
                                            if (action === 'input-change') setLocationQuery(value);
                                            if (action === 'input-blur' || action === 'menu-close') setLocationQuery('');
                                        }}
                                        onChange={(opt) => field.onChange(opt ? opt.value : null)}
                                        value={locationOptions.find((o) => o.value === field.value) || null}
                                    />
                                )}
                            />
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                        </div>
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
        </div>
    );
};

export default AdminAddVenue;


