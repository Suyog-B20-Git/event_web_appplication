import { useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { FaMoneyCheckDollar } from "react-icons/fa6";

const MyBookings = () => {
  const [activeSection, setActiveSection] = useState("my-bookings");
  const loggedInUser = "John Doe";
  const sections = [
    { name: "My Bookings", icon: <FaMoneyCheckDollar />, id: "my-bookings" },
  ];

  return (
    <div className="mt-4 w-full px-2 md:px-6">
      {activeSection === "my-bookings" && (
        <div className="mt-4 w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Bookings</h2>
          <div className="flex flex-col md:flex-row md:flex-wrap gap-4 mb-4">
            {/* Events  */}

            <label className="flex flex-col w-full md:w-[300px]" htmlFor="rows">
              Events
              <input
                type="text"
                placeholder="All Events"
                className=" flex flex-col border px-4 py-2 rounded-xl w-auto md:w-auto"
              />
            </label>

            {/* Booking Date  */}
            <label className="flex flex-col w-full md:w-[300px]" htmlFor="rows">
              Booking Date
              <input
                type="Date"
                placeholder="Booking Date "
                className="flex flex-col border px-4 py-2 rounded-xl w-auto md:w-auto"
              />
            </label>
            {/* Event Date  */}
            <label className="flex flex-col w-full md:w-[300px]" htmlFor="rows">
              Event Date
              <input
                type="Date"
                placeholder="Event Date "
                className="flex flex-col border px-4 py-2 rounded-xl w-auto md:w-auto"
              />
            </label>
            {/* Search Any  */}
            {/* <label className="flex flex-col w-full md:w-[300px]" htmlFor="rows">
              Search Any
              <input
                type="text"
                placeholder="Search "
                className="flex flex-col border px-4 py-2 rounded-xlw-auto md:w-auto"
              />
            </label> */}
            
            {/* <DatePicker
      selected={null}
      onChange={(date) => {}}
      placeholderText="Booking Date"
      className="border px-4 py-2 rounded-md w-full"
      isClearable
      showPopperArrow={false}
    />
    <DatePicker
     
      onChange={(date) => {}}
      placeholderText="Event Date"
      className="border px-4 py-2 rounded-md w-full"
      isClearable
      showPopperArrow={false}
    /> */}

            {/* Show  */}
            <label className="flex flex-col w-full md:w-[300px]" htmlFor="rows">
              Show
              <input
                type="text"
                placeholder="10"
                className="flex flex-col border px-4 py-2 rounded-xl w-auto md:w-auto"
              />
            </label>
            {/* Reset Button */}
            <span className="flex justify-center items-center mt-4 w-auto">
  <button className="flex items-center justify-center p-1 text-[#ff2459] border border-[#ff2459] hover:bg-[#dd2e5a] hover:text-white m-4 px-4 mt-4 rounded-xl w-full sm:w-auto">
    <IoMdRefresh className="text-[#ff2459] font-bold text-md mr-2 ml-2" />
    Reset Filters
  </button>
</span>
          </div>
          {/* Booking Table */}
          <div className="overflow-x-auto shadow-md rounded-lg bg-white">
            <table className="min-w-[700px] md:min-w-full text-sm text-left">
              <thead className="bg-gray-100 font-bold">
                <tr>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Customer Email</th>
                  <th className="px-4 py-3">Ticket</th>
                  <th className="px-4 py-3">Order Total</th>
                  <th className="px-4 py-3">Promocode Reward(-)</th>
                  <th className="px-4 py-3">Booked On</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Checked in</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Cancellation</th>
                  <th className="px-4 py-3">Expired</th>
                  <th className="px-4 py-3">Download</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td
                    className="px-4 py-4 text-center text-gray-800"
                    colSpan={13}
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

export default MyBookings;
