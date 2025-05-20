import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";

import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { GiPartyPopper } from "react-icons/gi";
import { FcViewDetails } from "react-icons/fc";
import { MdAccountCircle, MdCancel } from "react-icons/md";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import { getVenue } from "../../redux/actions/master/Events/GetVenue";
import { getPerformers } from "../../redux/actions/master/Events/GetPerformer";
import Photo1 from "./Photo1";
import { useForm, Controller } from "react-hook-form";
import { Checkbox, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createNewEvent } from "../../redux/actions/master/Events/CreateEvent";
import { postTicketData } from "../../redux/actions/master/Events/updateTicket";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_API_URL;
import axios from "axios";

export default function EventForm() {
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef(null);
  const thumbnailRef = useRef(null);
  const posterInputRef = useRef(null);
  const seatingChartRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [inputKey, setInputKey] = useState(Date.now()); // Unique key for re-render

  const [query, setQuery] = useState("");
  const [performer, setPerformer] = useState("");
  const dispatch = useDispatch();
  const [youtubeLinks, setYoutubeLinks] = useState([""]); 
  const [performerFacebookLinks, setPerformerFacebookLinks] = useState([""]); 
  const [showTicketForm, setShowTicketForm] = useState(false); 

 const selectedRadio = localStorage.getItem("selectedRadio");
 const [title, setTitle] = useState("");
 const [price, setPrice] = useState("");
 const [order, setOrder] = useState("");
 const [totalTicketQuantity, setTotalTicketQuantity] = useState("");
 const [limitPerCustomer, setLimitPerCustomer] = useState("");
 const [description, setDescription] = useState("");
 const [promoCodes, setPromoCodes] = useState("");
 const [bookedSeats, setBookedSeats] = useState("");
 const [saleStartDate, setSaleStartDate] = useState("");
 const [saleEndDate, setSaleEndDate] = useState("");
 const [salePrice, setSalePrice] = useState("");
 const [isDonation, setIsDonation] = useState(false);
 const [isSoldOut, setIsSoldOut] = useState(false);
 const [isSale, setIsSale] = useState(false);
 



  // Fetch API data whenever `query` updates
  useEffect(() => {
    if (query) {
      dispatch(getVenue(query.toLowerCase())); // Dispatch Redux action to fetch data
    }
    if (performer) {
      dispatch(getPerformers(performer.toLowerCase()));
    }
  }, [dispatch, query, performer]);

  const store = useSelector((state) => state.venuesReducer) || { venues: [] };
  const data = store?.venues || []; // Ensure data is always an array
  const options = data.map((venue) => ({
    value: venue._id,
    label: venue.name,
  })); // Convert API response to Select format

  const store1 = useSelector((state) => state.performersReducer) || {
    performers: [],
  };
  const data1 = store1?.performers || []; // Ensure data is always an array
  const performerOptions = data1.map((performer) => ({
    value: performer._id,
    label: performer.name,
  })); // Convert API response to Select format

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...youtubeLinks];
    updatedLinks[index] = value;
    setYoutubeLinks(updatedLinks);
    setValue("youtubeLinks", updatedLinks); // Update React Hook Form state
  };
  
  const handleAddLink = () => {
    setYoutubeLinks([...youtubeLinks, ""]); // Add an empty input field
  };
  
  const handleRemoveLink = (index) => {
    const updatedLinks = youtubeLinks.filter((_, i) => i !== index);
    setYoutubeLinks(updatedLinks);
    setValue("youtubeLinks", updatedLinks); // Update form state
  };

  const handleAddPerformerLink = () => {
    setPerformerFacebookLinks([...performerFacebookLinks, ""]); // Add new input
  };
  
  const handleRemovePerformerLink = (index) => {
    const updatedLinks = performerFacebookLinks.filter((_, i) => i !== index);
    setPerformerFacebookLinks(updatedLinks);
    setValue("performerFacebookLinks", updatedLinks); // Update form state
  };
  
  const handlePerformerLinkChange = (index, value) => {
    const updatedLinks = [...performerFacebookLinks];
    updatedLinks[index] = value;
    setPerformerFacebookLinks(updatedLinks);
    setValue("performerFacebookLinks", updatedLinks); // Update form state
  };
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    setError,
    clearErrors,

    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      category: "",
      eventUrl: "",
      shortUrl: "",
      startDate: "",
      endDate: "",
      disableEventAfterSoldOut: false, // Default value
      isRepetitive: false,
      isPublish: false,
      enableRatingReview: false,
      isSeasonal: false,
      isOnline: false,
      seo: {
        metaTitle: "",
        metaTags: "",
        metaDescription: "",
      },

      eventTag: [],
      repeatExcept: [],

      media: {
        thumbnailImage: null,
        posterImage: null,
        seatingChartImage: null,
        images: [],
        youtubeLinks: [""], 
      }, // Default media object
    },
  });

  const [eventTags, setEventTags] = useState([]); // Local state to manage tags
  const eventTag = watch("eventTag") || []; // ✅ Prevents `undefined` error

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();

      const updatedTags = [...eventTags, tagInput.trim()];
      setEventTags(updatedTags);
      setValue("eventTag", updatedTags); // ✅ Updates React Hook Form state
      clearErrors("eventTag"); // ✅ Clears validation errors (if any)
      setTagInput(""); // ✅ Reset input field
    }
  };

  const removeTag = (index) => {
    const updatedTags = eventTags.filter((_, i) => i !== index);
    setEventTags(updatedTags);
    setValue("eventTag", updatedTags); // ✅ Updates form state
  };

  const [ticketFormat, setTicketFormat] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("eventData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (parsedData.eventType == "Public") {
        setValue("isPublish", true);
        // return;
      } else {
        setValue("isPublish", false);
      }
      if (parsedData.selectedRadio == "Tickets") {
        setValue("isOnline", true);
        setTicketFormat(true);
      } else {
        setValue("isOnline", false);
      }

      // ✅ Ensure `category` is always set
      if (parsedData.selectedEvent) {
        setValue("category", parsedData.selectedEvent);
      }
    }
  }, [setValue]);

  // image input
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [posterImage, setPosterImage] = useState(null);
  const [seatingChartImage, setSeatingChartImage] = useState(null);
  const [thumnPreview, setThumnPreview] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [seatingChartPreview, setSeatingChartPreview] = useState(null);
  

  const handleImagesChange1 = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setSelectedImages((prev) => [...prev, ...newImages]);
    }
  };
  
  const removeImage1 = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  
    // If no images remain, reset the input field
    if (updatedImages.length === 0) {
      setInputKey(Date.now()); // Forces re-render of input field
    }
  };
  
  const [repeatExceptList, setRepeatExceptList] = useState([]);
  const handleAddRepeatExcept = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();

      const newValue = Number(e.target.value.trim());
      if (!repeatExceptList.includes(newValue)) {
        const updatedList = [...repeatExceptList, newValue];
        setRepeatExceptList(updatedList);
        setValue("repeatExcept", updatedList); // ✅ Update form state
      }
      e.target.value = ""; // Clear input after adding
    }
  };

  // Remove value from array
  const handleRemoveRepeatExcept = (index) => {
    const updatedList = repeatExceptList.filter((_, i) => i !== index);
    setRepeatExceptList(updatedList);
    setValue("repeatExcept", updatedList); // ✅ Update form state
  };

  // Watching values

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const startTime = watch("startTime");
  const endTime = watch("endTime");
  const repeatEndTime = watch("repeatEndTime");
  const repeatStartTime = watch("repeatStartTime");
  const disableEventAfterSoldOut = watch("disableEventAfterSoldOut"); // Watch state
  const isRepetitive = watch("isRepetitive"); // Watch state
  const isPublish = watch("isPublish"); // Watch state
  const isOnline = watch("isOnline"); // Watch state
  const isSeasonal = watch("isSeasonal"); // Watch state
  const media = watch("media"); // Watching media state
  const enableRatingReview = watch("enableRatingReview"); // Watching media state
  const repetitiveType = watch("repetitiveType");
 


  useEffect(() => {
    if (watch("venue") || watch("facebookLink")) {
      clearErrors(["venue", "facebookLink"]);
    }
  }, [watch("venue"), watch("facebookLink"), clearErrors]);
  
  useEffect(() => {
    if ((!watch("performers") || watch("performers").length === 0) &&
        (!watch("performerFacebookLinks") || watch("performerFacebookLinks"))) {
      setError("performers", { type: "manual", message: "Either Performers or Performers Facebook Link is required." });
      setError("performerFacebookLinks", { type: "manual", message: "Either Performers or Performers Facebook Link is required." });
    } else {
      clearErrors("performers");
      clearErrors("performerFacebookLinks");
    }
  }, [watch("performers"), watch("performerFacebookLinks"), setError, clearErrors]);
  
 
  const onSubmit = (data) => { 
    const formData = new FormData();    
    const category = data.selectedEvent || data.category;
    data.category = category;
    formData.append("name", data.name);
    formData.append("category", category);
    formData.append("eventUrl", data.eventUrl);
    formData.append("shortUrl", data.shortUrl);
    formData.append("excerpt", data.excerpt);
    formData.append("disableEventAfterSoldOut", data.disableEventAfterSoldOut);
    formData.append("enableRatingReview", data.enableRatingReview);
    formData.append("isRepetitive", data.isRepetitive);
    formData.append("repetitiveType", data.repetitiveType);
    formData.append("isPublish", data.isPublish);
    formData.append("isSeasonal", data.isSeasonal);
    formData.append("isOnline", data.isOnline);
    formData.append("venue", data.venue || ""); 
    formData.append("facebookLink", data.facebookLink || "");
    formData.append("repeatExcept", data.repeatExcept);
    formData.append("performers", data.performers || []);
    formData.append("performerFacebookLinks", JSON.stringify(data.performerFacebookLinks));
    formData.append("repeatStartTime", data.repeatStartTime ? data.repeatStartTime : "");
    formData.append("repeatEndTime", data.repeatEndTime);
    formData.append("facebookLink", data.facebookLink);
    formData.append("youtubeLink", data.youtubeLink);
    formData.append("startDate", `${data.startDate}T${data.startTime}`);
    formData.append("endDate", `${data.endDate}T${data.endTime}`);
    formData.append("description", data.description);
    formData.append("offlinePaymentInstructions",data.offlinePaymentInstructions );
    formData.append("eventTags", data.eventTag);
    formData.append("seo", JSON.stringify(data.seo));

    if (data.media?.thumbnailImage) {
      formData.append("thumbnailImage", data.media.thumbnailImage);
    }
    if (data.media?.posterImage) {
      formData.append("posterImage", data.media.posterImage);
    }
    if (data.media?.seatingChartImage) {
      formData.append("seatingChartImage", data.media.seatingChartImage);
    }
    if (data.media?.images?.length > 0) {
      data.media.images.forEach((image) => {
        formData.append("images", image.file); 
      });
    }   

    const isLogin = JSON.parse(localStorage.getItem("isLogin"));
    const authToken = localStorage.getItem("authToken");

    if(!isLogin || !authToken){
      localStorage.setItem("eventData", JSON.stringify({...data}));
      toast.error("Please log in to create an event.");
      localStorage.setItem("redirectAfterLogin", "/submit-event");
      navigate("/login?redirectTo=/submit-event");
      return;
    }
    try{
      dispatch(
        createNewEvent(data, thumbnailImage, posterImage, seatingChartImage)
      );
      reset();
      setThumnPreview(null);
      setPosterPreview(null);
      setSeatingChartPreview(null);
      localStorage.removeItem("eventData");
      navigate("/home");  
    }
      catch (error) {
        const errorMessage =
          error?.response?.message ||
          error?.message ||
          "Something went wrong!";
        toast.error(errorMessage);
      }
  };

  useEffect(() => {
    const savedData = localStorage.getItem("eventData");
    if (savedData) {
      reset(JSON.parse(savedData));
      localStorage.removeItem("eventData");
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  const handleNextClick = handleSubmit(async (data) => {
    const category = data.selectedEvent || data.category;
    data.category = category;

    localStorage.setItem("eventFormData", JSON.stringify(data));
  
    const isLogin = JSON.parse(localStorage.getItem("isLogin"));
    const token = localStorage.getItem("authToken");
  
    if (!isLogin || !token) {
      localStorage.setItem("eventData", JSON.stringify({ ...data }));
      toast.error("Please login to continue");
      localStorage.setItem("redirectAfterLogin", "/submit-event");
      navigate("/login?redirectTo=/submit-event");
      return;
    }
  
    try {
      const response = await dispatch(
        createNewEvent(data, thumbnailImage, posterImage, seatingChartImage)
      );
      const eventId4 = response?.event._id;
      localStorage.setItem("createdEventId", eventId4);
      setShowTicketForm(true);
    } catch (error) {
      toast.error("Failed to create event.");
      console.error(error);
    }
  });  
  
  const handleCreateTicket = async (e) => {
    e.preventDefault();
  
    const event = localStorage.getItem("createdEventId");  
    if (!event) {
      toast.error("Event ID not found. Please create the event first.");
      return;
    }
  
    const promoCodeArray = promoCodes
  .split(',')
  .map(code => code.trim())
  .filter(Boolean);

  const bookedSeatArray = bookedSeats
  .split(',')
  .map(seat => parseInt(seat.trim(), 10))
  .filter(n => !isNaN(n));

    const ticketData = {
      event,
      title,
      price: Number(price),
      totalTicketQuantity: Number(totalTicketQuantity),
      limitPerCustomer: Number(limitPerCustomer),
      description,
      promoCodes: promoCodeArray,
      isSale: isSale,
      salePrice: Number(salePrice),
      saleStartDate: new Date(saleStartDate).toISOString(),
      saleEndDate: new Date(saleEndDate).toISOString(),
      soldOut: isSoldOut,
      seatingPoints: [], 
      bookedSeats: bookedSeatArray, 
      noOfBookedSeats: bookedSeatArray.length,
    };
  
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(`${baseUrl}/api/ticketFormat`, ticketData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      toast.success("Ticket created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create ticket.");
      console.error("Ticket creation failed:", error);
    }
  };
   
  
  return (
      <div className="lg:h-auto md:mb-0 pt-20 md:pt-0 lg:pt-4">
      <div className="flex flex-col lg:flex-row w-full min-h-screen"> 
      <div className="pb-4 w-full lg:pr-3 lg:h-auto">
      {/* <div className="flex flex-col gap-1 lg:pr-10"></div> */}
      <div className="w-full p-6 lg:pl-10 lg:pr-10 bg-gray-100 rounded-xl shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-3xl font-semibold mb-6 text-[#ff2459]">
                Event Registration
              </h2>

              {/* Name */}
              <div className="mb-4 ">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter Name*
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="Enter Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm px-2">
                    {errors.name.message}*
                  </p>
                )}
              </div>

              {/*textArea*/}
              <div className="mb-4 ">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter Description*
                </label>
                <textarea
                  id="name"
                  name="description"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="Enter Description"
                  {...register("description", {
                    required: "Event description is required",
                  })}
                ></textarea>
                {errors.description && (
                  <p className="text-red-600 text-sm px-2">
                    {errors.description.message}*
                  </p>
                )}
              </div>


        <div className="flex items-center justify-center h-full mb-4 ">
          {/* Venue Field */}
          <div className="w-1/2 flex flex-col justify-center gap-2">
            <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
              Venue
            </label>
            <Controller
              name="venue"
              control={control}
              rules={{
                validate: (value) => {
                  if (!value && !watch("facebookLink")) {
                    return "Either Venue or Facebook Link is required.";
                  }
                  return true;
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    {...field}
                    isClearable
                    options={options}
                    placeholder="Search venue..."
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    onInputChange={(value, { action }) => {
                      if (action === "input-change") {
                        setQuery(value);
                      }
                      if (action === "input-blur" || action === "menu-close") {
                        setQuery("");
                      }
                    }}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption ? selectedOption.value : null);
                    }}
                    value={options.find((option) => option.value === field.value) || null}
                    noOptionsMessage={() => "Type... to see Venues"}
                    isDisabled={!!watch("facebookLink")} // Disable when Facebook Link is entered
                    className={watch("facebookLink") ? "bg-gray-200 cursor-not-allowed" : ""}
                  />
                  <p className="text-red-500 text-sm min-h-[1rem]">{fieldState.error?.message}</p>
                </>
              )}
            />
          </div>

          {/* OR separator */}
          <div className="px-4 flex items-center justify-center">
            <span className="text-gray-500 font-semibold ">or</span>
          </div>

          {/* Facebook Link Field */}
          <div className="w-1/2 flex flex-col justify-center gap-1">
            <label htmlFor="facebookLink" className="block text-sm font-medium text-gray-700">
              Facebook Link
            </label>
            <input
              type="url"
              id="facebookLink"
              name="facebookLink"
              className={`mt-1 block w-full border rounded-md p-2 ${
                watch("venue") ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
              placeholder="Enter your Facebook link"
              {...register("facebookLink", {
                validate: (value) => {
                  if (!value && !watch("venue")) {
                    return "Either Facebook Link or Venue is required.";
                  }
                  return true;
                },
              })}
              disabled={!!watch("venue")} // Disable when Venue is selected
            />
            <p className="text-red-500 text-sm min-h-[1rem]">{errors.facebookLink?.message}</p>
          </div>
        </div>


            <div className="flex items-start justify-center h-full mb-4 gap-4">
              {/* Performers Select */}
              <div className="w-1/2 flex flex-col gap-2">
                <label htmlFor="performer" className="block text-sm font-medium text-gray-700">
                  Performers
                </label>

                <Controller
                  name="performers"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={performerOptions}
                      placeholder="Select performers..."
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      onInputChange={(value) => setPerformer(value)}
                      onChange={(selectedOptions) => {
                        const selectedIDs = selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : [];
                        field.onChange(selectedIDs);
                      }}
                      value={performerOptions.filter((option) => field.value?.includes(option.value))}
                      noOptionsMessage={() => "Type... to see performers"}
                      className="w-full"
                    />
                  )}
                />
              </div>

              {/* OR Separator */}
              <div className="flex items-center justify-center">
                <span className="text-gray-500 font-semibold mt-8">or</span>
              </div>

              {/* Performers Facebook Link */}
              <div className="w-1/2 flex flex-col gap-2">
                <label htmlFor="performerfacebookLink" className="block text-sm font-medium text-gray-700">
                  Performers Facebook Link
                </label>

                {performerFacebookLinks.map((link, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Controller
                      name={`performerFacebookLinks[${index}]`}
                      control={control}
                      defaultValue={link}
                      render={({ field }) => (
                        <input
                          type="url"
                          className="block w-full border rounded-md p-2"
                          placeholder="Enter performer Facebook link"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            handlePerformerLinkChange(index, e.target.value);
                          }}
                        />
                      )}
                    />

                    {index > 0 && (
                      <button
                        type="button"
                        className="text-red-600 font-bold px-2"
                        onClick={() => handleRemovePerformerLink(index)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddPerformerLink}
                  className="mt-2 bg-red-500 text-white px-2 py-1 rounded-md w-fit text-sm"
                >
                  + Add More
                </button>
              </div>
            </div>

        
              {/*Event Url */}
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 mb-4">
                <div>
                  <label
                    htmlFor="eventUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event Url*
                  </label>
                  <input
                    type="url"
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="Enter your Event link"
                    {...register("eventUrl", {
                      required: "Event Url is required",
                    })}
                  />
                  {errors.eventUrl && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.eventUrl.message}*
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="shortUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Short Url*
                  </label>
                  <input
                    type="url"
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="Enter your short link"
                    {...register("shortUrl", {
                      required: "Short Url is required",
                    })}
                  />
                  {errors.shortUrl && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.shortUrl.message}*
                    </p>
                  )}
                </div>
              </div>

              {/*excerpt*/}
              <div className="mb-4">
                <label
                  htmlFor="excerpt"
                  className="block text-sm font-medium text-gray-700"
                >
                  Excerpt(Short Info)*
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="Enter your excerpt"
                  {...register("excerpt", {
                    required: " Excerpt is required",
                  })}
                />
                {errors.excerpt && (
                  <p className="text-red-600 text-sm px-2">
                    {errors.excerpt.message}*
                  </p>
                )}
              </div>
              {/*Offline Payment Instruction*/}
              <div className="mb-4">
                <label
                  htmlFor="Offline Payment Instructions"
                  className="block text-sm font-medium text-gray-700"
                >
                  Offline Payment Instructions
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="Enter Offline Payment Instructions"
                  {...register("offlinePaymentInstructions", {})}
                />
                {errors.offlinePaymentInstructions && (
                  <p className="text-red-600 text-sm px-2">
                    {errors.offlinePaymentInstructions.message}*
                  </p>
                )}
              </div>

              {/* Start and End Date */}
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4  mb-4">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Date & Time*
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="mt-1  block w-full border rounded-md p-2"
                    {...register("startDate", {
                      required: "Start Date is required",
                    })}
                  />
                  {errors.startDate && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.startDate.message}*
                    </p>
                  )}
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    className="mt-2 block w-full border rounded-md p-2"
                    {...register("startTime", {
                      required: "Start Time is required",
                    })}
                  />
                  {errors.startTime && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.startTime.message}*
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Date & Time*
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="mt-1  block w-full border rounded-md p-2"
                    {...register("endDate", {
                      required: "End Date is required",
                      validate: (value) =>
                        !startDate ||
                        value > startDate ||
                        "End date must be after start date",
                    })}
                  />
                  {errors.endDate && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.endDate.message}*
                    </p>
                  )}
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    className=" mt-2 block w-full border rounded-md p-2"
                    {...register("endTime", {
                      required: "End time is required",
                      validate: (value) => {
                        if (!startDate || !endDate || !startTime || !value)
                          return true;

                        const startDateTime = new Date(
                          `${startDate}T${startTime}`
                        );
                        const endDateTime = new Date(`${endDate}T${value}`);

                        return (
                          endDateTime > startDateTime ||
                          "End time must be after start time"
                        );
                      },
                    })}
                  />
                  {errors.endTime && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.endTime.message}*
                    </p>
                  )}
                </div>
              </div>

              {/*IsRepeititive button*/}
              <div>
                <h1 className="font-medium text-[#ff2459]">Repeitive Status</h1>
                <div className="flex gap-2 items-center">
                  <div
                    onClick={() => setValue("isRepetitive", !isRepetitive)}
                    className={`w-12 h-6 mt-2 mb-2  rounded-full p-1 transition-colors ${
                      isRepetitive ? "bg-[#ff2459]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 bg-white  border-black rounded-full shadow transform transition-transform  ${
                        isRepetitive ? "translate-x-6" : ""
                      }`}
                    />
                  </div>
                  <p>Is Event Repetitive</p>
                </div>

                {/* <FormGroup className="mb-2 lg:ml-3">
                  <FormControlLabel
                    control={
                      <PinkSwitch
                        checked={isRepetitive}
                        size="small"
                        onClick={() => setValue("isRepetitive", !isRepetitive)}
                      />
                    }
                    label=" Is Event Repetitive"
                  />
                </FormGroup> */}

                {isRepetitive && (
                  <div className="bg-white p-4 shadow rounded-lg gap-5 grid  lg:grid-cols-2 grid-cols-1">
                    <div className="mb-4">
                      <label
                        htmlFor="repetitiveType"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Repetitive Type
                      </label>
                      <select
                        className="block mt-1 w-full border rounded-md p-2"
                        {...register("repetitiveType", {
                          // required: "Repetitive type is required",
                        })}
                      >
                        <option value="">Select Repetitive Type</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                      </select>
                      {errors.repetitiveType && (
                        <p className="text-red-600 text-sm px-2">
                          {errors.repetitiveType.message}*
                        </p>
                      )}
                    </div>

                    {/* <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Repetitive Except
                      </label>
                      <input
                        type="number"
                        className="mt-1 block w-full border rounded-md p-2"
                        placeholder="Enter repeat except "
                        {...register("repeatExcept", {
                          required: "Repeat Except required",
                        })}
                      />
                      {errors.except && (
                        <p className="text-red-600 text-sm px-2">
                          {errors.repeatExcept.message}*
                        </p>
                      )}
                    </div> */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Repetitive Except
                      </label>

                      <input
                        type="number"
                        className="mt-1 block w-full border rounded-md p-2"
                        placeholder="Enter repeat except and press Enter"
                        onKeyDown={handleAddRepeatExcept} // ✅ Add values on Enter
                      />

                      {errors.repeatExcept && (
                        <p className="text-red-600 text-sm px-2">
                          {errors.repeatExcept.message}*
                        </p>
                      )}

                      {/* Display Array Values */}
                      <div className="flex flex-wrap mt-2">
                        {repeatExceptList.map((value, index) => (
                          <div
                            key={index}
                            className="bg-blue-500 text-white px-2 py-1 rounded flex items-center m-1"
                          >
                            {value}
                            <button
                              type="button"
                              onClick={() => handleRemoveRepeatExcept(index)}
                              className="ml-2 text-gray-800 hover:text-red-500"
                            >
                              <MdCancel />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="RepeatStartTime"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Repeat Start Time*
                      </label>
                      <input
                        type="time"
                        className="mt-1 block w-full border rounded-md p-2"
                        {...register("repeatStartTime", {
                          // required: "repeatStartTime is required",
                        })}
                      />
                      {errors.repeatStartTime && (
                        <p className="text-red-600 text-sm px-2">
                          {errors.repeatStartTime.message}*
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Repeat End Time*
                      </label>
                      <input
                        type="time"
                        className="mt-1 block w-full border rounded-md p-2"
                        {...register("repeatEndTime", {
                          required: "repeatEndTime is required",
                          validate: (value) => {
                            return (
                              value > repeatStartTime ||
                              "End time must be after start time"
                            );
                          },
                        })}
                      />
                      {errors.repeatEndtTime && (
                        <p className="text-red-600 text-sm px-2">
                          {errors.repeatEndTime.message}*
                        </p>
                      )}
                    </div>

                    {/* <div>
                      <FormGroup className=" ">
                        <FormControlLabel
                          control={
                            <PinkSwitch
                              checked={isSeasonal}
                              size="small"
                              onClick={() =>
                                setValue("isSeasonal", !isSeasonal)
                              }
                            />
                          }
                          label="Is seasonal"
                        />
                      </FormGroup>
                    </div> */}
                    {/* {repetitiveType != "Daily" && (
                      <div className="flex gap-2 items-center">
                        <div
                          onClick={() => setValue("isSeasonal", !isSeasonal)}
                          className={`w-12 h-6 mt-2 mb-2  rounded-full p-1 transition-colors ${
                            isSeasonal ? "bg-[#ff2459]" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`h-4 w-4 bg-white  border-black rounded-full shadow transform transition-transform  ${
                              isSeasonal ? "translate-x-6" : ""
                            }`}
                          />
                        </div>
                        <p>Is Seasonal</p>
                      </div>
                    )} */}
                  </div>
                )}
              </div>

              {/* Input Field for Tags */}
              {/* <div className="mt-4">
                <label
                  htmlFor="EventTag"
                  className="block text-sm font-medium text-gray-700"
                >
                  EventTag
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a tag and press Enter"
                  className=" mt-1 block w-full border rounded-md p-2"
                />

              
                <input type="hidden" {...register("eventTag")} />

           
                <div className="flex flex-wrap mt-2">
                  {eventTag.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-blue-500 text-white px-2 py-1 rounded flex items-center m-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="ml-2 text-gray-800 hover:text-red-500"
                      >
                        <MdCancel />
                      </button>
                    </div>
                  ))}
                </div>
              </div> */}
              <div className="mt-4">
                <label
                  htmlFor="EventTag"
                  className="block text-sm font-medium text-gray-700"
                >
                  Event Tag
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a tag and press Enter"
                  className="mt-1 block w-full border rounded-md p-2"
                />

                {/* Display Tags as List */}
                <div className="flex flex-wrap mt-2">
                  {eventTag.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-blue-500 text-white px-2 py-1 rounded flex items-center m-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="ml-2 text-gray-800 hover:text-red-500"
                      >
                        <MdCancel />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/*thumbnail image*/}
              <div className="mb-4">
                <label className="block font-medium">Thumbnail Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  ref={thumbnailRef}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setThumbnailImage(file);
                      setValue(`media.thumbnailImage`, file);
                      const imageUrl = URL.createObjectURL(file);
                      setThumnPreview(imageUrl);
                    }
                  }}
                  className="border p-2 rounded w-full"
                />
                {media?.thumbnailImage && (
                  <div className="mt-2 relative">
                    <img
                      src={thumnPreview}
                      alt="Thumbnail Preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                 <button
                  type="button"
                  onClick={() => {
                    setThumbnailImage(null);
                    setThumnPreview(null);
                    setValue("media.thumbnailImage", null);
                    if (thumbnailRef.current) thumbnailRef.current.value = "";
                  }}
                  className="absolute top-0 left-[44px] text-red-600 p-1 rounded-full"
                >
                  <MdCancel />
                </button>
             </div>
                )}
                {errors.media?.thumbnailImage && (
                  <p className="text-red-500 text-sm">
                    {errors.media.thumbnailImage.message}
                  </p>
                )}
              </div>

              {/* Poster Image Upload */}
              <div className="mb-4">
                <label className="block font-medium">Poster Image:</label>
                <input
                type="file"
                accept="image/*"
                ref={posterInputRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setPosterImage(file);
                    setValue(`media.posterImage`, file);
                    setPosterPreview(URL.createObjectURL(file));
                  }
                }}
                className="border p-2 rounded w-full"
              />

              {media?.posterImage && (
                <div className="mt-2 relative">
                  <img src={posterPreview} alt="Poster Preview" className="w-16 h-16 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => {
                      setPosterImage(null);
                      setPosterPreview(null);
                      setValue("media.posterImage", null);
                      if (posterInputRef.current) {
                        posterInputRef.current.value = "";  // Reset file input
                      }
                    }}
                    className="absolute top-0 left-[44px] text-red-600 p-1 rounded-full"
                  >
                    <MdCancel />
                  </button>
                </div>
              )}

              </div>

              {/* seating Chart Image Upload */}
              <div className="mb-4">
                <label className="block font-medium">
                  Seating chart Image:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={(ref) => (fileInputRef.current = ref)}
                  // onChange={(e) => handleImageChange(e, "seatingChartImage")}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setSeatingChartImage(file);
                      setValue(`media.seatingChartImage`, file);
                      const imageUrl = URL.createObjectURL(file);

                      setSeatingChartPreview(imageUrl);
                    }
                  }}
                  className="border p-2 rounded w-full"
                />
                {media?.seatingChartImage && (
                  <div className="mt-2 relative">
                    <img
                      src={seatingChartPreview}
                      alt="seatingChartImage Preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <button
                      type="button"
                      // onClick={() => removeImage("seatingChartImage")}
                      onClick={() => {
                        setSeatingChartImage(null);
                        setSeatingChartPreview(null);
                        setValue("media.seatingChartImage", null);
                        fileInputRef.current.value = "";
                      }}
                      className="absolute top-0 left-[44px]  text-red-600 p-1 rounded-full"
                    >
                      <MdCancel />
                    </button>
                  </div>
                )}
              </div>

          {/* select images*/}
          <div>
            <div className="mb-4">
              <label className="block font-medium">Select Images:</label>
              <input
                key={inputKey} // Ensures a fresh input when resetting
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleImagesChange1}
                className="border p-2 rounded w-full"
              />
              <p className="text-gray-600">{selectedImages.length} file(s) selected</p>
            </div>

            {/* Image Previews */}
            <div className="grid grid-cols-8 gap-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.preview}
                    alt={`Uploaded ${index}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage1(index)}
                    className="absolute top-0 left-[44px] text-red-600 p-1 rounded-full"
                  >
                    <MdCancel />
                  </button>
                </div>
              ))}
            </div>
          </div>

              {/*Youtube video Link*/}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">
                  YouTube Video Links
                </label>

                {youtubeLinks.map((link, index) => (
                  <div key={index} className="flex gap-2 items-center mt-2">
                    <Controller
                      name={`youtubeLinks.${index}`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="url"
                          className="block w-full border rounded-md p-2"
                          placeholder="Enter YouTube video link"
                          value={link}
                          onChange={(e) => handleLinkChange(index, e.target.value)}
                        />
                      )}
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        className="text-red-600 font-bold px-2"
                        onClick={() => handleRemoveLink(index)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddLink}
                  className="mt-2 bg-red-500 text-white px-2 py-1 rounded-md w-fit text-sm inline-flex items-center"
                >
                  + Add More
                </button>
              </div>


              {/*Seo*/}
              <div className="mb-4 mt-4 grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="metaTitle"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Meta Title*
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="Enter your Meta Title"
                    {...register("seo.metaTitle", {
                      required: "Meta Title is required",
                    })}
                  />
                  {errors.seo?.metaTitle && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.seo.metaTitle.message}*
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="metaTags"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Meta Tag*
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="Enter your Meta Tags"
                    {...register("seo.metaTags", {
                      required: "Meta Tag is required",
                    })}
                  />
                  {errors.seo?.metaTags && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.seo.metaTags.message}*
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="metaDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Meta Description*
                  </label>
                  <textarea
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="Enter your Meta description"
                    {...register("seo.metaDescription", {
                      required: "Meta Description is required",
                    })}
                  />
                  {errors.seo?.metaDescription && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.seo.metaDescription.message}*
                    </p>
                  )}
                </div>
              </div>

              {/*Disabel event after sold out*/}
              <div className="mb-4 mt-4 flex justify-between">
                <div className="flex gap-2 items-center">
                  <div
                    onClick={() =>
                      setValue(
                        "disableEventAfterSoldOut",
                        !disableEventAfterSoldOut
                      )
                    }
                    className={`w-12 h-6 mt-2 mb-2  rounded-full p-1 transition-colors ${
                      disableEventAfterSoldOut ? "bg-[#ff2459]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 bg-white  border-black rounded-full shadow transform transition-transform  ${
                        disableEventAfterSoldOut ? "translate-x-6" : ""
                      }`}
                    />
                  </div>
                  <p>Disable Event after sold out</p>
                </div>
              </div>

            { showTicketForm && selectedRadio === "Tickets" && (
              <form onSubmit={handleCreateTicket} 
  className="w-full max-w-8xl px-1 sm:px-4 lg:px-8 xl:px-0 lg:ml-0 lg:mr-auto p-2 bg-gray-100 rounded-lg space-y-6"
  >
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block mb-1 font-medium">Title*</label>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Ticket Title"
        required
        className="w-full border border-gray-300 rounded-md px-4 py-2"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Price*</label>
      <input
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
        placeholder="Ticket Price"
        required
        className="w-full border border-gray-300 rounded-md px-4 py-2"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Order*</label>
      <input
        type="text"
        value={order}
        onChange={e => setOrder(e.target.value)}
        placeholder="Display Order"
        required
        className="w-full border border-gray-300 rounded-md px-4 py-2"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Total Ticket Quantity*</label>
      <input
        type="number"
        value={totalTicketQuantity}
        onChange={e => setTotalTicketQuantity(e.target.value)}
        placeholder="Total Quantity"
        required
        className="w-full border border-gray-300 rounded-md px-4 py-2"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Limit Per Customer*</label>
      <input
        type="number"
        value={limitPerCustomer}
        onChange={e => setLimitPerCustomer(e.target.value)}
        placeholder="Limit per customer"
        className="w-full border border-gray-300 rounded-md px-4 py-2"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Sale Price*</label>
      <input
        type="number"
        value={salePrice}
        onChange={e => setSalePrice(e.target.value)}
        placeholder="Optional Sale Price"
        className="w-full border border-gray-300 rounded-md px-4 py-2"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Sale Start Date*</label>
      <input
        type="datetime-local"
        value={saleStartDate}
        onChange={e => setSaleStartDate(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-4 py-2"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Sale End Date*</label>
      <input
        type="datetime-local"
        value={saleEndDate}
        onChange={e => setSaleEndDate(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-4 py-2"
      />
    </div>

    <div>
    <label className="block mb-1 font-medium">Promo Codes*</label>
    <input
      type="text"
      value={promoCodes}
      onChange={e => setPromoCodes(e.target.value)}
      placeholder="Comma separated promo codes (e.g. VIP32,EARLYBIRD)"
      className="w-full border border-gray-300 rounded-md px-4 py-2"
    />
  </div>

  <div>
    <label className="block mb-1 font-medium">Booked Seats*</label>
    <input
      type="text"
      value={bookedSeats}
      onChange={e => setBookedSeats(e.target.value)}
      placeholder="Comma separated seat numbers (e.g. 1,2,3)"
      className="w-full border border-gray-300 rounded-md px-4 py-2"
    />
  </div>

  </div>

  <div>
    <label className="block mb-1 font-medium">Description*</label>
    <textarea
      value={description}
      onChange={e => setDescription(e.target.value)}
      placeholder="Enter ticket description"
      rows={4}
      required
      className="w-full border border-gray-300 rounded-md px-4 py-2"
    />
  </div>

  <div className="flex flex-wrap gap-6 items-center">
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={isDonation}
        onChange={e => setIsDonation(e.target.checked)}
        className="accent-blue-500"
      />
      <span>Is Donation</span>
    </label>

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={isSoldOut}
        onChange={e => setIsSoldOut(e.target.checked)}
        className="accent-red-500"
      />
      <span>Is Sold Out</span>
    </label>
  </div>

  <button
    type="submit"
    onClick={handleCreateTicket}
    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
  >
    Create Ticket
  </button>
</form>

            )}
               
              
              <div className="flex justify-around p-0">
                <Button
                  text={"Previous"}
                  variant={"normal"}
                  rounded={"rounded-lg"}
                  onClick={() => navigate("/create-event")}
                />
                {ticketFormat ? (
                  <button
                    type="button"
                    onClick={handleNextClick}
                    className="p-1 bg-[#ff2459] px-6 rounded-lg text-white"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="p-1 bg-[#ff2459] px-6 py-2 rounded-lg text-white"
                  >
                    Create Event
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
