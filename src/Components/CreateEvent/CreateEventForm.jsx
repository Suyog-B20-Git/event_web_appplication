// import React, { useState } from "react";

// import { useNavigate } from "react-router-dom";
// import Button from "../ReusableComponents/Button";
// import { GiPartyPopper } from "react-icons/gi";
// import { FcViewDetails } from "react-icons/fc";
// import { MdAccountCircle } from "react-icons/md";
// import EventStepVertical from "../LandingPage/EventStepVertical";
// export default function EventForm() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     state: "",
//     city: "",
//     location: "",
//     venue: "",
//     facebookLink: "",
//     startDate: "",
//     startTime: "",
//     endDate: "",
//     endTime: "",
//     image: null,
//     video: null,
//     description: "",
//     keywords: "",
//     performers: "",
//     performerFacebookLink: "",
//   });
//   const [data, setData] = useState([]);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file") {
//       setFormData((prev) => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted", data);
//     alert("Form submitted successfully!");
//     setData([...data, formData]);
//     setFormData({
//       name: "",
//       state: "",
//       city: "",
//       location: "",
//       venue: "",
//       facebookLink: "",
//       startDate: "",
//       startTime: "",
//       endDate: "",
//       endTime: "",
//       image: null,
//       video: null,
//       description: "",
//       keywords: "",
//       performers: "",
//       performerFacebookLink: "",
//     });
//     navigate("/login");
//   };

