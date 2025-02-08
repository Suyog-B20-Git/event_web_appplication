import { GrPowerReset } from "react-icons/gr";
import { IoMdHome } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";
import InputField from "../ReusableComponents/InputField";
import SelectMenu from "../DropDown/SelectMenu";
import Cards from "../LandingPage/Cards";

const EventComponent = () => {
  const SelectMenuOptions = ["Work", "Option 1", "Option 2", "Option 3"];

  return (
    <div className="lg:pt-[180px] pt-[87px]">
      <div className=" w-[100%]lg:p-0 p-2 ">
        <div className="sm:p-7 pt-3  items-center flex justify-center  w-[100%] ">
          <div className="w-[100%] sm:w-[90%] ">
            <h2 className="sm:text-xl mb-3 text-lg font-medium sm:font-semibold text-[#000000]">
              Event
            </h2>

            <div className="flex">
              <IoMdHome size={20} className="mt-1 mr-2" />

              <h4 className="text-lg font-normal text-[#000000]">/ Event</h4>
            </div>
          </div>
        </div>
        <div className="sm:p-7 pt-5  items-center flex justify-center w-[100%] ">
          <div className="sm:w-[90%] w-[100%]  flex justify-between items-center border-black ">
            <div className="flex sm:p-2  ">
              <LuSettings2  className="lg:text-xl rounded" />

              <h2 className="sm:text-xl text-[#FF2459] relative lg:bottom-0 bottom-1   mb-3 text-lg font-medium ml-3 sm:font-semibold">
                Filters
              </h2>
            </div>

            <div>
              <div className="flex justify-center items-center border border-[#FF2459] p-1  sm:p-2 rounded text-[#FF2459]">
                <GrPowerReset />

                <span className="ml-3 text-base font-medium">Reset Filter</span>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:p-7 pt-5  items-center     flex justify-center w-[100%] ">
          <div className="md:w-[90%] sm:w-[100%] w-[100%]  p-3  flex flex-wrap  ">
            <div className=" text-black w-[100%] lg:w-[24%] md:w-[48%] sm:w-[48%] m-1  ">
              <InputField label={"Search Event"} shadow={"shadow-none"} width={"w-[100%]"} />
            </div>
            <div className=" text-black w-[100%] lg:w-[24%] md:w-[48%] sm:w-[48%] m-1 ">
              <h2 className="text-gray-600 text-base sm:font-medium  mt-1 mb-3 ">
                Category
              </h2>
              {/* block text-gray-600 text-base font-medium mb-2 */}
              <SelectMenu Options={SelectMenuOptions} />
            </div>
            <div className=" text-black w-[100%] lg:w-[24%] md:w-[48%] sm:w-[48%] m-1 ">
              <InputField label={"Date"} type={"date"} shadow={"shadow-none"}  width={"w-[100%]"} />
            </div>
            <div className=" text-black w-[100%]  lg:w-[24%] md:w-[48%] sm:w-[48%] m-1">
              <h2 className="text-gray-600  text-base sm:font-medium  mb-1 mt-3  ">
                Price
              </h2>

              <SelectMenu Options={SelectMenuOptions} />
            </div>

            <div className=" text-black w-[100%] lg:w-[24%] md:w-[48%] sm:w-[48%] m-1">
              <h2 className="text-gray-600 text-base sm:font-medium   mt-1 mb-3 ">
                Country
              </h2>

              <SelectMenu Options={SelectMenuOptions} />
            </div>
            <div className=" text-black  w-[100%] lg:w-[24%] md:w-[48%] sm:w-[48%] m-1">
              <h2 className="text-gray-600 text-base sm:font-medium   mt-1 mb-3 ">
                State
              </h2>

              <SelectMenu Options={SelectMenuOptions} />
            </div>

            <div className=" text-black w-[100%] lg:w-[24%] md:w-[48%] sm:w-[48%] m-1">
              <h2 className="text-gray-600  text-sm sm:font-medium   mt-2 mb-3 ">
                City
              </h2>

              <SelectMenu Options={SelectMenuOptions} />
            </div>
          </div>
        </div>
        <div className="lg:p-7 items-center flex w-[100%] ">
          <div className="w-[100%] p-1  lg:relative right-10 flex flex-wrap   ">
            <div className=" text-black w-[100%] gap-5  items-center flex flex-wrap ">
             <Cards heading={"Featured Events"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventComponent;

{
  /* <div className=" text-black  w-[24%] m-1">
              <h2 className="text-gray-600 text-base sm:font-medium  mt-1 mb-3 " >Category</h2>
{/* block text-gray-600 text-base font-medium mb-2 */
}
//   <DropDown />
// </div>
// <div className=" text-black w-[24%] m-1 ">
//   <InputField label={"Date"} type={"date"} width={"w-[100%]"} />
// </div>
// <div className=" text-black  w-[24%] m-1">
//   <h2 className="text-gray-600  text-base sm:font-medium  mb-1 mt-3  " >Price</h2>

//   <DropDown />
// </div>

// <div className=" text-black  w-[24%] m-1">
//   <h2 className="text-gray-600 text-base sm:font-medium   mt-1 mb-3 " >Country</h2>

//   <DropDown />
// </div>
// <div className=" text-black  w-[24%] m-1">
//   <h2 className="text-gray-600 text-base sm:font-medium   mt-1 mb-3 " >State</h2>

//   <DropDown />
// </div>

// <div className=" text-black  w-[24%] m-1">
//   <h2 className="text-gray-600  text-sm sm:font-medium   mt-2 mb-3 " >City</h2>

//   <DropDown />
// </div> */}

// import { IoMdHome } from "react-icons/io";
// import { GrPowerReset } from "react-icons/gr";

// import { LuSettings2 } from "react-icons/lu";
// import InputField from "../ReusableComponents/InputField";
// // import DropDown from "./Dropdown";

// import Card2 from "../LandingPage/cards2";
// import SelectMenu from "../DropDown/SelectMenu";
// // import Dropdown from "../DropDown/DropDown";

// const EventComponent = () => {
//   const SelectMenuOptions = ["Work", "Option 1", "Option 2", "Option 3"];
//   var CardData = [
//     { Name: "public/Bs_1.png", text: "" },
//     { Name: "public/Bs_2.png", text: "" },
//     { Name: "public/Bs_3.png", text: "" },
//     { Name: "public/Bs_4.png", text: "" },
//     { Name: "public/Bs_1.png", text: "" },
//   ];

//   return (
//     <>
//       <div className=" w-[100%]  ">
//         <div className="p-7 items-center flex justify-center w-[100%] ">
//           <div className="w-[90%]">
//             <h2 className="sm:text-3xl mb-3 text-lg font-medium sm:font-semibold text-[#000000]">
//               Event
//             </h2>

//             <div className=" flex">
//               <IoMdHome size={20} className="mt-1 mr-2" />

//               <h4 className="text-lg font-normal text-[#000000]">/ Event</h4>
//             </div>
//           </div>
//         </div>
//         <div className="p-7 items-center flex justify-center w-[100%] ">
//           <div className="w-[90%]  flex justify-between items-center ">
//             <div className="flex p-2 ">
//               <LuSettings2 size={36} className=" rounded" />

//               <h2 className="sm:text-xl text-[#FF2459]   mb-3 text-lg font-medium ml-3 sm:font-semibold">
//                 Filters
//               </h2>
//             </div>

//             <div>
//               <div className="flex justify-center items-center border border-[#FF2459] p-2 rounded text-[#FF2459]">
//                 <GrPowerReset />

//                 <span className="ml-3 text-base font-medium">Reset Filter</span>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="p-7 items-center flex justify-center w-[100%] ">
//           <div className="w-[90%] p-3  flex flex-wrap   ">
//             <div className=" text-black w-[24%] m-1 ">
//               <InputField label={"Search Event"} width={"w-[100%]"} />
//             </div>
//             <div className=" text-black  w-[24%] m-1">
//               <h2 className="text-gray-600 text-base sm:font-medium  mt-1 mb-3 ">
//                 Category
//               </h2>
//               {/* block text-gray-600 text-base font-medium mb-2 */}
//               <SelectMenu Options={SelectMenuOptions} />
//             </div>
//             <div className=" text-black w-[24%] m-1 ">
//               <InputField label={"Date"} type={"date"} width={"w-[100%]"} />
//             </div>
//             <div className=" text-black  w-[24%] m-1">
//               <h2 className="text-gray-600  text-base sm:font-medium  mb-1 mt-3  ">
//                 Price
//               </h2>

//               <SelectMenu Options={SelectMenuOptions} />
//             </div>

//             <div className=" text-black  w-[24%] m-1">
//               <h2 className="text-gray-600 text-base sm:font-medium   mt-1 mb-3 ">
//                 Country
//               </h2>

//               <SelectMenu Options={SelectMenuOptions} />
//             </div>
//             <div className=" text-black  w-[24%] m-1">
//               <h2 className="text-gray-600 text-base sm:font-medium   mt-1 mb-3 ">
//                 State
//               </h2>

//               <SelectMenu Options={SelectMenuOptions} />
//             </div>

//             <div className=" text-black  w-[24%] m-1">
//               <h2 className="text-gray-600  text-sm sm:font-medium   mt-2 mb-3 ">
//                 City
//               </h2>

//               <SelectMenu Options={SelectMenuOptions} />
//             </div>
//           </div>
//         </div>
//         <div className="p-7 items-center flex justify-center w-[100%] ">
//           <div className="w-[90%] p-1  flex flex-wrap   ">
//             <div className=" text-black w-[100%] gap-5  items-center flex flex-wrap ">
//               {CardData.map((item) => (
//                 <Card2 item={item} pops={true} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default EventComponent;

// {
//   /* <div className=" text-black  w-[24%] m-1">
//               <h2 className="text-gray-600 text-base sm:font-medium  mt-1 mb-3 " >Category</h2>
// {/* block text-gray-600 text-base font-medium mb-2 */
// }
// //   <DropDown />
// // </div>
// // <div className=" text-black w-[24%] m-1 ">
// //   <InputField label={"Date"} type={"date"} width={"w-[100%]"} />
// // </div>
// // <div className=" text-black  w-[24%] m-1">
// //   <h2 className="text-gray-600  text-base sm:font-medium  mb-1 mt-3  " >Price</h2>

// //   <DropDown />
// // </div>

// // <div className=" text-black  w-[24%] m-1">
// //   <h2 className="text-gray-600 text-base sm:font-medium   mt-1 mb-3 " >Country</h2>

// //   <DropDown />
// // </div>
// // <div className=" text-black  w-[24%] m-1">
// //   <h2 className="text-gray-600 text-base sm:font-medium   mt-1 mb-3 " >State</h2>

// //   <DropDown />
// // </div>

// // <div className=" text-black  w-[24%] m-1">
// //   <h2 className="text-gray-600  text-sm sm:font-medium   mt-2 mb-3 " >City</h2>

// //   <DropDown />
// // </div> */}
