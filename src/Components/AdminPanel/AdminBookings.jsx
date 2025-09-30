import React, { useState, useMemo, useRef, useEffect } from 'react';
import { FaMoneyBillWave, FaSearch, FaFilter, FaCheckCircle, FaTimesCircle, FaUndo, FaEllipsisV, FaTrash, FaPencilAlt, FaEye, FaDownload, FaFileInvoice, FaTicketAlt, FaCreditCard, FaUser, FaHashtag, FaCalendarAlt, FaClock, FaBoxOpen } from 'react-icons/fa';
import { IoIosSend } from "react-icons/io";

const mockBookings = [
    { id: 37, orderNumber: '173157935966', eventTitle: 'The Grand Music Festival 2025', ticketTitle: 'Early Bird General', quantity: 2, price: 5000.00, currency: 'INR', customerEmail: 'aisha.sharma@example.com', bookingStatus: 'Enabled', cancelStatus: 'Not Cancelled', createdAt: '2025-07-28 10:11:07', checkedIn: true, paymentType: 'Online', isPaid: 'Yes', transactionId: 'pay_PL9CAiV7oO5spG', isExpired: 'No' },
    { id: 39, orderNumber: '173157935967', eventTitle: 'Startup Summit 2025', ticketTitle: 'VIP Pass', quantity: 1, price: 10000.00, currency: 'INR', customerEmail: 'rohan.mehta@example.com', bookingStatus: 'Refunded', cancelStatus: 'Full Refund', createdAt: '2025-07-25 14:20:00', checkedIn: false, paymentType: 'Online', isPaid: 'Yes', transactionId: 'pay_PL9CAiV7oO5spH', isExpired: 'No' },
    { id: 40, orderNumber: '173157935999', eventTitle: 'Pune Food Carnival', ticketTitle: 'Family Pack', quantity: 4, price: 2500.00, currency: 'INR', customerEmail: 'kapoor.family@example.com', bookingStatus: 'Enabled', cancelStatus: 'Not Cancelled', createdAt: '2025-07-22 18:45:12', checkedIn: false, paymentType: 'Online', isPaid: 'Yes', transactionId: 'pay_ABCDE12345', isExpired: 'No' },
    { id: 41, orderNumber: '173157935900', eventTitle: 'Marathon for Hope', ticketTitle: 'Runner Kit', quantity: 1, price: 500.00, currency: 'INR', customerEmail: 'vikram.singh@example.com', bookingStatus: 'Failed', cancelStatus: 'N/A', createdAt: '2025-07-20 09:05:01', checkedIn: false, paymentType: 'Online', isPaid: 'No', transactionId: 'N/A', isExpired: 'No' },
];


const ActionsDropdown = ({ bookingId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => { if (ref.current && !ref.current.contains(event.target)) setIsOpen(false); };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    return (
        <div className="relative" ref={ref}>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-gray-200 transition-colors"><FaEllipsisV className="text-gray-500" /></button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 border border-gray-100 py-1">
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"><FaPencilAlt className="mr-3 text-gray-400" /> Edit</a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"><IoIosSend className="mr-3 text-gray-400" /> Send Email</a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"><FaTrash className="mr-3" /> Delete</a>
                </div>
            )}
        </div>
    );
};


const DetailItem = ({ icon, label, value }) => (
    <div>
        <p className="text-xs text-gray-500 flex items-center">{icon}<span className="ml-2">{label}</span></p>
        <p className="text-sm font-semibold text-gray-800 break-words mt-1">{value}</p>
    </div>
);


const AdminBookings = () => {
    const [bookings] = useState(mockBookings);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('bookings');

    const filteredBookings = useMemo(() => {
        const byTab = bookings.filter(booking => activeTab === 'failed' ? booking.bookingStatus === 'Failed' : booking.bookingStatus !== 'Failed');
        if (!searchTerm) return byTab;
        return byTab.filter(booking => Object.values(booking).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, bookings, activeTab]);

    const StatusBadge = ({ status }) => {
        const styles = { Enabled: 'bg-green-100 text-green-800', Refunded: 'bg-yellow-100 text-yellow-800', Failed: 'bg-red-100 text-red-800' };
        return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${styles[status]}`}>{status.toUpperCase()}</span>;
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6">
            <header className="mb-6">
                <div className="flex items-center space-x-3">
                    <div className="bg-indigo-100 p-2 rounded-lg"><FaMoneyBillWave className="text-2xl text-indigo-600" /></div>
                    <h1 className="text-3xl font-bold text-gray-800">Bookings</h1>
                </div>
            </header>

            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button onClick={() => setActiveTab('bookings')} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${activeTab === 'bookings' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Active</button>
                        <button onClick={() => setActiveTab('failed')} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${activeTab === 'failed' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Failed</button>
                    </div>
                    <div className="relative w-full md:w-80">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search all booking details..." className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                </div>
            </div>

            <div className="space-y-5">
                {filteredBookings.length > 0 ? filteredBookings.map(booking => (
                    <div key={booking.id} className="bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-indigo-300">
                        <header className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                            <div>
                                <h3 className="font-bold text-lg text-indigo-700">{booking.eventTitle}</h3>
                                <p className="text-sm text-gray-500">Order <span className="font-medium text-gray-600">#{booking.orderNumber}</span></p>
                            </div>
                            <StatusBadge status={booking.bookingStatus} />
                        </header>

                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
                           
                            <DetailItem icon={<FaUser size={14} />} label="Customer Email" value={booking.customerEmail} />
                            <DetailItem icon={<FaHashtag size={14} />} label="Transaction ID" value={booking.transactionId} />
                            <DetailItem icon={<FaTicketAlt size={14} />} label="Ticket Title" value={booking.ticketTitle} />
                            <DetailItem icon={<FaBoxOpen size={14} />} label="Quantity" value={booking.quantity} />
                            
                           
                            <DetailItem icon={<FaMoneyBillWave size={14} />} label="Net Price" value={`${new Intl.NumberFormat('en-IN', { style: 'currency', currency: booking.currency }).format(booking.price)}`} />
                            <DetailItem icon={<FaCreditCard size={14} />} label="Currency" value={booking.currency} />
                            <DetailItem icon={<FaUndo size={14} />} label="Cancel Status" value={booking.cancelStatus} />
                            <DetailItem icon={<FaCalendarAlt size={14} />} label="Created At" value={booking.createdAt} />
                        </div>

                        <footer className="p-3 bg-gray-50 rounded-b-lg flex justify-end items-center space-x-2">
                            <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"><FaEye className="mr-2" />View</button>
                            <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-colors"><FaDownload className="mr-2" />Download</button>
                            <button className="flex items-center text-sm font-semibold py-2 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-colors"><FaFileInvoice className="mr-2" />Invoice</button>
                            <ActionsDropdown bookingId={booking.id} />
                        </footer>
                    </div>
                )) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <FaSearch className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700">No Bookings Found</h3>
                        <p className="text-gray-500 mt-2">Your search for "{searchTerm}" did not match any bookings. Try a different search term.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBookings;