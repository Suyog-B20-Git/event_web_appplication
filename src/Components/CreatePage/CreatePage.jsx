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
//   const notifySuccess = (person) =>
//     toast.success(`${person} Page created created successfully!`);
//   const handleTagChange = (selectedOptions) => {
//     const newTags = selectedOptions
//       ? selectedOptions.map((option) => option.value)
//       : [];
//     setSelectedTags(newTags);
//   };
//   // const handleSubcategoryChange = (selectedOptions) => {
//   //   const newSubCategory = selectedOptions
//   //     ? selectedOptions.map((option) => option.value)
//   //     : [];
//   //   setSelectedSubCategory(newSubCategory);
//   // };
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
//   const selectedCountry = watch("country");
//   const selectedState = watch("state");
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
//     // {label:"Instagram Url",value:"instagramUrl"},
   
//   ];

//   const tagKeywordList = [
//     { value: "Event Planner", label: "Event Planner" },
//     { value: "Corporate Events", label: "Corporate Events" },
//     { value: "Catering service", label: "Catering service" },
//     { value: "Birthday Organiser", label: "Birthday Organiser" },
//     { value: "Wedding Planner", label: "Wedding Planner" },
//   ];
//   const subCategoryList = selectedCategory
//   ? subCategoryOptions[selectedCategory.value]
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

//   useEffect(() => {
//     if (country) {
//       dispatch(getCountry(country)); 
//     }
//     if (country || state) {
//       dispatch(getState(country, state));
//     }
//     if (country || state || city) {
//       dispatch(getCity(country, state, city));
//     }
//     if (location) {
//       dispatch(getLocation(location));
//     }
//     if (place_id) {
//       dispatch(getLocationDetails(place_id));
//     }
//   }, [dispatch, country, state, city, location, place_id]);
  
//   const store = useSelector((state) => state.countriesReducer) || {
//     countries: [],
//   };
//   const data = store?.countries || []; // Ensure data is always an array
//   const countryOption = data.map((country) => ({
//     value: country,
//     label: country,
//   }));

//   const store1 = useSelector((state) => state.statesReducer) || {
//     states: [],
//   };

//   const data1 = store1?.states || [];
//   const stateOptions = data1.map((states) => ({
//     value: states,
//     label: states,
//   }));

//   const store2 = useSelector((state) => state.citiesReducer) || {
//     cities: [],
//   };

//   const data2 = store2?.cities || [];
//   const cityOptions = data2.map((item) => ({
//     value: item,
//     label: item,
//   }));
//   // console.log(data2);

//   const store3 = useSelector((state) => state.locationsReducer) || {
//     locations: [],
//   };
//   const data3 = Array.isArray(store3?.locations) ? store3.locations : [];
//   const locationOptions = data3.map((item) => ({
//     value: item.place_id,
//     label: item.description,
//   }));
//   // console.log(data3);

//   const store4 = useSelector((state) => state.locationDetailsReducer) || {
//     locationDetails: [],
//   };
//   const data4 = store4.locationDetails ? store4.locationDetails : [];
//   console.log(data4);
//   // Handle Image Selection
//   const [image, setImage] = useState(null);
//   const [coverImage, setCoverImage] = useState(null);
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(file);
//       // setPreview(URL.createObjectURL(file)); // Show image preview
//     }
//   };
//   const handleImageChange1 = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setCoverImage(file);
//       // setPreview(URL.createObjectURL(file)); // Show image preview
//     }
//   };
//   console.log(image);

//   const onSubmit = (data) => {
//     const formData = new FormData();
//     formData.append("profileImage", image); // Append file

//     selectedSubCategory.forEach((subCategory) =>
//       formData.append("categories[]", subCategory)
//     );

//     formData.append("country", data.country);

//     formData.append("state", data.state);
//     formData.append("city", data.city);
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
//       toast.success(`${selectedCategory.value} Page created successfully!`);

//     }

//     console.log("Form Data:", data);

//     setImage(null);
//     setCoverImage(null);

