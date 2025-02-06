// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import Loading from "../../Components/ReusableComponents/Loading";
// import { BsClipboardCheckFill, BsMenuButtonWide } from "react-icons/bs";
// import { MdOutlineFilterList } from "react-icons/md";
// import { AiOutlineSearch } from "react-icons/ai";
// import { FiDownload } from "react-icons/fi";
// import { CiMenuKebab } from "react-icons/ci";
// import { FaRegEye } from "react-icons/fa6";
// import { GoDownload } from "react-icons/go";
// import { useNavigate } from "react-router-dom";

// function MyBooking() {
//   const [modal, setModal] = useState(false);
//   const [ticket, setTicket] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter1, setFilter1] = useState("");
//   const [filter2, setFilter2] = useState("");
//   const [filter3, setFilter3] = useState("");
//   const navigate = useNavigate();

//   const api = "http://localhost:3000/booking";

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(api);
//       const info = response.data;
//       setData(info);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       setError(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (loading) {
//     return <Loading />;
//   }

//   if (error) {
//     return <h1>{error}</h1>;
//   }

//   // Pagination logic
//   const itemsPerPage = 5;
//   const totalPages = Math.ceil(data.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentData = data.slice(startIndex, endIndex);

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };
//   const menu = [
//     {
//       icon: <FaRegEye />,
//       name: "View Page",
//     },
//     { icon: <BsClipboardCheckFill />, name: "Check In" },

//     // { icon: <GoDownload />, name: "Invoice" },
//   ];

//   return (
//     <div className="mt-0 p-10 pt-3 shadow-xl rounded-md flex flex-col gap-2">
//       <div className="flex gap-1 shadow-lg w-40 p-2 rounded-md">
//         <BsMenuButtonWide className="text-white font-medium relative top-1 bg-[#ff2459]" />
//         <p className="text-[#ff2459] font-medium">My Bookings</p>
//       </div>
//       <div className="flex justify-between">
//         <div className="flex gap-3 p-2 m-1">
//           <select
//             name="filter2"
//             onChange={(e) => setFilter2(e.target.value)}
//             value={filter2}
//           >
//             <option value="Status" className="font-medium">
//               Status
//             </option>
//             <option value="Payment">Payment</option>
//           </select>
//           <select
//             name="filter1"
//             onChange={(e) => setFilter1(e.target.value)}
//             value={filter1}
//           >
//             <option value="All Staff" className="font-medium">
//               All Staff
//             </option>
//             <option value="Manager">Manager</option>
//           </select>
//           <select
//             name="filter3"
//             onChange={(e) => setFilter3(e.target.value)}
//             value={filter3}
//           >
//             <option value="monthly" className="font-medium">
//               Monthly
//             </option>
//             <option value="weekly">Weekly</option>
//           </select>
//           <MdOutlineFilterList className="relative top-1 border-2 rounded-md shadow p-1  text-[#ff2459] text-3xl" />
//         </div>
//         <div className="flex lg:text-base text-sm  rounded-md relative lg:p-0 p-2 gap-1 text-gray-600">
//           <div className="flex gap-4 p-4">
//             {/* Search Box */}
//             <div className="flex items-center border rounded-lg p-2 shadow-md">
//               <AiOutlineSearch className="text-gray-500 mr-2" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="outline-none text-sm"
//               />
//             </div>

//             {/* Export PDF Button */}
//             <button className="flex items-center gap-2 border rounded-lg px-4 py-2 shadow-md bg-white hover:bg-gray-100">
//               <FiDownload className="text-gray-500" />
//               <span className="text-sm font-medium">Export PDF</span>
//             </button>
//           </div>
//         </div>
//       </div>
//       <header className="ml-3 pl-5 gap-1 grid grid-cols-3 font-semibold sm:grid-cols-6 lg:grid-cols-10 text-gray-500 lg:text-base text-left border-b-2 p-3">
//         <p className="text-center border-r-2">Event </p>
//         <p className="text-center border-r-2">Ticket </p>
//         <p className="text-center border-r-2">Order Total</p>

