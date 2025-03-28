import React, { useEffect, useState } from "react";
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
import { toast } from "react-toastify";
export default function EventForm() {
  const [tagInput, setTagInput] = useState("");

  const [query, setQuery] = useState("");
  const [performer, setPerformer] = useState("");
  const dispatch = useDispatch();
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
  // console.log(data);
  const options = data.map((venue) => ({
    value: venue._id,
    label: venue.name,
  })); // Convert API response to Select format

  const store1 = useSelector((state) => state.performersReducer) || {
    performers: [],
  };
  const data1 = store1?.performers || []; // Ensure data is always an array
  // console.log(data1);
  const performerOptions = data1.map((performer) => ({
    value: performer._id,
    label: performer.name,
  })); // Convert API response to Select format

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
        youtubeUrl: "",
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
        console.log("Setting category:", parsedData.selectedEvent);
      }
    }
  }, [setValue]);

  // const PinkSwitch = styled(Switch)(({ theme }) => ({
  //   "& .MuiSwitch-switchBase.Mui-checked": {
  //     color: "#ff2459",
  //     "&:hover": {
  //       backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
  //     },
  //   },
  //   "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
  //     backgroundColor: pink[600],
  //   },
  // }));

  // image input
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [posterImage, setPosterImage] = useState(null);
  const [seatingChartImage, setSeatingChartImage] = useState(null);
  const [thumnPreview, setThumnPreview] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [seatingChartPreview, setSeatingChartPreview] = useState(null);

  const handleImagesChange1 = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const existingImages = watch("media.images") || []; // Use watch to access current state
    setValue("media.images", [...existingImages, ...newImages]);
  };

  // Fix removeImage1
  const removeImage1 = (index) => {
    const updatedImages =
      watch("media.images")?.filter((_, i) => i !== index) || [];
    setValue("media.images", updatedImages);
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
  const onSubmit = (data) => {
    console.log(data);
    // console.log(data.media.thumbnailImage);
    const formData = new FormData();
    console.log("category", data.category);
    console.log("eventTags", data.eventTags);

    formData.append("name", data.name);
    formData.append("category", data.category ? data.category : "");

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
    formData.append("venue", data.venue);
    formData.append("repeatExcept", data.repeatExcept);
    formData.append("performers", data.performers);
    formData.append("performerLink", data.performerLink);
    formData.append(
      "repeatStartTime",
      data.repeatStartTime ? data.repeatStartTime : ""
    );
    formData.append("repeatEndTime", data.repeatEndTime);
    formData.append("facebookLink", data.facebookLink);
    formData.append("youtubeLink", data.youtubeLink);
    formData.append("startDate", `${data.startDate}T${data.startTime}`);
    formData.append("endDate", `${data.endDate}T${data.endTime}`);
    formData.append("description", data.description);
    formData.append(
      "offlinePaymentInstructions",
      data.offlinePaymentInstructions
    );
    formData.append("eventTags", data.eventTag); // ✅ Fix key name
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

    // 🔹 Append Images Array (Multiple Images)
    if (data.media?.images?.length > 0) {
      data.media.images.forEach((image) => {
        formData.append("images", image.file); // ✅ Correct field name
      });
    }

    const isLogin = JSON.parse(localStorage.getItem("isLogin"));
    if (isLogin) {
      dispatch(
        createNewEvent(formData, thumbnailImage, posterImage, seatingChartImage)
        // createNewEvent(data, thumbnailImage, posterImage, seatingChartImage)
        // createNewEvent(data,data.media.thumbnailImage,data.media.posterImage,data.media.seatingChartImage)
      );

      reset();
      setThumnPreview(null);
      setPosterPreview(null);
      setSeatingChartPreview(null);
      localStorage.removeItem("eventData");
      navigate("/home");
    } else {
      // navigate("/login");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNextClick = handleSubmit(
    (data) => {
      console.log("Form data:", data);
      const isLogin = JSON.parse(localStorage.getItem("isLogin"));
      if (isLogin) {
        dispatch(
          createNewEvent(data, thumbnailImage, posterImage, seatingChartImage)
          // createNewEvent(data,data.media.thumbnailImage,data.media.posterImage,data.media.seatingChartImage)
        );

        reset();
        setThumnPreview(null);
        setPosterPreview(null);
        setSeatingChartPreview(null);
        localStorage.removeItem("eventData");
        navigate("/createTicket");
      }
    },
    (errors) => {
      toast.error("Please fill in all required fields.");
    }
  );

  return (
    <div className="lg:h-auto md:mb-0 pt-20 md:pt-0 lg:pt-4">
      <div className="flex flex-col lg:flex-row lg:h-screen w-full">
      <div className="flex flex-col pb-4 overflow-y-scroll w-full lg:w-full lg:pr-3 lg:h-auto">
      <div className="flex flex-col gap-1 lg:pr-10"></div>
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

              {/* select Category
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Category
                </label>
                <select
                  id="state"
                  name="state"
                  className="mt-1 block w-full border rounded-md p-2"
                  {...register("category", {
                    required: "category is required",
                  })}
                >
                  <option value="">Select Category</option>
                  <option value="Music & concert">Music & concert</option>
                  <option value="Business">Business</option>
                  <option value="Fiteness & Yoga">Fiteness & Yoga</option>
                  <option value="Travelling & Trekking">
                    Travelling & Trekking
                  </option>
                  <option value="Sport & fitness">Sport & fitness</option>
                  <option value="Education & Classes">
                    Education & Classes
                  </option>
                  <option value="    Charity & Non-profit">
                    Charity & Non-profit
                  </option>
                </select>
              </div> */}

              {/* Venue and Performer */}
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="venue"
                    className="block text-sm mb-1 font-medium text-gray-700"
                  >
                    Venue
                  </label>

                  <Controller
                    name="venue"
                    control={control}
                    rules={{
                      required: "Please select an venue",
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isClearable // Enables "X" button to clear input
                        options={options}
                        placeholder="Search venue..."
                        getOptionLabel={(option) => option.label} // Show venue name
                        getOptionValue={(option) => option.value} // Ensure unique selection by ID
                        onInputChange={(value, { action }) => {
                          if (action === "input-change") {
                            setQuery(value); // Update search query
                          }
                          if (
                            action === "input-blur" ||
                            action === "menu-close"
                          ) {
                            setQuery(""); // Clear input when dropdown closes
                          }
                        }}
                        onChange={(selectedOption) => {
                          field.onChange(
                            selectedOption ? selectedOption.value : null
                          ); // Store only ID
                        }}
                        value={
                          options.find(
                            (option) => option.value === field.value
                          ) || null
                        } // Maintain selected value
                        noOptionsMessage={() => "Type... to see Venues"} // Show message when no options
                      />
                    )}
                  />

                  {errors.venue && (
                    <p className="text-red-500 text-sm">
                      {errors.venue.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="facebookLink"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Facebook Link
                  </label>
                  <input
                    type="url"
                    id="facebookLink"
                    name="facebookLink"
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="Enter your Facebook link"
                    {...register("facebookLink", {
                      required: "facebook link is required",
                    })}
                  />
                  {errors.facebookLink && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.facebookLink.message}*
                    </p>
                  )}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">

                <div>
                  <label
                    htmlFor="performer"
                    className="block text-sm mb-1 font-medium text-gray-700"
                  >
                    Performers
                  </label>

                  <Controller
                    name="performers" // Store selected performers in useForm
                    control={control}
                    rules={{ required: "Please select at least one performer" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti // Allow multiple selection
                        options={performerOptions}
                        placeholder="Select performers..."
                        getOptionLabel={(option) => option.label} // Display performer name
                        getOptionValue={(option) => option.value} // Ensure unique selection by ID
                        onInputChange={(value) => setPerformer(value)} // Update search query
                        onChange={(selectedOptions) => {
                          const selectedIDs = selectedOptions
                            ? selectedOptions.map((option) => option.value)
                            : [];
                          field.onChange(selectedIDs); // Store only performer IDs in useForm
                          console.log("Selected Performer IDs:", selectedIDs); // Debugging
                        }}
                        value={performerOptions.filter((option) =>
                          field.value?.includes(option.value)
                        )} // Ensure proper selection
                        noOptionsMessage={() => "Type... to see performers"} // Show message when no options
                      />
                    )}
                  />

                  {errors.performers && (
                    <p className="text-red-500 text-sm">
                      {errors.performers.message}
                    </p>
                  )}
                </div>
                {/*youtube url*/}
                <div>
                  <label
                    htmlFor="youtube url"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Youtube Url
                  </label>
                  <input
                    type="url"
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="Enter your Youtube url"
                    {...register("youtubeLink", {
                      required: "youtube link is required",
                    })}
                  />
                  {errors.youtubeLink && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.youtubeLink.message}*
                    </p>
                  )}
                </div>
              </div>

              {/*Event Url */}
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="eventUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event url
                  </label>
                  <input
                    type="url"
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="Enter your Event link"
                    {...register("eventUrl", {
                      required: "Event url is required",
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
                    Short Url
                  </label>
                  <input
                    type="url"
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="Enter your short link"
                    {...register("shortUrl", {
                      required: "shortUrl is required",
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
                  Excerpt
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="Enter your excerpt"
                  {...register("excerpt", {
                    required: "Event url is required",
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
                      required: "startDate is required",
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
                    className="mt-6 block w-full border rounded-md p-2"
                    {...register("startTime", {
                      required: "startTime is required",
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
                      required: "endDate is required",
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
                    className=" mt-6 block w-full border rounded-md p-2"
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
                  EventTag
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
                  // onChange={(e) => handleImageChange(e, "thumbnailImage")}
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
                {media.thumbnailImage && (
                  <div className="mt-2 relative">
                    <img
                      src={thumnPreview}
                      alt="Thumbnail Preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setThumnPreview(null)}
                      className="absolute top-0 left-[44px]  text-red-600  p-1 rounded-full"
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
                  // onChange={(e) => handleImageChange(e, "posterImage")}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPosterImage(file);
                      setValue(`media.posterImage`, file);
                      const imageUrl = URL.createObjectURL(file);
                      setPosterPreview(imageUrl);
                    }
                  }}
                  className="border p-2 rounded w-full"
                />
                {media.posterImage && (
                  <div className="mt-2 relative">
                    <img
                      src={posterPreview}
                      alt="Poster Preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <button
                      type="button"
                      // onClick={() => removeImage("posterImage")}
                      onClick={() => setPosterPreview(null)}
                      className="absolute top-0 left-[44px]  text-red-600 p-1 rounded-full"
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
                {media.seatingChartImage && (
                  <div className="mt-2 relative">
                    <img
                      src={seatingChartPreview}
                      alt="seatingChartImage Preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <button
                      type="button"
                      // onClick={() => removeImage("seatingChartImage")}
                      onClick={() => setSeatingChartPreview(null)}
                      className="absolute top-0 left-[44px]  text-red-600 p-1 rounded-full"
                    >
                      <MdCancel />
                    </button>
                  </div>
                )}
              </div>

              {/*images*/}
              <div>
                <div className="mb-4">
                  <label className="block font-medium">Select Images:</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange1}
                    className="border p-2 rounded w-full"
                  />
                </div>

                {/* Image Previews */}
                <div className="grid grid-cols-3 gap-2">
                  {media.images.map((image, index) => (
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

              {/*performer Link*/}
              <div className="mt-4">
                <div></div>
                <div>
                  <label
                    htmlFor="shortUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Performer Link
                  </label>
                  <input
                    type="url"
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="Enter performer link"
                    {...register("performerLink", {
                      required: "performerLink is required",
                    })}
                  />
                  {errors.performerLink && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.performerLink.message}*
                    </p>
                  )}
                </div>
              </div>

              {/*Seo*/}
              <div className="mb-4 mt-4 grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="metaTitle"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Meta Title
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
                    Meta Tag
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
                    Meta Description
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
              {/* <div className="mb-4 mt-4">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("enableRatingReview")}
                        defaultChecked={false}
                        size="small"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }} // Adjusts icon size
                        onChange={() =>
                          setValue("enableRatingReview", !enableRatingReview)
                        }
                      />
                    }
                    label="Enable Rating Review"
                    componentsProps={{ typography: { fontSize: "12px" } }} // Reduces label size
                  />
                </FormGroup>
              </div> */}

              {/* Submit Button */}

              {/* <div className="flex justify-around p-4">
                <Button
                  text={"previous"}
                  variant={"normal"}
                  rounded={"rounded-lg"}
                  onClick={() => navigate("/createEvent")}
                />
                <button
                  // onClick={() => navigate("/login")}
                  className="p-1 bg-[#ff2459] px-6 rounded-lg text-white"
                >
                  Next
                </button>
              </div> */}

              <div className="flex justify-around p-0">
                <Button
                  text={"Previous"}
                  variant={"normal"}
                  rounded={"rounded-lg"}
                  onClick={() => navigate("/createEvent")}
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

// import React, { useEffect, useState } from "react";
// import Select from "react-select";

// import { useNavigate } from "react-router-dom";
// import Button from "../Button";
// import { GiPartyPopper } from "react-icons/gi";
// import { FcViewDetails } from "react-icons/fc";
// import { MdAccountCircle, MdCancel } from "react-icons/md";
// import { alpha, styled } from "@mui/material/styles";
// import { pink } from "@mui/material/colors";
// import { getVenue } from "../../redux/actions/master/Events/GetVenue";
// import { getPerformers } from "../../redux/actions/master/Events/GetPerformer";
// import Photo1 from "./Photo1";
// import { useForm, Controller } from "react-hook-form";
// import { Checkbox, FormControlLabel, FormGroup, Switch } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { createNewEvent } from "../../redux/actions/master/Events/CreateEvent";
// import { toast } from "react-toastify";
// export default function EventForm() {
//   const [tagInput, setTagInput] = useState("");
//   const [query, setQuery] = useState("");
//   const [performer, setPerformer] = useState("");
//   const dispatch = useDispatch();
//   // Fetch API data whenever `query` updates
//   useEffect(() => {
//     if (query) {
//       dispatch(getVenue(query.toLowerCase())); // Dispatch Redux action to fetch data
//     }
//     if (performer) {
//       dispatch(getPerformers(performer.toLowerCase()));
//     }
//   }, [dispatch, query, performer]);

//   const store = useSelector((state) => state.venuesReducer) || { venues: [] };
//   const data = store?.venues || []; // Ensure data is always an array
//   // console.log(data);
//   const options = data.map((venue) => ({
//     value: venue._id,
//     label: venue.name,
//   })); // Convert API response to Select format

//   const store1 = useSelector((state) => state.performersReducer) || {
//     performers: [],
//   };
//   const data1 = store1?.performers || []; // Ensure data is always an array
//   // console.log(data1);
//   const performerOptions = data1.map((performer) => ({
//     value: performer._id,
//     label: performer.name,
//   })); // Convert API response to Select format

//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     control,
//     setError,
//     clearErrors,

//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       name: "",
//       category: "",
//       eventUrl: "",
//       shortUrl: "",
//       startDate: "",
//       endDate: "",
//       disableEventAfterSoldOut: false, // Default value
//       isRepetitive: false,
//       isPublish: false,
//       enableRatingReview: false,
//       isSeasonal: false,
//       isOnline: false,
//       seo: {
//         metaTitle: "",
//         metaTags: "",
//         metaDescription: "",
//       },

//       eventTag: [],

//       // media: {
//       //   thumbnailImage: null,
//       //   posterImage: null,
//       //   seatingChartImage: null,
//       //   images: [],
//       //   youtubeUrl: "",
//       // }, // Default media object
//       thumbnailImage: null,
//       posterImage: null,
//       seatingChartImage: null,
//     },
//   });

//   useEffect(() => {
//     const storedData = localStorage.getItem("eventData");

//     if (storedData) {
//       const parsedData = JSON.parse(storedData);

//       if (parsedData.eventType == "Public") {
//         setValue("isPublish", true);
//       } else {
//         setValue("isPublish", false);
//       }
//       if (parsedData.selectedRadio == "Tickets") {
//         setValue("isOnline", true);
//       } else {
//         setValue("isOnline", false);
//       }
//       setValue("category", parsedData.selectedEvent);
//     }
//   }, [setValue]);

//   const PinkSwitch = styled(Switch)(({ theme }) => ({
//     "& .MuiSwitch-switchBase.Mui-checked": {
//       color: "#ff2459",
//       "&:hover": {
//         backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
//       },
//     },
//     "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
//       backgroundColor: pink[600],
//     },
//   }));
//   const eventTag = watch("eventTag"); // Watch tag values

//   // Add tag when Enter or Comma is pressed
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       const newTag = tagInput.trim();

//       if (newTag && !eventTag.includes(newTag)) {
//         setValue("eventTag", [...eventTag, newTag]); // Update tags array
//       }
//       setTagInput(""); // Clear input
//     }
//   };

//   // Remove tag function
//   const removeTag = (index) => {
//     setValue(
//       "eventTag",
//       eventTag.filter((_, i) => i !== index)
//     );
//   };

//   // image input
//   const [thumbnailImage, setThumbnailImage] = useState(null);
//   const [posterImage, setPosterImage] = useState(null);
//   const [seatingChartImage, setSeatingChartImage] = useState(null);
//   const [thumnPreview, setThumnPreview] = useState(null);
//   const [posterPreview, setPosterPreview] = useState(null);
//   const [seatingChartPreview, setSeatingChartPreview] = useState(null);
//   // const handleImageChange = (e, type) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     setValue(`media.${type}`, file);
//   //     const imageUrl = URL.createObjectURL(file);
//   //     if (type === "thumbnailImage") {
//   //       setThumnPreview(imageUrl);
//   //     }
//   //     if (type === "posterImage") {
//   //       setPosterPreview(imageUrl);
//   //     }
//   //     if (type === "seatingChartImage") {
//   //       setSeatingChartPreview(imageUrl);
//   //     }
//   //   }
//   // };
//   // const removeImage = (type) => {
//   //   setValue(`media.${type}`, null);
//   // };

//   const handleImagesChange1 = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//     }));

//     const existingImages = watch("media.images") || []; // Use watch to access current state
//     setValue("media.images", [...existingImages, ...newImages]);
//   };

//   // Fix removeImage1
//   const removeImage1 = (index) => {
//     const updatedImages =
//       watch("media.images")?.filter((_, i) => i !== index) || [];
//     setValue("media.images", updatedImages);
//   };

//   // Watching values

//   const startDate = watch("startDate");
//   const endDate = watch("endDate");
//   const startTime = watch("startTime");
//   const endTime = watch("endTime");
//   const repeatEndTime = watch("repeatEndTime");
//   const repeatStartTime = watch("repeatStartTime");
//   const disableEventAfterSoldOut = watch("disableEventAfterSoldOut"); // Watch state
//   const isRepetitive = watch("isRepetitive"); // Watch state
//   const isPublish = watch("isPublish"); // Watch state
//   const isOnline = watch("isOnline"); // Watch state
//   const isSeasonal = watch("isSeasonal"); // Watch state
//   const media = watch("media"); // Watching media state
//   const enableRatingReview = watch("enableRatingReview"); // Watching media state
//   const onSubmit = (data) => {
//     console.log(data);
//     // console.log(data.media.thumbnailImage);
//     // const formData = new FormData();
//     // formData.append("name", data.name);
//     // formData.append("category", data.category);
//     // formData.append("eventUrl", data.eventUrl);
//     // formData.append("shortUrl", data.shortUrl);
//     // formData.append("excerpt", data.excerpt);
//     // formData.append("disableEventAfterSoldOut", data.disableEventAfterSoldOut);
//     // formData.append("enableRatingReview", data.enableRatingReview);
//     // formData.append("isRepetitive", data.isRepetitive);
//     // formData.append("isPublish", data.isPublish);
//     // formData.append("isSeasonal", data.isSeasonal);
//     // formData.append("isOnline", data.isOnline);
//     // formData.append("venue", data.venue);
//     // formData.append("repeatExcept", data.repeatExcept);
//     // formData.append("repeatStartTime", data.repeatStartTime);
//     // formData.append("repeatEndTime", data.repeatEndTime);
//     // formData.append("facebookLink", data.facebookLink);
//     // formData.append("startDate", `${data.startDate}T${data.startTime}`);
//     // formData.append("endDate", `${data.endDate}T${data.endTime}`);
//     // formData.append("description", data.description);

//     // // 🔹 Append Individual Images from Media Object
//     // if (data.media?.thumbnailImage) {
//     //   formData.append("media[thumbnailImage]", data.media.thumbnailImage);
//     // }
//     // if (data.media?.posterImage) {
//     //   formData.append("media[posterImage]", data.media.posterImage);
//     // }
//     // if (data.media?.seatingChartImage) {
//     //   formData.append("media[seatingChartImage]", data.media.seatingChartImage);
//     // }

//     // // 🔹 Append Images Array (Multiple Images)
//     // if (data.media?.images?.length > 0) {
//     //   data.media.images.forEach((image, index) => {
//     //     formData.append(`media[images][${index}]`, image.file);
//     //   });
//     // }
//     const isLogin = JSON.parse(localStorage.getItem("isLogin"));
//     if (isLogin) {
//       dispatch(
//         createNewEvent(data, thumbnailImage, posterImage, seatingChartImage)
//       );

//       reset();
//       setThumnPreview(null);
//       setPosterPreview(null);
//       setSeatingChartPreview(null);
//       localStorage.removeItem("eventData");
//       navigate("/home");
//     } else {
//       navigate("/login");
//     }
//   };
//   return (
//     <div className=" lg:h-[119vh] lg:mb-0 md:mb-0 pt-20 lg:pt-0 md:pt-0  ">
//       <div className="flex md:flex-col     lg:flex-row lg:h-screen  ">
//         <Photo1 h={119} />
//         <div className="flex flex-col pb-4 overflow-y-scroll w-full lg:w-full  lg:pr-3 lg:h-[120vh]  ">
//           <div className=" flex flex-col  gap-1 lg:pr-10   "></div>
//           <div className="lg:w-[100%] max-w-4xl  p-6 pl-8  lg:pl-10 lg:pr-10  bg-gray-100 rounded-xl shadow-md">
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <h2 className="text-xl font-semibold mb-6 text-[#ff2459]">
//                 Event Registration
//               </h2>

//               {/* Name */}
//               <div className="mb-4 ">
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Enter Name*
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full border rounded-md p-2"
//                   placeholder="Enter name"
//                   {...register("name", { required: "name is required" })}
//                 />
//                 {errors.name && (
//                   <p className="text-red-600 text-sm px-2">
//                     {errors.name.message}*
//                   </p>
//                 )}
//               </div>

//               {/*textArea*/}
//               <div className="mb-4 ">
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Enter Description*
//                 </label>
//                 <textarea
//                   id="name"
//                   name="description"
//                   className="mt-1 block w-full border rounded-md p-2"
//                   placeholder="Enter Description"
//                   {...register("description", {
//                     required: "Event description is required",
//                   })}
//                 ></textarea>
//                 {errors.description && (
//                   <p className="text-red-600 text-sm px-2">
//                     {errors.description.message}*
//                   </p>
//                 )}
//               </div>

//               {/* select Category
//               <div className="mb-4">
//                 <label
//                   htmlFor="category"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Select Category
//                 </label>
//                 <select
//                   id="state"
//                   name="state"
//                   className="mt-1 block w-full border rounded-md p-2"
//                   {...register("category", {
//                     required: "category is required",
//                   })}
//                 >
//                   <option value="">Select Category</option>
//                   <option value="Music & concert">Music & concert</option>
//                   <option value="Business">Business</option>
//                   <option value="Fiteness & Yoga">Fiteness & Yoga</option>
//                   <option value="Travelling & Trekking">
//                     Travelling & Trekking
//                   </option>
//                   <option value="Sport & fitness">Sport & fitness</option>
//                   <option value="Education & Classes">
//                     Education & Classes
//                   </option>
//                   <option value="    Charity & Non-profit">
//                     Charity & Non-profit
//                   </option>
//                 </select>
//               </div> */}

//               {/* Venue and Performer */}
//               <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
//                 <div>
//                   <label
//                     htmlFor="venue"
//                     className="block text-sm mb-1 font-medium text-gray-700"
//                   >
//                     Venue
//                   </label>

//                   <Controller
//                     name="venue"
//                     control={control}
//                     rules={{
//                       required: "Please select an venue",
//                     }}
//                     render={({ field }) => (
//                       <Select
//                         {...field}
//                         isClearable // Enables "X" button to clear input
//                         options={options}
//                         placeholder="Search venue..."
//                         getOptionLabel={(option) => option.label} // Show venue name
//                         getOptionValue={(option) => option.value} // Ensure unique selection by ID
//                         onInputChange={(value, { action }) => {
//                           if (action === "input-change") {
//                             setQuery(value); // Update search query
//                           }
//                           if (
//                             action === "input-blur" ||
//                             action === "menu-close"
//                           ) {
//                             setQuery(""); // Clear input when dropdown closes
//                           }
//                         }}
//                         onChange={(selectedOption) => {
//                           field.onChange(
//                             selectedOption ? selectedOption.value : null
//                           ); // Store only ID
//                         }}
//                         value={
//                           options.find(
//                             (option) => option.value === field.value
//                           ) || null
//                         } // Maintain selected value
//                       />
//                     )}
//                   />

//                   {errors.venue && (
//                     <p className="text-red-500 text-sm">
//                       {errors.venue.message}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="performer"
//                     className="block text-sm mb-1 font-medium text-gray-700"
//                   >
//                     Performers
//                   </label>

//                   <Controller
//                     name="performers" // Store selected performers in useForm
//                     control={control}
//                     rules={{ required: "Please select at least one performer" }}
//                     render={({ field }) => (
//                       <Select
//                         {...field}
//                         isMulti // Allow multiple selection
//                         options={performerOptions}
//                         placeholder="Select performers..."
//                         getOptionLabel={(option) => option.label} // Display performer name
//                         getOptionValue={(option) => option.value} // Ensure unique selection by ID
//                         onInputChange={(value) => setPerformer(value)} // Update search query
//                         onChange={(selectedOptions) => {
//                           const selectedIDs = selectedOptions
//                             ? selectedOptions.map((option) => option.value)
//                             : [];
//                           field.onChange(selectedIDs); // Store only performer IDs in useForm
//                           console.log("Selected Performer IDs:", selectedIDs); // Debugging
//                         }}
//                         value={performerOptions.filter((option) =>
//                           field.value?.includes(option.value)
//                         )} // Ensure proper selection
//                       />
//                     )}
//                   />

//                   {errors.performers && (
//                     <p className="text-red-500 text-sm">
//                       {errors.performers.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
//                 <div>
//                   <label
//                     htmlFor="facebookLink"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Facebook Link
//                   </label>
//                   <input
//                     type="url"
//                     id="facebookLink"
//                     name="facebookLink"
//                     className="mt-1 block w-full border rounded-md p-2"
//                     placeholder="Enter your Facebook link"
//                     {...register("facebookLink", {
//                       required: "Email is required",
//                     })}
//                   />
//                   {errors.facebookLink && (
//                     <p className="text-red-600 text-sm px-2">
//                       {errors.facebookLink.message}*
//                     </p>
//                   )}
//                 </div>
//                 {/*youtube url*/}
//                 <div>
//                   <label
//                     htmlFor="youtube url"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Youtube Url
//                   </label>
//                   <input
//                     type="url"
//                     className="mt-1 block w-full border rounded-md p-2"
//                     placeholder="Enter your Youtube url"
//                     {...register("media.youtubeUrl")}
//                   />
//                 </div>
//               </div>

//               {/*Event Url */}
//               <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
//                 <div>
//                   <label
//                     htmlFor="eventUrl"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Event url
//                   </label>
//                   <input
//                     type="url"
//                     className="mt-1 block w-full border rounded-md p-2"
//                     placeholder="Enter your Event link"
//                     {...register("eventUrl", {
//                       required: "Event url is required",
//                     })}
//                   />
//                   {errors.eventUrl && (
//                     <p className="text-red-600 text-sm px-2">
//                       {errors.eventUrl.message}*
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="shortUrl"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Short Url
//                   </label>
//                   <input
//                     type="url"
//                     className="mt-1 block w-full border rounded-md p-2"
//                     placeholder="Enter your short link"
//                     {...register("shortUrl", {
//                       required: "shortUrl is required",
//                     })}
//                   />
//                   {errors.shortUrl && (
//                     <p className="text-red-600 text-sm px-2">
//                       {errors.shortUrl.message}*
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/*excerpt*/}
//               <div className="mb-4">
//                 <label
//                   htmlFor="excerpt"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Excerpt
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full border rounded-md p-2"
//                   placeholder="Enter your excerpt"
//                   {...register("excerpt", {
//                     required: "Event url is required",
//                   })}
//                 />
//                 {errors.excerpt && (
//                   <p className="text-red-600 text-sm px-2">
//                     {errors.excerpt.message}*
//                   </p>
//                 )}
//               </div>
//               {/*Offline Payment Instruction*/}
//               <div className="mb-4">
//                 <label
//                   htmlFor="Offline Payment Instructions"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Offline Payment Instructions
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full border rounded-md p-2"
//                   placeholder="Enter Offline Payment Instructions"
//                   {...register("offlinePaymentInstructions", {})}
//                 />
//                 {errors.offlinePaymentInstructions && (
//                   <p className="text-red-600 text-sm px-2">
//                     {errors.offlinePaymentInstructions.message}*
//                   </p>
//                 )}
//               </div>

//               {/* Start and End Date */}
//               <div className="grid lg:grid-cols-2 grid-cols-1 gap-4  mb-4">
//                 <div>
//                   <label
//                     htmlFor="startDate"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Start Date & Time*
//                   </label>
//                   <input
//                     type="date"
//                     id="startDate"
//                     name="startDate"
//                     className="mt-1  block w-full border rounded-md p-2"
//                     {...register("startDate", {
//                       required: "startDate is required",
//                     })}
//                   />
//                   {errors.startDate && (
//                     <p className="text-red-600 text-sm px-2">
//                       {errors.startDate.message}*
//                     </p>
//                   )}
//                   <input
//                     type="time"
//                     id="startTime"
//                     name="startTime"
//                     className="mt-6 block w-full border rounded-md p-2"
//                     {...register("startTime", {
//                       required: "startTime is required",
//                     })}
//                   />
//                   {errors.startTime && (
//                     <p className="text-red-600 text-sm px-2">
//                       {errors.startTime.message}*
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="endDate"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     End Date & Time*
//                   </label>
//                   <input
//                     type="date"
//                     id="endDate"
//                     name="endDate"
//                     className="mt-1  block w-full border rounded-md p-2"
//                     {...register("endDate", {
//                       required: "endDate is required",
//                       validate: (value) =>
//                         !startDate ||
//                         value > startDate ||
//                         "End date must be after start date",
//                     })}
//                   />
//                   {errors.endDate && (
//                     <p className="text-red-600 text-sm px-2">
//                       {errors.endDate.message}*
//                     </p>
//                   )}
//                   <input
//                     type="time"
//                     id="endTime"
//                     name="endTime"
//                     className=" mt-6 block w-full border rounded-md p-2"
//                     {...register("endTime", {
//                       required: "End time is required",
//                       validate: (value) => {
//                         if (!startDate || !endDate || !startTime || !value)
//                           return true;

//                         const startDateTime = new Date(
//                           `${startDate}T${startTime}`
//                         );
//                         const endDateTime = new Date(`${endDate}T${value}`);

//                         return (
//                           endDateTime > startDateTime ||
//                           "End time must be after start time"
//                         );
//                       },
//                     })}
//                   />
//                   {errors.endTime && (
//                     <p className="text-red-600 text-sm px-2">
//                       {errors.endTime.message}*
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/*IsRepeititive button*/}
//               <div>
//                 <h1 className="font-medium text-[#ff2459]">Repeitive Status</h1>
//                 <FormGroup className="mb-2 lg:ml-3">
//                   <FormControlLabel
//                     control={
//                       <PinkSwitch
//                         checked={isRepetitive}
//                         size="small"
//                         onClick={() => setValue("isRepetitive", !isRepetitive)}
//                       />
//                     }
//                     label=" Is Event Repetitive"
//                   />
//                 </FormGroup>
//                 {isRepetitive && (
//                   <div className="bg-white p-4 shadow rounded-lg gap-5 grid  lg:grid-cols-2 grid-cols-1">
//                     <div className="mb-4">
//                       <label
//                         htmlFor="repetitiveType"
//                         className="block text-sm font-medium text-gray-700"
//                       >
//                         Repetitive Type
//                       </label>
//                       <select
//                         className="block mt-1 w-full border rounded-md p-2"
//                         {...register("repetitiveType", {
//                           // required: "Repetitive type is required",
//                         })}
//                       >
//                         <option value="">Select Repetitive Type</option>
//                         <option value="Daily">Daily</option>
//                         <option value="Weekly">Weekly</option>
//                         <option value="Monthly">Monthly</option>
//                         <option value="Yearly">Yearly</option>
//                       </select>
//                       {errors.repetitiveType && (
//                         <p className="text-red-600 text-sm px-2">
//                           {errors.repetitiveType.message}*
//                         </p>
//                       )}
//                     </div>

//                     <div className="mb-4">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Repetitive Except
//                       </label>
//                       <input
//                         type="number"
//                         className="mt-1 block w-full border rounded-md p-2"
//                         placeholder="Enter repeat except "
//                         {...register("repeatExcept", {
//                           required: "Repeat Except required",
//                         })}
//                       />
//                       {errors.except && (
//                         <p className="text-red-600 text-sm px-2">
//                           {errors.repeatExcept.message}*
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="RepeatStartTime"
//                         className="block text-sm font-medium text-gray-700"
//                       >
//                         Repeat Start Time*
//                       </label>
//                       <input
//                         type="time"
//                         className="mt-1 block w-full border rounded-md p-2"
//                         {...register("repeatStartTime", {
//                           // required: "repeatStartTime is required",
//                         })}
//                       />
//                       {errors.repeatStartTime && (
//                         <p className="text-red-600 text-sm px-2">
//                           {errors.repeatStartTime.message}*
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">
//                         Repeat End Time*
//                       </label>
//                       <input
//                         type="time"
//                         className="mt-1 block w-full border rounded-md p-2"
//                         {...register("repeatEndTime", {
//                           required: "repeatEndTime is required",
//                           validate: (value) => {
//                             return (
//                               value > repeatStartTime ||
//                               "End time must be after start time"
//                             );
//                           },
//                         })}
//                       />
//                       {errors.repeatEndtTime && (
//                         <p className="text-red-600 text-sm px-2">
//                           {errors.repeatEndTime.message}*
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <FormGroup className=" ">
//                         <FormControlLabel
//                           control={
//                             <PinkSwitch
//                               checked={isSeasonal}
//                               size="small"
//                               onClick={() =>
//                                 setValue("isSeasonal", !isSeasonal)
//                               }
//                             />
//                           }
//                           label="Is seasonal"
//                         />
//                       </FormGroup>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Input Field for Tags */}
//               <div className="mt-4">
//                 <label
//                   htmlFor="EventTag"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   EventTag
//                 </label>
//                 <input
//                   type="text"
//                   value={tagInput}
//                   onChange={(e) => setTagInput(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   placeholder="Type a tag and press Enter"
//                   className=" mt-1 block w-full border rounded-md p-2"
//                 />

//                 {/* Hidden input field to store tags */}
//                 <input type="hidden" {...register("eventTag")} />

//                 {/* Display Tags as List */}
//                 <div className="flex flex-wrap mt-2">
//                   {eventTag.map((tag, index) => (
//                     <div
//                       key={index}
//                       className="bg-blue-500 text-white px-2 py-1 rounded flex items-center m-1"
//                     >
//                       {tag}
//                       <button
//                         type="button"
//                         onClick={() => removeTag(index)}
//                         className="ml-2 text-gray-800 hover:text-red-500"
//                       >
//                         <MdCancel />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/*thumbnail image*/}
//               <div className="mb-4">
//                 <label className="block font-medium">Thumbnail Image:</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   // onChange={(e) => handleImageChange(e, "thumbnailImage")}
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (file) {
//                       setThumbnailImage(file);
//                       setValue(`thumbnailImage`, file);
//                       const imageUrl = URL.createObjectURL(file);

//                       setThumnPreview(imageUrl);
//                     }
//                   }}
//                   className="border p-2 rounded w-full"
//                 />
//                 {thumbnailImage && (
//                   <div className="mt-2 relative">
//                     <img
//                       src={thumnPreview}
//                       alt="Thumbnail Preview"
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setThumnPreview(null)}
//                       className="absolute top-0 left-[44px]  text-red-600  p-1 rounded-full"
//                     >
//                       <MdCancel />
//                     </button>
//                   </div>
//                 )}
//                 {errors.thumbnailImage && (
//                   <p className="text-red-500 text-sm">
//                     {errors.thumbnailImage.message}
//                   </p>
//                 )}
//               </div>

//               {/* Poster Image Upload */}
//               <div className="mb-4">
//                 <label className="block font-medium">Poster Image:</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   // onChange={(e) => handleImageChange(e, "posterImage")}
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (file) {
//                       setPosterImage(file);
//                       setValue(`posterImage`, file);
//                       const imageUrl = URL.createObjectURL(file);

//                       setPosterPreview(imageUrl);
//                     }
//                   }}
//                   className="border p-2 rounded w-full"
//                 />
//                 {posterImage && (
//                   <div className="mt-2 relative">
//                     <img
//                       src={posterPreview}
//                       alt="Poster Preview"
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                     <button
//                       type="button"
//                       // onClick={() => removeImage("posterImage")}
//                       onClick={() => setPosterPreview(null)}
//                       className="absolute top-0 left-[44px]  text-red-600 p-1 rounded-full"
//                     >
//                       <MdCancel />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* seating Chart Image Upload */}
//               <div className="mb-4">
//                 <label className="block font-medium">
//                   Seating chart Image:
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   // onChange={(e) => handleImageChange(e, "seatingChartImage")}
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (file) {
//                       setSeatingChartImage(file);
//                       setValue(`seatingChartImage`, file);
//                       const imageUrl = URL.createObjectURL(file);

//                       setSeatingChartPreview(imageUrl);
//                     }
//                   }}
//                   className="border p-2 rounded w-full"
//                 />
//                 {seatingChartImage && (
//                   <div className="mt-2 relative">
//                     <img
//                       src={seatingChartPreview}
//                       alt="seatingChartImage Preview"
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                     <button
//                       type="button"
//                       // onClick={() => removeImage("seatingChartImage")}
//                       onClick={() => setSeatingChartPreview(null)}
//                       className="absolute top-0 left-[44px]  text-red-600 p-1 rounded-full"
//                     >
//                       <MdCancel />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/*images*/}
//               <div>
//                 <div className="mb-4">
//                   <label className="block font-medium">Select Images:</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={handleImagesChange1}
//                     className="border p-2 rounded w-full"
//                   />
//                 </div>

//                 {/* Image Previews */}
//                 {/* <div className="grid grid-cols-3 gap-2">
//                   {media.images.map((image, index) => (
//                     <div key={index} className="relative">
//                       <img
//                         src={image.preview}
//                         alt={`Uploaded ${index}`}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage1(index)}
//                         className="absolute top-0 left-[44px] text-red-600 p-1 rounded-full"
//                       >
//                         <MdCancel />
//                       </button>
//                     </div>
//                   ))}
//                 </div> */}
//               </div>

//               {/*performer Link*/}
//               <div className="mt-4">
//                 <div></div>
//                 <div>
//                   <label
//                     htmlFor="shortUrl"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Performer Link
//                   </label>
//                   <input
//                     type="url"
//                     className="mt-1 block w-full border rounded-md p-2"
//                     placeholder="Enter performer link"
//                     {...register("performerLink", {
//                       required: "performerLink is required",
//                     })}
//                   />
//                   {errors.performerLink && (
//                     <p className="text-red-600 text-sm px-2">
//                       {errors.performerLink.message}*
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/*Seo*/}
//               <div className="mb-4 mt-4 grid lg:grid-cols-2 grid-cols-1 gap-4">
//                 <div>
//                   <label
//                     htmlFor="metaTitle"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Meta Title
//                   </label>
//                   <input
//                     type="text"
//                     className="mt-1 block w-full border rounded-md p-2"
//                     placeholder="Enter your Meta Title"
//                     {...register("seo.metaTitle", {
//                       required: "Meta Title is required",
//                     })}
//                   />
//                   {errors.seo?.metaTitle && (
//                     <p className="text-red-600 text-sm px-2">
//                       {errors.seo.metaTitle.message}*
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="metaTags"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Meta Tag
//                   </label>
//                   <input
//                     type="text"
//                     className="mt-1 block w-full border rounded-md p-2"
//                     placeholder="Enter your Meta Tags"
//                     {...register("seo.metaTags", {
//                       required: "Meta Tag is required",
//                     })}
//                   />
//                   {errors.seo?.metaTags && (
//                     <p className="text-red-600 text-sm px-2">
//                       {errors.seo.metaTags.message}*
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="metaDescription"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Meta Description
//                   </label>
//                   <textarea
//                     className="mt-1 block w-full border rounded-md p-2"
//                     placeholder="Enter your Meta description"
//                     {...register("seo.metaDescription", {
//                       required: "Meta Description is required",
//                     })}
//                   />
//                   {errors.seo?.metaDescription && (
//                     <p className="text-red-600 text-sm px-2">
//                       {errors.seo.metaDescription.message}*
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/*Disabel event after sold out*/}
//               <div className="mb-4 mt-4 flex justify-between">
//                 <FormGroup>
//                   <FormControlLabel
//                     control={
//                       <PinkSwitch
//                         checked={disableEventAfterSoldOut}
//                         size="small"
//                         onClick={() =>
//                           setValue(
//                             "disableEventAfterSoldOut",
//                             !disableEventAfterSoldOut
//                           )
//                         }
//                       />
//                     }
//                     label="Disable Event after sold out"
//                   />
//                 </FormGroup>
//                 {/* <FormGroup>
//                   <FormControlLabel
//                     control={
//                       <PinkSwitch
//                         checked={isOnline}
//                         size="small"
//                         onClick={() => setValue("isOnline", !isOnline)}
//                       />
//                     }
//                     label="Is Payment Online"
//                   />
//                 </FormGroup> */}

//                 {/* <FormGroup>
//                   <FormControlLabel
//                     control={
//                       <PinkSwitch
//                         checked={isPublish}
//                         size="small"
//                         onClick={() => setValue("isPublish", !isPublish)}
//                       />
//                     }
//                     label="Publish Event.."
//                   />
//                 </FormGroup> */}
//               </div>
//               <div className="mb-4 mt-4">
//                 <FormGroup>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         {...register("enableRatingReview")}
//                         defaultChecked={false}
//                         size="small"
//                         sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }} // Adjusts icon size
//                         onChange={() =>
//                           setValue("enableRatingReview", !enableRatingReview)
//                         }
//                       />
//                     }
//                     label="Enable Rating Review"
//                     componentsProps={{ typography: { fontSize: "12px" } }} // Reduces label size
//                   />
//                 </FormGroup>
//               </div>

//               {/* Submit Button */}

//               <div className="flex justify-around p-4">
//                 <Button
//                   text={"previous"}
//                   variant={"normal"}
//                   rounded={"rounded-lg"}
//                   onClick={() => navigate("/createEvent")}
//                 />
//                 <button
//                   // onClick={() => navigate("/login")}
//                   className="p-1 bg-[#ff2459] px-4 rounded-lg text-white"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