//     reset();
//     setSelectedTags([])
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="bg-white p-10 shadow-md rounded-md lg:pt-12 pt-28 md:pt-8 ">
//       <form onSubmit={handleSubmit(onSubmit)}>
//       <h2 className="text-3xl font-semibold mb-6 text-[#ff2459]">
//                Create a Page
//               </h2>
//   {/* Category Selection */}
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
//               rules={{ required: "Subcategory is required" }} // Required validation added
//               render={({ field, fieldState: { error } }) => (
//                 <>            
//                 <Select
//                   {...field}
//                   options={subCategoryList}
//                   isMulti={selectedCategory?.value !== "Venues"} // Allow multiple for all categories except "Venues"
//                   isDisabled={!selectedCategory}
//                   onChange={(selectedOptions) => {
//                     handleSubcategoryChange(selectedOptions);
//                     // field.onChange(selectedOptions);
//                     field.onChange(
//                       selectedOptions
//                         ? selectedOptions.map((option) => option.value)
//                         : []
//                     );
//                   }}
//                   value={subCategoryList.filter((option) =>
//                     selectedSubCategory.includes(option.value)
//                   )}
//                 />
//                 {error && <span className="text-red-500 text-sm">{error.message}</span>}
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
//                   {...register("url", {
//                     required: `website url is required`,
//                   })}
//                 />
//                 {errors.url && (
//                   <p className="text-red-600 text-sm px-2">
//                     {errors.url.message}*
//                   </p>
//                 )}
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
//               Select Tagkeywords*
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

//   {/*Location*/}
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
//                 name="country"
//                 control={control}
//                 rules={{
//                   required: "Please select an country",
//                 }}
//                 render={({ field }) => (
//                   <Select
//                     {...field}
//                     isClearable // Enables "X" button to clear input
//                     options={countryOption}
//                     placeholder="Search country..."
//                     getOptionLabel={(option) => option.label} // Show venue name
//                     getOptionValue={(option) => option.value} // Ensure unique selection by ID
//                     onInputChange={(value, { action }) => {
//                       if (action === "input-change") {
//                         setCountry(value); // Update search query
//                       }
//                       if (action === "input-blur" || action === "menu-close") {
//                         setCountry(""); // Clear input when dropdown closes
//                       }
//                     }}
//                     onChange={(selectedOption) => {
//                       field.onChange(
//                         selectedOption ? selectedOption.value : null
//                       ); // Store only ID
//                     }}
//                     value={
//                       countryOption.find(
//                         (option) => option.value === field.value
//                       ) || null
//                     } // Maintain selected value
//                   />
//                 )}
//               />
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
//                 name="state"
//                 control={control}
//                 rules={{
//                   required: selectedCountry
//                     ? "Please select a state"
//                     : "Select a country first",
//                 }}
//                 render={({ field }) => (
//                   <Select
//                     {...field}
//                     isClearable // Enables "X" button to clear input
//                     options={stateOptions}
//                     placeholder="Search state..."
//                     isDisabled={!selectedCountry}
//                     getOptionLabel={(option) => option.label} // Show venue name
//                     getOptionValue={(option) => option.value} // Ensure unique selection by ID
//                     onInputChange={(value, { action }) => {
//                       if (action === "input-change") {
//                         setState(value); // Update search query
//                       }
//                       if (action === "input-blur" || action === "menu-close") {
//                         setState(""); // Clear input when dropdown closes
//                       }
//                     }}
//                     onChange={(selectedOption) => {
//                       field.onChange(
//                         selectedOption ? selectedOption.value : null
//                       ); // Store only ID
//                     }}
//                     value={
//                       stateOptions.find(
//                         (option) => option.value === field.value
//                       ) || null
//                     } // Maintain selected value
//                   />
//                 )}
//               />
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
//                 name="city"
//                 control={control}
//                 rules={{
//                   required:
//                     selectedState && selectedCountry
//                       ? "Please select a city"
//                       : "Select country and state first",
//                 }}
//                 render={({ field }) => (
//                   <Select
//                     {...field}
//                     isClearable // Enables "X" button to clear input
//                     options={cityOptions} // Disable if no state selected
//                     placeholder="Search city..."
//                     isDisabled={!selectedState}
//                     getOptionLabel={(option) => option.label} // Show venue name
//                     getOptionValue={(option) => option.value} // Ensure unique selection by ID
//                     onInputChange={(value, { action }) => {
//                       if (action === "input-change") {
//                         setCity(value); // Update search query
//                       }
//                       if (action === "input-blur" || action === "menu-close") {
//                         setCity(""); // Clear input when dropdown closes
//                       }
//                     }}
//                     onChange={(selectedOption) => {
//                       field.onChange(
//                         selectedOption ? selectedOption.value : null
//                       ); // Store only ID
//                     }}
//                     value={
//                       cityOptions.find(
//                         (option) => option.value === field.value
//                       ) || null
//                     } // Maintain selected value
//                   />
//                 )}
//               />
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
//                   Website*
//                 </label>
//                 <input
//                   type="url"
//                   name="website"
//                   className="mt-2 block w-full border rounded-md p-2"
//                   placeholder="website"
//                   {...register("website", {
//                     required: "website is required",
//                   })}
//                 />
//                 {errors.website && (
//                   <p className="text-red-600 text-sm px-2">
//                     {errors.website.message}*
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/*FIle*/}
//         <div className=" mt-8 mb-1 font-semibold">
//         <label className="text-sm">Upload profile Image</label>
//         </div>
//         <div className="border p-2 flex flex-col gap-1 ">
//           <input type="file" onChange={handleImageChange} accept="image/*" />
//         </div>

