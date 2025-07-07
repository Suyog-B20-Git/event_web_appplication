import React from "react";

const Details = ({ nextTab }) => {
  return (
    <form className="space-y-6">
      {/* Category Dropdown */}
      <div>
        <label className="block font-medium mb-1 text-sm text-gray-700">Select Category</label>
        <select className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400">
          <option value="">-- Category --</option>
          <option value="concert">Concert</option>
          <option value="workshop">Workshop</option>
        </select>
      </div>

      {/* Event Type + Name */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
          <input
            type="text"
            placeholder="Paid / Free"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
          <input
            type="text"
            placeholder="e.g. Summer Fest 2025"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Event URLs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event URL</label>
          <input
            type="text"
            placeholder="https://youreventsite.com/event-name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short URL</label>
          <input
            type="text"
            placeholder="https://short.link/abc"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Concept */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Info)</label>
        <input
          type="text"
          placeholder="e.g. Short event concept..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Rich Text Areas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <div className="border border-gray-300 rounded-lg">
          <textarea
            rows="5"
            placeholder="Add rich description..."
            className="w-full px-4 py-3 text-gray-600 placeholder-gray-400 bg-white focus:outline-none resize-none rounded-lg"
          ></textarea>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Why to attend event?</label>
        <div className="border border-gray-300 rounded-lg">
          <textarea
            rows="5"
            placeholder="Mention benefits or purpose..."
            className="w-full px-4 py-3 text-gray-600 placeholder-gray-400 bg-white focus:outline-none resize-none rounded-lg"
          ></textarea>
        </div>
      </div>

      {/* Offline Payment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Offline Payment Instructions</label>
        <textarea
          rows="2"
          placeholder="Add instructions..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none"
        ></textarea>
      </div>

      {/* Currency */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Event Specific Currency (Optional)</label>
        <input
          type="text"
          placeholder="e.g. USD / INR"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Checkboxes */}
      <div className="flex flex-col gap-3">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
          <span className="text-sm text-gray-700">Event Sold Out</span>
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
          <span className="text-sm text-gray-700">Enable Rating & Review</span>
        </label>
      </div>

      {/* NEXT Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextTab}
          className="bg-[#ff2459] hover:bg-[#e91e63] text-white px-6 py-2 rounded-lg"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Details;




// ************************************************
// Components/DashboardCreateEvent/Details.jsx

// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const Details = ({ nextTab }) => {
//   const [description, setDescription] = useState("");
//   const [whyAttend, setWhyAttend] = useState("");
//   const [soldOut, setSoldOut] = useState(false);
//   const [ratingEnabled, setRatingEnabled] = useState(false);

//   return (
//     <form className="space-y-6">
//       {/* Category */}
//       <div>
//         <label className="block font-medium text-sm text-gray-700 mb-1">Select Category</label>
//         <select className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:outline-none">
//           <option value="">-- Category --</option>
//           <option value="concert">Concert</option>
//           <option value="workshop">Workshop</option>
//         </select>
//       </div>

//       {/* Event Type & Name */}
//       <div className="grid md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
//           <input
//             type="text"
//             placeholder="Paid / Free"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
//           <input
//             type="text"
//             placeholder="e.g. Music Fest 2025"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400"
//           />
//         </div>
//       </div>

//       {/* URLs */}
//       <div className="grid md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Event URL</label>
//           <input
//             type="text"
//             placeholder="https://yourevent.com/"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Short URL</label>
//           <input
//             type="text"
//             placeholder="https://short.link/xyz"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400"
//           />
//         </div>
//       </div>

//       {/* Excerpt */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Info)</label>
//         <input
//           type="text"
//           placeholder="Short overview..."
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 placeholder-gray-400"
//         />
//       </div>

//       {/* Rich Text Editors */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//         <ReactQuill
//           theme="snow"
//           value={description}
//           onChange={setDescription}
//           className="bg-white rounded-lg text-gray-600"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Why to attend event?</label>
//         <ReactQuill
//           theme="snow"
//           value={whyAttend}
//           onChange={setWhyAttend}
//           className="bg-white rounded-lg text-gray-600"
//         />
//       </div>

//       {/* Offline Payment */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Offline Payment Instructions</label>
//         <textarea
//           rows="3"
//           placeholder="Add instructions..."
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600"
//         ></textarea>
//       </div>

//       {/* Currency */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Event Specific Currency (Optional)</label>
//         <input
//           type="text"
//           placeholder="e.g. USD"
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600"
//         />
//       </div>

//       {/* Toggle Switches */}
//       <div className="space-y-4 pt-2">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-semibold text-gray-800">Event Sold Out</p>
//             <p className="text-xs text-gray-500">Disable bookings and mark as sold out.</p>
//           </div>
//           <label className="inline-flex relative items-center cursor-pointer">
//             <input
//               type="checkbox"
//               className="sr-only peer"
//               checked={soldOut}
//               onChange={() => setSoldOut(!soldOut)}
//             />
//             <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
//           </label>
//         </div>

//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-semibold text-gray-800">Rating & Review</p>
//             <p className="text-xs text-gray-500">
//               Only customers who purchased tickets can leave a review.
//             </p>
//           </div>
//           <label className="inline-flex relative items-center cursor-pointer">
//             <input
//               type="checkbox"
//               className="sr-only peer"
//               checked={ratingEnabled}
//               onChange={() => setRatingEnabled(!ratingEnabled)}
//             />
//             <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
//           </label>
//         </div>
//       </div>

//       {/* Next Button */}
//       <div className="flex justify-end pt-4">
//         <button
//           type="button"
//           onClick={nextTab}
//           className="bg-[#ff2459] hover:bg-[#e91e63] text-white px-6 py-2 rounded-lg"
//         >
//           Next
//         </button>
//       </div>
//     </form>
//   );
// };

// export default Details;
