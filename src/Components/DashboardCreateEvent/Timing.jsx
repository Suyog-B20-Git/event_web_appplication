import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Timings = ({ data, setData, nextTab, eventData: propEventData }) => {
  const location = useLocation();
  const stateEventData = location.state?.event;
  const eventData = propEventData || stateEventData;

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    if (!eventData) return;

    if (eventData.startDate) {
      const start = new Date(eventData.startDate);
      if (!isNaN(start)) {
        setStartDate(start.toISOString().slice(0, 10));
        setStartTime(start.toTimeString().slice(0, 5));
        setData(prev => ({ ...prev, startDate: start.toISOString().slice(0, 10), startTime: start.toTimeString().slice(0, 5) }));
      }
    }

    if (eventData.endDate) {
      const end = new Date(eventData.endDate);
      if (!isNaN(end)) {
        setEndDate(end.toISOString().slice(0, 10));
        setEndTime(end.toTimeString().slice(0, 5));
        setData(prev => ({ ...prev, endDate: end.toISOString().slice(0, 10), endTime: end.toTimeString().slice(0, 5) }));
      }
    }

    setRepeat(eventData.isRepetitive || false);
    setData(prev => ({ ...prev, isRepetitive: eventData.isRepetitive || false }));
  }, [eventData, setData]);

  return (
    <form className="space-y-6">
      {/* Date and Time */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={data.startDate || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, startDate: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600  hover:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Time
          </label>
          <input
            type="time"
            value={data.startTime || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, startTime: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600  hover:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={data.endDate || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, endDate: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600  hover:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Time
          </label>
          <input
            type="time"
            value={data.endTime || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, endTime: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600  hover:border-blue-500"
          />
        </div>
      </div>

      {/* Duration Display */}
      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded">
        <p>
          <strong>Start:</strong> 04 Jul 2025 | <strong>End:</strong> 15 Jul
          2025
        </p>
        <p className="text-sm mt-1">
          <strong>Duration:</strong> 12 days | 266:00 hour
        </p>
      </div>

      {/* Repeat Toggle */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <p className="text-sm font-medium text-gray-800">
            Add Repetitive Schedules
          </p>
          <p className="text-xs text-gray-500">
            Make this a repetitive/recurring event
          </p>
        </div>
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={data.repeat || false}
            onChange={(e) =>
              setData((prev) => ({ ...prev, repeat: e.target.checked }))
            }
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
