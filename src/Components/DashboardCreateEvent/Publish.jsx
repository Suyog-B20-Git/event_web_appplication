import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const baseUrl = "http://localhost:5000/api";



const showToast = (msg) => {
  setToast(msg);
  setTimeout(() => setToast(null), 2500);
};
const Publish = ({ data, setData, onSave, eventData: propEventData }) => {
  const [newTag, setNewTag] = useState("");
  const location = useLocation();
  const [toast, setToast] = useState(null);
  const stateEventData = location.state?.event;
  const eventData = propEventData || stateEventData;

  const [tags, setTags] = useState([]);

  const addTag = () => {
    if (newTag && !data.tags?.includes(newTag)) {
      setData({ ...data, tags: [...(data.tags || []), newTag] });
      setNewTag("");
    }
  };

  useEffect(() => {
    if (!eventData) return;

    // Handle tags from API response
    if (eventData.eventTags) {
      setTags(eventData.eventTags);
      setData(prev => ({ ...prev, tags: eventData.eventTags }));
    }

    // Handle other publish settings
    setData(prev => ({
      ...prev,
      isPublish: eventData.isPublish || false,
      isFeatured: eventData.isFeatured || false,
      isEnabled: eventData.isEnabled || false
    }));
  }, [eventData, setData]);

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    const payload = { tags };

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
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={data.newTag || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, newTag: e.target.value }))
            }
            placeholder="Search Tags"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full hover:border-blue-500"
          />
          <button
            className="bg-black text-white px-2 py-2 rounded-xl"
            onClick={() => {
              if (data.newTag) {
                setData((prev) => ({
                  ...prev,
                  tags: [...(prev.tags || []), prev.newTag],
                  newTag: "",
                }));
              }
            }}
          >
            Add Tag
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={onSave}
        className="bg-[#ff2459] text-white px-6 py-2 rounded-xl"
      >
        Save
      </button>

      <div className="border border-blue-300 p-6 rounded-xl bg-blue-50">
        <h2 className="text-lg font-semibold mb-2">Publish Event</h2>
        <p className="text-sm mb-4 text-gray-600">
          Once you complete all the required steps, your event becomes eligible
          for Publish.
        </p>
        <button
          onClick={publishEvent}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl"
        >
          Publish Event
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
