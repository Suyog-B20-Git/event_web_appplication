// Components/DashboardCreateEvent/Timings.jsx

import React, { useState } from "react";

const Timings = ({ nextTab }) => {
  const [repeat, setRepeat] = useState(false);

  return (
    <form className="space-y-6">
      {/* Date and Time */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600"
          />
        </div>
      </div>

      {/* Duration Display */}
      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded">
        <p>
          <strong>Start:</strong> 04 Jul 2025 | <strong>End:</strong> 15 Jul 2025
        </p>
        <p className="text-sm mt-1"><strong>Duration:</strong> 12 days | 266:00 hour</p>
      </div>

      {/* Repeat Toggle */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <p className="text-sm font-medium text-gray-800">Add Repetitive Schedules</p>
          <p className="text-xs text-gray-500">Make this a repetitive/recurring event</p>
        </div>
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={repeat}
            onChange={() => setRepeat(!repeat)}
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-pink-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all"></div>
        </label>
      </div>

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

export default Timings;
