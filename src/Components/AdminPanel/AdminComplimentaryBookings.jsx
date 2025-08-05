import React, { useState, useMemo } from 'react';
import { FaPuzzlePiece, FaTrash, FaSearch, FaEye, FaPencilAlt, FaCalendarAlt, FaTicketAlt, FaUser, FaCreditCard, FaCheckCircle, FaDownload, FaFileExport } from 'react-icons/fa';

// Sample data for complimentary bookings
const initialBookings = [
    {
        id: 29,
        orderNumber: '1731066701329',
        eventTitle: 'PAYMENT TEST EVENT',
        ticketTitle: 'TEST SINGLE TICKET',
        quantity: 1,
        netPrice: 1000.00,
        currency: 'INR',
        customerEmail: 'smathew@masterblocks.co.in',
        bookingCancel: 'No Cancellation',
        status: 'Enabled',
        createdAt: '2024-11-08 11:51:41',
        checkedIn: 'No',
        paymentType: 'Offline',
        isPaid: 'Yes',
    },
    {
        id: 27,
        orderNumber: '1728245052595',
        eventTitle: 'CONQUER THE WAVES (VAGATOR, GOA)',
        ticketTitle: 'GROUP BOOKING (SPAX)',
        quantity: 1,
        netPrice: 18900.00,
        currency: 'INR',
        customerEmail: 'admin@admin.com',
        bookingCancel: 'No Cancellation',
        status: 'Enabled',
        createdAt: '2024-10-06 20:04:12',
        checkedIn: 'Yes',
        paymentType: 'Offline',
        isPaid: 'Yes',
    },
    {
        id: 26,
        orderNumber: '1727252593936',
        eventTitle: 'CONQUER THE WAVES (VAGATOR, GOA)',
        ticketTitle: 'GROUP BOOKING (SPAX)',
        quantity: 1,
        netPrice: 18900.00,
        currency: 'INR',
        customerEmail: 'admin@admin.com',
        bookingCancel: 'No Cancellation',
        status: 'Enabled',
        createdAt: '2024-09-25 08:23:13',
        checkedIn: 'No',
        paymentType: 'Offline',
        isPaid: 'Yes',
    }
];


const DetailItem = ({ icon, label, children }) => (
    <div>
        <p className="text-xs text-gray-500 flex items-center">{icon}<span className="ml-2">{label}</span></p>
        <div className="text-sm font-semibold text-gray-800 break-words mt-1">{children}</div>
    </div>
);


const AdminComplimentaryBookings = () => {
    const [bookings, setBookings] = useState(initialBookings);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBookings, setSelectedBookings] = useState([]);

    
    const filteredBookings = useMemo(() => {
        if (!searchTerm) return bookings;
        return bookings.filter(booking =>
            booking.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, bookings]);

    
    const handleSelect = (id) => {
        setSelectedBookings(prev =>
            prev.includes(id) ? prev.filter(bookingId => bookingId !== id) : [...prev, id]
        );
    };
    
    
    const handleBulkDelete = () => {
        if (selectedBookings.length === 0) return alert('Please select bookings to delete.');
        if (window.confirm(`Are you sure you want to delete ${selectedBookings.length} booking(s)?`)) {
            setBookings(prev => prev.filter(booking => !selectedBookings.includes(booking.id)));
            setSelectedBookings([]);
        }
    };

    
    const handleDeleteSingle = (bookingId) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            setBookings(prev => prev.filter(booking => booking.id !== bookingId));
            setSelectedBookings(prev => prev.filter(id => id !== bookingId));
        }
    };
    
    
    const StatusBadge = ({ status }) => {
        const styles = {
            Enabled: 'bg-green-100 text-green-800',
            Disabled: 'bg-red-100 text-red-800'
        };
        return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${styles[status]}`}>{status}</span>;
    };

    const formatCurrency = (amount, currency) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency }).format(amount);
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
            <header className="mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-purple-100 p-2 rounded-lg"><FaPuzzlePiece className="text-2xl text-purple-600" /></div>
                        <h1 className="text-3xl font-bold text-gray-800">Complimentary Bookings</h1>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        {selectedBookings.length > 0 && (
                            <button onClick={handleBulkDelete} className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-colors">
                                <FaTrash className="mr-2" /> Bulk Delete ({selectedBookings.length})
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="relative w-full">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by Event Title..." className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
            </div>

            <div className="space-y-5">
                {filteredBookings.length > 0 ? filteredBookings.map(booking => (
                    <div key={booking.id} className={`bg-white rounded-lg shadow-sm border transition-all duration-300 hover:shadow-lg ${selectedBookings.includes(booking.id) ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}`}>
                        
                        <input type="checkbox" checked={selectedBookings.includes(booking.id)} onChange={() => handleSelect(booking.id)} className="absolute m-4 h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500 z-10" />

                        <header className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                            <div className="pl-8"> 
                                <h3 className="font-bold text-lg text-indigo-700">{booking.eventTitle}</h3>
                                <p className="text-sm text-gray-500">Order #: <span className="font-medium text-gray-600">{booking.orderNumber}</span></p>
                            </div>
                            <StatusBadge status={booking.status} />
                        </header>

                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
                            <DetailItem icon={<FaUser size={14} />} label="Customer Email">{booking.customerEmail}</DetailItem>
                            <DetailItem icon={<FaTicketAlt size={14} />} label="Ticket">{booking.ticketTitle} (Qty: {booking.quantity})</DetailItem>
                            <DetailItem icon={<FaCreditCard size={14} />} label="Net Price">{formatCurrency(booking.netPrice, booking.currency)}</DetailItem>
                            <DetailItem icon={<FaCheckCircle size={14} />} label="Paid / Checked In">
                                <span className={booking.isPaid === 'Yes' ? 'text-green-600' : 'text-red-600'}>{booking.isPaid}</span> / <span className={booking.checkedIn === 'Yes' ? 'text-green-600' : 'text-red-600'}>{booking.checkedIn}</span>
                            </DetailItem>
                        </div>
                        
                        <footer className="p-3 bg-gray-50 rounded-b-lg flex justify-end items-center space-x-2">
                           <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"><FaPencilAlt className="mr-2"/>Edit</button>
                           <button onClick={() => handleDeleteSingle(booking.id)} className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"><FaTrash className="mr-2"/>Delete</button>
                           <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"><FaDownload className="mr-2"/>Download Zip</button>
                           <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white transition-colors"><FaEye className="mr-2"/>View</button>
                           <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors"><FaFileExport className="mr-2"/>Export Attendees</button>
                        </footer>
                    </div>
                )) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <FaPuzzlePiece className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700">No Bookings Found</h3>
                        <p className="text-gray-500 mt-2">Your search for "{searchTerm}" did not match any bookings.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminComplimentaryBookings;
