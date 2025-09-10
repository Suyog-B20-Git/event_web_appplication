import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const TicketPrice = ({ ticketFormatId }) => {
  // console.log("TicketFormatId:", ticketFormatId);
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);

  const authToken = localStorage.getItem("authToken");
  const fetchTicketFormat = async () => {
    try {

      const response = await axios.get(`${baseUrl}/ticketFormat/${ticketFormatId}`, {
        headers: {
          Authorization: authToken,
        },
      });
      // console.log("Ticket format response:", response.data);
      setTicketData(response.data);
    } catch (error) {
      console.error("Failed to fetch ticket format:", error);
    } finally {

    }
  };

  useEffect(() => {
    if (ticketFormatId) {
      fetchTicketFormat();
    }
  }, [ticketFormatId]);


  if (!ticketData) return <span>Price not available</span>;

  const now = new Date();
  const isOnSale =
    ticketData.isSale &&
    new Date(ticketData.saleStartDate) <= now &&
    now <= new Date(ticketData.saleEndDate);

  return (
    <span className="lg:text-2xl text-base font-bold ">
      ₹ {isOnSale ? ticketData.salePrice : ticketData.price}
    </span>
  );
};

export default TicketPrice;
