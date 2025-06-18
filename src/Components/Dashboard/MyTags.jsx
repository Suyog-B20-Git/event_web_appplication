import { useState } from "react";
import { FaTags, FaUserTag } from "react-icons/fa6";

const MyTags = () => {
  const [activeSection, setActiveSection] = useState("my-tags");
  const loggedInUser = "John Doe";
  const sections = [{ name: "My Tags", icon: <FaTags />, id: "my-tags" }];

  return (
    <div className="mt-4 w-full px-2 md:px-6">
      {activeSection === "my-tags" && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">My Tags</h2>
            {/* Button Add Tag  */}

            <button className="flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg transition hover:bg-gray-700 text-sm w-full sm:w-auto">
              <FaUserTag className="text-lg " />
              <span className="text-sm font-semibold ">Add Tag</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-[400px] md:min-w-full w-full text-sm border border-gray-250 rounded-lg overflow-hidden">
              <thead className="bg-gray-300 text-left ">
                <tr>
                  <th className="px-4 py-3 font-bold border-r">Name</th>
                  <th className="px-4 py-3 font-bold border-r">Type</th>
                  <th className="px-4 py-3 font-bold border-r">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td
                    className="px-4 py-4 text-center text-gray-800"
                    colSpan={5}
                  >
                    No Tags !
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

export default MyTags;
