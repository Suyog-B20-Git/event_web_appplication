/* eslint-disable react/prop-types */
import React from "react";

function Pagination({
  handlePreviousPage,
  currentPage,
  handleNextPage,
  totalPages,
}) {
  return (
    <div className="flex justify-between items-center  p-2 pb-0">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`px-3 py-2 mx-2 font-semibold rounded-lg ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-[#ff2459] text-white hover:bg-red-600"
        }`}
      >
        Previous
      </button>
      <p className="mx-4 text-gray-500">
        Page {currentPage} of {totalPages}
      </p>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 mx-2 font-semibold rounded-lg ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-[#ff2459] text-white hover:bg-red-600"
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
