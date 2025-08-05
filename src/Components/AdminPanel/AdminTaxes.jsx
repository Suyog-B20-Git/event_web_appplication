import React, { useState, useMemo } from 'react';
import { FaFileInvoiceDollar, FaPlus, FaTrash, FaBars, FaSearch, FaEye, FaPencilAlt, FaRegFileAlt, FaPercentage, FaTag, FaBalanceScale } from 'react-icons/fa';

// Sample data for taxes.
const initialTaxes = [
    {
        id: 2,
        title: 'Admin FEE',
        rateType: 'Percent',
        rate: 2.50,
        netPrice: 'Excluding',
        status: 'Disabled',
        updatedAt: '2024-11-06 10:22:57',
        isAdminTax: true,
    },
    {
        id: 1,
        title: 'Convenience Fee',
        rateType: 'Percent',
        rate: 5.00,
        netPrice: 'Excluding',
        status: 'Disabled',
        updatedAt: '2024-11-06 07:42:23',
        isAdminTax: true,
    }
];


const DetailItem = ({ icon, label, children }) => (
    <div>
        <p className="text-xs text-gray-500 flex items-center">{icon}<span className="ml-2">{label}</span></p>
        <div className="text-sm font-semibold text-gray-800 break-words mt-1">{children}</div>
    </div>
);



const AdminTaxes = () => {
    const [taxes, setTaxes] = useState(initialTaxes);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTaxes, setSelectedTaxes] = useState([]);

    
    const filteredTaxes = useMemo(() => {
        if (!searchTerm) return taxes;
        return taxes.filter(tax =>
            tax.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, taxes]);

   
    const handleSelect = (id) => {
        setSelectedTaxes(prev =>
            prev.includes(id) ? prev.filter(taxId => taxId !== id) : [...prev, id]
        );
    };
    
    
    const handleBulkDelete = () => {
        if (selectedTaxes.length === 0) return alert('Please select taxes to delete.');
        if (window.confirm(`Are you sure you want to delete ${selectedTaxes.length} tax record(s)?`)) {
            setTaxes(prev => prev.filter(tax => !selectedTaxes.includes(tax.id)));
            setSelectedTaxes([]);
        }
    };

   
    const handleDeleteSingle = (taxId) => {
        if (window.confirm('Are you sure you want to delete this tax record?')) {
            setTaxes(prev => prev.filter(tax => tax.id !== taxId));
            setSelectedTaxes(prev => prev.filter(id => id !== taxId));
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
                        <div className="bg-blue-100 p-2 rounded-lg"><FaFileInvoiceDollar className="text-2xl text-blue-600" /></div>
                        <h1 className="text-3xl font-bold text-gray-800">Taxes</h1>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                            <FaPlus className="mr-2" /> Add New
                        </button>
                        {selectedTaxes.length > 0 && (
                            <button onClick={handleBulkDelete} className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                                <FaTrash className="mr-2" /> Bulk Delete ({selectedTaxes.length})
                            </button>
                        )}
                        <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                            <FaBars className="mr-2" /> Order
                        </button>
                    </div>
                </div>
            </header>

            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="relative w-full md:w-1/2 lg:w-1/3">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by title..." className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
            </div>

            <div className="space-y-5">
                {filteredTaxes.length > 0 ? filteredTaxes.map(tax => (
                    <div key={tax.id} className={`bg-white rounded-lg shadow-sm border transition-all duration-300 hover:shadow-lg ${selectedTaxes.includes(tax.id) ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}`}>
                        
                        <input type="checkbox" checked={selectedTaxes.includes(tax.id)} onChange={() => handleSelect(tax.id)} className="absolute m-4 h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500 z-10" />

                        <header className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                            <div className="pl-8"> 
                                <h3 className="font-bold text-lg text-indigo-700">{tax.title}</h3>
                                <p className="text-sm text-gray-500">Tax ID: <span className="font-medium text-gray-600">{tax.id}</span></p>
                            </div>
                            <StatusBadge status={tax.status} />
                        </header>

                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
                            <DetailItem icon={<FaTag size={14} />} label="Rate Type">{tax.rateType}</DetailItem>
                            <DetailItem icon={<FaPercentage size={14} />} label="Rate">{tax.rate.toFixed(2)}%</DetailItem>
                            <DetailItem icon={<FaBalanceScale size={14} />} label="Net Price">{tax.netPrice}</DetailItem>
                            <DetailItem icon={<FaFileInvoiceDollar size={14} />} label="Is Admin Tax?">
                                <span className={tax.isAdminTax ? 'text-green-600 font-bold' : 'text-gray-500'}>{tax.isAdminTax ? 'Yes' : 'No'}</span>
                            </DetailItem>
                        </div>
                        
                        <footer className="p-3 bg-gray-50 rounded-b-lg flex justify-end items-center space-x-2">
                           <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"><FaEye className="mr-2"/>View</button>
                           <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"><FaPencilAlt className="mr-2"/>Edit</button>
                           <button onClick={() => handleDeleteSingle(tax.id)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"><FaTrash className="mr-2"/>Delete</button>
                        </footer>
                    </div>
                )) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <FaRegFileAlt className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700">No Tax Records Found</h3>
                        <p className="text-gray-500 mt-2">Your search for "{searchTerm}" did not match any records.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTaxes;
