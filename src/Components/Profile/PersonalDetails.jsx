// import { GoPerson } from "react-icons/go";
// import { useState } from "react";
// import PersonalDetails from "./PersonalDetails";
// import ChangePass from "./ChangePass";
// import BankDetails from "./BankDetails";

// const Profile = () => {
//   const [currentSection, setCurrentSection] = useState("personal");

//   const renderSection = () => {
//     switch (currentSection) {
//       case "personal":
//         return <PersonalDetails />;
//       case "changepass":
//         return <ChangePass />;
//       case "bankdetails":
//         return <BankDetails />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="w-full border border-gray-300">
//       <div className="flex justify-center">
//         <div className="w-[80%] p-3 mt-6">
//           {/* Header Section */}
//           <div className="flex text-[#FF2459] text-xl sm:font-medium font-semibold border p-2 rounded shadow shadow-[#00000040] w-[20%]">
//             <span className="mt-1 mr-1">
//               <GoPerson />
//             </span>
//             Profile
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex justify-between items-center font-medium sm:text-lg p-2 mt-8 w-full sm:w-[60%]">
//             <button onClick={() => setCurrentSection("personal")}>
//               <span
//                 className={`leading-6 text-xl font-semibold sm:p-4 p-1 rounded ${
//                   currentSection === "personal"
//                     ? "text-[#FF2459] border-b-2 border-[#FF2459]"
//                     : "text-[#666666]"
//                 }`}
//               >
//                 Personal Details
//               </span>
//             </button>
//             <button onClick={() => setCurrentSection("changepass")}>
//               <span
//                 className={`leading-6 text-xl font-semibold sm:p-4 p-1 rounded ${
//                   currentSection === "changepass"
//                     ? "text-[#FF2459] border-b-2 border-[#FF2459]"
//                     : "text-[#666666]"
//                 }`}
//               >
//                 Change Password
//               </span>
//             </button>
//             <button onClick={() => setCurrentSection("bankdetails")}>
//               <span
//                 className={`leading-6 text-xl font-semibold sm:p-4 p-1 rounded ${
//                   currentSection === "bankdetails"
//                     ? "text-[#FF2459] border-b-2 border-[#FF2459]"
//                     : "text-[#666666]"
//                 }`}
//               >
//                 Bank Details
//               </span>
//             </button>
//           </div>

//           {/* Render Section Content */}
//           <div className="mt-6">{renderSection()}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


 import Button from "../ReusableComponents/Button"
import InputField from "../ReusableComponents/InputField"
// import InputField from "../ReusableComponents/InputField"
import ChangePass from "./ChangePass"

const PersonalDetails = () => {
  return (
    <>
      <div className="w-[100%] pt-1 sm:p-3 flex justify-center" >
        <div className="sm:w-[80%] w-[100%] p-2 sm:p-3 mt-3 sm:mt-6 ">
          <div className="sm:w-[100%] w-[100%]  p-1 mt-2 sm:p-3 sm:mt-5 sm:mb-5 sm:mr-5 shadow-[#00000040] shadow-sm rounded-md">


            <div className="sm:w-[80%] w-[100%]" >
              <div className=" text-base font-medium text-[#000000] "> Organisation Logo </div>

              <div className="  h-[100px] shadow shadow-[#d1cfcf] p-4 mb-2 mt-2 border-[#707070]  ">
                {/* Chose File box */}
              </div>
            </div>

            <div className="sm:w-[80%] w-[100%]" >
              <div> Profile Image </div>

              <div className="  h-[100px] shadow shadow-[#d1cfcf] mb-2 p-4 mt-2 border-[#707070]">
                {/* Chose File box */}
              </div>
            </div>


            <div className="sm:w-[80%] w-[100%]  mb-2" >


              <InputField label={"Name"} placeholder={"Enter your name"} type={"Email"} width={"w-[100%]"} />

            </div>
            <div className="sm:w-[80%] w-[100%] mb-2" >


              <InputField label={"E-mail"} placeholder={"Enter your email "} type={"Email"} width={"w-[100%]"} />

            </div>
            <div className="sm:w-[80%] w-[100%] mb-2" >


              <InputField label={"Address"} placeholder={"Enter your Address"} type={"Email"} width={"w-[100%]"} />

            </div>
          </div>

          {/* <div className="w-[100%] p-3 m-5 flex justify-end ">
            <Button text={"Next"} variant={"primary"}  onClick={()=><ChangePass/>}  rounded={"rounded-md"} width={"w-[15%]"} />
          </div> */}
        </div>



      </div>
    </>

  )
}
export default PersonalDetails