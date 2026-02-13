import React, { useState } from "react";
import InputField from "../Components/InputField";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../Components/Button";
import { FaFacebookSquare } from "react-icons/fa";
import { ImGoogle } from "react-icons/im";
import { HiOutlineDeviceMobile, HiEye, HiEyeOff } from "react-icons/hi";
import { axiosInstance } from "../../utility/utils";
import { Auth } from "../redux/Urls";
import { toast } from "react-toastify";

// const baseUrl = "https://dev.eventsnode.com/api";
const baseUrl = "http://localhost:5000/api";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      const response = await axiosInstance.post(
        `/auth/setup`,
        { username, email, password }
      );

      if (response.data.statusCode === 201) {
        toast.success("Registration successful!", { position: "top-right" });
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("isLogin", JSON.stringify(true));
        navigate(redirectTo);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          toast.error(err.response.data.message || "User already exists.", { position: "top-right" });
        } else if (err.response.data.errors) {
          const errors = err.response.data.errors;
          const errorMsg = Array.isArray(errors) ? errors.join(", ") : "Validation failed.";
          toast.error(errorMsg, { position: "top-right" });
        } else {
          toast.error(err.response.data.message || "An unexpected error occurred.", { position: "top-right" });
        }
      } else {
        console.error("REGISTER error", err);
        toast.error("Network error. Please try again later.", { position: "top-right" });
      }
    }
  };

  return (
    //  (Responsive padding for mobile gap and smaller desktop gap)
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 px-4 pt-16 md:py-12">
      <div className="flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden w-full max-w-4xl bg-white animate-fadeIn mx-auto">
        {/* Left side visual */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-[#FF2459] to-pink-300 relative">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 p-8 flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Start Your Journey!</h2>
            <p className="text-white/80 font-medium">Create an account to unlock amazing features.</p>
          </div>
        </div>
        {/* Register Area */}
        <div className="flex w-full md:w-1/2 flex-col px-7 py-12 justify-center relative">
          <h2 className="text-3xl font-extrabold text-center text-[#FF2459] mb-3 tracking-wider">Create Account</h2>
          <p className="text-gray-500 text-center mb-6">Please fill in the details to sign up</p>
          <form className="flex flex-col gap-4 w-full max-w-sm mx-auto" autoComplete="off" onSubmit={handleRegister}>
            <InputField
              label="User Name"
              type="text"
              name="username"
              width="w-full"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              width="w-full"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Password"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              width="w-full"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                {isPasswordVisible ? <HiEyeOff className="h-5 w-5 text-gray-400" /> : <HiEye className="h-5 w-5 text-gray-400" />}
              </span>
            </InputField>
            <InputField
              label="Confirm Password"
              type={isPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              width="w-full"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              variant={"primary"}
              text={"Register"}
              textPos={"text-center"}
              rounded={"rounded-md"}
              textSize={"text-lg"}
              onClick={handleRegister}
            />

            <div className="text-center mt-2 text-sm">
              <Link to="/login" className="underline text-[#FF2459] hover:text-[#c40044]">
                Already have an account? Log In
              </Link>
            </div>

            <div className="flex items-center my-4">
              <hr className="flex-1 border-t border-gray-200" />
              <span className="px-3 text-gray-500 text-xs">OR</span>
              <hr className="flex-1 border-t border-gray-200" />
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <button type="button" className="flex items-center px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition font-semibold text-sm">
                <FaFacebookSquare className="text-blue-600 mr-2 text-xl" /> Facebook
              </button>
              <button type="button" className="flex items-center px-4 py-2 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 transition font-semibold text-sm">
                <ImGoogle className="text-red-500 mr-2 text-xl" /> Google
              </button>
              <button type="button" className="flex items-center px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition font-semibold text-sm">
                <HiOutlineDeviceMobile className="text-gray-700 mr-2 text-xl" /> SMS
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;