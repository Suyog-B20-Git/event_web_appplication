import React, { useEffect, useState } from "react";
import { BiDrink } from "react-icons/bi";
import { BsBrush } from "react-icons/bs";
import { FaBlackTie, FaGift, FaMusic } from "react-icons/fa";
import { IoFootballOutline } from "react-icons/io5";
import { MdAccountCircle, MdGroups } from "react-icons/md";
import { PiSuitcaseSimple } from "react-icons/pi";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

import { GiPartyPopper } from "react-icons/gi";
import { FcViewDetails } from "react-icons/fc";
import Photo1 from "./Photo1";

function CreateEvent({ one, two, three }) {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventType, setEventType] = useState(null);

  const divs = [
    { text: "Business", icons: <PiSuitcaseSimple /> },
    { text: "Festival", icons: <FaGift /> },
    { text: "Live Music", icons: <FaMusic /> },
    { text: "Nightlife,Club", icons: <BiDrink /> },
    { text: "Professional", icons: <FaBlackTie /> },
    { text: "Social", icons: <MdGroups /> },
    { text: "Sports ,Leisure", icons: <IoFootballOutline /> },
    { text: "Theatre & Arts", icons: <BsBrush /> },
  ];

  const handleDivClick = (item) => {
    setSelectedEvent(item.text);
    console.log("Clicked event:", item.text);
  };

  const [selectedRadio, setSelectedRadio] = useState("");

  const handleRadioChange = (value) => {
    setSelectedRadio(value);
  };
  const handleRadio1Change = (value) => {
    setEventType(value);
  };
  const [fees, setFees] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("eventData"));
    return storedData?.fees || null;
  });
  const [error, setError] = useState("");

  const setLocalStorage = (eventData) => {
    localStorage.setItem("eventData", JSON.stringify(eventData));
    setLocalStorageData(eventData); // Update state after setting localStorage
  };

  const [localstorageData, setLocalStorageData] = useState(
    JSON.parse(localStorage.getItem("eventData")) || {}
  );
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("eventData")) || {};
    setLocalStorageData(storedData);

    setSelectedEvent(storedData.selectedEvent || null);
    setEventType(storedData.eventType || null);
    setSelectedRadio(storedData.selectedRadio || "");
    setFees(storedData.fees || "");
  }, []);
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="h-[112vh] md:h-[57vh]  lg:h-[77vh] ">
      <div className="flex   lg:flex-row h-screen">
        <Photo1 h={77} />
        <div className="p-3   lg:w-1/2 w-full ">
          <div className="w-full">
            <div className="pb-1 lg:pb-6 flex flex-col gap-1 "></div>
            <div>
              <div
                className="p-3 rounded-md"
                style={{
                  height: "max-content",
                }}
              >
                <p className="font-bold text-gray-700 text-lg  flex justify-center p-2 lg:pb-10 pb-4">
                  WHAT KIND OF EVENT ARE YOU ORGANIZING ?
                </p>
                <div className="flex flex-col">
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 grid-rows-auto gap-4 ">
                    {divs.map((item, index) => (
                      <div key={index} className="">
                        <div
                          onClick={() => handleDivClick(item)}
                          className={`h-20 flex flex-col gap-2 hover:scale-110 hover:border-pink-400 hover:border-2 rounded-md justify-center items-center p-1.5  text-sm md:text-base cursor-pointer ${
                            selectedEvent === item.text
                              ? "border-2 border-pink-500"
                              : ""
                          }`}
                          style={{
                            backgroundColor: "rgb(242, 242, 242)",
                          }}
                        >
                          <p style={{ color: "#FF2459" }}>{item.icons}</p>
                          <p className="font-medium lg:whitespace-nowrap break-words lg:text-sm text-xs text-gray-800">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="p-3 font-semibold flex justify-center lg:text-base text-xs mt-4">
                  WHAT WILL YOU BE COLLECTING FOR THIS EVENT ?*
                </p>

                {/* <div className="grid  grid-cols-2"> */}
                {/* <div className="flex flex-col ">
                  <div className="flex flex-col sm:flex-row sm:justify-center gap-4 p-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="event"
                        id="registrations"
                        checked={selectedRadio === "registration"}
                        onChange={() => handleRadioChange("registration")}
                        // disabled={selectedRadio === "Tickets"}
                      />
                      <label htmlFor="registrations">Registrations</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="event"
                        id="tickets"
                        className="font-medium lg:text-base text-xs"
                        checked={selectedRadio === "Tickets"}
                        onChange={() => handleRadioChange("Tickets")}
                        // disabled={selectedRadio === "registration"}
                      />
                      <label htmlFor="tickets">Tickets</label>
                    </div>
                  </div>
                  {selectedRadio == "Tickets" && (
                    <div className="justify-center items-center flex flex-row gap-4">
                      <label
                        htmlFor="fees"
                        className="text-gray-600 whitespace-nowrap font-medium text-xs"
                      >
                        Enter Ticket Fees :
                      </label>
                      <input
                        className="rounded border px-2 "
                        type="number"
                        value={fees}
                        onChange={(e) =>
                          setFees(
                            localstorageData.fees
                              ? localstorageData.fees
                              : e.target.value
                          )
                        }
                      />
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row lg:gap-14 sm:justify-center gap-4 p-3 text-gray-600">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={eventType === "Private"}
                        onChange={() => handleRadio1Change("Private")}
                        name="Private"
                        id="private"
                      />
                      <label
                        htmlFor="private"
                        className="font-medium lg:text-base text-xs"
                      >
                        Private
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="Public"
                        checked={eventType === "Public"}
                        onChange={() => handleRadio1Change("Public")}
                        id="public"
                      />
                      <label
                        htmlFor="public"
                        className="font-medium lg:text-base text-xs"
                      >
                        Public
                      </label>
                    </div>
                  </div>
                </div> */}

                
<div className="flex flex-col">
                  {/* Event Type Section */}
                  <div className="flex flex-col sm:flex-row sm:justify-center gap-6 p-4 text-gray-600">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="event"
                        id="registrations"
                        checked={selectedRadio === "registration"}
                        onChange={() => handleRadioChange("registration")}
                        className="h-4 w-4"
                      />
                      <label htmlFor="registrations" className="text-sm sm:text-base font-medium text-gray-800">
                        Registrations
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="event"
                        id="tickets"
                        checked={selectedRadio === "Tickets"}
                        onChange={() => handleRadioChange("Tickets")}
                        className="h-4 w-4"
                      />
                      <label htmlFor="tickets" className="text-sm sm:text-base font-medium text-gray-800">
                        Tickets
                      </label>
                    </div>
                  </div>

                  {/* Event Visibility Section */}
                  <div className="flex flex-col lg:flex-row lg:gap-16 sm:justify-center gap-6 p-4 text-gray-600">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={eventType === "Private"}
                        onChange={() => handleRadio1Change("Private")}
                        name="eventType"
                        id="private"
                        className="h-4 w-4"
                      />
                      <label htmlFor="private" className="text-sm sm:text-base font-medium text-gray-800">
                        Private
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="eventType"
                        checked={eventType === "Public"}
                        onChange={() => handleRadio1Change("Public")}
                        id="public"
                        className="h-4 w-4"
                      />
                      <label htmlFor="public" className="text-sm sm:text-base font-medium text-gray-800">
                        Public
                      </label>
                    </div>
                  </div>
                </div>


                <p className="flex justify-center text-xs lg:text-base text-gray-500  font-medium lg:p-0 p-3">
                  Your Event is open for anyone to find & register for it
                </p>
                <p className="flex justify-center  lg:pt-5 pt-3">
                  <Button
                    onClick={() => {
                      if (selectedEvent && eventType && selectedRadio) {
                        navigate("/createEventForm", {
                          state: {
                            eventType: eventType,
                            selectedEvent: selectedEvent,
                            selectedRadio: selectedRadio,
                            fees: fees,
                          },
                        });
                        const eventData = {
                          selectedEvent,
                          eventType,
                          selectedRadio,
                          fees,
                        };

                        setLocalStorage(eventData);
                        setError(""); // Clear error when all fields are selected
                      } else {
                        setError("Please Fill All Inputfields..."); // Show error when fields are missing
                      }
                    }}
                    text={"NEXT"}
                    variant={"primary"}
                    rounded={"rounded-lg"}
                    textSize={"text-sm"}
                  />
                </p>
                <p className="text-sm flex justify-center text-red-600 font-medium pt-1">
                  {" "}
                  {error ? error : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
