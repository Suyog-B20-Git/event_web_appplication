import React, { useState, useMemo, useEffect } from 'react';
import { FaGlobe, FaPlus, FaTrash, FaBars, FaSearch, FaEye, FaPencilAlt, FaMoneyBillWave, FaTimes } from 'react-icons/fa';

// A list of world currencies
const initialCurrencies = [
    { id: 1, code: 'AED', name: 'United Arab Emirates Dirham' },
    { id: 2, code: 'AFN', name: 'Afghan Afghani' },
    { id: 3, code: 'ALL', name: 'Albanian Lek' },
    { id: 4, code: 'AMD', name: 'Armenian Dram' },
    { id: 5, code: 'ANG', name: 'Netherlands Antillean Guilder' },
    { id: 6, code: 'AOA', name: 'Angolan Kwanza' },
    { id: 7, code: 'ARS', name: 'Argentine Peso' },
    { id: 8, code: 'AUD', name: 'Australian Dollar' },
    { id: 9, code: 'AWG', name: 'Aruban Florin' },
    { id: 10, code: 'AZN', name: 'Azerbaijani Manat' },
    { id: 11, code: 'BAM', name: 'Bosnia-Herzegovina Convertible Mark' },
    { id: 12, code: 'BBD', name: 'Barbadian Dollar' },
    { id: 13, code: 'BDT', name: 'Bangladeshi Taka' },
    { id: 14, code: 'BGN', name: 'Bulgarian Lev' },
    { id: 15, code: 'BHD', name: 'Bahraini Dinar' },
    { id: 16, code: 'USD', name: 'United States Dollar' },
    { id: 17, code: 'EUR', name: 'Euro' },
    { id: 18, code: 'JPY', name: 'Japanese Yen' },
    { id: 19, code: 'GBP', name: 'British Pound Sterling' },
    { id: 20, code: 'INR', name: 'Indian Rupee' },
];


const DetailItem = ({ icon, label, children }) => (
    <div>
        <p className="text-sm text-gray-500 flex items-center">{icon}<span className="ml-2">{label}</span></p>
        <div className="text-base font-semibold text-gray-800 break-words mt-1">{children || <span className="text-gray-400 font-normal">N/A</span>}</div>
    </div>
);


const ViewCurrencyModal = ({ currency, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <header className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Currency Details</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-200">
                        <FaTimes size={20} />
                    </button>
                </header>
                <main className="p-6 space-y-4">
                    <DetailItem icon={<FaMoneyBillWave size={16} />} label="Currency Code">{currency.code}</DetailItem>
                    <DetailItem icon={<FaGlobe size={16} />} label="Currency Name">{currency.name}</DetailItem>
                </main>
                <footer className="p-4 bg-gray-50 rounded-b-xl text-right">
                     <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg">Close</button>
                </footer>
            </div>
        </div>
    );
};

// --- Main AdminCurrencies Component ---
const AdminCurrencies = () => {
    const [currencies, setCurrencies] = useState(initialCurrencies);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCurrencies, setSelectedCurrencies] = useState([]);
    const [viewingCurrency, setViewingCurrency] = useState(null);

    const filteredCurrencies = useMemo(() => {
        if (!searchTerm) return currencies;
        const lowercasedFilter = searchTerm.toLowerCase();
        return currencies.filter(currency =>
            currency.code.toLowerCase().includes(lowercasedFilter) ||
            currency.name.toLowerCase().includes(lowercasedFilter)
        );
    }, [searchTerm, currencies]);

    const handleSelect = (id) => {
        setSelectedCurrencies(prev =>
            prev.includes(id) ? prev.filter(currencyId => currencyId !== id) : [...prev, id]
        );
    };
    
    const handleBulkDelete = () => {
        if (selectedCurrencies.length === 0) return alert('Please select currencies to delete.');
        if (window.confirm(`Are you sure you want to delete ${selectedCurrencies.length} currency/currencies?`)) {
            setCurrencies(prev => prev.filter(currency => !selectedCurrencies.includes(currency.id)));
            setSelectedCurrencies([]);
        }
    };

    const handleDeleteSingle = (currencyId) => {
        if (window.confirm('Are you sure you want to delete this currency?')) {
            setCurrencies(prev => prev.filter(currency => currency.id !== currencyId));
            setSelectedCurrencies(prev => prev.filter(id => id !== currencyId));
        }
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
            {viewingCurrency && <ViewCurrencyModal currency={viewingCurrency} onClose={() => setViewingCurrency(null)} />}

            <header className="mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-lg"><FaGlobe className="text-2xl text-green-600" /></div>
                        <h1 className="text-3xl font-bold text-gray-800">Currencies</h1>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm">
                            <FaPlus className="mr-2" /> Add New
                        </button>
                        {selectedCurrencies.length > 0 && (
                            <button onClick={handleBulkDelete} className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm">
                                <FaTrash className="mr-2" /> Bulk Delete ({selectedCurrencies.length})
                            </button>
                        )}
                        <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm">
                            <FaBars className="mr-2" /> Order
                        </button>
                    </div>
                </div>
            </header>

            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="relative w-full">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by currency code or name..." className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
            </div>

            <div className="space-y-5">
                {filteredCurrencies.length > 0 ? filteredCurrencies.map(currency => (
                    <div key={currency.id} className={`bg-white rounded-lg shadow-sm border transition-all duration-300 hover:shadow-lg ${selectedCurrencies.includes(currency.id) ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}`}>
                        
                        <input type="checkbox" checked={selectedCurrencies.includes(currency.id)} onChange={() => handleSelect(currency.id)} className="absolute m-4 h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500 z-10" />

                        <header className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                            <div className="pl-8"> 
                                <h3 className="font-bold text-lg text-indigo-700">{currency.name}</h3>
                                <p className="text-sm text-gray-500">ID: <span className="font-medium text-gray-600">{currency.id}</span></p>
                            </div>
                        </header>

                        <div className="p-4">
                            <DetailItem icon={<FaMoneyBillWave size={14} />} label="Currency Code">{currency.code}</DetailItem>
                        </div>
                        
                        <footer className="p-3 bg-gray-50 rounded-b-lg flex justify-end items-center space-x-2">
                           <button onClick={() => setViewingCurrency(currency)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white"><FaEye className="mr-2"/>View</button>
                           <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"><FaPencilAlt className="mr-2"/>Edit</button>
                           <button onClick={() => handleDeleteSingle(currency.id)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white"><FaTrash className="mr-2"/>Delete</button>
                        </footer>
                    </div>
                )) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <FaGlobe className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700">No Currencies Found</h3>
                        <p className="text-gray-500 mt-2">Your search for "{searchTerm}" did not match any currencies.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCurrencies;
