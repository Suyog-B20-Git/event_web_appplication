// import React from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import { IoTicket } from "react-icons/io5";
// import { MdCancel } from "react-icons/md";

// function MyBookings() {
//   const ticketInfo = [
//     {
//       eventName: "Concert XYZ",
//       img: "music.jpeg",
//       date: "2025-03-15",
//       time: "19:00",
//       orderId: "ORD123456",
//       ticketQuantity: 2,
//       orderTotal: 2000,
//       promoCodeReward: "DISCOUNT10",
//       bookingDate: "2025-02-25",
//       paymentMode: "online",
//       checkedIn: "no",
//       status: "enabled",
//       expired: "no",
//     },
//     {
//       eventName: "Theater Play ABC",
//       img: "music.jpeg",
//       date: "2025-04-10",
//       time: "18:30",
//       orderId: "ORD123457",
//       ticketQuantity: 4,
//       orderTotal: 5000,
//       promoCodeReward: "VIPACCESS",
//       bookingDate: "2025-02-27",
//       paymentMode: "offline",
//       checkedIn: "yes",
//       status: "enabled",
//       expired: "no",
//     },
//     {
//       eventName: "Football Match DEF",
//       img: "music.jpeg",
//       date: "2025-03-20",
//       time: "16:00",
//       orderId: "ORD123458",
//       ticketQuantity: 1,
//       orderTotal: 1200,
//       promoCodeReward: "GAMEDEAL",
//       bookingDate: "2025-02-24",
//       paymentMode: "online",
//       checkedIn: "no",
//       status: "disabled",
//       expired: "yes",
//     },
//     {
//       eventName: "Music Festival GHI",
//       img: "music.jpeg",
//       date: "2025-05-05",
//       time: "14:00",
//       orderId: "ORD123459",
//       ticketQuantity: 3,
//       orderTotal: 3000,
//       promoCodeReward: "EARLYBIRD",
//       bookingDate: "2025-02-28",
//       paymentMode: "online",
//       checkedIn: "no",
//       status: "enabled",
//       expired: "no",
//     },
//   ];

//   return (
//     <div>
//       <div className="grid lg:grid-cols-11">
//         <p>Event</p>
//         <p>Ticket</p>
//         <p>Order Total</p>
//         <p>Promocode Reward</p>
//         <p>Booked On</p>
//         <p>Payment</p>
//         <p>Checked In</p>
//         <p>Status</p>
//         <p>Cancellation</p>
//         <p>Expired</p>
//         <p>Actions</p>
//       </div>
//       <div>
//         {ticketInfo.map((item, index) => {
//           return (
//             <div key={index} className="grid lg:grid-cols-11">
//               <div>
//                 <img src={item.img} className="h-20 w-36 rounded-md" alt="" />
//                 <div className="flex flex-col gap-0.5">
//                   <h3 className="text-xl font-medium">{item.eventName}</h3>
//                   <p className="text-gray-700 text-sm">
//                     {item.date} - {item.time}
//                   </p>
//                   <p className="text-green-600 text-sm font-medium">
//                     Order ID :{item.orderId}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex font-medium gap-1">
//                 <IoTicket className="relative top-1" /> Free x{" "}
//                 {item.ticketQuantity}
//               </div>
//               <p>{item.orderTotal} USD</p>
//               <p>{item.promoCodeReward} USD</p>
//               <p>{item.bookingDate}</p>
//               <p className="font-medium p-1 bg-gray-600 text-white w-max rounded h-max">
//                 {item.paymentMode}
//               </p>
//               <p className=" ">
//                 {item.checkedIn == "yes" ? <FaCheckCircle className="text-green-500" /> : <MdCancel className="text-red-500" />}
//               </p>
//               <p className="capitalize">{item.status}</p>
//               <button className="flex gap-1 w-max h-max text-white font-medium rounded p-1  bg-red-600 ">Cancel <MdCancel className="relative top-1"  /></button>
//               <p className={` capitalize font-medium ${item.expired=='yes'?"text-red-500":"text-green-600"}`}>{item.expired}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default MyBookings;

// import React from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import { IoTicket } from "react-icons/io5";
// import { MdCancel } from "react-icons/md";

