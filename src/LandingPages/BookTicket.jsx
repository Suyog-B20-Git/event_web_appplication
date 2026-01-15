import React from 'react'
import { useLocation } from 'react-router-dom'
import TicketBookingPage from '../Components/FeaturedEvent/TicketBookingPage';

const BookTicket = () => {
    const location = useLocation();
    const eventData = location.state?.data;

    if (!eventData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Event Data</h2>
                    <p className="text-gray-600">Please go back and select an event to book tickets.</p>
                </div>
            </div>
        );
    }

    return <TicketBookingPage eventData={eventData} />
}

export default BookTicket