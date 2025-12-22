import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Repetitive = ({ data, setData, nextTab, eventData: propEventData }) => {
  const location = useLocation();
  const stateEventData = location.state?.event;
  const eventData = propEventData || stateEventData;
  const [isRepetitive, setIsRepetitive] = useState(false);

  useEffect(() => {
    if (!eventData) return;
    setData({
      isRepetitive: eventData.isRepetitive || false,
      repetitiveType: eventData.repetitiveType || "Weekly",
      repeatExcept: eventData.repeatExcept || [],
      repeatDates: eventData.repeatDates || [],
      repeatDays: eventData.repeatDays || [],
      repeatStartTime: eventData.repeatStartTime || "",
      repeatEndTime: eventData.repeatEndTime || "",
    });
    setIsRepetitive(eventData.isRepetitive || false);
  }, [eventData, setData]);

  const handleRepetitiveToggle = (checked) => {
    setIsRepetitive(checked);
    setData(prev => ({ ...prev, isRepetitive: checked }));
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Repetitive Event Settings</h3>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isRepetitive}
              onChange={(e) => handleRepetitiveToggle(e.target.checked)}
              className="rounded border-gray-300 text-blue-600"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              This is a repetitive event
            </span>
          </label>
        </div>

        {isRepetitive && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repetition Type
              </label>
              <select
                value={data.repetitiveType || "Weekly"}
                onChange={(e) => setData(prev => ({ ...prev, repetitiveType: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Repeat Start Time
                </label>
                <input
                  type="time"
                  value={data.repeatStartTime || ""}
                  onChange={(e) => setData(prev => ({ ...prev, repeatStartTime: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Repeat End Time
                </label>
                <input
                  type="time"
                  value={data.repeatEndTime || ""}
                  onChange={(e) => setData(prev => ({ ...prev, repeatEndTime: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>

            {data.repetitiveType === "Weekly" && (
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
                        const currentDays = data.repeatDays || [];
                        const newDays = currentDays.includes(day)
                          ? currentDays.filter(d => d !== day)
                          : [...currentDays, day];
                        setData(prev => ({ ...prev, repeatDays: newDays }));
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${(data.repeatDays || []).includes(day)
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

export default Repetitive; 