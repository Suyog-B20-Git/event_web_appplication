import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Timings = ({ data, setData, nextTab, repetitiveData, setRepetitiveData }) => {
  const [startDate, setStartDate] = useState(data.startDate || "");
  const [startTime, setStartTime] = useState(data.startTime || "");
  const [endDate, setEndDate] = useState(data.endDate || "");
  const [endTime, setEndTime] = useState(data.endTime || "");
  const [repeat, setRepeat] = useState(data.isRepetitive || false);
  const [isRepetitive, setIsRepetitive] = useState(data.isRepetitive || false);

  const handleRepetitiveToggle = (checked) => {
    setIsRepetitive(checked);
    setData(prev => ({ ...prev, isRepetitive: checked }));
    setRepetitiveData(prev => ({ ...prev, isRepetitive: checked }));
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
      {/* <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded">
        <p>
          <strong>Start:</strong> 04 Jul 2025 | <strong>End:</strong> 15 Jul
          2025
        </p>
        <p className="text-sm mt-1">
          <strong>Duration:</strong> 12 days | 266:00 hour
        </p>
      </div> */}

      {/* Repetitive Event Settings */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Repetitive Event Settings</h3>

        {/* Repetitive Toggle */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
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
                checked={isRepetitive}
                onChange={(e) => handleRepetitiveToggle(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-pink-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all"></div>
            </label>
          </div>
        </div>

        {isRepetitive && (
          <>
            {/* Repetitive Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repetition Type
              </label>
              <select
                value={repetitiveData.repetitiveType || "Weekly"}
                onChange={(e) => setRepetitiveData(prev => ({ ...prev, repetitiveType: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            {/* Repeat Times */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Repeat Start Time
                </label>
                <input
                  type="time"
                  value={repetitiveData.repeatStartTime || ""}
                  onChange={(e) => setRepetitiveData(prev => ({ ...prev, repeatStartTime: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Repeat End Time
                </label>
                <input
                  type="time"
                  value={repetitiveData.repeatEndTime || ""}
                  onChange={(e) => setRepetitiveData(prev => ({ ...prev, repeatEndTime: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>

            {/* Weekly Settings */}
            {repetitiveData.repetitiveType === "Weekly" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repeat on Days
                </label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        const currentDays = repetitiveData.repeatDays || [];
                        const newDays = currentDays.includes(day)
                          ? currentDays.filter(d => d !== day)
                          : [...currentDays, day];
                        setRepetitiveData(prev => ({ ...prev, repeatDays: newDays }));
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${(repetitiveData.repeatDays || []).includes(day)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
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
