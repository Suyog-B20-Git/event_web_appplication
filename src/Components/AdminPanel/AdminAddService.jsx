import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import { FaPuzzlePiece, FaArrowLeft, FaSave } from 'react-icons/fa';
import { getLocation } from '../../redux/actions/master/location/location';
import { getLocationDetails } from '../../redux/actions/master/location/locationDetail';
import { createService } from '../../redux/actions/master/Services/createService';

const AdminAddService = ({ onBack, onCreate }) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [locationQuery, setLocationQuery] = useState('');
    const locationInputTimer = useRef(null);

    const { control, handleSubmit, register, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            listingTitle: '', listingDescription: '', phone: '', email: '', website: '', availableTime: '', location: ''
        }
    });

    const place_id = watch('location');

    useEffect(() => {
        const fetchSubs = async () => {
            try { const res = await fetch(`http://dev.eventsnode.com:3000/api/categories?type=Service`); const data = await res.json(); setSubCategoryList((data.data || []).map(s => ({ label: s.name, value: s.name }))); } catch { setSubCategoryList([]); }
        };
        fetchSubs();
    }, []);

    useEffect(() => { if (locationQuery) dispatch(getLocation(locationQuery)); }, [dispatch, locationQuery]);
    useEffect(() => { if (place_id) dispatch(getLocationDetails(place_id)); }, [dispatch, place_id]);

    const locationsStore = useSelector((state) => state.locationsReducer) || { locations: [] };
    const locationOptions = Array.isArray(locationsStore?.locations) ? locationsStore.locations.map((i) => ({ value: i.place_id, label: i.description })) : [];
    const locationDetailsStore = useSelector((state) => state.locationDetailsReducer) || { locationDetails: {} };
    const locationDetails = locationDetailsStore.locationDetails || {};

    const countryOptions = Country.getAllCountries().map((c) => ({ value: c.isoCode, label: c.name }));
    const stateOptions = selectedCountry ? State.getStatesOfCountry(selectedCountry.value).map((s) => ({ value: s.isoCode, label: s.name })) : [];
    const cityOptions = selectedState && selectedCountry ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map((ci) => ({ value: ci.name, label: ci.name })) : [];

    const onImage = (e) => { const f = e.target.files?.[0]; if (!f) return; if (f.size > 2 * 1024 * 1024) { setImageError('Image size must be less than 2MB'); return; } setImage(f); setImageError(''); };

    const onSubmit = async (data) => {
        const formData = new FormData();
        if (image) formData.append('profileImage', image);
        if (Array.isArray(data.categories)) data.categories.forEach((c) => formData.append('categories[]', c.value || c));
        formData.append('country', selectedCountry ? selectedCountry.label : '');
        formData.append('state', selectedState ? selectedState.label : '');
        formData.append('city', selectedCity ? selectedCity.label : '');
        formData.append('googleSearchLocation', data.location || '');
        formData.append('googleSearchLat', locationDetails.location?.lat || '');
        formData.append('googleSearchLong', locationDetails.location?.lng || '');
        formData.append('name', data.listingTitle || '');
        formData.append('description', data.listingDescription || '');
        formData.append('address', locationDetails.address || '');
        if (data.phone) formData.append('phoneNumber', data.phone);
        if (data.email) formData.append('email', data.email);
        if (data.website) formData.append('website', data.website);
        if (data.availableTime) formData.append('availableTime', data.availableTime);
        if (data.facebookUrl) formData.append('facebookUrl', data.facebookUrl);
        if (data.instagramUrl) formData.append('instagramUrl', data.instagramUrl);
        if (data.youtubeUrl) formData.append('youtubeUrl', data.youtubeUrl);
        if (data.twitterUrl) formData.append('twitterUrl', data.twitterUrl);

        await dispatch(createService(formData));
        onCreate?.();
        onBack?.();
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
            <header className="mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <button onClick={onBack} className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"><FaArrowLeft className="text-gray-600" /></button>
                        <div className="bg-indigo-100 p-2 rounded-lg"><FaPuzzlePiece className="text-2xl text-indigo-600" /></div>
                        <div><h1 className="text-3xl font-bold text-gray-800">Add Service</h1></div>
                    </div>
                    <button onClick={handleSubmit(onSubmit)} className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors"><FaSave className="mr-2" /> Create Service</button>
                </div>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Basic Information</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Categories*</label>
                        <Controller name="categories" control={control} rules={{ required: 'Please select at least one category' }} render={({ field }) => (<Select {...field} isMulti options={subCategoryList} placeholder="Select categories..." />)} />
                        {errors.categories && <p className="text-red-500 text-sm mt-1">{errors.categories.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Name*</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Listing Title" {...register('listingTitle', { required: 'Service name is required' })} />
                        {errors.listingTitle && <p className="text-red-500 text-sm mt-1">{errors.listingTitle.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description*</label>
                        <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y" rows={4} placeholder="Enter Description" {...register('listingDescription', { required: 'Description is required' })} />
                        {errors.listingDescription && <p className="text-red-500 text-sm mt-1">{errors.listingDescription.message}</p>}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Location and map</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Country*</label>
                            <Controller name="country" control={control} rules={{ required: 'Please select a country' }} render={({ field }) => (
                                <Select {...field} isClearable options={countryOptions} placeholder="Search country..." onChange={(opt) => { field.onChange(opt); setSelectedCountry(opt); setValue('state', null); setValue('city', null); }} value={selectedCountry} />)} />
                            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">States*</label>
                            <Controller name="state" control={control} rules={{ required: 'Please select a state' }} render={({ field }) => (
                                <Select {...field} isClearable isDisabled={!selectedCountry} options={stateOptions} placeholder="Search state..." onChange={(opt) => { field.onChange(opt); setSelectedState(opt); setValue('city', null); }} value={selectedState} />)} />
                            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City*</label>
                            <Controller name="city" control={control} rules={{ required: selectedState ? 'Please select a city' : 'Select a state first' }} render={({ field }) => (
                                <Select {...field} isClearable options={cityOptions} placeholder="Search city..." isDisabled={!selectedState} onChange={(opt) => { field.onChange(opt); setSelectedCity(opt); }} value={selectedCity} />)} />
                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location*</label>
                            <Controller name="location" control={control} rules={{ required: 'Please select a location' }} render={({ field }) => (
                                <Select {...field} isClearable options={locationOptions} placeholder="Search location..." onInputChange={(value, { action }) => { if (action === 'input-change') { if (locationInputTimer.current) clearTimeout(locationInputTimer.current); locationInputTimer.current = setTimeout(() => setLocationQuery(value), 400); } if (action === 'input-blur' || action === 'menu-close') { setLocationQuery(''); if (locationInputTimer.current) { clearTimeout(locationInputTimer.current); locationInputTimer.current = null; } } }} onChange={(opt) => field.onChange(opt ? opt.value : null)} value={locationOptions.find((o) => o.value === field.value) || null} />)} />
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Profile Image*</h2>
                    <input type="file" onChange={onImage} accept="image/*" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
                    <p className="text-gray-500 text-sm mt-1">Image size must be less than 2MB</p>
                </div>

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

export default AdminAddService;


