// import Button from "../ReusableComponents/Button"
// import InputField from "../ReusableComponents/InputField"

import InputField from "../ReusableComponents/InputField"

const BankDetails = () => {
  return (
    <>
      <div className="w-[100%]  p-3 flex justify-center " >
        {/* <div className="w-[80%]  p-3 mt-3 border border-black"> */}
        <div className="sm:w-[80%] w-[100%] p-2 sm:p-3  sm:mt-6 ">
          {/* <div className="w-[100%] p-3  border border-blue-500 shadow-[#00000040] shadow-sm rounded-md"> */}
          <div className="sm:w-[100%] w-[100%]  p-2 mt-2 sm:p-3 sm:mt-5 sm:mb-5 sm:mr-5   shadow-[#00000040] shadow-sm rounded-md">
            <div className="sm:w-[70%] w-[100%] mb-1" >
              <InputField label={"Bank Name"} placeholder={"Enter your Bank Name"} type={"Email"} width={"w-[100%]"} />
            </div>
            <div className="sm:w-[70%] w-[100%] mb-1" >
              <InputField label={"Bank Code"} placeholder={"Enter your Bank Code"} type={"Email"} width={"w-[100%]"} />
            </div>
            <div className="sm:w-[70%] w-[100%] mb-1" >
              <InputField label={"Bank Branch Name"} placeholder={"Enter your Bank Branch Name"} type={"Email"} width={"w-[100%]"} />
            </div>
            <div className="sm:w-[70%] w-[100%] mb-1" >
              <InputField label={"Bank Branch Code"} placeholder={"Enter your Bank Branch Code"} type={"Email"} width={"w-[100%]"} />
            </div>
            <div className="sm:w-[70%] w-[100%] mb-1" >
              <InputField label={"Bank Account Number"} placeholder={"Enter your Bank Account Number"} type={"Email"} width={"w-[100%]"} />
            </div>
            <div className="sm:w-[70%] w-[100%] mb-1" >
              <InputField label={"Bank Account Name"} placeholder={"Enter your Bank Account Name"} type={"Email"} width={"w-[100%]"} />
            </div>
            <div className="sm:w-[70%] w-[100%] mb-1" >
              <InputField label={"Bank Account Phone"} placeholder={"Enter your Bank Account Phone"} type={"Email"} width={"w-[100%]"} />
            </div>

          </div>

          {/* <div className="w-[100%] p-3 m-5 flex justify-end ">
            <Button text={"Previuos"} variant={"primary"} rounded={"rounded-md"}  width={"w-[15%]"} />

            <Button text={"Next"} variant={"primary"} rounded={"rounded-md"} width={"w-[15%]"} />
          </div> */}

        </div>



      </div>
    </>

  )
}
export default BankDetails