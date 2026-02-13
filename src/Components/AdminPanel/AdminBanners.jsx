import React, { useState, useMemo } from 'react';
import { FaImage, FaPlus, FaTrash, FaBars, FaSearch, FaEye, FaPencilAlt, FaRegFileAlt, FaCalendarAlt, FaClosedCaptioning, FaCheckCircle } from 'react-icons/fa';

// Sample data for banners
const initialBanners = [
    {
        id: 1,
        title: "You're in Good Company",
        subtitle: "EventsNode - Events Management",
        
        image: 'https://images.unsplash.com/photo-1505238680356-667803448bb6?w=800&q=80',
        status: 'Enabled',
        updatedAt: '2024-12-09 12:46:38',
    },
    
];


const DetailItem = ({ icon, label, children }) => (
    <div>
        <p className="text-xs text-gray-500 flex items-center">{icon}<span className="ml-2">{label}</span></p>
        <div className="text-sm font-semibold text-gray-800 break-words mt-1">{children}</div>
    </div>
);


const AdminBanners = () => {
    const [banners, setBanners] = useState(initialBanners);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBanners, setSelectedBanners] = useState([]);

 
    const filteredBanners = useMemo(() => {
        if (!searchTerm) return banners;
        const lowercasedFilter = searchTerm.toLowerCase();
        return banners.filter(banner =>
            banner.title.toLowerCase().includes(lowercasedFilter) ||
            banner.subtitle.toLowerCase().includes(lowercasedFilter)
        );
    }, [searchTerm, banners]);

   
    const handleSelect = (id) => {
        setSelectedBanners(prev =>
            prev.includes(id) ? prev.filter(bannerId => bannerId !== id) : [...prev, id]
        );
    };
    
   
    const handleBulkDelete = () => {
        if (selectedBanners.length === 0) return alert('Please select banners to delete.');
        if (window.confirm(`Are you sure you want to delete ${selectedBanners.length} banner(s)?`)) {
            setBanners(prev => prev.filter(banner => !selectedBanners.includes(banner.id)));
            setSelectedBanners([]);
        }
    };

    
    const handleDeleteSingle = (bannerId) => {
        if (window.confirm('Are you sure you want to delete this banner?')) {
            setBanners(prev => prev.filter(banner => banner.id !== bannerId));
            setSelectedBanners(prev => prev.filter(id => id !== bannerId));
        }
    };
    
    
    const StatusBadge = ({ status }) => {
        const styles = {
            Enabled: 'bg-green-100 text-green-800',
            Disabled: 'bg-red-100 text-red-800'
        };
        return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${styles[status]}`}>{status}</span>;
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
            <header className="mb-6">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">

                {/* Title */}
                <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                    <FaImage className="text-2xl text-orange-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Banners</h1>
                </div>

                {/* Actions */}
                <div className="flex gap-2 w-full md:w-auto">

                <button
                    className="flex-1 md:flex-none
                            flex items-center justify-center
                            bg-green-500 hover:bg-green-600
                            text-white font-semibold py-2 px-4 text-sm
                            rounded-lg shadow-sm transition-colors"
                >
                    <FaPlus className="mr-2" /> Add New
                </button>

                <button
                    className="flex-1 md:flex-none
                            flex items-center justify-center
                            bg-blue-500 hover:bg-blue-600
                            text-white font-semibold py-2 px-4 text-sm
                            rounded-lg shadow-sm transition-colors"
                >
                    <FaBars className="mr-2" /> Order
                </button>

                </div>
            </div>
            </header>


            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="relative w-full">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by title or subtitle..." className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
            </div>

            <div className="space-y-5">
                {filteredBanners.length > 0 ? filteredBanners.map(banner => (
                    <div key={banner.id} className={`bg-white rounded-lg shadow-sm border transition-all duration-300 hover:shadow-lg ${selectedBanners.includes(banner.id) ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}`}>
                        
                        <input type="checkbox" checked={selectedBanners.includes(banner.id)} onChange={() => handleSelect(banner.id)} className="absolute m-4 h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500 z-10" />

                        <header className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                            <div className="pl-8"> 
                                <h3 className="font-bold text-lg text-indigo-700">{banner.title}</h3>
                                <p className="text-sm text-gray-500">Banner ID: <span className="font-medium text-gray-600">{banner.id}</span></p>
                            </div>
                            <StatusBadge status={banner.status} />
                        </header>

                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                            <DetailItem icon={<FaClosedCaptioning size={14} />} label="Subtitle">{banner.subtitle}</DetailItem>
                            <DetailItem icon={<FaImage size={14} />} label="Image">
                                <img src={banner.image} alt={banner.title} className="w-48 h-auto object-cover rounded-md mt-1 border" />
                            </DetailItem>
                            <DetailItem icon={<FaCalendarAlt size={14} />} label="Last Updated">{new Date(banner.updatedAt).toLocaleString('en-IN')}</DetailItem>
                        </div>
                        
                        <footer className="p-3 bg-gray-50 rounded-b-lg
                            flex gap-2
                            justify-between md:justify-end">

                            <button
                                className="flex-1 md:flex-none
                                        flex items-center justify-center
                                        text-sm font-semibold py-2 px-4
                                        rounded-lg bg-yellow-400 hover:bg-yellow-500
                                        text-white transition-colors"
                            >
                                <FaEye className="mr-2" />
                                View
                            </button>

                            <button
                                className="flex-1 md:flex-none
                                        flex items-center justify-center
                                        text-sm font-semibold py-2 px-4
                                        rounded-lg bg-blue-500 hover:bg-blue-600
                                        text-white transition-colors"
                            >
                                <FaPencilAlt className="mr-2" />
                                Edit
                            </button>

                            <button
                                onClick={() => handleDeleteSingle(banner.id)}
                                className="flex-1 md:flex-none
                                        flex items-center justify-center
                                        text-sm font-semibold py-2 px-4
                                        rounded-lg bg-red-500 hover:bg-red-600
                                        text-white transition-colors"
                            >
                                <FaTrash className="mr-2" />
                                Delete
                            </button>

                        </footer>

                    </div>
                )) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <FaImage className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700">No Banners Found</h3>
                        <p className="text-gray-500 mt-2">Your search for "{searchTerm}" did not match any banners.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBanners;
