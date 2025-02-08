import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import Button from "../ReusableComponents/Button";

function OrganiserContact({ isFormOpen, setIsFormOpen }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [data, setData] = useState([]);
  const inputfield = [
    {
      label: "Full Name",
      min: 3,
      max: 30,
      type: "text",
      value: formData.name,
      name: "name",
    },
    {
      label: "Your Email",
      type: "email",
      value: formData.email,
      name: "email",
    },
    {
      label: "Contact Number",
      type: "tel",
      value: formData.phone,
      name: "phone",
      //  pattern:"^[6-9]\d{9}$"
    },
    {
      label: "Subject",
      type: "text",
      value: formData.subject,
      name: "subject",
      min: 3,
      max: 30,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setData([...data, formData]);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };
  return (
    <div className="lg:max-w-[650px] md:max-w-[500px] lg:max-h-[600px]">
      <p className="flex justify-between gap-3 p-2">
        <h1 className="font-semibold">
          Inquiry for{" "}
          <span className="text-[#ff2459] text-sm">
            Event Name - Event Location -Event Header - date
            Event Name - Event Location -Event Header - date
          </span>
        </h1>
        <button onClick={() => setIsFormOpen(false)}>
          <MdCancel className="lg:text-lg text-2xl hover:text-gray-800 text-gray-500" />
        </button>
      </p>
      <form onSubmit={handleSubmit} className="p-2 flex flex-col gap-3">
        <hr />
        {inputfield.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-2">
              <label
                className="block font-medium text-gray-700"
                htmlFor={item.name}
              >
                {item.label}
              </label>
              <input
                type={item.type}
                value={item.value}
                onChange={handleChange}
                name={item.name}
                minLength={item.min}
                maxLength={item.max}
                pattern={item.pattern}
                className="w-full bg-gray-100 rounded-lg p-1"
                required
              />
            </div>
          );
        })}
        <label htmlFor="mesage" className="block font-medium text-gray-700">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          minLength={3}
          maxLength={40}
          required
          className="w-full bg-gray-100 rounded-lg p-1"
        ></textarea>
        <div className="flex gap-2 justify-end mt-2">
          {/* <Button
            variant={"normal"}
            textSize={"text-base"}
            text={"CANCEL"}
            rounded={"rounded-full"}
          />
          <Button
            variant={"primary"}
            textSize={"text-base"}
            text={"SEND"}
            rounded={"rounded-full"}
          /> */}
          <button
            onClick={() => setIsFormOpen(false)}
            className="rounded-full p-1 text-gray-900 font-medium bg-gray-300 px-4"
          >
            CANCEL
          </button>

          <button className="rounded-full p-1 text-white font-medium bg-[#ff2459] px-4">
            SEND
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrganiserContact;
