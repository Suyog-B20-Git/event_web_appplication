// /* eslint-disable react/prop-types */
// import React from "react";

// const VerticalStepper = ({
//   i1,
//   step1,
//   i2,
//   step2,
//   i3,
//   step3,
//   one,
//   two,
//   three,
// }) => {
//   return (
//     <div className="flex flex-col items-center p-8 pt-8 ">
//       <div className="flex md:flex-col flex-row items-center md:justify-between gap-10 md:gap-4 w-full max-w-2xl">
//         {/* Step 1 */}
//         <div className="flex gap-2 items-center">
//           <div
//             className={`w-16 h-16 flex items-center ${
//               one ? "bg-[#ff2459] " : ""
//             }  justify-center border-2  border-[#ff24ed] text-[#FF2459] rounded-full`}
//           >
//             <span
//               className={`text-xl ${one ? "text-white" : "text-[#ff2459]"}`}
//             >
//               {i1}
//             </span>
//           </div>
//           <p className="font-semibold text-sm md:text-base text-gray-700">
//             {step1}
//           </p>
//         </div>

//         {/* Dashed Line */}

//         <div className="relative right-7">
//           <div
//             className="    w-2/3  md:h-28  h-2
//         border-t-2   md:border-l-2 border-dashed border-gray-300 "
//           ></div>
//         </div>

//         {/* Step 2 */}
//         <div className="flex items-center gap-2">
//           <div
//             className={`w-16 h-16 flex items-center ${
//               two ? "bg-[#ff2459] " : ""
//             }  justify-center border-2  border-[#ff24ed] text-[#FF2459] rounded-full`}
//           >
//             <span
//               className={`text-xl ${two ? "text-white" : "text-[#ff2459]"}`}
//             >
//               {i2}
//             </span>
//           </div>
//           <p className="font-semibold text-sm md:text-base text-gray-700">
//             {step2}
//           </p>
//         </div>

//         {/* Dashed Line */}
//         <div className="relative right-7">
//           <div
//             className="   md:w-2/3   md:h-28  h-2
//         border-t-2   md:border-l-2 border-dashed border-gray-300 "
//           ></div>
//         </div>

//         {/* Step 3 */}
//         <div className="flex  items-center gap-1">
//           <div
//             className={`w-16 h-16 flex items-center ${
//               three ? "bg-[#ff2459] " : ""
//             }  justify-center border-2  border-[#ff24ed] text-[#FF2459] rounded-full`}
//           >
//             <span
//               className={`text-xl ${three ? "text-white" : "text-[#ff2459]"}`}
//             >
//               {i3}
//             </span>
//           </div>
//           <p className="font-semibold text-sm md:text-base text-gray-700">
//             {step3}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerticalStepper;


/* eslint-disable react/prop-types */
import React from "react";

const VerticalStepper = ({
  i1,
  step1,
  i2,
  step2,
  i3,
  step3,
  one,
  two,
  three,
}) => {
  return (
    <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="flex flex-row md:flex-col items-center gap-6 md:gap-10 w-full max-w-4xl">
        {/* Step 1 */}
        <div className="flex flex-col items-center md:flex-row gap-4">
          <div
            className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-[#ff24ed] rounded-full ${
              one ? "bg-[#ff2459]" : "bg-white"
            }`}
          >
            <span
              className={`text-base sm:text-xl font-bold ${
                one ? "text-white" : "text-[#ff2459]"
              }`}
            >
              {i1}
            </span>
          </div>
          <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 text-center md:text-left">
            {step1}
          </p>
        </div>

        {/* Dashed Line */}
        <div className="w-full flex justify-center items-center">
          <div className="hidden md:block relative right-8 w-0.5 h-16 bg-gray-300 border-dashed"></div> {/* Vertical line for desktop */}
          <div className="block md:hidden w-16 h-0.5 relative bottom-4 bg-gray-300 border-dashed"></div> {/* Horizontal line for mobile */}
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center md:flex-row gap-4">
          <div
            className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-[#ff24ed] rounded-full ${
              two ? "bg-[#ff2459]" : "bg-white"
            }`}
          >
            <span
              className={`text-base sm:text-xl font-bold ${
                two ? "text-white" : "text-[#ff2459]"
              }`}
            >
              {i2}
            </span>
          </div>
          <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 text-center md:text-left">
            {step2}
          </p>
        </div>

        {/* Dashed Line */}
        <div className="w-full flex justify-center items-center">
          <div className="hidden relative right-8 md:block w-0.5 h-16 bg-gray-300 border-dashed"></div> {/* Vertical line for desktop */}
          <div className="block md:hidden w-16 h-0.5 relative bottom-4 bg-gray-300 border-dashed"></div> {/* Horizontal line for mobile */}
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center md:flex-row gap-4">
          <div
            className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-[#ff24ed] rounded-full ${
              three ? "bg-[#ff2459]" : "bg-white"
            }`}
          >
            <span
              className={`text-base sm:text-xl font-bold ${
                three ? "text-white" : "text-[#ff2459]"
              }`}
            >
              {i3}
            </span>
          </div>
          <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 text-center md:text-left">
            {step3}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerticalStepper;
