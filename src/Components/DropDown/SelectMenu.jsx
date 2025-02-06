import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";




const SelectMenu = ({Options}) => {
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const [isOpen, setIsOpen] = useState(false);



  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative inline-block   w-[100%]">
      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        className="w-full  flex justify-between px-5 py-3 text-left text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200"
      >



<div className="text-[#7D8592]">        {selectedOption  }</div>

{
  isOpen?<IoIosArrowUp/>:<IoIosArrowDown />

}


      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-1">
            {Options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 text-sm text-[#7D8592] hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectMenu;

// import React, { useState } from "react";

// const Dropdown = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   return (
//     <div className="relative inline-block text-left">
//       {/* Dropdown Trigger */}
//       <button
//         onClick={toggleDropdown}
//         className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         Options
//         <svg
//           className="-mr-1 ml-2 h-5 w-5"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//           aria-hidden="true"
//         >
//           <path
//             fillRule="evenodd"
//             d="M10 3a1 1 0 01.894.553l5 10A1 1 0 0115 15H5a1 1 0 01-.894-1.447l5-10A1 1 0 0110 3zm0 3.618L7.387 12h5.226L10 6.618z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//           <div className="py-1">
//             <a
//               href="#"
//               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               Profile
//             </a>
//             <a
//               href="#"
//               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               Settings
//             </a>
//             <a
//               href="#"
//               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               Logout
//             </a>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dropdown;

// // const DropDown=()=>{
// // <>

// // </>
// // }
// // export default DropDown