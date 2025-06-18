import { useState } from "react";
import { FaPeopleArrows } from "react-icons/fa6";

const SubOrganizers = () => {
  const [activeSection, setActiveSection] = useState("sub-organizers");
  const loggedInUser = "John Doe";
  const sections = [
    {
      name: "Sub Organizers",
      icon: <FaPeopleArrows />,
      id: "sub-organizers",
    },
  ];

  return (
    <div className="mt-4 w-full px-2 md:px-6">
      {activeSection === "sub-organizers" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 ml-4">
            Manage Sub Organizers
          </h2>
          {/* Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg ">
            <table className="min-w-full text-sm border border-gray-250 rounded-lg overflow-hidden">
              <thead className="bg-gray-300 text-left ">
                <tr>
                  <th className="px-4 py-3 font-bold border-r">Name</th>
                  <th className="px-4 py-3 font-bold border-r">Email</th>
                  <th className="px-4 py-3 font-bold border-r">Role</th>
                  <th className="px-4 py-3 font-bold border-r">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td
                    className="px-4 py-4 text-center text-gray-800"
                    colSpan={4}
                  >
                    {/* No Guest Found ! */}
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

export default SubOrganizers;
