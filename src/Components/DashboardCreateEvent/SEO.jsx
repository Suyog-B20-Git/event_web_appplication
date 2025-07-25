import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SEO = ({ data, setData, nextTab }) => {
  const location = useLocation();
  const eventData = location.state?.event;

  const [metaTitle, setMetaTitle] = useState("");
  const [metaTags, setMetaTags] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  useEffect(() => {
    if (!eventData) return;

    setMetaTitle(eventData.metaTitle || "");
    setMetaTags(eventData.metaTags || "");
    setMetaDescription(eventData.metaDescription || "");
  }, [eventData]);

  return (
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Meta Title
        </label>
        <input
          type="text"
          placeholder="Meta Title"
          value={data.metaTitle || ""}
          onChange={(e) =>
            setData((prev) => ({ ...prev, metaTitle: e.target.value }))
          }
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
          value={data.metaTags || ""}
          onChange={(e) =>
            setData((prev) => ({ ...prev, metaTags: e.target.value }))
          }
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
          value={data.metaDescription || ""}
          onChange={(e) =>
            setData((prev) => ({ ...prev, metaDescription: e.target.value }))
          }
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
