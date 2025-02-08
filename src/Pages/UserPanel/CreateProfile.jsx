import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Select from "react-select";

function CreateProfile() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [listingTitle, setListingTitle] = useState("");
  const [tagKeyword, setTagKeyword] = useState("");
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
  const [website, setWebsite] = useState("");
  const [photo, setPhoto] = useState(null);
  const [socialProfile, setSocialProfile] = useState({
    instagram: "",
    twitter: "",
    facebook: "",
    video: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [address, setAddress] = useState("");

  const [terms, setTerms] = useState(false);
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

  const [error, setError] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB = 2 * 1024 * 1024 bytes
        setError("File size must be less than 2MB");
        setPhoto(null);
      } else {
        setError(""); // Clear error
        setPhoto(file);
      }
    }
  };

  const [flag, setFlag] = useState(false);
  const handleCloseFlag = () => {
    if (address) {
      setFlag(false);
    }
  };

  if (country && state) {
    console.log(country.value);
    console.log(state.value);
  }
  const countries = [
    { value: "india", label: "india" },
    { value: "america", label: "america " },
    { value: "us", label: "US " },
    { value: "brazill", label: "brazil " },
    { value: "china", label: "china" },
  ];
  const states = [
    { value: "maharashtra", label: "Maharashtra" },
    { value: "u.p", label: " U.P" },
    { value: "m.p", label: "M.P" },
  ];
  const cities = [
    { value: "pune", label: "Pune" },
    { value: "mumbai", label: "Mumbai" },
    { value: "nashik", label: "Nashik" },
    { value: "thane", label: "Thane" },
  ];

  const addresses = ["Kondhwa Pune 48", "Katraj Pune 46", "Aundh Maharsahstra"];

  const filteredAdddress = address
    ? addresses.filter((addr) =>
        addr.toLowerCase().includes(address.toLowerCase())
      )
    : [];

  return (
    <div className="bg-white p-10 shadow-md rounded-md lg:pt-[200px] pt-[120px]">
      <form>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
          {/* Category Selection */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">
              Select Category*
            </label>
            <select
              value={category}
              required
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
                required
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
              required
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
            required
            onChange={(e) => setTagKeyword(e.target.value)}
            className="border p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Enter Description"
            rows="4"
          ></textarea>
        </div>

        {/* Tag keyword*/}
        <div className="flex flex-col gap-1 mt-4 mb-5">
          <label className="text-gray-700 font-medium">Tag Keyword*</label>
          <input
            type="text"
            required
            onChange={(e) => setTagKeyword(e.target.value)}
            placeholder="Listing title"
            className="border p-2 w-full bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={tagKeyword}
          />
        </div>

        <hr />

        {/*Location*/}
        <div className="flex flex-col gap-1 mt-4">
          <h1 className="text-[#ff2459] text-2xl font-semibold">
            Location and map
          </h1>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            <div className="flex flex-col gap-1 mt-4">
              <label htmlFor="country" className="font-medium text-gray-600">
                Select Country*{" "}
                <span className="text-[#ff2459]">
                  Please enter select country.
                </span>
              </label>
              <Select
                options={countries}
                value={country}
                onChange={(selected) => setCountry(selected)}
                isSearchable // Enables search
                placeholder="Select Country"
              />
            </div>
            <div className="flex flex-col gap-1 mt-4">
              <label htmlFor="state" className="font-medium text-gray-600">
                Select State*{" "}
                <span className="text-[#ff2459]">
                  Please enter select state.
                </span>
              </label>
              <Select
                options={states}
                value={state}
                onChange={(selected) => setState(selected)}
                isSearchable // Enables search
                placeholder="Select state"
              />
            </div>
            <div className="flex flex-col gap-1 mt-4">
              <label htmlFor="state" className="font-medium text-gray-600">
                Select City*{" "}
                <span className="text-[#ff2459]">
                  Please enter select city.
                </span>
              </label>
              <Select
                options={cities}
                value={city}
                onChange={(selected) => setCity(selected)}
                isSearchable // Enables search
                placeholder="Select state"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Address*</label>
              <input
                type="text"
                required
                onChange={(e) => {
                  setFlag(true); // Open dropdown when typing
                  setAddress(e.target.value);
                }}
                placeholder="Enter a Location"
                className="border p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={address}
              />
              {/* Search Suggestions Dropdown */}
              {flag && (
                <ul className="absolute right-9 mt-[69px] px-4 lg:w-[713px] lg:max-h-[100px] md:w-[695px] max-h-[100px] w-[320px] overflow-y-scroll pb-2 bg-white border rounded-md shadow-lg overflow-auto">
                  {filteredAdddress.length > 0 ? (
                    filteredAdddress.map((addr) => (
                      <li
                        key={addr}
                        onClick={() => {
                          setAddress(addr);
                          setFlag(false); // Close the dropdown immediately
                        }}
                        className="p-2 mt-1 cursor-pointer hover:bg-gray-200"
                      >
                        {addr}
                      </li>
                    ))
                  ) : (
                    <li className="p-2 text-gray-500">No results found</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/*Contact Information*/}
        <div className="flex flex-col gap-1 mt-4">
          <h1 className="text-[#ff2459] text-2xl font-semibold">
            Contact Information
          </h1>
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Phone*</label>
              <input
                type="tel"
                autoComplete
                required
                onChange={(e) => setPhone(e.target.value)}
                className="border p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={phone}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Email*</label>
              <input
                type="email"
                required
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
                required
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
                required
                autoComplete
                onChange={(e) => setWebsite(e.target.value)}
                className="border p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={website}
              />
            </div>
          </div>
        </div>

        {/*FIle*/}
        <div className="border p-2 mt-8 ">
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {error && <p style={{ color: "red" }}>{error}</p>}
          {photo && <p>Selected file: {photo.name}</p>}
        </div>
        <p className="p-2 pt-1 pb-5 text-gray-600">
          Image size must be less than 2Mb
        </p>
        <hr />

        {/*Socila Profile*/}
        <div className="flex flex-col gap-1 mt-4">
          <h1 className="text-[#ff2459] text-2xl font-semibold">
            Social Profiles
          </h1>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Facebook</label>
              <input
                type="url"
                required
                autoComplete
                placeholder="Https://Facebook.com/Abc"
                onChange={(e) => setSocialProfile(e.target.value)}
                className="border p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={socialProfile.facebook}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Twitter</label>
              <input
                type="url"
                required
                autoComplete
                placeholder="Https://Twitter.com/Abc"
                onChange={(e) => setSocialProfile(e.target.value)}
                className="border p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={socialProfile.twitter}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Video</label>
              <input
                type="url"
                required
                autoComplete
                placeholder="Https://Youtube.com/video1"
                onChange={(e) => setSocialProfile(e.target.value)}
                className="border p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={socialProfile.video}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Instagram</label>
              <input
                type="url"
                required
                placeholder="Https://Instagram.com/Adidas"
                autoComplete
                onChange={(e) => setSocialProfile(e.target.value)}
                className="border p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={socialProfile.instagram}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <input
            type="checkbox"
            required
            name="terms"
            value={terms}
            onChange={(e) => setTerms(e.target.checked)}
            checked={terms}
          />
          <p className="text-xs font-medium text-gray-600">
            I HAVE READ AND AGREED TO THE FOLLOWING{" "}
            <span className="text-[#ff2459]">TERMS AND CONDITIONS.</span>
          </p>
        </div>

        <div className="mt-4 w-full flex justify-end gap-2">
          <button className="text-white bg-green-500 p-2 lg:text-base text-sm  rounded-md font-medium">
            Continue
          </button>
          <button className=" flex gap-2 bg-gray-200 p-2 g:text-base text-sm   rounded-md font-medium">
            <FaEye className="relative top-1" />
            Preview
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProfile;
