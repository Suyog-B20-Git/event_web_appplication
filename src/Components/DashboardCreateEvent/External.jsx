import React, { useState } from "react";

const External = ({ nextTab }) => {
  const [externalUrl, setExternalUrl] = useState("");
  const [buttonText, setButtonText] = useState("");

  const handleSave = () => {
    console.log("Saved External:", { externalUrl, buttonText });
    nextTab();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1 text-sm text-gray-700">External URL</label>
        <input
          type="text"
          placeholder="Enter external event URL"
          value={externalUrl}
          onChange={(e) => setExternalUrl(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm text-gray-700">Button Text</label>
        <input
          type="text"
          placeholder="Enter button text"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-[#ff2459] text-white px-6 py-2 rounded-lg"
      >
        Save
      </button>
    </div>
  );
};

export default External;
