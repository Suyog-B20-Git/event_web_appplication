import { useState } from "react";
import { MdPrivacyTip } from "react-icons/md";
import { FaMapLocation, FaMapLocationDot } from "react-icons/fa6";

const MyVenues = () => {
  const [activeSection, setActiveSection] = useState("my-venues");
  const loggedInUser = "John Doe";
  const sections = [
    { name: "My Venues", icon: <FaMapLocation />, id: "my-venues" },
  ];

  return (
    <div className="mt-4 w-full px-2 md:px-6">
      {activeSection === "my-venues" && (
        <div className="overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900">My Venues</h2>
            <div className="flex justify-end mb-4">
              <button className="flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg transition hover:bg-gray-700 text-sm w-full sm:w-auto">
                <FaMapLocationDot className="text-lg " />
                <span className="text-sm font-semibold ">Create Venue</span>
              </button>
            </div>
          </div>
          <div className="bg-blue-100 text-blue-900 px-4 py-3 rounded mb-4 border border-blue-300">
            <div className="flex items-center justify-left mb-4">
              <MdPrivacyTip className="text-2xl mr-2 mb-4" />
              <span className="font-medium ">
                Tip: Add a new Venue only if it does not exist on the website.
                You can use the Venues created by other Organizers into your
                event.{" "}
              </span>
            </div>
          </div>
          <table className="min-w-[500px] md:min-w-full bg-white border border-gray-200 text-sm">
            <thead className="bg-gray-300 text-left">
              <tr>
                <th className="px-4 py-3 text-left font-bold">Title</th>
                <th className="px-4 py-3 text-left font-bold">State</th>
                <th className="px-4 py-3 text-left font-bold">City</th>
                <th className="px-4 py-3 text-left font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-4 text-center text-gray-800" colSpan={5}>
                  No Venues !
                </td>
              </tr>
              {/* {data.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-3 flex items-center space-x-4">
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-gray-500 text-sm">
                            {item.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">{item.state}</td>
                      <td className="px-4 py-3">{item.city}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button className="flex items-center px-2 py-1 bg-red-100 text-red-600 rounded-lg">
                            <FaEdit className="mr-2" /> Edit
                          </button>
                          <button className="flex items-center px-2 py-1 bg-red-500 text-white rounded-lg">
                            <FaTrash className="mr-2" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}*/}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyVenues;
