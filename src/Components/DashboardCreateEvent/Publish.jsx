import React, { useState } from "react";

const Publish = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const publishEvent = () => {
    alert("Event Published!");
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
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Search Tags"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full hover:border-blue-500"
          />
          <button
            onClick={addTag}
            className="bg-black text-white px-2 py-2 rounded-xl "
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

      <button className="bg-[#ff2459] text-white px-6 py-2 rounded-xl">
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
    </div>
  );
};

export default Publish;
