// import Button from "../ReusableComponents/Button"
// import InputField from "../ReusableComponents/InputField"

import InputField from "../ReusableComponents/InputField"

const ChangePass = () => {
  return (
    <>
      <div className="w-[100%]  p-3 flex justify-center " >
        {/* <div className="sm:w-[80%] w-[100%]  p-3 mt-3 border border-black"> */}
        <div className="sm:w-[80%] w-[100%] p-2 sm:p-3  sm:mt-6  ">
          {/* <div className="w-[100%] p-3  border border-blue-500 shadow-[#00000040] shadow-sm rounded-md"> */}

          <div className="sm:w-[100%] w-[100%]  p-2 mt-2 sm:p-3 sm:mt-5 sm:mb-5 sm:mr-5  shadow-[#00000040] shadow-sm rounded-md">


            <div className="sm:w-[70%] w-[100%] mb-2" >


              <InputField label={"Current Password"} placeholder={"Enter your current password"} type={"Email"} width={"w-[100%]"} />

            </div>
            <div className="sm:w-[70%] w-[100%] mb-2" >


              <InputField label={"New Password"} placeholder={"Enter your new password "} type={"Email"} width={"w-[100%]"} />

            </div>
            <div className="sm:w-[70%] w-[100%] mb-2" >


              <InputField label={"Confirm Password"} placeholder={"Enter your confirm password"} type={"Email"} width={"w-[100%]"} />

            </div>
          </div>

          {/* <div className="w-[100%] p-3 m-5 flex justify-between ">
          <Button text={"Previuos"} variant={"primary"} rounded={"rounded-md"} width={"w-[15%]"} />

            <Button text={"Next"} variant={"primary"} rounded={"rounded-md"} width={"w-[15%]"} />
          </div> */}
        </div>



      </div>
    </>

  )
}
export default ChangePass