//         <p className="text-center  border-r-2 ">Booking On</p>
//         <p className="text-center  border-r-2">Payment</p>
//         <p className="text-center  border-r-2">Checked IN/NOT</p>
//         <p className="text-center  border-r-2">Status</p>
//         <p className="text-center  border-r-2">Cancellation</p>
//         <p className="text-center  border-r-2">Expired</p>
//         <p className="text-center ">Action</p>
//       </header>
//       {currentData.map((item) => (
//         <div
//           key={item.id}
//           className="ml-3 pl-2 grid grid-cols-3 font-medium sm:grid-cols-6 lg:grid-cols-10 text-gray-500 text-sm text-left border-b-2 p-3"
//         >
//           <p className="text-center">{item.eventName} </p>
//           <p className="text-center">{item.ticketCount}</p>
//           <p className="text-center">{item.orderTotal}</p>

//           <p className="text-center">{item.bookingDate}</p>
//           <p className="text-center">{item.paymentStatus}</p>
//           <p className="text-center">
//             {item.checkedIn === "Yes" ? "In" : "NOT"}
//           </p>
//           <p className="text-center  h-[max-content] rounded-md bg-green-200 font-medium">
//             {item.status}
//           </p>
//           <p className="text-center">Cancel</p>
//           <p className="text-center">{item.expired}</p>
//           <button
//             className="text-xl releative text-black "
//             onClick={() => setModal(true)}
//           >
//             <CiMenuKebab className="lg:relative left-14" />
//           </button>
//         </div>
//       ))}
//       <Stack spacing={2} alignItems="center" className="mt-4">
//         <Pagination
//           count={totalPages}
//           page={currentPage}
//           onChange={handlePageChange}
//           color="primary"
//           variant="outlined"
//           shape="rounded"
//         />
//       </Stack>

