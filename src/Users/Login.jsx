import React, { useState } from "react";
import InputField from "../Components/InputField";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../Components/Button";
import { FaFacebookSquare } from "react-icons/fa";
import { ImGoogle } from "react-icons/im";
import { HiOutlineDeviceMobile, HiEye, HiEyeOff } from "react-icons/hi";
import jwtDecode from "jwt-decode";
import { axiosInstance } from "../../utility/utils";
import { Auth } from "../redux/Urls";
import { toast } from "react-toastify";

// const baseUrl = "https://dev.eventsnode.com/api";
const baseUrl = "http://localhost:5000/api";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectToFromQuery = queryParams.get("redirectTo");
  const redirectTo = redirectToFromQuery || localStorage.getItem("redirectAfterLogin") || "/";

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
      const response = await axiosInstance.post(`/auth/login`, { email, password });
      if (response.status === 200) {
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;
        localStorage.setItem("authToken", token);
        localStorage.setItem("isLogin", JSON.stringify(true));
        localStorage.removeItem("redirectAfterLogin");
        if (userRole === "superadmin") {
          toast.success("SuperAdmin logged in successfully!", { position: "top-right" });
          navigate("/admin-panel");
        } else {
          toast.success("Login successful!", { position: "top-right" });
          navigate(redirectTo);
        }
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Login failed.");
        toast.error(error.response.data.message || "Login failed.", { position: "top-right" });
      } else {
        setErrorMessage("An error occurred. Please try again.");
        toast.error("An error occurred. Please try again.", { position: "top-right" });
      }
    }
  };

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const handleGoogleLogin = () => {
    window.location.href = `${baseUrl}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-blue-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden w-full max-w-4xl bg-white animate-fadeIn">

        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-[#FF2459] to-pink-300 relative">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 p-8 flex flex-col items-center text-center">

            <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Welcome Back!</h2>
            <p className="text-white/80 font-medium">
              Login to access your account & exclusive features.
            </p>
          </div>
        </div>
        {/* Login Area */}
        <div className="flex w-full md:w-1/2 flex-col px-7 py-12 justify-center relative">
          <h2 className="text-3xl font-extrabold text-center text-[#FF2459] mb-3 tracking-wider">Log In</h2>
          <p className="text-gray-500 text-center mb-6">Please enter your details to continue</p>
          <form className="flex flex-col gap-4 w-full max-w-sm mx-auto" autoComplete="off" onSubmit={handleLogin}>
            <InputField
              label="Email"
              type="email"
              name="email"
              width="w-full"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
            />
            <InputField
              label="Password"
              type={isPasswordVisible ? "text" : "password"}
              isPasswordField={true}
              name="password"
              width="w-full"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              showToggle
            >
              {/* Eye icon for password visibility */}
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <HiEyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <HiEye className="h-5 w-5 text-gray-400" />
                )}
              </span>
            </InputField>
            {errorMessage && <div className="text-red-500 text-sm px-2">{errorMessage}</div>}
            {successMessage && <div className="text-green-500 text-sm px-2">{successMessage}</div>}

            <Button
              variant={"primary"}
              text={"login"}
              textPos={"text-center"}
              rounded={"rounded-md"}
              onClick={handleLogin}
              textSize={"text-lg"}
            />

            <div className="flex justify-between items-center mt-2 text-sm">
              <Link
                to={`/register?redirectTo=${redirectToFromQuery || ""}`}
                className="underline text-[#FF2459] hover:text-[#c40044]"
              >
                New here? Register
              </Link>
              <Link
                to="/forgot-password"
                className="underline text-blue-600 hover:text-blue-900"
              >
                Forgot password?
              </Link>
            </div>

            <div className="flex items-center my-4">
              <hr className="flex-1 border-t border-gray-200" />
              <span className="px-3 text-gray-500 text-xs">OR</span>
              <hr className="flex-1 border-t border-gray-200" />
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                className="flex items-center px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition font-semibold text-sm"
              >
                <FaFacebookSquare className="text-blue-600 mr-2 text-xl" /> Facebook
              </button>
              <button
                type="button"
                className="flex items-center px-4 py-2 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 transition font-semibold text-sm"
                onClick={handleGoogleLogin}
              >
                <ImGoogle className="text-red-500 mr-2 text-xl" /> Google
              </button>
              <button
                type="button"
                className="flex items-center px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition font-semibold text-sm"
              >
                <HiOutlineDeviceMobile className="text-gray-700 mr-2 text-xl" /> SMS
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;