import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import { IoTicket } from "react-icons/io5";
import { RiSimCardLine } from "react-icons/ri";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { MdCancel, MdDelete, MdModeEditOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { postTicketData, getTicketFormatsByEventId, updateTicketFormat, deleteTicketFormat, updateEventTicketFormatsAndPublish } from "../../redux/actions/master/Events/createTicket";
import { useParams, useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL;

function CreateTicket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [totalTicketQuantity, setTotalTicketQuantity] = useState(0);
  const [limitPerCustomer, setLimitPerCustomer] = useState(1);
  const [saleStartDate, setSaleStartDate] = useState("");
  const [saleEndDate, setSaleEndDate] = useState("");
  const [salePrice, setSalePrice] = useState(null);
  const [formData, setFormdata] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track the index of the item being edited
  const [loading, setLoading] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null); // Track which item is being deleted
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [isFinishing, setIsFinishing] = useState(false);

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
  const [getTicket, setGetTicket] = useState(false);

  const header = ["Title", "Price", "Qty", "Actions"];
  const isSoldOut = watch("isSoldOut");
  const isDonation = watch("isDonation");
  const today = new Date().toISOString().split("T")[0];

  const startDate = watch("saleStartDate");
  const endDate = watch("saleEndDate");

  // Fetch existing ticket formats when component mounts
  useEffect(() => {
    if (eventId) {
      fetchTicketFormats();
    }
  }, [eventId]);

  const fetchTicketFormats = async () => {
    try {
      setLoading(true);
      const response = await dispatch(getTicketFormatsByEventId(eventId));
      if (response && response.ticketFormats) {
        setFormdata(response.ticketFormats);
      }
    } catch (error) {
      console.error("Error fetching ticket formats:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const {
      title,
      price,
      description,
      totalTicketQuantity,
      limitPerCustomer,
      saleStartDate,
      saleEndDate,
      salePrice,
      isDonation,
      isSoldOut,
    } = data;

    if (!title || !description || price <= 0 || totalTicketQuantity <= 0) {
      toast.error("Please fill all required fields before submitting.");
      return;
    }

    const ticketData = {
      event: eventId,
      title,
      price: Number(price),
      description,
      totalTicketQuantity: Number(totalTicketQuantity),
      limitPerCustomer: Number(limitPerCustomer),
      saleStartDate: saleStartDate ? new Date(saleStartDate).toISOString() : null,
      saleEndDate: saleEndDate ? new Date(saleEndDate).toISOString() : null,
      salePrice: salePrice ? Number(salePrice) : null,
      isDonation: isDonation || false,
      soldOut: isSoldOut || false,
      promoCodes: [],
      seatingPoints: [],
      bookedSeats: [],
      noOfBookedSeats: 0,
    };

    try {
      let response;

      if (editIndex !== null) {
        // Update existing ticket format
        const ticketToUpdate = formData[editIndex];
        response = await dispatch(updateTicketFormat(ticketToUpdate._id, ticketData));
      } else {
        // Create new ticket format
        response = await dispatch(postTicketData(ticketData));
      }

      // If we reach here, the API call was successful
      // Refresh the ticket formats list to get the updated data
      await fetchTicketFormats();

      setGetTicket(false);
      setEditIndex(null); // Reset edit state
      reset();
    } catch (error) {
      console.error("Error saving ticket:", error);
      // Error toast is already handled in the Redux action
    }
  };

  useEffect(() => {
  }, [eventId]);

  useEffect(() => {
    document.body.style.overflow = getTicket ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [getTicket]);


  // const onSubmit = (data) => {
  //   if (editIndex !== null) {
  //     // If editing, update the existing item
  //     setFormdata((prevFormData) => {
  //       const updatedData = [...prevFormData];
  //       updatedData[editIndex] = data;
  //       return updatedData;
  //     });
  //     setEditIndex(null); // Reset edit state
  //   } else {
  //     // If adding a new item
  //     setFormdata((prevFormData) => [...prevFormData, data]);
  //   }

  //   setGetTicket(false);
  //   reset();
  // };

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
    const ticket = formData[index];

    if (!ticket || !ticket._id) {
      toast.error("Invalid ticket format to delete");
      return;
    }

    // Set the ticket to delete and show dialog
    setTicketToDelete({ ...ticket, index });
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!ticketToDelete) return;

    try {
      // Set loading state for this specific item
      setDeletingIndex(ticketToDelete.index);

      // Call the delete API
      await dispatch(deleteTicketFormat(ticketToDelete._id));

      // Refresh the ticket formats list to get the updated data
      await fetchTicketFormats();

      // Close dialog and reset state
      setShowDeleteDialog(false);
      setTicketToDelete(null);

    } catch (error) {
      console.error("Error deleting ticket format:", error);
      // Error toast is already handled in the Redux action
    } finally {
      // Clear loading state
      setDeletingIndex(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setTicketToDelete(null);
  };

  const handleFinish = async () => {
    if (formData.length === 0) {
      toast.error("Please create at least one ticket format before finishing.");
      return;
    }

    try {
      setIsFinishing(true);

      // Extract ticket format IDs from the formData
      const ticketFormatIds = formData.map(ticket => ticket._id);

      // Call the API to update event ticket formats and publish
      await dispatch(updateEventTicketFormatsAndPublish(eventId, ticketFormatIds, true));

      // Success toast is already handled in the Redux action
      // Navigate to home page after successful event creation
      navigate('/');

    } catch (error) {
      console.error("Error finishing event:", error);
      // Error toast is already handled in the Redux action
    } finally {
      setIsFinishing(false);
    }
  };

  const handleEdit = (index) => {
    const item = formData[index];

    // Populate form fields with existing data
    setValue("title", item.title);
    setValue("price", item.price);
    setValue("description", item.description);
    setValue("totalTicketQuantity", item.totalTicketQuantity);
    setValue("limitPerCustomer", item.limitPerCustomer);
    setValue("saleStartDate", item.saleStartDate ? new Date(item.saleStartDate).toISOString().split('T')[0] : "");
    setValue("saleEndDate", item.saleEndDate ? new Date(item.saleEndDate).toISOString().split('T')[0] : "");
    setValue("salePrice", item.salePrice);
    setValue("isDonation", item.isDonation || false);
    setValue("isSoldOut", item.soldOut || false);

    setEditIndex(index);
    setGetTicket(true);
  };

  return (
    <div className="p-6 lg:p-10 md:pt-10 pt-28 overflow-auto min-h-screen">
      <button
        onClick={() => {
          setEditIndex(null); // Reset edit state
          reset(); // Reset form
          setGetTicket(!getTicket);
        }}
        className=" flex items-center gap-2 p-2 px-4 rounded-md  text-white font-medium bg-[#ff2459] hover:bg-[#e0204f] transition duration-300"
      >
        {" "}
        <IoTicket className="text-lg" />
        Create Ticket
      </button>

      <div className="pt-5 flex lg:w-full md:w-full  w-[500px] flex-col  overflow-x-auto  ">
        <header className="grid grid-cols-4 bg-gray-200 p-3 font-semibold text-gray-700 border-b">
          {header.map((item, index) => {
            return (
              <div key={index} className="font-bold p-1 text-center ">
                {item}
              </div>
            );
          })}
        </header>
        <section className=" p-2">
          {loading ? (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff2459]"></div>
              <p className="mt-2 text-gray-600">Loading ticket formats...</p>
            </div>
          ) : formData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <IoTicket className="mx-auto text-4xl mb-2 text-gray-300" />
              <p>No ticket formats found for this event.</p>
              <p className="text-sm">Create your first ticket format to get started.</p>
            </div>
          ) : (
            formData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-4 items-center gap-2 lg:text-base text-sm border-b-2 py-3 "
                >
                  <div className="text-center">{item.title}</div>
                  <div className="text-center">{item.price}</div>
                  <div className="text-center">{item.totalTicketQuantity}</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {/* <div className="rounded-md px-3 py-1 bg-green-200 text-green-700 text-sm font-medium">
                      Seating chart
                    </div> */}
                    <div
                      onClick={() => handleEdit(index)}
                      className="flex gap-1 rounded p-1 bg-orange-300 px-3 whitespace-nowrap cursor-pointer"
                    >
                      <MdModeEditOutline className="relative top-1" />
                      Edit{" "}
                    </div>
                    <div
                      onClick={() => handleDelete(index)}
                      className={`flex gap-1 rounded p-1 px-3 whitespace-nowrap cursor-pointer ${deletingIndex === index ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-400 hover:bg-red-500'
                        }`}
                      style={{ pointerEvents: deletingIndex === index ? 'none' : 'auto' }}
                    >
                      {deletingIndex === index ? (
                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <MdDelete className="relative top-1" />
                      )}
                      {deletingIndex === index ? 'Deleting...' : 'Delete'}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <hr />
        </section>
      </div>

      {/* Summary Section */}
      {/* {formData.length > 0 && (
        <div className="mt-6 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Ticket Formats:</span>
              <span className="font-semibold text-gray-900">{formData.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Tickets Available:</span>
              <span className="font-semibold text-gray-900">
                {formData.reduce((total, ticket) => total + (ticket.totalTicketQuantity || 0), 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price Range:</span>
              <span className="font-semibold text-gray-900">
                ₹{Math.min(...formData.map(t => t.price || 0))} - ₹{Math.max(...formData.map(t => t.price || 0))}
              </span>
            </div>
          </div>
        </div>
      )} */}

      {/* Finish Button */}
      {formData.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleFinish}
            disabled={isFinishing}
            className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 flex items-center gap-2 ${isFinishing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#ff2459] hover:bg-[#e0204f] shadow-lg hover:shadow-xl'
              }`}
          >
            {isFinishing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Finalizing Event...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Finish
              </>
            )}
          </button>
        </div>
      )}

      {getTicket && (
        <div className="w-full">
          <div className="fixed w-full bg-black/50 backdrop-blur-md  inset-0 flex flex-col items-center  overflow-y-scroll  z-40 ">
            <div className="bg-white p-6 rounded-lg   shadow-lg  lg:w-[full]">
              <div className="flex lg:justify-between gap-48 md:gap-[550px] lg:gap-0 relative lg:right-0 right-0 mb-3 ">
                <h1 className="text-2xl font-semibold">
                  {editIndex !== null ? "Edit Ticket" : "Create Ticket"}
                </h1>
                <button
                  className="bg-[#ff2459] relative lg:left-0 left-10 w-[max-content] p-1 px-2 text-white"
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
                  {/* <div className="relative w-full flex flex-col gap-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Sale Start Date
                    </label>
                    <div className="relative">
                      <input
                      min={today}
                        type="date"
                        className="block focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 w-full border rounded-md p-2 pl-4 pr-10 text-gray-700"
                        // {...register("saleStartDate", {
                        //   required: "Start Date is required",
                        // })}
                      />
                    </div> */}

                  {/* {errors.saleStartDate && (
                      <p className="text-red-600 text-sm px-2">
                        {errors.saleStartDate.message}*
                      </p>
                    )} */}
                  {/* </div> */}
                  <div className="relative w-full flex flex-col gap-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Sale Start Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]} // Min date as today
                        {...register("saleStartDate", {
                          // required: "Start Date is required",
                        })}
                        className="block focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 w-full border rounded-md p-2 pl-4 pr-10 text-gray-700"
                      />
                      {startDate && (
                        <button
                          type="button"
                          onClick={() => setValue("saleStartDate", "")} // Clears the input
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
                        >
                          <MdCancel />
                        </button>
                      )}
                    </div>
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
                          // required: "End Date is required",
                          validate: (value) =>
                            !startDate ||
                            value >= startDate ||
                            "End Date must be after Start Date",
                        })}
                      />
                      {endDate && (
                        <button
                          type="button"
                          onClick={() => setValue("saleEndDate", "")} // Clears the input
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
                        >
                          <MdCancel />
                        </button>
                      )}
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
                        // required: "sale price is required",
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
                    className={`w-12 h-6  rounded-full p-1 transition-colors ${isSoldOut ? "bg-[#ff2459]" : "bg-gray-300"
                      }`}
                  >
                    <div
                      className={`h-4 w-4 bg-white  border-black rounded-full shadow transform transition-transform  ${isSoldOut ? "translate-x-6" : ""
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
                    className={`w-16 h-6  rounded-full p-1 transition-colors ${isDonation ? "bg-[#ff2459]" : "bg-gray-300"
                      }`}
                  >
                    <div
                      className={`h-4 w-4 bg-white  border-black rounded-full shadow transform transition-transform  ${isDonation ? "translate-x-6" : ""
                        }`}
                    />
                  </div>
                </div>
                <hr />

                {/*submit button*/}
                <div className="flex justify-end p-1 pt-5">
                  <button
                    type="submit"
                    className="flex gap-1 text-lg font-medium bg-[#ff2459] p-2 text-white  rounded"
                  >
                    <RiSimCardLine className="relative top-1 text-lg" />
                    {editIndex !== null ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <MdDelete className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Delete Ticket Format</h3>
                  <p className="text-sm text-gray-500">This action cannot be undone</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete the ticket format{" "}
                <span className="font-semibold text-gray-900">"{ticketToDelete?.title}"</span>?
              </p>
              <p className="text-sm text-gray-500">
                This will permanently remove the ticket format and all associated data.
              </p>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={cancelDelete}
                disabled={deletingIndex !== null}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deletingIndex !== null}
                className="flex-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
              >
                {deletingIndex !== null ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <MdDelete className="text-sm" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateTicket;
