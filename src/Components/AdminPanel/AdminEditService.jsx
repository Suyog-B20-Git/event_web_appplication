import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import { FaPuzzlePiece, FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import { getLocation } from '../../redux/actions/master/location/location';
import { getLocationDetails } from '../../redux/actions/master/location/locationDetail';
import { updateService } from '../../redux/actions/master/Services/updateService';

const AdminEditService = ({ service, onBack, onUpdate }) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [locationQuery, setLocationQuery] = useState('');
    const [isResolvingLocation, setIsResolvingLocation] = useState(false);
    const locationInputTimer = useRef(null);

    const { control, handleSubmit, register, setValue, watch, reset, formState: { errors } } = useForm();
    const place_id = watch('location');

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
    }, [service, reset]);

    useEffect(() => { if (locationQuery) dispatch(getLocation(locationQuery)); }, [dispatch, locationQuery]);
    const isValidPlaceId = (val) => typeof val === 'string' && /^ChI[A-Za-z0-9_-]{10,}$/.test(val);
    useEffect(() => {
        if (!place_id || !isValidPlaceId(place_id)) return;
        setIsResolvingLocation(true);
        Promise.resolve(dispatch(getLocationDetails(place_id)))
            .catch(() => { })
            .finally(() => setIsResolvingLocation(false));
    }, [dispatch, place_id]);

    const locationsStore = useSelector((state) => state.locationsReducer) || { locations: [] };
    const locationOptions = Array.isArray(locationsStore?.locations) ? locationsStore.locations.map((i) => ({ value: i.place_id, label: i.description })) : [];
    const locationDetailsStore = useSelector((state) => state.locationDetailsReducer) || { locationDetails: {} };
    const locationDetails = locationDetailsStore.locationDetails || {};

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
        formData.append('googleSearchLocation', data.location || service.googleSearchLocation || '');
        formData.append('googleSearchLat', locationDetails.location?.lat || service.googleSearchLat || '');
        formData.append('googleSearchLong', locationDetails.location?.lng || service.googleSearchLong || '');
        formData.append('name', data.listingTitle || '');
        formData.append('description', data.listingDescription || '');
        formData.append('address', locationDetails.address || service.address || '');
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
                            <Controller
                                name="location"
                                control={control}
                                rules={{ required: 'Please select a location' }}
                                render={({ field }) => {
                                    let allOptions = [...locationOptions];
                                    if (service?.googleSearchLocation && !locationOptions.find(opt => opt.value === service.googleSearchLocation)) {
                                        allOptions.unshift({ value: service.googleSearchLocation, label: `${service.googleSearchLocation} (Current)` });
                                    }
                                    return (
                                        <Select
                                            {...field}
                                            isClearable
                                            options={allOptions}
                                            placeholder="Search location..."
                                            onInputChange={(value, { action }) => {
                                                if (action === 'input-change') {
                                                    if (locationInputTimer.current) clearTimeout(locationInputTimer.current);
                                                    locationInputTimer.current = setTimeout(() => setLocationQuery(value), 400);
                                                }
                                                if (action === 'input-blur' || action === 'menu-close') {
                                                    setLocationQuery('');
                                                    if (locationInputTimer.current) { clearTimeout(locationInputTimer.current); locationInputTimer.current = null; }
                                                }
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
            {isResolvingLocation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-xl">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Resolving location…</h3>
                            <p className="text-sm text-gray-500">Please wait, fetching map details.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminEditService;


