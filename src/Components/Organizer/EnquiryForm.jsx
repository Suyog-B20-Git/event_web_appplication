// import React from "react";
// import { GiCancel } from "react-icons/gi";
// import { useForm } from "react-hook-form";

// function EnquiryForm({ enquiry, setEnquiry, name }) {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log("Form Data:", data);
//     reset();
//   };

//   const inputs = [
//     {
//       label: "Full Name",
//       name: "name",
//       type: "text",
//       placehoder: "",
//       pattern: "",
//       message: "",
//       required: "Name is required",
//     },
//     {
//       label: "Your Email",
//       name: "email",
//       type: "email",
//       placehoder: "",
//       required: "Email is required",
//       pattern: /^\S+@\S+\.\S+$/,
//       message: "Invalid email format",
//     },
//     {
//       label: "Contact Number",
//       name: "contactNumber",
//       type: "tel",
//       placehoder: "",
//       required: "Contact Number is required",
//       pattern: /^[6-9]\d{9}$/,
//       message:
//         "Invalid phone number (Indian format: 10 digits starting with 6-9)",
//     },
//     {
//       label: "Subject",
//       name: "subject",
//       type: "text",
//       required: "subject is required",
//       placehoder: "Inquiry Email",
//       pattern: "",
//       message: "",
//     },
//   ];

//   return (
//     <div>
//       <div className="">
//         <div className="fixed w-full inset-0 flex flex-col items-center lg:justify-start justify-center  overflow-y-scroll  z-40 backdrop-blur-sm">
//           <div className="bg-white p-2 rounded-lg   shadow-lg  lg:w-[full]">
//             <div className="lg:w-[600px] md:w-[600px] w-[350px]">
//               <div className="flex justify-between border-b">
//                 <h1 className=" p-2 font-medium text-gray-600">
//                   Inquiry For <span className="text-[#ff2459]">{name}</span>
//                 </h1>
//                 <button onClick={() => setEnquiry(!enquiry)}>
//                   <GiCancel className="text-lg" />
//                 </button>
//               </div>
//               <form
//                 className="flex flex-col   "
//                 onSubmit={handleSubmit(onSubmit)}
//               >
//                 {inputs.map((item, index) => {
//                   return (
//                     <div
//                       key={index}
//                       className="flex flex-col p-1  gap-1 text-gray-700"
//                     >
//                       <label
//                         className="capitalize p-1 pb-0.5
//                        "
//                       >
//                         {item.label}
//                       </label>
//                       <input
//                         className="bg-gray-100 rounded-md p-2 px-2"
//                         placeholder={item.placehoder}
//                         type={item.type}
//                         {...register(item.name, {
//                           required: item.required,
//                           pattern: {
//                             value: item.pattern,
//                             message: item.message,
//                           },
//                         })}
//                       />

//                       {errors[item.name] && (
//                         <p className="text-xs px-1 text-red-500">
//                           {errors[item.name].message}*
//                         </p>
//                       )}
//                     </div>
//                   );
//                 })}

//                 <label className="capitalize text-gray-700 p-1 px-2 ">
//                   Message
//                 </label>
//                 <textarea
//                   placeholder="Enter your message..."
//                   {...register("message", {
//                     required: "Message filed is required",
//                   })}
//                   className="bg-gray-100 rounded-md  p-2 mb-4 px-2 ml-2"
//                 ></textarea>
//                 {errors.message && (
//                   <p className="text-xs px-1 relative bottom-3 text-red-500">
//                     {errors.message.message}*
//                   </p>
//                 )}

//                 <hr />

//                 <div className="flex justify-end p-2 gap-3 text-sm">
//                   <button
//                     type="button"
//                     onClick={() => setEnquiry(!enquiry)}
//                     className="text-gray-800 font-medium border bg-white hover:bg-gray-100   rounded-lg px-4 p-1"
//                   >
//                     CLOSE{" "}
//                   </button>
//                   <button
//                     type="submit"
//                     className="text-white font-medium bg-[#ff2459] rounded-lg px-3 p-1"
//                   >
//                     SUBMIT
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EnquiryForm;







import React from "react";
import { GiCancel } from "react-icons/gi";
import { useForm } from "react-hook-form";

function EnquiryForm({ enquiry, setEnquiry, name }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset();
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
      placehoder: "Inquiry Email",
      pattern: "",
      message: "",
    },
  ];

  return (
    <div>
      <div className="">
        <div className="fixed w-full inset-0 flex flex-col items-center   justify-center  overflow-y-scroll  z-40 backdrop-blur-md bg-black/50">
          <div className="bg-white p-2 rounded-lg   shadow-lg  lg:w-[full] relative">
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
                {/* <button onClick={() => setEnquiry(!enquiry)}>
                  <GiCancel className="text-lg" />
                </button> */}
              </div>
              <p className="text-gray-500 p-2 text-sm">
              Hello, I would like to inquire more about this listing. Please let me know how can I get in touch with you. Waiting for your prompt reply?
                </p>
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
                        className="capitalize p-1 pb-0.5
                       "
                      >
                        {item.label}
                      </label>
                      <input
                        className="bg-gray-100 rounded-md p-2 px-2"
                        placeholder={item.placehoder}
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

                <label className="capitalize text-gray-700 p-1 px-2 ">
                  Message
                </label>
                <textarea
                  placeholder="Enter your message..."
                  {...register("message", {
                    required: "Message filed is required",
                  })}
                  className="bg-gray-100 rounded-md  p-2 mb-4 px-2 ml-2"
                ></textarea>
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
                    className="text-white font-medium bg-[#ff2459] rounded-lg px-3 p-1"
                  >
                    SUBMIT
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
