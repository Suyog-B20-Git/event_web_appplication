
import React, { useState } from "react";
import InputField from "../Components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "../Components/Button";
import { FaFacebookSquare } from "react-icons/fa";
import { ImGoogle } from "react-icons/im";
import { HiOutlineDeviceMobile } from "react-icons/hi";
import axios from "axios";
import Photo from "./Photo";
import { Auth } from "../redux/Urls";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_API_URL;

function Register() {
 
  const [username, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirectTo") || "/home";
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      if (password === confirmPassword) {
        const response = await axios.post(
          `${baseUrl}/api/auth/setup`,
          {
            username,
            email,
            password,
            phoneNumber,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("REGISTER response", response);
  
        if (response.data.statusCode === 201) {
          toast.success("Registration successful!", {
            position: "top-right",
          });
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("isLogin", JSON.stringify(true));
          navigate(redirectTo);
          setUsername("");
          setEmail("");
          setPassword("");
          setPhoneNumber("");
        }
      } else {
        toast.error("Passwords do not match.");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          toast.error(err.response.data.message || "User already exists.", {
            position: "top-right",
          });
        } else if (err.response.data.errors) {
          const errors = err.response.data.errors;
          const errorMsg = errors.length > 0 ? errors.join(", ") : errors[0];
          errorMsg &&
            toast.error(errorMsg, {
              position: "top-right",
            });
        } else {
          toast.error("An unexpected error occurred.", {
            position: "top-right",
          });
        }
      } else {
        console.error("REGISTER error", err);
        toast.error("Network error. Please try again later.", {
          position: "top-right",
        });
      }
    }
  };
  
  return (
    <div className="flex sm:flex-col-reverse lg:h-[110vh] xl:h-[86vh] md:h-[64vh] lg:pt-1 md:pt-0 pt-20 flex-col md:flex-row      ">
      {/* Left Section */}

      <Photo />
      {/* Right Section */}
      <div className="flex flex-col justify-center  items-center w-full md:w-1/2  px-4 md:px-8 py-3 h-full md:h-[65vh] lg:h-full  bg-gray-100  ">
        <div className="flex flex-col items-center w-full max-w-sm mx-auto">
          <div className="w-full  lg:mt-0 mt-2">
            {/* Input fields */}
            <div className="mx-auto flex flex-col  gap-1">
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
                name={"username"}
                width={"w-full"}
                placeholder={"Enter your name"}
                value={username}
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
                value={phoneNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <InputField
                label={"Password*"}
                type={"password"}
                name={"password"}
                width={"w-full"}
                isPasswordField={true}
                placeholder={"Enter password"}
                value={password}
                onClick={togglePasswordVisibility}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputField
                label={"Confirm Password*"}
                type={"password"}
                name={"password"}
                width={"w-full"}
                isPasswordField={true}
                placeholder={"Enter Confirm  password"}
                value={confirmPassword}
                onClick={togglePasswordVisibility}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                <Link
                  style={{ color: "#FF2459" }}
                  className="px-2"
                  to={"/login"}
                >
                  <span className="text-gray-900">Already have account ? </span>{" "}
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