//   return (
//     <div className="pb-10 lg:relative lg:right-10 lg:pt-[180px]">
//       <div
//         style={{
//           backgroundImage: "url(/createEvent.png)",
//           backgroundPosition: "center",
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//         }}
//         className="h-24 w-full flex justify-center items-center text-white text-3xl font-semibold"
//       >
//         <h1>Create Event</h1>
//       </div>
//       <div>
//         <div className="flex md:flex-row flex-col lg:gap-48 ">
//           <div className="flex justify-center items-center lg:px-10">
//             <EventStepVertical
//               two={true}
//               step1={"Basic"}
//               step3={"Account"}
//               step2={"Details"}
//               heading
//               i1={<GiPartyPopper />}
//               i2={<FcViewDetails />}
//               i3={<MdAccountCircle />}
//             />
//           </div>
//           <div className="flex flex-col pb-4">
//             <div className="pb-14 flex flex-col pl-96 gap-1 pr-10 pt-10 w-full"></div>
//             <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-xl shadow-md">
//               <h2 className="text-xl font-semibold mb-6">Event Registration</h2>
//               <form onSubmit={handleSubmit}>
//                 {/* Name */}
//                 <div className="mb-4">
//                   <label
//                     htmlFor="name"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Enter Name*
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     className="mt-1 block w-full border rounded-md p-2"
//                     placeholder="Enter your name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* State and City */}
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label
//                       htmlFor="state"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       State
//                     </label>
//                     <select
//                       id="state"
//                       name="state"
//                       className="mt-1 block w-full border rounded-md p-2"
//                       value={formData.state}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select state</option>
//                       <option value="Maharashtra">Maharashtra</option>
//                       <option value="Delhi">Delhi</option>
//                       <option value="Delhi">Mumbai</option>
//                       <option value="Delhi">Nashik</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="city"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       City
//                     </label>
//                     <input
//                       type="text"
//                       id="city"
//                       name="city"
//                       className="mt-1 block w-full border rounded-md p-2"
//                       placeholder="Enter your city"
//                       value={formData.city}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div className="mb-4">
//                   <label
//                     htmlFor="location"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Location
//                   </label>
//                   <input
//                     type="text"
//                     id="location"
//                     name="location"
//                     className="mt-1 block w-full border rounded-md p-2"
//                     placeholder="Enter your location"
//                     value={formData.location}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 {/* Venue and Facebook Link */}
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label
//                       htmlFor="venue"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Venue
//                     </label>
//                     <select
//                       id="venue"
//                       name="venue"
//                       className="mt-1 block w-full border rounded-md p-2"
//                       value={formData.venue}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select a venue</option>
//                       <option value="Stadium">Stadium</option>
//                       <option value="Auditorium">Auditorium</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="facebookLink"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Facebook Link
//                     </label>
//                     <input
//                       type="url"
//                       id="facebookLink"
//                       name="facebookLink"
//                       className="mt-1 block w-full border rounded-md p-2"
//                       placeholder="Enter your Facebook link"
//                       value={formData.facebookLink}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 {/* Start and End Date */}
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label
//                       htmlFor="startDate"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Start Date & Time*
//                     </label>
//                     <input
//                       type="date"
//                       id="startDate"
//                       name="startDate"
//                       className="mt-1 block w-full border rounded-md p-2"
//                       value={formData.startDate}
//                       onChange={handleChange}
//                       required
//                     />
//                     <input
//                       type="time"
//                       id="startTime"
//                       name="startTime"
//                       className="mt-1 block w-full border rounded-md p-2"
//                       value={formData.startTime}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="endDate"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       End Date & Time*
//                     </label>
//                     <input
//                       type="date"
//                       id="endDate"
//                       name="endDate"
//                       className="mt-1 block w-full border rounded-md p-2"
//                       value={formData.endDate}
//                       onChange={handleChange}
//                       required
//                     />
//                     <input
//                       type="time"
//                       id="endTime"
//                       name="endTime"
//                       className="mt-1 block w-full border rounded-md p-2"
//                       value={formData.endTime}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Image and Video Upload */}
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label
//                       htmlFor="image"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Image*
//                     </label>
//                     <input
//                       type="file"
//                       id="image"
//                       name="image"
//                       className="mt-1 block w-full border rounded-md p-2"
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="video"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Video
//                     </label>
//                     <input
//                       type="file"
//                       id="video"
//                       name="video"
//                       className="mt-1 block w-full border rounded-md p-2"
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   {/* Description */}
//                   <div className="mb-4 w-full">
//                     <label
//                       htmlFor="description"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Description
//                     </label>
//                     <input
//                       type="text"
//                       id="description"
//                       name="description"
//                       className="mt-1 block w-full border rounded-md p-2"
//                       placeholder="Enter your description"
//                       value={formData.description}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   {/* Keywords */}
//                   <div className="mb-4 w-full">
//                     <label
//                       htmlFor="keywords"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Event Keywords / Tags
//                     </label>
//                     <input
//                       type="text"
//                       id="keywords"
//                       name="keywords"
//                       className="mt-1 block w-full border rounded-md p-2"
//                       placeholder="Enter your keywords / tags"
//                       value={formData.keywords}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   {/* Performers */}
//                   <div className="mb-4">
//                     <label
//                       htmlFor="performers"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Performers
//                     </label>
//                     <select
//                       id="performers"
//                       name="performers"
//                       className="mt-1 block w-full border rounded-md p-2"
//                       value={formData.performers}
//                       onChange={handleChange}
//                     >
//                       <option value="">Choose Performers</option>
//                       <option value="Band">Band</option>
//                       <option value="Solo">Solo</option>
//                     </select>
//                   </div>

//                   {/* Facebook Link for Performer */}
//                   <div className="mb-4">
//                     <label
//                       htmlFor="performerFacebookLink"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Facebook Link
//                     </label>
//                     <input
//                       type="url"
//                       id="performerFacebookLink"
//                       name="performerFacebookLink"
//                       className="mt-1 block w-full border rounded-md p-2"
//                       placeholder="Add Facebook link"
//                       value={formData.performerFacebookLink}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 {/* Submit Button */}

