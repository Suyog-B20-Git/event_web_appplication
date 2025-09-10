

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
// import axios from "axios";
import FacebookEmbeded from "../SocialMedia/Facebook";
import InstagramEmbed from "../SocialMedia/Instagram";
import YouTubeProfile from "../SocialMedia/Youtube";
import TwitterEmbed from "../SocialMedia/TwiiterEmbed";
import SoundCloudEmbed from "../SocialMedia/Soundcloud";
import SpotifyEmbed from "../SocialMedia/SpotifyEmbed";
import { useNavigate } from "react-router-dom";
const baseUrl = "http://localhost:5000";


function CreatePage() {
  // const navigate = useNavigate(); 
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

  const [selectedCategory, setSelectedCategory] = useState(null); // NEW

  // const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState("About");
  const navigate = useNavigate();
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

    setSelectedSubCategory(newSubCategory);
  };

  const categoryList = [
    { value: "Organizer", label: "Organizer" },
    { value: "Performer", label: "Performer" },
    { value: "Service", label: "Service" },
    { value: "Venue", label: "Venue" },
  ];

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!selectedCategory) {
        setSubCategoryList([]);
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/api/categories?type=${selectedCategory.value}`);
        const data = await response.json();

        const formatted =
          data.data?.map((sub) => ({
            label: sub.name,
            value: sub.name,
          })) || [];


        setSubCategoryList(formatted);
      } catch (error) {
        setSubCategoryList([]);
      }
    };

    fetchSubCategories();
  }, [selectedCategory]);


  const place_id = watch("location");

  const socialProfile = [
    { label: "Facebook Url", value: "facebookUrl", placeholder: "https://www.facebook.com/abc" },
    { label: "Twitter Url", value: "twitterUrl", placeholder: "https://www.twitter.com/abc" },
    { label: "Youtube Url", value: "youtubeUrl", placeholder: "https://www.youtube.com/@tseries" },
    { label: "Instagram Url", value: "instagramUrl", placeholder: "https://www.instagram.com/Adidas" },
  ];

  const tagKeywordList = [
    { value: "Event Planner", label: "Event Planner" },
    { value: "Corporate Events", label: "Corporate Events" },
    { value: "Catering service", label: "Catering service" },
    { value: "Birthday Organizer", label: "Birthday Organizer" },
    { value: "Wedding Planner", label: "Wedding Planner" },
  ];

  const tagKeywordOptions = {
    Organizer: [
      { value: "Event Planner", label: "Event Planner" },
      { value: "Corporate Events", label: "Corporate Events" },
      { value: "Catering service", label: "Catering service" },
      { value: "Birthday Organizer", label: "Birthday Organizer" },
      { value: "Wedding Planner", label: "Wedding Planner" },
    ],
    Performer: [
      { value: "Band", label: "Band" },
      { value: "Disc Jockey", label: "Disc Jockey" },
      { value: "Sound Artist", label: "Sound Artist" },
      { value: "Stand up Comedian", label: "Stand up Comedian" },
    ],
    Service: [
      { value: "Photography", label: "Photography" },
      { value: "Videography", label: "Videography" },
      { value: "Makeup Artist", label: "Makeup Artist" },
      { value: "Decoration", label: "Decoration" },
      { value: "Catering", label: "Catering" },
    ],
  };

  const [soundcloudUrl, setSoundCloudUrl] = useState("");

  const handleSoundCloudChange = (e) => {
    setSoundCloudUrl(e.target.value);
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

  const [subCategoryList, setSubCategoryList] = useState([]);

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

  useEffect(() => {
    if (place_id) {
      dispatch(getLocationDetails(place_id));
    }
  }, [dispatch, place_id]);

  const store4 = useSelector((state) => state.locationDetailsReducer) || {
    locationDetails: [],
  };
  const data4 = store4.locationDetails ? store4.locationDetails : [];

  // handle page-redirection and data saving

  useEffect(() => {
    const savedData = localStorage.getItem("savedFormData");
    const savedUIState = localStorage.getItem("savedUIState");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      reset(parsedData); // react-hook-form's reset function to preload form
      localStorage.removeItem("savedFormData"); // Clean up
    }
    if (savedUIState) {
      const uiState = JSON.parse(savedUIState);
      setSelectedCountry(uiState.selectedCountry || null);
      setSelectedState(uiState.selectedState || null);
      setSelectedCity(uiState.selectedCity || null);
      setSelectedSubCategory(uiState.selectedSubCategory || []);
      setSelectedTagKeywords(uiState.selectedTagKeywords || []);
      setImage(uiState.image || null);
      localStorage.removeItem("savedUIState");
    }
  }, []);


  // Handle Image Selection
  const [image, setImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [formData, setFormData] = useState({ image: null });
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("No file selected");
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

  // const onSubmit = (data) => {
  //   // if (!captchaValue) {
  //   //   toast.error("Please complete the reCAPTCHA verification.");
  //   //   return;
  //   // }

  //   if (!check) {
  //     setError("You must accept the terms.");
  //     return; // Prevent form submission
  //   }

  //   setError(""); // Clear error if checkbox is checked


  const onSubmit = async (data) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please login first.");
      localStorage.setItem("redirectAfterLogin", "/createPage");
      navigate("/login");
      return;
    }

    try {

      if (!check) {
        setError("Please accept the terms.");
        return;
      }

      setError(""); // Clear checkbox errors
      console.log("All checks passed. Submitting data:", data);


      const formData = new FormData();
      formData.append("profileImage", image); // Append file

      selectedSubCategory.forEach((subCategory) =>
        formData.append("categories[]", subCategory)
      );

      // Use the selected dropdown values, not the form data values
      formData.append("country", selectedCountry ? selectedCountry.label : "");
      formData.append("state", selectedState ? selectedState.label : "");
      formData.append("city", selectedCity ? selectedCity.label : "");
      formData.append("location", data.location);
      formData.append("name", data.listingTitle);
      formData.append("description", data.listingDescription);
      formData.append("address", data4.address);
      formData.append("googleSearchLocation", data.location);
      formData.append("googleSearchLat", data4.location.lat);
      formData.append("googleSearchLong", data4.location.lng);

      //  Update map pin here

      selectedTagKeywords.forEach((tag) => formData.append("tags[]", tag));

      if (data.phone) formData.append("phoneNumber", data.phone);
      if (data.email) formData.append("email", data.email);
      if (data.availableTime)
        formData.append("availableTime", data.availableTime || "9 AM to 6 PM");
      if (data.website) formData.append("website", data.website);
      formData.append("facebookUrl", data.facebookUrl);
      formData.append("instagramUrl", data.instagramUrl);
      formData.append("youtubeUrl", data.youtubeUrl);
      formData.append("twitterUrl", data.twitterUrl);

      if (selectedCategory.value === "Performer") {
        formData.append("soundcloudUrl", data.soundcloudUrl);
        formData.append("spotifyUrl", data.spotifyUrl);
        dispatch(createNewPerformer(formData));
        navigate("/home");
      }

      if (selectedCategory.value === "Organizer") {
        dispatch(createNewOrganizer(formData));
        navigate("/home");
      }

      if (selectedCategory.value === "Service") {
        dispatch(createNewService(formData));
        navigate("/home");
      }

      if (selectedCategory.value === "Venue") {
        formData.append("coverImage", coverImage);
        formData.append("website", data.url);
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
        navigate("/home");
      }

    } catch (error) {
      alert("An error occurred during submission.");
    }
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
        soundcloud: formValues.soundcloudUrl,
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
                    setSelectedCategory(selectedOption); // Set for fetching subcategories
                    setValue("subCategory", []); // Clear subcategories on category change
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
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={subCategoryList}
                  isDisabled={!selectedCategory}
                  onChange={(selectedOptions) => {
                    const values = selectedOptions.map((opt) => opt.value);
                    setSelectedSubCategory(values);
                    setValue("subCategory", values); // sync with react-hook-form
                  }}
                  value={subCategoryList.filter((opt) =>
                    selectedSubCategory.includes(opt.value)
                  )}
                />
              )}
            />
          </div>
        </div>

        {/*Listing Title*/}
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="name" className="block font-semibold text-gray-700">
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
            className="mt-1 block w-full border rounded-md p-2 resize-y"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
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
        {selectedCategory && selectedCategory.value == "Venue" && (
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
                  placeholder="Enter food beverage details"
                  {...register("foodAndBeveragesDetails", {
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
                  placeholder="Enter quoted Form like per hour/day"
                  {...register("quotedForm", {
                  })}
                />
              </div>
            </div>
            <div >
              <label
                htmlFor="availibility"
                className="block text-sm font-medium text-gray-700"
              >
                Availability
              </label>
              <textarea
                name="availability"
                className="mt-1 block w-full border rounded-md mb-3  p-2 "
                placeholder="Enter availability"
                {...register("availability", {
                })}
              />
            </div>


          </div>
        )}

        {selectedCategory?.value !== "Venue" && (
          <div className="mb-4 rounded-lg">
            <label className="block text-gray-700 font-semibold mb-2">
              Select Tag Keywords:
            </label>

            <Select
              isMulti
              options={tagKeywordOptions[selectedCategory?.value] || []}
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map(
                  (option) => option.value
                );
                setSelectedTagKeywords(selectedValues);
              }}
              value={(tagKeywordOptions[selectedCategory?.value] || []).filter(
                (opt) => selectedTagKeywords.includes(opt.value)
              )}
              className="mb-3"
            />

            <div className="flex gap-2 max-w-[500px]">
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="Type to add..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => {
                  if (customTag && !selectedTagKeywords.includes(customTag)) {
                    setSelectedTagKeywords([...selectedTagKeywords, customTag]);
                    setCustomTag(""); // Clear input after adding
                  }
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Add
              </button>
            </div>

            {selectedTagKeywords.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedTagKeywords.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm flex items-center"
                  >
                    {tag}
                    <button
                      className="text-gray-800 hover:text-red-500 font-bold ml-2"
                      onClick={() =>
                        setSelectedTagKeywords(
                          selectedTagKeywords.filter((t) => t !== tag)
                        )
                      }
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Location */}
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
                  required: selectedState
                    ? "Please select a city"
                    : "Select a state first",
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
                      );
                      if (selectedOption) {
                        geocodeAndCenterMap(selectedOption.label);
                      }

                      // Store only ID
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
        {selectedCategory && selectedCategory.value == "Venue" && (
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
        {selectedCategory && selectedCategory.value !== "Venue" && (
          <div className="flex flex-col gap-1 mt-2">
            <h1 className="text-[#ff2459] text-2xl font-semibold mb-2">
              Contact Information
            </h1>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
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

              {/* Available Time */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 font-medium">
                  Available Time*
                </label>
                <input
                  type="text"
                  placeholder="9 AM to 6 PM"
                  {...register("availableTime", {
                    required: "Available time is required",

                  })}
                  className="border p-2 rounded"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        {imageError && <p className="text-red-500">{imageError}</p>}

        <p className="p-2 pt-1 pb-5 text-gray-500">
          Image size must be less than 2MB
        </p>

        {/* Add Cover Image Section - Only for Venues */}
        {selectedCategory?.value === "Venue" && (
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
        {selectedCategory?.value === "Performer" && (
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
          <h1 className="text-[#ff2459] text-2xl font-semibold">
            Social Profiles
          </h1>

          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            {socialProfile.map((item, index) => {
              return (
                <div key={index} className="flex flex-col gap-1">
                  <label className="text-gray-700 font-medium">
                    {item.label}
                  </label>
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
            {selectedCategory && selectedCategory.value == "Performer" && (
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
            {selectedCategory && selectedCategory.value == "Performer" && (
              <div className="grid lg:grid-cols-1 grid-cols-1 gap-6 mt-0">
                <div className="flex flex-col gap-1">
                  <label className="text-gray-700 font-medium">
                    SoundCloud Url
                  </label>
                  <input
                    type="url"
                    name="soundcloudUrl"
                    onChange={handleSoundCloudChange}
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="https://www.soundcloud.com/album/track"
                    {...register("soundcloudUrl", {
                      // required: `SoundCloud URL is required`,
                    })}
                  />
                  {errors.soundcloudUrl && (
                    <p className="text-red-600 text-sm px-2">
                      {errors.soundcloudUrl.message}*
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
            onClick={onPreview}
          >
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
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto min-h-screen p-2 sm:p-4"
      >
        <div className="bg-white p-4 sm:p-6 rounded-md shadow-lg w-[95%] sm:w-3/4 max-w-4xl relative max-h-[72vh] overflow-y-auto mt-20 sm:mt-36">
          {/* Close Button */}
          <button
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-2 right-2 text-gray-900 hover:text-gray-700 text-sm p-0 sm:p-2"
          >
            ✖
          </button>

          <div className="flex flex-col sm:flex-row">
            {/* Left Section */}
            <div className="w-full sm:w-1/3 p-2 sm:p-4">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Listing"
                  className="w-full h-40 object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-40 flex items-center justify-center bg-gray-200 text-gray-500 rounded-md">
                  No Image Available
                </div>
              )}

              <div className="mt-2 space-y-2">
                <p className="text-gray-700 font-semibold">Name:</p>
                <h2 className="font-semibold text-sm sm:text-base">
                  {formData.title || (
                    <span className="text-gray-500">Listing Title Missing</span>
                  )}
                </h2>

                <p className="text-gray-700 font-semibold">Address:</p>
                <p className="text-gray-700 text-sm sm:text-base">
                  {formData.address || (
                    <span className="text-gray-500">Address Not Provided</span>
                  )}
                </p>

                <p className="text-gray-700 font-semibold">Phone:</p>
                <p className="text-gray-700 text-sm sm:text-base">
                  {formData.phone || (
                    <span className="text-gray-500">Phone Missing</span>
                  )}
                </p>

                <p className="text-gray-700 font-semibold">Website:</p>
                <p className="text-gray-700 text-sm sm:text-base">
                  {formData.website || (
                    <span className="text-gray-500">Website Not Available</span>
                  )}
                </p>
              </div>
            </div>

            {/* Right Section: Tabs */}
            <div className="w-full sm:w-2/3 p-2 sm:p-4 border-t sm:border-l">
              <div className="flex overflow-x-auto space-x-2 pb-2 text-sm sm:text-base">
                {[
                  "About",
                  "Facebook",
                  "Twitter",
                  "Instagram",
                  "SoundCloud",
                  "YouTube",
                  "Spotify",
                ].map((tab) => (
                  <button
                    key={tab}
                    className={`py-2 px-3 sm:px-4 transition-all ${activeTab === tab
                      ? "border-b-2 border-blue-500 font-bold"
                      : "text-gray-500"
                      }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-2 sm:p-4 h-80 sm:h-96 overflow-y-auto">
                {activeTab === "About" && (
                  <p>
                    {formData.about || (
                      <span className="text-gray-500">About Info Missing</span>
                    )}
                  </p>
                )}

                {activeTab === "Facebook" &&
                  (formData.socialLinks?.facebook ? (
                    <div className="w-full flex justify-center py-4">
                      <div className="w-full max-w-[800px]">
                        <FacebookEmbeded
                          appId={849920522233544}
                          fbId={formData.socialLinks.facebook}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">Facebook Link Not Provided</p>
                  ))}

                {activeTab === "Twitter" &&
                  (formData.socialLinks?.twitter ? (
                    <p className="font-medium text-lg text-center py-4">
                      <TwitterEmbed twitterUrl={formData.socialLinks.twitter} />
                    </p>
                  ) : (
                    <p className="text-gray-500">Twitter Link Not Provided</p>
                  ))}

                {activeTab === "Instagram" &&
                  (formData.socialLinks?.instagram ? (
                    <InstagramEmbed
                      instagramUrl={formData.socialLinks.instagram}
                    />
                  ) : (
                    <p className="text-gray-500">Instagram Link Not Provided</p>
                  ))}

                {activeTab === "SoundCloud" &&
                  (formData.socialLinks?.soundcloud ? (
                    <p className="text-center mt-2">
                      <SoundCloudEmbed
                        soundcloudUrl={formData.socialLinks.soundcloud}
                      />
                    </p>
                  ) : (
                    <p className="text-gray-500">
                      SoundCloud Link Not Provided
                    </p>
                  ))}

                {activeTab === "YouTube" &&
                  (formData.socialLinks?.youtube ? (
                    <p>
                      <YouTubeProfile
                        youtubeEmbedUrl={formData.socialLinks.youtube}
                      />
                    </p>
                  ) : (
                    <p className="text-gray-500">YouTube Link Not Provided</p>
                  ))}

                {activeTab === "Spotify" &&
                  (formData.socialLinks?.spotify ? (
                    <p>
                      <SpotifyEmbed artistId={formData.socialLinks.spotify} />
                    </p>
                  ) : (
                    <p className="text-gray-500">Spotify Link Not Provided</p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreatePage;

