import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SocialMedia = ({ data, setData, nextTab }) => {

  const handleAddLink = (type) => {
    setData(prev => ({
      ...prev,
      [type]: [...(prev[type] || []), ""]
    }));
  };

  const handleRemoveLink = (type, index) => {
    setData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleLinkChange = (type, index, value) => {
    setData(prev => ({
      ...prev,
      [type]: prev[type].map((link, i) =>
        i === index ? value : link
      )
    }));
  };

  const renderLinkSection = (title, type, placeholder) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {title}
        </label>
        <button
          type="button"
          onClick={() => handleAddLink(type)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          + Add Link
        </button>
      </div>
      <div className="space-y-2">
        {data[type] && data[type].length > 0 ? (
          data[type].map((link, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="url"
                placeholder={placeholder}
                value={link}
                onChange={(e) => handleLinkChange(type, index, e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none hover:border-blue-500 focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="button"
                onClick={() => handleRemoveLink(type, index)}
                className="text-red-600 hover:text-red-800 text-sm font-medium px-2"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No {title.toLowerCase()} added</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h3>

        {/* Event YouTube Links */}
        {renderLinkSection(
          "Event YouTube Links",
          "youtubeLinks",
          "https://www.youtube.com/watch?v=..."
        )}

        {/* Performer Facebook Links */}
        {/* {renderLinkSection(
          "Performer Facebook Links",
          "performerFacebookLinks",
          "https://www.facebook.com/..."
        )} */}

        {/* Venue Facebook Links */}
        {/* {renderLinkSection(
          "Venue Facebook Links",
          "venueFacebookLinks",
          "https://www.facebook.com/..."
        )} */}

        {/* Navigation */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={nextTab}
            className="bg-[#ff2459] text-white px-6 py-2 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia; 