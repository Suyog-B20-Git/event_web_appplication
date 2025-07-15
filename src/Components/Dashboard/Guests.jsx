import { useState } from "react";
import { FaCalendarPlus } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";

const Guests = () => {
  const [activeSection, setActiveSection] = useState("guests");
  const loggedInUser = "John Doe";
  const sections = [{ name: "Guests", icon: <MdGroups2 />, id: "guests" }];

  return (
    <div className="mt-4 w-full px-2 md:px-6">
      {activeSection === "guests" && (
        <div className="w-full px-4">
          {/* Heading and Buttons */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Manage Guests</h2>

            <div className="flex flex-col sm:flex-row gap-2">
              {/* Create GuestList Button */}
              <button className="flex items-center justify-center gap-2 bg-[#ff2459] hover:bg-[#e91e63] text-white px-4 py-2 rounded-lg transition text-sm w-full sm:w-auto">
                <FaCalendarPlus className="text-md" />
                <span className="text-sm font-semibold">Create GuestsList</span>
              </button>

              {/* Create Guest Button */}
              <button className="flex items-center justify-center gap-2 bg-[#ff2459] hover:bg-[#e91e63] text-white px-4 py-2 rounded-lg transition text-sm w-full sm:w-auto">
                <FaCalendarPlus className="text-md" />
                <span className="text-sm font-semibold">Create Guest</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="px-4 py-3 font-bold border-r w-1/3">Name</th>
                  <th className="px-4 py-3 font-bold border-r w-1/3">
                    Total Guests
                  </th>
                  <th className="px-4 py-3 font-bold w-1/3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-center text-gray-700"
                  >
                    No Guest Found!
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

export default Guests;
