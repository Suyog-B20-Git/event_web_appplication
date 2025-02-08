// import React, { useState } from "react";
// import { BiDrink } from "react-icons/bi";
// import { BsBrush } from "react-icons/bs";
// import { FaBlackTie, FaGift, FaMusic } from "react-icons/fa";
// import { IoFootballOutline } from "react-icons/io5";
// import { MdAccountCircle, MdGroups } from "react-icons/md";
// import { PiSuitcaseSimple } from "react-icons/pi";
// import Button from "../ReusableComponents/Button";
// import { useNavigate } from "react-router-dom";
// import EventStepVertical from "../LandingPage/EventStepVertical";
// import { GiPartyPopper } from "react-icons/gi";
// import { FcViewDetails } from "react-icons/fc";

// function CreateEvent({ one, two, three }) {
//   const navigate = useNavigate();
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   const divs = [
//     { text: "Business", icons: <PiSuitcaseSimple /> },
//     { text: "Festival", icons: <FaGift /> },
//     { text: "Live Music", icons: <FaMusic /> },
//     { text: "Nightlife,Club", icons: <BiDrink /> },
//     { text: "Professional", icons: <FaBlackTie /> },
//     { text: "Social", icons: <MdGroups /> },
//     { text: "Sports ,Leisure", icons: <IoFootballOutline /> },
//     { text: "Theatre & Arts", icons: <BsBrush /> },
//   ];

//   const handleDivClick = (item) => {
//     setSelectedEvent(item.text);
//     console.log("Clicked event:", item.text);
//   };

//   const [radio1, setRadio1] = useState("");
//   const [radio2, setRadio2] = useState("");
//   const [fees, setFees] = useState(0);

//   return (
//     <div className="pb-10 lg:pt-[180px]">
//       <div
//         style={{
//           backgroundImage: "url(/createEvent.png)",
//           backgroundPosition: "center",
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//         }}
//         className="h-24 w-full flex justify-center items-center text-white text-3xl font-semibold"
//       >
//         <h1>Create Event</h1>
//       </div>
//       <div className="flex md:flex-row flex-col ">
//         <div className="flex justify-center items-center">
//           <EventStepVertical
//             one={true}
//             step1={"Basic"}
//             step3={"Account"}
//             step2={"Details"}
//             heading
//             i1={<GiPartyPopper />}
//             i2={<FcViewDetails />}
//             i3={<MdAccountCircle />}
//           />
//         </div>
//         <div className="md:p-4 md:pt-3  lg:pt-3 h-full w-full flex justify-center">
//           <div className="lg:w-2/3  w-full">
//             <div className="pb-14 flex flex-col gap-1 "></div>
//             <div>
//               <div
//                 className="p-3 shadow-md border rounded-md"
//                 style={{
//                   height: "max-content",
//                 }}
//               >
//                 <p className="font-bold text-gray-700 flex justify-center p-3 pb-8">
//                   WHAT KIND OF EVENT ARE YOU ORGANIZING ?
//                 </p>
//                 <div className="flex flex-col">
//                   <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 grid-rows-auto gap-4 ">
//                     {divs.map((item, index) => (
//                       <div key={index} className="">
//                         <div
//                           onClick={() => handleDivClick(item)}
//                           className={`h-20 flex flex-col gap-2 rounded-md justify-center items-center p-1.5  text-sm md:text-base cursor-pointer ${
//                             selectedEvent === item.text
//                               ? "border-2 border-pink-500"
//                               : ""
//                           }`}
//                           style={{
//                             backgroundColor: "rgb(242, 242, 242)",
//                           }}
//                         >
//                           <p style={{ color: "#FF2459" }}>{item.icons}</p>
//                           <p className="font-medium lg:whitespace-nowrap break-words lg:text-base text-xs text-gray-800">
//                             {item.text}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <p
//                   className="p-3 font-semibold flex justify-center"
//                   style={{ color: "#FF2459" }}
//                 >
//                   OTHER
//                 </p>
//                 <p className="p-3 font-semibold flex justify-center text-base">
//                   WHAT WILL YOU BE COLLECTING FOR THIS EVENT ?*
//                 </p>

//                 <div className="flex flex-col sm:flex-row sm:justify-center gap-4 p-2 text-gray-600">
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="Registration"
//                       id="registrations"
//                       // onChange={() => setRadio1("registration")}
//                     />
//                     <label htmlFor="registrations" className="font-medium">
//                       Registrations
//                     </label>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="Tickets"
//                       id="tickets"
//                       onChange={() => setRadio1("Tickets")}
//                     />
//                     <label htmlFor="tickets" className="font-medium">
//                       Tickets
//                     </label>
//                   </div>
//                 </div>

//                 {radio1 == "Tickets" && (
//                   <div className="flex flex-col justify-center items-center p-2">
//                     <label htmlFor="fees" className="text-gray-600 font-medium">Enter Ticket Fees :</label>
//                     <input
//                       className="rounded border p-1 "
//                       type="text"
//                       value={fees}
//                       onChange={(e) => setFees(e.target.value)}
//                     />
//                   </div>
//                 )}

//                 <div className="flex flex-col sm:flex-row sm:justify-center gap-4 p-3 text-gray-600">
//                   <div className="flex items-center gap-2">
//                     <input type="radio" name="Privacy" id="private" />
//                     <label htmlFor="private" className="font-medium">
//                       Private
//                     </label>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <input type="radio" name="Privacy" id="public" />
//                     <label htmlFor="public" className="font-medium">
//                       Public
//                     </label>
//                   </div>
//                 </div>

//                 <p className="flex justify-center text-gray-500 text-base font-medium">
//                   Your Event is open for anyone to find & register for it
//                 </p>
//                 <p className="flex justify-center p-5 pt-10">
//                   <Button
//                     onClick={() => navigate("/createEventForm")}
//                     text={"NEXT"}
//                     variant={"primary"}
//                     rounded={"rounded-2xl"}
//                     textSize={"text-sm"}
//                   />
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateEvent;

import React, { useState } from "react";
import { BiDrink } from "react-icons/bi";
import { BsBrush } from "react-icons/bs";
import { FaBlackTie, FaGift, FaMusic } from "react-icons/fa";
import { IoFootballOutline } from "react-icons/io5";
import { MdAccountCircle, MdGroups } from "react-icons/md";
import { PiSuitcaseSimple } from "react-icons/pi";
import Button from "../ReusableComponents/Button";
import { useNavigate } from "react-router-dom";
import EventStepVertical from "../LandingPage/EventStepVertical";
import { GiPartyPopper } from "react-icons/gi";
import { FcViewDetails } from "react-icons/fc";
import Photo1 from "./Photo1";

function CreateEvent({ one, two, three }) {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  // const [radio1, setRadio1] = useState("");
  // const [radio2, setRadio2] = useState("");
  const [selectedRadio, setSelectedRadio] = useState("");

  const handleRadioChange = (value) => {
    setSelectedRadio(value);
  };
  const [fees, setFees] = useState(0);

  return (
    <div className="lg:pt-[160px] md:pt-[200px] pt-[80px] h-[124vh]  lg:h-[96vh] ">
      <div className="flex   lg:flex-row h-screen">
        <Photo1 h={75} />
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
                          className={`h-20 flex flex-col gap-2 rounded-md justify-center items-center p-1.5  text-sm md:text-base cursor-pointer ${
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
                {/* <p
                  className="pt-3 font-semibold flex justify-center lg:text-base text-xs"
                  style={{ color: "#FF2459" }}
                >
                  OTHER
                </p> */}
                <p className="p-3 font-semibold flex justify-center lg:text-base text-xs">
                  WHAT WILL YOU BE COLLECTING FOR THIS EVENT ?*
                </p>

                {/* <div className="grid  grid-cols-2"> */}
                <div className="flex flex-col ">
                  <div className="flex flex-col sm:flex-row sm:justify-center gap-4 p-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      {/* <input
                        type="radio"
                        name="Registration"
                        id="registrations"
                      />
                      <label
                        htmlFor="registrations"
                        className="font-medium lg:text-base text-xs"
                      >
                        Registrations */}
                      <input
                        type="radio"
                        name="event"
                        id="registrations"
                        checked={selectedRadio === "registration"}
                        onChange={() => handleRadioChange("registration")}
                        disabled={selectedRadio === "Tickets"}
                      />
                      <label htmlFor="registrations">Registrations</label>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* <input
                        type="radio"
                        name="Tickets"
                        id="tickets"
                        onChange={() => setRadio1("Tickets")}
                      />
                      <label
                        htmlFor="tickets"
                        className="font-medium lg:text-base text-xs"
                      >
                        Tickets
                      </label> */}
                      <input
                        type="radio"
                        name="event"
                        id="tickets"
                        className="font-medium lg:text-base text-xs"
                        checked={selectedRadio === "Tickets"}
                        onChange={() => handleRadioChange("Tickets")}
                        disabled={selectedRadio === "registration"}
                      />
                      <label htmlFor="tickets">Tickets</label>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-center gap-4 p-3 text-gray-600">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="Privacy" id="private" />
                      <label
                        htmlFor="private"
                        className="font-medium lg:text-base text-xs"
                      >
                        Private
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="Privacy" id="public" />
                      <label
                        htmlFor="public"
                        className="font-medium lg:text-base text-xs"
                      >
                        Public
                      </label>
                    </div>
                  </div>
                  {selectedRadio == "Tickets" && (
                    <div className="lg:hidden flex-col justify-center items-center  p-2 w-full">
                      <label
                        htmlFor="fees"
                        className="text-gray-600 font-medium lg:text-base text-xs"
                      >
                        Enter Ticket Fees :
                      </label>
                      <input
                        className="rounded border p-1 "
                        type="text"
                        value={fees}
                        onChange={(e) => setFees(e.target.value)}
                      />
                    </div>
                  )}
                  {selectedRadio == "Tickets" && (
                    <div className="lg:hidden flex flex-row gap-4">
                      <label
                        htmlFor="fees"
                        className="text-gray-600 whitespace-nowrap font-medium text-xs"
                      >
                        Enter Ticket Fees :
                      </label>
                      <input
                        className="rounded border px-2 "
                        type="text"
                        value={fees}
                        onChange={(e) => setFees(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <p className="flex justify-center text-xs lg:text-base text-gray-500  font-medium lg:p-0 p-3">
                  Your Event is open for anyone to find & register for it
                </p>
                <p className="flex justify-center  lg:pt-5 pt-3">
                  <Button
                    onClick={() => navigate("/createEventForm")}
                    text={"NEXT"}
                    variant={"primary"}
                    rounded={"rounded-2xl"}
                    textSize={"text-sm"}
                  />
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
