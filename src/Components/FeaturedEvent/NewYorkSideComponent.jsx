import React from "react";
import InputField from "../ReusableComponents/InputField";

const NewYorkSide = () => {
  return (
    <div className="max-w-sm mx-auto grid gap-4 ">
      {/* Card 1 */}
      <div className="border border-gray-300 shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800">Seated/Standing</h2>
        <p className="text-gray-600">400/500</p>
      </div>

      {/* Card 2 */}
      <div className="border border-gray-300 shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800">Neighborhoods</h2>
        <p className="text-gray-600">
          Upper Manhattan, Marble Hill, Inwood, Washington Heights, West Harlem,
          Manhattanville
        </p>
      </div>

      {/* Card 3 */}
      <div className="border border-gray-300 shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800">Address</h2>
        <p className="text-gray-600">
          Manhattan Ave, Brooklyn, NY, USA, New York, NY, 10019, United States
        </p>
      </div>

      {/* card 4 */}
      <div className="border border-gray-300  shadow rounded-lg p-1">
        <h2 className="text-lg font-semibold   text-gray-800">Request a Quote</h2>
        <InputField width={"w-[100%]"} placeholder={"Name"} />
        <InputField width={"w-[100%]"} placeholder={"Email"} />
        <InputField width={"w-[100%]"} placeholder={"Phone"} />
        <InputField width={"w-[100%]"} placeholder={"No. of Guest"} />


         <textarea placeholder="Write about your query" className="w-[98%] border focus:border-gray-400 focus:outline-none border-gray-200  p-4 m-2 shadow-lg rounded-lg focus:bg-white">
                
         </textarea>
         <button className="border-2 p-2 bg-pink-200 rounded-lg">
          Send Message
         </button>


         
      </div>
    </div>
  );
};

export default NewYorkSide;
