import React from "react";

const Details = ({ nextTab }) => {
  return (
    <form className="space-y-6">
      <div>
        <label className="block font-medium mb-1 text-sm text-gray-700">
          Select Category
        </label>
        <select className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:outline-none hover:border-blue-500 focus:ring-2 focus:ring-pink-400">
          <option value="">-- Category --</option>
          <option value="businessSeminar">Business Seminar</option>
          <option value="festivals">Festivals</option>
          <option value="liveMusic">Live Music</option>
          <option value="nightlife&Club">Nightlife & Club</option>
          <option value="professional">Professional</option>
          <option value="social">Social</option>
          <option value="sports&Leisure">Sports & Leisure</option>
          <option value="theatre&Arts">Theatre and Arts</option>
        </select>
      </div>

      <div className="grid md:grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Type
          </label>
          <input
            type="text"
            placeholder="Paid / Free"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none hover:border-blue-500 "
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Name
          </label>
          <input
            type="text"
            placeholder="e.g. Summer Fest 2025"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none hover:border-blue-500"
          />
        </div>
      </div>

      {/* Event URLs */}
      <div className="grid md:grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event URL
          </label>
          <input
            type="text"
            placeholder="https://youreventsite.com/event-name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none hover:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short URL
          </label>
          <input
            type="text"
            placeholder="https://short.link/abc"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none hover:border-blue-500"
          />
        </div>
      </div>

      {/* Concept */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Excerpt (Short Info)
        </label>
        <input
          type="text"
          placeholder="e.g. Short event concept..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none hover:border-blue-500"
        />
      </div>

      {/* Rich Text Areas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <div className="border border-gray-300 rounded-lg">
          <textarea
            rows="5"
            placeholder="Add rich description..."
            className="w-full px-4 py-3 text-gray-600 placeholder-gray-400 bg-white focus:outline-none hover:border-blue-500 resize-none rounded-lg"
          ></textarea>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Why to attend event?
        </label>
        <div className="border border-gray-300 rounded-lg">
          <textarea
            rows="5"
            placeholder="Mention benefits or purpose..."
            className="w-full px-4 py-3 text-gray-600 placeholder-gray-400 bg-white focus:outline-none hover:border-blue-500 resize-none rounded-lg"
          ></textarea>
        </div>
      </div>

      {/* Offline Payment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Offline Payment Instructions
        </label>
        <textarea
          rows="2"
          placeholder="Add instructions..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none hover:border-blue-500"
        ></textarea>
      </div>

      {/* Currency */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Event Specific Currency (Optional)
        </label>
        <input
          type="text"
          placeholder="e.g. USD / INR"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none hover:border-blue-500"
        />
      </div>

      {/* Checkboxes */}
      <div className="flex flex-col gap-3">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
          <span className="text-sm text-gray-700">Event Sold Out</span>
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
          <span className="text-sm text-gray-700">Enable Rating & Review</span>
        </label>
      </div>

      {/* NEXT Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextTab}
          className="bg-[#ff2459] hover:bg-[#e91e63] text-white px-6 py-2 rounded-lg"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Details;
