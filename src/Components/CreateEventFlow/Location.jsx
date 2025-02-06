import { Switch } from "@mui/material";
import Button from "../ReusableComponents/Button";
import React, { useState } from "react";
import { FaMapLocation } from "react-icons/fa6";
import { MdSimCardDownload } from "react-icons/md";

function Location() {
  const [modal, setModal] = useState(false);
  const [venue, setVenue] = useState("");
  const [fileName, setFileName] = useState("");
  const [newData, setNewData] = useState({
    googleVenue: "",
    mapLat: "",
    mapLong: "",
    venueName: "",
    venueUrl: "",
    venueType: "",
    seatedGuestNumber: "",
    standingGuestNumber: "",
    neighbourhood: "",
    address: "",
    city: "",
    zipCode: "",
    description: "",
    amenities: "",
    foodBeverageDeatils: "",
    pricing: "",
    availibility: "",
    country: "",
    img: "",
  });

  const [onlineEvent, setOnlineEvent] = useState({
    onlineLocation: "",
    youtubeCode: "",
    videoCode: "",
  });
  const [onlineData, setOnlineData] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleToggle = (event) => {
    setChecked(event.target.checked);
  };
  const [venueData, setVenueData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setOnlineEvent({ ...newData, [name]: value });
  };

  const handleOnlineData = (e) => {
    e.preventDefault();
    setOnlineData([...onlineData, onlineEvent]);
    setOnlineEvent({
      onlineLocation: "",
      youtubeCode: "",
      videoCode: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setVenueData([...venueData, newData]);
    setNewData({
      googleVenue: "",
      mapLat: "",
      mapLong: "",
      venueName: "",
      venueUrl: "",
      venueType: "",
      seatedGuestNumber: "",
      standingGuestNumber: "",
      neighbourhood: "",
      address: "",
      city: "",
      zipCode: "",
      description: "",
      amenities: "",
      foodBeverageDeatils: "",
      pricing: "",
      availibility: "",
      country: "",
    });
    setModal(false);
  };

  const inputField = [
    {
      label: "Google Search Location",
      type: "text",
      name: "googleVenue",
      value: newData.googleVenue,
      placeholder: "Google Venue",
      minLength: 3,
      maxLength: 100,
    },
    {
      label: "Google Map Lat",
      type: "number",
      name: "mapLat",
      value: newData.mapLat,
      placeholder: "e.g 27.1751448",
      min: -90,
      max: 90,
    },
    {
      label: "Google Map Long",
      type: "number",
      name: "mapLong",
      value: newData.mapLong,
      placeholder: "e.g 27.1751448",
      min: -180,
      max: 180,
    },
    {
      label: "Venue Name",
      type: "text",
      name: "venueName",
      value: newData.venueName,
      placeholder: "",
      minLength: 3,
      maxLength: 100,
    },
    {
      label: "Slug (venue URL)",
      type: "url",
      name: "venueUrl",
      value: newData.venueUrl,
      placeholder: "",
      pattern: "https?://.+",
    },
    {
      label: "Venue Type",
      type: "text",
      name: "venueType",
      value: newData.venueType,
      placeholder: "e.g Theater, Cinema, Stadium",
      minLength: 3,
      maxLength: 50,
    },
    {
      label: "Seated Guest Number",
      type: "number",
      name: "seatedGuestNumber",
      value: newData.seatedGuestNumber,
      placeholder: "",
      min: 0,
      max: 100000,
    },
    {
      label: "Standing Guest Number",
      type: "number",
      name: "standingGuestNumber",
      value: newData.standingGuestNumber,
      placeholder: "",
      min: 0,
      max: 200000,
    },
    {
      label: "Neighbourhood",
      type: "text",
      name: "neighbourhood",
      value: newData.neighbourhood,
      placeholder: "",
      minLength: 3,
      maxLength: 100,
    },
    {
      label: "Address",
      type: "text",
      name: "address",
      value: newData.address,
      placeholder: "",
      minLength: 5,
      maxLength: 150,
    },
    {
      label: "City",
      type: "text",
      name: "city",
      value: newData.city,
      placeholder: "",
      minLength: 2,
      maxLength: 50,
    },
    {
      label: "Zipcode/Pincode",
      type: "number",
      name: "zipCode",
      value: newData.zipCode,
      placeholder: "",
      min: 10000,
      max: 999999,
    },
  ];

  const textAreas = [
    {
      label: "Description",
      name: "description",
      value: newData.description,
      minLength: 10,
      maxLength: 500,
    },
    {
      label: "Amenities",
      name: "amenities",
      value: newData.amenities,
      minLength: 5,
      maxLength: 300,
    },
    {
      label: "Food Beverage Details",
      name: "foodBeverageDetails",
      value: newData.foodBeverageDetails,
      minLength: 5,
      maxLength: 300,
    },
    {
      label: "Pricing",
      name: "pricing",
      value: newData.pricing,
      minLength: 5,
      maxLength: 300,
    },
    {
      label: "Availability",
      name: "availability",
      value: newData.availability,
      minLength: 5,
      maxLength: 300,
    },
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setNewData({ ...newData, img: file }); // Store file in `newData.img`
    } else {
      setFileName("");
    }
  };

  return (
    <div>
      {/* <form onSubmit={handleOnlineData}> */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-medium">Online Event</h1>
          <p className="text-gray-500 text-sm lg:whitespace-nowrap">
            Make Event Hybrid by making it online & Selecting a Venue,Attendee
            can come to Venuewith Tickets and can join online Event Seret
            Details
          </p>
        </div>
        <Switch
          checked={checked}
          onChange={handleToggle}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
      {checked && (
        <div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="onlineLocation"
            >
              online Location
            </label>
            <textarea
              name="onlineLocation"
              value={onlineEvent.onlineLocation}
              onChange={handleChange1}
              min="3"
              max="300"
              className="border w-full py-4 px-2 rounded-md"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="videoCode"
              className="block text-gray-600 font-medium mb-1"
            >
              Video embedded code
            </label>
            <input
              type="text"
              className="lg:w-full w-[90%] mb-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={onlineEvent.videoCode}
              name="videoCode"
              onChange={handleChange1}
              min="3"
              max="100"
            />
          </div>
          <div>
            <label
              htmlFor="youtubecode"
              className="block text-gray-600 font-medium mb-1"
            >
              Youtube embedded code
            </label>
            <input
              type="text"
              className="lg:w-full w-[90%] mb-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={onlineEvent.youtubeCode}
              name="youtubeCode"
              onChange={handleChange1}
              min="3"
              max="100"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2 p-1 pb-3">
        <label htmlFor="event venue" className="p">
          Event Venue(optional)
        </label>
        <select
          value={venue}
          className="border p-1 text-gray-600"
          onChange={(e) => setVenue(e.target.value)}
        >
          <option value="">--Select Venues --</option>
          <option value="France show town">France Show Town</option>
          <option value="Italy Street Show">Italy Street Show</option>
          <option value="Lemmy valley hall">Lemmyy Valley Hall</option>
        </select>
      </div>
      <button
        onClick={() => setModal(true)}
        className="flex gap-2 p-2 px-2 rounded-md bg-black text-white"
      >
        <FaMapLocation className="relative top-1" />
        Create Venue
      </button>

      <button
        type="submit"
        className="bg-blue-500 gap-2 mt-3  text-xl flex  w-[max-content] text-white py-2 px-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        <MdSimCardDownload className="relative top-1 " />
        Save
      </button>

      {modal && (
        <>
          <div className="fixed w-full h-[100vh]   inset-0 flex flex-col  justify-center items-center bg-transparent z-70 backdrop-blur-sm overflow-x-hidden ">
            <div className="bg-white p-6 lg:mt-[1080px] md:mt-[870px] mt-[1200px] rounded-lg shadow-lg w-[90%] lg:w-[70%]">
              <form
              
                className=" p-3 grid lg:grid-col-1 md:grid-col-2  grid-col-2"
              >
                <div className="flex gap-2 justify-between border-b p-2">
                  <h1 className="lg:text-2xl md:text-xl font-medium">
                    New Venue
                  </h1>
                  <Button
                    text={"X"}
                    variant={"primary"}
                    rounded={"rounded-xl"}
                    onClick={() => {
                      setModal(false);
                      setNewData({
                        googleVenue: "",
                        mapLat: "",
                        mapLong: "",
                        venueName: "",
                        venueUrl: "",
                        venueType: "",
                        seatedGuestNumber: "",
                        standingGuestNumber: "",
                        neighbourhood: "",
                        address: "",
                        city: "",
                        zipCode: "",
                        description: "",
                        amenities: "",
                        foodBeverageDeatils: "",
                        pricing: "",
                        availibility: "",
                        country: "",
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col items-start space-y-2 w-full pt-2">
                  <label className="font-semibold">
                    Update Venue Single/Multiple Images*
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full focus-within:ring-2 focus-within:ring-blue-500">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      multiple
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex-grow text-sm text-gray-500 truncate cursor-pointer"
                    >
                      {fileName || "Choose Files"}
                    </label>
                    <button
                      className="ml-4 text-blue-500 hover:underline focus:outline-none"
                      onClick={() =>
                        document.getElementById("file-upload").click()
                      }
                    >
                      Browse
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">
                    Upload images of size 1280x720 pixels
                  </p>
                </div>
                <div className="mb-2 pt-2">
                  {inputField.map((item, index) => {
                    return (
                      <div key={index} className="">
                        <label
                          htmlFor={item.label}
                          className="block text-gray-600 font-medium mb-1"
                        >
                          {item.label}
                        </label>
                        <input
                          type={item.type}
                          id={item.label}
                          required
                          className="lg:w-full w-[90%] mb-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={item.placeholder}
                          value={item.value}
                          name={item.name}
                          onChange={handleChange}
                          min={item.min}
                          max={item.max}
                          pattern={item.pattern}
                        />
                      </div>
                    );
                  })}

                  <div>
                    {textAreas.map((item, index) => {
                      return (
                        <div key={index}>
                          <label
                            className="block text-gray-700 font-medium mb-1"
                            htmlFor={item.label}
                          >
                            {item.label}
                          </label>
                          <textarea
                            name={item.name}
                            value={item.value}
                            onChange={handleChange}
                            minLength={item.minLength}
                            maxLength={item.maxLength}
                            className="border w-full py-4 px-2 rounded-md"
                          ></textarea>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mb-4 pt-2 flex flex-col">
                    <label
                      className="block text-gray-700 font-medium mb-1"
                      htmlFor="country"
                    >
                      Select Country
                    </label>
                    <select
                      name="country"
                      value={newData.country}
                      onChange={handleChange}
                      className="border p-1"
                    >
                      <option value="India">India</option>
                      <option value="America">America</option>
                      <option value="Canada">Canada</option>
                      <option value="Russia">Russia</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    className="bg-blue-500 gap-2 mt-3  text-xl flex  w-[max-content] text-white py-2 px-2 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    <MdSimCardDownload className="relative top-1 " />
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {/* </form> */}
    </div>
  );
}

export default Location;
