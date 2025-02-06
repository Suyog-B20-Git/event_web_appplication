import React, { useState } from "react";
import { MdSimCardDownload } from "react-icons/md";

function SEO() {
  const [seoForm, setSeoForm] = useState([]);
  const [newData, setNewData] = useState({
    metatTitle: "",
    metaTag: "",
    metaDescription: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setSeoForm([...seoForm, newData]);
    setNewData({ metatTitle: "", metaTag: "", metaDescription: "" });
  };
  const inputField = [
    {
      label: "Meta title",
      type: "text",
      name: "metaTitle",
      value: newData.metatTitle,
      placeholder: "",
      minLength: 3,
      maxLength: 100,
    },
    {
      label: "Meta Tag",
      type: "text",
      name: "metaTag",
      value: newData.metaTag,
      placeholder: "",
      minLength: 3,
      maxLength: 100,
    },
    {
      label: "Meta Description",
      type: "text",
      name: "metaDescription",
      value: newData.metaDescription,
      placeholder: "",
      minLength: 3,
      maxLength: 100,
    },
  ];
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        </div>
        <button
          type="submit"
          className="bg-blue-500 gap-2 mt-3  text-xl flex  w-[max-content] text-white py-2 px-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          <MdSimCardDownload className="relative top-1 " />
          Save
        </button>
      </form>
    </div>
  );
}

export default SEO;
