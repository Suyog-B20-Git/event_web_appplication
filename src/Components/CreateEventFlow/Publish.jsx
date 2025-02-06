import React, { useState } from "react";
import { FaMapLocation, FaUserTag } from "react-icons/fa6";
import { MdSimCardDownload } from "react-icons/md";
import Button from "../ReusableComponents/Button";

function Publish() {
  const [modal, setModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [newData, setNewData] = useState({
    title: "",
    type: "",
    subTitle: "",
    website: "",
    profile: "",
    description: "",
    phone: "",
    email: "",
    facebook: "",
    linkdin: "",
    instagram: "",
    twitter: "",
    img: "",
  });
  const inputField = [
    {
      label: "title",
      type: "text",
      name: "title",
      value: newData.title,
      placeholder: "",
      minLength: 3,
      maxLength: 100,
    },
    {
      label: "type",
      type: "text",
      name: "type",
      value: newData.type,
      placeholder: "",
      minLength: 3,
      maxLength: 100,
    },
    {
      label: "subTitle",
      type: "text",
      name: "subTitle",
      value: newData.subTitle,
      placeholder: "",
      minLength: 3,
      maxLength: 100,
    },
    {
      label: "website",
      type: "url",
      name: "website",
      value: newData.website,
      placeholder: "",
      minLength: 3,
      maxLength: 100,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTag([...tag, newData]);
    setNewData({
      title: "",
      type: "",
      subTitle: "",
      website: "",
      profile: "",
      description: "",
      phone: "",
      email: "",
      facebook: "",
      linkdin: "",
      instagram: "",
      twitter: "",
      img: fileName,
    });
    setModal(false);
  };

  const profileInput = [
    {
      label: "Phone",
      type: "tel",
      name: "phone",
      value: newData.phone,
      placeholder: "",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      value: newData.email,
      placeholder: "",
    },
    {
      label: "Facebook",
      type: "url",
      name: "facebook",
      value: newData.facebook,
      placeholder: "",
    },
    {
      label: "instagram",
      type: "url",
      name: "instagram",
      value: newData.instagram,
      placeholder: "",
    },
    {
      label: "twitter",
      type: "url",
      name: "twitter",
      value: newData.twitter,
      placeholder: "",
    },
    {
      label: "Linkdin",
      type: "url",
      name: "linkdin",
      value: newData.linkdin,
      placeholder: "",
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
  const [tag, setTag] = useState([]);
  return (
    <div>
      <div className="flex flex-col gap-2 p-1 pb-3">
        <label htmlFor="event venue" className="p">
          Event Tag(optional)
        </label>
        <select
          value={tag}
          className="border p-1 text-gray-600"
          onChange={(e) => setTag(e.target.value)}
        >
          <option value="">--Select Tag --</option>
        </select>
      </div>
      <button
        onClick={() => setModal(true)}
        className="flex gap-2 p-2 px-2 rounded-md bg-black text-white"
      >
        <FaUserTag className="relative top-1 text-xl" />
        Create Tag
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
            <div style={{marginTop:newData.profile==="Yes"?"600px":"20px"}} className="bg-white p-6  rounded-lg shadow-lg w-[90%] lg:w-[70%]">
              <form
                onSubmit={handleSubmit}
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
                        title: "",
                        type: "",
                        subTitle: "",
                        website: "",
                        profile: "",
                        description: "",
                        phone: "",
                        email: "",
                        facebook: "",
                        linkdin: "",
                        instagram: "",
                        twitter: "",
                        img: fileName,
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col items-start space-y-2 w-full pt-2">
                  <label className="font-semibold">Update Tag*</label>
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

                  <div className="flex flex-col gap-2 p-1 pb-3">
                    <label htmlFor="profile page" className="p">
                      Profile Page
                    </label>
                    <select
                      value={newData.profile}
                      className="border p-1 text-gray-600"
                      name="profile"
                      onChange={handleChange} // This ensures the correct state update
                    >
                      <option value="">--Select Option--</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {newData.profile === "Yes" ? (
                    <>
                      <div className="mb-2 pt-2">
                        <label
                          className="block text-gray-700 font-medium mb-1"
                          htmlFor="description"
                        >
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={newData.description}
                          onChange={handleChange}
                          minLength="3"
                          maxLength="300"
                          className="border w-full py-4 px-2 rounded-md"
                        ></textarea>
                        <div className="mb-2 pt-2">
                          {profileInput.map((item, index) => {
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
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    // onClick={(e)=>handleOnlineData(e)}
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
    </div>
  );
}

export default Publish;
