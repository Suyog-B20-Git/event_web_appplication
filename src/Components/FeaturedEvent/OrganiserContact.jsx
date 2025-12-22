import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../utility/utils";

function OrganiserContact({
  isFormOpen,
  setIsFormOpen,
  OrganizerName,
  OrganizerEmail,
}) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "I want to know more about this event",
    message:
      "Hello, I would like to enquire more about this listing. Please let me know how can I get in touch with you. Waiting for your prompt reply?",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const inputFields = [
    { label: "Full Name", min: 3, max: 30, type: "text", name: "name" },
    { label: "Your Email", type: "email", name: "email" },
    { label: "Contact Number", type: "tel", name: "phone" },
    { label: "Subject", type: "text", min: 3, max: 30, name: "subject" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // For organizer contact, we use the old structure since it's specifically for event organizers
    const payload = {
      to: OrganizerEmail,
      eventName: OrganizerName,
      fullName: formData.name,
      email: formData.email,
      contactNumber: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    setLoading(true);

    try {
      const response = await axiosInstance.post("/enquiries", payload);
      toast.success("Message sent successfully!");
      setData([...data, formData]);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsFormOpen(false);
    } catch (error) {
      toast.error("Error sending Message. Please try again later.");
      console.error(
        "Error submitting Message:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed w-full inset-0 flex flex-col items-center   justify-center  overflow-y-scroll  z-40 backdrop-blur-md bg-black/50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-[90%] md:max-w-[550px] lg:max-w-[600px]">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-semibold text-lg md:text-xl">
            Enquiry for <span className="text-[#ff2459] ">Event</span>
          </h1>
          <button
            onClick={() => setIsFormOpen(false)}
            className="text-gray-500 text-3xl hover:text-red-500 "
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <hr />
          {inputFields.map((item, index) => (
            <div key={index} className="flex flex-col">
              <label className="font-medium text-gray-700">{item.label}</label>
              <input
                type={item.type}
                name={item.name}
                value={formData[item.name]}
                onChange={handleChange}
                minLength={item.min}
                maxLength={item.max}
                className="w-full bg-gray-100 rounded-lg p-2 text-gray-900"
                required
              />
            </div>
          ))}

          {/* Message Input */}
          <div>
            <label className="font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              minLength={3}
              maxLength={200}
              required
              className="w-full bg-gray-100 rounded-lg p-2 h-24 text-gray-900"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsFormOpen(false)}
              className="rounded-lg px-4 py-2 text-gray-900 bg-gray-300 font-medium"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 text-white font-medium bg-[#ff2459] hover:bg-[#e11e4d] rounded-lg px-4 py-1 ${loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              )}
              {loading ? "Sending..." : "SEND"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrganiserContact;
