// import React, { useState } from 'react'

// function Details() {
//   const[details,setDetails]=useState({
//     category:""
//   })
//   return (
//     <div>
//      <div className='flex flex-col '>
//      <label htmlFor="Category">Select Category</label>
//       <select name='category'className='border-2 p-1' value={details.category} >
//         <option value="">--Select Category---</option>
//         <option value="Business">Businesess Conference</option>
//         <option value="Business">Yoga and health</option>
//         <option value="Business">Sport and fitness</option>
//         <option value="Business">Music Concert</option>
//         <option value="Business">Education And class</option>
//       </select>
//       <label htmlFor="EventName">Event Name</label>
//       <input type="text" className='border-2'  placeholder='Enter Event Name'/>
//       <label htmlFor="Event Url">Event URL</label>
//       <input type="url" name="" id="" placeholder='wwww.xyz.com' className='border-2' />
//       <label htmlFor="Event Url">Short URL</label>
//       <input type="url" name="" id="" placeholder='wwww.xyz.com' className='border-2' />
//       <label htmlFor="Event Url">Expert (Short Info)</label>
//       <input type="text" name="" id="" placeholder='Enter Expert Info' className='border-2' />
//       <label htmlFor="Description">Description</label>
//       <textarea name="" className='border-2 outline-none' id=""></textarea>
//       <label htmlFor="Description">Offline Payment Instruction</label>
//       <textarea name="" className='border-2 outline-none' id=""></textarea>
//       <label htmlFor="currency">Event Specific Currency (optional)</label>
//       <select name="" id="" className='border-2'>
//         <option>--Currency--</option>
//         <option value="USD">USD</option>
//         <option value="Rupees">Rupees</option>
//         <option value="Dinar">Dinar</option>
//       </select>

//      </div>
//     </div>
//   )
// }

// export default Details

import { Switch } from "@mui/material";
import React, { useState } from "react";
import { MdSimCardDownload } from "react-icons/md";

function Details() {
  const [details, setDetails] = useState({
    category: "",
    eventName: "",
    eventUrl: "",
    shortUrl: "",
    expertInfo: "",
    description: "",
    paymentInstructions: "",
    currency: "",
  });

  const [formData, setFormData] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData([...formData, details]);
    setDetails({
      category: "",
      eventName: "",
      eventUrl: "",
      shortUrl: "",
      expertInfo: "",
      description: "",
      paymentInstructions: "",
      currency: "",
    });
  };
  const [checked, setChecked] = useState(true);

  const handleToggle = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  return (
    // <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <div className="p-6 bg-white shadow-lg rounded-lg m-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-gray-600 font-medium pb-2"
          >
            Select Category
          </label>
          <select
            required
            name="category"
            value={details.category}
            onChange={handleChange}
            className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select Category--</option>
            <option value="Business">Business Conference</option>
            <option value="Yoga">Yoga and Health</option>
            <option value="Sports">Sport and Fitness</option>
            <option value="Music">Music Concert</option>
            <option value="Education">Education and Class</option>
          </select>
        </div>

        {/* Event Name */}
        <div>
          <label
            htmlFor="eventName"
            className="block text-gray-600 font-medium pb-2"
          >
            Event Name
          </label>
          <input
            type="text"
            required
            name="eventName"
            placeholder="Enter Event Name"
            value={details.eventName}
            onChange={handleChange}
            className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Event URL */}
        <div>
          <label
            htmlFor="eventUrl"
            className="block text-gray-600  font-medium pb-2"
          >
            Event URL
          </label>
          <input
            type="url"
            required
            name="eventUrl"
            placeholder="www.xyz.com"
            value={details.eventUrl}
            onChange={handleChange}
            className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Short URL */}
        <div>
          <label
            htmlFor="shortUrl"
            className="block text-gray-600  font-medium pb-2"
          >
            Short URL
          </label>
          <input
            type="url"
            name="shortUrl"
            required
            placeholder="www.shorturl.com"
            value={details.shortUrl}
            onChange={handleChange}
            className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Expert Info */}
        <div>
          <label
            htmlFor="expertInfo"
            className="block text-gray-600  font-medium pb-2"
          >
            Expert (Short Info)
          </label>
          <input
            type="text"
            required
            name="expertInfo"
            placeholder="Enter Expert Info"
            value={details.expertInfo}
            onChange={handleChange}
            className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-gray-600  font-medium pb-2"
          >
            Description
          </label>
          <textarea
            name="description"
            required
            placeholder="Enter Description"
            value={details.description}
            onChange={handleChange}
            className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Payment Instructions */}
        <div>
          <label
            htmlFor="paymentInstructions"
            className="block text-gray-600  font-medium pb-2"
          >
            Offline Payment Instructions
          </label>
          <textarea
            name="paymentInstructions"
            required
            placeholder="Enter Payment Instructions"
            value={details.paymentInstructions}
            onChange={handleChange}
            className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Currency */}
        <div>
          <label
            htmlFor="currency"
            className="block text-gray-600  font-medium pb-2"
          >
            Event Specific Currency (Optional)
          </label>
          <select
            name="currency"
            value={details.currency}
            required
            onChange={handleChange}
            className=" border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select Currency--</option>
            <option value="USD">USD</option>
            <option value="Rupees">Rupees</option>
            <option value="Dinar">Dinar</option>
          </select>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="font-medium text-lg">Event Sold Out</p>
            <p className="text-gray-600">
              Disable Event booking and Show Event as Soldout
            </p>
          </div>
          <Switch
            checked={checked}
            onChange={handleToggle}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 gap-2 text-xl flex  w-[max-content] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          // onClick={handleSubmit}
        >
          <MdSimCardDownload className="relative top-1 " />
          Save
        </button>
      </form>
    </div>
  );
}

export default Details;
