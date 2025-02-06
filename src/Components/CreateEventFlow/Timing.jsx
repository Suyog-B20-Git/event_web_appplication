import { styled, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdSimCardDownload } from "react-icons/md";

function Timing() {
  const [sDate, setSDate] = useState("");
  const [sTime, setSTime] = useState("");
  const [eDate, setEDate] = useState("");
  const [eTime, setETime] = useState("");
  const [duration, setDuration] = useState("");
  const [isRepeit, setIsRepeit] = useState(false);
  const [repeitType, setRepeitType] = useState("");
  const [timeData, setTimeData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sDate && sTime && eDate && eTime) {
      const newEntry = {
        startDate: sDate,
        startTime: sTime,
        endDate: eDate,
        endTime: eTime,
        repeitType: isRepeit ? repeitType : "None", // Add "None" if not repetitive
      };
      setTimeData([...timeData, newEntry]);
      setEDate("")
      setSDate("")
      setSTime("")
      setETime("")
      setIsRepeit(false)
    } else {
      alert("Please fill all the required fields.");
    }
  };
  const handleToggle = (event) => {
    setIsRepeit(event.target.checked);
  };
  const calculateDuration = () => {
    if (sDate && sTime && eDate && eTime) {
      const start = new Date(`${sDate}T${sTime}`);
      const end = new Date(`${eDate}T${eTime}`);

      if (end < start) {
        setDuration("End date/time must be after the start date/time.");
        return;
      }

      const diffMs = end - start; // Difference in milliseconds
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

      setDuration(`${diffDays} days | ${diffHours} : ${diffMinutes} hour`);
    } else {
      setDuration("Please select valid start and end date/time.");
    }
  };

  useEffect(() => {
    calculateDuration();
  }, [duration]);
  // Get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#1890ff",
          ...theme.applyStyles("dark", {
            backgroundColor: "#177ddc",
          }),
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: "rgba(0,0,0,.25)",
      boxSizing: "border-box",
      ...theme.applyStyles("dark", {
        backgroundColor: "rgba(255,255,255,.35)",
      }),
    },
  }));

  return (
    <div className="p-4">
     <form onSubmit={handleSubmit}>
     <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-col w-full sm:w-[48%]">
          <label htmlFor="startDate" className="mb-1 text-gray-700 font-medium">
            Start Date
          </label>
          <input
            type={sDate ? "date" : "text"}
            id="startDate"
            value={sDate}
            required
            min={today}
            placeholder="Start date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => !e.target.value && (e.target.type = "text")}
            onChange={(e) => setSDate(e.target.value)}
            className="border rounded-md p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col w-full sm:w-[48%]">
          <label htmlFor="startTime" className="mb-1 text-gray-700 font-medium">
            Start Time
          </label>
          <input
            type={sTime ? "time" : "text"}
            id="startTime"
            value={sTime}
            required
            placeholder="Start time"
            onFocus={(e) => (e.target.type = "time")}
            onBlur={(e) => !e.target.value && (e.target.type = "text")}
            onChange={(e) => setSTime(e.target.value)}
            className="border rounded-md p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-4 mt-4">
        <div className="flex flex-col w-full sm:w-[48%]">
          <label htmlFor="endDate" className="mb-1 text-gray-700 font-medium">
            End Date
          </label>
          <input
            type={eDate ? "date" : "text"}
            id="endDate"
            value={eDate}
            required
            min={today}
            placeholder="End date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => !e.target.value && (e.target.type = "text")}
            onChange={(e) => setEDate(e.target.value)}
            className="border rounded-md p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col w-full sm:w-[48%]">
          <label htmlFor="endTime" className="mb-1 text-gray-700 font-medium">
            End Time
          </label>
          <input
            type={eTime ? "time" : "text"}
            id="endTime"
            value={eTime}
            required
            placeholder="End time"
            onFocus={(e) => (e.target.type = "time")}
            onBlur={(e) => !e.target.value && (e.target.type = "text")}
            onChange={(e) => setETime(e.target.value)}
            className="border rounded-md p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <div className="flex max-w-2xl justify-between p-2">
          <div>
            <header className="font-medium lg:text-xl">
              Add Repeititive Schedules
            </header>
            <p className="text-gray-700 lg:text-sm text-xs">
              Make This repietive /recurring event
            </p>
          </div>
          <AntSwitch
            defaultChecked
            className="mt-5"
            checked={isRepeit}
            onChange={handleToggle}
            inputProps={{ "aria-label": "ant design" }}
          />
        </div>
        <div>
          {isRepeit && (
            <div className="flex flex-col gap-1 p-2 px-1">
              <label htmlFor="Repeitive type">Repeit type</label>
              <select
                value={repeitType}
                className="w-[40%] p-1 px-0 mt-2 border"
                onChange={(e) => setRepeitType(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <div className="font-medium lg:w-[50%] md:w-[50%] text-white lg:text-lg rounded-full p-1 px-5  bg-blue-500 mt-1">
                # 1 Jan Schedule
              </div>
              <div className="flex lg:flex-row flex-col justify-around gap-10">
                <div className="flex flex-col  sm:w-[50%]">
                  <label
                    htmlFor="startTime"
                    className="mb-1 text-gray-700 font-medium"
                  >
                    Start Time
                  </label>
                  <input
                    type={sTime ? "time" : "text"}
                    id="startTime"
                    value={sTime}
                    placeholder="Start time"
                    onFocus={(e) => (e.target.type = "time")}
                    onBlur={(e) => !e.target.value && (e.target.type = "text")}
                    onChange={(e) => setSTime(e.target.value)}
                    className="border rounded-md p-2   text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col max-w-3xl sm:w-[50%]">
                  <label
                    htmlFor="endTime"
                    className="mb-1 text-gray-700 font-medium"
                  >
                    End Time
                  </label>
                  <input
                    type={eTime ? "time" : "text"}
                    id="endTime"
                    value={eTime}
                    placeholder="End time"
                    onFocus={(e) => (e.target.type = "time")}
                    onBlur={(e) => !e.target.value && (e.target.type = "text")}
                    onChange={(e) => setETime(e.target.value)}
                    className="border rounded-md p-2  text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        {sDate && sTime && eDate && eTime && (
          <div className="flex flex-col gap-2 bg-[#D3E4FF] rounded-md p-2 mt-2 mb-2">
            <p className="font-medium text-[#2779FF] border-b border-black p-2 pl-0">
              Start : {sDate} | End : {eDate}
            </p>

            <p className="flex gap-1">
              <p className="font-medium">Duration</p> {duration}
            </p>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 gap-2  lg:text-xl flex  w-[max-content] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        // onClick={() => hanldeSubmit}
      >
        <MdSimCardDownload className="relative top-1 " />
        Save
      </button>
     </form>
    </div>
  );
}

export default Timing;
