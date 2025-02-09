// import React, { useState } from "react";
// import Button from "../Components/ReusableComponents/Button";
// import InputField from "../Components/ReusableComponents/InputField";

// function Register() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <div className="w-full flex justify-center items-center">
//       <div className="w-[360px] md:h-[470px] pb-5 flex flex-col gap-1">
//         <InputField
//           label={"First Name"}
//           type={"text"}
//           name={"firstName"}
//           width={"w-full"}
//           placeholder={"Enter yor first Name"}
//           value={email}
//           onChange={(e) => setFirstName(e.target.value)}
//         />
//         <InputField
//           label={"Last Name"}
//           type={"text"}
//           name={"LastName"}
//           width={"w-full"}
//           placeholder={"Enter yor last Name"}
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//         />
//         <InputField
//           label={"Email*"}
//           type={"email"}
//           name={"email"}
//           width={"w-full"}
//           placeholder={"Enter email"}
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <InputField
//           label={"password*"}
//           type={"password"}
//           isPasswordField={true}
//           name={"password"}
//           width={"w-full"}
//           placeholder={"Enter password"}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <div className="text-[10px] whitespace-nowrap ">
//           Minimum of 8 Chracter & must include lettere & 1 number(no space
//           ,slashes or quotes)
//         </div>

//         <button className="text-gray-600 shadow bg-white lg:text-base text-sm w-[max-content] p-1 border-2 rounded font-semibold">
//           Im not Robot
//         </button>
//         <button className=" text-center shadow text-white lg:text-base text-sm w-full rounded-lg p-1 border-2 bg-[#ff2459] font-semibold">
//           Sign Up
//         </button>

//         <p className="text-[10px] whitespace-nowrap">
//           By clicking ‘SIGN UP’ you are agrreging to the Event.com Terms of use
//           & privacy Policey
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;

// import React, { useState } from "react";
// import InputField from "../Components/ReusableComponents/InputField";
// import axios from "axios";
// import Button from "../Components/ReusableComponents/Button";

// function Register() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/setup", {
//         username: firstName,
//         lastName,
//         email,
//         password,
//         mobileNumber,
//       });

//       if (response.status === 201) {
//         setSuccess("Registration successful!");
//         setFirstName("");
//         setLastName("");
//         setEmail("");
//         setPassword("");
//         setMobileNumber("");
//       }
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="w-full flex justify-center items-center">
//       <div className="w-[360px] md:h-[470px] pb-5 flex flex-col gap-1">
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         {success && <p className="text-green-500 text-sm">{success}</p>}

//         <InputField
//           label={"First Name"}
//           type={"text"}
//           name={"firstName"}
//           width={"w-full"}
//           placeholder={"Enter your first name"}
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//         />
//         <InputField
//           label={"Last Name"}
//           type={"text"}
//           name={"lastName"}
//           width={"w-full"}
//           placeholder={"Enter your last name"}
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//         />
//         <InputField
//           label={"Email*"}
//           type={"email"}
//           name={"email"}
//           width={"w-full"}
//           placeholder={"Enter email"}
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <InputField
//           label={"Mobile Number"}
//           type={"text"}
//           name={"mobileNumber"}
//           width={"w-full"}
//           placeholder={"Enter your mobile number"}
//           value={mobileNumber}
//           onChange={(e) => setMobileNumber(e.target.value)}
//         />
//         <InputField
//           label={"Password*"}
//           type={"password"}
//           name={"password"}
//           width={"w-full"}
//           placeholder={"Enter password"}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <div className="text-[10px] lg:whitespace-nowrap">
//           Minimum of 8 characters & must include letters & 1 number (no spaces, slashes, or quotes)
//         </div>

//         <button
//           className="text-center shadow text-white lg:text-base text-sm w-full rounded-lg p-1 border-2 bg-[#ff2459] font-semibold"
//           onClick={handleRegister}
//         >
//           Sign Up
//         </button>

//         <p className="text-[10px] lg:whitespace-nowrap">
//           By clicking ‘SIGN UP’ you are agreeing to the Event.com Terms of Use & Privacy Policy
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;

import React, { useState } from "react";
import InputField from "../Components/ReusableComponents/InputField";
import { Link, useNavigate } from "react-router-dom";

import Button from "../Components/ReusableComponents/Button";
import { FaFacebookSquare } from "react-icons/fa";
import { ImGoogle } from "react-icons/im";
import { HiOutlineDeviceMobile } from "react-icons/hi";
import axios from "axios";
import Photo from "./Photo";
function Register() {
  // const navigate = useNavigate();
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/setup",
        {
          username: name,

          email,
          password,
          mobileNumber,
        }
      );

      if (response.status === 201) {
        setSuccess("Registration successful!");
        setName("");

        setEmail("");
        setPassword("");
        setMobileNumber("");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex sm:flex-col-reverse lg:h-[100vh] md:h-[80vh] flex-col md:flex-row  lg:pt-[160px] md:pt-0 pt-[88px]   ">
      {/* Left Section */}

      <Photo />
      {/* Right Section */}
      <div className="flex flex-col justify-center  items-center w-full md:w-1/2 px-4 md:px-8 py-3 h-full bg-gray-100 lg:pt-5  ">
        <div className="flex flex-col items-center w-full max-w-sm mx-auto">
          <div className="w-full lg:mt-0 mt-2">
            {/* Input fields */}
            <div className="mx-auto flex flex-col gap-1">
              <h2
                className=" text-3xl  md:text-2xl font-semibold"
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#FF2459",
                  color: "#FF2459",
                }}
              >
                Register
              </h2>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
              <InputField
                label={"User Name"}
                type={"text"}
                name={"firstName"}
                width={"w-full"}
                placeholder={"Enter your name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <InputField
                label={"Email*"}
                type={"email"}
                name={"email"}
                width={"w-full"}
                placeholder={"Enter email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                label={"Mobile Number"}
                type={"text"}
                name={"mobileNumber"}
                width={"w-full"}
                placeholder={"Enter your mobile number"}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <InputField
                label={"Password*"}
                type={"password"}
                name={"password"}
                width={"w-full"}
                placeholder={"Enter password"}
                value={password}
                onClick={togglePasswordVisibility}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Sign in button */}
              <div className="flex flex-col justify-center mt-8 gap-5 shadow">
                <Button
                  variant={"primary"}
                  text={"Register"}
                  textPos={"text-center"}
                  rounded={"rounded-md"}
                  textSize={"text-lg"}
                  onClick={handleRegister}
                />
              </div>

              <p className="flex justify-center pt-3">
                Already have account ? {" "}
                <Link style={{ color: "#FF2459" }} className="px-2" to={"/login"}>
                  {" "}
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
