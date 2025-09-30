/* eslint-disable react/prop-types */
import React, { useState } from "react";

const InputField = ({
  name,
  label,
  placeholder,
  value,
  shadow,
  onChange,
  isPasswordField = false,
  width,
}) => {
  const [inputType, setInputType] = useState(
    isPasswordField ? "password" : "text"
  );

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className={`mt-2 w-full`}>
      <label
        htmlFor={name}
        className="block text-gray-600 text-sm font-medium mb-2"
      >
        {label}
      </label>

      <div className="relative">
        <input
          className={`${width} px-5 ${
            shadow ? shadow : "shadow-lg"
          } py-3 rounded-lg font-medium border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white text-gray-600  ${
            isPasswordField ? "pr-2" : ""
          }`}
          type={inputType}
          placeholder={`${placeholder ? placeholder : `Enter your ${label}`}`}
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e)}
        />
        {isPasswordField && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            onClick={togglePasswordVisibility}
          >
            {inputType === "password" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
