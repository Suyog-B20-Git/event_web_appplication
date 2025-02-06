/* eslint-disable react/prop-types */
import React from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";


function Pagination({
  handlePreviousPage,
  currentPage,
  handleNextPage,
  totalPages,
}) {
  return (
    <div className="flex gap-3 items-center mt-3 p-2">
      <button 
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`px-4 flex py-2 mx-2 font-semibold rounded-lg ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-red-500 text-white hover:bg-red-700"
        }`}
      >
       <GrFormPrevious className="relative top-1" />  Previous
      </button>
      <p className="mx-4 text-gray-500">
         {currentPage}/{totalPages}
      </p>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 flex  py-2 mx-2 font-semibold rounded-lg ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-red-500 text-white hover:bg-red-700"
        }`}
      >
        Next <MdNavigateNext  className="relative top-1" /> 
      </button>
    </div>

  );
}

export default Pagination;
