
import React, { useState } from "react";
import InputField from "../Components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "../Components/Button";
import { FaFacebookSquare } from "react-icons/fa";
import { ImGoogle } from "react-icons/im";
import { HiOutlineDeviceMobile } from "react-icons/hi";
import jwtDecode from "jwt-decode";

import axios from "axios";
import Photo from "./Photo";
import { Auth } from "../redux/Urls";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
const redirectToFromQuery = queryParams.get("redirectTo");
const redirectTo =
  redirectToFromQuery || localStorage.getItem("redirectAfterLogin") || "/";


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
      const response = await axios.post(`${baseUrl}/auth/login`,
        {
          email,
          password,
        }
      );

  //     if (response.status === 200) {
  //       toast.success("Login successful!", { position: "top-right" });
  //       localStorage.setItem("authToken", response.data.token);
  //       localStorage.setItem("isLogin", JSON.stringify(true));
  //       localStorage.removeItem("redirectAfterLogin");
  //       navigate(redirectTo);
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       toast.error(error.response.data.message || "Login failed.", {
  //         position: "top-right",
  //       });
  //     } else {
  //      toast.error("An error occurred. Please try again.", {
  //         position: "top-right",
  //       });
  //     }
  //   }
  // };

if (response.status === 200) {
      const token = response.data.token;
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;

      // Store token and login status
      localStorage.setItem("authToken", token);
      localStorage.setItem("isLogin", JSON.stringify(true));
      localStorage.removeItem("redirectAfterLogin");

      if (userRole === "superadmin") {
        toast.success("SuperAdmin logged in successfully!", {
          position: "top-right",
        });
        navigate("/"); // Redirect to homepage
      } else {
        toast.success("Login successful!", { position: "top-right" });
        navigate(redirectTo); // Redirect to original page
      }
    }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message || "Login failed.", {
        position: "top-right",
      });
    } else {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
      });
    }
  }
};


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${baseUrl}/=auth/google`;
  };

  return (
    <div className="flex sm:flex-col-reverse flex-col md:flex-row lg:h-[75vh] md:h-max   ">
      {/* Left Section */}

      <Photo />
      {/* Right Section */}
      <div className="flex flex-col  justify-center items-center w-full md:w-1/2 px-4 md:px-6  h-full  md:h-[64vh] lg:h-full bg-gray-100 p-4">
        <div className="flex flex-col items-center w-full max-w-sm mx-auto">
          <div className="w-full mt-20 sm:mt-0">
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
              <div className="flex flex-col justify-center mt-3  shadow">
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
                <Link
                  className="flex gap-1 justify-center"
                  style={{ color: "#FF2459" }}
                  to={`/register?redirectTo=${redirectToFromQuery || ""}`}          
                        >
                  {" "}
                  <span className="text-gray-900 ">Need and account ? </span>
                  Register
                </Link>
              </p>
              <p className="flex justify-center ">Login with</p>
              <div className="flex justify-center gap-3 p-0">
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
                    onClick={handleGoogleLogin}
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
