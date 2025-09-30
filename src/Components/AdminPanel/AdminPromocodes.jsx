import React, { useState, useMemo } from 'react';
import { FaTicketAlt, FaPlus, FaTrash, FaSearch, FaEye, FaPencilAlt, FaGift, FaHashtag, FaBoxOpen, FaCalendarTimes } from 'react-icons/fa';

// Sample data for promocodes
const initialPromocodes = [
    {
        id: 1,
        code: 'Black Friday',
        reward: 400,
        quantity: 300,
        type: 'Fixed',
        expiresAt: null, 
        status: 'Enabled',
        updatedAt: '2024-09-20 12:30:44',
    },
    
];


const DetailItem = ({ icon, label, children }) => (
    <div>
        <p className="text-xs text-gray-500 flex items-center">{icon}<span className="ml-2">{label}</span></p>
        <div className="text-sm font-semibold text-gray-800 break-words mt-1">{children}</div>
    </div>
);


const AdminPromocodes = () => {
    const [promocodes, setPromocodes] = useState(initialPromocodes);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPromocodes, setSelectedPromocodes] = useState([]);

   
    const filteredPromocodes = useMemo(() => {
        if (!searchTerm) return promocodes;
        return promocodes.filter(promo =>
            promo.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, promocodes]);

   
    const handleSelect = (id) => {
        setSelectedPromocodes(prev =>
            prev.includes(id) ? prev.filter(promoId => promoId !== id) : [...prev, id]
        );
    };
    
   
    const handleBulkDelete = () => {
        if (selectedPromocodes.length === 0) return alert('Please select promocodes to delete.');
        if (window.confirm(`Are you sure you want to delete ${selectedPromocodes.length} promocode(s)?`)) {
            setPromocodes(prev => prev.filter(promo => !selectedPromocodes.includes(promo.id)));
            setSelectedPromocodes([]);
        }
    };

    
    const handleDeleteSingle = (promoId) => {
        if (window.confirm('Are you sure you want to delete this promocode?')) {
            setPromocodes(prev => prev.filter(promo => promo.id !== promoId));
            setSelectedPromocodes(prev => prev.filter(id => id !== promoId));
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
                        <div className="bg-red-100 p-2 rounded-lg"><FaTicketAlt className="text-2xl text-red-600" /></div>
                        <h1 className="text-3xl font-bold text-gray-800">Promocodes</h1>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                         <button className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                            <FaPlus className="mr-2" /> Add New
                        </button>
                        {selectedPromocodes.length > 0 && (
                            <button onClick={handleBulkDelete} className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                                <FaTrash className="mr-2" /> Bulk Delete ({selectedPromocodes.length})
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="relative w-full">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by code..." className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
            </div>

            <div className="space-y-5">
                {filteredPromocodes.length > 0 ? filteredPromocodes.map(promo => (
                    <div key={promo.id} className={`bg-white rounded-lg shadow-sm border transition-all duration-300 hover:shadow-lg ${selectedPromocodes.includes(promo.id) ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}`}>
                        
                        <input type="checkbox" checked={selectedPromocodes.includes(promo.id)} onChange={() => handleSelect(promo.id)} className="absolute m-4 h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500 z-10" />

                        <header className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                            <div className="pl-8"> 
                                <h3 className="font-bold text-lg text-indigo-700">{promo.code}</h3>
                                <p className="text-sm text-gray-500">Promo ID: <span className="font-medium text-gray-600">{promo.id}</span></p>
                            </div>
                            <StatusBadge status={promo.status} />
                        </header>

                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
                            <DetailItem icon={<FaGift size={14} />} label="Reward (e.g 5.00)">{promo.reward}</DetailItem>
                            <DetailItem icon={<FaBoxOpen size={14} />} label="Quantity">{promo.quantity}</DetailItem>
                            <DetailItem icon={<FaHashtag size={14} />} label="Type">{promo.type}</DetailItem>
                            <DetailItem icon={<FaCalendarTimes size={14} />} label="Expires At">{promo.expiresAt || 'N/A'}</DetailItem>
                        </div>
                        
                        <footer className="p-3 bg-gray-50 rounded-b-lg flex justify-end items-center space-x-2">
                           <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white transition-colors"><FaEye className="mr-2"/>View</button>
                           <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"><FaPencilAlt className="mr-2"/>Edit</button>
                           <button onClick={() => handleDeleteSingle(promo.id)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"><FaTrash className="mr-2"/>Delete</button>
                        </footer>
                    </div>
                )) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <FaTicketAlt className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700">No Promocodes Found</h3>
                        <p className="text-gray-500 mt-2">Your search for "{searchTerm}" did not match any promocodes.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPromocodes;
