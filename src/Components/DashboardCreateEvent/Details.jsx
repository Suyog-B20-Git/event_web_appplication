import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Details = ({ data, setData, nextTab }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);



  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/categories?type=Event");
        // const response = await axios.get("https://dev.eventsnode.com/api/categories?type=Event");
        if (response.data.status) {
          setCategories(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Ensure current event category is selectable when updating
  useEffect(() => {
    if (!data.category) return;
    if (!categories || categories.length === 0) return;

    const exists = categories.some((cat) => cat?.name === data.category);
    if (!exists) {
      setCategories((prev) => [{ _id: "current-category", name: data.category }, ...prev]);
    }
  }, [data.category, categories]);

  return (
    <form className="space-y-6">
      <div>
        <label className="block font-medium mb-1 text-sm text-gray-700">
          Select Category
        </label>
        <select
          value={data.category || ""}
          onChange={(e) =>
            setData((prev) => ({ ...prev, category: e.target.value }))
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:outline-none hover:border-blue-500 focus:ring-2 focus:ring-pink-400"
          disabled={loading}
        >
          <option value="">{loading ? "Loading categories..." : "-- Category --"}</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-1 gap-6">
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Type
          </label>
          <input
            type="text"
            placeholder="Paid / Free"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none hover:border-blue-500 "
            // value={eventType}
            // onChange={(e) => setEventType(e.target.value)}
            value={data.type || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, type: e.target.value }))
            }
          />
        </div> */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Name
          </label>
          <input
            type="text"
            placeholder="e.g. Summer Fest 2025"
            value={data.eventName || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, eventName: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none hover:border-blue-500"
          />
        </div>
      </div>

      {/* Event URLs */}
      {/* <div className="grid md:grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event URL
          </label>
          <input
            type="text"
            value={data.eventUrl || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, eventUrl: e.target.value }))
            }
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
            value={data.shortUrl || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, shortUrl: e.target.value }))
            }
            placeholder="https://short.link/abc"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none hover:border-blue-500"
          />
        </div>
      </div> */}

      {/* Concept */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Excerpt (Short Info)
        </label>
        <input
          type="text"
          value={data.excerpt || ""}
          onChange={(e) =>
            setData((prev) => ({ ...prev, excerpt: e.target.value }))
          }
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
            value={data.description || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Add rich description..."
            className="w-full px-4 py-3 text-gray-600 placeholder-gray-400 bg-white focus:outline-none hover:border-blue-500 resize-none rounded-lg"
          ></textarea>
        </div>
      </div>

      {/* Why to Attend*/}
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Why to attend event?
        </label>
        <div className="border border-gray-300 rounded-lg">
          <textarea
            rows="5"
            value={data.whyToAttend || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, whyToAttend: e.target.value }))
            }
            placeholder="Mention benefits or purpose..."
            className="w-full px-4 py-3 text-gray-600 placeholder-gray-400 bg-white focus:outline-none hover:border-blue-500 resize-none rounded-lg"
          ></textarea>
        </div>
      </div> */}

      {/* Offline Payment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Offline Payment Instructions
        </label>
        <textarea
          rows="2"
          value={data.offlinePaymentInstructions || ""}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              offlinePaymentInstructions: e.target.value,
            }))
          }
          placeholder="Add instructions..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none hover:border-blue-500"
        ></textarea>
      </div>

      {/* Currency */}
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Event Specific Currency (Optional)
        </label>
        <input
          type="text"
          value={data.currency || ""}
          onChange={(e) =>
            setData((prev) => ({ ...prev, currency: e.target.value }))
          }
          placeholder="e.g. USD / INR"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none hover:border-blue-500"
        />
      </div> */}

      {/* Event Sold Out Toggle */}
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
        <div>
          <label className="text-sm font-medium text-gray-700">Event Sold Out</label>
          <p className="text-xs text-gray-500">Disable event after sold out</p>
        </div>
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={data.soldOut || false}
            onChange={(e) =>
              setData((prev) => ({ ...prev, soldOut: e.target.checked }))
            }
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-red-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all"></div>
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
