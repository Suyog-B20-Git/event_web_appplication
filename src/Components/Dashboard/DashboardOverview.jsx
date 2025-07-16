import { useState } from "react";
import { TbMoneybag } from "react-icons/tb";
import { GrDashboard } from "react-icons/gr";
import { TbActivityHeartbeat } from "react-icons/tb";
import { FiCreditCard } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DashboardOverview = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();

  const loggedInUser = "John Doe";
  const sections = [
    { name: "Dashboard", icon: <GrDashboard />, id: "dashboard" },
  ];

  return (
    <div className="mt-4 w-full px-2 md:px-6">
      {activeSection === "dashboard" && (
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap">
            Hello, {loggedInUser}
          </h1>
          <p className="text-gray-800 mt-2 border-b-2 border-gray-300">
            Here's ongoing activity for all your events and the bookings, have a
            look.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900">
            {/* Dashboard Overview */}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {/* Total Events */}
            <div className="bg-white p-6 shadow rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Events
                </h3>
                <p className="text-3xl font-bold mt-2 text-gray-900">15</p>
              </div>
              <TbActivityHeartbeat className="text-pink-500 text-3xl" />
            </div>

            {/* Total Earnings */}
            <div className="bg-white p-6 shadow rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Earnings
                </h3>
                <p className="text-3xl font-bold mt-2 text-gray-900">0.00</p>
              </div>
              <TbMoneybag className="text-green-500 text-3xl" />
            </div>

            {/* Total Bookings */}
            <div className="bg-white p-6 shadow rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Bookings
                </h3>
                <p className="text-3xl font-bold mt-2 text-gray-900">10</p>
              </div>
              <FiCreditCard className="text-pink-500 text-3xl" />
            </div>
          </div>

          {/* Top Selling Events (Static Bar Chart) */}
          <div className="bg-white mt-8 p-6 shadow rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Top Selling Events
            </h3>
            <div className="h-[300px] w-full border-t border-l relative overflow-x-auto">
              <div className="absolute left-[30%] top-[50px] flex items-center gap-2">
                <div className="w-[120px] h-6 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-600">Total Bookings</span>
              </div>
              <div className="absolute top-[100px] left-8 text-sm text-gray-500">
                Event A
              </div>
              <div className="absolute top-[150px] left-8 text-sm text-gray-500">
                Event B
              </div>
              <div className="absolute top-[200px] left-8 text-sm text-gray-500">
                Event C
              </div>
            </div>
          </div>

          {/* Event Tickets Statistics Table */}
          <div className="bg-white mt-8 p-6 shadow rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Event Tickets Statistics
            </h3>

            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search Table"
                className="border px-3 py-2 w-full max-w-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-[600px] md:min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-3 font-bold border-r">ORDER</th>
                    <th className="px-4 py-3 font-bold border-r">TICKETS</th>
                    <th className="px-4 py-3 font-bold border-r">
                      TICKETS QUANTITY
                    </th>
                    <th className="px-4 py-3 font-bold border-r">
                      TOTAL PRICE
                    </th>
                    <th className="px-4 py-3 font-bold">TOTAL CHECKINS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td
                      className="px-4 py-4 text-center text-gray-500"
                      colSpan={5}
                    >
                      No data for table
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 text-sm text-gray-600 gap-4">
              <div>
                Rows per page:{" "}
                <select className="ml-2 border rounded p-1">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span>Page</span>
                <input
                  value="1"
                  disabled
                  className="border w-10 text-center rounded-md px-2 py-1"
                />
                <span>of 0</span>
                <button disabled className="text-gray-400 px-2">
                  Previous
                </button>
                <button disabled className="text-gray-400 px-2">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