// function MyBookings() {
//   const ticketInfo = [
//     {
//       eventName: "Concert XYZ",
//       img: "music.jpeg",
//       date: "2025-03-15",
//       time: "19:00",
//       orderId: "ORD123456",
//       ticketQuantity: 2,
//       orderTotal: 2000,
//       promoCodeReward: "DISCOUNT10",
//       bookingDate: "2025-02-25",
//       paymentMode: "online",
//       checkedIn: "no",
//       status: "enabled",
//       expired: "no",
//     },
//     {
//       eventName: "Theater Play ABC",
//       img: "music.jpeg",
//       date: "2025-04-10",
//       time: "18:30",
//       orderId: "ORD123457",
//       ticketQuantity: 4,
//       orderTotal: 5000,
//       promoCodeReward: "VIPACCESS",
//       bookingDate: "2025-02-27",
//       paymentMode: "offline",
//       checkedIn: "yes",
//       status: "enabled",
//       expired: "no",
//     },
//     {
//       eventName: "Football Match DEF",
//       img: "music.jpeg",
//       date: "2025-03-20",
//       time: "16:00",
//       orderId: "ORD123458",
//       ticketQuantity: 1,
//       orderTotal: 1200,
//       promoCodeReward: "GAMEDEAL",
//       bookingDate: "2025-02-24",
//       paymentMode: "online",
//       checkedIn: "no",
//       status: "disabled",
//       expired: "yes",
//     },
//     {
//       eventName: "Music Festival GHI",
//       img: "music.jpeg",
//       date: "2025-05-05",
//       time: "14:00",
//       orderId: "ORD123459",
//       ticketQuantity: 3,
//       orderTotal: 3000,
//       promoCodeReward: "EARLYBIRD",
//       bookingDate: "2025-02-28",
//       paymentMode: "online",
//       checkedIn: "no",
//       status: "enabled",
//       expired: "no",
//     },
//   ];

//   return (
//     <div className="container mx-auto p-4">
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//           <thead>
//             <tr className="bg-gray-800 text-white text-left">
//               <th className="py-3 px-4">Event</th>
//               {/* <th className="py-3 px-4">Ticket</th> */}
//               <th className="py-3 px-4">Order Total</th>
//               <th className="py-3 px-4">Promo Reward</th>
//               <th className="py-3 px-4">Booked On</th>
//               <th className="py-3 px-4">Payment</th>
//               <th className="py-3 px-4">Checked In</th>
//               <th className="py-3 px-4">Status</th>
//               <th className="py-3 px-4">Cancel</th>
//               <th className="py-3 px-4">Expired</th>
//             </tr>
//           </thead>
//           <tbody>
//             {ticketInfo.map((item, index) => (
//               <tr key={index} className="border-t border-gray-200 text-gray-700">
//                 <td className="py-3 px-4 flex items-center gap-2">
//                   <img src={item.img} className="h-16 w-24 rounded-md" alt="Event" />
//                   <div>
//                     <h3 className="font-medium text-lg">{item.eventName}</h3>
//                     <p className="text-gray-600 text-sm">{item.date} - {item.time}</p>
//                     <p className="text-green-600 text-xs font-medium">Order ID: {item.orderId}</p>
//                   </div>
//                 </td>
//                 <td className="py-3 px-4 flex items-center gap-1 font-medium">
//                   <IoTicket className="text-blue-500" /> x{item.ticketQuantity}
//                 </td>
//                 <td className="py-3 px-4">{item.orderTotal} USD</td>
//                 <td className="py-3 px-4">{item.promoCodeReward}</td>
//                 <td className="py-3 px-4">{item.bookingDate}</td>
//                 <td className="py-3 px-4">
//                   <span className="py-1 px-2 text-white rounded-md text-sm bg-gray-600">
//                     {item.paymentMode}
//                   </span>
//                 </td>
//                 <td className="py-3 px-4 text-center">
//                   {item.checkedIn === "yes" ? <FaCheckCircle className="text-green-500" /> : <MdCancel className="text-red-500" />}
//                 </td>
//                 <td className="py-3 px-4 capitalize">{item.status}</td>
//                 <td className="py-3 px-4">
//                   <button className="flex items-center gap-1 text-white font-medium rounded-md p-2 bg-red-600">
//                     Cancel <MdCancel />
//                   </button>
//                 </td>
//                 <td className={`py-3 px-4 font-medium ${item.expired === 'yes' ? "text-red-500" : "text-green-600"}`}>{item.expired}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default MyBookings;

