import React, { useState } from "react";

const NewVenueForm = () => {
  const [venueData, setVenueData] = useState({
    name: "",
    location: "",
    latitude: "",
    longitude: "",
    slug: "",
    description: "",
    landmark: "",
    outdoor: "",
    accessibility: "",
    nearestSpot: "",
    pricing: "",
  });

  const handleChange = (e) => {
    setVenueData({ ...venueData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("New Venue Submitted:", venueData);
    alert("Venue saved (check console)");
  };

  return (
    <form className="space-y-4">
      <h2 className="text-lg font-bold mb-2">New Venue</h2>

      {[
        { name: "name", label: "Venue Name" },
        { name: "location", label: "Google Location" },
        { name: "latitude", label: "Latitude" },
        { name: "longitude", label: "Longitude" },
        { name: "slug", label: "Slug" },
        { name: "description", label: "Description", textarea: true },
        { name: "landmark", label: "Landmark (e.g., Cinema, Stadium)" },
        { name: "outdoor", label: "Outdoor Description", textarea: true },
        { name: "accessibility", label: "Accessibility", textarea: true },
        { name: "nearestSpot", label: "Nearby / Nearest Spot", textarea: true },
        { name: "pricing", label: "Pricing", textarea: true },
      ].map(({ name, label, textarea }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          {textarea ? (
            <textarea
              name={name}
              value={venueData[name]}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          ) : (
            <input
              type="text"
              name={name}
              value={venueData[name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          )}
        </div>
      ))}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#ff2459] text-white px-6 py-2 rounded-lg"
        >
          Save Venue
        </button>
      </div>
    </form>
  );
};

export default NewVenueForm;
