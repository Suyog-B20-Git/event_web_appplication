/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { FaWifi } from "react-icons/fa6";
import { LuClock3 } from "react-icons/lu";
import { MdEvent } from "react-icons/md";
import Button from "../Button";

import { IoTimeOutline } from "react-icons/io5";
import { BiSolidDrink } from "react-icons/bi";

import Guest from "./Guest";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { Context } from "../Util/ContextProvider";
const TicketForm = ({ type, price, onQuantityChange, addTicket }) => {
  // const [quantity, setQuantity] = useState(0);

  const [formData, setFormData] = useState({
    quantity: 0,
    promoCode: "",
    attendees: [],
  });

  // const handleChange = (e) => {
  //   const newQuantity = Number(e.target.value);
  //   setQuantity(newQuantity);
  //   onQuantityChange(newQuantity); // Notify the parent component
  // };

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setFormData((prev) => ({
      ...prev,
      quantity: newQuantity,
      attendees: Array(newQuantity).fill({ name: "", phone: "", email: "" }), // Reset attendees list
    }));
    onQuantityChange(newQuantity);
  };
  // Handle promo code input
  const handlePromoCodeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      promoCode: e.target.value,
    }));
  };

  // Handle attendee input change
  const handleAttendeeChange = (index, field, value) => {
    const updatedAttendees = [...formData.attendees];
    updatedAttendees[index] = { ...updatedAttendees[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      attendees: updatedAttendees,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const postData = {
      ticketType: type,
      price,
      quantity: formData.quantity,
      promoCode: formData.promoCode,
      totalCost: (price * formData.quantity).toFixed(2),
      attendees: formData.attendees,
    };
    console.log(postData);
    addTicket(postData); // Store data in Context
  };

  return (
    <div className="w-full border p-4 rounded-lg mb-4 flex flex-col gap-6 sm:gap-10">
      <div className="flex flex-wrap sm:flex-nowrap gap-6 sm:gap-10">
        <div className="flex flex-col w-full sm:w-[30%]">
          <h3 className="font-semibold text-lg">{type}</h3>
          <p className="text-gray-600">{price} USD</p>
          <div className="flex pt-6">
            <input
              type="text"
              placeholder="Enter Promo code"
              value={formData.promoCode}
              onChange={handlePromoCodeChange}
              className="p-1 text-sm rounded-lg border-2 w-full sm:w-auto"
            />
            <button className="bg-green-200 ml-2 rounded-md text-xs w-20 p-1.5">
              Apply
            </button>
          </div>
        </div>
        <div className="w-full sm:w-[50%]">
          <div className="mt-2">
            <label className="block text-sm font-medium">Select Quantity</label>
            {/* <select
              className="border rounded p-1 w-2/3 mt-1"
              value={quantity}
              onChange={handleChange}
            >
              {[...Array(6).keys()].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select> */}
            <select
              className="border rounded p-1 w-2/3 mt-1"
              value={formData.quantity}
              onChange={handleQuantityChange}
            >
              {[...Array(6).keys()].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full sm:w-[20%] flex justify-end">
          {/* <p className="text-gray-600">{(price * quantity).toFixed(2)} USD</p> */}
          <p className="text-gray-600">
            {(price * formData.quantity).toFixed(2)} USD
          </p>
        </div>
      </div>

      <div>
        {/* {[...Array(quantity)].map((_, index) => (
          <div key={index} className="mt-1">
            <h4 className="text-sm font-medium">Attendee {index + 1}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              <input
                type="text"
                placeholder="Name"
                className="border rounded p-2 w-full text-sm"
              />
              <input
                type="text"
                placeholder="Phone"
                className="border rounded p-2 w-full text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="border rounded p-2 w-full text-sm"
              />
            </div>
          </div>
        ))} */}
        {[...Array(formData.quantity)].map((_, index) => (
          <div key={index} className="mt-1">
            <h4 className="text-sm font-medium">Attendee {index + 1}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              <input
                type="text"
                placeholder="Name"
                className="border rounded p-2 w-full text-sm"
                value={formData.attendees[index]?.name || ""}
                onChange={(e) =>
                  handleAttendeeChange(index, "name", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Phone"
                className="border rounded p-2 w-full text-sm"
                value={formData.attendees[index]?.phone || ""}
                onChange={(e) =>
                  handleAttendeeChange(index, "phone", e.target.value)
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="border rounded p-2 w-full text-sm"
                value={formData.attendees[index]?.email || ""}
                onChange={(e) =>
                  handleAttendeeChange(index, "email", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <div className="flex gap-2 p-2 justify-between">
          <p className="text-[#ff2459] font-semibold text-sm p-1 px-2">
            Show Ticket Info
          </p>
          <button
            onClick={handleSubmit}
            className="capitalize text-xs px-2 p-1 rounded bg-[#ff2459] text-white font-medium"
          >
            Save Data
          </button>
        </div>
      </div>
    </div>
  );
};

const MeditationForm = ({ data }) => {
  const { form, setForm, showTimer, setShowTimer, setLogin } =
    useContext(Context);
  const { addTicket,ticket } = useContext(Context);
  console.log(ticket)
  const [time, setTime] = useState(5 * 60); // 5 minutes in seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
  // Calculate minutes and seconds
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  // const [login, setLogin] = useState(false);
  // const [account, setAccount] = useState(false);
  // const [guest, setGuest] = useState(true);
  // const [showTimer, setShowTimer] = useState(false); // Track timer visibility
  const tickets = [
    { type: "Free", price: 0 },
    { type: "Early Bird", price: 10 },
    { type: "Regular", price: 20 },
    { type: "VIP", price: 50 },
  ];

  const handleQuantityChange = (quantity) => {
    // Show the timer if any ticket quantity is greater than 0
    setShowTimer(quantity > 0);
  };

  return (
    <div className="lg:w-[50vw]  mx-auto p-4 pt-0 sm:p-6 overflow-x-auto">
      <h1 className="text-2xl font-bold text-center mb-2">{data.name}</h1>
      <p className="text-center flex gap-1 text-gray-600 mb-6 justify-center">
        <FaWifi className="relative top-1 text-[#ff2459]" /> Online |{" "}
        <MdEvent className="relative top-1 text-[#ff2459]" />
        {data.start} | <LuClock3 className="relative top-1 text-[#ff2459]" />
        {data.startTime}
      </p>

      {showTimer && (
        <div className="p-2 rounded bg-red-50 text-red-600 text-sm text-center font-semibold mb-4 flex justify-between">
          <p>Please Checkout within</p>
          {/*Timer */}
          <p className="flex gap-2">
            <IoTimeOutline className="relative top-1" />
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </p>
        </div>
      )}

      <div className=" rounded-lg w-full">
        <p className="font-semibold p-1">Tickets</p>
        {tickets.map((ticket) => (
          <TicketForm
            key={ticket.type}
            type={ticket.type}
            price={ticket.price}
            addTicket={addTicket}
            onQuantityChange={handleQuantityChange}
          />
        ))}

        <div className="border-2 p-4 rounded-lg mt-4">
          <p className="font-semibold">Cart Total</p>
          <div className="flex justify-between">
            <span>Total Tickets</span>
            <span>0</span>
          </div>
          <div className="flex justify-between">
            <span>Total Order</span>
            <span>0.00 USD</span>
          </div>
        </div>

        {showTimer && (
          <div className="mt-4 p-2">
            <h1 className="font-medium">Payment</h1>
            <div className="flex gap-2 items-center">
              <div className="h-4 w-4 rounded-full bg-[#ff2459] border-2"></div>
              <p className="flex items-center">
                <BiSolidDrink className="relative mr-1" />
                Free (Free checkout)
              </p>
            </div>
            <div className="bg-white m-3">
              <Button
                text={"checkout"}
                variant={"primary"}
                rounded={"rounded-xl"}
                width={"w-full"}
                textSize={"text-lg"}
                onClick={() => {
                  setLogin(true);
                  setForm(false);
                }}
              />
            </div>
          </div>
        )}

        {/* {login && (
          <div className="fixed w-full lg:h-[240vh]  h-[340vh]  inset-0 flex flex-col items-center justify-center bg-transparent z-70 backdrop-blur-sm overflow-x-hidden">
            <div className="bg-white p-6 rounded-lg shadow-lg lg:w-[full] w-[max-content]">
              <p className="flex items-center text-lg font-medium lg:p-0 p-4">
                {account ? "Login" : guest ? "Checkout as Guest" : "Register"}
              </p>
              <div className="flex justify-end lg:p-0 p-3 relative lg:bottom-3 bottom-14">
                <Button
                  text={"X"}
                  variant={"primary"}
                  rounded={"rounded-xl"}
                  onClick={() => {
                    setForm(true);
                    setLogin(false);
                  }}
                />
              </div>

              
              {account ? <LoginModal /> : guest ? <Guest /> : <RegisterModal />}

              <div className="flex gap-2 justify-center">
                
                {!guest && (
                  <p
                    className="cursor-pointer break-words lg:text-base text-sm"
                    onClick={() => setAccount(!account)}
                  >
                    {account
                      ? "Don't have an account?"
                      : "Already have an account/Login Now"}
                  </p>
                )}
                <p
                  className="text-[#ff2459] font-medium text-sm cursor-pointer"
                  onClick={() => {
                    if (guest) {
                      setGuest(false);
                    } else if (!account) {
                      setGuest(true);
                    } else {
                      setAccount(false);
                    }
                  }}
                >
                  {account
                    ? "Register here"
                    : guest
                    ? "Back to Register/Login"
                    : "Checkout as Guest"}
                </p>
              </div>
            </div>
          </div>
        )}*/}
      </div>
    </div>
  );
};

export default MeditationForm;
