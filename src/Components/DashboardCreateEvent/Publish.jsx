import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const baseUrl = "http://localhost:5000/api";



const showToast = (msg) => {
  setToast(msg);
  setTimeout(() => setToast(null), 2500);
};
const Publish = ({ data, setData, onSave }) => {
  const [tagInput, setTagInput] = useState("");
  const [toast, setToast] = useState(null);
  const [eventTags, setEventTags] = useState(data.tags || []);

  // Update eventTags when data.tags changes
  useEffect(() => {
    if (data.tags && JSON.stringify(data.tags) !== JSON.stringify(eventTags)) {
      setEventTags(data.tags);
    }
  }, [data.tags, eventTags]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();

      const newTagsRaw = tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const existingTagsLowerSet = new Set(eventTags.map(tag => tag.toLowerCase()));

      const uniqueNewTags = newTagsRaw.filter(tag => {
        const isDuplicate = existingTagsLowerSet.has(tag.toLowerCase());
        if (!isDuplicate) {
          existingTagsLowerSet.add(tag.toLowerCase());
          return true;
        }
        return false;
      });

      if (uniqueNewTags.length > 0) {
        const updatedTags = [...eventTags, ...uniqueNewTags];
        setEventTags(updatedTags);
        setData(prev => ({ ...prev, tags: updatedTags }));
      }

      setTagInput("");
    }
  };

  const removeTag = (index) => {
    const updatedTags = eventTags.filter((_, i) => i !== index);
    setEventTags(updatedTags);
    setData(prev => ({ ...prev, tags: updatedTags }));
  };



  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    const payload = { tags: eventTags };

    try {
      let response;

      if (eventData?._id) {
        // Update (PUT)
        response = await axios.put(
          `${baseUrl}/event/${eventData._id}`,
          payload,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        showToast("✅ Event updated successfully!");
      } else {
        // Create (POST)
        response = await axios.post(`${baseUrl}/event`, payload, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
        showToast("✅ Event created successfully!");
      }

      console.log("Response:", response.data);
    } catch (error) {
      showToast(" An error occurred while saving.");
    }
  };

  const publishEvent = () => {
    showToast(" Event Published!");
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Event Tags (Optional)
        </label>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a tag and press Enter (comma-separated for multiple)"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full hover:border-blue-500"
        />

        {/* Display Tags as List */}
        <div className="flex flex-wrap mt-2">
          {eventTags.map((tag, index) => (
            <div
              key={index}
              className="bg-blue-500 text-white px-2 py-1 rounded flex items-center m-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-2 text-gray-800 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Publish Toggle */}
      <div className="border border-gray-200 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Publish Settings</h3>
            <p className="text-sm text-gray-600">Control the visibility of your event</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Publish Event</label>
              <p className="text-xs text-gray-500">Make this event visible to the public</p>
            </div>
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={data.isPublish || false}
                onChange={(e) => setData(prev => ({ ...prev, isPublish: e.target.checked }))}
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onSave}
          className="bg-[#ff2459] text-white px-6 py-2 rounded-xl"
        >
          Save
        </button>
      </div>
      {toast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50 transition-all duration-300">
          {toast}
        </div>
      )}
    </div>
  );
};

export default Publish;