//         <p className="p-2 pt-1 pb-5 text-gray-500">
//           Image size must be less than 2Mb
//         </p>
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
//                       required: `${item.value} is required`,
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
//                     required: `Spotify URL is required`,
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
//                     required: `SoundCloud URL is required`,
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

  const notifySuccess = (person) =>
    toast.success(`${person} Page created created successfully!`);

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
  const selectedCountry = watch("country");
  const selectedState = watch("state");
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
   {label:"Facebook Url",value: "facebookUrl"},
   {label:"Twitter Url",value: "twitterUrl"},
   {label:"Youtube Url",value: "youtubeUrl"},
    // {label:"Instagram Url",value:"instagramUrl"},
   
  ];

  const tagKeywordList = [
    { value: "Event Planner", label: "Event Planner" },
    { value: "Corporate Events", label: "Corporate Events" },
    { value: "Catering service", label: "Catering service" },
    { value: "Birthday Organiser", label: "Birthday Organiser" },
    { value: "Wedding Planner", label: "Wedding Planner" },
  ];
  const subCategoryList = selectedCategory
  ? subCategoryOptions[selectedCategory.value]
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

  useEffect(() => {
    if (country) {
      dispatch(getCountry(country)); 
    }
    if (country || state) {
      dispatch(getState(country, state));
    }
    if (country || state || city) {
      dispatch(getCity(country, state, city));
    }
    if (location) {
      dispatch(getLocation(location));
    }
    if (place_id) {
      dispatch(getLocationDetails(place_id));
    }
  }, [dispatch, country, state, city, location, place_id]);
  
  const store = useSelector((state) => state.countriesReducer) || {
    countries: [],
  };
  
  const data = store?.countries || []; // Ensure data is always an array
  const countryOption = data.map((country) => ({
    value: country,
    label: country,
  }));

  const store1 = useSelector((state) => state.statesReducer) || {
    states: [],
  };

  const data1 = store1?.states || [];
  const stateOptions = data1.map((states) => ({
    value: states,
    label: states,
  }));

  const store2 = useSelector((state) => state.citiesReducer) || {
    cities: [],
  };

  const data2 = store2?.cities || [];
  const cityOptions = data2.map((item) => ({
    value: item,
    label: item,
  }));
  // console.log(data2);

  const store3 = useSelector((state) => state.locationsReducer) || {
    locations: [],
  };
  const data3 = Array.isArray(store3?.locations) ? store3.locations : [];
  const locationOptions = data3.map((item) => ({
    value: item.place_id,
    label: item.description,
  }));
  // console.log(data3);

  const store4 = useSelector((state) => state.locationDetailsReducer) || {
    locationDetails: [],
  };
  const data4 = store4.locationDetails ? store4.locationDetails : [];
  console.log(data4);

  // Handle Image Selection
  const [image, setImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setImageError("Profile image is required");
      return;
    }
  };

  const [imageError, setImageError] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
  
    if (!file) {
      setImageError("Profile image is required");
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
  //   const formData = new FormData();
  //   formData.append("profileImage", image); // Append file

  //   selectedSubCategory.forEach((subCategory) =>
  //     formData.append("categories[]", subCategory)
  //   );

  //   formData.append("country", data.country);

  //   formData.append("state", data.state);
  //   formData.append("city", data.city);
  //   formData.append("location", data.location);
  //   formData.append("name", data.listingTitle);
  //   formData.append("description", data.listingDescription);
  //   formData.append("address", data4.address);
  //   formData.append("googleSearchLocation", data.location);
  //   formData.append("googleSearchLat", data4.location.lat);
  //   formData.append("googleSearchLong", data4.location.lng);

  //   selectedTags.forEach((tag) => formData.append("tags[]", tag));

  //   if (data.phone) formData.append("phoneNumber", data.phone);
  //   if (data.email) formData.append("email", data.email);
  //   if (data.availableTime)
  //     formData.append("availableTime", data.availableTime);
  //   if (data.website) formData.append("website", data.website);
  //   formData.append("facebookUrl", data.facebookUrl);
  //   // formData.append("instagramUrl", data.instagramUrl);
  //   formData.append("youtubeUrl", data.youtubeUrl);
  //   formData.append("twitterUrl", data.twitterUrl);

  //   if (selectedCategory.value === "Performers") {
  //     formData.append("cloudSoundUrl", data.cloudSoundUrl);
  //     formData.append("spotifyUrl", data.spotifyUrl);
  //     dispatch(createNewPerformer(formData));
  //   }

  //   if (selectedCategory.value === "Organiser") {
  //     dispatch(createNewOrganizer(formData));
  //   }
  //   if (selectedCategory.value === "Services") {
  //     dispatch(createNewService(formData));
  //     // notifySuccess(data.listingTitle);
  //   }
  //   if (selectedCategory.value === "Venues") {
  //     formData.append("coverImage", coverImage); // Append file
  //     formData.append("url", data.url);
  //     formData.append("zipcode", data.zipcode);
  //     formData.append("quotedForm", data.quotedForm);
  //     formData.append("foodAndBeveragesDetails", data.foodAndBeveragesDetails);
  //     formData.append("availability", data.availability);
  //     formData.append("pricing", data.pricing);
  //     formData.append("neighbourhoods", data.neighbourhoods);
  //     formData.append("noOfStandingGuest", data.noOfStandingGuest);
  //     formData.append("noOfSeatedGuest", data.noOfSeatedGuest);
  //     formData.append("amenities", data.amenities);
  //     formData.append("type", data.type);

  //     dispatch(createNewVenue(formData));
  //     // notifySuccess(data.listingTitle);
  //     toast.success(`${selectedCategory.value} Page created successfully!`);

  //   }

  //   console.log("Form Data:", data);

  //   setImage(null);
  //   setCoverImage(null);

  //   reset();
  //   setSelectedTags([])
  // };


  const onSubmit = async (data) => {
    const formData = new FormData();
    
    formData.append("profileImage", image);
    selectedSubCategory.forEach((subCategory) => formData.append("categories[]", subCategory));
    formData.append("country", data.country);
    formData.append("state", data.state);
    formData.append("city", data.city);
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
    if (data.availableTime) formData.append("availableTime", data.availableTime);
    if (data.website) formData.append("website", data.website);
    formData.append("facebookUrl", data.facebookUrl);
    formData.append("youtubeUrl", data.youtubeUrl);
    formData.append("twitterUrl", data.twitterUrl);
  
    try {
      let response;
  
      if (selectedCategory.value === "Performers") {
        formData.append("cloudSoundUrl", data.cloudSoundUrl);
        formData.append("spotifyUrl", data.spotifyUrl);
        response = await dispatch(createNewPerformer(formData));
      }
  
      if (selectedCategory.value === "Organiser") {
        response = await dispatch(createNewOrganizer(formData));
      }
  
      if (selectedCategory.value === "Services") {
        response = await dispatch(createNewService(formData));
      }
  
      if (selectedCategory.value === "Venues") {
        formData.append("coverImage", coverImage);
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
        response = await dispatch(createNewVenue(formData));
      }
  
      if (response?.error) {
        console.error("Error in form submission:", response.error);
        toast.error("Submission failed! Please try again.");
      } else {
        toast.success(`${selectedCategory.value} Page created successfully!`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong! Please check your data.");
    }
  
    console.log("Form Data:", formData);
  
    reset();
    setImage(null);
    setCoverImage(null);
    setSelectedTags([]);
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
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 mb-6">
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
              rules={{ required: "Subcategory is required" }} // Required validation added
              render={({ field, fieldState: { error } }) => (
                <>            
                <Select
                  {...field}
                  options={subCategoryList}
                  isMulti={selectedCategory?.value !== "Venues"} // Allow multiple for all categories except "Venues"
                  isDisabled={!selectedCategory}
                  onChange={(selectedOptions) => {
                    handleSubcategoryChange(selectedOptions);
                    // field.onChange(selectedOptions);
                    field.onChange(
                      selectedOptions
                        ? selectedOptions.map((option) => option.value)
                        : []
                    );
                  }}
                  value={subCategoryList.filter((option) =>
                    selectedSubCategory.includes(option.value)
                  )}
                />
                {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </>
              )}
            />
          </div>
          {/*Listing Title*/}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="block font-medium text-gray-700"
            >
              Listing Title*
            </label>
            <input
              type="text"
              name="listingTitle"
              className=" block w-full border rounded-md p-2"
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
                  {...register("url", {
                    required: `website url is required`,
                  })}
                />
                {errors.url && (
                  <p className="text-red-600 text-sm px-2">
                    {errors.url.message}*
                  </p>
                )}
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
          </div>
        )}

        {selectedCategory && selectedCategory.value !== "Venues" && (
          <div className="mb-4 flex flex-col gap-1">
            <label className="font-medium text-gray-700">
              Select Tag keywords*
            </label>
            <Controller
              name="tagKeywords"
              rules={{ required: "TagKeywords are required" }}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={tagKeywordList}
                  isMulti
                  onChange={(selectedOptions) => {
                    handleTagChange(selectedOptions);
                    field.onChange(
                      selectedOptions
                        ? selectedOptions.map((option) => option.value)
                        : []
                    );
                  }}
                  value={tagKeywordList.filter((option) =>
                    selectedTags.includes(option.value)
                  )}
                />
              )}
            />
            {errors.tagKeywords && (
              <p className="text-red-500 text-sm">
                {errors.tagKeywords.message}
              </p>
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
                rules={{
                  required: "Please select an country",
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable // Enables "X" button to clear input
                    options={countryOption}
                    placeholder="Search country..."
                    getOptionLabel={(option) => option.label} // Show venue name
                    getOptionValue={(option) => option.value} // Ensure unique selection by ID
                    onInputChange={(value, { action }) => {
                      if (action === "input-change") {
                        setCountry(value); // Update search query
                      }
                      if (action === "input-blur" || action === "menu-close") {
                        setCountry(""); // Clear input when dropdown closes
                      }
                    }}
                    onChange={(selectedOption) => {
                      field.onChange(
                        selectedOption ? selectedOption.value : null
                      ); // Store only ID
                    }}
                    value={
                      countryOption.find(
                        (option) => option.value === field.value
                      ) || null
                    } // Maintain selected value
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
                rules={{
                  required: selectedCountry
                    ? "Please select a state"
                    : "Select a country first",
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable // Enables "X" button to clear input
                    options={stateOptions}
                    placeholder="Search state..."
                    isDisabled={!selectedCountry}
                    getOptionLabel={(option) => option.label} // Show venue name
                    getOptionValue={(option) => option.value} // Ensure unique selection by ID
                    onInputChange={(value, { action }) => {
                      if (action === "input-change") {
                        setState(value); // Update search query
                      }
                      if (action === "input-blur" || action === "menu-close") {
                        setState(""); // Clear input when dropdown closes
                      }
                    }}
                    onChange={(selectedOption) => {
                      field.onChange(
                        selectedOption ? selectedOption.value : null
                      ); // Store only ID
                    }}
                    value={
                      stateOptions.find(
                        (option) => option.value === field.value
                      ) || null
                    } // Maintain selected value
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
                  required:
                    selectedState && selectedCountry
                      ? "Please select a city"
                      : "Select country and state first",
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable // Enables "X" button to clear input
                    options={cityOptions} // Disable if no state selected
                    placeholder="Search city..."
                    isDisabled={!selectedState}
                    getOptionLabel={(option) => option.label} // Show venue name
                    getOptionValue={(option) => option.value} // Ensure unique selection by ID
                    onInputChange={(value, { action }) => {
                      if (action === "input-change") {
                        setCity(value); // Update search query
                      }
                      if (action === "input-blur" || action === "menu-close") {
                        setCity(""); // Clear input when dropdown closes
                      }
                    }}
                    onChange={(selectedOption) => {
                      field.onChange(
                        selectedOption ? selectedOption.value : null
                      ); // Store only ID
                    }}
                    value={
                      cityOptions.find(
                        (option) => option.value === field.value
                      ) || null
                    } // Maintain selected value
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
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 font-medium">Phone*</label>
                <input
                  type="text"
                  {...register("phone", {
                    required: "Phone number is required",
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

              {/*Email*/}
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 font-medium">Email*</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
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

              {/* Time Input Field */}
              <div className="flex flex-col gap-1">
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
              </div>

              {/*Website*/}
              <div>
                <label
                  htmlFor="website"
                  className="block font-medium text-gray-700"
                >
                  Website*
                </label>
                <input
                  type="url"
                  name="website"
                  className="mt-2 block w-full border rounded-md p-2"
                  placeholder="website"
                  {...register("website", {
                    required: "website is required",
                  })}
                />
                {errors.website && (
                  <p className="text-red-600 text-sm px-2">
                    {errors.website.message}*
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/*FIle*/}
        <div className=" mt-8 mb-1 font-semibold">
        <label className="text-sm">Upload Profile Image</label>
        </div>
        <div className="border p-2 flex flex-col gap-1 ">
          <input type="file" onChange={handleImageChange} accept="image/*" />

        </div>
          {imageError && <p className="text-red-500">{imageError}</p>}

        <p className="p-2 pt-1 pb-5 text-gray-500">
          Image size must be less than 2Mb
        </p>
        <hr />

        <div className="flex flex-col gap-6 mt-6">
            <h1 className="text-[#ff2459] text-2xl font-semibold">Social Profiles</h1>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            {/* Phone */}
            {socialProfile.map((item, index) => {
              return (
                <div key={index} className="flex flex-col gap-1">
                  <label className="text-gray-700 font-medium">{item.label}</label>
                  <input
                    type="url"
                    name={item.value}
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder={`Enter ${item.label}`}
                    {...register(item.value, {
                      required: `${item.value} is required`,
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
                  placeholder="Enter Spotify Url"
                  {...register("spotifyUrl", {
                    required: `Spotify URL is required`,
                  })}
                />
                {errors.spotifyUrl && (
                  <p className="text-red-600 text-sm px-2">
                    {errors.spotifyUrl.message}*
                  </p>
                )}
              </div>
            )}
          </div>

          {/* SoundCloud URL */}
          {selectedCategory && selectedCategory.value == "Performers" && (
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-0">
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 font-medium">SoundCloud Url</label>
                <input
                  type="url"
                  name="soundCloudUrl"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="Enter SoundCloud Url"
                  {...register("soundCloudUrl", {
                    required: `SoundCloud URL is required`,
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
        {!check && <p className="text-red-500 text-sm">You must accept the terms.</p>}

        {/* Submit Button */}
        <div className="flex justify-center md:justify-end mr-0 sm:mr-6 mt-4">
          <button
            type="submit"
            className="bg-[#ff2459] text-white p-3 px-6 rounded-lg 
                      shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Submit
          </button>
        </div>

      </form>
    </div>
  );
}

export default CreatePage;