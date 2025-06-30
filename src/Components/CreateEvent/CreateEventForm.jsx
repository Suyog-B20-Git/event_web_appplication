import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { GiPartyPopper } from "react-icons/gi";
import { FcViewDetails } from "react-icons/fc";
import {
  MdAccountCircle,
  MdCancel,
  MdSentimentSatisfied,
} from "react-icons/md";
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
import { useWatch } from "react-hook-form";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

export default function EventForm() {
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef(null);
  const thumbnailRef = useRef(null);
  const posterInputRef = useRef(null);
  const seatingChartRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [inputKey, setInputKey] = useState(Date.now()); // Unique key for re-render
  const [repeatDates, setRepeatDates] = useState([]);
  const [repeatDatesRaw, setRepeatDatesRaw] = useState([]);
  const [query, setQuery] = useState("");
  const [performer, setPerformer] = useState("");
  const [selectedPerformers, setSelectedPerformers] = useState([]);
  const dispatch = useDispatch();
  const [youtubeLinks, setYoutubeLinks] = useState([""]);
  const [performersYtLinks, setperformersYtLinks] = useState([""]);
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
    setperformersYtLinks([...performersYtLinks, ""]);
  };

  const handleRemovePerformerLink = (index) => {
    const updatedLinks = performersYtLinks.filter((_, i) => i !== index);
    setperformersYtLinks(updatedLinks);
    setValue("performersYtLinks", updatedLinks);
  };

  const handlePerformerLinkChange = (index, value) => {
    const updatedLinks = [...performersYtLinks];
    updatedLinks[index] = value;
    setperformersYtLinks(updatedLinks);
    setValue("performersYtLinks", updatedLinks);
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
      disableEventAfterSoldOut: false,
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
      youtubeLinks: [""],
      media: {
        thumbnailImage: null,
        posterImage: null,
        seatingChartImage: null,
        images: [],
      },
    },
  });

  const [eventTags, setEventTags] = useState([]);
  const eventTag = watch("eventTag") || [];

  const handleKeyDown = (e) => {
  if (e.key === "Enter" && tagInput.trim() !== "") {
    e.preventDefault();

    const newTagsRaw = tagInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const existingTagsLowerSet = new Set(eventTags.map(tag => tag.toLowerCase()));

    const uniqueNewTags = newTagsRaw.filter(tag => {
      const isDuplicate = existingTagsLowerSet.has(tag.toLowerCase());
      if (!isDuplicate) {
        existingTagsLowerSet.add(tag.toLowerCase());
        return true;
      }
      return false;
    });

    if (uniqueNewTags.length > 0) {
      const updatedTags = [...eventTags, ...uniqueNewTags];
      setEventTags(updatedTags);
      setValue("eventTag", updatedTags);
      clearErrors("eventTag");
    }

    setTagInput("");
  }
};



  const removeTag = (index) => {
    const updatedTags = eventTags.filter((_, i) => i !== index);
    setEventTags(updatedTags);
    setValue("eventTag", updatedTags);
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
      const existingFiles = selectedImages.map((img) => img.file);

      // Filter out duplicates based on name and size
      const uniqueFiles = files.filter((file) => {
        return !existingFiles.some(
          (existing) =>
            existing.name === file.name && existing.size === file.size
        );
      });

      if (uniqueFiles.length === 0) return; // No new unique files

      const newImages = uniqueFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      const updatedImages = [...selectedImages, ...newImages];
      setSelectedImages(updatedImages);
      setValue("media.images", updatedImages);
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
    if (
      e.key === "Enter" &&
      e.target.value.trim() !== "" &&
      e.target.value <= 31 &&
      e.target.value >= 1
    ) {
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
    if (watch("venue") || watch("mapUrl")) {
      clearErrors(["venue", "mapUrl"]);
    }
  }, [watch("venue"), watch("mapUrl"), clearErrors]);

  // useEffect(() => {
  //   if (watch("performers") || watch("performersYtLinks")) {
  //     clearErrors(["performers", "performersYtLinks"]);
  //   }
  // }, [watch("performers"), watch("performersYtLinks"), clearErrors]);

  // const performersValue = useWatch({
  //   control,
  //   name: "performers",
  // });

  const performers = useWatch({ control, name: "performers" });
  const ytLinks = useWatch({ control, name: "performersYtLinks" });

  useEffect(() => {
    const hasPerformers = performers?.length > 0;
    const hasYtLinks = ytLinks && ytLinks.some((link) => link?.trim() !== "");

    if (!hasPerformers && !hasYtLinks) {
      setError("performers", {
        type: "manual",
        message: "Either Performers or Performers YouTube Link is required.",
      });
      setError("performersYtLinks", {
        type: "manual",
        message: "Either Performers or Performers YouTube Link is required.",
      });
    } else {
      clearErrors("performers");
      clearErrors("performersYtLinks");
    }
  }, [performers, ytLinks]);

  const onSubmit = (data) => {
    console.log("FORM DATA", data);
    const formData = new FormData();
    const category = data.selectedEvent || data.category;
    // const { repeatDates, repeatDays } = getRepeatDatesAndDays(repeatDatesRaw);
    data.category = category;
    formData.append("name", data.name);
    formData.append("category", category);
    formData.append("excerpt", data.excerpt);
    formData.append(
      "disableEventAfterSoldOut",
      data.disableEventAfterSoldOut ?? false
    );
    formData.append("enableRatingReview", data.enableRatingReview);
    formData.append("isRepetitive", data.isRepetitive ?? false);
    formData.append("repetitiveType", data.repetitiveType);
    formData.append("isPublish", data.isPublish ?? true);
    formData.append("isSeasonal", data.isSeasonal ?? false);
    formData.append("isOnline", data.isOnline ?? true);
    formData.append("venue", data.venue || "");
    formData.append("mapUrl", data.mapUrl || "");
    formData.append("repeatExcept", data.repeatExcept ?? []);
    formData.append("performers", data.performers || []);
    // formData.append("performersYtLinks", data.performersYtLinks || []);
   if (
  Array.isArray(data.performersYtLinks) &&
  data.performersYtLinks.some((link) => typeof link === "string" && link.trim() !== "")
) {
  const linksString = data.performersYtLinks
    .filter((link) => typeof link === "string" && link.trim() !== "")
    .map((link) => link.trim())
    .join(",");

  formData.append("performersYtLinks", linksString);
}


    formData.append(
      "repeatStartTime",
      data.repeatStartTime ? data.repeatStartTime : ""
    );

    if (repetitiveType === "Weekly") {
      if (repeatDatesRaw.length > 0) {
        formData.append("repeatDays", repeatDatesRaw);
        console.log("weekly raw", repeatDatesRaw);
      }
    } else if (repetitiveType === "Monthly") {
      const dateNumbers = repeatDatesRaw.map((d) => new Date(d).getDate());
      if (dateNumbers.length > 0) {
        formData.append("repeatDates", dateNumbers);
      }
    }

    formData.append("repeatEndTime", data.repeatEndTime);
    formData.append("youtubeLinks", data.youtubeLinks);
    formData.append("startDate", `${data.startDate}T${data.startTime}`);
    formData.append("endDate", `${data.endDate}T${data.endTime}`);
    formData.append("description", data.description1);
    formData.append(
      "offlinePaymentInstructions",
      data.offlinePaymentInstructions
    );
    formData.append("eventTags", data.eventTag);
    const seoTags = data.seo.metaTags.join(",");
    formData.append("seo", JSON.stringify(seoTags));

    const thumbnailImage = data.media?.thumbnailImage;
    const posterImage = data.media?.posterImage;
    const seatingChartImage = data.media?.seatingChartImage;

    if (thumbnailImage) {
      formData.append("thumbnailImage", thumbnailImage);
    }
    if (posterImage) {
      formData.append("posterImage", posterImage);
    }
    if (seatingChartImage) {
      formData.append("seatingChartImage", seatingChartImage);
    }

    if (data.media?.images?.length > 0) {
      data.media.images.forEach((image) => {
        const fileToUpload = image.file instanceof File ? image.file : image;
        if (fileToUpload instanceof File) {
          formData.append("images", fileToUpload);
        } else {
        }
      });
    }

    const isLogin = JSON.parse(localStorage.getItem("isLogin"));
    const authToken = localStorage.getItem("authToken");

    if (!isLogin || !authToken) {
      localStorage.setItem("eventData", JSON.stringify({ ...data }));
      toast.error("Please log in to create an event.");
      localStorage.setItem("redirectAfterLogin", "/submit-event");
      navigate("/login?redirectTo=/submit-event");
      return;
    }
    try {
      for (let [key, value] of formData.entries()) {
      }
      dispatch(createNewEvent(formData));
      reset();
      setThumnPreview(null);
      setPosterPreview(null);
      setSeatingChartPreview(null);
      localStorage.removeItem("eventData");
      navigate("/home");
    } catch (error) {
      const errorMessage =
        error?.response?.message || error?.message || "Something went wrong!";
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
    const formData = new FormData();
    const category = data.selectedEvent || data.category;
    data.category = category;
    formData.append("name", data.name);
    formData.append("category", category);
    formData.append("excerpt", data.excerpt);
    formData.append(
      "disableEventAfterSoldOut",
      data.disableEventAfterSoldOut ?? false
    );
    formData.append("enableRatingReview", data.enableRatingReview);
    formData.append("isRepetitive", data.isRepetitive ?? false);
    formData.append("repetitiveType", data.repetitiveType);
    formData.append("isPublish", data.isPublish ?? true);
    formData.append("isSeasonal", data.isSeasonal ?? false);
    formData.append("isOnline", data.isOnline ?? true);
    formData.append("venue", data.venue || "");
    formData.append("mapUrl", data.mapUrl || "");
    formData.append("repeatExcept", data.repeatExcept ?? []);
    formData.append("performers", data.performers || []);
    // formData.append("performersYtLinks", data.performersYtLinks);
    if (
      data.performersYtLinks &&
      data.performersYtLinks.length > 0 &&
      data.performersYtLinks[0] !== ""
    ) {
      const linksString = data.performersYtLinks
        .filter((link) => link.trim() !== "")
        .join(",");

      formData.append("performersYtLinks", linksString);
    }

    const repeatDates = [];
    const repeatDays = [];

    repeatDatesRaw.forEach((dateObj) => {
      const date = new Date(dateObj);
      repeatDates.push(date.getDate());
      repeatDays.push(date.toLocaleString("en-US", { weekday: "long" }));
    });

    formData.append("repeatDates", repeatDates.join(","));
    formData.append("repeatDays", repeatDays.join(","));
    formData.append(
      "repeatStartTime",
      data.repeatStartTime ? data.repeatStartTime : ""
    );
    formData.append("repeatEndTime", data.repeatEndTime);
    formData.append("youtubeLinks", data.youtubeLinks);
    formData.append("startDate", `${data.startDate}T${data.startTime}`);
    formData.append("endDate", `${data.endDate}T${data.endTime}`);
    formData.append("description", data.description1);
    formData.append(
      "offlinePaymentInstructions",
      data.offlinePaymentInstructions
    );
    formData.append("eventTags", data.eventTag);
    const seoTags = data.seo.metaTags.join(",");
    formData.append("seo", JSON.stringify(seoTags));

    const thumbnailImage = data.media?.thumbnailImage;
    const posterImage = data.media?.posterImage;
    const seatingChartImage = data.media?.seatingChartImage;

    if (thumbnailImage) {
      formData.append("thumbnailImage", thumbnailImage);
    }
    if (posterImage) {
      formData.append("posterImage", posterImage);
    }
    if (seatingChartImage) {
      formData.append("seatingChartImage", seatingChartImage);
    }

    if (data.media?.images?.length > 0) {
      data.media.images.forEach((image) => {
        const fileToUpload = image.file instanceof File ? image.file : image;
        if (fileToUpload instanceof File) {
          formData.append("images", fileToUpload);
        } else {
        }
      });
    }

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
      for (let [key, value] of formData.entries()) {
      }
      const response = await dispatch(createNewEvent(formData));
      const eventId4 = response?.event._id;
      localStorage.setItem("createdEventId", eventId4);
      setShowTicketForm(true);
    } catch (error) {
      toast.error("Failed to create event.");
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
      .split(",")
      .map((code) => code.trim())
      .filter(Boolean);

    const bookedSeatArray = bookedSeats
      .split(",")
      .map((seat) => parseInt(seat.trim(), 10))
      .filter((n) => !isNaN(n));

    const ticketData = {
      event,
      title,
      price: Number(price),
      totalTicketQuantity: Number(totalTicketQuantity),
      limitPerCustomer: Number(limitPerCustomer),
      description,
      promoCodes: promoCodeArray || [],
      isSale: isSale,
      salePrice: Number(salePrice) || null,
      saleStartDate: saleStartDate
        ? new Date(saleStartDate).toISOString()
        : null,
      saleEndDate: saleEndDate ? new Date(saleEndDate).toISOString() : null,
      soldOut: isSoldOut || false,
      seatingPoints: [],
      bookedSeats: bookedSeatArray,
      noOfBookedSeats: bookedSeatArray.length,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${baseUrl}/api/ticketFormat`,
        ticketData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      toast.success("Ticket created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create ticket.");
    }
  };

  // copy Enter Name to meta title

  const [metaTitleEdited, setMetaTitleEdited] = useState(false);
  const name = watch("name") || "";
  const metaTitle = watch("seo.metaTitle") || "";

  useEffect(() => {
    if (!metaTitleEdited && name !== metaTitle) {
      setValue("seo.metaTitle", name);
    }
  }, [name, metaTitleEdited, metaTitle, setValue]);

  // copy Enter Description to Meta Description
  const [metaDescEdited, setMetaDescEdited] = useState(false);
  const description1 = watch("description1") || "";
  const metaDescription = watch("seo.metaDescription") || "";

  useEffect(() => {
    if (!metaDescEdited && description1 !== metaDescription) {
      setValue("seo.metaDescription", description1);
    }
  }, [description1, metaDescEdited, metaDescription, setValue]);

  // Copy Event Tag into Meta Tag
  const [metaTagsManuallyEdited, setMetaTagsManuallyEdited] = useState(false);
  const metaTags = watch("seo.metaTags") || [];

  // eventTags is already declared somewhere in your component, just use it here

  useEffect(() => {
    if (
      !metaTagsManuallyEdited &&
      JSON.stringify(eventTags) !== JSON.stringify(metaTags)
    ) {
      setValue("seo.metaTags", eventTags);
    }
  }, [eventTags, metaTags, metaTagsManuallyEdited, setValue]);

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
                  type="text"
                  id="description1"
                  className="mt-1 block w-full border rounded-md p-2 resize-y"
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  placeholder="Enter Description"
                  {...register("description1", {
                    required: "Event description is required",
                  })}
                ></textarea>
                {errors.description && (
                  <p className="text-red-600 text-sm px-2">
                    {errors.description1.message}*
                  </p>
                )}
              </div>

              <div className="flex items-center  h-full mb-4 ">
                {/* Venue Field */}
                {/* <div className="w-full flex flex-col justify-center gap-2">
                  <label
                    htmlFor="venue"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Venue
                  </label>
                  <Controller
                    name="venue"
                    control={control}
                    rules={{
                      validate: (value) => {
                        if (!value && !watch("facebookLink")) {
                          return "Either Venue ";
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
                            if (
                              action === "input-blur" ||
                              action === "menu-close"
                            ) {
                              setQuery("");
                            }
                          }}
                          onChange={(selectedOption) => {
                            field.onChange(
                              selectedOption ? selectedOption.value : null
                            );
                          }}
                          value={
                            options.find(
                              (option) => option.value === field.value
                            ) || null
                          }
                          noOptionsMessage={() => "Type... to see Venues"}
                          isDisabled={!!watch("facebookLink")} // Disable when Facebook Link is entered
                          className={
                            watch("facebookLink")
                              ? "bg-gray-200 cursor-not-allowed"
                              : ""
                          }
                        />
                        <p className="text-red-500 text-sm min-h-[1rem]">
                          {fieldState.error?.message}
                        </p>
                      </>
                    )}
                  />
                </div> */}
              </div>

              <div className="flex items-center justify-center h-full mb-4 ">
                {/* Venue Field */}
                <div className="w-1/2 flex flex-col justify-center gap-2">
                  <label
                    htmlFor="venue"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Venue
                  </label>
                  <Controller
                    name="venue"
                    control={control}
                    rules={{
                      validate: (value) => {
                        if (!value && !watch("mapUrl")) {
                          return "Either Venue or Google Map URL is required.";
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
                            if (
                              action === "input-blur" ||
                              action === "menu-close"
                            ) {
                              setQuery("");
                            }
                          }}
                          onChange={(selectedOption) => {
                            field.onChange(
                              selectedOption ? selectedOption.value : null
                            );
                          }}
                          value={
                            options.find(
                              (option) => option.value === field.value
                            ) || null
                          }
                          noOptionsMessage={() => "Type... to see Venues"}
                          isDisabled={!!watch("mapUrl")}
                          className={
                            watch("mapUrl")
                              ? "bg-gray-200 cursor-not-allowed"
                              : ""
                          }
                        />
                        <p className="text-red-500 text-sm min-h-[1rem]">
                          {fieldState.error?.message}
                        </p>
                      </>
                    )}
                  />
                </div>

                {/* OR separator */}
                <div className="px-4 flex items-center justify-center">
                  <span className="text-gray-500 font-semibold ">or</span>
                </div>

                {/* Venue Google Map URL Field */}
                <div className="w-1/2 flex flex-col justify-center gap-1 lg:mt-[-9px]">
                  <label
                    htmlFor="mapUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Google Map URL
                  </label>
                  <input
                    type="url"
                    id="mapUrl"
                    name="mapUrl"
                    className={`mt-1 block w-full border rounded-md p-2 ${
                      watch("venue") ? "bg-gray-200 cursor-not-allowed" : ""
                    }`}
                    placeholder="Enter your Venue Map URL"
                    {...register("mapUrl", {
                      validate: (value) => {
                        if (!value && !watch("venue")) {
                          return "Either Google Map URL or Venue is required.";
                        }
                        return true;
                      },
                    })}
                    disabled={!!watch("venue")} // Disable when Venue is selected
                  />
                  <p className="text-red-500 text-sm min-h-[1rem]">
                    {errors.mapUrl?.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center h-full mb-4">
                {/* Performers Select */}
                <div className="w-1/2 flex flex-col justify-center gap-2">
                  <label
                    htmlFor="performers"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Performers
                  </label>

                  <Controller
                    name="performers"
                    control={control}
                    rules={{
                      validate: (value) => {
                        const ytLinksFilled = ytLinks?.some(
                          (link) => link?.trim() !== ""
                        );
                        if (!value?.length && !ytLinksFilled) {
                          return "Either Performer or Performers YT URL is required.";
                        }
                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          isMulti
                          options={performerOptions}
                          placeholder="Select performers..."
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onInputChange={(value) => setPerformer(value)}
                          onChange={(selectedOptions) => {
                            setSelectedPerformers(selectedOptions);
                            const selectedIDs = selectedOptions
                              ? selectedOptions.map((option) => option.value)
                              : [];
                            field.onChange(selectedIDs);
                          }}
                          value={selectedPerformers}
                          isClearable
                          noOptionsMessage={() => "Type... to see performers"}
                          isDisabled={ytLinks?.some(
                            (link) => link?.trim() !== ""
                          )}
                          classNamePrefix="react-select"
                          className={`react-select-container ${
                            ytLinks?.some((link) => link?.trim() !== "")
                              ? "bg-gray-200 cursor-not-allowed"
                              : ""
                          }`}
                        />
                        <p className="text-red-500 text-sm min-h-[1rem]">
                          {field.error?.message}
                        </p>
                      </>
                    )}
                  />
                </div>

                {/* OR separator */}
                <div className="px-4 flex items-center justify-center">
                  <span className="text-gray-500 font-semibold">or</span>
                </div>

                {/* Performer Youtube Link Field */}
                <div className="w-1/2 flex flex-col gap-2">
                  <label
                    htmlFor="performersYtLinks"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Performers Youtube Link
                  </label>

                  {performersYtLinks.map((link, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Controller
                        name={`performersYtLinks[${index}]`}
                        control={control}
                        defaultValue={link}
                        render={({ field }) => (
                          <input
                            type="url"
                            className={`mt-1 block w-full border rounded-md p-2 min-h-[42px] ${
                              performers?.length > 0
                                ? "bg-gray-200 cursor-not-allowed"
                                : ""
                            }`}
                            placeholder="Enter performers youtube link"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              handlePerformerLinkChange(index, e.target.value);
                            }}
                            disabled={performers?.length > 0}
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

              <div className="mb-4">
                <label
                  htmlFor="excerpt"
                  className="block text-sm font-medium text-gray-700"
                >
                  Excerpt(Short Info)
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="Enter your excerpt"
                  {...register("excerpt", {})}
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
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
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
                    className="mt-1 block w-full border rounded-md p-2 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onClick={(e) => {
                      // Only open picker on actual clicks (user gesture)
                      try {
                        if (e.target.showPicker) {
                          e.target.showPicker();
                        }
                      } catch (error) {}
                    }}
                    onKeyDown={(e) => {
                      // Open picker on Enter/Space (these are valid user gestures)
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        try {
                          if (e.target.showPicker) {
                            e.target.showPicker();
                          }
                        } catch (error) {}
                      }
                      // Allow normal typing for other keys
                    }}
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
                    className="mt-2 block w-full border rounded-md p-2 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onClick={(e) => {
                      try {
                        if (e.target.showPicker) {
                          e.target.showPicker();
                        }
                      } catch (error) {}
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        try {
                          if (e.target.showPicker) {
                            e.target.showPicker();
                          }
                        } catch (error) {}
                      }
                    }}
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
                    className="mt-1 block w-full border rounded-md p-2 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onClick={(e) => {
                      try {
                        if (e.target.showPicker) {
                          e.target.showPicker();
                        }
                      } catch (error) {}
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        try {
                          if (e.target.showPicker) {
                            e.target.showPicker();
                          }
                        } catch (error) {}
                      }
                    }}
                    {...register("endDate", {
                      required: "End Date is required",
                      validate: (value) => !startDate || value >= startDate,
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
                    className="mt-2 block w-full border rounded-md p-2 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onClick={(e) => {
                      try {
                        if (e.target.showPicker) {
                          e.target.showPicker();
                        }
                      } catch (error) {}
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        try {
                          if (e.target.showPicker) {
                            e.target.showPicker();
                          }
                        } catch (error) {}
                      }
                    }}
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
                <h1 className="font-medium text-[#ff2459]">
                  Repetitive Status
                </h1>
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
                      </select>
                      {errors.repetitiveType && (
                        <p className="text-red-600 text-sm px-2">
                          {errors.repetitiveType.message}*
                        </p>
                      )}
                    </div>

                    {repetitiveType === "Daily" && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Repetitive Dates (Repeats Except)
                        </label>

                        <input
                          type="number"
                          min={1}
                          max={31}
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
                    )}

                    {repetitiveType === "Weekly" && (
                      <div className="mb-4 col-span-4 w-full bg-blue-300 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700">
                          Select Repeating Days
                        </label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {[
                            "Sunday",
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                          ].map((day) => (
                            <label
                              key={day}
                              className="flex items-center bg-white p-2 rounded"
                            >
                              <input
                                type="checkbox"
                                value={day}
                                checked={repeatDatesRaw.includes(day)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setRepeatDatesRaw([...repeatDatesRaw, day]);
                                  } else {
                                    setRepeatDatesRaw(
                                      repeatDatesRaw.filter((d) => d !== day)
                                    );
                                  }
                                }}
                                className="mr-2"
                              />
                              {day}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {repetitiveType === "Monthly" && (
                      <div className="mb-4 col-span-4 w-full bg-blue-300 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700">
                          Select Repeating Dates
                        </label>
                        <DatePicker
                          multiple
                          value={repeatDatesRaw}
                          onChange={setRepeatDatesRaw}
                          format="YYYY-MM-DD"
                          className="border mt-1 p-2 rounded-md w-[100%]"
                          placeholder="Select Dates"
                        />
                      </div>
                    )}

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
                        onClick={(e) => {
                          try {
                            if (e.target.showPicker) {
                              e.target.showPicker();
                            }
                          } catch (error) {}
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            try {
                              if (e.target.showPicker) {
                                e.target.showPicker();
                              }
                            } catch (error) {}
                          }
                        }}
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
                        onClick={(e) => {
                          try {
                            if (e.target.showPicker) {
                              e.target.showPicker();
                            }
                          } catch (error) {}
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            try {
                              if (e.target.showPicker) {
                                e.target.showPicker();
                              }
                            } catch (error) {}
                          }
                        }}
                        {...register("repeatEndTime", {})}
                      />
                      {errors.repeatEndtTime && (
                        <p className="text-red-600 text-sm px-2">
                          {errors.repeatEndTime.message}*
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

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
                        if (thumbnailRef.current)
                          thumbnailRef.current.value = "";
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
                    <img
                      src={posterPreview}
                      alt="Poster Preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPosterImage(null);
                        setPosterPreview(null);
                        setValue("media.posterImage", null);
                        if (posterInputRef.current) {
                          posterInputRef.current.value = ""; // Reset file input
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
                  <p className="text-gray-600">
                    {selectedImages.length} file(s) selected
                  </p>
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
                          onChange={(e) =>
                            handleLinkChange(index, e.target.value)
                          }
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
                    onChange={() => setMetaTitleEdited(true)}
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
                    // {...register("seo.metaTags", {
                    //   required: "Meta Tag is required",
                    // })}
                    value={metaTags.join(", ")}
                    onChange={(e) => {
                      setMetaTagsManuallyEdited(true);
                      const tagsArray = e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean);
                      setValue("seo.metaTags", tagsArray);
                    }}
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
                    id="metaDescription"
                    className="mt-1 block w-full border rounded-md p-2 resize-y"
                    placeholder="Enter your Meta description"
                    {...register("seo.metaDescription", {
                      required: "Meta Description is required",
                    })}
                    onChange={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = `${e.target.scrollHeight}px`;
                      setMetaDescEdited(true);
                      setValue("seo.metaDescription", e.target.value);
                    }}
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

              {showTicketForm && selectedRadio === "Tickets" && (
                <form
                  onSubmit={handleCreateTicket}
                  className="w-full max-w-8xl px-1 sm:px-4 lg:px-8 xl:px-0 lg:ml-0 lg:mr-auto p-2 bg-gray-100 rounded-lg space-y-6"
                >
                  <h2 className="text-3xl font-semibold mb-6 text-[#ff2459]">
                    CREATE TICKET
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-1 font-medium">Title*</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        onChange={(e) => setPrice(e.target.value)}
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
                        onChange={(e) => setOrder(e.target.value)}
                        placeholder="Display Order"
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium">
                        Total Ticket Quantity*
                      </label>
                      <input
                        type="number"
                        value={totalTicketQuantity}
                        onChange={(e) => setTotalTicketQuantity(e.target.value)}
                        placeholder="Total Quantity"
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium">
                        Limit Per Customer*
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={limitPerCustomer}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            setLimitPerCustomer("");
                          } else {
                            const numValue = parseFloat(value);
                            if (!isNaN(numValue) && numValue >= 0) {
                              setLimitPerCustomer(numValue);
                            }
                          }
                        }}
                        onBlur={(e) => {
                          if (e.target.value === "") {
                            setLimitPerCustomer(0);
                          }
                        }}
                        placeholder="Limit per customer"
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium">
                        Sale Price
                      </label>
                      <input
                        type="number"
                        value={salePrice}
                        onChange={(e) => setSalePrice(e.target.value)}
                        placeholder="Optional Sale Price"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium">
                        Sale Start Date
                      </label>
                      <input
                        type="datetime-local"
                        value={saleStartDate}
                        onChange={(e) => setSaleStartDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium">
                        Sale End Date
                      </label>
                      <input
                        type="datetime-local"
                        value={saleEndDate}
                        onChange={(e) => setSaleEndDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium">
                        Promo Codes
                      </label>
                      <input
                        type="text"
                        value={promoCodes}
                        onChange={(e) => setPromoCodes(e.target.value)}
                        placeholder="Comma separated promo codes (e.g. VIP32,EARLYBIRD)"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium">
                        Booked Seats
                      </label>
                      <input
                        type="text"
                        value={bookedSeats}
                        onChange={(e) => setBookedSeats(e.target.value)}
                        placeholder="Comma separated seat numbers (e.g. 1,2,3)"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">
                      Description*
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                        onChange={(e) => setIsDonation(e.target.checked)}
                        className="accent-blue-500"
                      />
                      <span>Is Donation</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSoldOut}
                        onChange={(e) => setIsSoldOut(e.target.checked)}
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
