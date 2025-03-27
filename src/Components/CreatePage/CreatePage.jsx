import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import Select from "react-select";
import { getCountry } from "../../redux/actions/master/location/Country";
import { useDispatch, useSelector } from "react-redux";
import { getState } from "../../redux/actions/master/location/State";
import { getCity } from "../../redux/actions/master/location/City";
import { getLocation } from "../../redux/actions/master/location/location";
import { getLocationDetails } from "../../redux/actions/master/location/locationDetail";
import MapContainer from "./MapComponent";
import { createNewOrganizer } from "../../redux/actions/master/Organizer";
import { toast } from "react-toastify";
import { createNewPerformer } from "../../redux/actions/master/Performers/PostPerformer";
import { createNewService } from "../../redux/actions/master/Services/PostServices";
import { createNewVenue } from "../../redux/actions/master/Venue/postVenue";
import { Country, State, City } from "country-state-city";
import ReCAPTCHA from "react-google-recaptcha";
import { Eye } from "lucide-react"; 
import Modal from "react-modal";

function CreatePage() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [selectedTagKeywords, setSelectedTagKeywords] = useState([]);
  const [customTag, setCustomTag] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState("About");
  
  const handleTagChange = (selectedOptions) => {
    const newTags = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedTags(newTags);
  };
  
  const handleSubcategoryChange = (selectedOptions) => {
    let newSubCategory;
    if (Array.isArray(selectedOptions)) {
      newSubCategory = selectedOptions.map((option) => option.value);
    } else {
      newSubCategory = selectedOptions ? [selectedOptions.value] : [];
    }

    console.log("Updated SubCategory:", newSubCategory); // Debugging log
    setSelectedSubCategory(newSubCategory);
  };

  const categoryList = [
    { value: "Organiser", label: "Organiser" },
    { value: "Performers", label: "Performers" },
    { value: "Services", label: "Services" },
    { value: "Venues", label: "Venues" },
  ];

  const selectedCategory = watch("category");
  // const selectedSubCategories = watch("subCategory") || [];
  // const selectedCountry = watch("country");
  // const selectedState = watch("state");
  const place_id = watch("location");

  const subCategoryOptions = {
    Organiser: [
      { value: "event planner", label: "Event Planner" },
      { value: "wedding planner", label: "Wedding Planner" },
      { value: "adventure", label: "Adventure" },
    ],
    Performers: [
      { value: "band", label: "Band" },
      { value: "disc jockey", label: "Disc Jockey" },
      { value: "sound artist", label: "Sound Artist" },
      { value: "stand up comedian", label: "Stand Up Comedian" },
    ],
    Services: [
      { value: "anchor", label: "Anchor" },
      { value: "decor", label: "Decor" },
      { value: "entertainer", label: "Entertainer" },
      { value: " party supplier", label: "Party Supplier" },
      {
        value: "photography & videography",
        label: "Photography & Videography",
      },
      { value: "promoter", label: "Promoters" },
      { value: "dance studio", label: "Dance Studio" },
    ],
    Venues: [
      { value: "outdoor", label: "Outdoor" },
      { value: "indoor", label: "Indoor" },
    ],
  };

  const socialProfile = [
  { label: "Facebook Url", value: "facebookUrl", placeholder: "https://www.facebook.com/abc" },
  { label: "Twitter Url", value: "twitterUrl", placeholder: "https://www.twitter.com/abc" },
  { label: "Youtube Url", value: "youtubeUrl", placeholder: "https://www.youtube.com/watch?V=abc123" },
  { label: "Instagram Url", value: "instagramUrl", placeholder: "https://www.instagram.com/Adidas" },
];

  const tagKeywordList = [
    { value: "Event Planner", label: "Event Planner" },
    { value: "Corporate Events", label: "Corporate Events" },
    { value: "Catering service", label: "Catering service" },
    { value: "Birthday Organiser", label: "Birthday Organiser" },
    { value: "Wedding Planner", label: "Wedding Planner" },
  ];

  const tagKeywordOptions = {
    Organiser: [
      { value: "Event Planner", label: "Event Planner" },
      { value: "Corporate Events", label: "Corporate Events" },
      { value: "Catering service", label: "Catering service" },
      { value: "Birthday Organiser", label: "Birthday Organiser" },
      { value: "Wedding Planner", label: "Wedding Planner" },
    ],
    Performers: [
      { value: "Band", label: "Band" },
      { value: "Disc Jockey", label: "Disc Jockey" },
      { value: "Sound Artist", label: "Sound Artist" },
    ],
    Services: [
      { value: "Photography", label: "Photography" },
      { value: "Videography", label: "Videography" },
      { value: "Makeup Artist", label: "Makeup Artist" },
      { value: "Decoration", label: "Decoration" },
      { value: "Catering", label: "Catering" },
    ],
  };
  
  const handleTagKeywordChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setSelectedTagKeywords([...selectedValues, ...selectedTagKeywords.filter(tag => !tagKeywordList.some(t => t.value === tag))]);
  };
  
  
  const handleCustomTagChange = (e) => {
    setCustomTag(e.target.value);
  };
  
  const addCustomTag = () => {
    if (customTag.trim() !== "") {
      setSelectedTagKeywords([...selectedTagKeywords, customTag.trim()]);
      setCustomTag(""); // Reset input
    }
  };
  
  const handleCustomTagAdd = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      const newTag = event.target.value.trim();
      if (!selectedTagKeywords.includes(newTag)) {
        setSelectedTagKeywords([...selectedTagKeywords, newTag]);
      }
      event.target.value = ""; // Clear input after adding
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setSelectedTagKeywords(selectedTagKeywords.filter(tag => tag !== tagToRemove));
  };
  
  useEffect(() => {
    setSelectedTagKeywords([]); // Clear tag keywords when category changes
  }, [selectedCategory]);
  
  const subCategoryList = selectedCategory
  ? subCategoryOptions[selectedCategory?.value] || []
  : [];

  const validateBusinessHours = (value) => {
    if (!value) return "Time is required";
    const [hours, minutes] = value.split(":").map(Number);
    if (hours < 9 || hours > 18 || (hours === 18 && minutes > 0)) {
      return "Please select a time between 9:00 AM and 6:00 PM";
    }
    return true;
  };
 
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));
  
  const stateOptions = selectedCountry
  ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
      value: state.isoCode,
      label: state.name,
    }))
  : [];

  
  const cityOptions = selectedState
  ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map((city) => ({
      value: city.name,
      label: city.name,
    }))
  : [];

  useEffect(() => {
    if (location) {
      console.log("Fetching locations for:", location);
      dispatch(getLocation(location));
    }
  }, [dispatch, location]);
  
  const store3 = useSelector((state) => state.locationsReducer) || {
    locations: [],
  };
  const data3 = Array.isArray(store3?.locations) ? store3.locations : [];
  const locationOptions = data3.map((item) => ({
    value: item.place_id,
    label: item.description,
  }));
  console.log("Location Store Data:", store3);

  useEffect(() => {
    if (place_id) {
      console.log("Fetching location details for:", place_id);
      dispatch(getLocationDetails(place_id));
    }
  }, [dispatch, place_id]);
  
  const store4 = useSelector((state) => state.locationDetailsReducer) || {
    locationDetails: [],
  };
  const data4 = store4.locationDetails ? store4.locationDetails : [];
  console.log("Location Details Data:", data4);

  // Handle Image Selection
  const [image, setImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [imageError, setImageError] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
  
    if (!file) {
      setImageError("Image is required");
      return;
    }
  
    if (file.size > 2 * 1024 * 1024) {
      setImageError("File size must be less than 2MB");
      return;
    }
  
    setImage(file);
    setImageError(""); // Clear previous error if valid image is selected
  };
  

  console.log(image);

  const onSubmit = (data) => {
    if (!captchaValue) {
      toast.error("Please complete the reCAPTCHA verification.");
      return;
    }

    if (!check) {
      setError("You must accept the terms.");
      return; // Prevent form submission
    }
  
    setError(""); // Clear error if checkbox is checked
  
    const formData = new FormData();
    formData.append("profileImage", image); // Append file

    selectedSubCategory.forEach((subCategory) =>
      formData.append("categories[]", subCategory)
    );
    formData.append("country", selectedCountry ? selectedCountry.label : "");
    formData.append("state", selectedState ? selectedState.label : "");
    formData.append("city", selectedCity ? selectedCity.label : "");
    
    // formData.append("country", data.country);
    // formData.append("state", data.state);
    // formData.append("city", data.city);
    formData.append("location", data.location);
    formData.append("name", data.listingTitle);
    formData.append("description", data.listingDescription);
    formData.append("address", data4.address);
    formData.append("googleSearchLocation", data.location);
    formData.append("googleSearchLat", data4.location.lat);
    formData.append("googleSearchLong", data4.location.lng);

    selectedTags.forEach((tag) => formData.append("tags[]", tag));

    if (data.phone) formData.append("phoneNumber", data.phone);
    if (data.email) formData.append("email", data.email);
    if (data.availableTime)
      formData.append("availableTime", data.availableTime);
    if (data.website) formData.append("website", data.website);
    formData.append("facebookUrl", data.facebookUrl);
    formData.append("instagramUrl", data.instagramUrl);
    formData.append("youtubeUrl", data.youtubeUrl);
    formData.append("twitterUrl", data.twitterUrl);

    if (selectedCategory.value === "Performers") {
      formData.append("cloudSoundUrl", data.cloudSoundUrl);
      formData.append("spotifyUrl", data.spotifyUrl);
      dispatch(createNewPerformer(formData));
    }

    if (selectedCategory.value === "Organiser") {
      dispatch(createNewOrganizer(formData));
    }
    if (selectedCategory.value === "Services") {
      dispatch(createNewService(formData));
      // notifySuccess(data.listingTitle);
    }
    if (selectedCategory.value === "Venues") {
      formData.append("coverImage", coverImage); // Append file
      formData.append("url", data.url);
      formData.append("zipcode", data.zipcode);
      formData.append("quotedForm", data.quotedForm);
      formData.append("foodAndBeveragesDetails", data.foodAndBeveragesDetails);
      formData.append("availability", data.availability);
      formData.append("pricing", data.pricing);
      formData.append("neighbourhoods", data.neighbourhoods);
      formData.append("noOfStandingGuest", data.noOfStandingGuest);
      formData.append("noOfSeatedGuest", data.noOfSeatedGuest);
      formData.append("amenities", data.amenities);
      formData.append("type", data.type);

      dispatch(createNewVenue(formData));
      // notifySuccess(data.listingTitle);
      // toast.success(`${selectedCategory.value} Page created successfully!`);

    }

    console.log("Form Data:", data);

    // setImage(null);
    // setCoverImage(null);

    // reset();
    // setSelectedTags([])
  };

  const onPreview = () => {
    const formValues = watch(); 
    setFormData({
      profileImage: formValues.Image, 
      title: formValues.listingTitle,
      website: formValues.website,
      address: formValues.address,
      phone: formValues.phone,
      time: formValues.availableTime,
      socialLinks: {
        facebook: formValues.facebookUrl,
        twitter: formValues.twitterUrl,
        instagram: formValues.instagramUrl,
        soundcloud: formValues.cloudSoundUrl,
        youtube: formValues.youtubeUrl,
        spotifyUrl: formValues.spotifyUrl,
      },
      about: formValues.listingDescription, 
    });
    setIsPreviewOpen(true);
  };
   
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white p-10 shadow-md rounded-md lg:pt-12 pt-28 md:pt-8 ">
      <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-semibold mb-6 text-[#ff2459]">
         Create a Page
       </h2>
     {/* Category Selection */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mb-6">
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">
              Select Category*
            </label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={categoryList}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    setValue("subCategory", []); // Reset subcategory when category changes
                  }}
                />
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Subcategory Selection */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700 ">
              Select Subcategory*
            </label>
            <Controller
              name="subCategory"
              control={control}
              rules={{ required: "Subcategory is required" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    {...field}
                    options={subCategoryList}
                    isMulti={selectedCategory?.value !== "Venues"} // Multiple selection except for Venues
                    isDisabled={!selectedCategory}
                    onChange={(selectedOptions) => {
                      const values = Array.isArray(selectedOptions)
                        ? selectedOptions.map((option) => option.value)
                        : selectedOptions
                        ? [selectedOptions.value]
                        : [];
                      field.onChange(values);
                      setSelectedSubCategory(values);
                    }}
                    value={subCategoryList.filter((option) =>
                      (field.value || []).includes(option.value) // Ensure field.value is always an array
                    )}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </>
              )}
            />
          </div>
          </div>

          {/*Listing Title*/}
          <div className="flex flex-col gap-1 mb-4">
            <label
              htmlFor="name"
              className="block font-semibold text-gray-700"
            >
              Listing Title*
            </label>
            <input
              type="text"
              name="listingTitle"
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Listing Title"
              {...register("listingTitle", {
                required: "Listing title is required",
              })}
            />
            {errors.listingTitle && (
              <p className="text-red-600 text-sm px-2">
                {errors.listingTitle.message}*
              </p>
            )}
          </div>

        {/*textArea*/}
        <div className="mb-4 ">
          <label
            htmlFor="listing Description"
            className="block font-medium text-gray-700"
          >
            Listing Description*
          </label>
          <textarea
            id="name"
            name="listingDescription"
            className="mt-1 block w-full border rounded-md p-2"
            placeholder="Enter Description"
            {...register("listingDescription", {
              required: "Listing description is required",
            })}
          ></textarea>
          {errors.listingDescription && (
            <p className="text-red-600 text-sm px-2">
              {errors.listingDescription.message}*
            </p>
          )}
        </div>
        {selectedCategory && selectedCategory.value == "Venues" && (
          <div className="flex flex-col gap-1">
            <h1 className="text-[#ff2459] text-2xl mb-2 font-semibold">
              Venue
            </h1>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <input
                type="text"
                name="type"
                className="mt-1 block w-full border rounded-md mb-3  p-2"
                placeholder="eg. cinema,theater,stadium"
                {...register("type", {
                  // required: "amenties is required",
                })}
              />
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 font-medium">Website Url</label>
                <input
                  type="url"
                  name="url"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder={`Enter Website Url`}
                  {...register("url")}
                />
                
              </div>
              <div>
                <label
                  htmlFor="ammenities"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ammenities*
                </label>
                <input
                  type="text"
                  name="amenities"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="Enter Amenities"
                  {...register("amenities", {
                    // required: "amenties is required",
                  })}
                />
              </div>
              <div>
                <label
                  htmlFor="NoOfseatedGuest"
                  className="block text-sm font-medium text-gray-700"
                >
                  No of Seated Guest*
                </label>
                <input
                  type="number"
                  name="noOfSeatedGuest"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="Enter no of seated guest"
                  {...register("noOfSeatedGuest", {
                    // required: "No of seated guest is required",
                  })}
                />
              </div>
              <div>
                <label
                  htmlFor="noOfStandingGuest"
                  className="block text-sm font-medium text-gray-700"
                >
                  No of Standing Guest*
                </label>
                <input
                  type="number"
                  name="noOfStandingGuest"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="Enter no of standing guest"
                  {...register("noOfStandingGuest", {
                    // required: "No of seated guest is required",
                  })}
                />
              </div>
              <div>
                <label
                  htmlFor="neighbourhoods"
                  className="block text-sm font-medium text-gray-700"
                >
                  Neighbourhoods
                </label>
                <input
                  type="text"
                  name="neighbourhoods"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="Enter neighbourhood"
                  {...register("neighbourhoods", {
                    // required: "No of seated guest is required",
                  })}
                />
              </div>
              <div>
                <label
                  htmlFor="pricing"
                  className="block text-sm font-medium text-gray-700"
                >
                  pricing
                </label>
                <input
                  type="text"
                  name="pricing"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="Enter pricing"
                  {...register("pricing", {
                    required: "Pricing is required",
                  })}
                />
              </div>
              <div>
                <label
                  htmlFor="foodAndBeveragesDetails"
                  className="block text-sm font-medium text-gray-700"
                >
                  Food and Beverages Details
                </label>
                <input
                  type="text"
                  name="foodAndBeveragesDetails"
                  className="mt-1 block w-full border rounded-md mb-3  p-2"
                  placeholder="enter food beverage details"
                  {...register("foodAndBeveragesDetails", {
                    // required: "amenties is required",
                  })}
                />
              </div>
              <div>
                <label
                  htmlFor="Quoted Form"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quoted Form
                </label>
                <input
                  type="text"
                  name="quotedForm"
                  className="mt-1 block w-full border rounded-md mb-3  p-2"
                  placeholder="enter quoted Form"
                  {...register("quotedForm", {
                    // required: "amenties is required",
                  })}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="availibility"
                className="block text-sm font-medium text-gray-700"
              >
                availability
              </label>
              <input
                type="text"
                name="availability"
                className="mt-1 block w-full border rounded-md mb-3  p-2"
                placeholder="enter availability"
                {...register("availability", {
                  // required: "amenties is required",
                })}
              />
            </div>

            {selectedCategory?.value === "Venues" && (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            {/* Start Hour */}
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700">Start Hour*</label>
              <div className="flex gap-2">
                <input
                  type="time"
                  {...register("startHour", { required: "Start Hour is required" })}
                  className="block w-full border rounded-md p-2"
                />
                <select
                  {...register("startMeridian", { required: "Select AM/PM" })}
                  className="border rounded-md p-2"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              {errors.startHour && <p className="text-red-600 text-sm px-2">{errors.startHour.message}*</p>}
              {errors.startMeridian && <p className="text-red-600 text-sm px-2">{errors.startMeridian.message}*</p>}
            </div>

            {/* End Hour */}
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700">End Hour*</label>
              <div className="flex gap-2">
                <input
                  type="time"
                  {...register("endHour", {
                    required: "End Hour is required",
                    validate: (value) => {
                      const startHour = document.querySelector('[name="startHour"]')?.value;
                      const startMeridian = document.querySelector('[name="startMeridian"]')?.value;
                      const endMeridian = document.querySelector('[name="endMeridian"]')?.value;

                      if (!startHour) return "Start Hour is required first";

                      // Convert time to 24-hour format for comparison
                      const convertTo24Hour = (time, meridian) => {
                        let [hour, minute] = time.split(":").map(Number);
                        if (meridian === "PM" && hour !== 12) hour += 12;
                        if (meridian === "AM" && hour === 12) hour = 0;
                        return hour * 60 + minute; // Convert to total minutes for comparison
                      };

                      const startTime = convertTo24Hour(startHour, startMeridian);
                      const endTime = convertTo24Hour(value, endMeridian);

                      return endTime > startTime ? true : "End Hour must be after Start Hour";
                    },
                  })}
                  className="block w-full border rounded-md p-2"
                />
                <select
                  {...register("endMeridian", { required: "Select AM/PM" })}
                  className="border rounded-md p-2"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              {errors.endHour && <p className="text-red-600 text-sm px-2">{errors.endHour.message}*</p>}
              {errors.endMeridian && <p className="text-red-600 text-sm px-2">{errors.endMeridian.message}*</p>}
            </div>
          </div>
        )}

      </div>
    )}

          {selectedCategory?.value !== "Venues" && (
          <div className="mb-4 p-4  rounded-lg shadow-md">
          <label className="block text-gray-700 font-semibold mb-2">Select Tag Keywords:</label>
          <Select
            isMulti
            options={tagKeywordOptions[selectedCategory?.value] || []}
            onChange={handleTagKeywordChange}
            value={(tagKeywordOptions[selectedCategory?.value] || []).filter((opt) =>
              selectedTagKeywords.includes(opt.value)
            )}
            className="mb-3"
          />
          
          <div className="flex gap-2">
            <input
              type="text"
              value={customTag}
              onChange={handleCustomTagChange}
              placeholder="Type to add manually"
              className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <button 
              type="button" 
              onClick={addCustomTag}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>

          {selectedTagKeywords.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedTagKeywords.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm"
                >
                  {tag}
                  <button 
                    className="text-gray-800 hover:text-red-500 font-bold ml-2"
                    onClick={() => handleTagRemove(tag)}
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          )}
          </div>

          )}


    {/*Location*/}
        <div className="flex flex-col gap-1 mt-12">
          <h1 className="text-[#ff2459] text-2xl font-semibold mb-2">
            Location and map
          </h1>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="country"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                Country*{" "}
                {errors.country && (
                  <span className="text-[#ff2459] font-medium">
                    {errors.country.message}
                  </span>
                )}
              </label>
              <Controller
              name="country"
              control={control}
              rules={{ required: "Please select a country" }}
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable
                  options={countryOptions}
                  placeholder="Search country..."
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption); // Updates form state
                    setSelectedCountry(selectedOption); // Updates component state
                    setValue("state", null); // Reset state when country changes
                    setValue("city", null); // Reset city when country changes
                  }}
                  value={selectedCountry}
                />
              )}
            />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                States*{" "}
                {errors.state && (
                  <span className="text-[#ff2459] font-medium">
                    {errors.state.message}
                  </span>
                )}
              </label>
              <Controller
              name="state"
              control={control}
              rules={{ required: "Please select a state" }}
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable
                  isDisabled={!selectedCountry}
                  options={stateOptions}
                  placeholder="Search state..."
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    setSelectedState(selectedOption);
                    setValue("city", null); // Reset city when state changes
                  }}
                  value={selectedState}
                />
              )}
            />
            </div>
          </div>
          <div className="grid lg:mt-4 lg:grid-cols-2 grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="city"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                City*{" "}
                {errors.city && (
                  <span className="text-[#ff2459] font-medium">
                    {errors.city.message}
                  </span>
                )}
              </label>
              <Controller
              name="city"
              control={control}
              rules={{
                required: selectedState ? "Please select a city" : "Select a state first",
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable
                  options={cityOptions}
                  placeholder="Search city..."
                  isDisabled={!selectedState}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    setSelectedCity(selectedOption);
                  }}
                  value={selectedCity}
                />
              )}
            />

            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                Location*{" "}
                {errors.location && (
                  <span className="text-[#ff2459] font-medium">
                    {errors.location.message}
                  </span>
                )}
              </label>
              <Controller
                name="location"
                control={control}
                rules={{
                  required: "Please select an location",
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable // Enables "X" button to clear input
                    options={locationOptions}
                    placeholder="Search location..."
                    getOptionLabel={(option) => option.label} // Show venue name
                    getOptionValue={(option) => option.value} // Ensure unique selection by ID
                    onInputChange={(value, { action }) => {
                      if (action === "input-change") {
                        setLocation(value); // Update search query
                      }
                      if (action === "input-blur" || action === "menu-close") {
                        setLocation(""); // Clear input when dropdown closes
                      }
                    }}
                    onChange={(selectedOption) => {
                      field.onChange(
                        selectedOption ? selectedOption.value : null
                      ); // Store only ID
                    }}
                    value={
                      locationOptions.find(
                        (option) => option.value === field.value
                      ) || null
                    } // Maintain selected value
                  />
                )}
              />
            </div>
          </div>
        </div>
        {selectedCategory && selectedCategory.value == "Venues" && (
          <div className="flex flex-col gap-1 mt-4">
            <input
              type="text"
              {...register("zipCode", {
                required: "ZIP code is required",
                pattern: {
                  value: /^[0-9]{5,6}$/,
                  message: "Enter a valid 5 or 6-digit ZIP code",
                },
              })}
              className="border p-2 rounded w-full"
              placeholder="Enter ZIP Code"
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
            )}
          </div>
        )}

        <div className="my-16">
          <MapContainer location={data4.location} />
        </div>

        {/*Contact Information*/}
        {selectedCategory && selectedCategory.value !== "Venues" && (
          <div className="flex flex-col gap-1 mt-2">
            <h1 className="text-[#ff2459] text-2xl font-semibold mb-2">
              Contact Information
            </h1>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
              {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Phone</label>
              <input
                type="text"
                {...register("phone", {
                  pattern: {
                    value: /^[6-9]\d{9}$/, // Starts with 6-9 and has 10 digits
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
                className="border p-2 rounded"
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Email</label>
              <input
                type="email"
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="border p-2 rounded"
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

              {/* Time Input Field */}
              {/* <div className="flex flex-col gap-1">
                <label className="text-gray-700 font-medium">
                  Select Business Hours (9 AM - 6 PM)*
                </label>
                <input
                  type="time"
                  {...register("availableTime", {
                    validate: validateBusinessHours,
                  })}
                  className="border p-2 rounded"
                />
                {errors.availableTime && (
                  <p className="text-red-500 text-sm">
                    {errors.availableTime.message}
                  </p>
                )}
              </div> */}

              {/*Website*/}
              <div>
                <label
                  htmlFor="website"
                  className="block font-medium text-gray-700"
                >
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  className="mt-2 block w-full border rounded-md p-2"
                  placeholder="website"
                  {...register("website")}
                />
                
              </div>
            </div>
          </div>
        )}

       {/* File Upload Section */}
        <div className="mt-8 mb-1 font-semibold">
          <label className="text-sm">Upload Profile Image*</label>
        </div>

        <div className="border p-2 flex flex-col gap-1">
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </div>
        {imageError && <p className="text-red-500">{imageError}</p>}

        <p className="p-2 pt-1 pb-5 text-gray-500">Image size must be less than 2MB</p>

        {/* Add Cover Image Section - Only for Venues */}
        {selectedCategory?.value === "Venues" && (
          <>
            <div className="mt-4 mb-1 font-semibold">
              <label className="text-sm">Upload Cover Image</label>
            </div>

            <div className="border p-2 flex flex-col gap-1">
              <input 
                type="file" 
                onChange={(e) => setCoverImage(e.target.files[0])} 
                accept="image/*" 
              />
            </div>

            <p className="p-2 pt-1 pb-5 text-gray-500">
              Cover image size must be less than 2MB
            </p>
          </>
        )}

        {/* Add more Image Section - Only for Performers */}
        {selectedCategory?.value === "Performers" && (
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Add More Images</label>
            <input
              type="file"
              multiple
              {...register("extraImages")}
              className="block w-full border rounded-md p-2"
            />
          </div>
        )}
        <hr />

        <div className="flex flex-col gap-6 mt-6">
            <h1 className="text-[#ff2459] text-2xl font-semibold">Social Profiles</h1>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            {socialProfile.map((item, index) => {
              return (
                <div key={index} className="flex flex-col gap-1">
                  <label className="text-gray-700 font-medium">{item.label}</label>
                  <input
                    type="url"
                    name={item.value}
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder={item.placeholder}
                    {...register(item.value, {
                      // required: `${item.value} is required`,
                    })}
                  />
                  {errors[item.value] && (
                    <p className="text-red-600 text-sm px-2">
                      {errors[item.value].message}*
                    </p>
                  )}
                </div>
              );
            })}

           {/* Spotify URL*/}
            {selectedCategory && selectedCategory.value == "Performers" && (
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 font-medium">Spotify Url</label>
                <input
                  type="url"
                  name="spotifyUrl"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="https://open.spotify.com/artist/abc"
                  {...register("spotifyUrl", {
                    // required: `Spotify URL is required`,
                  })}
                />
                {errors.spotifyUrl && (
                  <p className="text-red-600 text-sm px-2">
                    {errors.spotifyUrl.message}*
                  </p>
                )}
              </div>
            )}

          {/* SoundCloud URL */}
          {selectedCategory && selectedCategory.value == "Performers" && (
            <div className="grid lg:grid-cols-1 grid-cols-1 gap-6 mt-0">
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 font-medium">SoundCloud Url</label>
                <input
                  type="url"
                  name="soundCloudUrl"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="https://www.soundcloud.com/album/track"
                  {...register("soundCloudUrl", {
                    // required: `SoundCloud URL is required`,
                  })}
                />
                {errors.soundCloudUrl && (
                  <p className="text-red-600 text-sm px-2">
                    {errors.soundCloudUrl.message}*
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        </div>

        <div className="flex gap-2 mt-8">
        <ReCAPTCHA
          sitekey="YOUR_RECAPTCHA_SITE_KEY"
          onChange={(value) => setCaptchaValue(value)}
        />
        </div>
        
        <div className="flex gap-2 mt-8">
          <input
            type="checkbox"
            name="terms"
            value={check}
            // onChange={(e) => setTerms(e.target.checked)}
            checked={check}
            onChange={() => setCheck(!check)}
          />

          <p className="text-xs font-medium text-gray-600">
            I HAVE READ AND AGREED TO THE FOLLOWING{" "}
            <span className="text-[#ff2459]">TERMS AND CONDITIONS.</span>
          </p>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <div className="flex justify-center md:justify-end mr-0 sm:mr-6 mt-4 gap-4">
          {/* Preview Button */}
          <button
            type="button"
            className="bg-gray-300 text-black p-3 px-3 rounded-lg shadow-md 
                      hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
           onClick={onPreview}>
            <Eye size={20} /> Preview
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#ff2459] text-white p-3 px-6 rounded-lg shadow-md 
                      hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Submit
          </button>
        </div>
      </form>
 
      <Modal
  isOpen={isPreviewOpen}
  onRequestClose={() => setIsPreviewOpen(false)}
  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto min-h-screen"
>
<div className="bg-white p-6 rounded-md shadow-lg w-3/4 max-w-4xl relative max-h-[72vh] overflow-y-auto mt-36">
    
    {/* Close Button */}
    <button
      onClick={() => setIsPreviewOpen(false)}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
    >
      ✖
    </button>

    <div className="flex">
      {/* Left Section*/}
      <div className="w-1/3 p-4">
        <img
          src={formData.image || "https://via.placeholder.com/150?text=No+Image"}
          alt="Listing"
          className="w-full h-40 object-cover rounded-md"
        />
        
        <div className="flex items-center mt-2">
        <p className="text-gray-700 font-semibold ">Name : </p>
        <h2 className="font-semibold">
          {formData.title || <span className="text-gray-500 "> Listing Title Missing</span>}
        </h2>
      </div>
      <div className="flex items-center mt-2">

        <p className="text-gray-700 font-semibold">Address :</p>
        <p className="text-gray-700">
          {formData.address || <span className="text-gray-500"> Address Not Provided</span>}
        </p>
        </div>
        <div className="flex items-center mt-2">

        <p className="text-gray-700 font-semibold">Phone :</p>
        <p className="text-gray-700">
          {formData.phone || <span className="text-gray-500"> Phone Missing</span>}
        </p>
        </div>

        <p className="text-gray-700 font-semibold mt-2 ">Website :</p>
        <p className="text-gray-700">
          {formData.website || <span className="text-gray-500"> Website Not Available</span>}
        </p>
      </div>

      {/* Right Section: Tabs */}
      <div className="w-2/3 p-4 border-l">
      <div className="flex overflow-x-auto space-x-4 pb-2">
        {["About", "Facebook", "Twitter", "Instagram", "SoundCloud", "YouTube", "Spotify"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 transition-all ${
              activeTab === tab ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 h-96 overflow-y-auto">
        {activeTab === "About" && (
          <p>{formData.about || <span className="text-gray-500">About Info Missing</span>}</p>
        )}

        {activeTab === "Facebook" && (
          formData.socialLinks?.facebook ? (
            <div dangerouslySetInnerHTML={{ __html: formData.socialLinks.facebook }} />
          ) : (
            <p className="text-gray-500">Facebook Link Not Provided</p>
          )
        )}
        {activeTab === "Twitter" && (
          formData.socialLinks?.twitter ? (
            <div dangerouslySetInnerHTML={{ __html: formData.socialLinks.twitter }} />
          ) : (
            <p className="text-gray-500">Twitter Link Not Provided</p>
          )
        )}
        {activeTab === "Instagram" && (
          formData.socialLinks?.instagram ? (
            <div dangerouslySetInnerHTML={{ __html: formData.socialLinks.instagram }} />
          ) : (
            <p className="text-gray-500">Instagram Link Not Provided</p>
          )
        )}
        {activeTab === "SoundCloud" && (
          formData.socialLinks?.soundcloud ? (
            <div dangerouslySetInnerHTML={{ __html: formData.socialLinks.soundcloud }} />
          ) : (
            <p className="text-gray-500">SoundCloud Link Not Provided</p>
          )
        )}
        {activeTab === "YouTube" && (
          formData.socialLinks?.youtube ? (
            <div dangerouslySetInnerHTML={{ __html: formData.socialLinks.youtube }} />
          ) : (
            <p className="text-gray-500">YouTube Link Not Provided</p>
          )
        )}
        {activeTab === "Spotify" && (
          formData.socialLinks?.spotify ? (
            <div dangerouslySetInnerHTML={{ __html: formData.socialLinks.spotify }} />
          ) : (
            <p className="text-gray-500">Spotify Link Not Provided</p>
          )
        )}
      </div>
    </div>

    </div>
  </div>
</Modal>

    </div>
  );
}

export default CreatePage;





// import React, { useEffect, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { MdCancel } from "react-icons/md";
// import Select from "react-select";
// import { getCountry } from "../../redux/actions/master/location/Country";
// import { useDispatch, useSelector } from "react-redux";
// import { getState } from "../../redux/actions/master/location/State";
// import { getCity } from "../../redux/actions/master/location/City";
// import { getLocation } from "../../redux/actions/master/location/location";
// import { getLocationDetails } from "../../redux/actions/master/location/locationDetail";
// import MapContainer from "./MapComponent";
// import { createNewOrganizer } from "../../redux/actions/master/Organizer";
// import { toast } from "react-toastify";
// import { createNewPerformer } from "../../redux/actions/master/Performers/PostPerformer";
// import { createNewService } from "../../redux/actions/master/Services/PostServices";
// import { createNewVenue } from "../../redux/actions/master/Venue/postVenue";
// import { Country, State, City } from "country-state-city";

// function CreatePage() {
//   const {
//     control,
//     handleSubmit,
//     watch,
//     setValue,
//     register,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [selectedSubCategory, setSelectedSubCategory] = useState([]);

//   const handleTagChange = (selectedOptions) => {
//     const newTags = selectedOptions
//       ? selectedOptions.map((option) => option.value)
//       : [];
//     setSelectedTags(newTags);
//   };
  
//   const handleSubcategoryChange = (selectedOptions) => {
//     let newSubCategory;
//     if (Array.isArray(selectedOptions)) {
//       newSubCategory = selectedOptions.map((option) => option.value);
//     } else {
//       newSubCategory = selectedOptions ? [selectedOptions.value] : [];
//     }

//     console.log("Updated SubCategory:", newSubCategory); // Debugging log
//     setSelectedSubCategory(newSubCategory);
//   };

//   const categoryList = [
//     { value: "Organiser", label: "Organiser" },
//     { value: "Performers", label: "Performers" },
//     { value: "Services", label: "Services" },
//     { value: "Venues", label: "Venues" },
//   ];

//   const selectedCategory = watch("category");
//   // const selectedSubCategories = watch("subCategory") || [];
//   // const selectedCountry = watch("country");
//   // const selectedState = watch("state");
//   const place_id = watch("location");

//   const subCategoryOptions = {
//     Organiser: [
//       { value: "event planner", label: "Event Planner" },
//       { value: "wedding planner", label: "Wedding Planner" },
//       { value: "adventure", label: "Adventure" },
//     ],
//     Performers: [
//       { value: "band", label: "Band" },
//       { value: "disc jockey", label: "Disc Jockey" },
//       { value: "sound artist", label: "Sound Artist" },
//       { value: "stand up comedian", label: "Stand Up Comedian" },
//     ],
//     Services: [
//       { value: "anchor", label: "Anchor" },
//       { value: "decor", label: "Decor" },
//       { value: "entertainer", label: "Entertainer" },
//       { value: " party supplier", label: "Party Supplier" },
//       {
//         value: "photography & videography",
//         label: "Photography & Videography",
//       },
//       { value: "promoter", label: "Promoters" },
//       { value: "dance studio", label: "Dance Studio" },
//     ],
//     Venues: [
//       { value: "outdoor", label: "Outdoor" },
//       { value: "indoor", label: "Indoor" },
//     ],
//   };

//   const socialProfile = [
//    {label:"Facebook Url",value: "facebookUrl"},
//    {label:"Twitter Url",value: "twitterUrl"},
//    {label:"Youtube Url",value: "youtubeUrl"},
//    {label:"Instagram Url",value:"instagramUrl"},
   
//   ];

//   const tagKeywordList = [
//     { value: "Event Planner", label: "Event Planner" },
//     { value: "Corporate Events", label: "Corporate Events" },
//     { value: "Catering service", label: "Catering service" },
//     { value: "Birthday Organiser", label: "Birthday Organiser" },
//     { value: "Wedding Planner", label: "Wedding Planner" },
//   ];

//   const subCategoryList = selectedCategory
//   ? subCategoryOptions[selectedCategory?.value] || []
//   : [];

//   const validateBusinessHours = (value) => {
//     if (!value) return "Time is required";
//     const [hours, minutes] = value.split(":").map(Number);
//     if (hours < 9 || hours > 18 || (hours === 18 && minutes > 0)) {
//       return "Please select a time between 9:00 AM and 6:00 PM";
//     }
//     return true;
//   };
 
//   const dispatch = useDispatch();
//   const [check, setCheck] = useState(false);
//   const [country, setCountry] = useState("");
//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");
//   const [location, setLocation] = useState("");
//   const [error, setError] = useState(null);
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);

//   const countryOptions = Country.getAllCountries().map((country) => ({
//     value: country.isoCode,
//     label: country.name,
//   }));
  
//   const stateOptions = selectedCountry
//   ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
//       value: state.isoCode,
//       label: state.name,
//     }))
//   : [];

  
//   const cityOptions = selectedState
//   ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map((city) => ({
//       value: city.name,
//       label: city.name,
//     }))
//   : [];

//   useEffect(() => {
//     if (location) {
//       console.log("Fetching locations for:", location);
//       dispatch(getLocation(location));
//     }
//   }, [dispatch, location]);
  
//   const store3 = useSelector((state) => state.locationsReducer) || {
//     locations: [],
//   };
//   const data3 = Array.isArray(store3?.locations) ? store3.locations : [];
//   const locationOptions = data3.map((item) => ({
//     value: item.place_id,
//     label: item.description,
//   }));
//   console.log("Location Store Data:", store3);

//   useEffect(() => {
//     if (place_id) {
//       console.log("Fetching location details for:", place_id);
//       dispatch(getLocationDetails(place_id));
//     }
//   }, [dispatch, place_id]);
  
//   const store4 = useSelector((state) => state.locationDetailsReducer) || {
//     locationDetails: [],
//   };
//   const data4 = store4.locationDetails ? store4.locationDetails : [];
//   console.log("Location Details Data:", data4);

//   // Handle Image Selection
//   const [image, setImage] = useState(null);
//   const [coverImage, setCoverImage] = useState(null);

//   // const handleImageChange1 = (event) => {
//   //   const file = event.target.files[0];
//   //   if (!file) {
//   //     setImageError("Profile image is required");
//   //     return;
//   //   }
//   // };

//   const [imageError, setImageError] = useState("");

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
  
//     if (!file) {
//       setImageError("Image is required");
//       return;
//     }
  
//     if (file.size > 2 * 1024 * 1024) {
//       setImageError("File size must be less than 2MB");
//       return;
//     }
  
//     setImage(file);
//     setImageError(""); // Clear previous error if valid image is selected
//   };
  

//   console.log(image);

//   const onSubmit = (data) => {
//     if (!check) {
//       setError("You must accept the terms.");
//       return; // Prevent form submission
//     }
  
//     setError(""); // Clear error if checkbox is checked
  
//     const formData = new FormData();
//     formData.append("profileImage", image); // Append file

//     selectedSubCategory.forEach((subCategory) =>
//       formData.append("categories[]", subCategory)
//     );
//     formData.append("country", selectedCountry ? selectedCountry.label : "");
//     formData.append("state", selectedState ? selectedState.label : "");
//     formData.append("city", selectedCity ? selectedCity.label : "");
    
//     // formData.append("country", data.country);
//     // formData.append("state", data.state);
//     // formData.append("city", data.city);
//     formData.append("location", data.location);
//     formData.append("name", data.listingTitle);
//     formData.append("description", data.listingDescription);
//     formData.append("address", data4.address);
//     formData.append("googleSearchLocation", data.location);
//     formData.append("googleSearchLat", data4.location.lat);
//     formData.append("googleSearchLong", data4.location.lng);

//     selectedTags.forEach((tag) => formData.append("tags[]", tag));

//     if (data.phone) formData.append("phoneNumber", data.phone);
//     if (data.email) formData.append("email", data.email);
//     if (data.availableTime)
//       formData.append("availableTime", data.availableTime);
//     if (data.website) formData.append("website", data.website);
//     formData.append("facebookUrl", data.facebookUrl);
//     // formData.append("instagramUrl", data.instagramUrl);
//     formData.append("youtubeUrl", data.youtubeUrl);
//     formData.append("twitterUrl", data.twitterUrl);

//     if (selectedCategory.value === "Performers") {
//       formData.append("cloudSoundUrl", data.cloudSoundUrl);
//       formData.append("spotifyUrl", data.spotifyUrl);
//       dispatch(createNewPerformer(formData));
//     }

//     if (selectedCategory.value === "Organiser") {
//       dispatch(createNewOrganizer(formData));
//     }
//     if (selectedCategory.value === "Services") {
//       dispatch(createNewService(formData));
//       // notifySuccess(data.listingTitle);
//     }
//     if (selectedCategory.value === "Venues") {
//       formData.append("coverImage", coverImage); // Append file
//       formData.append("url", data.url);
//       formData.append("zipcode", data.zipcode);
//       formData.append("quotedForm", data.quotedForm);
//       formData.append("foodAndBeveragesDetails", data.foodAndBeveragesDetails);
//       formData.append("availability", data.availability);
//       formData.append("pricing", data.pricing);
//       formData.append("neighbourhoods", data.neighbourhoods);
//       formData.append("noOfStandingGuest", data.noOfStandingGuest);
//       formData.append("noOfSeatedGuest", data.noOfSeatedGuest);
//       formData.append("amenities", data.amenities);
//       formData.append("type", data.type);

//       dispatch(createNewVenue(formData));
//       // notifySuccess(data.listingTitle);
//       // toast.success(`${selectedCategory.value} Page created successfully!`);

//     }

//     console.log("Form Data:", data);

//     // setImage(null);
//     // setCoverImage(null);

//     // reset();
//     // setSelectedTags([])
//   };

//   // const onSubmit = async (data) => {
//   //   const formData = new FormData();
//   //   formData.append("profileImage", image);
//   //   selectedSubCategory.forEach((subCategory) => formData.append("categories[]", subCategory));
//   //   formData.append("country", data.country);
//   //   formData.append("state", data.state);
//   //   formData.append("city", data.city);
//   //   formData.append("location", data.location);
//   //   formData.append("name", data.listingTitle);
//   //   formData.append("description", data.listingDescription);
  
//   //   try {
//   //     let response = null;
  
//   //     if (selectedCategory?.value === "Performers") {
//   //       response = await dispatch(createNewPerformer(formData));
//   //     } else if (selectedCategory?.value === "Organiser") {
//   //       response = await dispatch(createNewOrganizer(formData));
//   //     } else if (selectedCategory?.value === "Services") {
//   //       response = await dispatch(createNewService(formData));
//   //     } else if (selectedCategory?.value === "Venues") {
//   //       response = await dispatch(createNewVenue(formData));
//   //     }
  
//   //     console.log("API Response:", response);
  
//   //     // Check if API response contains an error and show only ONE toast
//   //     if (!response || response?.error || response?.statusCode === 500 || !response?.status) {
//   //       console.error("Error in form submission:", response?.message || "Unknown error");
  
//   //       // Avoid duplicate messages by exiting before the catch block
//   //       toast.error(response?.message || "Something went wrong! Please try again.");
//   //       return; 
//   //     }
  
//   //     // Show success message only if no errors
//   //     toast.success(`${selectedCategory.value} Page created successfully!`);
  
//   //   } catch (error) {
//   //     console.error("Unexpected error:", error);
  
//   //     // Show generic error message only if no previous error message was shown
//   //     toast.error("Something went wrong! Please check your data.");
//   //   }
//   // };
  
//   // const onSubmit = async (data) => {
//   //   const formData = new FormData();
    
//   //   formData.append("profileImage", image);
//   //   selectedSubCategory.forEach((subCategory) => formData.append("categories[]", subCategory));
//   //   formData.append("country", data.country);
//   //   formData.append("state", data.state);
//   //   formData.append("city", data.city);
//   //   formData.append("location", data.location);
//   //   formData.append("name", data.listingTitle);
//   //   formData.append("description", data.listingDescription);
//   //   formData.append("address", data4.address);
//   //   formData.append("googleSearchLocation", data.location);
//   //   formData.append("googleSearchLat", data4.location.lat);
//   //   formData.append("googleSearchLong", data4.location.lng);
//   //   selectedTags.forEach((tag) => formData.append("tags[]", tag));
  
//   //   if (data.phone) formData.append("phoneNumber", data.phone);
//   //   if (data.email) formData.append("email", data.email);
//   //   if (data.availableTime) formData.append("availableTime", data.availableTime);
//   //   if (data.website) formData.append("website", data.website);
//   //   formData.append("facebookUrl", data.facebookUrl);
//   //   formData.append("youtubeUrl", data.youtubeUrl);
//   //   formData.append("twitterUrl", data.twitterUrl);
  
//   //   try {
//   //     let response;
  
//   //     if (selectedCategory.value === "Performers") {
//   //       formData.append("cloudSoundUrl", data.cloudSoundUrl);
//   //       formData.append("spotifyUrl", data.spotifyUrl);
//   //       response = await dispatch(createNewPerformer(formData));
//   //     }
  
//   //     if (selectedCategory.value === "Organiser") {
//   //       response = await dispatch(createNewOrganizer(formData));
//   //     }
  
//   //     if (selectedCategory.value === "Services") {
//   //       response = await dispatch(createNewService(formData));
//   //     }
  
//   //     if (selectedCategory.value === "Venues") {
//   //       formData.append("coverImage", coverImage);
//   //       formData.append("url", data.url);
//   //       formData.append("zipcode", data.zipcode);
//   //       formData.append("quotedForm", data.quotedForm);
//   //       formData.append("foodAndBeveragesDetails", data.foodAndBeveragesDetails);
//   //       formData.append("availability", data.availability);
//   //       formData.append("pricing", data.pricing);
//   //       formData.append("neighbourhoods", data.neighbourhoods);
//   //       formData.append("noOfStandingGuest", data.noOfStandingGuest);
//   //       formData.append("noOfSeatedGuest", data.noOfSeatedGuest);
//   //       formData.append("amenities", data.amenities);
//   //       formData.append("type", data.type);
//   //       response = await dispatch(createNewVenue(formData));
//   //     }
  
//   //     if (response?.error) {
//   //       console.error("Error in form submission:", response.error);
//   //       toast.error("Submission failed! Please try again.");
//   //     } else {
//   //       toast.success(`${selectedCategory.value} Page created successfully!`);
//   //     }
//   //   } catch (error) {
//   //     console.error("Unexpected error:", error);
//   //     toast.error("Something went wrong! Please check your data.");
//   //   }
  
//   //   console.log("Form Data:", formData);
  
//   //   // reset();
//   //   // setImage(null);
//   //   // setCoverImage(null);
//   //   // setSelectedTags([]);
//   // };
  
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="bg-white p-10 shadow-md rounded-md lg:pt-12 pt-28 md:pt-8 ">
//       <form onSubmit={handleSubmit(onSubmit)}>
//       <h2 className="text-3xl font-semibold mb-6 text-[#ff2459]">
//          Create a Page
//        </h2>
//      {/* Category Selection */}
//         <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 mb-6">
//           <div className="flex flex-col gap-1">
//             <label className="text-gray-700 font-medium">
//               Select Category*
//             </label>
//             <Controller
//               name="category"
//               control={control}
//               rules={{ required: "Category is required" }}
//               render={({ field }) => (
//                 <Select
//                   {...field}
//                   options={categoryList}
//                   onChange={(selectedOption) => {
//                     field.onChange(selectedOption);
//                     setValue("subCategory", []); // Reset subcategory when category changes
//                   }}
//                 />
//               )}
//             />
//             {errors.category && (
//               <p className="text-red-500 text-sm">{errors.category.message}</p>
//             )}
//           </div>

//           {/* Subcategory Selection */}
//           <div className="flex flex-col gap-1">
//             <label className="font-medium text-gray-700 ">
//               Select Subcategory*
//             </label>
//             <Controller
//               name="subCategory"
//               control={control}
//               rules={{ required: "Subcategory is required" }}
//               render={({ field, fieldState: { error } }) => (
//                 <>
//                   <Select
//                     {...field}
//                     options={subCategoryList}
//                     isMulti={selectedCategory?.value !== "Venues"} // Multiple selection except for Venues
//                     isDisabled={!selectedCategory}
//                     onChange={(selectedOptions) => {
//                       const values = Array.isArray(selectedOptions)
//                         ? selectedOptions.map((option) => option.value)
//                         : selectedOptions
//                         ? [selectedOptions.value]
//                         : [];
//                       field.onChange(values);
//                       setSelectedSubCategory(values);
//                     }}
//                     value={subCategoryList.filter((option) =>
//                       (field.value || []).includes(option.value) // Ensure field.value is always an array
//                     )}
//                   />
//                   {error && <span className="text-red-500 text-sm">{error.message}</span>}
//                 </>
//               )}
//             />

//           </div>
//           {/*Listing Title*/}
//           <div className="flex flex-col gap-1">
//             <label
//               htmlFor="name"
//               className="block font-medium text-gray-700"
//             >
//               Listing Title*
//             </label>
//             <input
//               type="text"
//               name="listingTitle"
//               className=" block w-full border rounded-md p-2"
//               placeholder="Listing Title"
//               {...register("listingTitle", {
//                 required: "Listing title is required",
//               })}
//             />
//             {errors.listingTitle && (
//               <p className="text-red-600 text-sm px-2">
//                 {errors.listingTitle.message}*
//               </p>
//             )}
//           </div>
//         </div>
//         {/*textArea*/}
//         <div className="mb-4 ">
//           <label
//             htmlFor="listing Description"
//             className="block font-medium text-gray-700"
//           >
//             Listing Description*
//           </label>
//           <textarea
//             id="name"
//             name="listingDescription"
//             className="mt-1 block w-full border rounded-md p-2"
//             placeholder="Enter Description"
//             {...register("listingDescription", {
//               required: "Listing description is required",
//             })}
//           ></textarea>
//           {errors.listingDescription && (
//             <p className="text-red-600 text-sm px-2">
//               {errors.listingDescription.message}*
//             </p>
//           )}
//         </div>
//         {selectedCategory && selectedCategory.value == "Venues" && (
//           <div className="flex flex-col gap-1">
//             <h1 className="text-[#ff2459] text-2xl mb-2 font-semibold">
//               Venue
//             </h1>
//             <div>
//               <label
//                 htmlFor="type"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Type
//               </label>
//               <input
//                 type="text"
//                 name="type"
//                 className="mt-1 block w-full border rounded-md mb-3  p-2"
//                 placeholder="eg. cinema,theater,stadium"
//                 {...register("type", {
//                   // required: "amenties is required",
//                 })}
//               />
//             </div>
//             <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
//               <div className="flex flex-col gap-1">
//                 <label className="text-gray-700 font-medium">Website Url</label>
//                 <input
//                   type="url"
//                   name="url"
//                   className="mt-1 block w-full border rounded-md p-2"
//                   placeholder={`Enter Website Url`}
//                   {...register("url")}
//                 />
                
//               </div>
//               <div>
//                 <label
//                   htmlFor="ammenities"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Ammenities*
//                 </label>
//                 <input
//                   type="text"
//                   name="amenities"
//                   className="mt-1 block w-full border rounded-md p-2"
//                   placeholder="Enter Amenities"
//                   {...register("amenities", {
//                     // required: "amenties is required",
//                   })}
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="NoOfseatedGuest"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   No of Seated Guest*
//                 </label>
//                 <input
//                   type="number"
//                   name="noOfSeatedGuest"
//                   className="mt-1 block w-full border rounded-md p-2"
//                   placeholder="Enter no of seated guest"
//                   {...register("noOfSeatedGuest", {
//                     // required: "No of seated guest is required",
//                   })}
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="noOfStandingGuest"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   No of Standing Guest*
//                 </label>
//                 <input
//                   type="number"
//                   name="noOfStandingGuest"
//                   className="mt-1 block w-full border rounded-md p-2"
//                   placeholder="Enter no of standing guest"
//                   {...register("noOfStandingGuest", {
//                     // required: "No of seated guest is required",
//                   })}
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="neighbourhoods"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Neighbourhoods
//                 </label>
//                 <input
//                   type="text"
//                   name="neighbourhoods"
//                   className="mt-1 block w-full border rounded-md p-2"
//                   placeholder="Enter neighbourhood"
//                   {...register("neighbourhoods", {
//                     // required: "No of seated guest is required",
//                   })}
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="pricing"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   pricing
//                 </label>
//                 <input
//                   type="text"
//                   name="pricing"
//                   className="mt-1 block w-full border rounded-md p-2"
//                   placeholder="Enter pricing"
//                   {...register("pricing", {
//                     required: "Pricing is required",
//                   })}
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="foodAndBeveragesDetails"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Food and Beverages Details
//                 </label>
//                 <input
//                   type="text"
//                   name="foodAndBeveragesDetails"
//                   className="mt-1 block w-full border rounded-md mb-3  p-2"
//                   placeholder="enter food beverage details"
//                   {...register("foodAndBeveragesDetails", {
//                     // required: "amenties is required",
//                   })}
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="Quoted Form"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Quoted Form
//                 </label>
//                 <input
//                   type="text"
//                   name="quotedForm"
//                   className="mt-1 block w-full border rounded-md mb-3  p-2"
//                   placeholder="enter quoted Form"
//                   {...register("quotedForm", {
//                     // required: "amenties is required",
//                   })}
//                 />
//               </div>
//             </div>
//             <div>
//               <label
//                 htmlFor="availibility"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 availability
//               </label>
//               <input
//                 type="text"
//                 name="availability"
//                 className="mt-1 block w-full border rounded-md mb-3  p-2"
//                 placeholder="enter availability"
//                 {...register("availability", {
//                   // required: "amenties is required",
//                 })}
//               />
//             </div>
//           </div>
//         )}

//         {selectedCategory && selectedCategory.value !== "Venues" && (
//           <div className="mb-4 flex flex-col gap-1">
//             <label className="font-medium text-gray-700">
//               Select Tag keywords*
//             </label>
//             <Controller
//               name="tagKeywords"
//               rules={{ required: "TagKeywords are required" }}
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   {...field}
//                   options={tagKeywordList}
//                   isMulti
//                   onChange={(selectedOptions) => {
//                     handleTagChange(selectedOptions);
//                     field.onChange(
//                       selectedOptions
//                         ? selectedOptions.map((option) => option.value)
//                         : []
//                     );
//                   }}
//                   value={tagKeywordList.filter((option) =>
//                     selectedTags.includes(option.value)
//                   )}
//                 />
//               )}
//             />
//             {errors.tagKeywords && (
//               <p className="text-red-500 text-sm">
//                 {errors.tagKeywords.message}
//               </p>
//             )}
//           </div>
//         )}

//     {/*Location*/}
//         <div className="flex flex-col gap-1 mt-12">
//           <h1 className="text-[#ff2459] text-2xl font-semibold mb-2">
//             Location and map
//           </h1>
//           <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
//             <div>
//               <label
//                 htmlFor="country"
//                 className="block text-sm mb-2 font-medium text-gray-700"
//               >
//                 Country*{" "}
//                 {errors.country && (
//                   <span className="text-[#ff2459] font-medium">
//                     {errors.country.message}
//                   </span>
//                 )}
//               </label>
//               <Controller
//   name="country"
//   control={control}
//   rules={{ required: "Please select a country" }}
//   render={({ field }) => (
//     <Select
//       {...field}
//       isClearable
//       options={countryOptions}
//       placeholder="Search country..."
//       onChange={(selectedOption) => {
//         field.onChange(selectedOption); // Updates form state
//         setSelectedCountry(selectedOption); // Updates component state
//         setValue("state", null); // Reset state when country changes
//         setValue("city", null); // Reset city when country changes
//       }}
//       value={selectedCountry}
//     />
//   )}
// />


//             </div>
//             <div>
//               <label
//                 htmlFor="state"
//                 className="block text-sm mb-2 font-medium text-gray-700"
//               >
//                 States*{" "}
//                 {errors.state && (
//                   <span className="text-[#ff2459] font-medium">
//                     {errors.state.message}
//                   </span>
//                 )}
//               </label>
//               <Controller
//   name="state"
//   control={control}
//   rules={{ required: "Please select a state" }}
//   render={({ field }) => (
//     <Select
//       {...field}
//       isClearable
//       isDisabled={!selectedCountry}
//       options={stateOptions}
//       placeholder="Search state..."
//       onChange={(selectedOption) => {
//         field.onChange(selectedOption);
//         setSelectedState(selectedOption);
//         setValue("city", null); // Reset city when state changes
//       }}
//       value={selectedState}
//     />
//   )}
// />


//             </div>
//           </div>
//           <div className="grid lg:mt-4 lg:grid-cols-2 grid-cols-1 gap-6">
//             <div>
//               <label
//                 htmlFor="city"
//                 className="block text-sm mb-2 font-medium text-gray-700"
//               >
//                 City*{" "}
//                 {errors.city && (
//                   <span className="text-[#ff2459] font-medium">
//                     {errors.city.message}
//                   </span>
//                 )}
//               </label>
//               <Controller
//               name="city"
//               control={control}
//               rules={{
//                 required: selectedState ? "Please select a city" : "Select a state first",
//               }}
//               render={({ field }) => (
//                 <Select
//                   {...field}
//                   isClearable
//                   options={cityOptions}
//                   placeholder="Search city..."
//                   isDisabled={!selectedState}
//                   onChange={(selectedOption) => {
//                     field.onChange(selectedOption);
//                     setSelectedCity(selectedOption);
//                   }}
//                   value={selectedCity}
//                 />
//               )}
//             />

//             </div>
//             <div>
//               <label
//                 htmlFor="location"
//                 className="block text-sm mb-2 font-medium text-gray-700"
//               >
//                 Location*{" "}
//                 {errors.location && (
//                   <span className="text-[#ff2459] font-medium">
//                     {errors.location.message}
//                   </span>
//                 )}
//               </label>
//               <Controller
//                 name="location"
//                 control={control}
//                 rules={{
//                   required: "Please select an location",
//                 }}
//                 render={({ field }) => (
//                   <Select
//                     {...field}
//                     isClearable // Enables "X" button to clear input
//                     options={locationOptions}
//                     placeholder="Search location..."
//                     getOptionLabel={(option) => option.label} // Show venue name
//                     getOptionValue={(option) => option.value} // Ensure unique selection by ID
//                     onInputChange={(value, { action }) => {
//                       if (action === "input-change") {
//                         setLocation(value); // Update search query
//                       }
//                       if (action === "input-blur" || action === "menu-close") {
//                         setLocation(""); // Clear input when dropdown closes
//                       }
//                     }}
//                     onChange={(selectedOption) => {
//                       field.onChange(
//                         selectedOption ? selectedOption.value : null
//                       ); // Store only ID
//                     }}
//                     value={
//                       locationOptions.find(
//                         (option) => option.value === field.value
//                       ) || null
//                     } // Maintain selected value
//                   />
//                 )}
//               />
//             </div>
//           </div>
//         </div>
//         {selectedCategory && selectedCategory.value == "Venues" && (
//           <div className="flex flex-col gap-1 mt-4">
//             <input
//               type="text"
//               {...register("zipCode", {
//                 required: "ZIP code is required",
//                 pattern: {
//                   value: /^[0-9]{5,6}$/,
//                   message: "Enter a valid 5 or 6-digit ZIP code",
//                 },
//               })}
//               className="border p-2 rounded w-full"
//               placeholder="Enter ZIP Code"
//             />
//             {errors.zipCode && (
//               <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
//             )}
//           </div>
//         )}

//         <div className="my-16">
//           <MapContainer location={data4.location} />
//         </div>

//         {/*Contact Information*/}
//         {selectedCategory && selectedCategory.value !== "Venues" && (
//           <div className="flex flex-col gap-1 mt-2">
//             <h1 className="text-[#ff2459] text-2xl font-semibold mb-2">
//               Contact Information
//             </h1>
//             <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
//               {/* Phone */}
//               <div className="flex flex-col gap-1">
//                 <label className="text-gray-700 font-medium">Phone*</label>
//                 <input
//                   type="text"
//                   {...register("phone", {
//                     required: "Phone number is required",
//                     pattern: {
//                       value: /^[6-9]\d{9}$/, // Starts with 6-9 and has 10 digits
//                       message: "Enter a valid 10-digit phone number",
//                     },
//                   })}
//                   className="border p-2 rounded"
//                   placeholder="Enter phone number"
//                 />
//                 {errors.phone && (
//                   <p className="text-red-500 text-sm">{errors.phone.message}</p>
//                 )}
//               </div>

//               {/*Email*/}
//               <div className="flex flex-col gap-1">
//                 <label className="text-gray-700 font-medium">Email*</label>
//                 <input
//                   type="email"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value:
//                         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                       message: "Enter a valid email address",
//                     },
//                   })}
//                   className="border p-2 rounded"
//                   placeholder="Enter email"
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm">{errors.email.message}</p>
//                 )}
//               </div>

//               {/* Time Input Field */}
//               <div className="flex flex-col gap-1">
//                 <label className="text-gray-700 font-medium">
//                   Select Business Hours (9 AM - 6 PM)*
//                 </label>
//                 <input
//                   type="time"
//                   {...register("availableTime", {
//                     validate: validateBusinessHours,
//                   })}
//                   className="border p-2 rounded"
//                 />
//                 {errors.availableTime && (
//                   <p className="text-red-500 text-sm">
//                     {errors.availableTime.message}
//                   </p>
//                 )}
//               </div>

//               {/*Website*/}
//               <div>
//                 <label
//                   htmlFor="website"
//                   className="block font-medium text-gray-700"
//                 >
//                   Website
//                 </label>
//                 <input
//                   type="url"
//                   name="website"
//                   className="mt-2 block w-full border rounded-md p-2"
//                   placeholder="website"
//                   {...register("website")}
//                 />
                
//               </div>
//             </div>
//           </div>
//         )}

//         {/* FIle
//         <div className=" mt-8 mb-1 font-semibold">
//         <label className="text-sm">Upload Profile Image</label>
//         </div>
//         <div className="border p-2 flex flex-col gap-1 ">
//           <input type="file" onChange={handleImageChange} accept="image/*" />

//         </div>
//           {imageError && <p className="text-red-500">{imageError}</p>}

//         <p className="p-2 pt-1 pb-5 text-gray-500">
//           Image size must be less than 2Mb
//         </p>
//         <hr /> */}

//        {/* File Upload Section */}
//         <div className="mt-8 mb-1 font-semibold">
//           <label className="text-sm">Upload Profile Image*</label>
//         </div>

//         <div className="border p-2 flex flex-col gap-1">
//           <input type="file" onChange={handleImageChange} accept="image/*" />
//         </div>
//         {imageError && <p className="text-red-500">{imageError}</p>}

//         <p className="p-2 pt-1 pb-5 text-gray-500">Image size must be less than 2MB</p>

//         {/* Add Cover Image Section - Only for Venues */}
//         {selectedCategory?.value === "Venues" && (
//           <>
//             <div className="mt-4 mb-1 font-semibold">
//               <label className="text-sm">Upload Cover Image</label>
//             </div>

//             <div className="border p-2 flex flex-col gap-1">
//               <input 
//                 type="file" 
//                 onChange={(e) => setCoverImage(e.target.files[0])} 
//                 accept="image/*" 
//               />
//             </div>

//             <p className="p-2 pt-1 pb-5 text-gray-500">
//               Cover image size must be less than 2MB
//             </p>
//           </>
//         )}

//         <hr />



//         <div className="flex flex-col gap-6 mt-6">
//             <h1 className="text-[#ff2459] text-2xl font-semibold">Social Profiles</h1>

//             <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
//             {/* Phone */}
//             {socialProfile.map((item, index) => {
//               return (
//                 <div key={index} className="flex flex-col gap-1">
//                   <label className="text-gray-700 font-medium">{item.label}</label>
//                   <input
//                     type="url"
//                     name={item.value}
//                     className="mt-1 block w-full border rounded-md p-2"
//                     placeholder={`Enter ${item.label}`}
//                     {...register(item.value, {
//                       // required: `${item.value} is required`,
//                     })}
//                   />
//                   {errors[item.value] && (
//                     <p className="text-red-600 text-sm px-2">
//                       {errors[item.value].message}*
//                     </p>
//                   )}
//                 </div>
//               );
//             })}

//            {/* Spotify URL*/}
//             {selectedCategory && selectedCategory.value == "Performers" && (
//               <div className="flex flex-col gap-1">
//                 <label className="text-gray-700 font-medium">Spotify Url</label>
//                 <input
//                   type="url"
//                   name="spotifyUrl"
//                   className="mt-1 block w-full border rounded-md p-2"
//                   placeholder="Enter Spotify Url"
//                   {...register("spotifyUrl", {
//                     // required: `Spotify URL is required`,
//                   })}
//                 />
//                 {errors.spotifyUrl && (
//                   <p className="text-red-600 text-sm px-2">
//                     {errors.spotifyUrl.message}*
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* SoundCloud URL */}
//           {selectedCategory && selectedCategory.value == "Performers" && (
//             <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-0">
//               <div className="flex flex-col gap-1">
//                 <label className="text-gray-700 font-medium">SoundCloud Url</label>
//                 <input
//                   type="url"
//                   name="soundCloudUrl"
//                   className="mt-1 block w-full border rounded-md p-2"
//                   placeholder="Enter SoundCloud Url"
//                   {...register("soundCloudUrl", {
//                     // required: `SoundCloud URL is required`,
//                   })}
//                 />
//                 {errors.soundCloudUrl && (
//                   <p className="text-red-600 text-sm px-2">
//                     {errors.soundCloudUrl.message}*
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
      
//         <div className="flex gap-2 mt-8">
//           <input
//             type="checkbox"
//             name="terms"
//             value={check}
//             // onChange={(e) => setTerms(e.target.checked)}
//             checked={check}
//             onChange={() => setCheck(!check)}
//           />

//           <p className="text-xs font-medium text-gray-600">
//             I HAVE READ AND AGREED TO THE FOLLOWING{" "}
//             <span className="text-[#ff2459]">TERMS AND CONDITIONS.</span>
//           </p>
//         </div>
//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         {/* Submit Button */}
//         <div className="flex justify-center md:justify-end mr-0 sm:mr-6 mt-4">
//           <button
//             type="submit"
//             className="bg-[#ff2459] text-white p-3 px-6 rounded-lg 
//                       shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
//           >
//             Submit
//           </button>
//         </div>

//       </form>
//     </div>
//   );
// }

// export default CreatePage;