//       {modal && (
//         <div className="fixed w-full h-[100vh] inset-0 flex flex-col items-end justify-center bg-transparent z-70 backdrop-blur-sm overflow-x-hidden">
//           <div className="bg-white shadow-md w-[200px] h-[200px] p-4 rounded-lg  flex items-center justify-center">
//             <table className="w-full h-full ">
//               <tbody className="w-full h-full">
//                 <button
//                   className="flex relative left-36 h-[max-content] w-[max-content]"
//                   onClick={() => setModal(false)}
//                 >
//                   <p className="font-medium p-2 text-[#ff2459] shadow">X</p>
//                 </button>
//                 {menu.map((item, index) => {
//                   return (
//                     <tr key={index} className="p-4 hover:bg-slate-100">
//                       <td className="text-[#ff2459] p-2">{item.icon}</td>
//                       <td className="text-gray-500 p-2">{item.name}</td>
//                     </tr>
//                   );
//                 })}
//                 <tr
//                   className="p-4 hover:bg-slate-100"
//                   onClick={() => {
//                     setModal(false);
//                     setTicket(true);
//                   }}
//                 >
//                   <td className="text-[#ff2459] p-2">
//                     <GoDownload />
//                   </td>
//                   <td className="text-gray-500 p-2">Invoices</td>
//                 </tr>
//                 <tr
//                   className="p-4 hover:bg-slate-100"
//                   onClick={() => {
//                     navigate("/bookingDetails");
//                   }}
//                 >
//                   <td className="text-[#ff2459] p-2">
//                     <GoDownload />
//                   </td>
//                   <td className="text-gray-500 p-2">Tickets</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {ticket && (
//         <div className="fixed w-full   h-[100vh] inset-0 flex flex-col items-center justify-center  bg-transparent  z-80 backdrop-blur-sm overflow-x-hidden">
//           <div className="bg-white p-2 rounded-lg   shadow-lg  lg:w-[full] md:w-[30%]">
//             <div className="flex justify-between p-2">
//               <p className="text-xl font-medium">FREE X1 Ticket</p>
//               <button
//                 className="bg-[#ff2459] p-2 text-white"
//                 onClick={() => setTicket(false)}
//               >
//                 X
//               </button>
//             </div>
//             <hr />
//             <img src="qr.PNG" className="lg:h-[400px] lg:w-[400px]" alt="" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MyBooking;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loading from "../../Components/ReusableComponents/Loading";
import { BsClipboardCheckFill, BsMenuButtonWide } from "react-icons/bs";
import { MdOutlineFilterList } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { GoDownload } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function MyBooking() {
  const [modal, setModal] = useState(false);
  const [ticket, setTicket] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter1, setFilter1] = useState("");
  const [filter2, setFilter2] = useState("");
  const [filter3, setFilter3] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const api = "http://localhost:3000/booking";

  const fetchData = async () => {
    try {
      const response = await axios.get(api);
      const info = response.data;
      setData(info);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h1 className="text-xl text-red-600 font-semibold">Error: {error}</h1>
        </div>
      </div>
    );
  }

  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const menu = [
    { icon: <FaRegEye />, name: "View Page" },
    { icon: <BsClipboardCheckFill />, name: "Check In" },
  ];

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 my-8 lg:pt-[180px]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2 bg-white shadow-md rounded-lg p-3">
          <BsMenuButtonWide className="text-[#ff2459] text-xl" />
          <h1 className="text-[#ff2459] font-semibold text-lg">My Bookings</h1>
        </div>
      </div>

      {/* Filters and Search Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <select
            className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#ff2459] focus:border-transparent"
            onChange={(e) => setFilter2(e.target.value)}
            value={filter2}
          >
            <option value="Status">Status</option>
            <option value="Payment">Payment</option>
          </select>
          <select
            className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#ff2459] focus:border-transparent"
            onChange={(e) => setFilter1(e.target.value)}
            value={filter1}
          >
            <option value="All Staff">All Staff</option>
            <option value="Manager">Manager</option>
          </select>
          <select
            className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#ff2459] focus:border-transparent"
            onChange={(e) => setFilter3(e.target.value)}
            value={filter3}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
          <button className="p-2 rounded-lg border shadow-sm hover:bg-gray-50">
            <MdOutlineFilterList className="text-[#ff2459] text-2xl" />
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm">
            <AiOutlineSearch className="text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search bookings..."
              className="ml-2 outline-none text-sm w-full"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <FiDownload className="text-[#ff2459]" />
            <span className="text-sm font-medium">Export PDF</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Event
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Ticket
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Order Total
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Booking On
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Payment
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Checked
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Cancel
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Expired
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm">{item.eventName}</td>
                <td className="px-4 py-3 text-sm">{item.ticketCount}</td>
                <td className="px-4 py-3 text-sm">{item.orderTotal}</td>
                <td className="px-4 py-3 text-sm">{item.bookingDate}</td>
                <td className="px-4 py-3 text-sm">{item.paymentStatus}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.checkedIn === "Yes"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.checkedIn === "Yes" ? "In" : "NOT"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <button className="text-red-500 hover:text-red-700">
                    Cancel
                  </button>
                </td>
                <td className="px-4 py-3 text-sm">{item.expired}</td>
                <td className="px-4 py-3 text-sm">
                  <button
                    className="p-1 hover:bg-gray-100 rounded-full"
                    onClick={() => {
                      setSelectedItem(item);
                      setModal(true);
                    }}
                  >
                    <CiMenuKebab className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section with Results Info */}
      <div className="mt-6 border-t border-gray-200 pt-4 flex justify-center">
        <div className="flex items-center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
            size="large"
          />
        </div>
      </div>

      {/* Action Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-64 overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-700">Actions</h3>
                <button
                  onClick={() => setModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Close</span>×
                </button>
              </div>
            </div>
            <div className="p-2">
              {menu.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <span className="text-[#ff2459]">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
              <button
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => {
                  setModal(false);
                  setTicket(true);
                }}
              >
                <span className="text-[#ff2459]">
                  <GoDownload />
                </span>
                <span>Invoices</span>
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => navigate("/bookingDetails")}
              >
                <span className="text-[#ff2459]">
                  <GoDownload />
                </span>
                <span>Tickets</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Modal */}
      {ticket && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold">FREE X1 Ticket</h3>
              <button
                onClick={() => setTicket(false)}
                className="text-gray-400 hover:text-gray-600 p-2"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <img
                src="qr.PNG"
                alt="QR Code"
                className="w-full h-auto max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBooking;
