// import { GoPerson } from "react-icons/go";
// import InputField from "../ReusableComponents/InputField";
// import Button from "../ReusableComponents/Button";
// import { useState } from "react";
// import PersonalDetails from "./PersonalDetails";
// import ChangePass from "./ChangePass";
// import BankDetails from "./BankDetails";

import { GoPerson } from "react-icons/go";
import PersonalDetails from "./PersonalDetails";
import ChangePass from "./ChangePass";
import BankDetails from "./BankDetails";
import Button from "../ReusableComponents/Button";
import { useState } from "react";

const Profile = () => {
  const steps = ["personal", "changepass", "bankdetails"];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleNext = () => {
    setCurrentStepIndex((prevIndex) => (prevIndex + 1) % steps.length);
  };

  const handlePrevious = () => {
    setCurrentStepIndex((prevIndex) =>
      prevIndex === 0 ? steps.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="w-[100%] ">
        <div className="w-[100%] flex justify-center ">
          <div className="md:w-[95%] lg:w-[80%] w-[100%]  p-3  sm:mt-6 ">
            <div className="flex text-[#FF2459] text-lg sm:font-medium sm:text-xl font-semibold  p-2 rounded shadow shadow-[#00000040] w-[50%] md:w-[25%] sm:w-[20%]">
              <span className="mt-1 mr-1">
                <GoPerson />
              </span>
              Profile
            </div>

            {/* Three Section */}
            <div className="flex justify-between items-center font-medium sm:text-lg sm:p-2 mt-8 shadow-[#00000040] w-[100%] sm:w-[90%] md:w-[80%] lg:w-[60%]">
              {steps.map((step, index) => (
                <button key={step} onClick={() => setCurrentStepIndex(index)}>
                  <span
                    className={` text-base sm:text-xl font-semibold sm:pt-4 pb-4  rounded ${currentStepIndex === index
                      ? "text-[#FF2459] border-b-2 border-[#FF2459]"
                      : "text-[#666666]"
                      }`}
                  >
                    {step === "personal"
                      ? "Personal Details"
                      : step === "changepass"
                        ? "Change Password"
                        : "Bank Details"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Render Components Based on Current Step */}
        {steps[currentStepIndex] === "personal" && <PersonalDetails />}
        {steps[currentStepIndex] === "changepass" && <ChangePass />}
        {steps[currentStepIndex] === "bankdetails" && <BankDetails />}

        {/* Next/Previous Buttons */}
        <div className="w-[100%] flex justify-center">
          {/* <div className={`p-3 m-5 w-[80%] flex   border border-blue-500${currentStepIndex === 0?"justify-end":"justify-between"}`}> */}

          <div className={`p-3 m-1 sm:m-5 w-[100%] sm:w-[77%] flex ${currentStepIndex === 0 ? "justify-end" : currentStepIndex === steps.length - 1
            ? "justify-start"
            : "justify-between"
            } `}
          >
            {currentStepIndex > 0 && (
              <Button
                text={"Previous"}
                variant={"primary"}
                rounded={"rounded-md"}
                width={"sm:w-[15%] w-[30%] "}
                onClick={handlePrevious}
              />
            )}
            {/* Show Next Button if Not on Last Step */}
            {currentStepIndex < steps.length - 1 && (
              <Button
                text={"Next"}
                variant={"primary"}
                rounded={"rounded-md"}
                width={"sm:w-[15%] w-[30%]"}
                onClick={handleNext}
              />
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

