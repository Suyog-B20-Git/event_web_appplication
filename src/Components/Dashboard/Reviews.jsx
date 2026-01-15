import { useState } from "react";
import { FaStarHalfAlt, FaUserTag } from "react-icons/fa";

const Reviews = () => {
  const [activeSection, setActiveSection] = useState("reviews");
  const loggedInUser = "John Doe";
  const sections = [
    { name: "Reviews", icon: <FaStarHalfAlt />, id: "reviews" },
  ];

  return (
    <div className="mt-4 w-full px-2 md:px-6">
      {activeSection === "reviews" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 ml-6">
            Manage Reviews
          </h2>
          <div className="flex flex-col md:flex-row gap-4 md:items-center mb-4 p-2 ">
            <label className="flex-col px-2px mb-2 ml-4" htmlFor="rows">
              Events
              <input
                type="text"
                placeholder="Search"
                className="border px-4 py-2 rounded-xl w-full md:max-w-xs p-2 m-2"
              />
            </label>
          </div>
          {/* Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-[500px] md:min-w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="px-4 py-3 font-bold border-r w-1/3">Title</th>
                  <th className="px-4 py-3 font-bold border-r w-1/3">Rating</th>
                  <th className="px-4 py-3 font-bold w-1/3">Review</th>
                  <th className="px-4 py-3 font-bold w-1/3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-center text-gray-700"
                  >
                    {/* No Guest Found! */}
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

export default Reviews;
