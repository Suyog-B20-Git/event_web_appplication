import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import { IoTicket } from "react-icons/io5";
import { RiSimCardLine } from "react-icons/ri";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
function CreateTicket() {
  const [getTicket, setGetTicket] = useState(false);

  const [formData, setFormdata] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track the index of the item being edited
  const {
    handleSubmit,
    watch,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isSoldOut: false,
      isDonation: false,
    },
  });
  const startDate = watch("saleStartDate"); // Watch start date to validate end date

  const onSubmit = (data) => {
    if (editIndex !== null) {
      // If editing, update the existing item
      setFormdata((prevFormData) => {
        const updatedData = [...prevFormData];
        updatedData[editIndex] = data;
        return updatedData;
      });
      setEditIndex(null); // Reset edit state
    } else {
      // If adding a new item
      setFormdata((prevFormData) => [...prevFormData, data]);
    }

    setGetTicket(false);
    reset();
  };
  const PinkSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#ff2459",
      "&:hover": {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: pink[600],
    },
  }));
  const handleDelete = (index) => {
    setFormdata((prevFormData) =>
      prevFormData.filter((item, i) => i !== index)
    );
  };
  const handleEdit = (index) => {
    const item = formData[index];
    Object.keys(item).forEach((key) => setValue(key, item[key])); // Populate form fields
    setEditIndex(index);
    setGetTicket(true);
  };
  const header = ["Title", "Price", "Qty", "Order", "Actions"];
  const isSoldOut = watch("isSoldOut"); // Watch state
  const isDonation = watch("isDonation"); // Watch state
  return (
    <div className="p-10 lg:pt-10 md:pt-10  pt-28 overflow-x-scroll">
      <button
        onClick={() => setGetTicket(!getTicket)}
        className=" flex gap-1 p-2 px-2 rounded  text-white font-medium bg-[#ff2459]"
      >
        {" "}
        <IoTicket className="relative top-1" />
        Create Ticket
      </button>

      <div className="pt-5 flex lg:w-full md:w-full  w-[500px] flex-col  ">
        <header className="grid grid-cols-5 bg-gray-100 p-2">
          {header.map((item, index) => {
            return (
              <div key={index} className="font-bold p-1">
                {item}
              </div>
            );
          })}
        </header>
        <section className=" p-2">
          {formData.map((item, index) => {
            return (
              <div
                key={index}
                className="p-2 grid grid-cols-5 gap-2 lg:text-base text-sm border-b-2 pb-2  "
              >
                <div>{item.title}</div>
                <div>{item.price}</div>
                <div>{item.totalTicketQuantity}</div>
                <div>{item.order}</div>
                <div className="flex gap-3 lg:flex-row flex-col lg:text-base text-sm relative right-3">
                  <div className="rounded p-0.5 lg:px-3 px-1 bg-green-200 whitespace-nowrap">
                    Seating chart
                  </div>
                  <div
                    onClick={() => handleEdit(index)}
                    className="flex gap-1 rounded p-1 bg-orange-300 px-3 whitespace-nowrap"
                  >
                    <MdModeEditOutline className="relative top-1" />
                    Edit{" "}
                  </div>
                  <div
                    onClick={() => handleDelete(index)}
                    className="flex gap-1  rounded p-1 bg-red-400 px-3 whitespace-nowrap"
                  >
                    <MdDelete className="relative top-1" />
                    Delete
                  </div>
                </div>
              </div>
            );
          })}
          <hr />
        </section>
      </div>

      {getTicket && (
        <div className="w-full">
          <div className="fixed w-full bg-white/30 backdrop-blur-md  inset-0 flex flex-col items-center  overflow-y-scroll  z-40 ">
            <div className="bg-white p-2 rounded-lg   shadow-lg  lg:w-[full]">
              <div className="flex lg:justify-between gap-48 md:gap-[550px] lg:gap-0 relative lg:right-0 right-0 mb-3 ">
                <h1 className="text-xl font-semibold">Create Ticket</h1>
                <button
                  className="bg-[#ff2459] relative lg:left-0 left-10 w-[max-content] p-1 px-2  text-white"
                  onClick={() => setGetTicket(!getTicket)}
                >
                  X
                </button>
              </div>
              <hr />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5 p-5 lg:w-[600px]  m-1"
              >
                {/*title*/}
                <div className="flex flex-col gap-1 ">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title*
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 block w-full border rounded-md p-2"
                    placeholder="Title"
                    {...register("title", {
                      required: " title is required",
                    })}
                  />
                  {errors.title && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.title.message}*
                    </p>
                  )}
                </div>
                {/*Price*/}
                <div className="flex flex-col gap-1 ">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price(INR)*
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 block w-full border rounded-md p-2"
                    placeholder="0000"
                    {...register("price", {
                      required: "Price is required",
                      min: {
                        value: 1,
                        message: "Price must be greater than 0",
                      },
                      max: { value: 1000000, message: "Price is too high" },
                      valueAsNumber: true, // Ensures input is treated as a number
                    })}
                  />
                  {errors.price && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.price.message}*
                    </p>
                  )}
                </div>
                {/*Order*/}
                <div className="flex flex-col gap-1 ">
                  <label
                    htmlFor="order"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Order*
                  </label>
                  <input
                    type="number"
                    name="order"
                    className="focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 block w-full border rounded-md p-2"
                    placeholder="0000"
                    {...register("order", {
                      required: "order is required",
                      min: {
                        value: 1,
                        message: "order must be greater than 0",
                      },
                      max: { value: 1000000, message: "order is too high" },
                      valueAsNumber: true, // Ensures input is treated as a number
                    })}
                  />
                  {errors.order && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.order.message}*
                    </p>
                  )}
                </div>
                {/*Ticket Quantity*/}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="ticketQuantity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Total Ticket Quantity*
                  </label>
                  <input
                    type="number"
                    name="totalTicketQuantity"
                    className="focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 block w-full border rounded-md p-2"
                    placeholder="0000"
                    {...register("totalTicketQuantity", {
                      required: "Total Ticket Quantity is required",
                      min: {
                        value: 1,
                        message: "Total Ticket Quantity must be greater than 0",
                      },
                      max: {
                        value: 1000000,
                        message: "Total Ticket Quantity is too high",
                      },
                      valueAsNumber: true, // Ensures input is treated as a number
                    })}
                  />
                  {errors.totalTicketQuantity && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.totalTicketQuantity.message}*
                    </p>
                  )}
                </div>
                {/*Booking per limit*/}
                <div className="flex flex-col gap-1 ">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-700"
                  >
                    Booking Limit Per Customer*
                  </label>
                  <input
                    type="number"
                    name="limitPerCustomer"
                    className="focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 block w-full border rounded-md p-2"
                    placeholder="0000"
                    {...register("limitPerCustomer", {
                      required: "booking limit Per Customer is required",
                      min: {
                        value: 1,
                        message:
                          "booking limit Per Customer must be greater than 0",
                      },
                      max: {
                        value: 1000000,
                        message: "booking limit Per Customer is too high",
                      },
                      valueAsNumber: true, // Ensures input is treated as a number
                    })}
                  />
                  {errors.limitPerCustomer && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.limitPerCustomer.message}*
                    </p>
                  )}
                </div>
                {/*Description*/}
                <div className="flex flex-col gap-1 ">
                  <label
                    htmlFor="description"
                    className="focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 block text-sm font-medium text-gray-700"
                  >
                    Description*
                  </label>
                  <input
                    type="text"
                    name="description"
                    className=" block w-full border rounded-md p-2"
                    placeholder="description"
                    {...register("description", {
                      required: " description is required",
                    })}
                  />
                  {errors.description && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.description.message}*
                    </p>
                  )}
                </div>
                <div className="rounded p-2 bg-[#CFF4FC] text-gray-800 ">
                  Enter Sale Start-End Date & Sale Price only if you want to
                  make this Ticket on sale and to sell this ticket on Discounted
                  price.
                </div>
                {/*sales start date*/}
                <div className="grid lg:grid-cols-3 griid-cols-1 gap-4">
                  {/* Sale Start Date */}
                  <div className="relative w-full flex flex-col gap-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Sale Start Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="block focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 w-full border rounded-md p-2 pl-4 pr-10 text-gray-700"
                        {...register("saleStartDate", {
                          required: "Start Date is required",
                        })}
                      />
                    </div>
                    {errors.saleStartDate && (
                      <p className="text-red-600 text-sm px-2">
                        {errors.saleStartDate.message}*
                      </p>
                    )}
                  </div>

                  {/* Sale End Date */}
                  <div className="relative w-full flex flex-col gap-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Sale End Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 block w-full border rounded-md p-2 pl-4 pr-10 text-gray-700"
                        {...register("saleEndDate", {
                          required: "End Date is required",
                          validate: (value) =>
                            !startDate ||
                            value >= startDate ||
                            "End Date must be after Start Date",
                        })}
                      />
                    </div>
                    {errors.saleEndDate && (
                      <p className="text-red-600 text-sm px-2">
                        {errors.saleEndDate.message}*
                      </p>
                    )}
                  </div>

                  {/*Sales price*/}
                  <div className="flex flex-col gap-1 ">
                    <label
                      htmlFor="Sales Price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Sale Price(INR)*
                    </label>
                    <input
                      type="number"
                      name="salePrice"
                      className="focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 block w-full border rounded-md p-2"
                      placeholder="0000"
                      {...register("salePrice", {
                        required: "sale price is required",
                        min: {
                          value: 1,
                          message: "sale price must be greater than 0",
                        },
                        max: {
                          value: 1000000,
                          message: "sale price Per Customer is too high",
                        },
                        valueAsNumber: true, // Ensures input is treated as a number
                      })}
                    />
                    {errors.salePrice && (
                      <p className="text-red-600 text-sm px-2">
                        {errors.salePrice.message}*
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between p-2">
                  <div>
                    <h1 className="text-lg font-medium">Sold Out</h1>
                    <p className="text-sm">
                      Disable this Ticket Bookings and Show it as Soldout.
                    </p>
                  </div>
                  {/* <FormGroup className="mb-2 lg:ml-3">
                    <FormControlLabel
                      control={
                        <PinkSwitch
                          checked={isSoldOut}
                          size="small"
                          onClick={() => setValue("isSoldOut", !isSoldOut)}
                        />
                      }
                    />
                  </FormGroup> */}
                  
                  <div
                    onClick={() => setValue("isSoldOut", !isSoldOut)}
                    className={`w-12 h-6  rounded-full p-1 transition-colors ${
                      isSoldOut ? "bg-[#ff2459]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 bg-white  border-black rounded-full shadow transform transition-transform  ${
                        isSoldOut ? "translate-x-6" : ""
                      }`}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between p-2">
                  <div>
                    <h1 className="text-lg font-medium">Donation</h1>
                    <p className="text-sm">
                      Make this ticket a Fundraiser/Donation ticket in which,
                      customer can pay as much amount as they want for this
                      ticket.
                    </p>
                  </div>
                  {/*Switch Button*/}
                  <div
                    onClick={() => setValue("isDonation", !isDonation)}
                    className={`w-16 h-6  rounded-full p-1 transition-colors ${
                      isDonation ? "bg-[#ff2459]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 bg-white  border-black rounded-full shadow transform transition-transform  ${
                        isDonation ? "translate-x-6" : ""
                      }`}
                    />
                  </div>
                </div>
                <hr />

                {/*submit button*/}
                <div className="flex justify-end p-1 pt-5">
                  <button
                    type="submit"
                    className="flex gap-1 text-lg font-medium bg-[#ff2459] p-1 text-white  rounded"
                  >
                    <RiSimCardLine className="relative top-1 text-lg" />
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateTicket;

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { IoTicket } from "react-icons/io5";
// import { MdDelete, MdModeEditOutline } from "react-icons/md";

// function CreateTicket() {
//   const [getTicket, setGetTicket] = useState(false);
//   const [formData, setFormData] = useState([]);
//   const [editIndex, setEditIndex] = useState(null); // Track the index of the item being edited

//   const {
//     handleSubmit,
//     watch,
//     register,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       isSoldOut: false,
//       isDonation: false,
//     },
//   });

//   const onSubmit = (data) => {
//     if (editIndex !== null) {
//       // If editing, update the existing item
//       const updatedData = [...formData];
//       updatedData[editIndex] = data;
//       setFormData(updatedData);
//       setEditIndex(null); // Reset edit state
//     } else {
//       // If adding a new item
//       setFormData([...formData, data]);
//     }
//     setGetTicket(false);
//     reset();
//   };

//   const handleDelete = (index) => {
//     setFormData((prevFormData) => prevFormData.filter((_, i) => i !== index));
//   };

//   const handleEdit = (index) => {
//     const item = formData[index];
//     Object.keys(item).forEach((key) => setValue(key, item[key])); // Populate form fields
//     setEditIndex(index);
//     setGetTicket(true);
//   };

//   const header = ["Title", "Price", "Qty", "Order", "Actions"];

//   return (
//     <div className="p-10 lg:pt-10 pt-28">
//       <button
//         onClick={() => {
//           setGetTicket(true);
//           setEditIndex(null); // Reset edit state for new entry
//           reset(); // Clear form fields
//         }}
//         className="flex gap-1 p-2 px-2 rounded text-white font-medium bg-[#ff2459]"
//       >
//         <IoTicket className="relative top-1" />
//         Create Ticket
//       </button>

//       <div className="pt-5 flex lg:flex-col flex-row">
//         <header className="grid lg:grid-cols-5 bg-gray-100 p-2">
//           {header.map((item, index) => (
//             <div key={index} className="font-bold p-1">
//               {item}
//             </div>
//           ))}
//         </header>
//         <section className="p-2">
//           {formData.map((item, index) => (
//             <div key={index} className="p-1 grid lg:grid-cols-5 gap-2">
//               <div>{item.title}</div>
//               <div>{item.price}</div>
//               <div>{item.totalTicketQuantity}</div>
//               <div>{item.order}</div>
//               <div className="flex gap-3">
//                 <div
//                   className="flex gap-1 rounded p-1 bg-orange-300 px-3 whitespace-nowrap cursor-pointer"
//                   onClick={() => handleEdit(index)}
//                 >
//                   <MdModeEditOutline className="relative top-1" />
//                   Edit
//                 </div>
//                 <div
//                   onClick={() => handleDelete(index)}
//                   className="flex gap-1 rounded p-1 bg-red-400 px-3 whitespace-nowrap cursor-pointer"
//                 >
//                   <MdDelete className="relative top-1" />
//                   Delete
//                 </div>
//               </div>
//             </div>
//           ))}
//         </section>
//       </div>

//       {getTicket && (
//         <div className="fixed w-full bg-white/30 backdrop-blur-md inset-0 flex flex-col items-center overflow-y-scroll z-40">
//           <div className="bg-white p-2 rounded-lg shadow-lg lg:w-[full]">
//             <div className="flex justify-between relative lg:right-0 right-16 mb-3">
//               <h1 className="text-xl font-semibold">
//                 {editIndex !== null ? "Edit Ticket" : "Create Ticket"}
//               </h1>
//               <button
//                 className="bg-[#ff2459] relative lg:left-0 left-10 w-[max-content] p-1 px-2 text-white"
//                 onClick={() => setGetTicket(false)}
//               >
//                 X
//               </button>
//             </div>
//             <hr />
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="flex flex-col gap-5 p-5 w-[600px]"
//             >
//               <div className="flex flex-col gap-1">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Title*
//                 </label>
//                 <input
//                   type="text"
//                   className="focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 block w-full border rounded-md p-2"
//                   placeholder="Title"
//                   {...register("title", { required: "Title is required" })}
//                 />
//                 {errors.title && (
//                   <p className="text-red-600 text-sm px-2">{errors.title.message}*</p>
//                 )}
//               </div>

//               <div className="flex flex-col gap-1">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Price(INR)*
//                 </label>
//                 <input
//                   type="number"
//                   className="focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 block w-full border rounded-md p-2"
//                   placeholder="0000"
//                   {...register("price", {
//                     required: "Price is required",
//                     min: { value: 1, message: "Price must be greater than 0" },
//                     valueAsNumber: true,
//                   })}
//                 />
//                 {errors.price && (
//                   <p className="text-red-600 text-sm px-2">{errors.price.message}*</p>
//                 )}
//               </div>

//               <div className="flex flex-col gap-1">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Total Ticket Quantity*
//                 </label>
//                 <input
//                   type="number"
//                   className="focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 block w-full border rounded-md p-2"
//                   placeholder="0000"
//                   {...register("totalTicketQuantity", {
//                     required: "Total Ticket Quantity is required",
//                     min: { value: 1, message: "Must be greater than 0" },
//                     valueAsNumber: true,
//                   })}
//                 />
//                 {errors.totalTicketQuantity && (
//                   <p className="text-red-600 text-sm px-2">{errors.totalTicketQuantity.message}*</p>
//                 )}
//               </div>

//               <div className="flex flex-col gap-1">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Order*
//                 </label>
//                 <input
//                   type="number"
//                   className="focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 block w-full border rounded-md p-2"
//                   placeholder="0000"
//                   {...register("order", {
//                     required: "Order is required",
//                     min: { value: 1, message: "Must be greater than 0" },
//                     valueAsNumber: true,
//                   })}
//                 />
//                 {errors.order && (
//                   <p className="text-red-600 text-sm px-2">{errors.order.message}*</p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 className="bg-[#ff2459] text-white p-2 rounded-md"
//               >
//                 {editIndex !== null ? "Update Ticket" : "Create Ticket"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CreateTicket;
