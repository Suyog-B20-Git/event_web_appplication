import React, { useState } from 'react';
import { FaWallet, FaPlus, FaSearch, FaEye, FaPencilAlt, FaTrash, FaRupeeSign, FaFileInvoiceDollar, FaChartLine, FaUserTie } from 'react-icons/fa';

// Sample data for commissions.
const initialCommissions = [
    {
        id: 1,
        organiser: 'EventsNode AI',
        totalBookings: 10000.00,
        adminCommission: 700.00,
        adminTax: 0.00,
        organiserEarning: 9300.00,
        status: 'Paid',
        updatedAt: '2025-07-29 13:53:00'
    },
    {
        id: 2,
        organiser: 'Future Fest',
        totalBookings: 25000.00,
        adminCommission: 1750.00,
        adminTax: 150.00,
        organiserEarning: 23100.00,
        status: 'Pending',
        updatedAt: '2025-07-28 11:20:00'
    },
    {
        id: 3,
        organiser: 'Sun Corp',
        totalBookings: 8500.00,
        adminCommission: 595.00,
        adminTax: 45.50,
        organiserEarning: 7859.50,
        status: 'Paid',
        updatedAt: '2025-07-27 18:10:00'
    }
];


const DetailItem = ({ icon, label, children }) => (
    <div>
        <p className="text-xs text-gray-500 flex items-center">{icon}<span className="ml-2">{label}</span></p>
        <div className="text-sm font-semibold text-gray-800 break-words mt-1">{children}</div>
    </div>
);


const AdminCommissions = () => {
    const [commissions, setCommissions] = useState(initialCommissions);
    const [selectedCommissions, setSelectedCommissions] = useState([]);

   
    const handleSelectCommission = (id) => {
        setSelectedCommissions(prev =>
            prev.includes(id) ? prev.filter(commissionId => commissionId !== id) : [...prev, id]
        );
    };
    
   
    const handleBulkDelete = () => {
        if (selectedCommissions.length === 0) return alert('Please select commissions to delete.');
        if (window.confirm(`Are you sure you want to delete ${selectedCommissions.length} commission record(s)?`)) {
            setCommissions(prev => prev.filter(commission => !selectedCommissions.includes(commission.id)));
            setSelectedCommissions([]);
        }
    };

    
    const handleDeleteSingle = (commissionId) => {
        if (window.confirm('Are you sure you want to delete this commission record?')) {
            setCommissions(prev => prev.filter(commission => commission.id !== commissionId));
            setSelectedCommissions(prev => prev.filter(id => id !== commissionId));
        }
    };
    
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    };

   
    const StatusBadge = ({ status }) => {
        const styles = { 
            Paid: 'bg-green-100 text-green-800', 
            Pending: 'bg-yellow-100 text-yellow-800',
            Failed: 'bg-red-100 text-red-800'
        };
        return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${styles[status]}`}>{status.toUpperCase()}</span>;
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
            <header className="mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-purple-100 p-2 rounded-lg"><FaWallet className="text-2xl text-purple-600" /></div>
                        <h1 className="text-3xl font-bold text-gray-800">Commissions</h1>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        {selectedCommissions.length > 0 && (
                            <button onClick={handleBulkDelete} className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                                <FaTrash className="mr-2" /> Delete ({selectedCommissions.length})
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <div className="space-y-5">
                {commissions.length > 0 ? commissions.map(item => (
                    <div key={item.id} className={`bg-white rounded-lg shadow-sm border transition-all duration-300 hover:shadow-lg ${selectedCommissions.includes(item.id) ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}`}>
                        
                        <input type="checkbox" checked={selectedCommissions.includes(item.id)} onChange={() => handleSelectCommission(item.id)} className="absolute m-4 h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500 z-10" />

                        <header className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                            <div className="pl-8"> 
                                <h3 className="font-bold text-lg text-indigo-700">{item.organiser}</h3>
                                <p className="text-sm text-gray-500">Record ID: <span className="font-medium text-gray-600">{item.id}</span></p>
                            </div>
                            <StatusBadge status={item.status} />
                        </header>

                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
                            <DetailItem icon={<FaChartLine size={14} />} label="Total Bookings">{formatCurrency(item.totalBookings)}</DetailItem>
                            <DetailItem icon={<FaFileInvoiceDollar size={14} />} label="Admin Commission">{formatCurrency(item.adminCommission)}</DetailItem>
                            <DetailItem icon={<FaRupeeSign size={14} />} label="Admin Tax">{formatCurrency(item.adminTax)}</DetailItem>
                            <DetailItem icon={<FaUserTie size={14} />} label="Organiser Earning">{formatCurrency(item.organiserEarning)}</DetailItem>
                        </div>
                        
                        <footer className="p-3 bg-gray-50 rounded-b-lg flex justify-end items-center space-x-2">
                           <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"><FaEye className="mr-2"/>View</button>
                           <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"><FaPencilAlt className="mr-2"/>Edit</button>
                           <button onClick={() => handleDeleteSingle(item.id)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"><FaTrash className="mr-2"/>Delete</button>
                        </footer>
                    </div>
                )) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <FaWallet className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700">No Commission Records</h3>
                        <p className="text-gray-500 mt-2">There are currently no commissions to display.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCommissions;
