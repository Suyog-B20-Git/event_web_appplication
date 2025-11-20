import React, { useState, useEffect } from "react";
import { ArrowLeft, User, Mail, Phone, Ticket, Calendar, MapPin, Tag } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getTicketFormatsByEventId } from "../../redux/actions/master/Events/createTicket";

const baseUrl = import.meta.env.VITE_API_URL;

const TicketBookingPage = ({ eventData }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [ticketFormats, setTicketFormats] = useState([]);
    const [selectedTicketFormat, setSelectedTicketFormat] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [promoCode, setPromoCode] = useState("");
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [attendees, setAttendees] = useState([]);
    const [customerDetails, setCustomerDetails] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const authToken = localStorage.getItem("authToken");

    // Fetch ticket formats when component mounts
    useEffect(() => {
        if (eventData?.ticketFormats?.length > 0) {
            fetchTicketFormats();
        }
    }, [eventData]);

    // Update attendees when quantity changes
    useEffect(() => {
        if (quantity > 0) {
            const newAttendees = [];
            for (let i = 0; i < quantity; i++) {
                newAttendees.push({
                    name: customerDetails.name || "",
                    email: customerDetails.email || "",
                    phoneNumber: customerDetails.phone || "",
                });
            }
            setAttendees(newAttendees);
        }
    }, [quantity]);

    // Load Razorpay script
    useEffect(() => {
        if (!window.Razorpay) {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            document.body.appendChild(script);
            return () => {
                if (document.body.contains(script)) {
                    document.body.removeChild(script);
                }
            };
        }
    }, []);

    const fetchTicketFormats = async () => {
        try {
            setLoading(true);

            // Use Redux action to fetch all ticket formats for the event
            // This uses axiosInstance and is more efficient (single API call)
            const response = await dispatch(getTicketFormatsByEventId(eventData._id));

            if (response && response.ticketFormats) {
                // Filter to only include ticket formats that are in the event's ticketFormats array
                const eventFormatIds = eventData.ticketFormats.map((format) => format._id || format);
                const filteredFormats = response.ticketFormats.filter((format) =>
                    eventFormatIds.includes(format._id)
                );

                setTicketFormats(filteredFormats);
                if (filteredFormats.length > 0) {
                    setSelectedTicketFormat(filteredFormats[0]);
                }
            } else if (response && Array.isArray(response)) {
                // Handle case where response is directly an array
                const eventFormatIds = eventData.ticketFormats.map((format) => format._id || format);
                const filteredFormats = response.filter((format) =>
                    eventFormatIds.includes(format._id)
                );

                setTicketFormats(filteredFormats);
                if (filteredFormats.length > 0) {
                    setSelectedTicketFormat(filteredFormats[0]);
                }
            }
        } catch (error) {
            console.error("Error fetching ticket formats:", error);
            toast.error("Failed to load ticket formats");
        } finally {
            setLoading(false);
        }
    };

    const calculatePrice = () => {
        if (!selectedTicketFormat) return 0;
        const now = new Date();
        let price = selectedTicketFormat.price || 0;

        // Check if ticket is on sale
        if (
            selectedTicketFormat.isSale &&
            selectedTicketFormat.saleStartDate &&
            selectedTicketFormat.saleEndDate &&
            now >= new Date(selectedTicketFormat.saleStartDate) &&
            now <= new Date(selectedTicketFormat.saleEndDate)
        ) {
            price = selectedTicketFormat.salePrice || price;
        }

        // Apply discount
        const discountAmount = (price * promoDiscount) / 100;
        const finalPrice = price - discountAmount;
        return finalPrice * quantity;
    };

    const calculateSubtotal = () => {
        if (!selectedTicketFormat) return 0;
        const now = new Date();
        let price = selectedTicketFormat.price || 0;

        if (
            selectedTicketFormat.isSale &&
            selectedTicketFormat.saleStartDate &&
            selectedTicketFormat.saleEndDate &&
            now >= new Date(selectedTicketFormat.saleStartDate) &&
            now <= new Date(selectedTicketFormat.saleEndDate)
        ) {
            price = selectedTicketFormat.salePrice || price;
        }

        return price * quantity;
    };

    const calculateDiscountAmount = () => {
        const subtotal = calculateSubtotal();
        return (subtotal * promoDiscount) / 100;
    };

    const calculateDiscount = (code) => {
        if (!code) return 0;
        const match = code.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    };

    const handlePromoCodeChange = (code) => {
        setPromoCode(code);
        setPromoDiscount(calculateDiscount(code));
    };

    const updateAttendee = (index, field, value) => {
        const updated = [...attendees];
        updated[index] = { ...updated[index], [field]: value };
        setAttendees(updated);
    };

    const generateSeatNumbers = () => {
        const startSeat = (selectedTicketFormat?.noOfBookedSeats || 0) + 1;
        return Array.from({ length: quantity }, (_, i) => startSeat + i);
    };

    const validateForm = () => {
        if (!selectedTicketFormat) {
            toast.error("Please select a ticket format");
            return false;
        }

        if (quantity < 1) {
            toast.error("Please select at least 1 ticket");
            return false;
        }

        if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
            toast.error("Please fill in all customer details");
            return false;
        }

        // Validate attendees
        for (let i = 0; i < attendees.length; i++) {
            const attendee = attendees[i];
            if (!attendee.name || !attendee.email || !attendee.phoneNumber) {
                toast.error(`Please fill in all details for attendee ${i + 1}`);
                return false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(attendee.email)) {
                toast.error(`Please enter a valid email for attendee ${i + 1}`);
                return false;
            }
        }

        return true;
    };

    const handleBooking = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);

            // Get customer ID from localStorage
            const userProfileStr = localStorage.getItem("userProfile");
            let customerId = null;

            if (userProfileStr) {
                try {
                    const userProfile = JSON.parse(userProfileStr);
                    customerId = userProfile._id || userProfile.id;
                } catch (e) {
                    console.error("Error parsing user profile:", e);
                }
            }

            if (!customerId) {
                toast.error("Please login to continue");
                navigate("/login");
                return;
            }

            // Prepare booking data
            const bookingData = [
                {
                    ticketFormat: selectedTicketFormat._id,
                    promocode: promoCode || "",
                    bookedSeatNos: generateSeatNumbers(),
                    attendees: attendees,
                },
            ];

            // Step 1: Initiate booking (handles both free and paid)
            const response = await axios.post(
                `${baseUrl}/api/ticket/initiate`,
                {
                    event: eventData._id,
                    customer: customerId,
                    booking: bookingData,
                    currency: "INR",
                    isFreeTicket: calculatePrice() === 0,
                },
                {
                    headers: {
                        Authorization: authToken,
                    },
                }
            );

            if (response.data.status !== true) {
                toast.error(response.data.message || "Failed to initiate booking");
                setLoading(false);
                return;
            }

            // Check if free ticket
            if (response.data.data.order && response.data.data.tickets) {
                // Free ticket - tickets created instantly
                toast.success("Tickets booked successfully!");
                navigate("/dashboard");
                return;
            }

            // Paid ticket - open Razorpay checkout
            const { orderId, razorpayOrderId, amount, currency, key } = response.data.data;

            const options = {
                key: key,
                amount: amount,
                currency: currency,
                name: eventData.name || "Event Booking",
                description: `Booking for ${eventData.name}`,
                order_id: razorpayOrderId,
                prefill: {
                    name: customerDetails.name,
                    email: customerDetails.email,
                    contact: customerDetails.phone,
                },
                theme: {
                    color: "#ff2459",
                },
                handler: async function (paymentResponse) {
                    try {
                        setLoading(true);

                        // Verify payment and create tickets
                        const verifyResponse = await axios.post(
                            `${baseUrl}/api/payment/verify`,
                            {
                                razorpay_order_id: paymentResponse.razorpay_order_id,
                                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                                razorpay_signature: paymentResponse.razorpay_signature,
                                order_id: orderId,
                                booking_details: bookingData,
                            },
                            {
                                headers: {
                                    Authorization: authToken,
                                },
                            }
                        );

                        if (verifyResponse.data.status === true) {
                            toast.success("Payment successful! Tickets booked successfully!");
                            navigate("/dashboard");
                        } else {
                            toast.error(verifyResponse.data.message || "Payment verification failed");
                        }
                    } catch (err) {
                        console.error("Payment verification error:", err);
                        toast.error("Payment verification failed. Please contact support.");
                    } finally {
                        setLoading(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                        toast.info("Payment cancelled");
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", function (response) {
                toast.error(`Payment failed: ${response.error.description || "Unknown error"}`);
                setLoading(false);
            });

            rzp.open();
        } catch (error) {
            console.error("Booking error:", error);
            toast.error(error.response?.data?.message || "Failed to process booking. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const totalPrice = calculatePrice();
    const isFree = totalPrice === 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Event</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Event Info Header */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{eventData?.name}</h1>
                        <p className="text-gray-600">{eventData?.excerpt || eventData?.description}</p>
                        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                            {eventData?.venue && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>
                                        {eventData.venue.city && eventData.venue.country
                                            ? `${eventData.venue.city}, ${eventData.venue.country}`
                                            : eventData.venue.name || "Online"}
                                    </span>
                                </div>
                            )}
                            {eventData?.startDate && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        {new Date(eventData.startDate).toLocaleDateString("en-IN", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        {loading && !ticketFormats.length ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Ticket Format Selection */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Select Ticket Type
                                    </label>
                                    <div className="grid gap-3">
                                        {ticketFormats.map((format) => {
                                            const now = new Date();
                                            const isOnSale =
                                                format.isSale &&
                                                format.saleStartDate &&
                                                format.saleEndDate &&
                                                now >= new Date(format.saleStartDate) &&
                                                now <= new Date(format.saleEndDate);
                                            const displayPrice = isOnSale ? format.salePrice : format.price;

                                            return (
                                                <div
                                                    key={format._id}
                                                    onClick={() => setSelectedTicketFormat(format)}
                                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedTicketFormat?._id === format._id
                                                        ? "border-pink-500 bg-pink-50"
                                                        : "border-gray-200 hover:border-pink-300"
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h3 className="font-semibold text-gray-800">{format.title}</h3>
                                                            <p className="text-sm text-gray-600 mt-1">{format.description}</p>
                                                            {isOnSale && (
                                                                <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                                                                    On Sale!
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-right">
                                                            {displayPrice === 0 ? (
                                                                <span className="text-lg font-bold text-green-600">FREE</span>
                                                            ) : (
                                                                <div>
                                                                    {isOnSale && (
                                                                        <span className="text-sm text-gray-400 line-through mr-2">
                                                                            ₹{format.price}
                                                                        </span>
                                                                    )}
                                                                    <span className="text-lg font-bold text-gray-800">
                                                                        ₹{displayPrice}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Quantity Selection */}
                                {selectedTicketFormat && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Quantity
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                                                disabled={quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                                            >
                                                +
                                            </button>
                                            <span className="text-gray-600 text-sm ml-4">
                                                Available: {selectedTicketFormat.totalSeats - (selectedTicketFormat.noOfBookedSeats || 0)}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Customer Details */}
                                <div className="border-t pt-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Details</h3>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={customerDetails.name}
                                                onChange={(e) =>
                                                    setCustomerDetails({ ...customerDetails, name: e.target.value })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                value={customerDetails.email}
                                                onChange={(e) =>
                                                    setCustomerDetails({ ...customerDetails, email: e.target.value })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone *
                                            </label>
                                            <input
                                                type="tel"
                                                value={customerDetails.phone}
                                                onChange={(e) =>
                                                    setCustomerDetails({ ...customerDetails, phone: e.target.value })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                placeholder="+91 1234567890"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Attendee Details */}
                                {quantity > 0 && (
                                    <div className="border-t pt-4">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                            Attendee Details ({quantity} {quantity === 1 ? "Person" : "People"})
                                        </h3>
                                        <div className="space-y-4 max-h-96 overflow-y-auto">
                                            {attendees.map((attendee, index) => (
                                                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                                    <h4 className="font-medium text-gray-700 mb-3">
                                                        Attendee {index + 1}
                                                    </h4>
                                                    <div className="grid md:grid-cols-3 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Name *
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={attendee.name}
                                                                onChange={(e) =>
                                                                    updateAttendee(index, "name", e.target.value)
                                                                }
                                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                                placeholder="Attendee name"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Email *
                                                            </label>
                                                            <input
                                                                type="email"
                                                                value={attendee.email}
                                                                onChange={(e) =>
                                                                    updateAttendee(index, "email", e.target.value)
                                                                }
                                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                                placeholder="attendee@email.com"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Phone *
                                                            </label>
                                                            <input
                                                                type="tel"
                                                                value={attendee.phoneNumber}
                                                                onChange={(e) =>
                                                                    updateAttendee(index, "phoneNumber", e.target.value)
                                                                }
                                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                                placeholder="+91 1234567890"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Promo Code */}
                                <div className="border-t pt-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Promo Code (Optional)
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => handlePromoCodeChange(e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                            placeholder="Enter promo code"
                                        />
                                        {promoDiscount > 0 && (
                                            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                                                {promoDiscount}% OFF
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Price Summary */}
                                {selectedTicketFormat && (
                                    <div className="border-t pt-4 bg-gray-50 p-4 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-700">Subtotal ({quantity} tickets)</span>
                                            <span className="font-semibold">₹{calculateSubtotal().toFixed(2)}</span>
                                        </div>
                                        {promoDiscount > 0 && (
                                            <div className="flex justify-between items-center mb-2 text-green-600">
                                                <span>Discount ({promoDiscount}%)</span>
                                                <span>-₹{calculateDiscountAmount().toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                                            <span className="text-lg font-bold text-gray-800">Total</span>
                                            <span className="text-2xl font-bold text-pink-600">
                                                {isFree ? "FREE" : `₹${totalPrice.toFixed(2)}`}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleBooking}
                            disabled={loading || !selectedTicketFormat}
                            className="px-8 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Processing...
                                </>
                            ) : isFree ? (
                                "Book Free Tickets"
                            ) : (
                                `Pay ₹${totalPrice.toFixed(2)}`
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketBookingPage;

