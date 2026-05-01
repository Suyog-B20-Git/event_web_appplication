import React, { useState, useMemo, useRef, useEffect } from 'react';
import { FaMoneyBillWave, FaSearch, FaFilter, FaCheckCircle, FaTimesCircle, FaUndo, FaEllipsisV, FaTrash, FaPencilAlt, FaEye, FaDownload, FaFileInvoice, FaTicketAlt, FaCreditCard, FaUser, FaHashtag, FaCalendarAlt, FaClock, FaBoxOpen } from 'react-icons/fa';
import { IoIosSend } from "react-icons/io";
import axios from "axios";

const actionsDropdownContent = (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 border border-gray-100 py-1">
        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"><FaPencilAlt className="mr-3 text-gray-400" /> Edit</a>
        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"><IoIosSend className="mr-3 text-gray-400" /> Send Email</a>
        <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"><FaTrash className="mr-3" /> Delete</a>
    </div>
);

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
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-center gap-2 text-sm font-semibold py-2 px-3 rounded-lg bg-gray-700 hover:bg-gray-800 text-white">
                <FaEllipsisV />
                Action
            </button>
            {isOpen && actionsDropdownContent}
        </div>
    );
};


const DetailItem = ({ icon, label, value }) => (
    <div>
        <p className="text-xs text-gray-500 flex items-center">{icon}<span className="ml-2">{label}</span></p>
        <p className="text-sm font-semibold text-gray-800 break-words mt-1">{value}</p>
    </div>
);


const EventSelector = ({ events, selectedEventId, onSelect, fetchMoreEvents }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    const filteredEvents = events.filter(ev => 
        ev.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedEvent = events.find(ev => ev._id === selectedEventId);

    useEffect(() => {
        const handleClickOutside = (event) => { if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false); };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg flex items-center justify-between text-gray-700 font-medium hover:bg-white transition-all focus:ring-2 focus:ring-indigo-500"
            >
                <FaFilter className="absolute left-4 text-gray-400" />
                <span className="truncate">{selectedEvent ? selectedEvent.name : "All Events"}</span>
                <FaEllipsisV className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''} text-gray-400 text-xs`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <div className="p-2 border-b border-gray-100 bg-gray-50">
                        <input 
                            type="text"
                            autoFocus
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                        <button 
                            onClick={() => { onSelect(''); setIsOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition ${!selectedEventId ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-gray-700'}`}
                        >
                            All Events
                        </button>
                        {filteredEvents.map(ev => (
                            <button 
                                key={ev._id}
                                onClick={() => { onSelect(ev._id); setIsOpen(false); }}
                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition border-t border-gray-50 ${selectedEventId === ev._id ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-gray-700'}`}
                            >
                                {ev.name}
                            </button>
                        ))}
                        {filteredEvents.length === 0 && (
                            <div className="px-4 py-6 text-center text-gray-400 text-sm">No events match your search</div>
                        )
                        /* Pagination/Load More could go here if needed */}
                    </div>
                </div>
            )}
        </div>
    );
};


