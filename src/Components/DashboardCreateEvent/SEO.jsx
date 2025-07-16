// Components/DashboardCreateEvent/SEO.jsx

import React from "react";

const SEO = ({ nextTab }) => {
  return (
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Meta Title
        </label>
        <input
          type="text"
          placeholder="Meta Title"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 hover:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Meta Tags
        </label>
        <input
          type="text"
          placeholder="Keywords (comma separated)"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 hover:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Meta Description
        </label>
        <input
          type="text"
          placeholder="Short SEO Description"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 hover:border-blue-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextTab}
          className="bg-[#ff2459] text-white px-6 py-2 rounded-lg"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default SEO;
