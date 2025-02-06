// import React, { useState } from "react";
// import { MdCancel } from "react-icons/md";

// function CreateProfile() {
//   const [category, setCategory] = useState("");
//   const [subCategory, setSubCategory] = useState([]);
//   const [listingTitle, setListingTitle] = useState("");
//   const [tagKeyword, setTagKeyword] = useState("");
//   const categoryList = [
//     "Select Category",
//     "Organiser",
//     "Performers",
//     "Services",
//     "Venues",
//   ];

//   let subCategoryList = [];

//   switch (category) {
//     case "Organiser":
//       subCategoryList = ["Event Planner", "Wedding Planner", "Adventure"];
//       break;

//     case "Performers":
//       subCategoryList = [
//         "Band",
//         "Disc Jockey",
//         "Sound Artist",
//         "Stand Up Comedian",
//       ];
//       break;

//     case "Services":
//       subCategoryList = [
//         "Anchor",
//         "Decor",
//         "Entertainer",
//         "Party Supplies",
//         "Photography & Videography",
//         "Promoters",
//         "Dance Studio",
//       ];
//       break;

//     case "Venues":
//       subCategoryList = ["Outdoor", "Indoor"];
//       break;

//     default:
//       subCategoryList = [];
//       break;
//   }

//   // Function to add subcategory (prevents duplicates)
//   const handleSubCategoryChange = (e) => {
//     const selectedValue = e.target.value;

//     if (selectedValue && !subCategory.includes(selectedValue)) {
//       setSubCategory([...subCategory, selectedValue]);
//     }
//   };

//   // Function to remove subcategory
//   const removeSubCategory = (item) => {
//     setSubCategory(subCategory.filter((sub) => sub !== item));
//   };

//   return (
//     <div className="bg-white">
//       <div className="flex">
//         {/* Category Selection */}
//         <div className="flex flex-col gap-1 ">
//           <label htmlFor="category" className="text-gray-600 font-medium">
//             Select Category*
//           </label>
//           <select
//             name="category"
//             value={category}
//             className="border bg-gray-100 w-full p-1 px-3 text-gray-600 "
//             onChange={(e) => {
//               setCategory(e.target.value);
//               setSubCategory([]); // Reset subcategory when category changes
//             }}
//           >
//             {categoryList.map((item, index) => (
//               <option key={index} value={item}>
//                 {item}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Subcategory Selection */}
//         <div className="flex flex-col gap-1 max-w-3xl ">
//           <label htmlFor="subCategory" className="font-medium text-gray-600">
//             Select Subcategory*
//           </label>

//           <div className="border rounded-md p-2 flex flex-col gap-3 max-w-2xl">
//             <select
//               name="subCategory"
//               className="border bg-gray-100 p-1 px-3 text-gray-600 mt-2"
//               onChange={handleSubCategoryChange}
//               disabled={!category || category === "Select Category"}
//             >
//               <option value="">Select Subcategory</option>
//               {subCategoryList.map((item, index) => (
//                 <option key={index} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//             <div className="flex flex-wrap gap-2">
//               {subCategory.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center bg-gray-200 p-2 rounded-lg"
//                 >
//                   {item}
//                   <button
//                     onClick={() => removeSubCategory(item)}
//                     className="ml-2  font-bold"
//                   >
//                     <MdCancel />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col gap-1 max-w-xl ">
//           <label
//             htmlFor="Listing Title"
//             className="text-gray-600 font-medium
//           "
//           >
//             Listing Title*
//           </label>
//           <input
//             type="text"
//             name="listing Title"
//             onChange={(e) => setListingTitle(e.target.value)}
//             placeholder="Listing title"
//             className="border p-1 px-3 bg-gray-100"
//             id=""
//             value={listingTitle}
//           />
//         </div>
//       </div>
//       <div className="flex flex-col gap-1">
//         <label htmlFor="Description" className="text-gray-600 font-medium">
//           Listing Description*
//         </label>
//         <textarea
//           onChange={(e) => setTagKeyword(e.target.value)}
//           className="border p-2 bg-gray-100"
//           placeholder="Enter Description"
//           rows="4"
//           name=""
//           id=""
//         ></textarea>
//       </div>
//     </div>
//   );
// }