const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState('');
    const rowsPerPage = 10;

    // View Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingOrder, setViewingOrder] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    const authToken = localStorage.getItem("authToken");

    const fetchBookings = async () => {
        setLoading(true);
        setError("");
        try {
            const status = 'active';
            const response = await axios.get(
                `https://dev.eventsnode.com/api/bookings/all-admin?page=${page}&limit=${rowsPerPage}&search=${searchTerm}&status=${status}&eventId=${selectedEventId}`,
                {
                    headers: {
                        Authorization: authToken,
                    },
                }
            );

            if (response.data.status) {
                setBookings(response.data.data.bookings);
                setTotalPages(response.data.data.pagination.totalPages);
                setTotalResults(response.data.data.pagination.total);
            } else {
                setError("Failed to fetch bookings.");
            }
        } catch (err) {
            console.error("Error fetching admin bookings:", err);
            setError("Something went wrong while fetching bookings.");
        } finally {
            setLoading(false);
        }
    };

    const handleViewBooking = async (orderId) => {
        setIsModalOpen(true);
        setLoadingDetails(true);
        setViewingOrder(null);
        try {
            const response = await axios.get(`https://dev.eventsnode.com/api/bookings/orders/${orderId}`, {
                headers: { Authorization: authToken }
            });
            if (response.data.status) {
                setViewingOrder(response.data.data);
            }
        } catch (err) {
            console.error("Error fetching order details:", err);
        } finally {
            setLoadingDetails(false);
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await axios.get('https://dev.eventsnode.com/api/event?limit=1000', {
                headers: { Authorization: authToken }
            });
            if (response.data.events) {
                setEvents(response.data.events);
            }
        } catch (err) {
            console.error("Error fetching events list:", err);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchBookings();
        }, searchTerm ? 500 : 0);

        return () => clearTimeout(delayDebounceFn);
    }, [page, searchTerm, selectedEventId]);


    const StatusBadge = ({ status }) => {
        const styles = { Enabled: 'bg-green-100 text-green-800', Refunded: 'bg-yellow-100 text-yellow-800', Failed: 'bg-red-100 text-red-800', Pending: 'bg-blue-100 text-blue-800' };
        const displayStatus = status || 'Pending';
        return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${styles[displayStatus] || 'bg-gray-100 text-gray-800'}`}>{displayStatus.toUpperCase()}</span>;
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
            <header className="mb-6">
                <div className="flex items-center space-x-3">
                    <div className="bg-indigo-100 p-2 rounded-lg"><FaMoneyBillWave className="text-2xl text-indigo-600" /></div>
                    <h1 className="text-3xl font-bold text-gray-800">Admin Bookings</h1>
                </div>
            </header>

            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                        {/* Event Filter Dropdown */}
                        <div className="relative w-full sm:w-80 group">
                            <EventSelector 
                                events={events}
                                selectedEventId={selectedEventId}
                                onSelect={(id) => { setSelectedEventId(id); setPage(1); }}
                                fetchMoreEvents={fetchEvents}
                            />
                        </div>
                    </div>

                    <div className="relative w-full md:w-80">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            value={searchTerm} 
                            onChange={e => { setSearchTerm(e.target.value); setPage(1); }} 
                            placeholder="Search by ID, Email, Event..." 
                            className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        />
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="text-gray-500 font-medium">Fetching live bookings...</p>
                </div>
            ) : error ? (
                <div className="text-center py-16 px-6 bg-red-50 rounded-lg border border-red-200">
                    <FaTimesCircle className="mx-auto text-5xl text-red-500 mb-4" />
                    <h3 className="text-xl font-semibold text-red-700">Error</h3>
                    <p className="text-red-500 mt-2">{error}</p>
                    <button onClick={fetchBookings} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Retry</button>
                </div>
            ) : (
                <div className="space-y-5">
                    {bookings.length > 0 ? (
                        <>
                            <p className="text-gray-500 text-sm mb-2">Showing {bookings.length} of {totalResults} total records</p>
                            {bookings.map(booking => (
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
                                    <footer className="p-3 bg-gray-50 rounded-b-lg w-full">
                                        <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end sm:items-center">
                                            <button 
                                                onClick={() => handleViewBooking(booking.id)}
                                                className="flex items-center justify-center gap-2 text-sm font-semibold py-2 px-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
                                            >
                                                <FaEye /> View
                                            </button>
                                            {/* <button className="flex items-center justify-center gap-2 text-sm font-semibold py-2 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white">
                                                <FaDownload /> Download
                                            </button> */}
                                            {/* <button className="flex items-center justify-center gap-2 text-sm font-semibold py-2 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white">
                                                <FaFileInvoice /> Invoice
                                            </button> */}
                                            {/* <ActionsDropdown bookingId={booking.id} /> */}
                                        </div>
                                    </footer>
                                </div>
                            ))}

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center space-x-2 mt-8 py-4">
                                    <button 
                                        disabled={page === 1} 
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        Previous
                                    </button>
                                    <div className="flex items-center space-x-1">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => setPage(i + 1)}
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition ${
                                                    page === i + 1 
                                                        ? 'bg-indigo-600 text-white shadow-md' 
                                                        : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <button 
                                        disabled={page === totalPages} 
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                            <FaSearch className="mx-auto text-5xl text-gray-300 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700">No Bookings Found</h3>
                            <p className="text-gray-500 mt-2">
                                {searchTerm 
                                    ? `Your search for "${searchTerm}" did not match any bookings.` 
                                    : `There are currently no active bookings in the system.`}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Booking Details Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">
                        <header className="px-6 py-4 flex justify-between items-center border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-xl font-bold text-gray-800">Booking Details</h2>
                            <button 
                                onClick={() => setIsModalOpen(false)} 
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                            >
                                <FaTimesCircle className="text-xl" />
                            </button>
                        </header>

                        <div className="p-6 max-h-[75vh] overflow-y-auto">
                            {loadingDetails ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
                                    <p className="text-gray-500">Loading details...</p>
                                </div>
                            ) : viewingOrder ? (
                                <div className="space-y-8">
                                    {/* Summary Banner */}
                                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <p className="text-xs text-indigo-500 font-bold uppercase tracking-wider">Order Reference</p>
                                            <p className="text-xl font-black text-indigo-900">#{viewingOrder.orderNumber || viewingOrder._id.toString().slice(-10).toUpperCase()}</p>
                                        </div>
                                        <div className="text-right">
                                            <StatusBadge status={viewingOrder.status === 'confirmed' ? 'Enabled' : (viewingOrder.status === 'pending' ? 'Pending' : (viewingOrder.status === 'cancelled' || viewingOrder.status === 'refunded' ? 'Refunded' : 'Failed'))} />
                                            <p className="text-sm font-medium text-gray-600 mt-1">{new Date(viewingOrder.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>

                                    {/* Customer Section */}
                                    <section>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Customer Information</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-gray-50 p-4 rounded-xl">
                                            <DetailItem icon={<FaUser className="text-indigo-400" />} label="Name" value={viewingOrder.customer?.name || "N/A"} />
                                            <DetailItem icon={<FaUser className="text-indigo-400" />} label="Email" value={viewingOrder.customer?.email || "N/A"} />
                                            <DetailItem icon={<FaUser className="text-indigo-400" />} label="Phone" value={viewingOrder.customer?.phone || viewingOrder.customer?.phoneNumber || "N/A"} />
                                            <DetailItem icon={<FaCreditCard className="text-indigo-400" />} label="Transaction ID" value={viewingOrder.razorpayPaymentId || viewingOrder.transactionId || "N/A"} />
                                        </div>
                                    </section>

                                    {/* Order Items */}
                                    <section>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Order Items</h3>
                                        </div>
                                        <div className="space-y-4">
                                            {viewingOrder.items.map((item, idx) => (
                                                <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                                                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                                                        <h4 className="font-bold text-gray-800">{item.event?.name || "Event Item"}</h4>
                                                    </div>
                                                    <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                        <DetailItem label="Quantity" value={item.quantity} />
                                                        <DetailItem label="Unit Price" value={`${item.unitPrice} ${viewingOrder.currency || 'INR'}`} />
                                                        <DetailItem label="Subtotal" value={`${item.subTotal} ${viewingOrder.currency || 'INR'}`} />
                                                        <DetailItem label="Tickets" value={item.tickets?.length || 0} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Payment Section */}
                                    <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="text-sm">
                                            <p className="text-gray-500 font-medium">Payment Method: <span className="text-gray-800 font-bold">{viewingOrder.paymentMethod || "Online"}</span></p>
                                            <p className="text-gray-500 font-medium">Payment Status: <span className="text-gray-800 font-bold uppercase">{viewingOrder.paymentStatus}</span></p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-500 font-medium">Total Amount</p>
                                            <p className="text-3xl font-black text-gray-900">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: viewingOrder.currency || 'INR' }).format(viewingOrder.totalPrice)}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-20 text-red-500">Failed to load booking details.</div>
                            )}
                        </div>

                        <footer className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 mt-auto flex justify-end">
                            <button 
                                onClick={() => setIsModalOpen(false)} 
                                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition shadow-indigo-200"
                            >
                                Done
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBookings;