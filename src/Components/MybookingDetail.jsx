import React from "react";
import { BsCalendarDateFill } from "react-icons/bs";
import { IoIosTime, IoMdDownload } from "react-icons/io";
import { IoTicket } from "react-icons/io5";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { FaLocationDot } from "react-icons/fa6";
import { Ticket } from "lucide-react";

function MybookingDetail() {
  const location = useLocation();
  const data = location.state;
  const ticketQnty = data.ticketQuantity;

  return (
    // <div className="pt-5 px-4 bg-gray-100">
    //   <p className="text-gray-700 p-2 bg-white">
    //     Order ID : <span className="text-gray-800">{data.orderId}</span>
    //   </p>
    //   <hr />
    //   <div className="flex justify-between p-2 px-3 bg-white">
    //     <div className="flex flex-col gap-2">
    //       <p className="capitalize text-gray-800 text-xl font-medium">
    //         {data.eventName}
    //       </p>
    //       <p className="text-sm text-gray-500 font-medium flex gap-1"><SlCalender  className="relative top-1 text-[#ff2459]"/>{data.date} - <span className="flex gap-1"><IoIosTime className="relative top-1 text-[#ff2459]" />{data.time}</span></p>
    //       <p className="text-sm text-gray-500 font-medium">
    //         Seller : XYZ Organisers
    //       </p>
    //       <p className="text-sm font-medium text-gray-500">
    //         price : <span className="text-gray-800 "> 1000 USD</span>
    //       </p>

    //     </div>
    //     <div className="flex flex-col gap-2">
    //       <img src={data.img} className="h-20 w-28" alt="" />
    //       <p
    //         className={` ${
    //           data.status == "upcoming"
    //             ? "text-[#ff2459]"
    //             : data.status == "refunded"
    //             ? "text-orange-500"
    //             : "text-green-600"
    //         } font-medium p-0.5 capitalize   text-center`}
    //       >
    //         {data.status}
    //         {/* <IoTicket className="text-[#ff2459] relative top-1" /> x
    //         {data.ticketQuantity} */}
    //       </p>
    //     </div>
    //   </div>
    //   <hr />
    //   <div className="flex p-2 shadow-lg gap-10 mt-2 mb-2 bg-white">
    //     <button className="border rounded flex gap-1 p-1  px-3 justify-center bg-[#ff2459] text-white font-medium hover:bg-blue-600">
    //       <IoMdDownload className="relative top-1" />
    //       Ticket
    //     </button>
    //     <button className="border rounded flex gap-1 p-1 px-3  justify-center bg-[#ff2459] text-white font-medium hover:bg-blue-600">
    //       {" "}
    //       <IoMdDownload className="relative top-1" />
    //       Invoice
    //     </button>
    //     <button className="border rounded flex gap-1  p-1  px-3 justify-center bg-[#ff2459] text-white font-medium hover:bg-blue-600">
    //       {" "}
    //       <TbLayoutDashboardFilled className="relative top-1" />
    //       Check In
    //     </button>{" "}
    //     <button className="border  whitespace-nowrap p-1  px-3 rounded flex gap-1 justify-center bg-[#ff2459] text-white font-medium hover:bg-blue-600">
    //       {" "}
    //       <BsCalendarDateFill className="relative top-1" />
    //       Google Calender
    //     </button>
    //   </div>
    //   <div className="bg-white px-3 mb-2">
    //     <p className=" text-sm p-1 text-gray-500">Other Details</p>
    //     <hr />
    //     <div className="flex justify-between p-1">
    //       <div className="flex flex-col gap-1">
    //         <p>Booking Date</p>
    //         <p>Ticket Quantity</p>
    //         <p>Promo Code Reward</p>
    //         <p>Payment Mode </p>
    //         <p>Order Total</p>
    //       </div>
    //       <div className="flex flex-col gap-1" >
    //         <p>{data.bookingDate}</p>
    //         <p className="flex gap-1 "><IoTicket className="text-[#ff2459] relative top-1" /> {data.ticketQuantity}</p>
    //         <p className="text-green-500">{data.promoCodeReward}</p>
    //         <p>{data.paymentMode}</p>
    //         <p>{data.orderTotal} USD</p>
    //         <p>{data.promocodeReward}</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <div className="pt-5 px-10 bg-gray-100">
    //   <div className="text-[#ff2459] ml-3  font-semibold w-max bg-gray-200 p-1 px-3 rounded-md">
    //     {data.date} | {data.time}
    //   </div>
    //   <p className="text-xl font-bold text-gray-900 pt-2 pb-2 px-4">
    //     {data.eventName}
    //   </p>
    //   <div className="flex px-10 justify-center gap-10 items-center">
    //    <div className="w-[40%]">
    //    <img src={data.img} className="lg:h-60 lg:w-[500px] rounded " alt="" />
    //    </div>
    //     <div className="grid grid-cols-2  gap-10 text-lg">
    //       <p className="text-[#ff2459]  w-max h-max flex gap-4 ">
    //         <p className="bg-[#FCE0EB] flex items-center justify-center h-16 w-16 p-5 shadow rounded-md">
    //           {" "}
    //           <SlCalender className="text-lg" />
    //         </p>
    //         <div>
    //           <p className="text-gray-800 font-semibold pb-1">DATE AND TIME</p>
    //           <p className="text-gray-700 text-sm font-medium">{data.date}</p>
    //           <p className="text-gray-700 text-sm font-medium">{data.time}</p>
    //         </div>
    //       </p>
    //       <p className="text-[#ff2459] h-max   w-max flex gap-4 ">
    //         <p className="bg-[#FCE0EB] flex items-center justify-center h-16 w-16  p-5 shadow rounded-md">
    //           {" "}
    //           <IoIosTime className="text-lg" />
    //         </p>
    //         <div>
    //           <p className="text-gray-800 font-semibold pb-1">DURATION</p>
    //           <p className="text-gray-700 text-sm font-medium">5 Hours</p>

    //         </div>
    //       </p>
    //       <p className="text-[#ff2459] h-max   w-max flex gap-4 ">
    //         <p className="bg-[#FCE0EB] flex items-center justify-center h-16 w-16 p-5 shadow rounded-md">
    //           {" "}
    //           <FaLocationDot className="text-lg" />
    //         </p>
    //         <div>
    //           <p className="text-gray-800 font-semibold pb-1">PLACE</p>
    //           <p className="text-gray-700 text-sm font-medium">MG Road, Camp</p>
    //           <p className="text-gray-700 text-sm font-medium">Pune 411048</p>

    //         </div>
    //       </p>
    //       <p className="text-[#ff2459]   flex gap-4 ">
    //         <p className="bg-[#FCE0EB] flex items-center justify-center h-16 w-16 p-5 shadow rounded-md">
    //           {" "}
    //           <Ticket className="text-lg" />
    //         </p>
    //         <div>
    //           <p className="text-gray-800 font-semibold pb-1">{data.ticketQuantity} Tickets</p>
    //           <p className="text-gray-700 text-sm font-medium">Enroll,ETicket</p>

    //         </div>
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div className="lg:pt-5 pt-24 md:pt-10 lg:px-10 md:px-10 px-5 bg-gray-100">
      <div className="flex flex-row">
      <div className="text-[#ff2459] relative lg:top-0 md:top-0 top-1 lg:text-base md:text-base text-sm  font-semibold w-max whitespace-nowrap bg-gray-200 h-max p-1 lg:ml-32 md:ml-[80px]  rounded-md">
        {data.date} | {data.time}
      </div>
      <p className="lg:text-xl md:text-xl font-bold text-gray-900 pt-2 pb-2 whitespace-nowrap lg:px-56 md:px-64 px-24 ">
        {data.eventName}
      </p>
      </div>
      <div className="flex flex-col lg:flex-row lg:px-10 md:px-10 justify-center gap-10 items-center">
        {/* Image Container */}
        <div className="w-full lg:w-1/2 flex lg:justify-center md:justify-center">
          <img
            src={data.img}
            className="h-[250px] lg:w-full md:w-full lg:max-w-[500px] md:max-w-[500px] w-[600px] rounded"
            alt="Event"
          />
        </div>

        {/* Details Container */}
        <div className="grid grid-cols-2  md:grid-cols-2  md:gap-10 lg:gap-6 gap-10 text-lg w-full lg:w-1/2 md:px-12">
          <div className="flex gap-4 items-start">
            <div className="bg-[#FCE0EB] flex items-center justify-center lg:h-16 lg:w-16 p-5 shadow rounded-md">
              <SlCalender className="text-lg" />
            </div>
            <div>
              <p className="text-gray-800 font-semibold pb-1 lg:text-base text-sm">DATE AND TIME</p>
              <p className="text-gray-700 text-xs font-medium lg:text-sm whitespace-nowrap">{data.date} <span className="lg:hidden  md:hidden">- {data.time}</span></p>
              <p className="text-gray-700  font-medium lg:text-sm text-xs lg:block hidden">{data.time}</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-[#FCE0EB] flex items-center justify-center md:h-16 md:w-16 lg:h-16 lg:w-16 p-5 shadow rounded-md">
              <IoIosTime className="text-lg" />
            </div>
            <div>
              <p className="text-gray-800 font-semibold pb-1 lg:text-base text-sm">DURATION</p>
              <p className="text-gray-700 font-medium lg:text-sm text-xs">5 Hours</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-[#FCE0EB] flex items-center justify-center md:h-16 md:w-16 lg:h-16 lg:w-16 p-5 shadow rounded-md">
              <FaLocationDot className="text-lg" />
            </div>
            <div>
              <p className="text-gray-800 font-semibold pb-1 lg:text-base md:text-base text-sm">PLACE</p>
              <p className="text-gray-700 lg:text-sm text-xs font-medium ">MG Road, Camp</p>
              <p className="text-gray-700 lg:text-sm text-xs font-medium">Pune 411048</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-[#FCE0EB] flex items-center justify-center lg:h-16 lg:w-16 md:w-16 md:h-16 p-5 shadow rounded-md">
              <Ticket className="text-lg" />
            </div>
            <div>
              <p className="text-gray-800 font-semibold pb-1 lg:text-base text-sm">
                {data.ticketQuantity} Tickets
              </p>
              <p className="text-gray-700 lg:text-sm md:text-sm text-xs font-medium">
                Enroll, E-Ticket
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-[100%] lg:px-32 md:px-20 pt-5 pb-2 ">
        <p className="font-semibold text-lg">
          Tickets({data.ticketQuantity})
          <span className="text-[#ff2459] font-medium px-1">
             Total : {data.orderTotal} USD
          </span>
        </p>
        <button className="border rounded flex gap-1  p-1  px-3 justify-center bg-[#ff2459] text-white font-medium hover:bg-blue-600">
          {" "}
          <TbLayoutDashboardFilled className="relative top-1" />
          Check In
        </button>
      </div>
      <div className="flex flex-col gap-3 items-center pb-10">
        {[...Array(ticketQnty)].map((_, i) => (
          <div key={i} className="bg-gray-100 shadow-xl p-3 rounded lg:w-[85%] md:w-[80%] ">
          <p className="flex gap-2 font-semibold p-3"><IoTicket className="text-[#ff2459] relative top-1 text-lg"/>Ticket {i+1}</p>
          <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2  px-6 lg:gap-10 md:gap-12 gap-10">
            <div className="flex flex-col gap-1">
              <p className="text-gray-500">First Name</p>
              <p className="font-medium">Amanda</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-500">Last Name</p>
              <p className="font-medium">Smith</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-500">Email</p>
              <p className="font-medium break-words">Amanda@gamil.com</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-500">Phone no</p>
              <p className="font-medium">8765435432</p>
            </div>
            <div className="flex flex-col gap-1 text-[#ff2459]">
              <p className="text-[#ff2459]">Code</p>
              <p className="font-medium">MRCE-934913</p>
            </div>
            <div className="h-24 w-24 relative bottom-5 lg:left-10 bg-gray-300">
              
            </div>
          </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default MybookingDetail;
