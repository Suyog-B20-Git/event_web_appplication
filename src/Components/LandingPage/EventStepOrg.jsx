/* eslint-disable react/prop-types */
import React from "react";

const StepsComponent = ({ heading, step1, step2, step3, i1, i2, i3 }) => {
  return (
    <div className="flex flex-col items-center p-6 pt-8 ">
      <h2 className="text-gray-500 text-lg mb-2">How it Works</h2>
      <h3 className="text-[#FF2459] text-3xl font-semibold mb-8">{heading}</h3>
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-10 md:gap-4 w-full max-w-4xl">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center border-2  border-[#ff24ed] text-[#FF2459] rounded-full">
            <span className="text-xl text-[#ff2459]">{i1}</span>
          </div>
          <p className="mt-4 font-semibold text-gray-700">{step1}</p>
        </div>

        {/* Dashed Line */}

        <div className=" relative bottom-6 hidden md:block w-full h-1 border-t-2 border-dashed border-gray-300 mx-4"></div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center border-2 border-[#ff24ed] text-[#FF2459] rounded-full">
            <span className="text-xl text-[#ff2459]">{i2}</span>
          </div>
          <p className="mt-4 font-semibold text-gray-700">{step2}</p>
        </div>

        {/* Dashed Line */}
        <div className="relative bottom-6 hidden md:block w-full h-1 border-t-2 border-dashed border-gray-300 mx-4"></div>

        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center border-2 border-green-500 rounded-full">
            <span className="text-xl text-[#ff2459]">{i3}</span>
          </div>
          <p className="mt-4 font-semibold text-gray-700">{step3}</p>
        </div>
      </div>

      {/* Mobile Dashed Line */}
      <div className="block md:hidden mt-6 border-t-2 border-dashed border-gray-300 w-3/4"></div>
    </div>
  );
};

export default StepsComponent;
