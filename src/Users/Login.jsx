// import React, { useState } from "react";
// import InputField from "../Components/ReusableComponents/InputField";
// import Button from "../Components/ReusableComponents/Button";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const navigate = useNavigate(); // Initialize the useNavigate hook

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );

//       if (response.status === 200) {
//         setSuccessMessage("Login successful!");
//         // Save the token in localStorage or sessionStorage
//         localStorage.setItem("authToken", response.data.token);
//         // Redirect to the landing page
//         navigate("/");
//       }
//     } catch (error) {
//       if (error.response) {
//         // Server responded with a status other than 200
//         setErrorMessage(error.response.data.message || "Login failed.");
//       } else {
//         // Network or other errors
//         setErrorMessage("An error occurred. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="w-full flex justify-center items-center">
//       <div className="w-[400px] h-[326px] p-5 flex flex-col gap-3">
//         <InputField
//           label={"Email"}
//           type={"email"}
//           name={"email"}
//           width={"w-full"}
//           placeholder={"Enter email"}
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <InputField
//           label={"Password"}
//           type={"password"}
//           isPasswordField={true}
//           name={"password"}
//           width={"w-full"}
//           placeholder={"Enter password"}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <div className="text-[#ff2459] font-semibold text-sm flex justify-end">
//           Forgot Password
//         </div>
//         {errorMessage && (
//           <div className="text-red-500 text-sm">{errorMessage}</div>
//         )}
//         {successMessage && (
//           <div className="text-green-500 text-sm">{successMessage}</div>
//         )}
//         <Button
//           text={"Login"}
//           type={"button"}
//           variant={"primary"}
//           rounded={"rounded-xl"}
//           width={"w-full"}
//           onClick={handleLogin}
//         />
//       </div>
//     </div>
//   );
// }

// export default Login;

// import React, { useState } from "react";
// import InputField from "../Components/Resusable components/InputField";
// import { Link, useNavigate } from "react-router-dom";
// import Left from "../Components/Resusable components/Right";
// import Button from "../Components/Resusable components/Button";
// import { FaFacebookSquare } from "react-icons/fa";
// import { ImGoogle } from "react-icons/im";
// import { HiOutlineDeviceMobile } from "react-icons/hi";
// import Register from "./Register";
// function Login() {
//   const navigate = useNavigate();
//   const [newUser, setNewUser] = useState({
//     email: "",
//     password: "",
//   });
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setNewUser({ ...newUser, [name]: value });
//   };

//   const handleSubmit = () => {
//     // if (newUser.email === "superAdmin" && newUser.password === "superAdmin") {
//     //   navigate("/screen");
//     // } else if (newUser.email === "admin" && newUser.password === "admin") {
//     //   navigate("/screen1");
//     // }
//   };

//   return (
//     <div className="flex sm:flex-col-reverse flex-col md:flex-row h-screen">
//       {/* Left Section */}

//       <div className="flex flex-col  justify-center items-center w-full md:w-1/2 px-4 md:px-6 h-full bg-gray-100">
//         <div className="flex flex-col items-center w-full max-w-sm mx-auto">
//           <div className="w-full mt-2">
//             {/* Input fields */}
//             <div className="mx-auto flex flex-col gap-4">
//               <h2
//                 className=" text-3xl  md:text-2xl font-semibold"
//                 style={{
//                   textDecoration: "underline",
//                   textDecorationColor: "#FF2459",
//                   color: "#FF2459",
//                 }}
//               >
//                 Login
//               </h2>
//               <InputField
//                 width={"w-full"}
//                 name={"email"}
//                 label={"Email Adrress"}
//                 type="email"
//                 // value={newUser.user}
//                 onChange={handleInput}
//               />
//               <InputField
//                 width={"w-full"}
//                 name={"password"}
//                 label={"Password"}
//                 // value={newUser.password}
//                 onChange={handleInput}
//                 isPasswordField={true}
//                 onClick={togglePasswordVisibility}
//                 type={`${isPasswordVisible ? "text" : "password"}`}
//               />

//               {/* Remember me and forgot password */}
//               <div className="flex items-center justify-between mt-4">
//                 <label className="flex items-center text-xs md:text-sm text-gray-600 font-semibold">
//                   <input
//                     type="checkbox"
//                     className="mr-2 w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400 focus:ring-2"
//                   />
//                   stay sign in
//                 </label>
//                 <Link
//                   to={"/forgot"}
//                   style={{ color: "#FF2459" }}
//                   className="text-xs md:text-sm font-medium hover:text-gray-900"
//                 >
//                   forgot password
//                 </Link>
//               </div>

