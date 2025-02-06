import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ReusableComponents/Button";
import InputField from "../ReusableComponents/InputField";
import axios from "axios";

function RegisterModal() {
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
    <div className="flex flex-col justify-center  items-center w-full px-4 md:px-8  h-full    ">
      <div className="flex flex-col items-center  h-[450px] w-full max-w-sm mx-auto">
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

           
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
