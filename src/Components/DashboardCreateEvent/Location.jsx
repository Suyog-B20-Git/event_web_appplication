import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NewVenueForm from "./NewVenueForm";

const Location = ({ data, setData, nextTab, eventData: propEventData }) => {
  const location = useLocation();
  const stateEventData = location.state?.event;
  const eventData = propEventData || stateEventData;

  const [isOnline, setIsOnline] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!eventData) return;

    setIsOnline(eventData.isOnline || false);
    setSelectedVenue(eventData.venue?._id || "");
    setData(prev => ({
      ...prev,
      isOnline: eventData.isOnline || false,
      venue: eventData.venue?._id || ""
    }));
  }, [eventData, setData]);

  const handleSave = () => {
    console.log("Saved Location:", { isOnline, selectedVenue });
    nextTab(); // move to next tab after saving
  };

  return (
    <div className="space-y-6">
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

      <div className="flex flex-wrap text-gray-600">
        <p className="text-sm">
          Make Event Hybrid by making it Online & Selecting a Venue. Attendees
          can come to Venue with Tickets, and can join online with Online Event
          Secret Details
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Event Venues (Optional)
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-500 hover:border-blue-500"
          value={data.venue || ""}
          onChange={(e) =>
            setData((prev) => ({ ...prev, venue: e.target.value }))
          }
        >
          <option value="">-- Search Venues --</option>
          <option value="venue1">Venue 1</option>
          <option value="venue2">Venue 2</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Create Venue
        </button>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-[#ff2459] text-white px-6 py-2 rounded-lg "
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
