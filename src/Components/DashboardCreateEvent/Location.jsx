import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getVenue } from "../../redux/actions/master/Events/GetVenue";
import { getVenueById } from "../../redux/actions/master/Venue/getVenueById";
import NewVenueForm from "./NewVenueForm";

const Location = ({ data, setData, nextTab }) => {
  const dispatch = useDispatch();

  const [isOnline, setIsOnline] = useState(data.isOnline || false);
  const [selectedVenue, setSelectedVenue] = useState(data.venue || "");
  const [currentVenueOption, setCurrentVenueOption] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [venueError, setVenueError] = useState("");
  const [mapUrlError, setMapUrlError] = useState("");
  const [userHasSelectedVenue, setUserHasSelectedVenue] = useState(false);

  // Get venue data from Redux store - moved before useEffect to avoid hoisting issues
  const store = useSelector((state) => state.venuesReducer) || { venues: [] };
  const venuesData = store?.venues || []; // Ensure data is always an array

  // Create venue options from API data - memoized to prevent infinite re-renders
  const venueOptions = useMemo(() => {
    return venuesData.map((venue) => ({
      value: venue._id,
      label: venue.name,
    }));
  }, [venuesData]);

  // Initialize and sync local state with centralized state
  useEffect(() => {
    // Always sync with centralized state to ensure consistency
    setIsOnline(data.isOnline || false);

    // Only sync venue selection if user hasn't manually selected one
    if (!userHasSelectedVenue) {
      setSelectedVenue(data.venue || "");

      // Handle venue option initialization and updates
      if (data.venue) {
        // Use stored venue data if available (preferred)
        if (data.venueData && data.venueData._id && data.venueData.name) {
          setCurrentVenueOption({
            value: data.venueData._id,
            label: data.venueData.name
          });
        } else {
          // Try to find in current options
          const existingOption = venueOptions.find(option => option.value === data.venue);
          if (existingOption) {
            setCurrentVenueOption(existingOption);
          } else {
            // Set basic option as fallback
            setCurrentVenueOption({
              value: data.venue,
              label: `Venue ${data.venue.slice(-4)}`
            });
          }
        }
      } else {
        setCurrentVenueOption(null);
      }
    }
  }, [data.isOnline, data.venue, data.venueData, venueOptions, userHasSelectedVenue]);

  // Fetch API data whenever `query` updates
  useEffect(() => {
    if (query) {
      dispatch(getVenue(query.toLowerCase())); // Dispatch Redux action to fetch data
    }
  }, [dispatch, query]);

  // Reset user selection flag when data changes (new event loaded)
  useEffect(() => {
    setUserHasSelectedVenue(false);
  }, [data.venueData]); // Reset when venueData changes (new event loaded)

  // If we have a selected venue from data but it's not in the options,
  // we need to add it to show it in the dropdown
  const selectedVenueOption = data?.venue && !venueOptions.find(option => option.value === data.venue)
    ? { value: data.venue, label: "Selected Venue" }
    : null;



  // Combine API options with selected venue if needed
  const allVenueOptions = selectedVenueOption
    ? [selectedVenueOption, ...venueOptions]
    : venueOptions;

  const validateLocation = () => {
    const hasVenue = !!data.venue;
    const hasMapUrl = !!data.mapUrl && data.mapUrl.trim() !== "";

    // Clear previous errors
    setVenueError("");
    setMapUrlError("");

    // Check if at least one is provided
    if (!hasVenue && !hasMapUrl) {
      setVenueError("Either Venue or Google Map URL is required.");
      setMapUrlError("Either Venue or Google Map URL is required.");
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateLocation()) {
      return; // Don't proceed if validation fails
    }

    console.log("Saved Location:", { isOnline, selectedVenue, mapUrl: data.mapUrl });
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
            options={allVenueOptions}
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
              setCurrentVenueOption(selectedOption);

              // Mark that user has made a selection
              setUserHasSelectedVenue(true);

              // Clear errors when venue is selected
              if (venueId) {
                setVenueError("");
                setMapUrlError("");
              }
            }}
            value={currentVenueOption || allVenueOptions.find(option => option.value === data.venue) || null}
            noOptionsMessage={() => "Type... to see Venues"}
            isDisabled={!!data.mapUrl}
            className={data.mapUrl ? "bg-gray-200 cursor-not-allowed" : ""}
          />
          {venueError && (
            <p className="text-red-500 text-sm min-h-[1rem]">
              {venueError}
            </p>
          )}
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
            onChange={(e) => {
              setData(prev => ({ ...prev, mapUrl: e.target.value }));

              // Clear errors when map URL is entered
              if (e.target.value.trim() !== "") {
                setVenueError("");
                setMapUrlError("");
              }
            }}
            disabled={!!data.venue}
          />
          {mapUrlError && (
            <p className="text-red-500 text-sm min-h-[1rem]">
              {mapUrlError}
            </p>
          )}
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