//                 <div className="flex justify-around p-4">
//                   <Button
//                     text={"previous"}
//                     variant={"normal"}
//                     rounded={"rounded-lg"}
//                     onClick={()=>navigate('/createEvent')}
//                   />
//                   <Button
//                     type={"submit"}
//                     variant={"primary"}
//                     textSize={"text-base"}
//                     text={"Next"}
//                     rounded={"rounded-lg"}
//                     width={"w-20"}
//                     onClick={()=>navigate('/login1')}
//                   />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import Button from "../ReusableComponents/Button";
import { GiPartyPopper } from "react-icons/gi";
import { FcViewDetails } from "react-icons/fc";
import { MdAccountCircle } from "react-icons/md";
import EventStepVertical from "../LandingPage/EventStepVertical";
import Photo1 from "./Photo1";
export default function EventForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    city: "",
    location: "",
    venue: "",
    facebookLink: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    image: null,
    video: null,
    description: "",
    keywords: "",
    performers: "",
    performerFacebookLink: "",
  });
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", data);
    alert("Form submitted successfully!");
    setData([...data, formData]);
    setFormData({
      name: "",
      state: "",
      city: "",
      location: "",
      venue: "",
      facebookLink: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      image: null,
      video: null,
      description: "",
      keywords: "",
      performers: "",
      performerFacebookLink: "",
    });
    navigate("/login");
  };

  return (
    <div className="lg:pt-[160px]  md:pt-[160px] pt-[88px]  lg:h-[140vh] lg:mb-0  ">
      <div className="flex    lg:flex-row lg:h-screen ">
        <Photo1 h={119} />
        <div className="flex flex-col pb-4   ">
          <div className=" flex flex-col  gap-1 lg:pr-10  "></div>
          <div className="lg:w-[110%] max-w-4xl p-6 pl-12 lg:pl-10 lg:pr-10  bg-gray-100 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-6 text-[#ff2459]">Event Registration</h2>
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* State and City */}
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    className="mt-1 block w-full border rounded-md p-2"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option value="">Select state</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Delhi">Mumbai</option>
                    <option value="Delhi">Nashik</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="Enter your location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              {/* Venue and Facebook Link */}
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="venue"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Venue
                  </label>
                  <select
                    id="venue"
                    name="venue"
                    className="mt-1 block w-full border rounded-md p-2"
                    value={formData.venue}
                    onChange={handleChange}
                  >
                    <option value="">Select a venue</option>
                    <option value="Stadium">Stadium</option>
                    <option value="Auditorium">Auditorium</option>
                  </select>
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
                    value={formData.facebookLink}
                    onChange={handleChange}
                  />
                </div>
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
                    className="mt-1 block w-full border rounded-md p-2"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    className="mt-1 block w-full border rounded-md p-2"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                  />
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
                    className="mt-1 block w-full border rounded-md p-2"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    className="mt-1 block w-full border rounded-md p-2"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Image and Video Upload */}
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image*
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="mt-1 block w-full border rounded-md p-2"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="video"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Video
                  </label>
                  <input
                    type="file"
                    id="video"
                    name="video"
                    className="mt-1 block w-full border rounded-md p-2"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                {/* Description */}
                <div className="mb-4 w-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="Enter your description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                {/* Keywords */}
                <div className="mb-4 w-full">
                  <label
                    htmlFor="keywords"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event Keywords / Tags
                  </label>
                  <input
                    type="text"
                    id="keywords"
                    name="keywords"
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="Enter your keywords / tags"
                    value={formData.keywords}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                {/* Performers */}
                <div className="mb-4">
                  <label
                    htmlFor="performers"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Performers
                  </label>
                  <select
                    id="performers"
                    name="performers"
                    className="mt-1 block w-full border rounded-md p-2"
                    value={formData.performers}
                    onChange={handleChange}
                  >
                    <option value="">Choose Performers</option>
                    <option value="Band">Band</option>
                    <option value="Solo">Solo</option>
                  </select>
                </div>

                {/* Facebook Link for Performer */}
                <div className="mb-4">
                  <label
                    htmlFor="performerFacebookLink"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Facebook Link
                  </label>
                  <input
                    type="url"
                    id="performerFacebookLink"
                    name="performerFacebookLink"
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="Add Facebook link"
                    value={formData.performerFacebookLink}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit Button */}

              <div className="flex justify-around p-4">
                <Button
                  text={"previous"}
                  variant={"normal"}
                  rounded={"rounded-lg"}
                  onClick={() => navigate("/createEvent")}
                />
                <Button
                  type={"submit"}
                  variant={"primary"}
                  textSize={"text-base"}
                  text={"Next"}
                  rounded={"rounded-lg"}
                  width={"w-20"}
                  onClick={() => navigate("/login")}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
