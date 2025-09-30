import React from "react";
import { FaRegLaughSquint } from "react-icons/fa";
import { FaMusic } from "react-icons/fa6";
import { FcConferenceCall } from "react-icons/fc";
import { GiCampingTent, GiIsland, GiTeacher } from "react-icons/gi";
import { LuTicketPercent } from "react-icons/lu";
import { TbCategory } from "react-icons/tb";

function EventGenre() {
  const icons = [
    {
        icon:<FaMusic /> ,
        desc: "Music",
        no: "8 events",
      },
    {
      icon: <GiTeacher />,
      desc: "Workshop",
      no: "8 events",
    },
    {
      icon: <GiCampingTent />,
      desc: "Camping",
      no: "6 event",
    },
    {
      icon: <FaRegLaughSquint />,
      desc: "Comedy",
      no: "6 event",
    },
    {
      icon: <LuTicketPercent />,
      desc: "Self Improvement",
      no: "6 event",
    },
    {
      icon: <FcConferenceCall />,
      desc: "Conference",
      no: "6 event",
    },
    {
      icon: <GiIsland />,
      desc: "Adventure",
      no: "6 event",
    },
    {
      icon: <LuTicketPercent />,
      desc: "Festival",
      no: "6 event",
    },
  ];
  return (
    <div className="lg:px-16 lg:relative left-16 top-2">
      <div className="flex gap-2 p-3 relative md:left-5">
        <TbCategory className="relative top-1 text-xl" />
        <p className="font-semibold font-sans">BROWSE EVENT BY GENRE</p>
      </div>
     <div className="grid grid-cols-4 md:grid-cols-5  grid-rows-2  lg:grid-rows-1 lg:grid-cols-9 lg:gap-3">
     {/* <div className="grid grid-cols-4  grid-rows-2  lg:grid-rows-1 lg:grid-cols-8 lg:gap-3"> */}
     {icons.map((item, index) => {
        return (
          <div key={index} className="flex flex-col lg:gap-1 items-center mt-3">
            <div className="p-2 text-4xl border-2 w-[max-content] rounded-lg">{item.icon}</div>
            <p className="font-medium lg:text-sm text-[10px] text-center ">{item.desc}</p>
            <p className="text-xs font-medium text-gray-600">{item.no}</p>
          </div>
        );
      })}
     </div>
    </div>
  );
}

export default EventGenre;