// export default CreateProfile;

import React, { useState } from "react";
import { MdCancel } from "react-icons/md";

function CreateProfile() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [listingTitle, setListingTitle] = useState("");
  const [tagKeyword, setTagKeyword] = useState("");
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
  const [website, setWebsite] = useState("");
  const categoryList = [
    "Select Category",
    "Organiser",
    "Performers",
    "Services",
    "Venues",
  ];

  let subCategoryList = [];

  switch (category) {
    case "Organiser":
      subCategoryList = ["Event Planner", "Wedding Planner", "Adventure"];
      break;
    case "Performers":
      subCategoryList = [
        "Band",
        "Disc Jockey",
        "Sound Artist",
        "Stand Up Comedian",
      ];
      break;
    case "Services":
      subCategoryList = [
        "Anchor",
        "Decor",
        "Entertainer",
        "Party Supplies",
        "Photography & Videography",
        "Promoters",
        "Dance Studio",
      ];
      break;
    case "Venues":
      subCategoryList = ["Outdoor", "Indoor"];
      break;
    default:
      subCategoryList = [];
      break;
  }

  const handleSubCategoryChange = (e) => {
    const selectedValue = e.target.value;
    if (!selectedValue) return;

    if (category === "Venues") {
      // Only allow one selection for Venues
      setSubCategory([selectedValue]);
    } else if (!subCategory.includes(selectedValue)) {
      // Allow multiple selections for other categories
      setSubCategory([...subCategory, selectedValue]);
    }
  };

  const removeSubCategory = (item) => {
    setSubCategory(subCategory.filter((sub) => sub !== item));
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <div className="grid grid-cols-3 gap-6">
        {/* Category Selection */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">Select Category*</label>
          <select
            value={category}
            className="border bg-gray-100 w-full p-2 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onChange={(e) => {
              setCategory(e.target.value);
              setSubCategory([]); // Reset subcategory when category changes
            }}
          >
            {categoryList.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Selection */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">
            Select Subcategory*
          </label>
          <div className="border rounded-md p-2 flex flex-col gap-2">
            <select
              className="border bg-gray-100 p-2 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onChange={handleSubCategoryChange}
              disabled={!category || category === "Select Category"}
            >
              <option value="">Select Subcategory</option>
              {subCategoryList.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2">
              {subCategory.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {item}
                  <button
                    onClick={() => removeSubCategory(item)}
                    className="ml-2 text-red-500"
                  >
                    <MdCancel size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Listing Title */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">Listing Title*</label>
          <input
            type="text"
            onChange={(e) => setListingTitle(e.target.value)}
            placeholder="Listing title"
            className="border p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={listingTitle}
          />
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1 mt-4">
        <label className="text-gray-700 font-medium">
          Listing Description*
        </label>
        <textarea
          onChange={(e) => setTagKeyword(e.target.value)}
          className="border p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          placeholder="Enter Description"
          rows="4"
        ></textarea>
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <label className="text-gray-700 font-medium">Tag Keyword*</label>
        <input
          type="text"
          onChange={(e) => setTagKeyword(e.target.value)}
          placeholder="Listing title"
          className="border p-2 w-full bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          value={tagKeyword}
        />
      </div>

      <div className="lex flex-col gap-1 mt-4">
        <h1 className="text-[#ff2459] text-2xl font-semibold">
          Contact Information
        </h1>
        <div className="grid grid-cols-4 gap-6">
          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Phone*</label>
            <input
              type="tel"
              autoComplete
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={phone}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Email*</label>
            <input
              type="email"
              autoComplete
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={email}
            />
            <p className="text-sm text-gray-600">Enter your email address</p>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Time*</label>
            <input
              type="text"
              autoComplete
              onChange={(e) => setTime(e.target.value)}
              className="border p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={time}
            />
            <p className="text-sm text-gray-600">Enter Busniess Hour</p>
            <p className="text-sm text-gray-600">
              For example 10.00 -18.00 week days - Sunday
            </p>
            <p className="text-sm text-gray-600">Closed</p>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Website*</label>
            <input
              type="url"
              autoComplete
              onChange={(e) => setWebsite(e.target.value)}
              className="border p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={website}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProfile;
