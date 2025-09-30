import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Tag,
  Calendar,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";
const baseUrl = import.meta.env.VITE_API_URL;
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MeditationForm = (data) => {
  const [ticketFormat, setTicketFormat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedPromoCode, setSelectedPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [attendees, setAttendees] = useState([]);

  const ticketFormatId = data?.data.ticketFormats;
  const eventId = data?.data._id;
  const eventName = data?.data.name;
  const eventShortDemo = data?.data.excerpt || "Event Booking";
  const eventDescription = data?.data.description;
  const eventAddress =
    data?.data?.venue?.city &&
      data?.data?.venue?.state &&
      data?.data?.venue?.country
      ? `${data.data.venue.city}, ${data.data.venue.state}, ${data.data.venue.country}`
      : "Not Available";

  const updateStartDateTime = new Date(data?.data.startDate).toLocaleString(
    "en-IN",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }
  );

  const updateEndDateTime = new Date(data?.data.endDate).toLocaleString(
    "en-IN",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }
  );

  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    fetchTicketFormat();
  }, []);

  useEffect(() => {
    if (selectedQuantity > attendees.length) {
      const newAttendees = [...attendees];
      for (let i = attendees.length; i < selectedQuantity; i++) {
        newAttendees.push({
          name: "",
          email: "",
          phoneNumber: "",
        });
      }
      setAttendees(newAttendees);
    } else if (selectedQuantity < attendees.length) {
      setAttendees(attendees.slice(0, selectedQuantity));
    }
  }, [selectedQuantity]);

  const fetchTicketFormat = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}/api/ticketFormat/${ticketFormatId}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      const resdata = response.data;
      setTicketFormat(resdata);
      if (!response.ok) throw new Error("Failed to fetch ticket format");
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscount = (promoCode) => {
    if (!promoCode) return 0;

    // Extract discount percentage from promo code
    const match = promoCode.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const handlePromoCodeChange = (code) => {
    setSelectedPromoCode(code);
    setPromoDiscount(calculateDiscount(code));
  };

  const calculateTotal = () => {
    const basePrice = ticketFormat?.price || 0;
    const discount = promoDiscount;
    const discountAmount = (basePrice * discount) / 100;
    const priceAfterDiscount = basePrice - discountAmount;
    return priceAfterDiscount * selectedQuantity;
  };

  const updateAttendee = (index, field, value) => {
    const updatedAttendees = [...attendees];
    updatedAttendees[index] = {
      ...updatedAttendees[index],
      [field]: value,
    };
    setAttendees(updatedAttendees);
  };

  const generateSeatNumbers = (quantity) => {
    // Generate sequential seat numbers starting from last booked seat + 1
    const startSeat = (ticketFormat?.noOfBookedSeats || 0) + 1;
    return Array.from({ length: quantity }, (_, i) => startSeat + i);
  };

  const validateAttendees = () => {
    for (let i = 0; i < attendees.length; i++) {
      const attendee = attendees[i];
      if (!attendee.name || !attendee.email || !attendee.phoneNumber) {
        return `Please fill in all details for attendee ${i + 1}`;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(attendee.email)) {
        return `Please enter a valid email for attendee ${i + 1}`;
      }
    }
    return null;
  };

  const handleSubmit = async () => {
    if (
      !customerDetails.name ||
      !customerDetails.email ||
      !customerDetails.phone
    ) {
      toast.error("Please fill in all customer details");
      return;
    }

    if (selectedQuantity === 0) {
      toast.error("Please select at least one ticket");
      return;
    }

    const attendeeValidationError = validateAttendees();
    if (attendeeValidationError) {
      toast.error(attendeeValidationError);
      return;
    }

    try {
      setLoading(true);
      const bookingData = {
        event: eventId,
        customerName: customerDetails.name,
        customerEmail: customerDetails.email,
        customerPhoneNumber: customerDetails.phone,
        price: calculateTotal(),
        currency: "INR",
        booking: [
          {
            ticketFormat: ticketFormatId,
            promocode: selectedPromoCode,
            bookedSeatNos: generateSeatNumbers(selectedQuantity),
            attendees: attendees,
          },
        ],
      };

      const response = await axios.post(`${baseUrl}/api/ticket`, bookingData, {
        headers: {
          Authorization: authToken,
        },
      });
      const responseData = response.data;
      if (response.status === 200 || response.status === 201) {
        toast.success("Ticket booked successfully!");
        setCustomerDetails({ name: "", email: "", phone: "" });
        setSelectedQuantity(0);
        setSelectedPromoCode("");
        setPromoDiscount(0);
        setAttendees([]);
        navigate("/dashboard");
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch (err) {
      toast.error("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !ticketFormat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading ticket information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 py-[25%] sm:py-8">
      <div className="lg:w-[80%] mx-auto px-0 sm:px-1 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-3 sm:p-4">
            <h1 className="text-xl sm:text-2xl font-bold mb-2">
              {eventName || ticketFormat?.title}
            </h1>
            {/* Event Details - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{eventShortDemo}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{eventAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{updateStartDateTime} - {updateEndDateTime}</span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {error && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                {success}
              </div>
            )}

            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-gray-800">
                Customer Details
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={customerDetails.name}
                      onChange={(e) =>
                        setCustomerDetails({
                          ...customerDetails,
                          name: e.target.value,
                        })
                      }
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) =>
                        setCustomerDetails({
                          ...customerDetails,
                          email: e.target.value,
                        })
                      }
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      value={customerDetails.phone}
                      onChange={(e) =>
                        setCustomerDetails({
                          ...customerDetails,
                          phone: e.target.value,
                        })
                      }
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Selection */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-gray-800">
                Tickets
              </h2>

              <div className="border rounded-lg p-4 bg-gray-100">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1">
                      {ticketFormat?.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {ticketFormat?.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Available:{" "}
                      {ticketFormat?.totalTicketQuantity -
                        ticketFormat?.noOfBookedSeats}{" "}
                      tickets
                    </p>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <p className="text-xl font-bold text-gray-800">
                      ₹{ticketFormat?.price}
                    </p>
                    <p className="text-sm text-gray-500">per ticket</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Quantity (Max {ticketFormat?.limitPerCustomer})
                  </label>
                  <select
                    value={selectedQuantity}
                    onChange={(e) =>
                      setSelectedQuantity(parseInt(e.target.value))
                    }
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-sm w-full sm:w-auto"
                  >
                    {Array.from(
                      { length: (ticketFormat?.limitPerCustomer || 4) + 1 },
                      (_, i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            {ticketFormat?.promoCodes && ticketFormat.promoCodes.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-gray-800">
                  Promo Code
                </h2>
                <div className="relative">
                  <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <select
                    value={selectedPromoCode}
                    onChange={(e) => handlePromoCodeChange(e.target.value)}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-sm"
                  >
                    <option value="">Select a promo code</option>
                    {ticketFormat.promoCodes.map((code) => (
                      <option key={code} value={code}>
                        {code} ({calculateDiscount(code)}% off)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Attendees Details */}
            {selectedQuantity > 0 && (
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-gray-800">
                  Attendees Details ({selectedQuantity}{" "}
                  {selectedQuantity === 1 ? "ticket" : "tickets"})
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  {attendees.map((attendee, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 bg-gray-50"
                    >
                      <h3 className="font-medium text-gray-800 mb-3 sm:mb-4">
                        Attendee {index + 1}
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                              type="text"
                              value={attendee.name}
                              onChange={(e) =>
                                updateAttendee(index, "name", e.target.value)
                              }
                              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                              placeholder="Attendee name"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                              type="email"
                              value={attendee.email}
                              onChange={(e) =>
                                updateAttendee(index, "email", e.target.value)
                              }
                              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                              placeholder="Attendee email"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                              type="tel"
                              value={attendee.phoneNumber}
                              onChange={(e) =>
                                updateAttendee(
                                  index,
                                  "phoneNumber",
                                  e.target.value
                                )
                              }
                              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                              placeholder="+91xxxxxxxxxx"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cart Total */}
            <div className="mb-6 sm:mb-8 bg-green-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-gray-800">
                Cart Total
              </h2>
              <div className="space-y-2 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span>Total Tickets:</span>
                  <span>{selectedQuantity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>
                    ₹
                    {((ticketFormat?.price || 0) * selectedQuantity).toFixed(2)}
                  </span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-900 font-semibold">
                    <span>Discount ({promoDiscount}%):</span>
                    <span>
                      -₹
                      {(
                        ((ticketFormat?.price || 0) *
                          selectedQuantity *
                          promoDiscount) /
                        100
                      ).toFixed(2)}
                    </span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-base sm:text-lg">
                  <span>Total Order:</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg font-semibold mb-3 sm:mb-4 text-gray-800">
                Payment
              </h2>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="free"
                  name="payment"
                  defaultChecked
                  className="mr-3 w-4 h-4"
                />
                <label htmlFor="free" className="text-sm sm:text-base">
                  Free (Free checkout)
                </label>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || selectedQuantity === 0}
              className="w-full bg-red-500 text-white py-3 sm:py-4 px-6 rounded-lg font-semibold text-base sm:text-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationForm;
