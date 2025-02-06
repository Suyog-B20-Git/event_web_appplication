import { Switch } from "@mui/material";
import Button from "../ReusableComponents/Button";

import React, { useState } from "react";
import { MdDeleteForever, MdSimCardDownload } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { data } from "autoprefixer";

function Ticket() {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState([]);
  const [checked, setChecked] = useState(true);

  const handleToggle = (event) => {
    setChecked(event.target.checked);
  };
  const [newData, setNewData] = useState({
    title: "",
    price: "",
    seqNo: "",
    tQuantity: "",
    bookingLimit: "",
    description: "",
    taxes: "",
    promocode: "",
    saleStartDate: "",
    saleEndDate: "",
    salePrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleDelete = () => {
    const data = [...formData];
    const deletedData = data.filter((item, index) => {
      index !== deleteIndex;
    });
    setFormData(deletedData);
    setDeleteIndex(null);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (isEdit) {
  //     const updateData = formData;
  //     updateData.map((item, index) => {
  //       index === editIndex ? newData : item;
  //     });
  //     setFormData(updateData);
  //     setIsEdit(false);
  //     setModal(false);
  //     setEditIndex(null);
  //   } else {
  //     setFormData([...formData, newData]);
  //   }

  //   setNewData({
  //     title: "",
  //     price: "",
  //     seqNo: "",
  //     tQuantity: "",
  //     bookingLimit: "",
  //     description: "",
  //     taxes: "",
  //     promocode: "",
  //     saleStartDate: "",
  //     saleEndDate: "",
  //     salePrice: "",
  //   });
  // };

  const resetForm = () => {
    setNewData({
      title: "",
      price: "",
      seqNo: "",
      tQuantity: "",
      bookingLimit: "",
      description: "",
      taxes: "",
      promocode: "",
      saleStartDate: "",
      saleEndDate: "",
      salePrice: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const updatedData = formData.map((item, index) =>
        index === editIndex ? newData : item
      );
      setFormData(updatedData);
      setIsEdit(false);
      setEditIndex(null);
    } else {
      setFormData([...formData, newData]);
    }
    setModal(false);
    resetForm();
  };
  const [editIndex, setEditIndex] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = (index) => {
    setEditIndex(index);
    setIsEdit(true);
    setModal(true);
    setNewData(formData[index]);
  };
  const [deletingTicket, setDeletingTicket] = useState(null);
  const header = ["Title", "Price", "Quantity", "Order", "Action"];
  return (
    <div className="overflow-y-scroll">
      <button
        className="bg-blue-500 p-2 rounded-md text-sm flex gap-2 text-white"
        onClick={() => setModal(true)}
      >
        <IoTicket className="relative top-1" />
        Create Ticket
      </button>
      <div className="mt-4 max-w-4xl">
        <header className="grid grid-cols-5 bg-[#E9ECEF] p-2 rounded-md text-center font-medium text-gray-700">
          {header.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </header>
        <div className="mt-2">
          {formData.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 items-center text-center gap-4 bg-gray-100 p-2 rounded-md my-2"
            >
              <p className="break-words">{item.title}</p>
              <p>{item.price}</p>
              <p>{item.tQuantity}</p>
              <p>{item.seqNo}</p>
              <div className="flex gap-2 justify-center text-lg">
                <button>
                  <FaEdit
                    className="text-blue-500"
                    onClick={()=>handleEdit(index)}
                  />
                </button>
                <button>
                  <MdDeleteForever
                    onClick={() => {
                      setDeletingTicket(true);
                      setDeleteIndex(index);
                    }}
                    className="text-red-600"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*ticket creation modal*/}
      {modal && (
        <>
          <div className="fixed w-full h-[100vh]   inset-0 flex flex-col items-center justify-center bg-transparent z-70 backdrop-blur-sm overflow-x-hidden ">
            <div className="bg-white p-6 lg:mt-96 md:mt-96 mt-[680px] rounded-lg shadow-lg w-[full] lg:w-[max-content]">
              <form
                onSubmit={handleSubmit}
                className="max-w-4xl p-3 grid lg:grid-col-1 md:grid-col-2  grid-col-2"
              >
                <div className="flex gap-2 justify-between border-b p-2">
                  <h1 className="lg:text-2xl md:text-xl font-medium">
                    Create Ticket
                  </h1>
                  <Button
                    text={"X"}
                    variant={"primary"}
                    rounded={"rounded-xl"}
                    onClick={() => {
                      setModal(false);
                      setNewData({
                        title: "",
                        price: "",
                        seqNo: "",
                        tQuantity: "",
                        bookingLimit: "",
                        description: "",
                        taxes: "",
                        promocode: "",
                        saleStartDate: "",
                        saleEndDate: "",
                        salePrice: "",
                      });
                    }}
                  />
                </div>
                <div className="mb-4 pt-2">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="lg:w-full w-[70%] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter title"
                    value={newData.title}
                    name="title"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={newData.price}
                    name="price"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter price"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="sequence"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Sequence No.
                  </label>
                  <input
                    type="number"
                    id="sequence"
                    value={newData.seqNo}
                    name="seqNo"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter sequence number"
                  />
                  <p className="text-sm text-gray-500">
                    The sequence in which this ticket will appear on Checkout
                    popup.
                  </p>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="quantity"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Total Ticket Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    value={newData.tQuantity}
                    name="tQuantity"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter total ticket quantity"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="limit"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Booking Limit Per Customer
                  </label>
                  <input
                    type="number"
                    id="limit"
                    value={newData.bookingLimit}
                    name="bookingLimit"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter limit (leave blank for unlimited)"
                  />
                  <p className="text-sm text-gray-500">
                    For how many times the same customer can purchase this
                    ticket. (leave blank for unlimited)
                  </p>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={newData.description}
                    name="description"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Enter description"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="taxes"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Taxes
                  </label>
                  <select
                    id="taxes"
                    value={newData.taxes}
                    name="taxes"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Select --</option>
                    <option value="tax1">Tax 1</option>
                    <option value="tax2">Tax 2</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="promocode"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Promocodes
                  </label>
                  <input
                    type="text"
                    id="promocode"
                    value={newData.promocode}
                    name="promocode"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Promocode"
                  />
                </div>
                <div className="bg-[#CFF4FC] p-2 rounded-md mb-4 break-words">
                  Enter Sale Start-End Date & Sale Price only if you want to
                  make this ticket on sale and sell this ticket on Discounted
                  price
                </div>
                <div className="flex lg:flex-row flex-col justify-around mb-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="" className="lg:text-base text-sm">
                      Sale Start Date
                    </label>
                    <input
                      type={newData.saleStartDate ? "date" : "text"}
                      id="startDate"
                      value={newData.saleStartDate}
                      name="saleStartDate"
                      required
                      placeholder="Start date"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) =>
                        !e.target.value && (e.target.type = "text")
                      }
                      onChange={handleChange}
                      className="border rounded-md p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="" className="lg:text-base text-sm">
                      Sale End Date
                    </label>
                    <input
                      type={newData.saleEndDate ? "date" : "text"}
                      id="endDate"
                      value={newData.saleEndDate}
                      name="saleEndDate"
                      required
                      placeholder="End date"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) =>
                        !e.target.value && (e.target.type = "text")
                      }
                      onChange={handleChange}
                      className="border rounded-md p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sale Price"
                      className="block text-gray-700 font-medium mb-1 lg:text-base text-sm"
                    >
                      Sale Price(USD)
                    </label>
                    <input
                      type="number"
                      id="sale Price"
                      value={newData.salePrice}
                      name="salePrice"
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-lg">Event Sold Out</p>
                    <p className="text-gray-600">
                      Disable Event booking and Show Event as Soldout
                    </p>
                  </div>
                  <Switch
                    checked={checked}
                    onChange={handleToggle}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="flex justify-end p-2">
                  <button
                    type="submit"
                    // onClick={() => setModal(false)}
                    className="bg-blue-500 gap-2  text-xl flex  w-[max-content] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    <MdSimCardDownload className="relative top-1 " />
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {/* Deletion Confirmation Modal */}
      {deletingTicket && (
        <div className="fixed inset-0 w-full left-0  flex items-center justify-center bg-transparent z-50 backdrop-blur-sm ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl mb-2 text-center">
              Are you sure you want to delete the ticket info ?
            </h2>

            <div className="flex justify-center gap-3 mt-4">
              <Button
                text={"Discard"}
                variant={"normal"}
                onClick={() => {
                  setDeletingTicket(null);
                }}
                type={"button"}
              />

              <Button
                onClick={() => {
                  handleDelete();
                  setDeletingTicket(null);
                }}
                variant={"primary"}
                text={"Confirm"}
                type={"button"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ticket;