import React from "react";
import { BsCalendarDateFill } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { GrFormNext } from "react-icons/gr";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { IoIosTime, IoMdDownload } from "react-icons/io";
import { IoTicket } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbCalendarEvent, TbLayoutDashboardFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { SiBookmyshow } from "react-icons/si";
import { SlCalender } from "react-icons/sl";
function MyBookings() {
  const ticketInfo = [
    {
      eventName: "Concert XYZ",
      img: "music.jpeg",
      date: "2025-03-15",
      time: "19:00",
      orderId: "ORD123456",
      ticketQuantity: 2,
      orderTotal: 2000,
      promoCodeReward: "DISCOUNT10",
      bookingDate: "2025-02-25",
      paymentMode: "online",
      checkedIn: "no",
      status: "upcoming",
      expired: "no",
    },
    {
      eventName: "Theater Play ABC",
      img: "music.jpeg",
      date: "2025-04-10",
      time: "18:30",
      orderId: "ORD123457",
      ticketQuantity: 4,
      orderTotal: 5000,
      promoCodeReward: "VIPACCESS",
      bookingDate: "2025-02-27",
      paymentMode: "offline",
      checkedIn: "yes",
      status: "upcoming",
      expired: "no",
    },
    {
      eventName: "Football Match DEF",
      img: "music.jpeg",
      date: "2025-03-20",
      time: "16:00",
      orderId: "ORD123458",
      ticketQuantity: 1,
      orderTotal: 1200,
      promoCodeReward: "GAMEDEAL",
      bookingDate: "2025-02-24",
      paymentMode: "online",
      checkedIn: "no",
      status: "refunded",
      expired: "yes",
    },
    {
      eventName: "Music Festival GHI",
      img: "music.jpeg",
      date: "2025-05-05",
      time: "14:00",
      orderId: "ORD123459",
      ticketQuantity: 3,
      orderTotal: 3000,
      promoCodeReward: "EARLYBIRD",
      bookingDate: "2025-02-28",
      paymentMode: "online",
      checkedIn: "no",
      status: "used",
      expired: "no",
    },
  ];
  const navigate = useNavigate();

  return (
    // <div className="container mx-auto p-4">
    //   <div className="overflow-x-auto">
    //     <table className="w-full bg-white border overflow-scroll border-gray-200 rounded-lg shadow-md text-sm md:text-base">
    //       <thead>
    //         <tr className="bg-gray-800 text-white text-left lg:text-base text-sm">
    //           <th className="py-3 px-2 md:px-4">Event</th>

    //           <th className="py-3 px-2 md:px-4">Order Total</th>
    //           <th className="py-3 px-2 md:px-4">Promo Reward</th>
    //           <th className="py-3 px-2 md:px-4">Booked On</th>
    //           <th className="py-3 px-2 md:px-4">Payment</th>
    //           <th className="py-3 px-2 md:px-4">Checked In</th>
    //           <th className="py-3 px-2 md:px-4">Status</th>
    //           <th className="py-3 px-2 md:px-4">Cancel</th>
    //           <th className="py-3 px-2 md:px-4">Expired</th>
    //           <th className="py-3 px-2 md:px-4">Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {ticketInfo.map((item, index) => (
    //           <tr
    //             key={index}
    //             className="border-t border-gray-200 text-gray-700"
    //           >
    //             <td className="py-3 px-2 md:px-4 flex lg:flex-row flex-col items-center gap-2">
    //               <img
    //                 src={item.img}
    //                 className="h-12 w-20 md:h-16 md:w-24 rounded-md"
    //                 alt="Event"
    //               />
    //               <div>
    //                 <h3 className="font-medium text-sm md:text-lg">
    //                   {item.eventName}
    //                 </h3>
    //                 <p className="text-gray-600 text-xs md:text-sm">
    //                   {item.date} - {item.time}
    //                 </p>
    //                 <p className="text-green-600 text-xs font-medium">
    //                   Order ID: {item.orderId}
    //                 </p>
    //               </div>
    //             </td>
    //             <td className="py-3 px-2 md:px-4 flex items-center gap-1 font-medium">
    //               <IoTicket className="text-blue-500" /> x{item.ticketQuantity}
    //             </td>
    //             <td className="py-3 px-2 md:px-4">{item.orderTotal} USD</td>
    //             <td className="py-3 px-2 md:px-4">{item.promoCodeReward}</td>
    //             <td className="py-3 px-2 md:px-4">{item.bookingDate}</td>
    //             <td className="py-3 px-2 md:px-4">
    //               <span className="py-1 px-2 text-white rounded-md text-sm bg-gray-600">
    //                 {item.paymentMode}
    //               </span>
    //             </td>
    //             <td className="py-3 px-2 md:px-4 flex justify-center  text-lg">
    //               {item.checkedIn === "yes" ? (
    //                 <FaCheckCircle className="text-green-500" />
    //               ) : (
    //                 <MdCancel className="text-red-500" />
    //               )}
    //             </td>
    //             <td className="py-3 px-2 md:px-4 capitalize">{item.status}</td>
    //             <td className="py-3 px-2 md:px-4">
    //               <button className="flex items-center gap-1 text-white font-medium rounded-md p-1 md:p-2 bg-red-600">
    //                 Cancel <MdCancel />
    //               </button>
    //             </td>
    //             <td
    //               className={`py-3 px-2 md:px-4 text-center font-medium ${
    //                 item.expired === "yes" ? "text-red-500" : "text-green-600"
    //               }`}
    //             >
    //               {item.expired}
    //             </td>
    //             <td className="px-2 md:px-4 capitalize flex flex-col gap-2 relative lg:bottom-12 text-sm">
    //               <button className="border rounded flex gap-1 justify-center bg-blue-400 text-white font-medium hover:bg-blue-600">
    //                 <IoMdDownload className="relative top-1" />
    //                 Ticket
    //               </button>
    //               <button className="border rounded flex gap-1 justify-center bg-blue-400 text-white font-medium hover:bg-blue-600">
    //                 {" "}
    //                 <IoMdDownload className="relative top-1" />
    //                 Invoice
    //               </button>
    //               <button className="border rounded flex gap-1 justify-center bg-blue-400 text-white font-medium hover:bg-blue-600">
    //                 {" "}
    //                 <TbLayoutDashboardFilled className="relative top-1" />
    //                 Check In
    //               </button>
    //               <button className="border  whitespace-nowrap p-1 rounded flex gap-1 justify-center bg-blue-400 text-white font-medium hover:bg-blue-600">
    //                 {" "}
    //                 <BsCalendarDateFill className="relative top-1" />
    //                 Google Calender
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
    <div className="pt-20 lg:pt-0 md:pt-0">
      <div className="bg-gray-800 flex gap-2 text-white text-xl text-left p-4 font-medium">
        <SiBookmyshow className="relative top-1.5" />
        Orders
      </div>
      <div className="flex flex-col">
        {ticketInfo.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                navigate("/myBookingDetails", { state: item });
              }}
              className="border p-2 flex gap-10 lg:px-10  lg:mt-0"
            >
              <div className="pt-2">
                <img
                  src={item.img}
                  className="h-20 lg:h-32 shadow-xl lg:w-48 rounded-md"
                  alt=""
                />
                <p className="py-2 lg:px-2 md:px-4 flex lg:text-base text-sm items-center justify-center lg:gap-1 font-medium">
                  <span className="lg:block hidden">Qnty :</span>{" "}
                  <IoTicket className="text-[#ff2459]" /> x{item.ticketQuantity}
                </p>
              </div>
              {/* <div className="grid grid-cols-2 w-full  pr-2"> */}
              <div className="lg:flex grid grid-cols-2 justify-between lg:gap-20 w-full  pr-2">
                <div className="flex flex-col gap-2 p-2">
                  <h1 className="lg:text-xl  font-bold text-gray-600">
                    {item.eventName}{" "}
                  </h1>
                  <p className="text-sm">id: {item.orderId}</p>
                  <p className="flex gap-1">
                    <p className=" flex gap-1 text-gray-500 whitespace-nowrap text-sm">
                      <SlCalender className="relative top-1  text-[#ff2459]" />
                      {item.date}
                    </p>
                    <p className=" flex gap-1 text-gray-500 text-sm">
                      - <IoIosTime className="relative top-1 text-[#ff2459]" />
                      {item.time}
                    </p>
                  </p>
                  <p className="whitespace-nowrap lg:text-base text-sm ">price : {item.orderTotal} USD</p>
                </div>

                <div className="flex lg:items-center relative lg:top-0 top-6 justify-between">
                  <p
                    className={`flex lg:text-base text-xs item-center justify-center w-40 gap-2 rounded-full px-3 p-0.5 text-white capitalize font-medium ${
                      item.status == "upcoming"
                        ? "text-pink-600"
                        : item.status == "used"
                        ? "text-green-700"
                        : "text-orange-600"
                    }`}
                  >
                    {item.status == "upcoming" ? (
                      <TbCalendarEvent className="relative top-1" />
                    ) : item.status == "used" ? (
                      <FaCheck className=" text-sm relative top-1" />
                    ) : (
                      <HiOutlineReceiptRefund className="relative top-1" />
                    )}
                    {item.status}
                  </p>
                  <button
                    onClick={() => {
                      navigate("/myBookingDetails", { state: item });
                    }}
                    className="bg-gray-200 w-max h-max rounded-full p-1 "
                  >
                    <GrFormNext />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyBookings;
