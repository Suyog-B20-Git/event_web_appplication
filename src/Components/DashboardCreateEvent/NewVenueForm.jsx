import React, { useState } from "react";

const NewVenueForm = () => {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setForm({
      ...form,
      [name]: type === "file" ? files : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">New Venue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700  ">
            Upload Images (1280x720):
          </label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleChange}
            className="w-full mt-1 border file:rounded-full file:bg-gray-300  hover:border-pink-500 p-2 rounded-2xl"
          />
          <label className="block font-medium text-gray-500 f">
            Upload Images of size 1280x720 pixels
          </label>
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Google Search Location:
          </label>
          <input
            type="text"
            name="googleSearchLocation"
            placeholder="Google Venue"
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block font-medium text-gray-700">
              Google Map LAT:
            </label>
            <input
              type="text"
              name="lat"
              placeholder="e.g. 27.1751448"
              onChange={handleChange}
              className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Google Map LONG:
            </label>
            <input
              type="text"
              name="lng"
              placeholder="e.g. 78.0399535"
              onChange={handleChange}
              className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Venue Name*:
          </label>
          <input
            type="text"
            name="venueName"
            placeholder="Venue Name"
            required
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Slug (Venue URL)*:
          </label>
          <input
            type="text"
            name="slug"
            placeholder="Venue URL Slug"
            required
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          />
          <label className="block font-medium text-gray-500">
            https://www.eventsnode.com/venues
          </label>
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Description:
          </label>
          <textarea
            name="description"
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Venue Type*:
          </label>
          <input
            type="text"
            name="venueType"
            placeholder="e.g. Theatre, Cinema"
            required
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          />
        </div>

        <div>
          <span className="block font-medium text-gray-700">
            Location Type:
          </span>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="locationType"
              value="Indoor"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Indoor
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="locationType"
              value="Outdoor"
              onChange={handleChange}
              className="mr-2"
            />{" "}
            Outdoor
          </label>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Amenities:</label>
          <textarea
            name="amenities"
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block font-medium text-gray-700">
              Seated Guest Number*:
            </label>
            <input
              type="number"
              name="seatedGuests"
              required
              onChange={handleChange}
              className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Standing Guest Number*:
            </label>
            <input
              type="number"
              name="standingGuests"
              required
              onChange={handleChange}
              className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Neighborhoods*:
          </label>
          <input
            type="text"
            name="neighborhoods"
            required
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Pricing:</label>
          <textarea
            name="pricing"
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Availability:
          </label>
          <textarea
            name="availability"
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Food and Beverage Details:
          </label>
          <textarea
            name="foodDetails"
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Show Quote Form:
          </label>
          <select
            name="quoteForm"
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Address*:</label>
            <input
              type="text"
              name="address"
              required
              onChange={handleChange}
              className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">City*:</label>
            <input
              type="text"
              name="city"
              required
              onChange={handleChange}
              className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">State*:</label>
            <input
              type="text"
              name="state"
              required
              onChange={handleChange}
              className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Zipcode/Pincode*:
            </label>
            <input
              type="text"
              name="pincode"
              required
              onChange={handleChange}
              className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Country*:</label>
          <select
            name="country"
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          >
            <option>-- Country --</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Facebook:</label>
          <input
            type="url"
            name="facebook"
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">YouTube:</label>
          <input
            type="url"
            name="youtube"
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Twitter:</label>
          <input
            type="url"
            name="twitter"
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Instagram:</label>
          <input
            type="url"
            name="instagram"
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Meta Tags:</label>
          <input
            type="text"
            name="metaTags"
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Meta Description:
          </label>
          <textarea
            name="metaDescription"
            onChange={handleChange}
            className="w-full mt-1 border  hover:border-pink-500 p-2 rounded-2xl"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default NewVenueForm;
