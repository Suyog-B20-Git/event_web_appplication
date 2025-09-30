import React, { useState, useMemo } from 'react';
import { FaPuzzlePiece, FaPlus, FaSearch, FaEye, FaPencilAlt, FaTrash, FaTag, FaCheckCircle, FaCalendarAlt, FaBars } from 'react-icons/fa';

const initialTags = [
    { id: 7, image: 'https://images.unsplash.com/photo-1579543591459-b1c597935c1a?w=400&h=225&fit=crop', title: 'Anchor Pooja Ozaal', type: 'None', profilePage: true, status: 'Enabled', updatedAt: '2025-07-28 10:11:07' },
    { id: 6, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=225&fit=crop', title: 'KinG Gizza', type: 'Artist', profilePage: true, status: 'Enabled', updatedAt: '2025-07-25 08:12:53' },
    { id: 4, image: 'https://images.unsplash.com/photo-1598387993441-a364f551403a?w=400&h=225&fit=crop', title: 'Piyush Mishra', type: 'None', profilePage: false, status: 'Enabled', updatedAt: '2025-06-14 13:46:18' },
    { id: 3, image: 'https://images.unsplash.com/photo-1587401213793-9d2a487124cf?w=400&h=225&fit=crop', title: 'Sun Corp', type: 'None', profilePage: true, status: 'Enabled', updatedAt: '2025-05-04 16:01:29' },
    { id: 8, image: 'https://images.unsplash.com/photo-1579581912693-c12181342675?w=400&h=225&fit=crop', title: 'Comedy Fest', type: 'Event', profilePage: false, status: 'Enabled', updatedAt: '2025-01-15 11:30:00' },
    { id: 9, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=225&fit=crop', title: 'Music Concert', type: 'Event', profilePage: true, status: 'Enabled', updatedAt: '2024-12-20 18:00:00' }
];


const DetailItem = ({ icon, label, children }) => (
    <div>
        <p className="text-xs text-gray-500 flex items-center">{icon}<span className="ml-2">{label}</span></p>
        <div className="text-sm font-semibold text-gray-800 break-words mt-1">{children}</div>
    </div>
);


const AdminTags = () => {
    const [tags, setTags] = useState(initialTags);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    const filteredTags = useMemo(() => {
        if (!searchTerm) return tags;
        return tags.filter(tag =>
            tag.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tag.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, tags]);

    const handleSelectTag = (id) => {
        setSelectedTags(prev => 
            prev.includes(id) ? prev.filter(tagId => tagId !== id) : [...prev, id]
        );
    };

    const handleBulkDelete = () => {
        if (selectedTags.length === 0) return alert('Please select tags to delete.');
        if (window.confirm(`Are you sure you want to delete ${selectedTags.length} tag(s)?`)) {
            setTags(prev => prev.filter(tag => !selectedTags.includes(tag.id)));
            setSelectedTags([]); 
        }
    };

    const handleDeleteSingle = (tagId) => {
        if (window.confirm('Are you sure you want to delete this tag?')) {
            setTags(prev => prev.filter(tag => tag.id !== tagId));
            setSelectedTags(prev => prev.filter(id => id !== tagId));
        }
    };
    
    const StatusBadge = ({ status }) => {
        const styles = { Enabled: 'bg-green-100 text-green-800', Disabled: 'bg-red-100 text-red-800' };
        return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${styles[status]}`}>{status.toUpperCase()}</span>;
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6">
            <header className="mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-indigo-100 p-2 rounded-lg"><FaPuzzlePiece className="text-2xl text-indigo-600" /></div>
                        <h1 className="text-3xl font-bold text-gray-800">Tags</h1>
                    </div>
                   
                    <div className="flex items-center space-x-2">
                         <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                            <FaPlus className="mr-2" /> Add New
                        </button>
                        {selectedTags.length > 0 && (
                            <button onClick={handleBulkDelete} className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                                <FaTrash className="mr-2" /> Bulk Delete ({selectedTags.length})
                            </button>
                        )}
                         <button className="flex items-center bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                            <FaBars className="mr-2" /> Order
                        </button>
                    </div>
                </div>
            </header>

            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="relative w-full md:w-1/2 lg:w-1/3">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search tags..." className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
            </div>

            <div className="space-y-5">
                {filteredTags.length > 0 ? filteredTags.map(tag => (
                    <div key={tag.id} className={`bg-white rounded-lg shadow-sm border transition-all duration-300 hover:shadow-lg ${selectedTags.includes(tag.id) ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}`}>
                      
                        <input type="checkbox" checked={selectedTags.includes(tag.id)} onChange={() => handleSelectTag(tag.id)} className="absolute m-4 h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500 z-10" />

                        <header className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                            <div className="pl-8"> 
                                <h3 className="font-bold text-lg text-indigo-700">{tag.title}</h3>
                                <p className="text-sm text-gray-500">Tag ID: <span className="font-medium text-gray-600">{tag.id}</span></p>
                            </div>
                            <StatusBadge status={tag.status} />
                        </header>

                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                            <DetailItem icon={<FaEye size={14} />} label="Image"><img src={tag.image} alt={tag.title} className="w-full h-auto max-h-48 object-cover rounded-md mt-1 border" /></DetailItem>
                            <DetailItem icon={<FaTag size={14} />} label="Type"><span className={`text-sm font-semibold px-3 py-1 rounded-full ${tag.type === 'Artist' ? 'bg-blue-100 text-blue-800' : tag.type === 'Event' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>{tag.type}</span></DetailItem>
                            <DetailItem icon={<FaCheckCircle size={14} />} label="Profile Page"><span className={tag.profilePage ? 'text-green-600 font-bold' : 'text-gray-500'}>{tag.profilePage ? 'Yes' : 'No'}</span></DetailItem>
                            <DetailItem icon={<FaCalendarAlt size={14} />} label="Last Updated"><span>{new Date(tag.updatedAt).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}</span></DetailItem>
                        </div>
                        
                      
                        <footer className="p-3 bg-gray-50 rounded-b-lg flex justify-end items-center space-x-2">
                           <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"><FaEye className="mr-2"/>View</button>
                           <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"><FaPencilAlt className="mr-2"/>Edit</button>
                          
                           <button onClick={() => handleDeleteSingle(tag.id)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"><FaTrash className="mr-2"/>Delete</button>
                        </footer>
                    </div>
                )) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <FaSearch className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700">No Tags Found</h3>
                        <p className="text-gray-500 mt-2">Your search for "{searchTerm}" did not match any tags.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTags;