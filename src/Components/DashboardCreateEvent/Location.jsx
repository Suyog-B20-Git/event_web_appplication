import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import NewVenueForm from "./NewVenueForm";

const Location = ({ data, setData, nextTab, eventData: propEventData }) => {
  const location = useLocation();
  const stateEventData = location.state?.event;
  const eventData = propEventData || stateEventData;

  const [isOnline, setIsOnline] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!eventData) return;

    setIsOnline(eventData.isOnline || false);
    setSelectedVenue(eventData.venue?._id || "");
    setData(prev => ({
      ...prev,
      isOnline: eventData.isOnline || false,
      venue: eventData.venue?._id || "",
      mapUrl: eventData.mapUrl || ""
    }));
  }, [eventData, setData]);

  // Fetch venues when query changes
  useEffect(() => {
    if (query) {
      const fetchVenues = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:5000/api/venue?search=${query.toLowerCase()}`);
          if (response.data.status) {
            setVenues(response.data.data || []);
          }
        } catch (error) {
          console.error("Error fetching venues:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchVenues();
    } else {
      setVenues([]);
    }
  }, [query]);

  const venueOptions = venues.map((venue) => ({
    value: venue._id,
    label: venue.name,
  }));

  const handleSave = () => {
    console.log("Saved Location:", { isOnline, selectedVenue });
    nextTab(); // move to next tab after saving
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Settings</h3>

        {/* Online Event Toggle */}
        {/* <div className="mb-6">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 font-medium">
              Online Event
            </label>
            <input
              type="checkbox"
              checked={data.isOnline || false}
              onChange={(e) =>
                setData((prev) => ({ ...prev, isOnline: e.target.checked }))
              }
              className="w-5 h-5"
            />
          </div>
          <div className="flex flex-wrap text-gray-600 mt-2">
            <p className="text-sm">
              Make Event Hybrid by making it Online & Selecting a Venue. Attendees
              can come to Venue with Tickets, and can join online with Online Event
              Secret Details
            </p>
          </div>
        </div> */}
      </div>

      {/* Venue Selection with Map URL Option */}
      <div className="flex items-center justify-center h-full mb-4">
        {/* Venue Field */}
        <div className="w-1/2 flex flex-col justify-center gap-2">
          <label
            htmlFor="venue"
            className="block text-sm font-medium text-gray-700"
          >
            Venue
          </label>
          <Select
            isClearable
            options={venueOptions}
            placeholder="Search venue..."
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            onInputChange={(value, { action }) => {
              if (action === "input-change") {
                setQuery(value);
              }
              if (action === "input-blur" || action === "menu-close") {
                setQuery("");
              }
            }}
            onChange={(selectedOption) => {
              const venueId = selectedOption ? selectedOption.value : null;
              setData(prev => ({ ...prev, venue: venueId }));
              setSelectedVenue(venueId);
            }}
            value={venueOptions.find(option => option.value === data.venue) || null}
            noOptionsMessage={() => loading ? "Loading venues..." : "Type... to see Venues"}
            isDisabled={!!data.mapUrl}
            className={data.mapUrl ? "bg-gray-200 cursor-not-allowed" : ""}
            isLoading={loading}
          />
        </div>

        {/* OR separator */}
        <div className="px-4 flex items-center justify-center mt-5">
          <span className="text-gray-500 font-semibold">or</span>
        </div>

        {/* Venue Google Map URL Field */}
        <div className="w-1/2 flex flex-col justify-center gap-1">
          <label
            htmlFor="mapUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Google Map URL
          </label>
          <input
            type="url"
            id="mapUrl"
            name="mapUrl"
            className={`mt-1 block w-full border rounded-md p-2 ${data.venue ? "bg-gray-200 cursor-not-allowed" : ""}`}
            placeholder="Enter your Venue Map URL"
            value={data.mapUrl || ""}
            onChange={(e) => setData(prev => ({ ...prev, mapUrl: e.target.value }))}
            disabled={!!data.venue}
          />
        </div>
      </div>

      {/* Create New Venue Button */}
      <div className="flex items-center gap-4">
        {/* <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + Create Venue
        </button> */}
        <div className="flex justify-end flex-1">
          <button
            onClick={handleSave}
            className="bg-[#ff2459] text-white px-6 py-2 rounded-lg hover:bg-[#e0204f]"
          >
            Next
          </button>
        </div>
      </div>

      {/* New Venue Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] md:w-[700px] p-6 rounded-lg max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-red-600 text-lg"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
            <NewVenueForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Location;
