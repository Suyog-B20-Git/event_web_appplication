import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";



  
const Dropdown = () => {
   const cityName=["Profile","My Booking","Dashboard","Logout"];
  const [isOpen, setIsOpen] = useState(false);
 const [selectedOPtion,setSelectedOption]=useState("Ketan Sir");
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect=(option)=>{
    setSelectedOption(option);
    setIsOpen(false)
  };
  return (
    <div className="relative   text-left  ">
      {/* Dropdown Button */}
      <div
        onClick={toggleDropdown}
        className="flex justify-between items-center w-full px-3 py-2 text-sm font-medium text-gray-500 rounded focus:outline-none">
<div>
{selectedOPtion}

</div>
        <div className="cursor-pointer ms-5 mt-1" >
        {
          !isOpen?<IoMdArrowDropdown />:<IoMdArrowDropup />


        }

        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <ul className="py-1">
            


            {
                cityName.map((option)=>(
                  <li  onClick={()=>handleOptionSelect(option)} className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-300 p-3  hover:border-s-4  border-[] rounded-e-lg">
                          {option}
                      </li>
                ))
            }
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
