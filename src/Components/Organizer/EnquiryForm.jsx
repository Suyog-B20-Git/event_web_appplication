import React, { useState, useEffect, useRef } from "react";
import { GiCancel } from "react-icons/gi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_API_URL;

function EnquiryForm({ enquiry, onEnquirySent, setEnquiry, name, email }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setEnquiry(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setEnquiry]);

  const onSubmit = async (data) => {
    const payload = {
      to: email,
      eventName: name,
      fullName: data.name,
      email: data.email,
      contactNumber: data.contactNumber,
      subject: data.subject,
      message: data.message,
    };
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/api/enquiries`, payload);
      toast.success("Enquiry sent successfully!");
      localStorage.setItem(`enquiry_sent_${name}`, "true");
      if (onEnquirySent) {
        onEnquirySent();
      }
      reset();
      setEnquiry(false);
    } catch (error) {
      toast.error("Error sending enquiry. Please try again later.");
      console.error(
        "Error submitting enquiry:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const inputs = [
    {
      label: "Full Name",
      name: "name",
      type: "text",
      placehoder: "",
      pattern: "",
      message: "",
      required: "Name is required",
    },
    {
      label: "Your Email",
      name: "email",
      type: "email",
      placehoder: "",
      required: "Email is required",
      pattern: /^\S+@\S+\.\S+$/,
      message: "Invalid email format",
    },
    {
      label: "Contact Number",
      name: "contactNumber",
      type: "tel",
      placehoder: "",
      required: "Contact Number is required",
      pattern: /^[6-9]\d{9}$/,
      message:
        "Invalid phone number (Indian format: 10 digits starting with 6-9)",
    },
    {
      label: "Subject",
      name: "subject",
      type: "text",
      required: "subject is required",
      placehoder: "Enquiry Email",
      defaultValue: "Enquiry Email",
      pattern: "",
      message: "",
    },
  ];

  return (
    <div>
      <div className="">
        <div className="fixed w-full inset-0 flex flex-col items-center   justify-center  overflow-y-scroll  z-40 backdrop-blur-md bg-black/50">
          <div
            ref={modalRef}
            className="bg-white p-2 rounded-lg   shadow-lg  lg:w-[full] relative"
          >
            <button
              className="absolute top-0 right-3 text-gray-700 hover:text-red-500 text-3xl"
              onClick={() => setEnquiry(!enquiry)}
            >
              &times;
            </button>
            <div className="lg:w-[600px] md:w-[600px] w-[350px] mt-4">
              <div className="flex justify-between border-b">
                <h1 className=" p-2 font-medium text-gray-600">
                  Enquiry For <span className="text-[#ff2459]">{name}</span>
                </h1>
              </div>

              <form
                className="flex flex-col   "
                onSubmit={handleSubmit(onSubmit)}
              >
                {inputs.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col p-1  gap-1 text-gray-700"
                    >
                      <label
                        className="capitalize p-1 pb-0.5 font-semibold
                       "
                      >
                        {item.label}
                      </label>
                      <input
                        className="bg-gray-100 rounded-md p-2 px-2"
                        placeholder={item.placehoder}
                        defaultValue={item.defaultValue}
                        type={item.type}
                        {...register(item.name, {
                          required: item.required,
                          pattern: {
                            value: item.pattern,
                            message: item.message,
                          },
                        })}
                      />

                      {errors[item.name] && (
                        <p className="text-xs px-1 text-red-500">
                          {errors[item.name].message}*
                        </p>
                      )}
                    </div>
                  );
                })}

                <label className="capitalize text-gray-700 p-2 px-2 font-semibold">
                  Message
                </label>
                <textarea
                  placeholder="Enter your message..."
                  defaultValue="Hello, I would like to enquire more about this listing. Please let me know how can I get in touch with you. Waiting for your prompt reply?"
                  {...register("message", {
                    required: "Message field is required",
                  })}
                  className="bg-gray-100 rounded-md p-2 mb-4 px-2 ml-2"
                />

                {errors.message && (
                  <p className="text-xs px-1 relative bottom-3 text-red-500">
                    {errors.message.message}*
                  </p>
                )}

                <hr />

                <div className="flex justify-end p-2 gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => setEnquiry(!enquiry)}
                    className="text-gray-800 font-medium border bg-white hover:bg-gray-100   rounded-lg px-4 p-1"
                  >
                    CLOSE{" "}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex items-center gap-2 text-white font-medium bg-[#ff2459] hover:bg-[#e11e4d] rounded-lg px-4 py-1 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
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
                    {loading ? "Sending..." : "SUBMIT"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnquiryForm;
