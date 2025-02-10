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
          <div className="hidden md:block relative right-8 w-0.5 h-16 bg-gray-300 border-dashed"></div>{" "}
          {/* Vertical line for desktop */}
          <div className="block md:hidden w-16 h-0.5 relative bottom-4 bg-gray-300 border-dashed"></div>{" "}
          {/* Horizontal line for mobile */}
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
          <div className="hidden relative right-8 md:block w-0.5 h-16 bg-gray-300 border-dashed"></div>{" "}
          {/* Vertical line for desktop */}
          <div className="block md:hidden w-16 h-0.5 relative bottom-4 bg-gray-300 border-dashed"></div>{" "}
          {/* Horizontal line for mobile */}
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
