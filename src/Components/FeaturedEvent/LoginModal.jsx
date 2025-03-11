import React, { useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { HiOutlineDeviceMobile } from "react-icons/hi";
import { ImGoogle } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../InputField";
import Button from "../Button";
import axios from "axios";

function LoginModal() {
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
        "https://event-node-backend.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Login successful!");
        // Save the token in localStorage or sessionStorage
        localStorage.setItem("authToken", response.data.token);
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
    <div className="flex flex-col  justify-center items-center w-full  px-4 md:px-6 h-full  ">
      <div className="flex flex-col   items-center w-full max-w-sm mx-auto">
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
  );
}

export default LoginModal;
