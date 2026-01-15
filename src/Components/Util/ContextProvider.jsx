/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [form, setForm] = useState(false);
  const [login, setLogin] = useState(false);
  const [account, setAccount] = useState(false);
  const [guest, setGuest] = useState(true);
  const [showTimer, setShowTimer] = useState(false); // Track timer visibility
  const [ticket, setTicket] = useState([]); // Stores all ticket form data

  // Function to add ticket data
  const addTicket = (ticketData) => {
    setTicket((prevTickets) => [...prevTickets, ticketData]);
  };
  return (
    <Context.Provider
      value={{
        form,
        setForm,
        showTimer,
        setShowTimer,
        guest,
        setGuest,
        account,
        setAccount,
        login,
        setLogin,
        ticket,
        addTicket,
      }}
    >
      {children}
    </Context.Provider>
  );
};
