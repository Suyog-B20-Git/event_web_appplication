// import React from "react";
// import { BsMenuButtonWide } from "react-icons/bs";

// function BookingDetails() {
//   const fields = [
//     {
//       label: "Order ID",
//       value: "123456",
//     },
//     {
//       label: "Event Category",
//       value: "Category",
//     },
//     {
//       label: "Event",
//       value: "ABC",
//     },
//     {
//       label: "Ticket",
//       value: 2,
//     },
//     {
//       label: "Ticket Price",
//       value: 500,
//     },
//     {
//       label: "Total Amt Paid",
//       value: 1000,
//     },
//     {
//       label: "Start Date",
//       value: "2/1/2025",
//     },
//     {
//       label: "Start Time",
//       value: "Mor. 11:00AM",
//     },
//     {
//       label: "End Date",
//       value: "3/1/2025",
//     },
//     {
//       label: "End Time",
//       value: "After 1:00PM",
//     },
//     {
//       label: "Booking Date",
//       value: "29/12/2024",
//     },
//     {
//       label: "Booking Cancellation",
//       value: "No",
//     },
//     {
//       label: "Booking Status",
//       value: "Confirmed",
//     },
//     {
//       label: "Payment Type",
//       value: "Online",
//     },
//     {
//       label: "Paid",
//       value: "Paid",
//     },
//   ];

//   return (
//     <div>
//       <div className="flex gap-1 shadow-lg w-40 p-2 rounded-md">
//         <BsMenuButtonWide className="text-white font-medium relative top-1 bg-[#ff2459]" />
//         <p className="text-[#ff2459] font-medium">Booking Details</p>
//       </div>

//       <div className="flex justify-center w-2/3">
//         <div className="flex flex-col gap-2 ">
//           <div>
//             {" "}
//             <h1 className="text-[#ff2459] text-lg  font-medium flex justify-start">
//               Booking Info
//             </h1>
//           </div>
//           <table className="border-2 pb-3 border-[#ff2459]">
//             <tbody>
//               {fields.map((item, index) => (
//                 <tr key={index} className="border-b-2">
//                   <td className="font-medium text-black p-2 px-6 text-center">
//                     {item.label}
//                   </td>
//                   <td className="p-2 px-6 text-center">{item.value}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div>
//           <div>
//             <h1 className="text-[#ff2459] text-lg font-medium flex justify-start">
//               Customer Info
//             </h1>
//             <div className="p-3 border-2 w-[300px]">
//               <table  cellPadding={"8"} cellSpacing={""}>
//                 <tbody>
//                   <tr className="text-center">
//                     <td>Name</td>
//                     <td>123456</td>
//                   </tr>
//                   <tr className="text-center">
//                     <td className="whitespace-nowrap">Email-ID</td>
//                     <td>()Email</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div>
//             <h1 className="text-[#ff2459] text-lg font-medium flex justify-start">
//               Promo Code Info
//             </h1>
//             <div className="p-3 border-2 w-[300px]">
//               <table  cellPadding={"5"} cellSpacing={"6"}>
//                 <tbody>
//                   <tr className="text-center">
//                     <td>PromoCode </td>
//                     <td>123456</td>
//                   </tr>
//                   <tr className="text-center">
//                     <td className="whitespace-nowrap">Promocode Reward</td>
//                     <td>()INR</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookingDetails;

import React from "react";
import { BsMenuButtonWide } from "react-icons/bs";

function BookingDetails() {
  const fields = [
    { label: "Order ID", value: "123456" },
    { label: "Event Category", value: "Category" },
    { label: "Event", value: "ABC" },
    { label: "Ticket", value: 2 },
    { label: "Ticket Price", value: 500 },
    { label: "Total Amt Paid", value: 1000 },
    { label: "Start Date", value: "2/1/2025" },
    { label: "Start Time", value: "Mor. 11:00AM" },
    { label: "End Date", value: "3/1/2025" },
    { label: "End Time", value: "After 1:00PM" },
    { label: "Booking Date", value: "29/12/2024" },
    { label: "Booking Cancellation", value: "No" },
    { label: "Booking Status", value: "Confirmed" },
    { label: "Payment Type", value: "Online" },
    { label: "Paid", value: "Paid" },
  ];

  const customerInfo = [
    { label: "Name", value: "123456" },
    { label: "Email-ID", value: "Email" },
  ];

  const promoCodeInfo = [
    { label: "Promocode", value: "123456" },
    { label: "Promocode Reward", value: "0 INR" },
  ];

  return (
    <div className="p-8 flex flex-col items-center lg:pt-[180px]">
      {/* Header */}
      <div className="flex justify-start">
        <div
          className="flex absolute left-1 md:left-3 lg:left-4 lg:top-52 md:top-44 top-28
        gap-2 shadow-md w-[max-content] p-2 rounded-md mb-8"
        >
          <BsMenuButtonWide className="text-white bg-[#ff2459] p-1 rounded-md relative top-1" />
          <p className=" text-[#ff2459] font-medium">Booking Details</p>
        </div>
      </div>

      {/* Outer Container */}
      <div className="shadow-md p-6 rounded-lg  lg:w-2/3">
        {/* Main Flexbox */}
        <div className="flex flex-col  lg:flex-row  md:flex-row gap-8">
          {/* Booking Info */}
          <div className="flex-1">
            <h1 className="text-[#ff2459] font-medium mb-4">Booking Info</h1>
            <div className="border border-pink-300 p-4 rounded-lg">
              <table className="w-full text-left">
                <tbody>
                  {fields.map((item, index) => (
                    <tr key={index} className="border-b last:border-none">
                      <td className="font-medium text-black py-2">
                        {item.label}
                      </td>
                      <td className="text-gray-500 py-2">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Section: Customer Info & Promo Code Info */}
          <div className="flex flex-col gap-8">
            {/* Customer Info */}
            <div className="w-full md:w-2/3">
              <h1 className="text-[#ff2459] font-medium mb-4">Customer Info</h1>
              <div className="border border-pink-300 p-4 rounded-lg w-72">
                <table className="w-full text-left">
                  <tbody>
                    {customerInfo.map((item, index) => (
                      <tr key={index} className="border-b last:border-none">
                        <td className="font-medium text-black py-2">
                          {item.label}
                        </td>
                        <td className="text-gray-500 py-2">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Promo Code Info */}
            <div>
              <h1 className="text-[#ff2459] font-medium mb-4">
                Promo Code Info
              </h1>
              <div className="border border-pink-300 p-4 rounded-lg w-72">
                <table className="w-full text-left">
                  <tbody>
                    {promoCodeInfo.map((item, index) => (
                      <tr key={index} className="border-b last:border-none">
                        <td className="font-medium text-black py-2">
                          {item.label}
                        </td>
                        <td className="text-gray-500 py-2">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
