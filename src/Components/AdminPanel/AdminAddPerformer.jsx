import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { FaUsers, FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import { Country, State, City } from 'country-state-city';
import { toast } from 'react-toastify';
import { getLocation } from '../../redux/actions/master/location/location';
import { getLocationDetails } from '../../redux/actions/master/location/locationDetail';
import { axiosInstance } from '../../../utility/utils.jsx';

const AdminAddPerformer = ({ onBack, onCreate }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [selectedTagKeywords, setSelectedTagKeywords] = useState([]);
    const [customTag, setCustomTag] = useState('');
    const [location, setLocation] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const { control, handleSubmit, watch, setValue, register, formState: { errors } } = useForm();
    const place_id = watch('location');

    const countryOptions = Country.getAllCountries().map((c) => ({ value: c.isoCode, label: c.name }));
    const stateOptions = selectedCountry ? State.getStatesOfCountry(selectedCountry.value).map((s) => ({ value: s.isoCode, label: s.name })) : [];
    const cityOptions = selectedState ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map((c) => ({ value: c.name, label: c.name })) : [];

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/categories?type=Performer`);
                const data = await res.json();
                const formatted = data.data?.map((sub) => ({ label: sub.name, value: sub.name })) || [];
                setSubCategoryList(formatted);
            } catch (e) {
                console.error('Error fetching subcategories:', e);
                setSubCategoryList([]);
            }
        };
        fetchSubCategories();
    }, []);

    useEffect(() => {
        if (location) dispatch(getLocation(location));
    }, [dispatch, location]);

    useEffect(() => {
        if (place_id) dispatch(getLocationDetails(place_id));
    }, [dispatch, place_id]);

    const storeLocations = useSelector((state) => state.locationsReducer) || { locations: [] };
    const locationOptions = (Array.isArray(storeLocations?.locations) ? storeLocations.locations : []).map((item) => ({ value: item.place_id, label: item.description }));
    const storeLocationDetails = useSelector((state) => state.locationDetailsReducer) || { locationDetails: {} };
    const locationDetails = storeLocationDetails.locationDetails || {};

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
            formData.append('address', locationDetails.address || '');
            formData.append('googleSearchLocation', data.location || '');
            formData.append('googleSearchLat', locationDetails.location?.lat || '');
            formData.append('googleSearchLong', locationDetails.location?.lng || '');

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
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location*</label>
                            <Controller name="location" control={control} rules={{ required: 'Please select a location' }} render={({ field }) => (
                                <Select {...field} isClearable options={locationOptions} placeholder="Search location..." onInputChange={(value, { action }) => { if (action === 'input-change') setLocation(value); if (action === 'input-blur' || action === 'menu-close') setLocation(''); }} onChange={(selectedOption) => { field.onChange(selectedOption ? selectedOption.value : null); }} value={locationOptions.find((option) => option.value === field.value) || null} />
                            )} />
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                        </div>
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


