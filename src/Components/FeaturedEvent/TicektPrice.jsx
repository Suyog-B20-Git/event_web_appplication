import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const TicketPrice = ({ ticketFormatId, showId = false }) => {
  const [ticketData, setTicketData] = useState(null);

  const authToken = localStorage.getItem("authToken");

  const isObjectWithPrice = (val) =>
    val && typeof val === "object" && (val.price !== undefined || val.salePrice !== undefined);

  const resolveId = (possibleId) => {
    if (typeof possibleId === "string") return possibleId;
    if (possibleId && typeof possibleId === "object") return possibleId._id;
    return undefined;
  };

  // If a populated object is passed, prefer it directly
  const initialData = isObjectWithPrice(ticketFormatId) ? ticketFormatId : null;
  const id = !initialData ? resolveId(ticketFormatId) : undefined;

  const fetchTicketFormat = async () => {
    try {
      if (!id) return;
      const response = await axios.get(`${baseUrl}/ticketFormat/${id}`, {
        headers: {
          Authorization: authToken,
        },
      });
      setTicketData(response.data);
    } catch (error) {
      console.error("Failed to fetch ticket format:", error);
    }
  };

  useEffect(() => {
    if (initialData) {
      setTicketData(initialData);
      return;
    }
    if (id) {
      fetchTicketFormat();
    } else {
      setTicketData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, initialData]);

  if (!initialData && !id) return <span>Price not available</span>;
  if (!ticketData) return <span>Loading price...</span>;

  const now = new Date();
  const isOnSale =
    ticketData.isSale &&
    ticketData.saleStartDate &&
    ticketData.saleEndDate &&
    new Date(ticketData.saleStartDate) <= now &&
    now <= new Date(ticketData.saleEndDate);

  const amount = isOnSale && ticketData.salePrice != null ? ticketData.salePrice : ticketData.price;

  return (
    <span className="lg:text-2xl text-base font-bold ">
      ₹ {amount}
      {showId && (ticketData?._id || id) ? (
        <span className="ml-2 text-xs font-normal text-gray-500">ID: {ticketData?._id || id}</span>
      ) : null}
    </span>
  );
};

export default TicketPrice;
