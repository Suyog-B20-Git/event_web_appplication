import React, { useState, useMemo } from 'react';
import { FaMapMarkedAlt, FaPlus, FaTrash, FaBars, FaSearch, FaEye, FaPencilAlt, FaBuilding, FaTree, FaCheckSquare, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

// Sample data for venues
const initialVenues = [
    {
        id: 117,
        title: 'The Westin Pune Koregaon Park',
        venueType: 'Hotel',
        locationType: 'Indoor',
        showQuotationForm: 'Yes',
        status: 'Enabled',
        updatedAt: '2024-12-19 14:17:10',
        facebook: 'https://www.facebook.com/westinpune',
        twitter: 'https://twitter.com/westinpune',
        instagram: 'https://www.instagram.com/westinpune/',
        youtube: ''
    },
    {
        id: 118,
        title: 'KAMSHET DAM',
        venueType: 'LANDSCAPE',
        locationType: 'Outdoor',
        showQuotationForm: 'No',
        status: 'Enabled',
        updatedAt: '2024-12-19 13:35:33',
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: ''
    },
    {
        id: 116,
        title: 'Club LPK - Love and Passion Karma',
        venueType: 'Dance Club and Nightclub',
        locationType: 'Outdoor',
        showQuotationForm: 'No',
        status: 'Enabled',
        updatedAt: '2024-12-17 08:40:15',
        facebook: 'https://www.facebook.com/lpkwaterfront/',
        twitter: '',
        instagram: 'https://', 
        youtube: ''
    }
];


const DetailItem = ({ icon, label, children }) => (
    <div>
        <p className="text-xs text-gray-500 flex items-center">{icon}<span className="ml-2">{label}</span></p>
        <div className="text-sm font-semibold text-gray-800 break-words mt-1">{children}</div>
    </div>
);


const AdminVenues = () => {
    const [venues, setVenues] = useState(initialVenues);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVenues, setSelectedVenues] = useState([]);

   
    const filteredVenues = useMemo(() => {
        if (!searchTerm) return venues;
        return venues.filter(venue =>
            venue.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, venues]);

   
    const handleSelect = (id) => {
        setSelectedVenues(prev =>
            prev.includes(id) ? prev.filter(venueId => venueId !== id) : [...prev, id]
        );
    };
    
  
    const handleBulkDelete = () => {
        if (selectedVenues.length === 0) return alert('Please select venues to delete.');
        if (window.confirm(`Are you sure you want to delete ${selectedVenues.length} venue(s)?`)) {
            setVenues(prev => prev.filter(venue => !selectedVenues.includes(venue.id)));
            setSelectedVenues([]);
        }
    };

  
    const handleDeleteSingle = (venueId) => {
        if (window.confirm('Are you sure you want to delete this venue?')) {
            setVenues(prev => prev.filter(venue => venue.id !== venueId));
            setSelectedVenues(prev => prev.filter(id => id !== venueId));
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
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-teal-100 p-2 rounded-lg"><FaMapMarkedAlt className="text-2xl text-teal-600" /></div>
                        <h1 className="text-3xl font-bold text-gray-800">Venues</h1>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                         <button className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                            <FaPlus className="mr-2" /> Add New
                        </button>
                        {selectedVenues.length > 0 && (
                            <button onClick={handleBulkDelete} className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                                <FaTrash className="mr-2" /> Bulk Delete ({selectedVenues.length})
                            </button>
                        )}
                         <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                            <FaBars className="mr-2" /> Order
                        </button>
                    </div>
                </div>
            </header>

            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="relative w-full">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by title..." className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
            </div>

            <div className="space-y-5">
                {filteredVenues.length > 0 ? filteredVenues.map(venue => (
                    <div key={venue.id} className={`bg-white rounded-lg shadow-sm border transition-all duration-300 hover:shadow-lg ${selectedVenues.includes(venue.id) ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}`}>
                        
                        <input type="checkbox" checked={selectedVenues.includes(venue.id)} onChange={() => handleSelect(venue.id)} className="absolute m-4 h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500 z-10" />

                        <header className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                            <div className="pl-8"> 
                                <h3 className="font-bold text-lg text-indigo-700">{venue.title}</h3>
                                <p className="text-sm text-gray-500">Venue ID: <span className="font-medium text-gray-600">{venue.id}</span></p>
                            </div>
                            <StatusBadge status={venue.status} />
                        </header>

                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
                            <DetailItem icon={<FaBuilding size={14} />} label="Venue Type">{venue.venueType}</DetailItem>
                            <DetailItem icon={<FaTree size={14} />} label="Location Type">{venue.locationType}</DetailItem>
                            <DetailItem icon={<FaCheckSquare size={14} />} label="Quotation Form">
                                 <span className={venue.showQuotationForm === 'Yes' ? 'text-green-600 font-bold' : 'text-gray-500'}>{venue.showQuotationForm}</span>
                            </DetailItem>
                            <div className="space-y-2">
                                <p className="text-xs text-gray-500">Social Links</p>
                                <div className="flex space-x-3">
                                    {venue.facebook && <a href={venue.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800"><FaFacebook size={20}/></a>}
                                    {venue.twitter && <a href={venue.twitter} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-700"><FaTwitter size={20}/></a>}
                                    {venue.instagram && <a href={venue.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700"><FaInstagram size={20}/></a>}
                                    {venue.youtube && <a href={venue.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800"><FaYoutube size={20}/></a>}
                                </div>
                            </div>
                        </div>
                        
                        <footer className="p-3 bg-gray-50 rounded-b-lg flex justify-end items-center space-x-2">
                           <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white transition-colors"><FaEye className="mr-2"/>View</button>
                           <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"><FaPencilAlt className="mr-2"/>Edit</button>
                           <button onClick={() => handleDeleteSingle(venue.id)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"><FaTrash className="mr-2"/>Delete</button>
                        </footer>
                    </div>
                )) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <FaMapMarkedAlt className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700">No Venues Found</h3>
                        <p className="text-gray-500 mt-2">Your search for "{searchTerm}" did not match any venues.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminVenues;
