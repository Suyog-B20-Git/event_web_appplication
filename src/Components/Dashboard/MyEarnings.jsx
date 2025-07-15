import { useState } from "react";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { TbMoneybag } from "react-icons/tb";
import { FaWallet } from "react-icons/fa";

const MyEarnings = () => {
  const [activeSection, setActiveSection] = useState("my-earnings");
  const loggedInUser = "John Doe";
  const sections = [
    { name: "My Earnings", icon: <FaWallet />, id: "my-earnings" },
  ];

  //  const SimpleDropdown = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="mt-4 w-full px-2 md:px-6">
      {activeSection === "my-earnings" && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Earning</h2>

          {/* Dropdown */}
          <div className="w-full sm:w-[200px] mb-2">
            <select
              value={selectedOption}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Events</option>
              <option value="event1">Event 1</option>
              <option value="event2">Event 2</option>
            </select>
          </div>

          {/* Summary Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Total Bookings */}
            <div className="bg-sky-400 text-white p-6 rounded-lg flex justify-between items-center shadow">
              <div>
                <h3 className="text-lg font-semibold">Total Bookings</h3>
                <p className="text-2xl font-bold mt-2">0</p>
              </div>
              <MdOutlineShoppingCartCheckout className="text-white text-3xl" />
            </div>

            {/* Admin Commission */}
            <div className="bg-gray-900 text-white p-6 rounded-lg flex justify-between items-center shadow">
              <div>
                <h3 className="text-lg font-semibold">
                  Total Admin Commission
                </h3>
                <p className="text-2xl font-bold mt-2">0</p>
              </div>
              <RiAdminFill className="text-white text-3xl" />
            </div>

            {/* Profit */}
            <div className="bg-green-400 text-white p-6 rounded-lg flex justify-between items-center shadow">
              <div>
                <h3 className="text-lg font-semibold">Total Profit</h3>
                <p className="text-2xl font-bold mt-2">0</p>
              </div>
              <TbMoneybag className="text-white text-3xl" />
            </div>
          </div>

          {/* Earnings Table */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-[600px] md:min-w-full text-sm text-lef">
              <thead className="bg-gray-200 font-bold">
                <tr>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Bookings</th>
                  <th className="px-4 py-3">Commission</th>
                  <th className="px-4 py-3">Profit</th>
                  <th className="px-4 py-3">Month</th>
                  <th className="px-4 py-3">Transferred</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td
                    className="px-4 py-4 text-center text-gray-800"
                    colSpan={6}
                  >
                    No Bookings!
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEarnings;
