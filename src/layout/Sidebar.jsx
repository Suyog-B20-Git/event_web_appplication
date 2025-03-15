/* eslint-disable react/prop-types */
import React from "react";
import { IoClose, IoLocationSharp } from "react-icons/io5";
import { IoIosPerson, IoMdHome } from "react-icons/io";
import {
  MdAccountCircle,
  MdContactPhone,
  MdEvent,
  MdMiscellaneousServices,
} from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { RiPagesLine } from "react-icons/ri";
// import Dropdown from './DropDown'
// import SA_FilterCheckBox from './SA_FilterCheckBox'

const Sidebar = ({ setShowPopup }) => {
  console.log(setShowPopup);
  //  const [ShowPopup,setShowPopup]=useState(false);

  var text_data = [
    { name: "Home", icon: <IoMdHome />, path: "/home" },

    { name: "Event", path: "/viewAll", icon: <MdEvent /> },
    { name: "Organisers", path: "/Organizers", icon: <GrGroup /> },
    { name: "Performers", path: "/Performers", icon: <IoIosPerson /> },

    {
      name: "Services",
      path: "/Services",
      icon: <MdMiscellaneousServices />,
    },
    { name: "Contact Us", path: "#", icon: <MdContactPhone /> },
    { name: "Venues", path: "/Venues", icon: <IoLocationSharp /> },
    { name: "Create Event", path: "/createEvent", icon: <MdEvent /> },
    { name: "Create Page", path: "/createPage", icon: <RiPagesLine /> },
    { name: "SignUp/Login", path: "/login", icon: <MdAccountCircle /> },
  ];
  const navigate = useNavigate();
  return (
    <>
      <div>
        {" "}
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-10"
          onClick={() => setShowPopup(false)} // Close popup when clicking on overlay
        />
        <div className="absolute top-0 right-0 z-30   bg-white min-h-40 w-[80%] rounded py-6 px-4">
          <div className=" flex justify-between place-self-end items-center px-3 mb-2">
            {/* <p className='text-[#0A1629] text-[22px] font-bold'>Notification</p> */}

            <IoClose
              className="cursor-pointer self-end "
              size={25}
              onClick={() => setShowPopup(false)}
            />
          </div>
          <hr />

          <div className="text-black">
            {text_data.map((item) => (
              <div
                key={item}
                onClick={() => {
                  navigate(item.path);
                  setShowPopup(false);
                }}
                className=" flex gap-2 hover:bg-gray-300 p-3  hover:border-s-4  border-red-500 rounded-e-lg "
              >
                <p className="relative top-1">{item.icon}</p>
                {item.name}
              </div>
            ))}

            {/* <Dropdown  ></Dropdown> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