//               {/* Sign in button */}
//               <div className="flex flex-col justify-center mt-4 gap-3 shadow">
//                 <Button
//                   variant={"primary"}
//                   text={"login"}
//                   textPos={"text-center"}
//                   rounded={"rounded-xl"}
//                   onClick={handleSubmit}
//                 />
//               </div>

//               <p className="flex justify-center">
//                 Need and account ?{" "}
//                 <Link style={{ color: "#FF2459" }} to={"/register"}>
//                   {" "}
//                   Register
//                 </Link>
//               </p>
//               <p className="p-2 flex justify-center ">Login with</p>
//               <div className="flex justify-center gap-3 p-2">
//                 <Link>
//                   {" "}
//                   <FaFacebookSquare
//                     className=" text-3xl p-1 rounded-md"
//                     style={{ color: "white", backgroundColor: "#FF2459" }}
//                   />
//                 </Link>
//                 <Link>
//                   <ImGoogle
//                     className=" text-3xl p-1 rounded-md"
//                     style={{ color: "white", backgroundColor: "#FF2459" }}
//                   />
//                 </Link>
//                 <Link>
//                   <HiOutlineDeviceMobile
//                     className=" text-3xl p-1 rounded-md"
//                     style={{ color: "white", backgroundColor: "#FF2459" }}
//                   />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Right Section */}
//       <Left />
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import InputField from "../Components/InputField";
import { Link, useNavigate } from "react-router-dom";

import Button from "../Components/Button";
import { FaFacebookSquare } from "react-icons/fa";
import { ImGoogle } from "react-icons/im";
import { HiOutlineDeviceMobile } from "react-icons/hi";

import axios from "axios";
import Photo from "./Photo";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Login successful!");
        // Save the token in localStorage or sessionStorage
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("isLogin", JSON.stringify(true));
        // Redirect to the landing page
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200
        setErrorMessage(error.response.data.message || "Login failed.");
      } else {
        // Network or other errors
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex sm:flex-col-reverse flex-col md:flex-row lg:h-[75vh] md:h-max   ">
      {/* Left Section */}

      <Photo />
      {/* Right Section */}
      <div className="flex flex-col  justify-center items-center w-full md:w-1/2 px-4 md:px-6  h-full bg-gray-100 p-4">
        <div className="flex flex-col items-center w-full max-w-sm mx-auto">
          <div className="w-full mt-2">
            {/* Input fields */}
            <div className="mx-auto flex flex-col gap-4">
              <h2
                className=" text-3xl  md:text-2xl font-semibold"
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#FF2459",
                  color: "#FF2459",
                }}
              >
                Login
              </h2>
              <InputField
                label={"Email"}
                type={"email"}
                name={"email"}
                width={"w-full"}
                placeholder={"Enter email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                label={"Password"}
                type={"password"}
                isPasswordField={true}
                name={"password"}
                width={"w-full"}
                placeholder={"Enter password"}
                value={password}
                onClick={togglePasswordVisibility}
                onChange={(e) => setPassword(e.target.value)}
              />

              {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="text-green-500 text-sm">{successMessage}</div>
              )}
              {/* Sign in button */}
              <div className="flex flex-col justify-center mt-4 gap-3 shadow">
                <Button
                  variant={"primary"}
                  text={"login"}
                  textPos={"text-center"}
                  rounded={"rounded-md"}
                  onClick={handleLogin}
                  textSize={"text-lg"}
                />
              </div>

              <p className="flex gap-1 justify-center">
              
                <Link className="flex gap-1 justify-center" style={{ color: "#FF2459" }} to={"/register"}>
                  {" "}
                  <span className="text-gray-900 ">Need and account ?{" "}</span>
                  Register
                </Link>
              </p>
              <p className="p-2 flex justify-center ">Login with</p>
              <div className="flex justify-center gap-3 p-2">
                <Link>
                  {" "}
                  <FaFacebookSquare
                    className=" text-3xl p-1 rounded-md"
                    style={{ color: "white", backgroundColor: "#FF2459" }}
                  />
                </Link>
                <Link>
                  <ImGoogle
                    className=" text-3xl p-1 rounded-md"
                    style={{ color: "white", backgroundColor: "#FF2459" }}
                  />
                </Link>
                <Link>
                  <HiOutlineDeviceMobile
                    className=" text-3xl p-1 rounded-md"
                    style={{ color: "white", backgroundColor: "#FF2459" }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
